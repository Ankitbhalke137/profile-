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

// Free IP geolocation services — prioritized for best coverage
const IP_GEO_SERVICES = [
  {
    name: "ipapi.co",
    url: (ip: string) => `https://ipapi.co/${ip}/json/`,
    // Free tier: no key required but rate-limited (~1k/day per IP)
  },
  {
    name: "ipinfo.io",
    url: (ip: string) => `https://ipinfo.io/${ip}/json`,
    // Free tier: ~1k requests/day without key, with key: unlimited
    // Returns: { ip, city, region, country, org, hostname, ... }
  },
];

async function getGeoInfo(ip: string) {
  // Try each geolocation service in priority order
  for (const service of IP_GEO_SERVICES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(service.url(ip), {
        method: "GET",
        signal: controller.signal,
        headers: service.name === "ipinfo.io" ? { "Accept": "application/json" } : {},
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        // If we got a meaningful error, check if it's a rate limit or valid error
        if (errData.reason === "RateLimited" || errData.error) {
          // Continue to next service
          continue;
        }
        // If it's a valid response with data, use it
        const data = errData;
        if (data.city || data.country) {
          return {
            city: data.city ?? "unknown",
            region: data.region ?? data.city ? data.city : "unknown",
            country: data.country_name ?? data.country ?? "unknown",
            org: data.org ?? "unknown",
          };
        }
        continue; // Try next service
      }

      const data = await res.json();

      // ipapi.co response format: { city, region, country_name, org, ... }
      // ipinfo.io response format: { ip, city, region, country, org, hostname, ... }
      if (data.city || data.region) {
        return {
          city: data.city ?? data.region ? data.region : "unknown",
          region: data.region ?? data.city ? data.city : "unknown",
          country: data.country_name ?? data.country ?? "unknown",
          org: data.org ?? data.postal ?? "unknown",
        };
      }
    } catch {
      // Continue to next service on any error
      continue;
    }
  }

  // If all services fail, return unknown values but don't break the flow
  return {
    city: "unknown",
    region: "unknown",
    country: "unknown",
    org: "unknown",
  };
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
