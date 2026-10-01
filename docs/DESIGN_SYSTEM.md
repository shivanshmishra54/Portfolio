# Design System

> Version: 1.0  
> Last Updated: 2026-10-01  
> Status: Approved

---

## Visual Identity

**Premium · Editorial · Minimal · Technical · Futuristic · Sophisticated**

The design communicates restraint, precision, and quiet confidence. It avoids visual loudness. Every element earns its place through function and hierarchy.

---

## Color System

### Light Mode (Default)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | Page background |
| `--bg-secondary` | `#FAFAFA` | Section alternation |
| `--bg-elevated` | `#F5F5F5` | Cards, elevated surfaces |
| `--bg-inverse` | `#0A0A0A` | Hero, dark sections |
| `--text-primary` | `#0A0A0A` | Headlines, body |
| `--text-secondary` | `#525252` | Descriptions, captions |
| `--text-tertiary` | `#A3A3A3` | Metadata, subtle labels |
| `--text-inverse` | `#FAFAFA` | Text on dark backgrounds |
| `--border-default` | `#E5E5E5` | Card borders, dividers |
| `--border-subtle` | `#F0F0F0` | Subtle separators |
| `--border-strong` | `#D4D4D4` | Emphasized borders |

### Dark Mode (Optional)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0A0A0A` | Page background |
| `--bg-secondary` | `#141414` | Section alternation |
| `--bg-elevated` | `#1A1A1A` | Cards, elevated surfaces |
| `--bg-inverse` | `#FAFAFA` | Inverted sections |
| `--text-primary` | `#FAFAFA` | Headlines, body |
| `--text-secondary` | `#A3A3A3` | Descriptions, captions |
| `--text-tertiary` | `#525252` | Metadata, subtle labels |
| `--text-inverse` | `#0A0A0A` | Text on light backgrounds |
| `--border-default` | `#262626` | Card borders, dividers |
| `--border-subtle` | `#1A1A1A` | Subtle separators |
| `--border-strong` | `#404040` | Emphasized borders |

### Prohibited Colors

- No bright blues, teals, purples, or any saturated accent color
- No neon
- No rainbow gradients
- Only monochrome: white, black, gray spectrum
- Gradients: subtle black-to-dark-gray or white-to-light-gray only

---

## Typography

### Font Strategy

| Usage | Font | Fallback |
|---|---|---|
| Headlines | Inter | system-ui, sans-serif |
| Body | Inter | system-ui, sans-serif |
| Code | JetBrains Mono | monospace |

Load via Google Fonts with `display=swap`.

### Type Scale

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Usage |
|---|---|---|---|---|---|
| Display | 72px / 4.5rem | 40px / 2.5rem | 700 | 1.1 | Hero headline |
| H1 | 48px / 3rem | 32px / 2rem | 700 | 1.2 | Page titles |
| H2 | 36px / 2.25rem | 24px / 1.5rem | 600 | 1.25 | Section titles |
| H3 | 24px / 1.5rem | 20px / 1.25rem | 600 | 1.3 | Card titles |
| H4 | 20px / 1.25rem | 18px / 1.125rem | 500 | 1.4 | Subsection |
| Body Large | 18px / 1.125rem | 16px / 1rem | 400 | 1.6 | Section intros |
| Body | 16px / 1rem | 15px / 0.9375rem | 400 | 1.6 | Default text |
| Body Small | 14px / 0.875rem | 13px / 0.8125rem | 400 | 1.5 | Captions |
| Caption | 12px / 0.75rem | 12px / 0.75rem | 500 | 1.4 | Labels, metadata |
| Code | 14px / 0.875rem | 13px / 0.8125rem | 400 | 1.6 | Inline code |

---

## Spacing

Based on 4px grid. Use Tailwind spacing scale.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Inline element gaps |
| `space-2` | 8px | Tight element spacing |
| `space-3` | 12px | Internal card padding |
| `space-4` | 16px | Standard gap |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section internal spacing |
| `space-12` | 48px | Between section groups |
| `space-16` | 64px | Section vertical padding (mobile) |
| `space-24` | 96px | Section vertical padding (desktop) |
| `space-32` | 128px | Major section breaks |

---

## Grid / Container System

| Breakpoint | Container Max Width | Padding |
|---|---|---|
| Mobile (<640px) | 100% | 16px |
| Tablet (768px) | 720px | 24px |
| Desktop (1024px) | 960px | 32px |
| Large (1280px) | 1120px | 32px |
| XL (1440px+) | 1200px | 32px |

Use Tailwind `container` with `mx-auto` and responsive padding.

---

## Cards

### Standard Card

```
Background: var(--bg-elevated)
Border: 1px solid var(--border-default)
Border Radius: 12px
Padding: 24px
Shadow: none (default), subtle on hover
Transition: 300ms ease
```

