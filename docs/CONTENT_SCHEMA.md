# Content Schema

> Version: 1.0  
> Last Updated: 2026-10-01  
> Status: Approved

---

## Overview

All portfolio content is centralized in `src/data/`. Each file exports structured data that components consume. No content is hardcoded in JSX.

---

## Profile (`src/data/profile.js`)

```js
export const profile = {
  name: "Shivansh Mishra",                          // Required
  tagline: "Software Developer · Full-Stack Developer · Freelancer", // Required
  email: "shivansh54mishra@gmail.com",              // Required
  phone: "+91 9820689183",                          // Required
  location: "Mumbai, Maharashtra, India",           // Required
  photo: "/hero.jpg",                               // Required — path to profile image
  resume: "/resume.pdf",                            // Required — path to resume
  currentFocus: "",                                 // Optional — "Currently building..." text
  bio: {
    short: "",                                      // Required — 1-2 sentences for homepage
    full: "",                                       // Required — full about text
  },
  social: {
    github: "https://github.com/shivanshmishra54",
    linkedin: "https://www.linkedin.com/in/shivansh-mishra54",
    leetcode: "https://leetcode.com/u/shivanshmishra54/",
    twitter: "",                                    // Optional
    email: "mailto:shivansh54mishra@gmail.com",
  },
  seo: {
    title: "Shivansh Mishra | Software Developer & Freelancer",
    description: "Portfolio of Shivansh Mishra...",
    ogImage: "/og-image.jpg",
  },
};
```

---

## Skills (`src/data/skills.js`)

```js
export const skills = [
  {
    id: "backend",                     // Required — unique identifier
    category: "Backend & Java Stack",  // Required
    icon: "Terminal",                   // Required — Lucide icon name
    color: "text-red-400",             // Optional — category accent (used in dev path)
    items: [
      {
        name: "Java",                  // Required
        icon: "FaJava",               // Required — react-icons component name
        iconColor: "#ED8B00",          // Required — brand color
        proficiency: "advanced",       // Optional — beginner | intermediate | advanced | expert
      },
      // ... more items
    ],
  },
  // ... more categories
];
```

---

## Services (`src/data/services.js`)

Freelancer-specific. Describes what Shivansh offers to clients.

```js
export const services = [
  {
    id: "fullstack-web",                // Required
    title: "Full-Stack Web Development", // Required
    description: "",                    // Required — client-facing description
    features: [],                       // Optional — list of included capabilities
    technologies: [],                   // Optional — relevant tech
    icon: "Code2",                      // Required — Lucide icon name
  },
  // ... more services
];
```

---

## Projects (`src/data/projects.js`)

Single source of truth. Each project may appear on homepage, freelancer path, and/or developer path.

```js
export const projects = [
  {
    // Identity
    id: "shorturl",                     // Required — unique identifier
    slug: "shorturl",                   // Required — URL-safe slug
    title: "ShortUrl",                  // Required
    subtitle: "Distributed URL Shortening Platform", // Required

    // Classification
    category: "backend",               // Required — backend | fullstack | frontend
    featured: true,                    // Required — appears on homepage
    freelancerRelevant: false,         // Required — appears on freelancer path
    developerRelevant: true,           // Required — appears on developer path

    // Content
    description: "",                   // Required — 1-2 sentence summary
    problem: "",                       // Optional — what problem does this solve
    solution: "",                      // Optional — how was it solved
    challenges: [],                    // Optional — engineering challenges
    result: "",                        // Optional — outcome or current status
    role: "",                          // Required — "Lead Developer", "Full-Stack", etc.

    // Technical
    technologies: [],                  // Required — array of tech names
    features: [],                      // Optional — key features
    architecture: "",                  // Optional — architecture description (dev path)

    // Links
    github: "",                        // Optional — GitHub repo URL
    liveDemo: "",                      // Optional — live deployment URL
    image: "",                         // Required — preview image URL

    // Case Study
    caseStudy: {                       // Optional — deep-dive content
      freelancer: {                    // Shown inline on /freelancer
        clientProblem: "",
        approach: "",
        outcome: "",
        testimonial: null,            // Only if real
      },
      developer: {                    // Shown inline on /developer
        systemDesign: "",
        architectureDiagram: "",
        performanceMetrics: "",
        lessonsLearned: "",
      },
    },
  },
  // ... more projects
];

// Helper functions
export function getFeaturedProjects() { ... }
export function getFreelancerProjects() { ... }
export function getDeveloperProjects() { ... }
export function getProjectBySlug(slug) { ... }
```

### How Project Metadata Controls Appearance

