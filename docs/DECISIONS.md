# Architecture & Product Decisions

> Version: 1.0  
> Last Updated: 2026-10-01  
> Status: Live

This document records major architecture and product decisions for the portfolio transformation. 
Do not silently reverse major approved decisions.

---

## 1. Information Architecture: Multi-Route vs Single-Page

- **Date**: 2026-10-01
- **Decision**: Adopt a multi-route architecture (Homepage, Freelancer, Developer, Contact, etc.) with deep-linkable URLs.
- **Context**: The existing portfolio is a standard SPA that supports a dormant "one page" toggle. The new vision requires distinct journeys for different audiences.
- **Alternatives considered**: 
  - Single massive scrolling page
  - Subdomains (freelance.shivansh.com)
- **Selected approach**: Multi-route SPA using React Router v7.
- **Reason**: A single page cannot effectively serve both freelancers and recruiters without becoming overwhelmingly long or conceptually confusing. Distinct routes allow targeted messaging ("Path = Depth").
- **Trade-offs**: Slightly more complex routing; requires page transitions to maintain fluidity.

---

## 2. 3D Engine: React Three Fiber vs Vanilla Three.js

- **Date**: 2026-10-01
- **Decision**: Use React Three Fiber (R3F) ecosystem.
- **Context**: We need to integrate a premium 3D hero scene and eventually a custom 3D avatar.
- **Alternatives considered**:
  - Vanilla Three.js
  - Spline runtime
  - Babylon.js
- **Selected approach**: `@react-three/fiber` + `@react-three/drei`.
- **Reason**: R3F integrates seamlessly with the existing React architecture, leverages the component model for 3D objects, and has a massive ecosystem of helpers (Drei) that drastically reduce boilerplate for things like environments, loading, and HTML overlays.
- **Trade-offs**: Abstracted API can sometimes hide underlying Three.js complexities; requires learning R3F specific paradigms.

---

## 3. Styling: Tailwind CSS v3 vs v4

- **Date**: 2026-10-01
- **Decision**: Remain on Tailwind CSS v3 for this transformation.
- **Context**: Tailwind v4 is available, but the current project is built heavily on v3 and shadcn/ui.
- **Alternatives considered**: Upgrade to Tailwind v4.
- **Selected approach**: Keep Tailwind v3.
- **Reason**: Upgrading to v4 mid-project introduces high risk due to config changes, JIT compilation differences, and plugin API changes. The goal is product transformation, not infrastructure chasing.
- **Trade-offs**: Missing out on v4 performance improvements and simpler config, but ensures stability.

---

## 4. Framework: Vite SPA vs Next.js SSR

- **Date**: 2026-10-01
- **Decision**: Remain on Vite (Client-side rendering).
- **Context**: The current app is a Vite SPA. Next.js is popular for portfolios due to SEO.
- **Alternatives considered**: Migrate to Next.js or Remix.
- **Selected approach**: Stick with Vite SPA; handle SEO via `react-helmet-async` and prerendering if absolutely necessary later.
- **Reason**: The existing app works well. A framework migration is a massive undertaking that distracts from the visual and architectural goals. Modern crawlers can execute JS, and the site doesn't have thousands of dynamic pages requiring SSR.
- **Trade-offs**: Slightly slower initial paint (no SSR); SEO relies on Googlebot's JS execution capabilities.

---

## 5. Data Architecture: Hardcoded JSX vs Centralized Data Layer

- **Date**: 2026-10-01
- **Decision**: Extract all content to `src/data/*.js`.
- **Context**: Currently, all text, skills, and projects are hardcoded inside React components.
- **Alternatives considered**:
  - Headless CMS (Sanity, Contentful)
  - Markdown/MDX files
  - Inline JSX (status quo)
- **Selected approach**: JavaScript data modules (`src/data/`).
- **Reason**: A CMS is overkill for a personal portfolio. Markdown is good for blogs but harder to query for complex structured data (like nested skills or project metadata). JS data objects provide type safety (via JSDoc/TS later) and easy importing.
- **Trade-offs**: Requires a manual extraction phase (Phase 0); content updates require a code commit.

---

## 6. Avatar Strategy: Procedural vs AI-Generated vs Custom Model

- **Date**: 2026-10-01
- **Decision**: Use a procedural placeholder during development; design architecture for a future custom GLB/GLTF model.
- **Context**: The environment lacks reliable image-to-3D generation capabilities to automatically convert a photo into a production-ready 3D avatar.
- **Alternatives considered**:
  - Pretend to generate a model (rejected due to technical impossibility)
  - Use a generic free 3D human model (rejected; violates brand authenticity)
- **Selected approach**: Create a `<PersonalAvatar />` component that currently renders an abstract, premium procedural form, but accepts a `modelPath` prop to load the final asset later.
- **Reason**: Maintains honesty about technical limitations while unblocking development and ensuring the final product can easily adopt the intended asset without code rewrites.
- **Trade-offs**: The visual impact of the hero section will not be fully realized until the final custom 3D asset is produced and integrated.

---

## 7. Timeline Design: Conventional vs Signature Journey

- **Date**: 2026-10-01
- **Decision**: Build a custom "Signature Journey" timeline.
- **Context**: Portfolios typically use standard vertical lines with dots for experience.
- **Alternatives considered**: Use shadcn/ui timeline or standard vertical list.
- **Selected approach**: A distinct interactive component (spatial/horizontal on desktop, vertical on mobile) that merges education and experience chronologically, where milestones expand to reveal details.
- **Reason**: The timeline is a core piece of the developer narrative. A unique execution acts as a demonstration of frontend skill, elevating it from a simple resume rendering to an engaging brand experience.
- **Trade-offs**: Higher implementation effort; requires careful responsive design to ensure mobile usability.
