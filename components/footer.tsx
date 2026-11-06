import Link from "next/link";
import { ArrowUpRight, GitFork, AtSign, Mail } from "lucide-react";
import { navLinks, site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="container-x py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-accent/30 bg-accent-soft font-mono text-[13px] font-semibold text-accent">
                AB
              </span>
              <span className="text-sm font-medium">Ankit Bhalke</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Software engineer in Pune, building full-stack products and
              realtime systems. Open to SDE internships.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resume"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Resume
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
            © {new Date().getFullYear()} Ankit Bhalke · Built with Next.js
          </p>
          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <GitFork className="size-4" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <AtSign className="size-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <Mail className="size-4" />
            </a>
            <Link
              href="/resume"
              className="ml-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
            >
              Resume <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