| Field | Homepage | Freelancer Path | Developer Path |
|---|---|---|---|
| `featured: true` | ✅ Shown | — | — |
| `freelancerRelevant: true` | — | ✅ Shown | — |
| `developerRelevant: true` | — | — | ✅ Shown |
| `caseStudy.freelancer` | — | Deep-dive page | — |
| `caseStudy.developer` | — | — | Deep-dive page |

A project can be `featured`, `freelancerRelevant`, AND `developerRelevant` simultaneously.

---

## Experience (`src/data/experience.js`)

```js
export const experience = [
  {
    id: "skillcraft",                   // Required
    title: "Web Development Intern",    // Required
    company: "SkillCraft Technology",   // Required
    period: "Aug 2025 - Sept 2025",    // Required
    description: "",                    // Required
    icon: "Code2",                      // Required — Lucide icon name
    type: "work",                       // Required — work | hackathon | competition
    highlights: [],                     // Optional — key achievements
    technologies: [],                   // Optional — relevant tech
  },
  // ... more entries
];
```

---

## Education (`src/data/education.js`)

```js
export const education = [
  {
    id: "kjsomaiya",                    // Required
    degree: "B.Tech in Information Technology", // Required
    institution: "K.J. Somaiya Institute of Technology, Sion", // Required
    period: "2024 - 2028 (Expected May 2028)", // Required
    description: "",                    // Required
    achievements: ["CGPA: 8.72"],      // Required — array
    skills: ["Java", "Data Structures", "Spring Boot", "React.js", "DBMS"], // Optional
    logo: null,                        // Optional — institution logo path
  },
  // ... more entries
];
```

---

## Certificates (`src/data/certificates.js`)

```js
export const certificates = [
  {
    id: "oracle-agentic-ai",           // Required
    title: "Oracle Certified Foundations Associate – Agentic AI", // Required
    issuer: "Oracle University (Oracle Corporation)", // Required
    date: "July 24, 2026",            // Required
    category: "Oracle AI & Cloud",     // Required
    description: "",                    // Required
    image: "/certificates/oracle_agentic_ai.png", // Required — optimized WebP
    pdfUrl: "https://...",             // Required — verification link
    color: "#F80000",                  // Optional — issuer brand color (for accent if needed)
    skills: ["Agentic AI", "Oracle Certified", "Autonomous Agents", "LLM Workflows"], // Optional
  },
  // ... more entries
];
```

---

## Achievements (`src/data/achievements.js`)

```js
export const achievements = [
  {
    id: "leetcode-200",                // Required
    title: "202+ LeetCode Solved",     // Required
    description: "",                    // Optional
    icon: "SiLeetcode",               // Required
    link: "https://leetcode.com/u/shivanshmishra54/", // Optional
    category: "competitive",           // Optional — competitive | hackathon | academic
  },
  // ... more entries
];
```

---

## Navigation (`src/data/navigation.js`)

```js
export const mainNavigation = [
  { id: "home", label: "Home", path: "/", icon: "Home" },
  { id: "freelancer", label: "Freelancer", path: "/freelancer", icon: "Briefcase" },
  { id: "developer", label: "Developer", path: "/developer", icon: "Code2" },
  { id: "contact", label: "Contact", path: "/contact", icon: "Mail" },
];

export const developerNavigation = [
  { id: "projects", label: "Projects", path: "/developer#projects" },
  { id: "journey", label: "Journey", path: "/developer/journey" },
  { id: "certifications", label: "Certifications", path: "/developer/certifications" },
];

export const freelancerNavigation = [
  { id: "services", label: "Services", path: "/freelancer#services" },
  { id: "work", label: "Work", path: "/freelancer#work" },
  { id: "inquiry", label: "Start a Project", path: "/freelancer#inquiry" },
];
```

---

## Journey (`src/data/journey.js`)

Combined timeline for the signature interactive journey. Merges education, experience, and achievements chronologically.

```js
export const journey = [
  {
    id: "milestone-1",                // Required
    year: "2022",                     // Required
    title: "Class X (SSC)",          // Required
    subtitle: "Patil Bal Mandir School", // Required
    type: "education",               // Required — education | work | hackathon | achievement
    description: "",                  // Required
    highlights: [],                   // Optional
    icon: "GraduationCap",          // Optional
  },
  // ... more milestones, chronologically ordered
];
```

---

## Data Integrity Rules

1. **No fabricated content** — only extract from existing JSX or real information
2. **No duplicate data** — project data lives in one place, presented differently per path
3. **Required fields must be populated** — optional fields can be empty/null
4. **Images reference `public/` paths** — not `src/assets/`
5. **Links must be real** — no placeholder URLs
6. **Dates must be accurate** — extracted from existing content
