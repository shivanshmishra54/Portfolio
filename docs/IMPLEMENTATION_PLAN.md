# Implementation Plan

> Version: 1.0  
> Last Updated: 2026-10-01  
> Status: Phase 0 ready to begin

---

## Phase Overview

| Phase | Name | Objective | Est. Effort |
|---|---|---|---|
| 0 | Foundation | Clean architecture, data extraction, zero visual changes | 2-3 days |
| 1 | 3D Foundation | R3F setup, hero scene, avatar architecture | 2-3 days |
| 2 | Homepage & Navigation | Full homepage experience, navigation redesign | 3-4 days |
| 3 | Freelancer Path | Complete freelancer deep-dive | 2-3 days |
| 4 | Developer Path | Complete developer deep-dive + signature timeline | 3-4 days |
| 5 | Polish & Production | SEO, accessibility, performance, testing | 2-3 days |

**Total estimated**: 14-20 days

---

## Phase 0: Foundation

**Objective**: Prepare the codebase for transformation without changing any visual output. The running app should look identical before and after this phase.

### Tasks

- [ ] **0.1** Create `src/data/profile.js` — extract from Hero.jsx, About.jsx, Contact.jsx
- [ ] **0.2** Create `src/data/skills.js` — extract from Skills.jsx (6 categories, 33 items)
- [ ] **0.3** Create `src/data/projects.js` — extract from Projects.jsx (4 projects), add new schema fields
- [ ] **0.4** Create `src/data/experience.js` — extract from Experience.jsx (3 entries)
- [ ] **0.5** Create `src/data/education.js` — extract from Education.jsx (3 entries)
- [ ] **0.6** Create `src/data/certificates.js` — extract from Certificates.jsx (9 entries)
- [ ] **0.7** Create `src/data/achievements.js` — extract from Skills.jsx achievements section
- [ ] **0.8** Create `src/data/services.js` — define freelancer services from existing skill data
- [ ] **0.9** Create `src/data/navigation.js` — extract from Header.jsx
- [ ] **0.10** Create `src/data/journey.js` — merge education + experience chronologically
- [ ] **0.11** Update existing page components to import from `src/data/` instead of inline data
- [ ] **0.12** Create `.env` with `VITE_WEB3FORMS_KEY`; create `.env.example`; add `.env` to `.gitignore`
- [ ] **0.13** Update Contact.jsx to use `import.meta.env.VITE_WEB3FORMS_KEY`
- [ ] **0.14** Delete duplicate assets: `src/assets/images/hero.jpg`, `src/assets/images/certificates/`
- [ ] **0.15** Delete orphaned assets: `src/assets/images/olova*.png`
- [ ] **0.16** Delete unused components: `enhanced-portfolio-card.jsx`, `AnimatedGrid.jsx`, `cool-mode.jsx`, `evervault-card.jsx`
- [ ] **0.17** Remove 1366x768 resolution hacks from Hero.jsx, Projects.jsx, Certificates.jsx
- [ ] **0.18** Replace `window.innerWidth` in Header.jsx with CSS/hook-based responsive detection
- [ ] **0.19** Move inline `<style>` tags from Header.jsx, Skills.jsx to CSS files or Tailwind config
- [ ] **0.20** Add route-level code splitting: `React.lazy()` + `<Suspense>` in App.jsx
- [ ] **0.21** Optimize certificate images: convert PNGs to WebP, compress to <200KB each
- [ ] **0.22** Add `loading="lazy"` to certificate and project images
- [ ] **0.23** Move favicon to `public/favicon.ico`, clean up conflicting references in index.html
- [ ] **0.24** Remove `isOnePage` toggle from App.jsx
- [ ] **0.25** Verify: app runs, all pages render correctly, no console errors

**Dependencies**: None  
**Files affected**: All page components, App.jsx, index.html, .gitignore, assets  
**Acceptance criteria**:
- All content consumed from `src/data/`
- No hardcoded content in any page component
- No duplicate assets
- No unused components
- No resolution hacks
- No inline styles
- No exposed API keys
- Code splitting active
- Images optimized
- App renders identically to pre-Phase-0

