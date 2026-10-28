# 07 — Prioritized Findings, Technical Debt & Redesign Constraints

> **Audit Date:** October 26, 2026  
> **Auditor Role:** Senior Software Engineer, Frontend Architect & Auditor  
> **Operating Contract:** Document only. Do NOT remediate findings during this audit.

---

## 1. Prioritized Technical Debt & Findings

### Priority Levels:
- **P0:** Critical application integrity, security, or data loss risk.
- **P1:** Major correctness, functionality, accessibility, or deployment blocker.
- **P2:** Significant maintainability, performance, SEO, or responsive-design concern.
- **P3:** Lower-impact cleanup, style divergence, or optimization.

---

### Finding F-01: Broken Internal Navigation in Global Footer [P1]
- **Priority:** **P1** (Major Functionality & Correctness Defect)
- **Description:** The global footer contains links to non-existent route paths (`/developer/journey` and `/contact`). Clicking these links fails or leads to 404/empty routes.
- **Evidence:** `src/components/layout/Footer.jsx:73, 78` compared with route declarations in `src/App.jsx:39-46`.
  - Line 73: `<Link to="/developer/journey">Journey</Link>` (Real route: `/journey`).
  - Line 78: `<Link to="/contact">Contact</Link>` (No `/contact` route exists; contact is a modal).
- **Impact:** Breaks user navigation and causes crawl errors for search engines.
- **Confidence Level:** **VERIFIED FROM SOURCE** (100%).
- **Needs Remediation Before Redesign:** Yes.

---

### Finding F-02: Massive Unoptimized 14.07 MB 3D Model Asset [P1]
- **Priority:** **P1** (Critical Performance & Mobile Blocker)
- **Description:** `public/models/avatar.glb` weighs **14,072,008 bytes (14.07 MB)**. Loading this asset over cellular connections consumes excessive data, delays Time to Interactive (TTI), and triggers browser memory warnings.
- **Evidence:** `public/models/avatar.glb` file inspection, referenced in `src/components/3d/PersonalAvatar.jsx:13`.
- **Impact:** Degrades Core Web Vitals (LCP, INP) and leads to mobile abandonment.
- **Confidence Level:** **VERIFIED FROM SOURCE & MEASURED** (100%).
- **Needs Remediation Before Redesign:** Yes (Must apply Draco compression or use CSS/procedural fallback).

---

### Finding F-03: ESLint Flat Config Fails on Node Script Files [P1]
- **Priority:** **P1** (Build & CI Blocker)
- **Description:** Running `npm run lint` fails with 7 errors because `eslint.config.js` does not configure Node.js environment globals for configuration and build scripts.
- **Evidence:** `npm run lint` output:
  - `fix-eslint.js`: `'require' is not defined`
  - `scripts/inspect-glb.js`: `'process' is not defined`
  - `tailwind.config.js`: `'module' is not defined`, `'require' is not defined`
  - `vite.config.js`: `'__dirname' is not defined`
- **Impact:** Automated CI/CD pipelines will fail pull request checks.
- **Confidence Level:** **VERIFIED BY TEST** (100%).
- **Needs Remediation Before Redesign:** Yes.

---

### Finding F-04: Three.js and Vendor Chunk Bloat Exceeding 1.9 MB [P2]
- **Priority:** **P2** (Significant Performance Concern)
- **Description:** Production build emits two oversized chunks: `three-vendor-*.js` (1,027 kB) and `index-*.js` (898 kB), triggering Rollup chunk size warnings.
- **Evidence:** Output of `npm run build`:
  - `dist/assets/three-vendor-DS72XTNa.js: 1,027.00 kB │ gzip: 283.10 kB`
  - `dist/assets/index-CD4guHFZ.js: 898.60 kB │ gzip: 172.53 kB`
- **Impact:** Slow JavaScript parsing and execution on low-to-mid range devices.
- **Confidence Level:** **MEASURED BY TEST** (100%).
- **Needs Remediation Before Redesign:** Recommended during architecture consolidation.

---

### Finding F-05: Missing Social Share Image and Domain Canonical Inconsistency [P2]
- **Priority:** **P2** (SEO & Social Sharing Defect)
- **Description:** `SEOHead.jsx` points `og:image` to `/og-image.webp`, but this file does not exist in `public/`. Furthermore, canonical URLs default to `shivanshmishra.dev` instead of the live deployment domain `shivansh-mishra.netlify.app`.
- **Evidence:** File inspection of `public/` directory (no `og-image.webp`) and `src/components/layout/SEOHead.jsx:17, 36`.
- **Impact:** Broken social cards on LinkedIn, Twitter, and WhatsApp; duplicate content warnings in search consoles.
- **Confidence Level:** **VERIFIED FROM SOURCE** (100%).
- **Needs Remediation Before Redesign:** Yes.

