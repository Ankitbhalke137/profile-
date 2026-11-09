import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendToTelegram(message: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.info("[telegram] Bot token or chat ID not configured", {
      message,
    });
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch (error) {
    console.error("[telegram] send failed", error);
  }
}

// Extract the real client IP from the request
// Priority: cf-connecting-ip (Cloudflare) > x-forwarded-for > x-real-ip > request.ip
function getClientIP(request: Request): string {
  // Cloudflare connects header (most accurate when behind Cloudflare)
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) {
    // cf-connecting-ip should already be just the client IP
    return cfIp.trim();
  }

  // Standard x-forwarded-for (reverse proxy)
  // Format: "client, proxy1, proxy2" — take the first (leftmost) IP
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const ips = xff.split(",");
    return ips[0].trim();
  }

  // x-real-ip header (commonly used by NGINX, HAProxy)
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  // Fallback to Node.js request.ip (direct connection, no proxy)
  // @ts-ignore - Node.js Request.ip property
  return (request as any).ip || "unknown";
}

// Simple geolocation using a free IP service
// Note: Free IP geolocation without API keys has limitations.
// This uses a basic approach — for production, consider ipinfo.io or similar with an API key.
async function getGeoInfo(ip: string) {
  try {
    // Using ipapi.co's IP lookup endpoint (free tier, no key required for basic use)
    // Format: https://ipapi.co/<IP>/json/
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("Geo API error");
    const data = await res.json();
    return {
      city: data.city ?? "unknown",
      region: data.region ?? "unknown",
      country: data.country_name ?? "unknown",
      org: data.org ?? "unknown",
    };
  } catch {
    // If geolocation fails, return unknown values but don't break the flow
    return {
      city: "unknown",
      region: "unknown",
      country: "unknown",
      org: "unknown",
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, data } = body;

    const ip = getClientIP(request);
    const ua = request.headers.get("user-agent") ?? "unknown";

    // Get geolocation info for the IP
    const geo = await getGeoInfo(ip);

    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    let text = `<b>🔍 Portfolio Visit</b>\n`;
    text += `<b>🕐 Time:</b> ${time}\n`;
    text += `<b>🌐 IP:</b> <code>${ip}</code>\n`;
    text += `<b>📍 City:</b> ${geo.city}\n`;
    text += `<b>🌐 Region:</b> ${geo.region}\n`;
    text += `<b>🏳️ Country:</b> ${geo.country}\n`;
    text += `<b>📡 Network:</b> ${geo.org}\n`;
    text += `<b>📱 UA:</b> <code>${ua}</code>\n`;

    if (event === "page_visit") {
      text += `<b>📄 Page:</b> ${data?.path ?? "/"}\n`;
      text += `<b>🔗 Referrer:</b> ${data?.referrer ?? "direct"}\n`;
    } else if (event === "click") {
      text += `<b>👆 Click:</b> ${data?.element ?? "unknown"}\n`;
      text += `<b>📄 Page:</b> ${data?.path ?? "/"}\n`;
      if (data?.href) text += `<b>🔗 To:</b> ${data.href}\n`;
    } else if (event === "session") {
      text += `<b>⏱ Time spent:</b> ${data?.duration ?? 0}s\n`;
      text += `<b>📄 Pages visited:</b> ${data?.pages ?? 0}\n`;
    }

    await sendToTelegram(text);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