---

## Phase 1: 3D Foundation

**Objective**: Install 3D stack, build hero scene with avatar architecture, integrate into existing homepage.

### Tasks

- [ ] **1.1** Install `@react-three/fiber`, `@react-three/drei`, `three`
- [ ] **1.2** Create `src/hooks/useWebGLSupport.js`
- [ ] **1.3** Create `src/hooks/useReducedMotion.js`
- [ ] **1.4** Create `src/hooks/useDeviceCapability.js` (wraps `useDetectGPU`)
- [ ] **1.5** Create `src/components/three/SceneWrapper.jsx` — Canvas + Suspense + Error Boundary
- [ ] **1.6** Create `src/components/three/WebGLFallback.jsx` — static fallback design
- [ ] **1.7** Create `src/components/three/PersonalAvatar.jsx` — isolated, prop-driven, placeholder mode
- [ ] **1.8** Create `src/components/three/HeroScene.jsx` — procedural monochrome environment
- [ ] **1.9** Implement idle animation in HeroScene
- [ ] **1.10** Implement mouse parallax interaction
- [ ] **1.11** Implement scroll-driven transition (hero → next section)
- [ ] **1.12** Implement responsive quality levels (high/medium/low)
- [ ] **1.13** Implement reduced-motion static rendering
- [ ] **1.14** Test WebGL fallback by forcing failure
- [ ] **1.15** Create `public/models/` directory for future GLB assets
- [ ] **1.16** Verify: hero renders 3D scene, degrades gracefully, no performance regression

**Dependencies**: Phase 0 complete  
**Files affected**: New files only + Hero page integration  
**Acceptance criteria**:
- 3D hero scene renders on desktop
- Quality tiers work (high/medium/low)
- WebGL fallback renders attractive static hero
- Reduced motion shows static scene
- Mouse interaction is subtle, not gimmicky
- Scroll fades hero scene appropriately
- PersonalAvatar accepts optional modelPath prop
- No console errors

---

## Phase 2: Homepage & Navigation

**Objective**: Build the complete homepage experience and redesigned navigation.

### Tasks

- [ ] **2.1** Create `src/components/layout/Navigation.jsx` — premium monochrome floating nav
- [ ] **2.2** Create `src/components/layout/Footer.jsx` — premium footer
- [ ] **2.3** Create `src/components/layout/PageTransition.jsx` — AnimatePresence wrapper
- [ ] **2.4** Create `src/components/layout/SEOHead.jsx` — react-helmet-async wrapper
- [ ] **2.5** Install `react-helmet-async`; wrap App in `<HelmetProvider>`
- [ ] **2.6** Create `src/pages/HomePage/index.jsx` — page assembly
- [ ] **2.7** Create `src/pages/HomePage/HeroSection.jsx` — 3D hero + name + tagline
- [ ] **2.8** Create `src/pages/HomePage/AboutSection.jsx` — photo + short bio
- [ ] **2.9** Create `src/pages/HomePage/CapabilitiesSection.jsx` — 4-6 capability cards
- [ ] **2.10** Create `src/pages/HomePage/SelectedWorkSection.jsx` — 2-3 featured projects
- [ ] **2.11** Create `src/pages/HomePage/ProofSection.jsx` — key achievements/certifications
- [ ] **2.12** Create `src/pages/HomePage/JourneyPreviewSection.jsx` — 3-4 milestone preview
- [ ] **2.13** Create `src/pages/HomePage/CurrentlyBuildingSection.jsx` — current focus
- [ ] **2.14** Create `src/pages/HomePage/PathSelectorSection.jsx` — Freelancer / Developer choice
- [ ] **2.15** Create `src/components/shared/SectionHeading.jsx` — consistent section titles
- [ ] **2.16** Create `src/components/shared/ProjectCard.jsx` — reusable project preview
- [ ] **2.17** Create `src/components/shared/PathSelector.jsx` — reusable path choice UI
- [ ] **2.18** Implement scroll-triggered section reveals (Framer Motion)
- [ ] **2.19** Implement page transitions between routes
- [ ] **2.20** Update Tailwind config with design system tokens
- [ ] **2.21** Update global CSS with design system colors, typography, spacing
- [ ] **2.22** Set up routes for new architecture in App.jsx (preserve old routes temporarily)
- [ ] **2.23** Implement Lenis smooth scroll on homepage
- [ ] **2.24** Responsive testing: mobile, tablet, desktop
- [ ] **2.25** Verify: complete homepage renders with all sections, navigation works

