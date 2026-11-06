export type ProjectCategory =
  | "Full-stack"
  | "Realtime"
  | "Security"
  | "Frontend"
  | "Database";

export type ProjectVisual =
  | "classforge"
  | "voicecall"
  | "eduspear"
  | "news"
  | "finance"
  | "dbms";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  category: ProjectCategory;
  stack: string[];
  highlights: string[];
  challenge: string;
  links: {
    live?: string;
    source: string;
  };
  visual: ProjectVisual;
  span: string;
  featured?: boolean;
};

export const site = {
  name: "Ankit Bhalke",
  role: "Software Engineer",
  email: "bhalkeankit@gmail.com",
  location: "Pune, India",
  github: "https://github.com/Ankitbhalke137",
  linkedin: "https://www.linkedin.com/in/ankit-bhalke",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ankitbhalke.vercel.app",
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export const projects: Project[] = [
  {
    slug: "classforge",
    title: "ClassForge",
    tagline: "Multi-tenant school ERP that runs an entire campus from one deployment.",
    description:
      "A production school ERP where a platform admin provisions schools and each school runs its own students, staff, and operations. Built on real PostgreSQL data with tenant-aware auth, role-based access, and a single Next.js codebase.",
    year: "2026",
    category: "Full-stack",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Zod",
      "Playwright",
    ],
    highlights: [
      "Tenant isolation with school-scoped routing, server-side authorization, and PostgreSQL row-level security.",
      "Role-based access for platform admins, school admins, teachers, and students.",
      "Security hardening: CSRF protection, rate limiting, Zod validation, and bcrypt password hashing.",
      "Prisma migrations, seed scripts, and Playwright checks for critical flows.",
    ],
    challenge:
      "The hard part was tenant isolation. Every query has to be scoped to the current school while still letting the platform admin cross tenant boundaries. I combined school-slug routing, server-side authorization checks, and PostgreSQL RLS so a missing WHERE clause cannot leak another school's data.",
    links: {
      live: "https://project-classforge.vercel.app",
      source: "https://github.com/Ankitbhalke137/Project-_Classforge",
    },
    visual: "classforge",
    span: "lg:col-span-7",
    featured: true,
  },
  {
    slug: "voicecall",
    title: "VoiceCall",
    tagline: "Browser-based voice calling that feels native — no installs, no app store.",
    description:
      "A production-grade PWA for peer-to-peer voice calls with accounts, contacts, presence, push notifications, and a full call state machine. Self-hosted with zero third-party realtime services.",
    year: "2026",
    category: "Realtime",
    stack: [
      "WebRTC",
      "WebSocket",
      "JWT",
      "SQLite",
      "Web Push",
      "Zustand",
      "React",
    ],
    highlights: [
      "Peer-to-peer audio calling on desktop and mobile with WebRTC.",
      "JWT accounts, contact search, and live online presence over WebSockets.",
      "Web Push notifications ring even when the app is closed, with Answer and Decline actions.",
      "Explicit call state machine: IDLE → RINGING → CONNECTED → RECONNECTING → TERMINATED.",
      "Telegram bot logs every call with duration and status.",
    ],
    challenge:
      "Calls need to survive the messy middle: ringing, reconnects, offline callees, and suspended tabs. I modeled the lifecycle as an explicit Zustand state machine and buffered incoming calls for 60 seconds so answering from a push notification still connects.",
    links: {
      live: "https://ankitbhalke137.github.io/voicecall-pwa/",
      source: "https://github.com/Ankitbhalke137/voicecall-pwa",
    },
    visual: "voicecall",
    span: "lg:col-span-5",
    featured: true,
  },
  {
    slug: "eduspear",
    title: "Eduspear",
    tagline: "An encrypted campus network for chat, files, and study sessions.",
    description:
      "A real-time educational collaboration platform with end-to-end encrypted messaging, encrypted file sharing, code snippets, multiplayer games, and a study hub.",
    year: "2026",
    category: "Security",
    stack: [
      "React 19",
      "Node.js",
      "Express 5",
      "Socket.io",
      "Web Crypto",
      "AES-GCM",
    ],
    highlights: [
      "ECDH P-256 key exchange for direct messages, with PBKDF2-derived AES-GCM keys for lobby chat.",
      "Encrypted file sharing up to 10MB and end-to-end encrypted code snippets.",
      "Typing indicators, read receipts, and a global encrypted lobby.",
      "Multiplayer Tic-Tac-Toe, Connect 4, and Rock Paper Scissors.",
      "Study hub with trivia and flashcards plus built-in rate limiting.",
    ],
    challenge:
      "The privacy model had to be real, not a badge. Key exchange happens client-side with the Web Crypto API and the server only relays ciphertext. Group lobby chat uses a PBKDF2-derived key while DMs use per-conversation ECDH keys.",
    links: {
      live: "https://fun-chat-wnow.onrender.com/",
      source: "https://github.com/Ankitbhalke137/Eduspear",
    },
    visual: "eduspear",
    span: "lg:col-span-5",
    featured: true,
  },
  {
    slug: "live-news-feed",
    title: "Chronicle News",
    tagline: "A framework-free news reader built like a small frontend system.",
    description:
      "A live news aggregator in vanilla JavaScript with a deliberate data/render/controller split, debounced search, bookmarks, auto-refresh, and a persisted theme.",
    year: "2026",
    category: "Frontend",
    stack: ["HTML", "CSS", "JavaScript", "ES Modules", "NewsData.io"],
    highlights: [
      "Clean ES6 module architecture: api.js, render.js, and app.js.",
      "Debounced keyword search, category tabs, and pagination.",
      "Bookmarks and dark mode persisted in localStorage.",
      "60-second auto-refresh with a new-content banner.",
      "Loading, error, and empty states for every request.",
    ],
    challenge:
      "No framework means no free state management. I split the app into network, DOM, and controller modules so each layer stayed predictable as features stacked up, and every async path had an explicit UI state.",
    links: {
      live: "https://ankitbhalke137.github.io/LIVE-NEWS-FEED/",
      source: "https://github.com/Ankitbhalke137/LIVE-NEWS-FEED",
    },
    visual: "news",
    span: "lg:col-span-7",
  },
  {
    slug: "expense-tracker",
    title: "CapitalControl",
    tagline: "A finance dashboard that turns a ledger into decisions.",
    description:
      "A complete expense tracker with CRUD transactions, category budgets, CSV export, and a Chart.js analytics dashboard — all in vanilla JS with localStorage persistence.",
    year: "2026",
    category: "Frontend",
    stack: ["HTML", "CSS", "JavaScript", "Chart.js", "localStorage"],
    highlights: [
      "Real-time dashboard with income, expenses, balance, and month-over-month growth.",
      "Full transaction ledger with filtering, search, and CSV export.",
      "Category budgets with over-budget alerts and month-end forecasting.",
      "Savings rate, cash-flow trends, and category breakdown charts.",
      "Responsive sidebar and mobile drawer.",
    ],
    challenge:
      "The interesting part was keeping derived analytics consistent after every CRUD action without a state library. I centralized mutations and recomputed the dashboard from a single ledger source of truth.",
    links: {
      live: "https://ankitbhalke137.github.io/Expense-tracker/",
      source: "https://github.com/Ankitbhalke137/Expense-tracker",
    },
    visual: "finance",
    span: "lg:col-span-6",
  },
  {
    slug: "social-media-dbms",
    title: "Social Graph DBMS",
    tagline: "A normalized MySQL schema for a full social platform.",
    description:
      "A database design capstone covering users, posts, comments, DMs, hashtags, groups, follows, and engagement — normalized to 3NF with views, triggers, and analytics.",
    year: "2026",
    category: "Database",
    stack: ["MySQL", "SQL", "ER Modeling", "Database Design"],
    highlights: [
      "Third normal form schema with a complete ER diagram and data dictionary.",
      "Advanced SQL views, triggers, and engagement analytics.",
      "Many-to-many modeling for follows, memberships, likes, and hashtags.",
      "Seed data and a reproducible setup guide.",
    ],
    challenge:
      "Modeling many-to-many social relationships cleanly was the core exercise: follows, group memberships, likes, and hashtags each needed their own join table without duplicating source-of-truth data.",
    links: {
      source: "https://github.com/Ankitbhalke137/social-media-dbms",
    },
    visual: "dbms",
    span: "lg:col-span-6",
  },
];

