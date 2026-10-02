export const services = [
  {
    id: "fullstack-web",
    title: "Full-Stack Web Development",
    shortDescription: "End-to-end web application development using modern frameworks and scalable architectures.",
    detailedDescription: "I build complete web applications from the ground up — interactive frontends backed by robust server-side logic and persistent data storage. Whether you need a business website, a SaaS dashboard, or an internal tool, I handle the full stack so you get a single, cohesive product.",
    technologies: ["React.js", "Java", "Spring Boot", "MySQL", "Tailwind CSS", "REST APIs"],
    suitableFor: ["Startups needing an MVP", "Businesses requiring custom internal tools", "Projects needing both frontend and backend"],
    deliverables: ["Responsive frontend application", "Backend API server", "Database design & setup", "Deployment configuration"],
    features: ["Custom UI/UX implementation", "RESTful API design", "Database modeling", "Authentication & authorization", "Deployment setup"],
    icon: "Code2",
  },
  {
    id: "backend-development",
    title: "Backend & API Development",
    shortDescription: "Reliable, secure server-side systems using Java, Spring Boot, and modern API patterns.",
    detailedDescription: "I design and build backend systems that are structured, testable, and ready to scale. From REST API design to database optimization and authentication flows, I focus on creating server-side architectures that your frontend — or any client — can rely on.",
    technologies: ["Java", "Spring Boot", "Spring Security", "Hibernate/JPA", "MySQL", "JWT"],
    suitableFor: ["Projects requiring secure API backends", "Systems needing authentication and role-based access", "Applications requiring database integration"],
    deliverables: ["REST API with documented endpoints", "Database schema & migrations", "Authentication system", "API documentation"],
    features: ["REST API architecture", "JWT authentication", "Role-based access control", "Database optimization", "Spring Security integration"],
    icon: "Server",
  },
  {
    id: "frontend-development",
    title: "Frontend & UI Development",
    shortDescription: "Modern, responsive interfaces built with React and clean component architecture.",
    detailedDescription: "I build user interfaces that are fast, accessible, and visually refined. Using React and modern CSS, I translate designs into production-ready frontends with smooth interactions, responsive layouts, and clean component structure.",
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
    suitableFor: ["Businesses needing a modern web presence", "Projects requiring responsive redesigns", "Applications needing interactive UI components"],
    deliverables: ["Responsive web interface", "Component library", "Mobile-optimized layouts", "Cross-browser compatibility"],
    features: ["Responsive design", "Component-based architecture", "Animation & micro-interactions", "Accessibility compliance", "Performance optimization"],
    icon: "Layout",
  },
  {
    id: "api-integration",
    title: "API & Third-Party Integration",
    shortDescription: "Connecting your application to external services, APIs, and data sources.",
    detailedDescription: "I integrate external APIs and services into your application — payment gateways, AI APIs, mapping services, email systems, and more. I handle the data flow, error handling, and authentication so external services work seamlessly within your product.",
    technologies: ["REST APIs", "Spring Boot", "React.js", "JavaScript"],
    suitableFor: ["Applications needing payment processing", "Products requiring AI/ML API integration", "Systems needing third-party data synchronization"],
    deliverables: ["Integrated API connections", "Error handling & retry logic", "Data transformation layer", "Integration documentation"],
    features: ["Third-party API integration", "Data synchronization", "Webhook handling", "Error recovery"],
    icon: "Link",
  },
];

/**
 * Freelancer workflow / process stages.
 * Displayed in the "How I Work" section.
 */
