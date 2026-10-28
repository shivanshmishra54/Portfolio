# 04 — Animations, Interactions & Motion Audit

> **Audit Date:** October 26, 2026  
> **Animation Engine Inventory:** Framer Motion (`12.23.12`), React Three Fiber (`8.18.0`), Three.js (`0.186.1`), Lenis (`1.3.10`), GSAP (`3.15.0`), Anime.js (`4.5.0`)  
> **Contract Constraint:** Do not mix animation systems for the same interaction. 3D communicates identity and narrative, not decoration.

---

## 1. Animation Libraries & Responsibilities

The codebase currently utilizes five distinct animation engines:

| Engine | Package | Scope & Usage in Codebase |
|---|---|---|
| **Framer Motion** | `framer-motion@12.23.12` | Route transitions (`AnimatePresence`), scroll reveals (`useScroll`, `useTransform`), mobile menu drawer, card hover physics, line masks. |
| **React Three Fiber** | `@react-three/fiber@8.18.0` | 3D rendering pipeline: interactive particle sphere, camera rig, avatar placeholder, WebGL fallback. |
| **Three.js** | `three@0.186.1` | Underlying WebGL engine, geometry shaders, point cloud generation, lighting, and materials. |
| **Lenis** | `lenis@1.3.10` / `lenis/react` | Global inertia-based smooth scrolling (`lerp: 0.08`, `duration: 1.2`). |
| **GSAP** | `gsap@3.15.0` | Infinite typographic marquee ribbon (`src/components/ui/TypographicMarquee.jsx`). |
| **Anime.js** | `animejs@4.5.0` | Scramble text micro-interaction (`src/components/ui/SignalText.jsx`). |

---

## 2. Interaction & Animation Inventory

### 2.1 Smooth Scroll Pipeline (`ReactLenis`) [VERIFIED FROM SOURCE: `src/App.jsx:30`]
- **Trigger:** Native wheel, trackpad, and touch events.
- **Implementation:** `<ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>`.
- **Behavior:**
  - Desynchronizes scroll rendering from default browser tick, delivering high-end momentum scrolling.
  - Automatically handles native anchor hash navigation (`#work`, `#about`, `#perspectives`).
- **Mobile Considerations:** Lenis defaults to touch-friendly settings, but when combined with full-screen 3D canvases, touch dragging can conflict unless `pointer-events-none` is applied to non-interactive overlays.

### 2.2 Kinetic Scroll Progress Bar [VERIFIED FROM SOURCE: `src/components/layout/Navigation.jsx:56-60`]
- **Trigger:** Scroll position of the window (`scrollYProgress` from Framer Motion).
- **Element:** Fixed 2px line at top of viewport (`z-[70] origin-left`).
- **Animation:** `scaleX` binds directly to `scrollYProgress` (0 to 1).
- **Reduced Motion:** Inert pointer-events; purely informational without jarring rapid movement.

### 2.3 Editorial Line Mask Reveal [VERIFIED FROM SOURCE: `src/components/ui/LineMaskReveal.jsx`]
- **Trigger:** Page load / element entering viewport.
- **Implementation:** Overflow-hidden wrapper with inner child translating from `translateY(110%)` to `translateY(0%)` with a cubic-bezier easing (`[0.16, 1, 0.3, 1]`) and opacity fade.
- **Config:** Duration `0.85s`, configurable delay (0.1s - 0.25s).
- **Reduced Motion Support:** Respects system reduced-motion preferences, disabling translation and using immediate opacity fade.

### 2.4 Cyberpunk / Matrix Character Scramble (`SignalText`) [VERIFIED FROM SOURCE: `src/components/ui/SignalText.jsx`]
- **Trigger:** Component mount or mouse hover (`scrambleOnHover={true}`).
- **Engine:** `animejs` v4 `animate` loop.
- **Implementation:** Cycles characters through a randomized glyph pool (`ABCDEF0123456789!<>-_\\/[]{}—=+*^?#_`) before resolving into the final target string.
- **Lifecycle & Cleanup:** Cancels running animation on mouse leave or unmount, preventing memory leaks.

### 2.5 Infinite Typographic Marquee (`TypographicMarquee`) [VERIFIED FROM SOURCE: `src/components/ui/TypographicMarquee.jsx`]
- **Trigger:** Continuous auto-play with pause-on-hover.
- **Engine:** GSAP `gsap.to(track, { xPercent: -50, ease: "none", duration: 25, repeat: -1 })`.
- **Performance:** Applies `will-change: transform` on the track element to maintain 60 FPS GPU compositing.

### 2.6 Interactive 3D Particle Skills Sphere [VERIFIED IN BROWSER & SOURCE: `src/components/3d/`]
- **Trigger:** Continuous auto-rotation with interactive pointer tilt and drag.
- **Engine:** `@react-three/fiber` with custom geometry and `react-icon-cloud` integration.
- **Features:**
  - 3D sphere carrying tech logos and floating nodes.
  - Dampened camera rig responding to mouse coordinates via `useFrame((state) => ...)`.
  - Quality tiering via `useDetectGPU` (reduces particle count on low-tier mobile devices).
  - Fallback: Gracefully falls back to `<WebGLFallback />` if WebGL context is lost or unsupported.

### 2.7 Route Page Transitions (`AnimatePresence`) [VERIFIED FROM SOURCE: `src/App.jsx:38-47`]
- **Trigger:** Route changes (`/` -> `/developer` -> `/freelancer`).
- **Implementation:** `<AnimatePresence mode="wait">` wraps `<Routes>`.
- **Transition:** Previous route fades out (`opacity: 0, y: -10`) over 250ms, subsequent route enters (`opacity: 1, y: 0`).

---

## 3. Motion & Animation Deficiencies [VERIFIED FROM SOURCE]

1. **Multiple Competing Animation Libraries:**
   - The application bundles **Framer Motion (123 kB gzip: 41 kB)**, **GSAP (65 kB)**, and **Anime.js (15 kB)** simultaneously.
   - Using Framer Motion for line reveals, GSAP for marquee, and Anime.js for text scramble introduces unnecessary bundle overhead. A unified system (either pure Framer Motion or pure GSAP) would save over 100 kB of JavaScript.
2. **Missing Reduced-Motion Guards on Certain CSS Keyframes:**
   - In `src/assets/css/index.css:87-94`, `.animate-float-slow` and `.animate-float` run infinite floating keyframes without being enclosed in `@media (prefers-reduced-motion: reduce)` queries.
3. **Double Smooth Scroll Hazard:**
   - Both `locomotive-scroll` (v5.0.1) and `lenis` (v1.3.10) are listed as dependencies in `package.json`. While only `lenis` is currently mounted in `App.jsx`, leaving locomotive-scroll in the package manifest introduces confusion and dependency bloat.
