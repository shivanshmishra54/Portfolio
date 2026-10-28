# 03 — Content Inventory, Digital Assets & Link Audit

> **Audit Date:** October 26, 2026  
> **Source Files Inspected:** `src/data/*.js`, `public/`, `src/components/layout/`  
> **Data Integrity Rule:** Never fabricate information. Single source of truth in `src/data/`.

---

## 1. Content Inventory & Section Copy

### 1.1 Personal Identity & Biography [VERIFIED FROM SOURCE: `src/data/profile.js`]
- **Full Name:** Shivansh Mishra
- **Tagline:** `Software Developer · Full-Stack Developer · Freelancer`
- **Location:** `Mumbai, Maharashtra, India`
- **Current Academic Focus:** `Pursuing 3rd Year B.Tech in Information Technology at K.J. Somaiya Institute of Technology, Sion. Maintaining an 8.72 CGPA.`
- **Short Bio:** `Software Engineer & Systems Builder · Java & Spring Boot Architect · Distributed Systems & React`
- **Full Bio:**
  > "I'm Shivansh Mishra, a Software Engineer and Systems Builder focused on architecting resilient, production-grade applications. Currently in my 3rd year of B.Tech in Information Technology at K.J. Somaiya Institute of Technology (CGPA: 8.72), I specialize in distributed microservices, low-latency architectures with Java & Spring Boot, event-driven streaming with Kafka & Redis, and reactive web applications with React. A core contributor to enterprise open-source software (Spring Boot Admin) and national hackathon semi-finalist (ET GenAI out of 55,000+ applicants), I thrive on taking end-to-end ownership to design and scale complex software systems."

### 1.2 "Currently Doing" Active Pursuits [VERIFIED FROM SOURCE: `src/data/profile.js:11-48`]
1. **Academic Degree:** B.Tech in Information Technology at K.J. Somaiya Institute of Technology (CGPA: 8.72, Expected Graduation: 2028).
2. **Active Project:** AI-Powered Resume Builder (Generative AI, ATS optimization scoring, automated layout generation via React & Spring Boot).
3. **Deep Dive Technical Study:** Learning Redis & Apache Kafka (distributed systems, low-latency in-memory caching, high-throughput event queues).
4. **Content Creation:** YouTube Tech Tutorials (`https://www.youtube.com/@ShivanshMishra54`).

---

## 2. Comprehensive Project Inventory

All project definitions live in `src/data/projects.js`. Each project is structured with dual presentation lenses (`freelancer` and `developer`):

### Project 1: ShortUrl [VERIFIED FROM SOURCE: `src/data/projects.js:1-56`]
- **Identifier / Slug:** `shorturl`
- **Category:** `backend`
- **GitHub Repository:** `https://github.com/shivanshmishra54/spring-boot-react-url-shortener`
- **Live Demo:** `null` (no public deployed instance linked)
- **Freelancer Lens:**
  - *Title:* ShortUrl — Distributed URL Shortening & Analytics Platform
  - *Summary:* Enterprise-grade high-throughput link compression and real-time click tracking infrastructure.
  - *Key Outcome:* Supported 56.8B+ unique URLs with sub-15ms p95 redirect latency.
- **Developer Lens:**
  - *Title:* ShortUrl — Distributed URL Shortener Microservices
  - *Technologies:* `Java 21`, `Spring Boot 3`, `Spring Cloud Eureka`, `Spring Cloud Gateway WebMVC`, `React 19`, `Tailwind CSS`, `JWT`, `Spring Data JPA`, `MySQL`
  - *Architecture:* Decoupled API Gateway WebMVC routing, Netflix Eureka dynamic service registration, Base-62 hashing engine, isolated redirect caching.
  - *Engineering Challenges:* Sub-15ms p95 throughput, collision prevention at 56.8B+ URLs, dynamic gateway filter token validation.

### Project 2: Track2Act [VERIFIED FROM SOURCE: `src/data/projects.js:57-111`]
- **Identifier / Slug:** `track2act`
- **Category:** `fullstack`
- **GitHub Repository:** `https://github.com/shivanshmishra54/track2act`
- **Live Demo:** `null`
- **Freelancer Lens:**
  - *Title:* Track2Act — AI-Powered Supply Chain & Fleet Logistics Ecosystem
  - *Summary:* Enterprise PaaS combining live map telemetry, 6-tier RBAC, and autonomous route exception intelligence.
