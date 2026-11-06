# Portfolio Roadmap — SDE Positioning

**Owner:** Ankit Bhalke
**Goal:** Turn the current designer-template portfolio into a portfolio that gets shortlisted for **Software Development Engineer (SDE) internships / entry-level roles**.
**Current state:** Static HTML/CSS/JS single page, dark/gold template, no projects section, placeholder content, broken contact form, no GitHub link.

---

## 0. Positioning (the decision everything else follows)

Recruiters spend ~10 seconds. They must instantly see:

1. **Who you are** — CS student, builder.
2. **What you build** — full-stack + AI projects, with proof.
3. **Evidence** — live demos, source code, metrics, resume.
4. **Contact** — email, GitHub, LinkedIn, working form.

**Hero headline (pick one and keep it consistent everywhere):**

- `Software Engineer — I build full-stack web apps and AI-powered tools.`
- `CS student at PW Institute of Innovation. I ship products, not just assignments.`

**Rules:**

- Never call yourself "Fullstack developer" unless you can defend it in an interview.
- Remove everything that signals "designer for hire": photography service, branding %, "Web design 80%", birthday.
- No fake testimonials, no lorem-ipsum blog posts, no skill percentage bars.
- Every claim needs a link or a number.

---

## 1. Audit — what's wrong today

| Area | Current | Problem | Fix |
|---|---|---|---|
| Entry point | `portfoloi page.html` | Space + typo; GitHub Pages serves `index.html` | Rename to `index.html` |
| Title/SEO | `Personal Portfolio` | Invisible on Google; no description/OG | SDE title, meta description, OG/Twitter tags, JSON-LD |
| About | Generic AI/full-stack paragraph, typo `impact.es` | No proof, no focus | 3-line pitch + 3 proof bullets + CTA |
| Services | Web design, development, programming, photography | Designer profile, not SDE | Replace with "What I work with" / engineering focus areas |
| Resume | Empty education/experience text, "Student 2020–2024", "Photograph 2010–present" | Looks unfinished / irrelevant | Real education, Scaler internship with bullets, remove photography |
| Skills | Design/branding percentages | Meaningless for SDE, easy to attack | Categorized stack badges + proficiency context |
| Projects | **Missing entirely** | Fatal for SDE applications | 3–4 deep case studies (the core of this roadmap) |
| Blog | Commented out, lorem ipsum | Dead weight | Real technical posts or remove |
| Contact | `action="#"` | Form silently does nothing | Formspree/Web3Forms + validation + success state |
| Social | Empty `logo-` icon, no GitHub | Missing the #1 link recruiters click | GitHub, LinkedIn, email, X (optional) |
| Assets | `assets/images/logo.ico` missing, blog images 404 | Broken favicon/console errors | Fix paths, add favicon |
| HTML | Malformed `<h4>` on line 381, stray `</address>` | Invalid markup | Clean pass |
| JS | Console logging everywhere, dead testimonials/blog code | Unprofessional, hard to maintain | Refactor into small modules |
| Git | Working branch `root`, no README | Unclear repo | `main` branch, README with screenshots |

---

## 2. Target structure

```
/
├── index.html
├── 404.html
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── main.js          # nav, theme, scroll reveal
│   │   ├── projects.js      # render + filter projects from data
│   │   ├── github.js        # GitHub API stats (cached, graceful fallback)
│   │   └── contact.js       # form validation + submit
│   ├── images/              # optimized .webp/.avif + og-image
│   └── resume/Ankit-Bhalke-Resume.pdf
├── data/projects.json
├── blog/                    # optional, Phase 2
├── robots.txt
├── sitemap.xml
├── README.md
└── ROADMAP.md
```

**Stack decision:** stay **vanilla HTML/CSS/JS for v1**. Zero build, instant GitHub Pages deploy, fast. Content and projects matter far more than React right now. Revisit Astro/Next.js only in Phase 4, after the content is strong.

---

## 3. Phases

### Phase 0 — Foundation & quick wins (0.5 day)

