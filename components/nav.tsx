"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = navLinks
      .map((link) => link.href.split("#")[1])
      .filter(Boolean) as string[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openCommand = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3 sm:pt-4">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4",
            scrolled
              ? "border-line bg-bg/80 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Ankit Bhalke — home"
            onClick={() => setOpen(false)}
          >
            <span className="grid size-9 place-items-center rounded-xl border border-accent/30 bg-accent-soft font-mono text-[13px] font-semibold text-accent transition-transform duration-300 group-hover:-rotate-6">
              AB
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13px] font-medium tracking-[-0.01em]">
                Ankit Bhalke
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                Software Engineer
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const id = link.href.split("#")[1];
              const isActive = active === id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[13px] transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="mr-1 hidden items-center gap-2 rounded-full border border-green/20 bg-green/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-green xl:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-green" />
              </span>
              Open to SDE internships
            </span>

            <button
              type="button"
              onClick={openCommand}
              className="hidden items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-[10px] text-muted transition-colors hover:border-line-strong hover:text-ink md:flex"
              aria-label="Open command palette"
            >
              <Command className="size-3" />
              <span>K</span>
            </button>

            <ThemeToggle />

            <Link
              href="/resume"
              className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-[12px] font-semibold text-[#171208] transition-transform hover:-translate-y-0.5 sm:flex"
            >
              Resume
              <ArrowUpRight className="size-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid size-9 place-items-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="container-x lg:hidden"
          >
            <div className="mt-2 rounded-2xl border border-line bg-bg/95 p-4 shadow-2xl backdrop-blur-xl">
              <nav className="flex flex-col" aria-label="Mobile">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-3.5 text-lg tracking-[-0.02em] text-ink last:border-none"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[10px] text-muted">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex items-center justify-between gap-3">
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-[#171208]"
                >
                  Resume
                  <ArrowUpRight className="size-4" />
                </Link>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-line px-4 py-3 text-sm text-muted"
                >
                  GitHub
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-green">
                <span className="size-1.5 rounded-full bg-green" />
                Open to SDE internships
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