- **Developer Lens:**
  - *Title:* Track2Act — AI Supply Chain & Logistics PaaS
  - *Technologies:* `React 18`, `Spring Boot 3`, `Java 21`, `Hugging Face AI (Mixtral-8x7B)`, `React Leaflet`, `MySQL`, `Tailwind CSS`, `shadcn/ui`, `JWT`
  - *Architecture:* Enterprise PaaS monolith with microservice-ready modularity, Hugging Face LLM inference pipelines, fine-grained Spring Security RBAC.
  - *Engineering Challenges:* GPS telemetry synchronization across mobile dispatchers, LLM latency guardrails with fallback states, 6-role permission trees.

### Project 3: Employee Management System [VERIFIED FROM SOURCE: `src/data/projects.js:112-165`]
- **Identifier / Slug:** `employee-management`
- **Category:** `fullstack`
- **GitHub Repository:** `https://github.com/shivanshmishra54/Employee-Management-System-using-React-and-Spring-Boot`
- **Live Demo:** `null`
- **Freelancer Lens:**
  - *Title:* Employee Management System — Full-Stack HR & Workforce Operations Platform
  - *Summary:* Centralized workforce administration platform with instant form validation and responsive data grids.
- **Developer Lens:**
  - *Title:* Employee Management System — Spring Boot & React CRUD Suite
  - *Technologies:* `Java 21`, `Spring Boot 3`, `React 18`, `MySQL`, `Hibernate ORM`, `RESTful APIs`, `Bootstrap 5`, `Maven`
  - *Architecture:* Layered Controller-Service-Repository pattern with Hibernate JPA entity binding and unified `@ControllerAdvice` error contracts.

### Project 4: Spring Boot Security Login System [VERIFIED FROM SOURCE: `src/data/projects.js:166-219`]
- **Identifier / Slug:** `spring-boot-login-system`
- **Category:** `backend`
- **GitHub Repository:** `https://github.com/shivanshmishra54/spring-boot-login-system`
- **Live Demo:** `null`
- **Freelancer Lens:**
  - *Title:* Spring Boot Security Login System — Enterprise Authentication & Access Control Engine
  - *Summary:* Hardened identity provider featuring async multi-threaded email OTP verification and time-limited token password resets.
- **Developer Lens:**
  - *Title:* Spring Boot Security Login & Access Management System
  - *Technologies:* `Java 21`, `Spring Boot 3`, `Spring Security 6`, `Spring Data JPA`, `MySQL`, `Thymeleaf`, `JavaMailSender`, `Maven`
  - *Architecture:* Spring Security 6 filter chains, custom UserDetailsService, BCrypt hashing, asynchronous task executors for non-blocking email dispatch.

---

## 3. Experience & Hackathons Inventory [VERIFIED FROM SOURCE: `src/data/experience.js`]

| Experience ID | Role / Designation | Organization / Event | Period | Verified Impact / Highlights |
|---|---|---|---|---|
| `oss-spring-boot-admin` | **Core Open Source Contributor** | codecentric AG (Spring Boot Admin) | Oct 2026 | Merged **PR #5738** implementing `max-log-size-per-aggregate` property across Hazelcast and in-memory event stores. |
| `skillcraft` | **Web Development Intern** | SkillCraft Technology | Aug 2025 - Sep 2025 | Developed 4 responsive React applications in an Agile/Scrum environment. |
| `et-genai` | **Semi-Finalist (Top Tier)** | ET GenAI Hackathon 2026 | May 2026 | Ranked in semi-finalist tier out of **55,000+ national and global applicants**. |
| `ai-for-bharat` | **Prototype Lead (Team CodeArc)** | AI for Bharat Hackathon | Jun 2026 | Directed 4-member team building MVCVS AI civic logistics prototype. |
| `adobe-hackathon` | **Round 3 Qualifier (Top 200)** | Adobe University Hackathon 2026 | Aug 2026 | Advanced through 3 competitive rounds into Top 200 teams nationwide. |
| `bharatiya-antariksh` | **Prototype Innovator (UrbanCool AI)** | Bharatiya Antariksh Hackathon 2026 | Jul 2026 | Geospatial telemetry platform analyzing satellite heat data via React Leaflet. |
| `jpmorgan-sim` | **Software Engineering Simulation** | J.P. Morgan Chase & Co. | Dec 2025 | Financial market data stream visualization using Perspective and unit testing. |

