"use client";

import { useEffect, useState, useCallback } from "react";

const TRACK_URL = "/api/telegram/track";

let sessionStart = Date.now();
let pagesVisited = new Set<string>();

async function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  try {
    await fetch(TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, data: { ...data, path: window.location.pathname } }),
    });
  } catch {
    // Silently fail — tracking should never break the site
  }
}

export function TelegramTracker() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Track initial page visit
    track("page_visit", { referrer: document.referrer });
    setInitialized(true);

    // Track time spent on unload / before page leave
    const onUnload = () => {
      const duration = Math.round((Date.now() - sessionStart) / 1000);
      navigator.sendBeacon(
        TRACK_URL,
        JSON.stringify({
          event: "session",
          data: {
            duration,
            pages: pagesVisited.size,
            path: window.location.pathname,
          },
        }),
      );
    };

    window.addEventListener("beforeunload", onUnload);
    window.addEventListener("unload", onUnload);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
      window.removeEventListener("unload", onUnload);
    };
  }, []);

  // Track clicks on important elements (links, buttons, contact form, etc.)
  const onClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      const link = target.closest("a");
      const button = target.closest("button");

      if (link) {
        const href = link.getAttribute("href") ?? "";
        const text = link.textContent?.trim() ?? "link";
        track("click", { element: text, href });
      } else if (button) {
        const text = button.textContent?.trim() ?? "button";
        track("click", { element: text });
      }
    },
    [],
  );

  useEffect(() => {
    if (!initialized) return;
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [initialized, onClick]);

  return null;
}