- [ ] Rename `portfoloi page.html` → `index.html`; update links.
- [ ] Rename `css.css` → `assets/css/style.css`; `script.js` → `assets/js/main.js` (or keep paths, but organize).
- [ ] Update `<title>` → `Ankit Bhalke — Software Engineer` and add meta description.
- [ ] Add OG/Twitter tags + 1200×630 `og-image` (screenshot + name + role).
- [ ] Add favicon in `assets/images/` (use your photo or initials `AB`).
- [ ] Fix broken image paths / remove commented-out blog block / fix malformed tags.
- [ ] Add real GitHub link; remove empty social icon.
- [ ] Remove birthday and phone from public sidebar (email + LinkedIn + GitHub is enough).
- [ ] Add `README.md` with project screenshots, live link, local run steps.
- [ ] Move default branch to `main`; enable GitHub Pages.

**Done when:** no console errors, page loads at `/`, title/description correct, all links work.

---

### Phase 1 — SDE content & core sections (2–3 days)

This is the highest-impact phase. Do not skip it for fancy animations.

#### 1.1 Hero / About
- [ ] Headline + subheadline (positioning above).
- [ ] 3 proof bullets: `Built & deployed X`, `Solved N DSA problems`, `Interned at Scaler (YIIC)`.
- [ ] Primary CTAs: **View Projects**, **Download Resume**, **GitHub**.
- [ ] Replace "Services" cards with engineering focus areas, e.g.:
  - Full-Stack Development (React/Next.js, Node, PostgreSQL)
  - AI / LLM Applications (RAG, APIs, embeddings)
  - Problem Solving (DSA, OOP, DBMS, OS, Networks)

#### 1.2 Projects (the core)
Build a **featured projects** section with 3–4 projects. Each card opens a case-study modal/page.

Required fields per project:

```
Title + one-liner
Timeline + role (solo/team)
Stack (chips)
Problem (2 lines)
Solution (3 lines)
Key features (3 bullets)
Architecture (simple diagram or flow)
Hardest challenge + tradeoff
Impact / metrics (users, latency, accuracy, stars)
Links: Live demo + GitHub
Screenshot or short GIF
```

Placeholder slate to pick from (only include what you actually built or will build in the next 4 weeks):

1. **Full-stack product** — auth, CRUD, database, deployed (e.g. campus marketplace, expense tracker, task/notes app with sharing).
2. **AI/LLM app** — RAG over your notes/PDFs, streaming responses, rate limiting, eval notes.
3. **Developer tool / CLI / npm package** — shows systems thinking; add README + tests.
4. **Open-source contribution** — 2–3 meaningful PRs with links; explain the fix.

- [ ] Show only 2–3 featured on the homepage; "View all" for the rest.
- [ ] Replace skill percentage bars with grouped stack badges:
  - **Languages:** Java, Python, JavaScript, TypeScript, C++
  - **Frontend:** React, Next.js, Tailwind, HTML/CSS
  - **Backend:** Node.js, Express, REST, PostgreSQL, MongoDB
  - **Tools:** Git, GitHub, Docker, Linux, Postman, Vercel
  - **CS:** DSA, OOP, DBMS, Operating Systems, Computer Networks

#### 1.3 Experience & Education
- [ ] Scaler School of Technology — YIIC intern (Mar–Jul 2025): 2–3 bullets with outcomes, not duties.
- [ ] PW Institute of Innovation, Pune — B.Tech CS, 2025–2029 (add coursework/achievements).
- [ ] Remove "Student 2020–2024" and "Photograph 2010–present".
- [ ] Add hackathons, coding profiles (LeetCode/Codeforces/GFG), certifications if real.

#### 1.4 Resume & Contact
- [ ] One-page ATS-friendly PDF (no photo, no birthday), linked in hero + nav.
- [ ] Contact form via **Formspree** or **Web3Forms** (free tier, no backend).
- [ ] Client-side validation, loading state, success/error message, honeypot spam field.
- [ ] Show email + location (city only) + GitHub/LinkedIn.

**Done when:** a recruiter can read role → projects → stack → resume → contact without scrolling hunting.

---

### Phase 2 — Signature features (3–5 days)

Prioritize in this order. Ship each one independently.

| Feature | Why it helps | Effort |
|---|---|---|
| Theme toggle (dark/light, persisted) | Polish, accessibility | 2–3h |
| Project filtering + search | Usable with 6+ projects | 3–4h |
| Scroll reveal + subtle motion (`prefers-reduced-motion` respected) | Perceived quality | 2–3h |
| GitHub stats panel (repos, stars, top languages) | Live proof of coding | 4–6h |
| Contribution graph / activity | Shows consistency | 2–3h |
| Blog with 3 real technical posts | Communication signal; interview talking points | 1–2 days |
| Command palette (`Ctrl/⌘ + K`) | Memorable, showcases JS skill | 4–6h |
| "Dev mode" terminal (`help`, `about`, `projects`, `contact`) | Signature feature; optional toggle | 1 day |
| Project case-study pages with architecture diagrams | Depth > screenshots | 1–2 days |
| RSS feed + sitemap | Discoverability | 2h |
| 404 page | Small but professional | 1h |
| Analytics (Plausible/GoatCounter) + resume-download event | Learn what recruiters use | 1–2h |