---

## 4. Digital Asset Inventory

### 4.1 Documents & Resumes
- `public/Shivansh_Mishra_resume_f1.pdf` (155.2 KB) — Production PDF resume.
- `public/robots.txt` (76 B) — Crawler indexing rules.
- `public/sitemap.xml` (965 B) — XML sitemap listing `/`, `/freelancer`, `/developer`, `/journey`.

### 4.2 Image Assets
- `public/hero.webp` (20.4 KB) — Original square portrait photo.
- `public/hero-editorial.webp` (144.4 KB) — High-definition editorial portrait with grayscale filter.
- `public/favicon-light.svg` (303 B) — Scalable vector favicon for light backgrounds.
- `public/favicon-dark.svg` (303 B) — Scalable vector favicon for dark backgrounds.

### 4.3 3D Models
- `public/models/avatar.glb` (**14,072,008 Bytes / 14.07 MB**) — Massive binary glTF 3D model asset. **Caution:** Extremely heavy for mobile connections.

### 4.4 Verified Certificate Credentials (`public/certificates/`)
- `et_genai_hackathon.pdf` / `.webp` (The Economic Times GenAI Hackathon 2026)
- `hp_life_ai.pdf` / `.webp` (HP LIFE AI for Beginners)
- `nptel_german.pdf` / `.webp` (NPTEL German-I IIT Madras)
- `apna_college_alpha.pdf` / `.webp` (Apna College Alpha DSA & Java)
- `deloitte_simulation.pdf` / `.webp` (Deloitte Technology Job Simulation)
- `aws_ai_for_bharat.webp` (AWS AI for Bharat)
- `oracle_agentic_ai.webp` (Oracle Agentic AI)
- `hackerrank_intern.webp` (HackerRank Software Engineer Intern)
- `jpmorgan_simulation.webp` (J.P. Morgan Software Engineering Simulation)

---

## 5. Comprehensive Link & Navigation Audit

| Destination Label | Target URI / Link | Type | Current Status | Notes / Impact |
|---|---|---|---|---|
| **Home Wordmark** | `/` | Internal Router | **WORKING** | Navigates to root overview |
| **Work Anchor** | `/#work` | Internal Hash | **WORKING** | Smooth-scrolls to Selected Work |
| **About Anchor** | `/#about` | Internal Hash | **WORKING** | Smooth-scrolls to About Narrative |
| **Perspectives Anchor** | `/#perspectives` | Internal Hash | **WORKING** | Smooth-scrolls to Path Selector |
| **Developer Path** | `/developer` | Internal Router | **WORKING** | Loads DeveloperPage component |
| **Freelancer Path** | `/freelancer` | Internal Router | **WORKING** | Loads FreelancerPage component |
| **Journey Route** | `/journey` | Internal Router | **WORKING** | Accessible directly via URL |
| **Footer Journey Link** | `/developer/journey` | Internal Link | **BROKEN (404/Empty)** | Route does not exist in `App.jsx` |
| **Footer Contact Link** | `/contact` | Internal Link | **BROKEN (404/Empty)** | Route does not exist in `App.jsx` |
| **GitHub Profile** | `https://github.com/shivanshmishra54` | External Link | **WORKING** | Verified external destination |
| **LinkedIn Profile** | `https://www.linkedin.com/in/shivansh-mishra54` | External Link | **WORKING** | Verified external destination |
| **YouTube Channel** | `https://www.youtube.com/@ShivanshMishra54` | External Link | **WORKING** | Verified external destination |
| **LeetCode Profile** | `https://leetcode.com/u/shivanshmishra54/` | External Link | **WORKING** | Verified external destination |
| **CodeChef Profile** | `https://www.codechef.com/users/shivansh54may` | External Link | **WORKING** | Verified external destination |
| **Codeforces Profile** | `https://codeforces.com/profile/shivanshmishra55` | External Link | **WORKING** | Verified external destination |
| **Spring Boot Admin PR** | `https://github.com/codecentric/spring-boot-admin/pull/5738` | External Link | **WORKING** | Merged PR #5738 |
| **Resume Download** | `/Shivansh_Mishra_resume_f1.pdf` | Direct Static Asset | **WORKING** | 155 KB PDF file served from public/ |
| **Email Protocol** | `mailto:shivansh54mishra@gmail.com` | Mailto Link | **WORKING** | Triggers default mail client |
