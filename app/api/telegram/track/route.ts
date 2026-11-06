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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, data } = body;

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const ua = request.headers.get("user-agent") ?? "unknown";
    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    let text = `<b>🔍 Portfolio Visit</b>\n`;
    text += `<b>🕐 Time:</b> ${time}\n`;
    text += `<b>🌐 IP:</b> <code>${ip}</code>\n`;
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
