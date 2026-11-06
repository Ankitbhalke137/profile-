"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./project-visual";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} case study`}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/35 focus-visible:border-accent/50",
        project.span,
      )}
    >
      <div className="p-2 sm:p-2.5">
        <div className="overflow-hidden rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.015]">
          <ProjectVisual kind={project.visual} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
          <span className="flex items-center gap-2">
            {project.links.live ? (
              <span className="size-1.5 rounded-full bg-green" />
            ) : null}
            {project.category}
          </span>
          <span>{project.year}</span>
        </div>

        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
            {project.title}
          </h3>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        <p className="mt-2 max-w-xl text-pretty text-[13px] leading-6 text-muted">
          {project.tagline}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[9px] text-muted"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 ? (
            <span className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[9px] text-muted-2">
              +{project.stack.length - 4}
            </span>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-colors duration-300 group-hover:ring-accent/20" />
    </motion.article>
  );
}