export const categories = [
  "All",
  "Full-stack",
  "Realtime",
  "Security",
  "Frontend",
  "Database",
] as const;

export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    icon: "layout",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Responsive UI",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "REST APIs",
      "Socket.io",
    ],
  },
  {
    title: "Realtime & Security",
    icon: "shield",
    skills: [
      "WebRTC",
      "WebSocket",
      "Web Crypto",
      "JWT",
      "Web Push",
      "E2EE",
    ],
  },
  {
    title: "Tools",
    icon: "wrench",
    skills: ["Git", "GitHub", "Linux", "Playwright", "Postman", "Vercel"],
  },
  {
    title: "Foundations",
    icon: "book",
    skills: [
      "Data Structures",
      "Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];

export const experience = [
  {
    role: "Software Engineer Intern",
    company: "LeapX",
    location: "Pune, India",
    period: "2026 — Present",
    summary:
      "Building a blog CMS inside a Turborepo monorepo with a React + Vite frontend and an Express + TypeScript backend.",
    points: [
      "Work across a shared UI package, frontend app, and API in a TypeScript monorepo.",
      "Follow a feature → develop → main branch workflow with reviewed pull requests.",
      "Ship dashboard and content workflows used by the editorial team.",
    ],
  },
  {
    role: "YIIC Intern",
    company: "Scaler School of Technology",
    location: "Remote",
    period: "Mar 2025 — Jul 2025",
    summary:
      "Selected for Scaler's Young Innovators Internship Cohort and worked through real-world product problem statements.",
    points: [
      "Built and presented web prototypes in a cohort-based engineering program.",
      "Collaborated on problem framing, implementation, and demo delivery.",
    ],
  },
];

export const education = [
  {
    school: "PW Institute of Innovation (PWIOI) × MSU",
    degree: "B.Tech — Computer Science & AI",
    period: "2025 — 2029",
    location: "Pune, India",
    detail:
      "Coursework across data structures, algorithms, OOP, DBMS, operating systems, and computer networks.",
  },
  {
    school: "Jawahar Navodaya Vidyalaya",
    degree: "Higher Secondary — Science",
    period: "2023 — 2025",
    location: "Narayanpur, Bidar",
    detail: "Physics, Chemistry, Mathematics, and Computer Science.",
  },
];

export const stats = [
  { value: "6+", label: "Projects shipped" },
  { value: "2", label: "Internships" },
  { value: "15+", label: "Technologies" },
];
