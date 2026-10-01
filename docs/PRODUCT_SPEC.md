# Product Specification

> Version: 1.0  
> Last Updated: 2026-10-01  
> Status: Approved — Implementation Phase Pending

---

## Product Vision

A premium, monochrome, 3D-enhanced portfolio website that presents Shivansh Mishra as one personal brand serving two professional audiences: **freelance clients** and **software engineering recruiters/peers**.

The website replaces the conventional developer portfolio with a cinematic, data-driven experience built on progressive disclosure.

---

## Personal Brand Objective

Communicate technical depth, professional maturity, and creative quality through:

- A curated overview (homepage)
- A client-facing services experience (freelancer path)
- An engineering-focused depth experience (developer path)
- A signature interactive journey (timeline)
- A premium 3D visual identity

---

## Target Users

### Primary: Recruiters & Hiring Managers

**Goal**: Evaluate Shivansh's technical capabilities, experience, projects, and credentials.

**Success metric**: Within ~30 seconds, a recruiter can identify:

- Who Shivansh is
- Target role
- Core technology stack
- Strongest projects
- Resume download
- GitHub / LinkedIn
- Contact method

### Primary: Freelance Clients

**Goal**: Understand what Shivansh can build, assess relevant work, and initiate a project.

**Success metric**: Within ~30 seconds, a client can identify:

- What Shivansh builds
- Problems he solves
- Relevant projects
- How he works
- How to start a project

### Secondary: Engineering Peers

**Goal**: Explore technical projects, architecture decisions, and engineering thinking.

---

## Homepage Purpose

The homepage (`/`) is the **universal overview**.

It answers:

1. Who is Shivansh?
2. What does he build?
3. What can he do?
4. What has he built?
5. What is his journey?
6. Why should I continue?

Then it presents the choice:

> "How would you like to work with me?"
>
> → Explore as a Freelancer  
> → Explore as a Software Developer

### Homepage Principle

**HOMEPAGE = OVERVIEW**

The homepage creates curiosity and trust. It does NOT dump the complete education list, certification catalogue, project index, or full technical stack.

### Homepage Storyline

```
3D HERO INTRODUCTION
    ↓
SHORT ABOUT (Who is Shivansh?)
    ↓
CAPABILITIES (What can he do?)
    ↓
SELECTED WORK (What has he built?)
    ↓
PROOF / CREDIBILITY (Why trust him?)
    ↓
JOURNEY PREVIEW (What is his path?)
    ↓
CURRENTLY BUILDING (What's happening now?)
    ↓
CHOOSE YOUR PATH (Freelancer / Developer)
```

---

## Freelancer Journey

**PATH = DEPTH**

The freelancer path (`/freelancer`) speaks client language and focuses on business outcomes.

### Storyline

```
FREELANCER HERO
    ↓
SERVICES (What can I build?)
    ↓
CLIENT PROBLEMS (Who can I help?)
    ↓
SELECTED FREELANCE WORK (What have I built?)
    ↓
DEEP CASE STUDIES (Show me the details)
    ↓
PROCESS (How do I work?)
    ↓
WHY WORK WITH ME (Differentiators)
    ↓
FAQ
    ↓
PROJECT INQUIRY (Start a project)
    ↓
FINAL CTA
```

Technical detail exists but only at the depth useful to clients.

---

## Developer Journey

**PATH = DEPTH**

The developer path (`/developer`) speaks engineering language and prioritizes technical depth.

### Storyline

```
DEVELOPER HERO
    ↓
ENGINEERING PROFILE (Who am I as an engineer?)
    ↓
TECHNICAL STACK (What technologies?)
    ↓
ENGINEERING PROJECTS (What have I built?)
    ↓
ARCHITECTURE / CASE STUDIES (How do I build?)
    ↓
HOW I THINK (Engineering philosophy)
    ↓
SIGNATURE JOURNEY (Interactive timeline)
    ↓
EDUCATION
    ↓
EXPERIENCE
    ↓
CERTIFICATIONS
    ↓
ACHIEVEMENTS
    ↓
GITHUB
    ↓
RESUME
    ↓
CONTACT
```

---

## Path Selection

The path selector appears after the visitor has experienced the overview.

The visitor is never forced to choose immediately.

Both paths share the same underlying data layer but present it through different lenses.

---

## Required Capabilities

### 3D Experience

- Personal 3D avatar integration architecture (future GLB/GLTF)
- Procedural placeholder during development
- Mouse/scroll interaction
- Responsive quality scaling
- WebGL fallback
- Reduced-motion support

### Signature Timeline

- NOT a conventional resume timeline
- Spatial/horizontal/cinematic on desktop
- Vertical scroll-driven on mobile
- Each milestone expands to reveal details
- Connected animations between milestones
- Optional subtle 3D/camera response

### Certifications

- Premium interactive cards
- Real certificate assets (optimized, lazy-loaded)
- Click-to-expand immersive viewer
- Verification links

### Projects

- Data-driven from `src/data/projects.js`
- Same data, different presentation per path
- Homepage: small visual preview
- Freelancer: business/problem-oriented case study
- Developer: technical/architecture-oriented case study

### Case Studies

- Deep-dive pages for selected projects
- Problem → Solution → Architecture → Result flow
- Route: `/freelancer/projects/:slug` or `/developer/projects/:slug`

### Contact Experience

- Retained Web3Forms integration
- API key in environment variable
- Validation, loading, success, error, retry states
- Accessible labels and feedback

---

## Theme System

- **Default**: White (light mode)
- **Optional**: Dark mode
- **Palette**: Monochrome only
- **No bright accent colors**
- Consistent across all pages and paths

---

## Mobile Experience

- Full functionality at all viewports
- 3D quality reduced on mobile (not removed unless necessary)
- Touch equivalents for all hover interactions
- No viewport-specific hacks
- Proper CSS breakpoints only
- Fixed mobile overflow issues from existing codebase