---

### Finding F-06: Color Palette Inconsistency with Operating Contract [P2]
- **Priority:** **P2** (Design System Violation)
- **Description:** `AGENTS.md` mandates a strict monochrome palette (white, black, gray, no bright accents). However, `src/assets/css/index.css` retains legacy vivid cyan/green gradients (`#60a5fa`, `#34d399`) and `src/data/skills.js` defines multicolored brand hex values.
- **Evidence:** `src/assets/css/index.css:27-40` (`.gradient-text`, `.gradient-border`), `src/data/skills.js:8-82`.
- **Impact:** Dilutes the editorial visual identity and contradicts brand specifications.
- **Confidence Level:** **VERIFIED FROM SOURCE** (100%).
- **Needs Remediation Before Redesign:** Will be superseded by redesign.

---

### Finding F-07: Competing & Redundant Animation Dependencies [P3]
- **Priority:** **P3** (Maintainability & Bundle Cleanup)
- **Description:** The application simultaneously installs Framer Motion, GSAP, Anime.js, and Locomotive Scroll. Locomotive Scroll is completely unused; GSAP is used only for a marquee ticker; Anime.js is used only for a scramble text effect.
- **Evidence:** `package.json:18, 22, 23, 25` and imports in `src/`.
- **Impact:** Redundant dependency footprint (~150 kB minified), increasing maintenance complexity.
- **Confidence Level:** **VERIFIED FROM SOURCE** (100%).
- **Needs Remediation Before Redesign:** No, address during redesign.

---

### Finding F-08: Complete Absence of Automated Tests [P3]
- **Priority:** **P3** (Long-Term Maintenance & Reliability Risk)
- **Description:** The codebase has zero test files (`.test.jsx`, `.spec.js`) and no test script in `package.json`.
- **Evidence:** Grep search across `src/` returns 0 test suites.
- **Impact:** Regressions in calculations (e.g., credibility metrics) or routing logic cannot be caught automatically.
- **Confidence Level:** **VERIFIED FROM SOURCE** (100%).
- **Needs Remediation Before Redesign:** Optional for portfolio, recommended for core utilities.

---

## 2. Core Assets & Architecture to Preserve

During any future redesign, the following architectural assets and data structures **must be preserved as source of truth**:
1. **The Entire `src/data/` Layer:**
   - `profile.js`: Personal bio, social links, contact coordinates, academic facts (8.72 CGPA).
   - `projects.js`: 4 flagship projects with dual lenses (ShortUrl, Track2Act, Employee Management, Security Login).
   - `experience.js`: Verified accomplishments (Spring Boot Admin PR #5738, ET GenAI semi-finalist rank out of 55,000+).
   - `achievements.js`: Metric counts (6 hackathons, 6+ projects, 10+ PRs, 200+ DSA, 1 client).
   - `education.js` & `certificates.js`: Verified educational credentials and 14 PDF/WebP certificates in `public/certificates/`.
2. **Dual-Path Strategy (`AGENTS.md`):**
   - Overview homepage (`/`) branching into `/developer` (deep engineering) and `/freelancer` (client services & process).
3. **Contact Submission Engine:**
   - Web3Forms integration via `ContactModal.jsx` and `ContactContext.jsx`.
4. **Build & SPA Routing Foundation:**
   - Vite 7 + React 18 + React Router v7 + `public/_redirects` (Netlify) + `vercel.json` (Vercel).

---

## 3. Redesign Architectural Constraints

1. **Monochrome Palette Enforcement:**
   - All legacy gradients (`#60a5fa`, `#34d399`) and blue tints (`#0b466359`) must be purged in favor of the editorial monochrome palette (`#030303`, `#080808`, `#0c0c0c`, `#f1eee8`, `#aaa9a4`, `rgba(255,255,255,0.08)`).
2. **Animation Engine Consolidation:**
   - Consolidate interactions under **Framer Motion + React Three Fiber + Lenis**. Remove redundant libraries (`locomotive-scroll`, `@tailwindcss/postcss`).
3. **3D Asset Optimization:**
   - Either compress `avatar.glb` below 1.5 MB using Draco mesh compression or replace it with a lightweight procedural R3F particle canvas / editorial photography backdrop.
4. **Resolution-Independent Breakpoints:**
   - Remove any resolution-sniffing hacks (`window.innerWidth === 1366`). Use pure Tailwind responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
