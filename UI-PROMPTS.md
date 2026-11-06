# UI Generation Prompts — SDE Portfolio

Use these with **v0 / Lovable / Bolt** (for real code) or **Midjourney / DALL·E / Gemini / Nano Banana** (for visual mockups).

**Project shortlist to feature (from your GitHub):**

1. **ClassForge** — multi-tenant school ERP, Next.js + TypeScript + PostgreSQL + Prisma (live)
2. **VoiceCall PWA** — WebRTC voice calling, JWT, WebSocket, Web Push, SQLite (live)
3. **Eduspear** — E2EE real-time collaboration platform, React 19 + Socket.io + Web Crypto
4. Secondary: **LIVE-NEWS-FEED** (vanilla JS architecture), **Expense Tracker** (Chart.js), **Social Media DBMS** (MySQL 3NF)

**Do not feature:** the designer/photography template content, the birthday page, team/agency portfolios, or duplicate LeapX CMS repos.

---

## Design direction (use in every prompt)

- **Vibe:** engineer's portfolio, not a designer template. Think Linear + Vercel + Raycast docs, but warmer.
- **Theme:** near-black background, warm gold accent, off-white text, thin 1px borders.
- **Type:** Inter/Geist for UI; JetBrains Mono for labels, numbers, and stack chips.
- **Layout:** 1200px max width, 12-column grid, generous whitespace, left-aligned and slightly asymmetric.
- **Motion:** subtle scroll reveals, 150–250ms hover transitions, nothing flashy.
- **Avoid:** glassmorphism overload, 3D blobs, particles, skill percentage bars, fake testimonials, lorem ipsum, stock photos of people.

**Color tokens to include in prompts:**

```
background #0B0B0F
surface    #131318
border     rgba(255,255,255,0.08)
text       #EDEDEF
muted      #8B8B93
accent     #F5C56B
accent-dim rgba(245,197,107,0.12)
green      #6EE7A8 (status dot only)
```

---

## 1. Master image prompt — full homepage mockup

> High-fidelity UI/UX design mockup of a software engineer's personal portfolio homepage, desktop 1440×1024, shown inside a clean browser window on a dark neutral canvas. Dark theme: near-black `#0B0B0F` background, charcoal `#131318` cards, 1px `rgba(255,255,255,0.08)` borders, off-white text, warm gold `#F5C56B` accent used sparingly for links, active nav, and one CTA. Editorial, minimal, confident — inspired by Linear and Vercel, not a colorful template.
>
> **Nav:** left "AB" monogram, center links Work / About / Experience / Contact, right a small gold-outlined "Resume ↓" button and a subtle green "Open to SDE internships" pill.
>
> **Hero:** large left-aligned headline in Inter tight tracking: "I build full-stack products that hold up under real users." Below it, two lines of muted gray body text: "CS student at PW Institute of Innovation. I've shipped a multi-tenant school ERP, a WebRTC calling PWA, and an E2EE collaboration platform." Two buttons: solid gold "View projects" and ghost "Download resume". On the right, a dark code/terminal card with a thin border and monospace text: `$ whoami` → `Ankit Bhalke`, `$ stack` → `TypeScript · Next.js · Node · PostgreSQL`, `$ status` → `shipping`.
>
> **Featured work:** three large horizontal project cards with 16:10 screenshots, project name, one-line description, monospace stack chips, and small "Live ↗" / "Source ↗" links. Project names: ClassForge, VoiceCall, Eduspear. Screenshots should look like real dark dashboards/apps, not abstract art.
>
> **Below:** a compact skills strip grouped by category, a vertical experience/education timeline, and a contact section with email + GitHub + LinkedIn. Footer with "Built with HTML, CSS, and JavaScript."
>
> **Style:** crisp 8px grid, 12–16px radii, soft shadows, high contrast, realistic text rendering, no unreadable gibberish, no watermark, no device mockups, 4k, Figma-quality presentation.

