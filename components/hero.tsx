"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowDownRight, ArrowUpRight, FileText, GitFork, MapPin } from "lucide-react";
import { site, stats } from "@/lib/data";
import { Terminal } from "./terminal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_10%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 hero-glow" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-green/20 bg-green/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-green">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-green" />
                </span>
                Open to SDE internships
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                <MapPin className="size-3" />
                Pune, India
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.2rem]"
            >
              I build{" "}
              <span className="text-gradient">full-stack products</span> that
              hold up under real users.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-[15px] leading-7 text-muted sm:text-base"
            >
              CS student at PW Institute of Innovation. I&apos;ve shipped a
              multi-tenant school ERP, a WebRTC calling PWA, and an
              end-to-end encrypted collaboration platform — then wrote down
              what broke.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-[#171208] transition-transform hover:-translate-y-0.5"
              >
                View selected work
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-line-strong"
              >
                <FileText className="size-4 text-muted" />
                Resume
              </Link>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="grid size-11 place-items-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <GitFork className="size-4" />
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-xl font-semibold tracking-tight text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-2">
                    {stat.label}
                  </p>
                </div>
              ))}
              <Link
                href="/#contact"
                className="group ml-auto flex items-center gap-2 self-end font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
              >
                Let&apos;s talk
                <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/5 blur-2xl" />
            <Terminal />

            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute -left-3 top-16 hidden rounded-lg border border-line-strong bg-surface px-2.5 py-1.5 font-mono text-[10px] text-muted shadow-lg sm:block"
            >
              Next.js
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ delay: 1.25, duration: 0.4 }}
              className="absolute -right-2 top-1/2 hidden rounded-lg border border-line-strong bg-surface px-2.5 py-1.5 font-mono text-[10px] text-muted shadow-lg sm:block"
            >
              PostgreSQL
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="absolute -bottom-4 left-10 hidden rounded-lg border border-line-strong bg-surface px-2.5 py-1.5 font-mono text-[10px] text-muted shadow-lg sm:block"
            >
              WebRTC
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