**Dependencies**: Phase 1 complete  
**Files affected**: New page/component files + App.jsx + CSS + Tailwind config  
**Acceptance criteria**:
- Homepage follows approved storyline (8 sections)
- Navigation is monochrome, premium, scroll-aware
- Page transitions work between routes
- All sections use data from `src/data/`
- SEO head renders per-route meta
- Responsive at all breakpoints
- No horizontal overflow
- Footer present

---

## Phase 3: Freelancer Path

**Objective**: Build the complete freelancer deep-dive experience.

### Tasks

- [ ] **3.1** Create `src/pages/FreelancerPage/index.jsx` — page assembly
- [ ] **3.2** Create `FreelancerHero.jsx` — client-facing positioning
- [ ] **3.3** Create `ServicesSection.jsx` — service cards with expand
- [ ] **3.4** Create `ClientProblemsSection.jsx` — problem statements
- [ ] **3.5** Create `FreelanceWorkSection.jsx` — freelancer-relevant projects
- [ ] **3.6** Create `ProcessSection.jsx` — how Shivansh works
- [ ] **3.7** Create `WhyWorkWithMeSection.jsx` — differentiators
- [ ] **3.8** Create `FAQSection.jsx` — common questions
- [ ] **3.9** Create `ProjectInquirySection.jsx` — project inquiry form (Web3Forms)
- [ ] **3.10** Create `src/pages/CaseStudyPage/index.jsx` — shared case study renderer
- [ ] **3.11** Wire `/freelancer/projects/:slug` route
- [ ] **3.12** Populate `src/data/services.js` with actual offerings
- [ ] **3.13** Add freelancer case study content to relevant projects
- [ ] **3.14** Responsive testing
- [ ] **3.15** Verify: freelancer path is fully navigable, case studies render

**Dependencies**: Phase 2 complete  
**Files affected**: New page files + data updates + App.jsx routes  
**Acceptance criteria**:
- Freelancer page follows approved storyline (10 sections)
- Services displayed with client language
- Projects filtered by `freelancerRelevant`
- Case study pages render at `/freelancer/projects/:slug`
- Inquiry form works (Web3Forms)
- Consistent with design system
- Deep-linkable

---

## Phase 4: Developer Path & Signature Timeline

**Objective**: Build the complete developer deep-dive, including the signature interactive timeline.

### Tasks

