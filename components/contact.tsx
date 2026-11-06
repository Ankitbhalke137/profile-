"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  GitFork,
  AtSign,
  Loader,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Status = "idle" | "sending" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

type DeliveryMethod = "resend" | "formspree" | "web3forms" | "nodemailer" | "mailto";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DELIVERY_OPTIONS: { id: DeliveryMethod; label: string; icon: any; description: string }[] = [
  {
    id: "resend",
    label: "Direct API",
    icon: Send,
    description: "Sent via server route handler",
  },
  {
    id: "formspree",
    label: "Formspree",
    icon: Mail,
    description: "Delivered via Formspree",
  },
  {
    id: "web3forms",
    label: "Web3Forms",
    icon: Mail,
    description: "Delivered via Web3Forms",
  },
  {
    id: "nodemailer",
    label: "Nodemailer SMTP",
    icon: Mail,
    description: "Sent via your SMTP server",
  },
  {
    id: "mailto",
    label: "Direct email",
    icon: Mail,
    description: "Opens your email app",
  },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
    delivery: "resend" as DeliveryMethod,
    sendCopy: false,
  });

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!emailPattern.test(form.email.trim()))
      next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10)
      next.message = "Tell me a little more (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError("");
    if (!validate()) return;

    // Direct mailto: open the user's email client instead of calling the API.
    if (form.delivery === "mailto") {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm({
        name: "",
        email: "",
        message: "",
        company: "",
        delivery: "resend",
        sendCopy: false,
      });
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setServerError(json.error ?? "Something went wrong. Please email me.");
        return;
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        message: "",
        company: "",
        delivery: "resend",
        sendCopy: false,
      });
    } catch {
      setStatus("error");
      setServerError("Network error. Please email me directly.");
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_70%_40%,#000_10%,transparent_100%)]" />
      <div className="pointer-events-none absolute -right-40 top-0 size-96 rounded-full bg-accent/10 blur-[100px]" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                label="05 — Contact"
                title={
                  <>
                    Let&apos;s build something{" "}
                    <span className="text-gradient">that ships.</span>
                  </>
                }
                description="Open to SDE internships, full-stack contract work, and open-source collaborations. I usually reply within a day."
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 space-y-2">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/30"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-accent/20 bg-accent-soft text-accent">
                      <Mail className="size-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                        Email
                      </span>
                      <span className="mt-0.5 block text-[13px] text-ink">
                        {site.email}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>

                <div className="grid gap-2 sm:grid-cols-2">
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-muted">
                        <GitFork className="size-4" />
                      </span>
                      <span>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                          GitHub
                        </span>
                        <span className="mt-0.5 block text-[13px] text-ink">
                          Ankitbhalke137
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-muted">
                        <AtSign className="size-4" />
                      </span>
                      <span>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                          LinkedIn
                        </span>
                        <span className="mt-0.5 block text-[13px] text-ink">
                          ankit-bhalke
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3" />
                  {site.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-green" />
                  Available for 2027 internships
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.04}>
            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Send a message</h3>
                <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-2">
                  Route handler · validated
                </span>
              </div>

              {status === "success" ? (
                <div
                  className="flex min-h-[320px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid size-14 place-items-center rounded-full border border-green/25 bg-green/10 text-green">
                    <Check className="size-6" />
                  </span>
                  <h4 className="mt-5 text-lg font-semibold">Message sent</h4>
                  <p className="mt-2 max-w-xs text-[13px] leading-6 text-muted">
                    Thanks for reaching out. I&apos;ll get back to you at the
                    email you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full border border-line bg-surface-2 px-4 py-2 text-[12px] text-muted transition-colors hover:text-ink"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-5" noValidate>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Name"
                      id="name"
                      value={form.name}
                      onChange={(value) => update("name", value)}
                      placeholder="Your name"
                      error={errors.name}
                      autoComplete="name"
                    />
                    <Field
                      label="Email"
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(value) => update("email", value)}
                      placeholder="you@company.com"
                      error={errors.email}
                      autoComplete="email"
                    />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                      placeholder="What are you building? What role or project do you have in mind?"
                      rows={5}
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={cn(
                        "w-full resize-none rounded-xl border bg-surface-2 px-3.5 py-3 text-[13px] text-ink placeholder:text-muted-2 focus:border-accent/50 focus:outline-none",
                        errors.message ? "border-red/50" : "border-line",
                      )}
                    />
                    {errors.message ? (
                      <p id="message-error" className="mt-1.5 text-[11px] text-red">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="delivery"
                      className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2"
                    >
                      Delivery method
                    </label>
                    <div
                      id="delivery"
                      className="grid gap-2 sm:grid-cols-2"
                      role="radiogroup"
                      aria-label="Delivery method"
                    >
                      {DELIVERY_OPTIONS.map((option) => (
                        <label
                          key={option.id}
                          className={cn(
                            "flex items-center gap-2 rounded-xl border bg-surface-2 px-3 py-2 text-[12px] transition-colors",
                            form.delivery === option.id
                              ? "border-accent bg-accent/5 text-ink"
                              : "border-line text-muted hover:border-accent/30",
                          )}
                        >
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={form.delivery === option.id}
                            onChange={() => update("delivery", option.id)}
                            className="size-4 shrink-0 text-accent"
                            aria-label={option.label}
                          />
                          <option.icon className="size-3.5 shrink-0" />
                          <span className="font-medium">{option.label}</span>
                          <span className="ml-auto text-[10px] text-muted-2">
                            {option.description}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-start gap-2">
                    <input
                      id="send-copy"
                      type="checkbox"
                      checked={form.sendCopy}
                      onChange={(event) => update("sendCopy", event.target.checked)}
                      className="mt-0.5 size-4 shrink-0 text-accent"
                    />
                    <label
                      htmlFor="send-copy"
                      className="text-[12px] text-muted leading-5"
                    >
                      <span className="font-medium">Send me a copy</span>{" "}
                      <span className="text-muted-2">
                        — I&apos;ll receive a copy of this message at my email
                      </span>
                    </label>
                  </div>

                  {/* Honeypot: hidden from humans, tempting to bots. */}
                  <div className="hidden" aria-hidden>
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company}
                      onChange={(event) => update("company", event.target.value)}
                    />
                  </div>

                  {serverError ? (
                    <p
                      className="mt-3 rounded-lg border border-red/20 bg-red/5 px-3 py-2 text-[12px] text-red"
                      role="alert"
                    >
                      {serverError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-[#171208] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send message
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-[10px] leading-5 text-muted-2">
                    Protected by server-side validation, a honeypot, and rate
                    limiting. Your message goes straight to my inbox.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-xl border bg-surface-2 px-3.5 py-3 text-[13px] text-ink placeholder:text-muted-2 focus:border-accent/50 focus:outline-none",
          error ? "border-red/50" : "border-line",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[11px] text-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}
