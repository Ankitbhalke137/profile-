"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, GitFork, X } from "lucide-react";
import type { Project } from "@/lib/data";
import { ProjectVisual } from "./project-visual";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.985 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line-strong bg-surface shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:rounded-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface/90 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                <span className="size-1.5 rounded-full bg-accent" />
                Case study · {project.category}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="grid size-8 place-items-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-3 sm:p-4">
              <ProjectVisual kind={project.visual} />
            </div>

            <div className="px-5 pb-8 pt-2 sm:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {project.year} · {project.category}
                  </p>
                  <h2
                    id="project-modal-title"
                    className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
                  >
                    {project.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-[#171208] transition-transform hover:-translate-y-0.5"
                    >
                      Live demo
                      <ArrowUpRight className="size-4" />
                    </a>
                  ) : null}
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-line-strong"
                  >
                    <GitFork className="size-4 text-muted" />
                    Source
                  </a>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-7 text-muted">
                {project.description}
              </p>

              <div className="mt-8 grid gap-8 sm:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
                    What I built
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted">
                        <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full border border-accent/25 bg-accent-soft text-accent">
                          <Check className="size-2.5" />
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
                    Stack
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-line bg-surface-2 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                      The hard part
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-muted">
                      {project.challenge}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
