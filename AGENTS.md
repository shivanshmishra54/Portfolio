# AGENTS.md — Operating Contract

> This file is the permanent operating contract for any AI agent working on this repository.
> Read this BEFORE making any changes.

---

## Project Identity

This is the personal portfolio website of **Shivansh Mishra**.

It is a **premium, monochrome, 3D-enhanced** portfolio that serves **one personal brand** across **two professional paths**:

1. **Freelancer** — for clients seeking development services
2. **Software Developer** — for recruiters, hiring managers, and engineering peers

The website is NOT a resume dump. It is a curated, cinematic brand experience.

---

## Core Architecture Principles

### Homepage = Overview

The homepage (`/`) answers: Who is Shivansh? What does he build? Why should I continue?

It provides a **universal overview** with progressive disclosure. It does NOT contain the full portfolio catalogue.

### Path = Depth

After the overview, visitors choose a path:

- `/freelancer` — Client-oriented experience (services, case studies, process, inquiry)
- `/developer` — Engineering-oriented experience (stack, projects, journey, certifications, resume)

Each path presents the same underlying data through a different lens.

### Data-Driven Content

All portfolio content lives in `src/data/*.js`. Components consume this data layer.

**Never hardcode portfolio content directly in JSX.**

---

## Stack Constraints

### Preserve (Do Not Replace)

| Technology | Purpose |
|---|---|
| Vite 7 | Build system |
| React 18 | UI framework |
| React Router v7 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Framer Motion | UI animations |
| Lenis | Smooth scrolling |
| shadcn/ui | Component primitives |
| Vercel | Deployment |
| Web3Forms | Contact form backend |

### Do NOT Migrate To

- Next.js
- Tailwind v4
- React 19
- Any SSR/SSG framework

Unless a verified technical blocker makes migration absolutely necessary.

### 3D Stack

| Library | Purpose |
|---|---|
| @react-three/fiber | 3D rendering |
| @react-three/drei | 3D utilities |
| @react-three/postprocessing | Only where it provides measurable visual benefit |

### Animation Responsibilities

| System | Scope |
|---|---|
| Framer Motion | UI transitions, page transitions, scroll-triggered UI animations |
| React Three Fiber | 3D scene animation, camera, lighting, procedural geometry |
| Lenis | Scroll smoothing |
| CSS | Micro-interactions, hover states, simple keyframes |

Do not mix animation systems for the same interaction.

---

## Design Rules

### Visual Identity

- **Default theme**: White (light mode)
- **Optional theme**: Dark mode
- **Palette**: Monochrome only — white, black, off-white, light gray, dark gray, subtle monochrome gradients
- **No bright accent colors**

### Required Qualities

Premium · Editorial · Minimal · Technical · Futuristic · Sophisticated

### Prohibited Patterns

- Neon/cyberpunk aesthetics
- Rainbow gradients
- Excessive glassmorphism
- Giant skill-logo walls
- Fake statistics or testimonials
- Random 3D objects with no narrative purpose
- Excessive particles
- Spinning objects for decoration
- Excessive scroll hijacking
- Animation for decoration only
- Generic portfolio templates

### Design Hierarchy

At every viewport, prioritize:

1. Identity
2. Main message
3. Primary CTA
4. Proof
5. Secondary information

Premium design requires **controlled restraint**, not visual loudness.

---

## 3D Rules

### Architecture

- All 3D scenes use React Three Fiber via a shared `<Canvas>` wrapper
- The `<PersonalAvatar />` component is isolated — it accepts a `.glb`/`.gltf` model prop
- The avatar asset can be replaced without redesigning the hero

### Current Limitation

This environment does NOT provide reliable image-to-3D generation.

An uploaded photo is a **visual reference**, NOT an input for automatic GLB generation.

The architecture must support inserting a future custom 3D model without redesign.

### Performance

- 3D must NOT block meaningful HTML/UI from rendering
- Lazy-load all 3D scenes
- Use `useDetectGPU()` for quality tiering
- Provide CSS fallback for WebGL failure
- Respect `prefers-reduced-motion`

### Style

3D communicates identity and narrative. It is NOT decoration.

Avoid excessive glow, particles, camera movement, or visual noise.

---

## Content Rules

- **Never fabricate information** — no fake testimonials, statistics, credentials, or projects
- **Use existing content as source of truth** — extracted from current JSX files
- **All content lives in `src/data/`** — single source of truth
- **Project metadata controls presentation** — same data, different views per path

---

## Accessibility Rules

- Skip-to-content link
- Semantic HTML landmarks
- Keyboard navigation with visible focus states
- Labels for all form controls
- Meaningful alt text
- `prefers-reduced-motion` support
- Touch equivalents for hover interactions
- Sufficient color contrast (WCAG AA)
- Essential information must NEVER require hover, animation, or WebGL

---

## Performance Rules

- Route-level code splitting with `React.lazy()`
- Lazy-loaded 3D scenes (never block initial render)
- Optimized images (WebP, compressed, lazy-loaded)
- No viewport-specific hacks (`window.innerWidth === 1366`)
- CSS breakpoints and container queries only
- Progressive loading for heavy assets

---

## Responsive Rules

Design targets: mobile, tablet, desktop, large desktop.

- Use CSS breakpoints — never `window.innerWidth` comparisons
- Remove all existing resolution-sniffing hacks
- Fix existing mobile overflow and spacing issues
- 3D quality scales with device capability

---

## SEO Rules

- Unique title and meta description per route
- Open Graph and Twitter Card tags
- Canonical URLs
- JSON-LD structured data where appropriate
- sitemap.xml and robots.txt
- Clean favicon (remove conflicting references)

---

## Security Rules

- API keys in `.env` files (prefixed `VITE_`)
- Never commit secrets to source
- `.env` in `.gitignore`

---

## Testing Expectations

- All routes render without console errors
- Navigation works with browser back/forward
- Deep links work for all routes
- Forms validate, show loading/success/error states
- 3D scenes degrade gracefully without WebGL
- Mobile layouts have no horizontal overflow
- Lighthouse performance score targets: 90+ (without 3D), 80+ (with 3D)

---

## Documentation Maintenance

Approved documentation structure:

```
AGENTS.md
docs/
  PRODUCT_SPEC.md
  ARCHITECTURE.md
  DESIGN_SYSTEM.md
  IMPLEMENTATION_PLAN.md
  DECISIONS.md
  PROGRESS.md
  CONTENT_SCHEMA.md
  3D_STRATEGY.md
```

Update documentation when architecture, design, data model, routing, 3D, performance, or product decisions change.

Do NOT create ad-hoc files (`final-final.md`, `notes2.md`, `temp.md`).

Keep code and documentation synchronized.
