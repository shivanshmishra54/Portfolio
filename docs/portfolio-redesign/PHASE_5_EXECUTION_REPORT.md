# Phase 5 Execution Report — Cinematic Scroll System, GSAP ScrollTrigger & Motion Quality

**Repository:** `C:\Project\Portfolio\portfolio`  
**Active Branch:** `feature/nextjs-redesign`  
**Reference Portfolio:** [https://sarthak-sharma-portfolio-six.vercel.app/](https://sarthak-sharma-portfolio-six.vercel.app/)  
**Target Environment:** Next.js 14.2.35 App Router (JavaScript, Tailwind CSS, SCSS Modules, Lenis, GSAP ScrollTrigger, Anime.js, Framer Motion, Three.js / R3F)  
**Date:** October 2026  
**Status:** **COMPLETE & FULLY VERIFIED**

---

## 1. Executive Summary

Phase 5 addresses the motion quality of Shivansh Mishra's personal portfolio. Prior to this phase, sections possessed independent, generic upward entrance animations that executed once upon entering the viewport, without coordination, scroll-depth linkage, or reversible narrative progression.

By studying the motion principles of the reference portfolio ([Sarthak Sharma's Portfolio](https://sarthak-sharma-portfolio-six.vercel.app/)), we designed and integrated a **unified, scroll-linked cinematic motion system** that coordinates:
1. **ReactLenis Virtual Scroll Engine** with **GSAP ScrollTrigger's Ticker**: Synchronizing smooth scroll delta calculation directly with ScrollTrigger's internal update loop and disabling lag smoothing to eliminate micro-stutters and trigger offsets.
2. **Target-Linked Hero Parallax Recession**: The heroes on `/`, `/developer`, and `/freelancer` now track actual scroll progress (`scrollYProgress` tied to the hero section bounding box), gracefully receding into depth (subtle scale `1.0 -> 0.94`, translation `0 -> 130px`, opacity `1.0 -> 0.0`) as the user scrolls forward, and reversing seamlessly when scrolling backward.
3. **Scroll-Progressive Journey Spine**: On `/journey`, the central timeline track now fills dynamically with an editorial warm-orange gradient (`#ff6b00` via `#f97316` to `#ff7a00`) mapped to the user's exact scroll position through the milestone track, receding naturally when scrolling upward.
4. **Editorial Motion Tokens & Text Reveal Integration**: Replaced generic easing curves with the editorial cubic bezier `[0.16, 1, 0.3, 1]`, standardizing on subtle `24px` vertical entrance offsets and integrating `AnimeTextReveal` typography masks across all major section headers.
5. **Palette Purity**: Replaced all remaining legacy emerald/green indicators with the editorial warm orange `#f97316` across all routes, cards, modals, and 3D globe annotations.

---

## 2. Audit of Pre-Phase 5 Animation System & Identified Defects

Before making code modifications, a comprehensive audit of the existing animation system was performed:

| Component / System | Pre-Phase 5 Issue | Architectural Solution in Phase 5 |
|---|---|---|
| **ScrollTrigger <-> Lenis Coordination** | ScrollTrigger was relying on native DOM scroll events while ReactLenis intercepted and smoothed wheel events. This caused trigger threshold miscalculations and scroll jitter. | Implemented `ScrollTriggerConfig.jsx` inside the Lenis context provider. Registered `lenis.on('scroll', ScrollTrigger.update)`, synchronized `gsap.ticker.lagSmoothing(0)`, and added resize/route-change refresh hooks. |
| **Route Transitions** | `src/app/template.jsx` and `src/components/layout/PageTransition.jsx` were both applying animating `motion.div` wrappers simultaneously, creating double-nested transforms, stutter, and layout shifts during page navigation. | Streamlined `PageTransition.jsx` into a lightweight passthrough wrapper, granting exclusive ownership of route entrance animations to `src/app/template.jsx`. |
| **Hero Motion Behavior** | Heroes were using static one-time `whileInView` entrances. Scrolling past the hero left it completely static until unmounted, lacking the cinematic depth of the reference. | Bound hero content and portraits to `useScroll` with `target: sectionRef, offset: ["start start", "end start"]`, producing smooth, reversible scale, translate, and fade recession. |
| **Timeline Progress Indicator** | The engineering journey on `/journey` possessed a static grey vertical line that did not communicate scroll progress or temporal advancement. | Connected the vertical line to a dynamic `motion.div` spine with `scaleY: scrollYProgress` (`origin-top`), filling with an orange gradient track and glowing node dots as each milestone is reached. |
| **Easing & Motion Uniformity** | Individual sections were using disparate animation curves (`easeOut`, `easeInOut`, durations varying from `0.4s` to `1.0s`, large `y: 40px` leaps). | Standardized all scroll reveals on editorial cubic bezier `[0.16, 1, 0.3, 1]`, with restrained `24px` offsets and `0.6s–0.75s` durations. |
| **Accent Palette Inconsistencies** | Several sections (`TechCapabilitiesSection`, `WhyWorkWithMeSection`, `ProcessSection`, `CurrentlyBuildingSection`, `ContactModal`, `ThreeLab`) retained legacy `emerald-400` / `emerald-500` status dots. | Replaced every green status indicator with warm orange `#f97316` and soft diffuse glow (`shadow-[0_0_8px_rgba(249,115,22,0.6)]`), preserving strict monochrome + warm orange visual identity. |

---

## 3. Reusable Motion Architecture & Implementation Details

### 3.1. GSAP ScrollTrigger & ReactLenis Virtual Scroll Synchronization

Created `src/components/layout/ScrollTriggerConfig.jsx`:
```jsx
'use client';

import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollTriggerConfig() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Synchronize Lenis virtual scroll updates with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleScroll);

    // Disable GSAP lag smoothing to maintain 1:1 synchronization with Lenis
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lenis]);

  return null;
}
```

Mounted `<ScrollTriggerConfig />` inside `<Providers>` within `<ReactLenis>` in `src/app/providers.jsx`.

### 3.2. Synchronized Route Scroll Reset & Trigger Refresh

Updated `src/components/layout/ScrollToTop.jsx`:
- On route changes, calls `lenis.scrollTo(0, { immediate: true })`.
- Dispatches `ScrollTrigger.refresh()` after a brief microtask delay to ensure newly mounted DOM components receive exact trigger calculations.

### 3.3. Elimination of Double-Nested Route Transitions

Updated `src/components/layout/PageTransition.jsx`:
- Converted into a clean, un-nested passthrough component.
- `src/app/template.jsx` retains primary ownership of page transitions (`opacity: 0 -> 1`, `y: 8 -> 0`, duration `0.35s`, ease `[0.16, 1, 0.3, 1]`), eliminating frame drops and jitter during navigation.

### 3.4. Target-Linked Hero Parallax Recession

#### Homepage Hero (`src/views/HomePage/HeroSection.jsx`):
- Bound to `useScroll({ target: sectionRef, offset: ["start start", "end start"] })`.
- **Text & CTAs Parallax**: `y: 0 -> 130px`, `opacity: 1 -> 0`, `scale: 1 -> 0.94`.
- **Portrait Parallax**: `y: 0 -> 75px`, `scale: 1 -> 0.96`, `opacity: 1 -> 0.1` (layered depth, foreground moves faster than background).
- **Navigation & Metric Bars**: `opacity: 1 -> 0` by 30% scroll progress.
- Completely reversible: scrolling back to top smoothly restores full opacity and original coordinates.

#### Developer Hero (`src/views/DeveloperPage/DeveloperHero.jsx`):
- Preserved Phase 3.1 centered editorial alignment.
- Added target-linked recession: `contentY: 0 -> 90px`, `contentOpacity: 1 -> 0`, `contentScale: 1 -> 0.95`.

#### Freelancer Hero (`src/views/FreelancerPage/FreelancerHero.jsx`):
- Added target-linked recession: `contentY: 0 -> 90px`, `contentOpacity: 1 -> 0`, `contentScale: 1 -> 0.95`.

### 3.5. Dynamic Timeline Progress Spine on `/journey`

Updated `src/components/ui/JourneyTimeline.jsx`:
- Added a `useScroll` hook tracking the milestone container.
- Constructed a double-layered timeline spine:
  - Background track: subtle `border-r border-white/[0.08]`.
  - Active progress spine: `motion.div` with `scaleY: scrollYProgress` (`origin-top`), filled with a glowing warm orange gradient (`from-[#ff6b00] via-[#f97316] to-[#ff7a00]`).
- Milestone node markers highlight with warm orange `#f97316` and diffuse orange box-shadows.

### 3.6. Editorial Motion Tokens & Easing Standard

Updated `src/components/layout/ScrollReveal.jsx`:
- Default easing: `[0.16, 1, 0.3, 1]` (editorial cubic bezier).
- Vertical offset: `24px` (subtle and controlled, avoiding dramatic leaps).
- Default duration: `0.75s`.

---

## 4. Files Modified and Summary of Changes

| File | Nature of Changes |
|---|---|
| `src/components/layout/ScrollTriggerConfig.jsx` | **NEW FILE**: Created GSAP ScrollTrigger <-> ReactLenis virtual scroll synchronization bridge. |
| `src/app/providers.jsx` | Integrated `<ScrollTriggerConfig />` inside `<ReactLenis>` provider. |
| `src/components/layout/ScrollToTop.jsx` | Coordinated Lenis immediate top-scroll with `ScrollTrigger.refresh()`. |
| `src/components/layout/PageTransition.jsx` | Streamlined to passthrough wrapper to eliminate double-nested route animations. |
| `src/components/layout/ScrollReveal.jsx` | Standardized on editorial cubic bezier `[0.16, 1, 0.3, 1]`, `yOffset = 24px`, and `duration = 0.75s`. |
| `src/components/shared/SectionHeading.jsx` | Refined subtitle entrance with staggered timing and `[0.16, 1, 0.3, 1]` easing. |
| `src/views/HomePage/HeroSection.jsx` | Implemented target-bound hero content recession, layered portrait parallax, and early bar fade; fixed JSX closing tag. |
| `src/views/DeveloperPage/DeveloperHero.jsx` | Added target-bound container recession (`y: 90px`, `scale: 0.95`, `opacity: 0`) while preserving centered alignment. |
| `src/views/FreelancerPage/FreelancerHero.jsx` | Added target-bound container recession (`y: 90px`, `scale: 0.95`, `opacity: 0`). |
| `src/components/ui/JourneyTimeline.jsx` | Added dynamic scroll progress spine with warm orange gradient track, orange node dots, and verified milestone details. |
| `src/components/ui/CircularCardDeck.jsx` | Upgraded deck control buttons to editorial tokens and active dot to glowing warm orange `#f97316`. |
| `src/views/HomePage/CurrentlyBuildingSection.jsx` | Replaced emerald pulse indicators with warm orange `#f97316` and soft diffuse glow. |
| `src/views/HomePage/JourneyPreviewSection.jsx` | Refined milestone hover glow to warm orange `#f97316` and applied editorial easing. |
| `src/views/Lab/ThreeLab.jsx` | Replaced emerald HUD indicators with warm orange `#f97316`. |
| `src/views/FreelancerPage/ProcessSection.jsx` | Replaced emerald indicator with warm orange `#f97316` and wrapped heading in `AnimeTextReveal`. |
| `src/views/FreelancerPage/WhyWorkWithMeSection.jsx` | Replaced emerald indicator with warm orange `#f97316` and wrapped heading in `AnimeTextReveal`. |
| `src/views/FreelancerPage/FAQSection.jsx` | Replaced emerald indicator with warm orange `#f97316` and wrapped heading in `AnimeTextReveal`. |
| `src/views/FreelancerPage/TechCapabilitiesSection.jsx` | Replaced emerald indicator with warm orange `#f97316` and wrapped heading in `AnimeTextReveal`. |
| `src/views/FreelancerPage/ProjectInquirySection.jsx` | Replaced emerald indicator with warm orange `#f97316` and wrapped heading in `AnimeTextReveal`. |
| `src/views/FreelancerPage/FreelanceWorkSection.jsx` | Replaced emerald badge with warm orange `#f97316` and wrapped heading in `AnimeTextReveal`. |
| `src/components/ui/ContactModal.jsx` | Replaced required field asterisks (`text-emerald-400`) with warm orange `text-[#f97316]`. |
| `src/components/ui/ProjectVisualBanner.jsx` | Replaced codebase ready indicator with warm orange `#f97316`. |
| `src/components/3d/AvatarPlaceholder.jsx` | Replaced 3D globe skill label dot with warm orange `#f97316`. |

---

## 5. Verification Evidence

### 5.1. Code Quality & Lint Verification (`npm run lint`)
Executed `npm run lint` on the repository:
```bash
> react@0.0.0 lint
> eslint .

# Output: 0 errors, 0 warnings (Exit code 0)
```

### 5.2. Production Build Verification (`npm run build`)
Executed `npm run build` on the Next.js 14.2.35 App Router:
```text
  ▲ Next.js 14.2.35
  - Environments: .env

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (8/8)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                              Size     First Load JS
┌ ○ /                                    297 kB          508 kB
├ ○ /_not-found                          876 B          88.5 kB
├ ○ /3d-lab                              1.4 kB         89.1 kB
├ ○ /developer                           192 kB          367 kB
├ ○ /freelancer                          11.6 kB         168 kB
└ ○ /journey                             6.1 kB          148 kB
+ First Load JS shared by all            87.7 kB
  ├ chunks/117-7865aeda6677f528.js       31.9 kB
  ├ chunks/fd9d1056-aa9b9ca480dc9276.js  53.6 kB
  └ other shared chunks (total)          2.12 kB

○  (Static)  prerendered as static content
```
- **Zero bundle growth**: First load JS sizes match or outperform Phase 4 metrics (`508 kB` for homepage, `367 kB` for developer route, `168 kB` for freelancer route, `148 kB` for journey route, and `89.1 kB` for 3d-lab route).

### 5.3. Live Browser Verification & Motion Quality Testing
Browser subagent testing verified the production build running on `http://localhost:3000`:

1. **Desktop Verification (1280x800)**:
   - **Homepage (`/`)**: Scroll forward demonstrated smooth recession of hero text (`y: 130px`, `scale: 0.94`, `opacity: 0`), layered portrait movement (`y: 75px`), KineticProofStrip marquee, PerspectiveSwitcher, Bento Grid, and Selected Work. Reversing scroll smoothly reconstructed the hero without jitter or layout jumps.
   - **Developer Route (`/developer`)**: Centered hero layout with scroll parallax recession; architecture diagram, technical skill matrices, project case studies, and verified problem-solving metrics (200+ LeetCode, 8.72 CGPA, Spring Boot Admin PR #5738).
   - **Freelancer Route (`/freelancer`)**: Services, case studies, collaboration process, tech capabilities, and FAQ. Clicking "Let's talk" smoothly opened the Contact Modal with warm orange accents, and closed cleanly with the ESC key and close button.
   - **Journey Route (`/journey`)**: Verified the dynamic timeline spine. As the user scrolls down, the orange gradient fills the track, connecting verified milestones from 2021 to 2025. Scrolling backward recedes the track naturally.
   - **3D Lab Route (`/3d-lab`)**: Loaded interactive spatial WebGL globe with orbit controls, warm orange HUD markers, and zero console warnings.

2. **Mobile Viewport Verification (390x844)**:
   - Verified homepage and developer page on mobile.
   - **Zero horizontal overflow**: Page width strictly locked to `390px` with no horizontal scrollbar or sideways drifting.
   - Touch scrolling was smooth and responsive, with graceful degradation of parallax transforms for mobile performance.

3. **Console Health**:
   - Zero unhandled exceptions.
   - Zero React hydration warnings.
   - Clean DOM hierarchy.

### 5.4. Recorded Artifacts & Visual Evidence
- **Full Browser Session Video Recording (WebP)**: [phase5_scroll_verification_1793122051908.webp](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/phase5_scroll_verification_1793122051908.webp)
- **Mobile Viewport Session Video Recording (WebP)**: [phase5_mobile_verification_1793122554431.webp](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/phase5_mobile_verification_1793122554431.webp)
- **Desktop Homepage Top**: [homepage_top_1793122108611.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/homepage_top_1793122108611.png)
- **Desktop Homepage Scrolled Parallax**: [homepage_scrolled_1_1793122145845.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/homepage_scrolled_1_1793122145845.png)
- **Desktop Developer Page**: [developer_page_1793122200054.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/developer_page_1793122200054.png)
- **Desktop Freelancer Page & Inquiry Modal**: [contact_modal_1793122457543.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/contact_modal_1793122457543.png)
- **Desktop Journey Page & Timeline Progress Line**: [journey_scrolled_1793122501063.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/journey_scrolled_1793122501063.png)
- **Desktop 3D Lab Scene**: [3d_lab_page_1793122526612.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/3d_lab_page_1793122526612.png)
- **Mobile Homepage Hero**: [mobile_homepage_hero_1793122568061.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/mobile_homepage_hero_1793122568061.png)
- **Mobile Developer Architecture & Skills**: [mobile_developer_architecture_1793122588926.png](file:///C:/Users/SHIVANSH%20MISHRA/.gemini/antigravity-ide/brain/6ce8d17f-7d0b-4766-9a01-7734106454d0/mobile_developer_architecture_1793122588926.png)

---

## 6. Strict Scope Boundaries & Deferred Dedicated Future Phases

In strict adherence to the project guidelines, two major advanced creative features were intentionally scoped out of Phase 5 and preserved for dedicated subsequent phases:

### 1. Dedicated Portrait-to-Particle Transformation System (Phase 6)
- **Reference Behavior**: In Sarthak Sharma's portfolio, scrolling past the hero causes the portrait to dissolve into thousands of glowing point particles that disperse dynamically with scroll progress and reconstitute when scrolling upward.
- **Phase 5 Implementation**: The current portrait maintains clean, high-performance parallax translation, scale, and opacity recession, integrated with the warm orange rim lighting and toggleable 3D Globe fallback.
- **Future Phase Handoff**: A dedicated Three.js / WebGL custom shader system (reading pixel luminance/depth from `hero-editorial.webp` to generate a GPU particle point cloud) will be implemented in Phase 6. No fake CSS approximations were added.

### 2. Dedicated 2D Character Journey: "In Motion" / "See My Life"
- **Reference Scope**: The `/3d-lab` route will eventually be transformed into an interactive, scroll-driven visual story featuring an illustrated 2D character avatar based on Shivansh Mishra's actual likeness, depicting chronological scenes (learning, coding, hackathons, open source contributions, production deployments).
- **Phase 5 Implementation**: Maintained the existing interactive 3D Globe WebGL lab with warm orange HUD indicators, orbit controls, and tech nodes. The route structure and functionality remain intact without breaking changes.
- **Future Phase Handoff**: The illustrated assets and multi-scene scroll story will be designed and implemented in the dedicated "In Motion / See My Life" phase.

---

## 7. Clean Git Status Confirmation

Verified via `git status --short --branch`:
- Branch: `feature/nextjs-redesign`
- No committed, pushed, or deployed artifacts.
- No deleted or discarded user files; all untracked audit documents and migration assets preserved.
- Ready for user review.
