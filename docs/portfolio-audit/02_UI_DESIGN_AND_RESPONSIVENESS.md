# 02 — UI Design System & Responsiveness Audit

> **Audit Date:** October 26, 2026  
> **Audited Viewports:**  
> - Desktop: 1440 × 900  
> - Laptop: 1366 × 768  
> - Tablet: 768 × 1024  
> - Mobile: 375 × 812  
> **Screenshot Directory:** `docs/portfolio-audit/screenshots/`

---

## 1. Visual Design System Audit

### 1.1 Color Palette & Tokens [VERIFIED FROM SOURCE]

The codebase currently exhibits a split personality between **three competing color systems**:
1. **The Declared Editorial / Monochrome System** (`src/styles/editorial.scss:10-17` & `AGENTS.md`)
2. **The Default Tailwind / shadcn HSL Theme Variables** (`src/assets/css/index.css:148-201`)
3. **Legacy Multi-Color Gradients** (`src/assets/css/index.css:27-40` & `src/data/skills.js`)

#### Exact Color Values Extracted from Source:
| Token / Identifier | Source Location | Value (HEX / HSL / RGBA) | Intended Role | Real World Violation / Status |
|---|---|---|---|---|
| `--sarthak-bg` | `editorial.scss:10` | `#030303` | Global Dark Page Background | Compliant monochrome background |
| `--sarthak-surface` | `editorial.scss:11` | `#080808` | Section Surface Layer | Compliant monochrome surface |
| `--sarthak-card` | `editorial.scss:12` | `#0c0c0c` | Interactive Card Surface | Compliant monochrome card |
| `--sarthak-ink` | `editorial.scss:13` | `#f1eee8` | Primary High-Contrast Text | Warm off-white, editorial feel |
| `--sarthak-muted` | `editorial.scss:14` | `#aaa9a4` | Secondary/Muted Text | Warm muted gray |
| `--sarthak-line` | `editorial.scss:15` | `rgba(255, 255, 255, 0.08)` | Subtle Dividers & Borders | Minimal 8% white divider |
| `--sarthak-border` | `editorial.scss:16` | `rgba(255, 255, 255, 0.12)` | Focused Borders & Buttons | Crisp 12% white outline |
| `.gradient-text` | `index.css:28` | `linear-gradient(90deg, #60a5fa, #34d399, #60a5fa)` | Legacy Animated Headings | **NON-COMPLIANT:** Vivid Cyan/Emerald gradient |
| `.gradient-border` | `index.css:37` | `linear-gradient(45deg, #60a5fa, #34d399)` | Legacy Border Wrap | **NON-COMPLIANT:** Vivid Cyan/Emerald gradient |
| `.window-header` | `index.css:69` | `#0b466359` | Code window titlebar | **NON-COMPLIANT:** Blue tint background |
| `.bg-grid-pattern` | `index.css:242` | `rgba(100, 100, 255, 0.1)` | Matrix Background Grid | **NON-COMPLIANT:** Purple/Indigo tint lines |
| `skills.items.iconColor`| `skills.js:8-81` | `#ED8B00, #6DB33F, #38BDF8, #DC382D...` | Tech Stack Brand Badges | Vivid multi-color brand icons |

### 1.2 Typography Hierarchy & Font Sources [VERIFIED FROM SOURCE]

The application imports typography via Google Fonts in `src/styles/editorial.scss:2`:
```scss
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
```

| Typeface | Class / Variable | Fallbacks | Weights Used | Visual Application |
|---|---|---|---|---|
| **Instrument Serif** | `editorial-serif`, `font-serif` | Georgia, serif | Regular (400), Italic (400i) | Hero headline, Section titles, Name wordmark |
| **DM Sans** | `font-sans` | -apple-system, BlinkMacSystemFont, sans-serif | 300, 400, 500, 600 | Body text, paragraph descriptions, card summaries |
| **JetBrains Mono** | `editorial-mono`, `font-mono` | Consolas, monospace | 400, 500 | Eyebrow tags, metrics, tech badges, terminal labels, navigation |

#### Type Scale & Spacing Breakdown:
- **Hero Title (`<h1>`):** `text-5xl` (48px) on mobile, `sm:text-7xl` (72px), `md:text-8xl` (96px), `lg:text-9xl` (128px) on desktop. Leading: `0.95`, tight tracking.
- **Section Headers (`<h2>`):** `text-3xl` (30px) to `text-5xl` (48px) with serif and italic styling.
- **Eyebrow Tags:** `text-[10px]` to `text-xs` uppercase with tracking `[0.25em]` and monospace glyphs.
- **Body Text:** `text-sm` (14px) to `text-base` (16px), line-height `relaxed` (1.625), muted color `#aaa9a4`.

### 1.3 Layout Rules & Spacing Containers [VERIFIED FROM SOURCE]
- **Max Container Width:** `max-w-7xl` (1280px) centered via `container mx-auto px-5 sm:px-8`.
- **Vertical Section Padding:** `py-16` (64px) on mobile scaling to `py-24` or `py-32` (128px) on desktop.
- **Z-Index Convention:**
  - `z-0`: Background grid lines, portrait backdrop, 3D canvas
  - `z-20`: Section content, typography, cards
  - `z-50`: Main navigation sticky header, mobile drawer
  - `z-[70]`: Top scroll progress bar
  - `z-[100]`: Contact modal overlay

---

## 2. Section-by-Section Visual Inventory

