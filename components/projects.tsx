"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, GitFork } from "lucide-react";
import {
  categories,
  projects,
  site,
  type Project,
  type ProjectCategory,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";

type Filter = (typeof categories)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            label="01 — Selected work"
            title={
              <>
                Things I&apos;ve <span className="text-gradient">shipped.</span>
              </>
            }
            description="Not tutorials. Deployed products with auth, databases, realtime transport, and failure states. Open any card for the problem, the build, and the hard part."
          />
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-surface-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-line-strong hover:text-ink lg:self-end"
          >
            <GitFork className="size-3.5" />
            All repositories
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const isActive = filter === category;
            const count =
              category === "All"
                ? projects.length
                : projects.filter((project) => project.category === category)
                    .length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                  isActive
                    ? "border-accent/40 bg-accent-soft text-accent"
                    : "border-line bg-surface-2 text-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {category}
                <span
                  className={cn(
                    "ml-1.5 text-[9px]",
                    isActive ? "text-accent/60" : "text-muted-2",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted">
            Nothing in this category yet.
          </p>
        ) : null}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