---

## 2. Hero section only

> UI mockup of a dark developer portfolio hero section, 1440×900. Near-black background, warm gold accent, Inter headline, JetBrains Mono micro-labels. Left: eyebrow "OPEN TO SDE INTERNSHIPS · PUNE, INDIA" in small gold monospace, huge two-line headline "I build full-stack products that hold up under real users.", muted subheadline, two CTAs ("View projects", "Download resume"). Right: floating terminal card with `$ whoami`, `$ stack`, `$ status` commands and gold command prompts. Thin border, generous negative space, subtle grid texture in the background at 3% opacity. Minimal, sharp, senior-engineer aesthetic. No people, no 3D blobs, no gradient soup.

---

## 3. Projects section

> UI mockup of a "Selected work" section for a software engineer portfolio, dark theme `#0B0B0F`, warm gold accents. Section header with small monospace label "02 — WORK" and headline "Things I've shipped." Three stacked horizontal cards with large 16:10 product screenshots on the left, content on the right: project title, one-sentence problem/solution, monospace stack chips (Next.js, TypeScript, PostgreSQL, Prisma), and arrow links "Live demo" and "Source code". Cards: ClassForge (multi-tenant school ERP dashboard), VoiceCall (dark mobile calling PWA), Eduspear (encrypted chat + games). Thin 1px borders, 16px radius, hover state shown on the middle card with a faint gold border glow. Realistic UI screenshots, legible text, Figma-quality, 1440px wide.

---

## 4. About + skills section

> UI mockup of the "About" and skills section of a dark software engineer portfolio. Two-column asymmetric layout: left 40% has a small monospace label "01 — ABOUT", a short 3-paragraph bio, and a muted line "Currently: Software Engineer Intern @ LeapX, Pune." Right 60% has a skills matrix in four bordered groups: Languages (TypeScript, JavaScript, Python, SQL), Frontend (React, Next.js, Tailwind), Backend (Node.js, Express, PostgreSQL, Prisma, MongoDB, Socket.io, WebRTC), Tools (Git, Docker, Linux, Playwright). Each skill is a small monospace chip on a `#131318` surface; no percentage bars, no progress bars. Warm gold used for group titles only. Clean grid, generous spacing, 1440px.

---

## 5. Experience + education timeline

> UI mockup of an experience and education timeline for a dark developer portfolio. Vertical rail with small gold dots, two columns per entry: left holds dates in JetBrains Mono and location in muted gray; right holds role, company, and 2–3 outcome-focused bullets. Entries: "Software Engineer Intern — LeapX, Pune", "YIIC Intern — Scaler School of Technology, Mar–Jul 2025", "B.Tech Computer Science — PW Institute of Innovation, 2025–2029". Below, a compact "Education" block. Thin dividers, no cards-within-cards, high contrast, 1440px, editorial and restrained.

---

## 6. Contact + footer

> UI mockup of a contact section for a dark software engineer portfolio. Left: large headline "Let's build something." and a short line "Open to SDE internships and full-stack roles." Email link in gold, GitHub and LinkedIn as text links with arrows, location "Pune, India". Right: a minimal contact form on `#131318` with name, email, message, and a solid gold "Send message" button; thin borders, clear focus ring. Footer below with "Ankit Bhalke — 2026" left and "Built from scratch" right. No map, no stock imagery, 1440px.

---

## 7. Mobile screens

> Three mobile UI screens (390×844) for a dark developer portfolio, presented side by side on a neutral background. Screen 1: hero with "AB" logo, hamburger, gold status pill, stacked headline, two full-width CTAs, compact terminal card. Screen 2: project list with full-width screenshot cards, stack chips, and Live/Source links. Screen 3: contact with short bio, email/GitHub/LinkedIn rows, and a simple form. Same design system: `#0B0B0F` background, `#131318` surfaces, warm gold `#F5C56B`, Inter + JetBrains Mono, 16px side padding, 44px tap targets, no horizontal scroll.

