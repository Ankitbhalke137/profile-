"use client";

import { Download } from "lucide-react";

export default function ResumePage() {
  const download = () => {
    const a = document.createElement("a");
    a.href = "/resume/Ankit-Bhalke-Resume.pdf";
    a.download = "Ankit-Bhalke-Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section className="relative container-x scroll-mt-24 py-20 sm:py-28">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            02 — Resume
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            The short version.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-[15px] leading-7 text-muted">
            One page, ATS-friendly, no photo fluff, no birthday, no “I&apos;m a
            designer”. It&apos;s the document I send to recruiters who need the
            whole story in one page.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-[#171208] transition-transform hover:-translate-y-0.5"
            >
              <Download className="size-4" />
              Download PDF
            </button>
            <a
              href="/resume/Ankit-Bhalke-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-line bg-surface-2 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-line-strong"
            >
              Open in new tab
            </a>
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
            Updated Nov 2026 · 1 page · ATS-friendly layout
          </p>
        </div>

        <div className="surface-card rounded-2xl border p-6 sm:p-8">
          <div className="rounded-xl border border-line bg-surface-2 p-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              At a glance
            </h2>
            <dl className="mt-5 space-y-4">
              {[
                ["Name", "Ankit Bhalke"],
                ["Role", "Software Engineer (SDE track)"],
                ["Location", "Pune, India"],
                ["Email", "bhalkeankit@gmail.com"],
                ["GitHub", "@Ankitbhalke137"],
                ["LinkedIn", "ankit-bhalke"],
                ["Education", "B.Tech CS & AI — PWIOI × MSU (2025–2029)"],
                ["Internship", "SDE Intern — LeapX, Pune (2026–Present)"],
                ["Previous", "YIIC Intern — Scaler (2025)"],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5 text-sm last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                    {term}
                  </dt>
                  <dd className="text-right text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-xl border border-accent/20 bg-accent-soft/50 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                Currently
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Software Engineer Intern at LeapX, building the blog CMS in a
                Turborepo monorepo. Full-time SDE internship roles opening in
                2027.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