export const freelancerProcess = [
  {
    id: "discover",
    step: 1,
    title: "Discover",
    description: "We start with a conversation. I learn about your goals, your users, and the problem you are trying to solve. No code yet — just understanding.",
    details: ["Understanding your requirements", "Defining the target audience", "Identifying core features", "Evaluating technical feasibility"],
  },
  {
    id: "plan",
    step: 2,
    title: "Plan",
    description: "I define the scope, choose the right architecture, and map out the technical approach. You get a clear picture of what will be built and how.",
    details: ["Defining project scope", "Choosing technology stack", "Database schema planning", "API endpoint design"],
  },
  {
    id: "build",
    step: 3,
    title: "Build",
    description: "I write clean, structured code — building the backend, frontend, and database layer. You see real progress through regular updates.",
    details: ["Backend API development", "Frontend implementation", "Database integration", "Authentication & security"],
  },
  {
    id: "test",
    step: 4,
    title: "Test & Refine",
    description: "I test across devices and scenarios, fix edge cases, and refine the experience. The goal is a product that works reliably, not just a demo.",
    details: ["Cross-browser testing", "Responsive validation", "API testing", "Performance optimization"],
  },
  {
    id: "deliver",
    step: 5,
    title: "Deliver",
    description: "I deploy the final product, hand over the codebase with documentation, and make sure you can maintain and extend it confidently.",
    details: ["Deployment to production", "Code documentation", "Knowledge transfer", "Post-launch support"],
  },
];

/**
 * What I can build — concrete project types for non-technical clients.
 */
export const buildCapabilities = [
  { id: "personal-portfolios", title: "Personal Portfolios", description: "Showcase your identity and work with premium, immersive digital experiences.", icon: "User" },
  { id: "business-portfolios", title: "Business Portfolios", description: "Professional corporate presence that builds trust and drives conversions.", icon: "Briefcase" },
  { id: "websites", title: "Websites", description: "Modern, responsive, and accessible websites optimized for performance and SEO.", icon: "Globe" },
  { id: "web-applications", title: "Web Applications", description: "Interactive, data-driven applications with complex state and user flows.", icon: "AppWindow" },
  { id: "software-solutions", title: "Software Solutions", description: "End-to-end custom software designed to solve specific operational problems.", icon: "Code" },
  { id: "business-management", title: "Business Management Systems", description: "Internal platforms for managing inventory, employees, and operations.", icon: "Building" },
  { id: "dashboards", title: "Dashboards", description: "Data visualization and analytics interfaces with role-based access control.", icon: "LayoutDashboard" },
  { id: "saas-applications", title: "SaaS Applications", description: "Multi-tenant software-as-a-service platforms with subscription logic.", icon: "Cloud" },
  { id: "ai-applications", title: "AI Applications", description: "Intelligent tools powered by AI APIs for automation and content generation.", icon: "Bot" },
  { id: "api-backend", title: "API / Backend Solutions", description: "Robust server-side architecture, REST APIs, and authentication systems.", icon: "Server" },
  { id: "database-driven", title: "Database-Driven Applications", description: "Applications backed by scalable relational databases (MySQL, PostgreSQL).", icon: "Database" },
  { id: "integrations", title: "Integrations", description: "Connecting third-party APIs, payment gateways, and external services.", icon: "Link" },
  { id: "bug-fixing", title: "Bug Fixing", description: "Identifying, troubleshooting, and resolving critical issues in existing codebases.", icon: "Wrench" },
  { id: "feature-development", title: "Feature Development", description: "Adding new functionality and extending existing platforms sustainably.", icon: "PlusCircle" },
];

/**
 * Why work with me — documented, factual differentiators only.
 */
export const differentiators = [
  {
    id: "fullstack",
    title: "Full-Stack Capability",
    description: "I handle both frontend and backend, so you work with one person who understands the entire system — from the UI to the database.",
  },
  {
    id: "modern-backend",
    title: "Production-Grade Backend",
    description: "My backend work uses Java and Spring Boot — the same stack used by enterprise systems. Your application gets a solid, maintainable foundation.",
  },
  {
    id: "clean-code",
    title: "Structured, Clean Code",
    description: "I write code that other developers can read, maintain, and extend. No spaghetti, no shortcuts — just organized, documented architecture.",
  },
  {
    id: "problem-solving",
    title: "Strong Problem-Solving Foundation",
    description: "200+ algorithmic problems solved on LeetCode, combined with hackathon experience, means I approach technical challenges methodically.",
  },
  {
    id: "complete-delivery",
    title: "Complete Delivery",
    description: "I don't just write code — I deploy, document, and hand over a working product. You get a finished system, not a half-built prototype.",
  },
];
