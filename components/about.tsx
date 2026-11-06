"use client";

import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { education, experience, site } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const facts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, India",
  },
  {
    icon: Terminal,
    label: "Focus",
    value: "Full-stack + realtime",
  },
  {
    icon: Briefcase,
    label: "Currently",
    value: "SWE Intern @ LeapX",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "PWIOI × MSU · 2029",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-line py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="noise relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_left,#000,transparent_75%)]" />
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-3xl" />

              <p className="relative font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                01 — About
              </p>

              <div className="relative mt-8 flex items-end gap-4">
                <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-accent/25 bg-accent-soft">
                  <span className="text-gradient font-mono text-3xl font-semibold">
                    AB
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                </div>
                <div className="pb-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-2">
                    Ankit Bhalke
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-[-0.02em]">
                    Software Engineer
                  </p>
                  <p className="mt-1 text-[12px] text-muted">
                    Full-stack · realtime · security
                  </p>
                </div>
              </div>

              <p className="relative mt-6 text-[13px] leading-6 text-muted">
                I like the part of engineering where the product, the data
                model, and the failure modes all have to agree.
              </p>

              <div className="relative mt-6 space-y-2 border-t border-line pt-5">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 text-[12px]"
                  >
                    <span className="flex items-center gap-2 text-muted-2">
                      <Icon className="size-3.5" />
                      {label}
                    </span>
                    <span className="text-right text-muted">{value}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 flex items-center justify-between rounded-xl border border-green/15 bg-green/5 px-3 py-2.5">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-green">
                  <span className="size-1.5 rounded-full bg-green" />
                  Open to SDE internships
                </span>
                <Link
                  href="/#contact"
                  className="text-green transition-transform hover:-translate-y-0.5"
                  aria-label="Contact Ankit"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
              <span>Pune · IST</span>
              <span>{site.email}</span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              label="The longer version"
              title={
                <>
                  Curious about the parts that{" "}
                  <span className="text-gradient">break.</span>
                </>
              }
            />
          </Reveal>

          <div className="mt-6 space-y-4 text-pretty text-[15px] leading-7 text-muted">
            <Reveal delay={0.05}>
              <p>
                I&apos;m Ankit, a computer science student at PW Institute of
                Innovation in Pune. Most of what I build starts as a question
                I can&apos;t answer from a tutorial: how does a school ERP keep
                tenants apart? How does a call survive a dropped connection?
                How do you encrypt a chat without trusting the server?
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                So far that has meant a multi-tenant school ERP on Next.js and
                PostgreSQL, a WebRTC calling PWA with push notifications, and
                an end-to-end encrypted collaboration platform. I care about
                the unglamorous parts too — auth, tenant isolation, rate
                limits, empty states, and what the UI does when the network
                disappears.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Right now I&apos;m a Full Stack Developer Intern at nwo,
                shipping a blog CMS in a Turborepo monorepo. I&apos;m looking
                for SDE internships where I can own real surface area and learn
                from people who have shipped at scale.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {[
                {
                  title: "Ship the whole slice",
                  body: "Schema, API, auth, UI, deploy. Understanding the edges makes the middle better.",
                },
                {
                  title: "Make failure states real",
                  body: "Loading, empty, offline, and error paths are part of the product, not polish.",
                },
                {
                  title: "Write it down",
                  body: "If I can't explain the tradeoff, I don't understand the system yet.",
                },
              ].map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-accent" />
                    <h3 className="text-[13px] font-medium">{principle.title}</h3>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-5 text-muted">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                  Currently
                </p>
                <p className="mt-1 text-[13px]">
                  {experience[0].role} · {experience[0].company}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                  Studying
                </p>
                <p className="mt-1 text-[13px]">{education[0].degree}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
