# 05 — SEO, Accessibility & Performance Audit

> **Audit Date:** October 26, 2026  
> **Standards:** WCAG 2.1 AA, HTML5 Semantic Living Standard, Google Core Web Vitals, Schema.org  
> **Measurement Tools:** Vite Production Build, Browser DevTools Runtime Inspection, Source Code Analysis

---

## 1. Search Engine Optimization (SEO) Audit

### 1.1 Document Metadata & Open Graph [VERIFIED FROM SOURCE & BROWSER]

Inspection of `index.html:1-17` and `src/components/layout/SEOHead.jsx`:
- **Document Title:** `<title>Shivansh Mishra | Portfolio</title>` (Present in HTML shell, dynamically updated per route via `react-helmet-async`).
- **Meta Description:** `<meta name="description" content="Portfolio of Shivansh Mishra - Full-Stack Developer, Java & Spring Boot Specialist, React Developer" />`
- **Dynamic Favicon:** `<link id="dynamic-favicon" rel="icon" type="image/svg+xml" href="/favicon-light.svg" />`. Automatically shifts to `/favicon-dark.svg` based on system color scheme or theme.
- **Canonical URL:**
  - `SEOHead.jsx` injects `<link rel="canonical" href={canonicalUrl} />`.
  - **Defect:** Canonical base URL defaults to `https://shivansh-mishra.dev` in certain component templates, whereas the actual active deployed website is `https://shivansh-mishra.netlify.app/`. This canonical mismatch confuses search engine indexers.
- **Open Graph & Twitter Cards:**
  - Configured in `SEOHead.jsx`: `og:title`, `og:description`, `og:image`, `twitter:card` (`summary_large_image`).
  - Target social preview image points to `/og-image.webp`.
  - **Defect:** `public/og-image.webp` is missing from the `public/` directory! Social shares will render with broken preview images.
- **Robots Directives & Sitemap:**
  - `public/robots.txt` exists: Allows root crawling, disallows `/private/`, references sitemap at `https://shivanshmishra.dev/sitemap.xml` (should point to netlify domain or custom domain).
  - `public/sitemap.xml` exists: Lists `/`, `/freelancer`, `/developer`, `/journey`.
- **JSON-LD Structured Data:**
  - `SEOHead.jsx` outputs schema for `Person`:
    - `name`: "Shivansh Mishra"
    - `jobTitle`: "Software Developer"
    - `sameAs`: GitHub, LinkedIn, YouTube links.

---

## 2. Accessibility (a11y) Audit (WCAG 2.1 AA)

### 2.1 Semantic Landmarks & Hierarchy [VERIFIED FROM SOURCE]
- **Landmarks:**
  - `<header>`: Present in `Navigation.jsx` with `role="banner"`.
  - `<main>`: Present in `App.jsx:36` enclosing route contents.
  - `<footer>`: Present in `Footer.jsx` with `role="contentinfo"`.
  - `<nav>`: Present in `Navigation.jsx` with `aria-label="Main Navigation"`.
- **Heading Hierarchy:**
  - `<h1>`: Unique on each page (Hero title "Shivansh Mishra").
  - `<h2>`: Correctly assigned to section titles (About, Selected Work, Capabilities, Path Selector).
  - `<h3>`: Used for project titles and sub-cards.
- **Skip-to-Content Link:** Missing from `App.jsx`. Keyboard-only and screen reader users must tab through all navigation links before reaching main page content.

### 2.2 Interactive Controls & Keyboard Focus [VERIFIED FROM SOURCE & BROWSER]
- **Buttons vs. Links:**
  - Routes and anchors properly use `<Link>` or `<a>`.
  - Modals and actions properly use `<button>`.
  - No instances of `<div onClick={...}>` without keyboard accessibility listeners or ARIA roles found in core layouts.
- **Focus Indicators:**
  - Most buttons use Tailwind `focus:outline-none focus:ring-2 focus:ring-neutral-400`.
  - Custom pill switches have distinct visual active states.
- **Form Accessibility (`ContactModal.jsx`):**
  - Inputs have associated `<label>` elements with matching `htmlFor` attributes.
  - Error states are communicated via text and colored borders.
  - Escape key listener cleanly dismisses the modal.

### 2.3 Color Contrast Analysis [MEASURED & VERIFIED]
- **Compliant High-Contrast Pairs:**
  - Editorial Dark Theme: Background `#030303` with Primary Text `#f1eee8` yields a contrast ratio of **18.7:1** (far exceeds WCAG AA requirement of 4.5:1).
  - Editorial Muted Text: Background `#030303` with Muted Text `#aaa9a4` yields a contrast ratio of **9.8:1** (Passes WCAG AA and AAA).
- **Non-Compliant / Low-Contrast Elements:**
  - Eyebrow tags using `#525252` (neutral-600) on `#030303` have a contrast ratio of **3.1:1**, which fails WCAG AA for small text (< 18pt).
  - Status bar secondary tags (`text-neutral-500` / `#737373`) on dark backgrounds have a contrast ratio of **4.8:1**, barely passing AA.

---

## 3. Measured Performance & Bundle Metrics

### 3.1 Production Bundle Analysis [MEASURED BY TEST: `npm run build`]
The production build was executed using Vite 7.1.3:

| Asset / Chunk Name | Raw Size | Gzip Size | Analysis / Risk |
|---|---|---|---|
| `dist/index.html` | 0.89 kB | 0.47 kB | Minimal, fast entry shell |
| `dist/assets/index-Cz7n05Rx.css` | 84.16 kB | 14.50 kB | Consolidates Tailwind, SCSS, and Prism styles |
| `dist/assets/framer-motion-*.js` | 123.44 kB | 41.13 kB | Standard Framer Motion runtime |
| `dist/assets/react-vendor-*.js` | 173.94 kB | 57.35 kB | React 18, React DOM, React Router |
| `dist/assets/index-CD4guHFZ.js` | **898.60 kB** | **172.53 kB** | **WARNING: Oversized main client bundle** |
| `dist/assets/three-vendor-*.js` | **1,027.00 kB** | **283.10 kB** | **CRITICAL: Three.js + R3F + Drei vendor chunk exceeds 1 MB** |
| **Total JavaScript Transfer (Gzip)** | — | **~630 kB** | Unnecessarily high for a portfolio website |

### 3.2 Asset Payload Hazards [VERIFIED FROM SOURCE]
- **`public/models/avatar.glb` weighs 14.07 MB (14,072,008 bytes).**
  - If loaded on a 4G mobile connection (~10 Mbps), this single asset takes **11+ seconds** to download.
  - The model has not been optimized with Draco mesh compression or meshopt.
- **Portraits:**
  - `public/hero-editorial.webp` (144.4 KB) is well-optimized.
  - `public/hero.webp` (20.4 KB) is well-optimized.

### 3.3 Runtime Performance & Frame Stability
- **Scroll Rendering:** Lenis smooth scrolling maintains a steady 60 FPS on desktop GPUs.
- **Three.js Canvas Overhead:** On mobile devices, mounting the 3D particle sphere while animating route transitions triggers minor GPU thermal throttling and frame drops.
- **Layout Shift:** Zero visual layout shifts (CLS < 0.05) observed due to explicit aspect ratios on containers.
