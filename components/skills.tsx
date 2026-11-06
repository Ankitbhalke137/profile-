"use client";

import {
  BookOpen,
  Code,
  LayoutPanelTop,
  Server,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { skillGroups } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  layout: LayoutPanelTop,
  server: Server,
  shield: ShieldCheck,
  wrench: Wrench,
  book: BookOpen,
};

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            label="02 — Toolbox"
            title={
              <>
                The stack I <span className="text-gradient">actually use.</span>
              </>
            }
            description="Grouped by where it sits in the system. No percentage bars — the projects above are the evidence."
          />
          <p className="max-w-xs font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted-2 lg:text-right">
            TypeScript-first
            <br />
            PostgreSQL when it matters
            <br />
            realtime when it fits
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const Icon = iconMap[group.icon] ?? Code;
            return (
              <Reveal key={group.title} delay={groupIndex * 0.04}>
                <div className="group h-full rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/25">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 text-muted transition-colors group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                      0{groupIndex + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-medium">{group.title}</h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.25,
                          delay: skillIndex * 0.025,
                        }}
                        className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:border-accent/30 hover:text-ink"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-3 flex flex-col justify-between gap-3 rounded-2xl border border-accent/15 bg-accent-soft/40 px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                <BookOpen className="size-4" />
              </span>
              <div>
                <p className="text-[13px] font-medium">Currently going deeper</p>
                <p className="text-[12px] text-muted">
                  System design · cloud fundamentals · DSA
                </p>
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
              Always shipping something
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