---

## 8. Full UI prompt for v0 / Lovable / Bolt (build the real thing)

> Build a single-page software engineer portfolio with **semantic HTML, modern CSS, and vanilla JavaScript** (no frameworks, no build step, deployable to GitHub Pages). Dark theme only.
>
> **Design tokens:** background `#0B0B0F`, surface `#131318`, border `rgba(255,255,255,0.08)`, text `#EDEDEF`, muted `#8B8B93`, accent `#F5C56B`, success `#6EE7A8`. Fonts: Inter for UI, JetBrains Mono for labels/numbers. Max width 1200px, 12-column grid, 80px section spacing, 16px card radius, 1px borders, no heavy shadows.
>
> **Sections:**
> 1. Sticky nav: "AB" monogram, links Work / About / Experience / Contact, "Resume ↓" button, green "Open to SDE internships" pill, mobile hamburger with accessible slide-down menu.
> 2. Hero: eyebrow "OPEN TO SDE INTERNSHIPS · PUNE, INDIA", H1 "I build full-stack products that hold up under real users.", subheadline "CS student at PW Institute of Innovation. I've shipped a multi-tenant school ERP, a WebRTC calling PWA, and an E2EE collaboration platform.", CTAs "View projects" and "Download resume", and a terminal card cycling through `whoami`, `stack`, `status` commands with a blinking cursor.
> 3. Selected work: three project cards — ClassForge (Next.js, TypeScript, PostgreSQL, Prisma; multi-tenant ERP with RBAC, RLS, CSRF and rate limiting), VoiceCall PWA (WebRTC, WebSocket, JWT, Web Push; P2P calling, presence, call state machine), Eduspear (React 19, Socket.io, Web Crypto; ECDH + AES-GCM E2EE chat, file sharing, games). Each card: image, title, one-line description, stack chips, Live and Source links.
> 4. About: 3 short paragraphs, current role "Software Engineer Intern @ LeapX, Pune", photo optional.
> 5. Skills: four bordered groups (Languages, Frontend, Backend, Tools) with monospace chips. No percentage bars.
> 6. Experience + education: vertical timeline with dates, roles, and outcome bullets.
> 7. Contact: email, GitHub, LinkedIn, location, and a form with client-side validation, loading state, success/error message, and a honeypot field. Use Formspree/Web3Forms placeholder action.
> 8. Footer.
>
> **Interactions:** smooth-scroll nav with active-section highlighting via IntersectionObserver, scroll-reveal animations that respect `prefers-reduced-motion`, theme is dark-only (design for light mode later), keyboard-accessible mobile menu, visible focus states, aria-labels on icon links, skip-to-content link.
>
> **Quality bar:** mobile-first at 360px, no horizontal scroll, Lighthouse 95+ performance, 100 accessibility, semantic headings, alt text, lazy-loaded images with width/height, inline SVG icons instead of an icon CDN. Output clean, commented code split into `index.html`, `styles.css`, `main.js`. No placeholder lorem ipsum — use the real copy above.

**If you want Next.js instead:** replace the first line with "Build with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui" and keep everything else identical.

---

## 9. Negative prompt (for image models)

> blurry text, gibberish text, lorem ipsum, stock photos of people, fake testimonials, skill percentage bars, 3D blobs, glassmorphism everywhere, neon gradients, purple-blue gradient, cluttered layout, centered generic hero, excessive rounded corners, cookie-cutter template, watermark, low contrast, tiny unreadable labels.

---

## 10. Consistency tips

1. Generate the **desktop homepage** first.
2. Feed that image back as a style reference for every other section ("match this exact design system").
3. Generate **mobile** only after the desktop direction is locked.
4. Image models mangle text — treat mockups as layout/mood references, and use the v0/Bolt prompt for real copy.
5. Keep one accent color, one font pair, one radius. Restraint reads as senior.
