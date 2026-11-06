"use client";

import { ArrowUpRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";
import { education, experience } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            label="03 — Experience"
            title={
              <>
                Where I&apos;ve <span className="text-gradient">worked.</span>
              </>
            }
            description="Internships and the education behind them. For the full timeline, open the resume."
          />
          <Link
            href="/resume"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-surface-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-line-strong hover:text-ink lg:self-end"
          >
            Full resume
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-10">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
                Work history
              </p>
              <p className="mt-3 max-w-xs text-[13px] leading-6 text-muted">
                Two internships, both focused on shipping real product surface
                area rather than watching from the sidelines.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-green">
                <span className="size-1.5 rounded-full bg-green" />
                Available for 2027 internships
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[7px]" />
            <div className="space-y-8">
              {experience.map((job, index) => (
                <Reveal key={job.company} delay={index * 0.06}>
                  <div className="relative pl-8 sm:pl-10">
                    <span className="absolute left-0 top-1.5 grid size-[11px] place-items-center rounded-full border border-accent/40 bg-bg sm:size-[15px]">
                      <span className="size-1.5 rounded-full bg-accent" />
                    </span>

                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">
                        {job.role}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                        {job.period}
                      </p>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
                      <span className="flex items-center gap-1.5 text-accent">
                        <Briefcase className="size-3" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-2">
                        <MapPin className="size-3" />
                        {job.location}
                      </span>
                    </div>

                    <p className="mt-3 max-w-2xl text-[13px] leading-6 text-muted">
                      {job.summary}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[12px] leading-5 text-muted-2"
                        >
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/50" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <Reveal>
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-accent" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
                Education
              </h3>
            </div>
          </Reveal>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {education.map((school, index) => (
              <Reveal key={school.school} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-surface p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-[14px] font-medium">{school.school}</h4>
                      <p className="mt-1 text-[12px] text-accent">
                        {school.degree}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                      {school.period}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] leading-5 text-muted">
                    {school.detail}
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                    <MapPin className="size-3" />
                    {school.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
