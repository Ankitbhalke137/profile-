"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Code,
  FolderGit2,
  GitFork,
  Users,
} from "lucide-react";
import { site } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type GitHubData = {
  live: boolean;
  user: {
    public_repos: number;
    followers: number;
    following: number;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    html_url: string;
  };
  languages: { name: string; count: number; percent: number }[];
  repos: {
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    homepage: string | null;
    pushed_at: string;
  }[];
};

const fallback: GitHubData = {
  live: false,
  user: {
    public_repos: 21,
    followers: 6,
    following: 8,
    name: "Ankit Bhalke",
    bio: "Full-Stack Developer | CS & AI Student @ PWIOI x MSU | Intern @ LeapX Pune",
    avatar_url: "",
    html_url: site.github,
  },
  languages: [
    { name: "TypeScript", count: 9, percent: 38 },
    { name: "JavaScript", count: 6, percent: 25 },
    { name: "HTML", count: 4, percent: 17 },
    { name: "CSS", count: 3, percent: 13 },
    { name: "Python", count: 2, percent: 7 },
  ],
  repos: [
    {
      name: "Project-_Classforge",
      description: "Multi-tenant school ERP",
      language: "TypeScript",
      html_url: "https://github.com/Ankitbhalke137/Project-_Classforge",
      homepage: "https://project-classforge.vercel.app",
      pushed_at: "2026-10-29T00:00:00Z",
    },
    {
      name: "voicecall-pwa",
      description: "Browser-based voice calling PWA",
      language: "TypeScript",
      html_url: "https://github.com/Ankitbhalke137/voicecall-pwa",
      homepage: "https://ankitbhalke137.github.io/voicecall-pwa/",
      pushed_at: "2026-09-04T00:00:00Z",
    },
    {
      name: "Eduspear",
      description: "End-to-end encrypted collaboration platform",
      language: "JavaScript",
      html_url: "https://github.com/Ankitbhalke137/Eduspear",
      homepage: null,
      pushed_at: "2026-07-25T00:00:00Z",
    },
  ],
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  SQL: "#e38c00",
};

export function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    let active = true;

    fetch("/api/github")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((json: Partial<GitHubData>) => {
        if (!active) return;
        if (json.live && json.user && json.languages && json.repos) {
          setData(json as GitHubData);
        } else {
          setData(fallback);
        }
      })
      .catch(() => {
        if (active) setData(fallback);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="github"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            label="04 — Built in public"
            title={
              <>
                Code, commits, and{" "}
                <span className="text-gradient">receipts.</span>
              </>
            }
            description="Pulled live from the GitHub API. Cached hourly, with a static fallback so this section never breaks."
          />
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-surface-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-line-strong hover:text-ink lg:self-end"
          >
            <GitFork className="size-3.5" />
            @Ankitbhalke137
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-3">
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: FolderGit2,
                    label: "Public repos",
                    value: data?.user.public_repos ?? 21,
                  },
                  {
                    icon: Users,
                    label: "Followers",
                    value: data?.user.followers ?? 6,
                  },
                  {
                    icon: Code,
                    label: "Languages",
                    value: data?.languages.length ?? 5,
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-line bg-surface p-4"
                    >
                      <Icon className="size-3.5 text-accent" />
                      <p className="mt-3 font-mono text-2xl font-semibold tracking-tight">
                        {loading ? (
                          <span className="inline-block h-6 w-8 animate-shimmer rounded" />
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-2">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                    Language mix
                  </h3>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-2">
                    <span
                      className={`size-1.5 rounded-full ${
                        data?.live ? "bg-green" : "bg-muted-2"
                      }`}
                    />
                    {loading ? "syncing" : data?.live ? "live" : "cached"}
                  </span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {(data?.languages ?? fallback.languages).map((language) => (
                    <div key={language.name}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-2 text-muted">
                          <span
                            className="size-2 rounded-full"
                            style={{
                              backgroundColor:
                                languageColors[language.name] ?? "#9a978f",
                            }}
                          />
                          {language.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted-2">
                          {language.percent}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
                        <motion.div
                          initial={reduce ? false : { width: 0 }}
                          whileInView={
                            reduce ? undefined : { width: `${language.percent}%` }
                          }
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor:
                              languageColors[language.name] ?? "#9a978f",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                  Recently pushed
                </h3>
                <a
                  href={site.github}
                  className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent transition-opacity hover:opacity-70"
                >
                  View all
                </a>
              </div>

              <div className="mt-2 divide-y divide-line">
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="py-3.5">
                        <div className="h-3.5 w-36 animate-shimmer rounded" />
                        <div className="mt-2 h-3 w-full animate-shimmer rounded" />
                      </div>
                    ))
                  : (data?.repos ?? fallback.repos).map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start justify-between gap-4 py-3.5"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-mono text-[12px] text-ink transition-colors group-hover:text-accent">
                              {repo.name}
                            </span>
                            {repo.homepage ? (
                              <span className="rounded border border-green/20 bg-green/5 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-green">
                                live
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 truncate text-[11px] text-muted">
                            {repo.description ?? "No description"}
                          </p>
                          <div className="mt-1.5 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-2">
                            {repo.language ? (
                              <span className="flex items-center gap-1.5">
                                <span
                                  className="size-1.5 rounded-full"
                                  style={{
                                    backgroundColor:
                                      languageColors[repo.language] ?? "#9a978f",
                                  }}
                                />
                                {repo.language}
                              </span>
                            ) : null}
                            <span>pushed {formatDate(repo.pushed_at)}</span>
                          </div>
                        </div>
                        <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-muted-2 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </a>
                    ))}
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-line pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                  {data?.live
                    ? "Live GitHub API · cached 1h"
                    : "Static fallback · API offline"}
                </p>
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Next.js route handler
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