### 2.1 Hero Section
- **Live Deployed View (`desktop_hero_1440x900.png`):**
  - Features an interactive 3D particle sphere globe (`react-icon-cloud` / Three.js) rotating dynamically.
  - Heading: "Hi, I'm Shivansh Mishra" with dynamic animated typing text / flip words.
  - Dual pill actions: "Freelancer" (white/black) and "Software Developer" (outline pill).
  - Floating status: "Based in Mumbai · Open for High-Impact Roles".
- **Local Current Workspace:**
  - Features a grayscale editorial portrait backdrop (`/hero-editorial.webp`) with vertical architectural grid lines and an instant toggle to switch back to the 3D globe.
  - Large editorial serif headline: `Shivansh` *`Mishra`* with line mask reveal.
  - Interactive "SignalText" character scramble on hover.

### 2.2 About & Core Narrative Section (`desktop_about_1440x900.png`)
- **Visual Presentation:**
  - Split two-column layout on desktop, stacked on mobile.
  - Left column: Detailed narrative ("I build software systems that hold up under pressure").
  - Right column: "Currently Doing" structured cards (B.Tech Degree 8.72 CGPA, AI-Powered Resume Builder, Redis & Apache Kafka deep-dive, YouTube tech tutorials).
  - Live pulse indicators on active undertakings (`.status-pulsar`).

### 2.3 Skills & Capabilities Section (`desktop_skills_1440x900.png`)
- **Visual Presentation:**
  - Filterable tabs by capability category: "Backend & Java Stack", "Frontend Development", "Databases & Storage", "Developer Tools", "AI & LLM Workflows", "CS Fundamentals".
  - Grid of tech cards with icon, title, and category badge.
  - **Issue Observed:** On the live site, icons carry full rainbow branding (#ED8B00 Java orange, #61DAFB React blue, #6DB33F Spring green) which conflicts with the strict monochrome mandate of `AGENTS.md`.

### 2.4 Selected Projects Section (`desktop_projects_1440x900.png`)
- **Visual Presentation:**
  - Curated presentation of 4 flagship systems:
    1. **ShortUrl:** Distributed URL shortener (Spring Boot 3, Eureka, Base-62 compression, sub-15ms p95).
    2. **Track2Act:** AI supply chain fleet telemetry (Hugging Face AI, Leaflet, 6-role RBAC).
    3. **Employee Management System:** Full-stack HR portal (Spring Boot 3, React 18, Hibernate).
    4. **Spring Boot Security Login System:** Standalone authentication engine (Spring Security 6, async OTP).
  - Visual cards feature code tags, architectural summaries, GitHub source links, and impact metrics.

### 2.5 Journey & Milestones Section (`desktop_journey_1440x900.png`)
- **Visual Presentation:**
  - Vertical timeline showing milestones from 2020 through 2026.
  - Highlights Open Source PR #5738 in Spring Boot Admin, ET GenAI semi-finalist rank (55,000+ applicants), Adobe University Top 200, and academic records.

### 2.6 Credibility Proof & Metrics Strip (`desktop_proof_1440x900.png`)
- **Visual Presentation:**
  - High-impact data strip displaying 5 core verified numbers:
    - `6` Hackathons (ET GenAI Semi-Finalist, Adobe Top 200)
    - `6+` Production Projects
    - `10+` PRs Submitted & Merged (Spring Boot Admin)
    - `200+` DSA Problems Solved (LeetCode)
    - `1` Freelance Client (Production Solutions Delivered)

### 2.7 Global Footer (`desktop_contact_footer_1440x900.png`)
- **Visual Presentation:**
  - 4-column layout on desktop: Identity & Socials, Paths (`/freelancer`, `/developer`), Quick Links, and Copyright.
  - Social icons for GitHub, LinkedIn, YouTube, LeetCode, CodeChef, Codeforces, Email, and Resume.
  - **Identified Defect:** Links to `/developer/journey` and `/contact` fail to resolve cleanly.

---

## 3. Responsive Breakpoint & Viewport Audit

All 4 target viewports were audited against the live site and preview bundle:

| Viewport Target | Dimensions | Tested Screenshot File | Visual & Layout Findings |
|---|---|---|---|
| **Desktop** | 1440 × 900 | `desktop_hero_1440x900.png` | Optimal spacing. Header is 95px transparent, shifts to 84px blurred on scroll. Grid columns display 3-to-4 cards per row. |
| **Laptop** | 1366 × 768 | `laptop_hero_1366x768.png` | Headline fits within viewport fold without clipping. Hero buttons maintain comfortable tap padding. |
| **Tablet** | 768 × 1024 | `tablet_hero_768x1024.png` | Navigation switches to condensed tablet format. Grids shift from 3-column to 2-column. Two-column hero collapses gracefully. |
| **Mobile** | 375 × 812 | `mobile_hero_375x812.png` | Wordmark wraps cleanly. Hero headline adjusts from 128px to 48px. Zero horizontal scrollbar or overflow (`overflow-x: hidden`). |
| **Mobile Drawer**| 375 × 812 | `mobile_menu_open_375x812.png` | Slide-down full-width menu with clean serif links, right arrow glyphs, and a full-width "Let's talk" CTA button. |

### Responsive Defects Observed [VERIFIED IN BROWSER]
1. **WelcomePathPrompt Overlay Collision on Mobile:** On viewports below 480px, the fixed "Personalized Guide" prompt in the bottom right corner covers the bottom navigation items and footer links unless dismissed.
2. **3D Canvas Touch Hijacking:** When swiping on mobile devices across the 3D canvas area, the OrbitControls/camera touch listener intercepts vertical page scrolling unless `pointer-events-none` is active.
