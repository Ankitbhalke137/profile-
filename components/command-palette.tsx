"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Command,
  CornerDownLeft,
  FileText,
  FolderGit2,
  GitFork,
  House,
  Layers,
  AtSign,
  Mail,
  Moon,
  Search,
  Sun,
  User,
  type LucideIcon,
} from "lucide-react";
import { navLinks, projects, site } from "@/lib/data";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  title: string;
  hint: string;
  group: string;
  icon: LucideIcon;
  keywords: string;
  action: () => void;
};

const sectionIcons: Record<string, LucideIcon> = {
  Work: FolderGit2,
  About: User,
  Skills: Layers,
  Experience: Briefcase,
  Contact: Mail,
};

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const goToSection = (id: string) => {
    close();
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  const items = useMemo<PaletteItem[]>(() => {
    const sectionItems = navLinks.map((link) => {
      const id = link.href.split("#")[1];
      return {
        id: `section-${id}`,
        title: link.label,
        hint: "Jump to section",
        group: "Navigate",
        icon: sectionIcons[link.label] ?? House,
        keywords: `${link.label} ${id}`,
        action: () => goToSection(id),
      };
    });

    const projectItems = projects.map((project) => ({
      id: `project-${project.slug}`,
      title: project.title,
      hint: `${project.category} · ${project.year}`,
      group: "Projects",
      icon: FolderGit2,
      keywords: `${project.title} ${project.stack.join(" ")} ${project.category}`,
      action: () => goToSection("work"),
    }));

    const actions: PaletteItem[] = [
      {
        id: "resume",
        title: "Open resume",
        hint: "View and print",
        group: "Actions",
        icon: FileText,
        keywords: "resume cv pdf print",
        action: () => {
          close();
          router.push("/resume");
        },
      },
      {
        id: "github",
        title: "GitHub",
        hint: "github.com/Ankitbhalke137",
        group: "Links",
        icon: GitFork,
        keywords: "github code source repos",
        action: () => {
          close();
          window.open(site.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        title: "LinkedIn",
        hint: "linkedin.com/in/ankit-bhalke",
        group: "Links",
        icon: AtSign,
        keywords: "linkedin work experience",
        action: () => {
          close();
          window.open(site.linkedin, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "email",
        title: "Send an email",
        hint: site.email,
        group: "Links",
        icon: Mail,
        keywords: "email contact mail",
        action: () => {
          close();
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "theme",
        title:
          resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        hint: "Toggle appearance",
        group: "Actions",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        keywords: "theme dark light appearance toggle",
        action: () => {
          close();
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        },
      },
    ];

    return [...sectionItems, ...projectItems, ...actions];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, resolvedTheme, router, setTheme]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      `${item.title} ${item.hint} ${item.keywords}`
        .toLowerCase()
        .includes(needle),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const keyHandler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("open-command-palette", openHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("open-command-palette", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(timer);
    };
  }, [open]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % Math.max(filtered.length, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) =>
          (index - 1 + Math.max(filtered.length, 1)) %
          Math.max(filtered.length, 1),
      );
    }
    if (event.key === "Enter") {
      event.preventDefault();
      filtered[activeIndex]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_32px_100px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, projects, links…"
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted-2 focus:outline-none"
                aria-label="Search command palette"
              />
              <kbd className="hidden rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                esc
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-muted">
                  No results for “{query}”.
                </p>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={item.action}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        isActive
                          ? "bg-accent-soft text-ink"
                          : "text-muted hover:bg-surface-2 hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-lg border",
                          isActive
                            ? "border-accent/30 bg-accent/10 text-accent"
                            : "border-line bg-surface-2 text-muted",
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">
                          {item.title}
                        </span>
                        <span className="block truncate text-[11px] text-muted-2">
                          {item.hint}
                        </span>
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                        {item.group}
                      </span>
                      {isActive ? (
                        <CornerDownLeft className="size-3.5 shrink-0 text-accent" />
                      ) : null}
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted-2">
              <span className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Command className="size-3" />K
                <span className="ml-1">to toggle</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
