# 06 — Dependencies, Build System & Deployment Audit

> **Audit Date:** October 26, 2026  
> **Source Files Inspected:** `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `public/_redirects`, `vercel.json`  
> **Verification Commands Executed:** `npm run build`, `npm run lint`

---

## 1. Complete Dependency Manifest Audit

The repository lists **25 production dependencies** and **15 development dependencies** in `package.json`:

### 1.1 Production Dependencies (`dependencies`)

| Package Name | Detected Version | Purpose | Where Used in Codebase | Actual Usage Verified? | Compatibility & Maintenance Concerns |
|---|---|---|---|---|---|
| `react` | `^18.3.1` | Core UI library | Everywhere in `src/` | **YES** | Stable React 18 LTS release. |
| `react-dom` | `^18.3.1` | DOM renderer for React | `src/main.jsx:2` | **YES** | Matches `react` version. |
| `react-router-dom` | `^7.8.2` | Client-side SPA routing | `App.jsx`, `main.jsx`, `Navigation.jsx` | **YES** | React Router v7. Compatible and actively maintained. |
| `create-react-router` | `^7.8.2` | React Router CLI utility | Not imported in source | **NO (Redundant)** | Dev utility accidentally installed as production dependency. |
| `@react-three/fiber` | `^8.18.0` | React Three.js reconciler | `src/components/3d/*` | **YES** | Requires React 18. Pinned to v8 for R18 compatibility. |
| `@react-three/drei` | `^9.122.0` | React Three.js utilities | `src/components/3d/*` | **YES** | Compatible with R3F v8. |
| `three` | `^0.186.1` | WebGL 3D graphics engine | `src/components/3d/*`, `globe.jsx` | **YES** | Produces a 1,027 kB vendor chunk. |
| `framer-motion` | `^12.23.12` | UI animation & layout transitions | Layouts, Nav, Hero, Modals | **YES** | High-performance, actively maintained. |
| `gsap` | `^3.15.0` | Animation timeline engine | `TypographicMarquee.jsx` | **YES** | Overkill for a single marquee ticker component. |
| `animejs` | `^4.5.0` | Micro-animation library | `SignalText.jsx` | **YES** | v4 is a complete rewrite; uses named exports (`animate`). |
| `lenis` | `^1.3.10` | Smooth inertia scrolling | `src/App.jsx:4, 30` | **YES** | Replaces heavier scrolling libraries cleanly. |
| `locomotive-scroll` | `^5.0.1` | Alternative smooth scrolling | Not imported in source | **NO (Redundant)** | Redundant with Lenis; adds dead dependency weight. |
| `lucide-react` | `^0.542.0` | Modern SVG icon library | Navigation, Footer, Cards | **YES** | Tree-shakeable, clean SVG icons. |
| `react-icons` | `^5.5.0` | Brand icon sets (Si/Fa/Bs) | `skills.js`, `Footer.jsx` | **YES** | Provides LeetCode, Codeforces, Spring logos. |
| `react-icon-cloud` | `^4.1.7` | 3D interactive icon cloud | `src/components/ui/icon-cloud.jsx` | **YES** | Renders live canvas icon sphere. |
| `next-themes` | `^0.4.6` | Dark/light theme manager | `main.jsx`, `Navigation.jsx` | **YES** | Works smoothly with Tailwind `class` mode. |
| `react-helmet-async` | `^3.0.0` | Head tag & SEO management | `main.jsx`, `SEOHead.jsx` | **YES** | Memory-safe async head management. |
| `prismjs` | `^1.30.0` | Code syntax highlighter | `src/assets/css/tomorrow.css` | **YES** | Used for displaying Java / JSON snippets. |
| `clsx` | `^2.1.1` | Class name constructor | `src/lib/utils.js:1` | **YES** | Core utility for shadcn components. |
| `tailwind-merge` | `^3.3.1` | Resolves conflicting Tailwind classes | `src/lib/utils.js:1` | **YES** | Core utility for shadcn components. |
| `class-variance-authority`| `^0.7.1` | Component style variants | `src/components/ui/button.jsx` | **YES** | Standard shadcn primitive. |
| `@radix-ui/react-slot` | `^1.2.3` | Polymorphic component primitive | `src/components/ui/button.jsx` | **YES** | Standard shadcn primitive. |
| `@radix-ui/react-tooltip`| `^1.2.8` | Tooltip primitive | `src/components/ui/tooltip.jsx` | **YES** | Standard shadcn primitive. |
| `tailwindcss-animate` | `^1.0.7` | Animation plugin for Tailwind | `tailwind.config.js:74` | **YES** | Standard shadcn animation utilities. |
| `@tailwindcss/postcss` | `^4.3.3` | Tailwind v4 PostCSS adapter | Not actively used (Tailwind v3 active) | **NO (Conflict Risk)**| Accidentally installed; conflicts with Tailwind v3 setup. |
| `sass` | `^1.106.1` | Dart Sass preprocessor | `src/styles/editorial.scss` | **YES** | Compiles SCSS stylesheets on the fly in Vite. |

---

## 2. Build Scripts & Diagnostic Validation

### 2.1 Build Execution [VERIFIED BY TEST: `npm run build`]
- **Command:** `vite build`
- **Exit Status:** `Code 0` (SUCCESSFUL)
- **Duration:** 19.50 seconds
- **Modules Transformed:** 2,807 modules
- **Output Artifacts:**
  - `dist/index.html` (0.89 kB / gzip: 0.47 kB)
  - `dist/assets/index-Cz7n05Rx.css` (84.16 kB / gzip: 14.50 kB)
  - `dist/assets/framer-motion-DwgkqIu4.js` (123.44 kB / gzip: 41.13 kB)
  - `dist/assets/react-vendor-BhQicbfA.js` (173.94 kB / gzip: 57.35 kB)
  - `dist/assets/index-CD4guHFZ.js` (**898.60 kB** / gzip: 172.53 kB)
  - `dist/assets/three-vendor-DS72XTNa.js` (**1,027.00 kB** / gzip: 283.10 kB)
- **Compiler Warnings:** Rollup emitted chunk size warnings for chunks exceeding 800 kB (`index-CD4guHFZ.js` and `three-vendor-DS72XTNa.js`).

### 2.2 Lint Execution [VERIFIED BY TEST: `npm run lint`]
- **Command:** `eslint .`
- **Exit Status:** `Code 1` (**FAILED with 7 errors, 0 warnings**)
- **Root Cause:** Flat ESLint 9 configuration (`eslint.config.js`) only injects browser globals and does not define Node.js globals for build/script files.
- **Failures Identified:**
  1. `fix-eslint.js:1:12`: `'require' is not defined (no-undef)`
  2. `fix-eslint.js:2:14`: `'require' is not defined (no-undef)`
  3. `scripts/inspect-glb.js:11:5`: `'process' is not defined (no-undef)`
  4. `scripts/inspect-glb.js:21:5`: `'process' is not defined (no-undef)`
  5. `tailwind.config.js:2:1`: `'module' is not defined (no-undef)`
  6. `tailwind.config.js:74:13`: `'require' is not defined (no-undef)`
  7. `vite.config.js:9:25`: `'__dirname' is not defined (no-undef)`

### 2.3 Automated Test Suite [VERIFIED FROM SOURCE]
- **Status:** **NON-EXISTENT**.
- No test script is defined in `package.json`.
- Zero unit, integration, or E2E test files (`*.test.jsx`, `*.spec.js`, Vitest/Jest configs) exist in the repository.

---

## 3. Hosting & Deployment Configuration

### 3.1 Active Hosting Platform: Netlify [VERIFIED IN BROWSER]
- **Production URL:** `https://shivansh-mishra.netlify.app/`
- **Routing Configuration:** Configured via `public/_redirects`:
  ```
  /*    /index.html   200
  ```
  Ensures client-side React Router handles deep link requests (e.g., `/developer`, `/freelancer`, `/journey`) without 404ing on page reload.
- **Publish Directory:** `dist`
- **Build Command:** `npm run build`

### 3.2 Secondary Hosting Configuration: Vercel [VERIFIED FROM SOURCE]
- **Configuration File:** `vercel.json`:
  ```json
  {
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
  Allows dual-deployment or seamless migration to Vercel without URL breakage.

### 3.3 Environment Variables [VERIFIED FROM SOURCE: `.env`]
The application references only client-prefixed environment variables:
- `VITE_WEB3FORMS_ACCESS_KEY`: Public access key for the Web3Forms contact submission API endpoint.
- **Security Check:** `.env` is listed in `.gitignore:17`. No secret backend API keys or database credentials are leaked in the client bundle.