### Hover State

```
Border: 1px solid var(--border-strong)
Transform: translateY(-2px)
Shadow: 0 4px 24px rgba(0, 0, 0, 0.06) [light]
        0 4px 24px rgba(0, 0, 0, 0.3) [dark]
```

### Active/Expanded State

```
Border: 1px solid var(--text-primary)
Additional content revealed with Framer Motion
```

---

## Buttons

### Primary

```
Background: var(--text-primary)     // black in light, white in dark
Text: var(--bg-primary)             // white in light, black in dark
Border Radius: 8px
Padding: 12px 24px
Font: 14px / 500
Hover: opacity 0.85
Transition: 200ms ease
```

### Secondary

```
Background: transparent
Text: var(--text-primary)
Border: 1px solid var(--border-strong)
Border Radius: 8px
Padding: 12px 24px
Font: 14px / 500
Hover: background var(--bg-elevated)
```

### Ghost

```
Background: transparent
Text: var(--text-secondary)
Padding: 8px 16px
Hover: text var(--text-primary)
```

---

## Borders

- Default: `1px solid var(--border-default)`
- Subtle: `1px solid var(--border-subtle)`
- Strong: `1px solid var(--border-strong)`
- Radius: 8px (small), 12px (cards), 16px (large cards), full (pills)

---

## Shadows

Shadows are used sparingly. The design relies on borders and spacing rather than shadow depth.

| Usage | Light Mode | Dark Mode |
|---|---|---|
| Default | none | none |
| Hover/Elevated | `0 4px 24px rgba(0,0,0,0.06)` | `0 4px 24px rgba(0,0,0,0.3)` |
| Modal/Overlay | `0 16px 48px rgba(0,0,0,0.12)` | `0 16px 48px rgba(0,0,0,0.5)` |

---

## Iconography

- Primary: Lucide React (already installed)
- Secondary: React Icons for brand logos (GitHub, LinkedIn, LeetCode, etc.)
- Size: 16px (inline), 20px (cards), 24px (features)
- Color: inherits text color

---

## Image Treatment

- Profile photo: natural, no color filter
- Project images: contained within cards, no excessive overlay effects
- Certificate images: contained, optimized WebP, lazy-loaded
- No decorative stock photos
- No color overlays or blend modes on portfolio images

---

## 3D Visual Language

- Monochrome materials (black, white, gray)
- Subtle ambient lighting — no harsh directional lights
- Minimal geometry — communicate form, not complexity
- No glow, bloom, or chromatic aberration unless serving narrative
- Camera movement: slow, intentional, scroll-driven
- Cursor interaction: subtle, not gimmicky

---

## Motion Language

### Principles

1. Motion communicates hierarchy, narrative, transition, or feedback
2. Motion is never decorative
3. Every animation has a reduced-motion alternative
4. Duration is proportional to change magnitude

### Durations

| Category | Duration | Easing |
|---|---|---|
| Micro (hover, press) | 150-200ms | ease-out |
| Small (fade, slide) | 250-350ms | ease-out |
| Medium (page transition) | 400-500ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Large (3D camera) | 600-1000ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Scroll-driven | continuous | linear (mapped to scroll) |

### Hover Behavior

- Cards: `translateY(-2px)` + border color change + subtle shadow
- Buttons: opacity change or background fill
- Links: underline or opacity
- 3D objects: NOT interactive on hover (mouse position only)

### Scroll Behavior

- Section reveals: fade-up with stagger (Framer Motion)
- Parallax: very subtle (max 10-20px offset)
- Timeline: scroll-driven milestone progression
- No scroll hijacking beyond Lenis smoothing

### Transition Behavior

- Page transitions: fade + subtle slide (200-400ms)
- Path switching: meaningful transition acknowledging context change
- Modal/overlay: fade backdrop + scale content

### Mobile Behavior

- Reduce motion distances (smaller translateY)
- Remove parallax
- Simplify 3D to static or very simple animation
- Touch: tap replaces hover

### Reduced Motion (`prefers-reduced-motion: reduce`)

- Disable all transform-based animations
- Use instant opacity transitions (100ms)
- Static 3D scene (no animation)
- No parallax

---

## Section-by-Section Experience Storyboard

### Homepage: 3D Hero

- **Purpose**: First impression. Establish identity.
- **Primary visual**: Full-viewport 3D scene with personal avatar placeholder. Name and tagline overlaid.
- **Content hierarchy**: Name → Subtitle → (scene communicates technical identity)
- **Layout**: Full bleed, centered content, 3D behind/around text
- **Interaction**: Mouse parallax on 3D scene (subtle). Scroll indicator at bottom.
- **Scroll behavior**: Scroll transitions to About section with scene fade
- **3D behavior**: Slow idle animation. Responds to mouse position (very subtle).
- **Motion**: Elements fade/slide in on load (staggered 200ms)
- **CTA**: None here. Let visitor absorb.
- **Desktop**: Full-screen scene, large typography
- **Mobile**: Reduced 3D, stacked text, touch-friendly
- **NOT shown here**: Full bio, full skills, projects