**GitHub stats implementation notes:**
- Fetch `https://api.github.com/users/Ankitbhalke137` + `/repos?per_page=100`.
- Unauthenticated rate limit is 60 req/hr per IP — cache in `localStorage` for 1 hour.
- Always render static fallback numbers first, then hydrate. Never let the section cause layout shift or an empty box.
- For language breakdown, aggregate `language` across repos client-side.

**Do not build:** heavy 3D/WebGL, custom cursors, autoplay audio, fake testimonials, "years of experience" counters, skill percentage bars.

---

### Phase 3 — Quality & launch (1–2 days)

- [ ] **Accessibility:** keyboard nav, visible focus states, `aria-label`s on icon links, skip link, alt text, color contrast check, `prefers-reduced-motion`.
- [ ] **Performance:** compress images to WebP/AVIF, add `width`/`height`, lazy-load below fold, preconnect fonts, replace Ionicons CDN with inline SVG sprite (or subset).
- [ ] **SEO:** canonical URL, `robots.txt`, `sitemap.xml`, JSON-LD `Person`, descriptive titles.
- [ ] **Cross-device test:** 360px, 768px, 1440px; iOS Safari + Chrome.
- [ ] **Validation:** HTML validator, Lighthouse ≥ 95 Performance / 100 Accessibility / 100 SEO.
- [ ] **CI:** GitHub Actions workflow to deploy Pages; optional Lighthouse CI + link checker.
- [ ] **Custom domain** (optional): `ankitbhalke.dev` or similar, HTTPS enforced.
- [ ] Update LinkedIn headline + GitHub bio + pinned repos to match the portfolio.

---

### Phase 4 — Optional framework upgrade (only after v1 is live)

Migrate to **Astro** (best fit: content, blog, static speed) or **Next.js** (if targeting React roles and want App Router/TS on the resume).

- [ ] TypeScript + Tailwind + component structure.
- [ ] Projects and blog as Markdown/MDX content collections.
- [ ] GitHub API fetched at build time (no client rate limits).
- [ ] Keep URLs and content identical to avoid losing whatever SEO you have.

Do this only if you have 1–2 spare weeks **and** v1 has been live for a while.

---

## 4. Suggested schedule (2 weeks, part-time)

| Day | Work |
|---|---|
| 1 | Phase 0 + content audit |
| 2–4 | Hero, About, Projects section with 2 real projects |
| 5–6 | Skills, Experience, Resume, Contact form |
| 7 | Deploy v1 + mobile pass + Lighthouse |
| 8–10 | Third project + case-study modal + theme toggle |
| 11–12 | GitHub stats + filtering/search + blog post #1 |
| 13–14 | Accessibility/performance polish + README + LinkedIn/GitHub alignment |

---

## 5. Content you must gather before Phase 1

Fill this in and Phase 1 becomes mechanical:

- [ ] 2–3 projects: repo link, live link, stack, problem, what you built, one measurable result, screenshot.
- [ ] Scaler internship: exact dates, team, what you built, tools, outcome.
- [ ] Current CGPA / relevant coursework / hackathons / certifications (only if real).
- [ ] LeetCode/Codeforces handle + solved count.
- [ ] Latest resume PDF.
- [ ] Preferred contact email + city.
- [ ] Domain choice (optional).

---

## 6. Definition of done (SDE portfolio)

- [ ] Loads at the root URL with a real SDE title and description.
- [ ] Above the fold: role, proof, projects CTA, resume CTA.
- [ ] 3 projects with live demo + source + metrics + case study.
- [ ] Stack grouped and honest; no percentage bars.
- [ ] Real experience/education with outcomes.
- [ ] Working contact form + visible email/GitHub/LinkedIn.
- [ ] Lighthouse ≥ 95 perf, 100 a11y/SEO; no console errors.
- [ ] Mobile-first at 360px.
- [ ] README with screenshots; LinkedIn/GitHub profiles aligned.
