import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email.")
    .max(160, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (10+ characters).")
    .max(2000, "Message is too long."),
  company: z.string().max(0).optional(),
});

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (bucket.count >= MAX_REQUESTS) return true;

  bucket.count += 1;
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildHtml({ name, email, message }: { name: string; email: string; message: string }) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;
}

async function sendViaResend({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) throw new Error("RESEND_API_KEY not set");

  const to = process.env.CONTACT_TO_EMAIL ?? "bhalkeankit@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: [email],
      subject: `Portfolio message from ${name}`,
      html: buildHtml({ name, email, message }),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend ${response.status}: ${detail}`);
  }
}

async function sendViaFormspree({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
  if (!formspreeEndpoint) throw new Error("FORMSPREE_ENDPOINT not set");

  const body = new URLSearchParams();
  body.set("name", name);
  body.set("email", email);
  body.set("message", message);
  body.set("_subject", `Portfolio message from ${name}`);

  const response = await fetch(formspreeEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Formspree ${response.status}`);
  }
}

async function sendViaWeb3Forms({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!web3formsAccessKey) throw new Error("WEB3FORMS_ACCESS_KEY not set");

  const body = new URLSearchParams();
  body.set("access_key", web3formsAccessKey);
  body.set("name", name);
  body.set("email", email);
  body.set("message", message);
  body.set("subject", `Portfolio message from ${name}`);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Web3Forms ${response.status}`);
  }
}

async function sendViaNodemailer({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpTo = process.env.CONTACT_TO_EMAIL ?? "bhalkeankit@gmail.com";

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("SMTP_HOST, SMTP_USER, or SMTP_PASS not set");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio" <${smtpUser}>`,
    to: smtpTo,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    html: buildHtml({ name, email, message }),
  });
}

type DeliveryHandler = (
  data: { name: string; email: string; message: string },
) => Promise<void>;

const handlers: Record<string, DeliveryHandler> = {
  resend: sendViaResend,
  formspree: sendViaFormspree,
  web3forms: sendViaWeb3Forms,
  nodemailer: sendViaNodemailer,
};

const fallbackChain: string[] = ["resend", "formspree", "web3forms", "nodemailer"];

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot: silently accept bot submissions.
  if (company) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const data = { name, email, message };

  // Try each delivery service in order until one succeeds.
  const tried: string[] = [];

  for (const method of fallbackChain) {
    if (tried.includes(method)) continue;
    tried.push(method);

    const handler = handlers[method];
    if (!handler) continue;

    try {
      await handler(data);
      return NextResponse.json({
        ok: true,
        delivered: true,
        method,
      });
    } catch (error) {
      console.error(`[contact] ${method} failed`, error);
      continue;
    }
  }

  // All delivery methods failed — log server-side.
  console.info("[contact] All delivery methods failed, logging message", {
    name,
    email,
    message,
  });

  return NextResponse.json({
    ok: true,
    delivered: false,
    tried,
    note: "No email service configured; message logged server-side",
  });
}