### Homepage: Short About

- **Purpose**: Quick context. Who is Shivansh?
- **Primary visual**: Profile photo + 2-3 sentences
- **Content hierarchy**: Photo → Name → Tagline → 2-sentence bio
- **Layout**: Two-column (photo | text) desktop, stacked mobile
- **Interaction**: None beyond scroll reveal
- **NOT shown here**: Full education, full experience, detailed bio

### Homepage: Capabilities

- **Purpose**: Quick signal of competence
- **Primary visual**: Minimal capability cards or list (4-6 items max)
- **Content hierarchy**: Capability title → brief description
- **Layout**: Grid or horizontal scroll
- **NOT shown here**: Full tech stack, skill percentages, logo walls

### Homepage: Selected Work

- **Purpose**: Show, don't tell. 2-3 featured projects only.
- **Primary visual**: Project card with image, title, one-line description
- **Layout**: Horizontal cards or stacked
- **CTA**: "View all projects" links to path-specific pages
- **NOT shown here**: Full project catalogue, case studies

### Homepage: Proof / Credibility

- **Purpose**: Build trust. Show real credentials.
- **Primary visual**: 2-3 key achievements/certifications as compact badges
- **NOT shown here**: Full certification list, detailed descriptions

### Homepage: Journey Preview

- **Purpose**: Tease the interactive timeline. Create curiosity.
- **Primary visual**: Compact 3-4 milestone preview
- **CTA**: "Explore full journey" → Developer path
- **NOT shown here**: Full timeline, all education/experience

### Homepage: Currently Building

- **Purpose**: Show momentum. Shivansh is active.
- **Content**: 1-2 sentences about current focus/project

### Homepage: Choose Your Path

- **Purpose**: Direct the visitor to the appropriate deep-dive
- **Primary visual**: Two large, equal cards
- **Content**: Freelancer card (client language) | Developer card (engineering language)
- **Interaction**: Hover reveals subtle preview. Click navigates.
- **3D behavior**: None or very subtle ambient response
- **CTA**: "Explore as Freelancer" / "Explore as Developer"

### Freelancer: Hero

- **Purpose**: Immediate client-facing positioning
- **Primary visual**: Clean headline: "I build [things] for [people]"
- **NOT shown here**: Technical details, resume info

### Freelancer: Services

- **Purpose**: What Shivansh offers
- **Layout**: Service cards with icon, title, brief description
- **Interaction**: Expand on click for more detail

### Developer: Hero

- **Purpose**: Engineering identity
- **Primary visual**: Clean headline: engineering positioning statement

### Developer: Signature Journey (Timeline)

- **Purpose**: One of the site's signature design elements
- **Desktop**: Spatial/horizontal/cinematic — each milestone is a chapter
- **Mobile**: Vertical scroll-driven journey
- **Interaction**: Select milestone → expand → reveal details → animate connections
- **Scroll behavior**: Scroll drives progression through milestones
- **3D behavior**: Optional subtle camera shift on milestone change
- **Motion**: Staggered reveals, connection lines draw, content expands
- **NOT done**: Conventional vertical resume timeline with dots and lines

### Developer: Certifications

- **Purpose**: Showcase real verified credentials
- **Normal state**: Minimal polished card (title, issuer, date)
- **Hover**: Subtle depth/lift
- **Click**: Immersive certificate viewer (lightbox with real image)
- **Each card**: Certification, issuer, date, topic, preview, verification link

### Contact

- **Purpose**: Convert visitor to connection
- **Layout**: Two-column (info | form) desktop, stacked mobile
- **Form states**: idle → validating → submitting → success | error
- **Accessibility**: Proper labels, ARIA feedback

---

## Prohibited Visual Patterns

| Pattern | Why Prohibited |
|---|---|
| Neon/cyberpunk colors | Conflicts with monochrome premium identity |
| Rainbow gradients | Visual noise, not editorial |
| Excessive glassmorphism | Overused, reduces readability |
| Giant skill-logo walls | Generic, visually noisy |
| Fake statistics/testimonials | Violates content integrity |
| Random 3D objects | Decoration without purpose |
| Excessive particles | Performance cost, visual noise |
| Spinning objects | Gimmicky, not narrative |
| Excessive scroll hijacking | Frustrates users |
| Animation for decoration | Violates motion principles |
| Generic portfolio templates | Not distinctive |
| Huge rounded card stacks | Generic visual pattern |