- [ ] **4.1** Create `src/pages/DeveloperPage/index.jsx` — page assembly
- [ ] **4.2** Create `DeveloperHero.jsx` — engineering positioning
- [ ] **4.3** Create `EngineeringProfileSection.jsx`
- [ ] **4.4** Create `TechStackSection.jsx` — skill categories from data
- [ ] **4.5** Create `ProjectsSection.jsx` — developer-relevant projects
- [ ] **4.6** Create `ArchitectureSection.jsx` — selected architecture deep-dives
- [ ] **4.7** Create `HowIThinkSection.jsx` — engineering philosophy
- [ ] **4.8** Create `JourneySection.jsx` — signature timeline (in-page preview + link)
- [ ] **4.9** Create `EducationSection.jsx`
- [ ] **4.10** Create `ExperienceSection.jsx`
- [ ] **4.11** Create `CertificationsPreview.jsx` — preview + link to full page
- [ ] **4.12** Create `AchievementsSection.jsx`
- [ ] **4.13** Create `ResumeSection.jsx` — download CTA + links
- [ ] **4.14** Create `src/pages/JourneyPage/index.jsx` — full interactive timeline
- [ ] **4.15** Implement signature timeline: spatial/horizontal on desktop
- [ ] **4.16** Implement timeline: vertical scroll-driven on mobile
- [ ] **4.17** Implement milestone expansion + connected animation
- [ ] **4.18** Create `src/pages/CertificationsPage/index.jsx` — full certification collection
- [ ] **4.19** Create `src/components/shared/CertificateCard.jsx` — premium card + lightbox
- [ ] **4.20** Create `src/components/shared/TimelineMilestone.jsx` — reusable milestone
- [ ] **4.21** Wire `/developer/projects/:slug` route (reuses CaseStudyPage)
- [ ] **4.22** Wire `/developer/journey` route
- [ ] **4.23** Wire `/developer/certifications` route
- [ ] **4.24** Add developer case study content to relevant projects
- [ ] **4.25** Responsive testing
- [ ] **4.26** Verify: developer path is fully navigable, timeline works, certs work

**Dependencies**: Phase 2 complete (can run parallel to Phase 3)  
**Files affected**: New page files + data updates + App.jsx routes  
**Acceptance criteria**:
- Developer page follows approved storyline (14 sections)
- Signature timeline is visually distinctive, NOT a conventional resume timeline
- Timeline is spatial/horizontal on desktop, vertical on mobile
- Milestones expand with animation
- Certifications use premium cards with lightbox
- Developer projects filtered by `developerRelevant`
- Case study pages render at `/developer/projects/:slug`
- GitHub and resume links work
- Deep-linkable

---

## Phase 5: Polish & Production

**Objective**: SEO, accessibility, performance, cross-browser testing, final responsive verification.

### Tasks

- [ ] **5.1** Add SEOHead to all routes with unique title/description
- [ ] **5.2** Add Open Graph tags per route
- [ ] **5.3** Add Twitter Card tags
- [ ] **5.4** Add JSON-LD Person schema to homepage
- [ ] **5.5** Create `public/sitemap.xml`
- [ ] **5.6** Create `public/robots.txt`
- [ ] **5.7** Generate `public/og-image.jpg` social preview
- [ ] **5.8** Add skip-to-content link
- [ ] **5.9** Add aria-labels to navigation, hamburger, interactive elements
- [ ] **5.10** Add proper labels to all form controls
- [ ] **5.11** Implement meaningful alt text for all images
- [ ] **5.12** Add visible focus states (keyboard navigation indicators)
- [ ] **5.13** Verify `prefers-reduced-motion` works across all animations
- [ ] **5.14** Add touch equivalents for hover interactions
- [ ] **5.15** Color contrast audit (WCAG AA)
- [ ] **5.16** Lighthouse performance audit — target 80+ with 3D
- [ ] **5.17** Lighthouse accessibility audit — target 95+
- [ ] **5.18** Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] **5.19** Final responsive testing: 375px, 768px, 1024px, 1440px
- [ ] **5.20** Verify all deep links work
- [ ] **5.21** Verify browser back/forward behavior
- [ ] **5.22** Remove old page components (replaced by new architecture)
- [ ] **5.23** Final build test: `npm run build` succeeds
- [ ] **5.24** Deploy to Vercel preview
- [ ] **5.25** Production verification

**Dependencies**: Phases 3 and 4 complete  
**Files affected**: All pages, SEOHead, public/ files  
**Acceptance criteria**:
- All acceptance tests from Phases 0-4 still pass
- Lighthouse scores meet targets
- Accessibility audit passes
- All routes have proper SEO meta
- No console errors in production build
- Deep links work for all routes
- Mobile layouts verified
- 3D degrades gracefully on all platforms

---

## Status Legend

| Symbol | Meaning |
|---|---|
| `[ ]` | Not started |
| `[~]` | In progress |
| `[x]` | Completed and verified |
| `[!]` | Blocked |
