export const projects = [
  {
    id: "shorturl",
    slug: "shorturl",
    category: "backend",
    github: "https://github.com/shivanshmishra54/spring-boot-react-url-shortener",
    liveDemo: null,
    image: null,
    color: "#262626",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "ShortUrl",
      summary: "Distributed URL Shortening & Analytics Platform",
      problem: "Organizations and high-traffic campaigns require a high-throughput, secure link shortening infrastructure capable of compressing millions of links with real-time click tracking without latency bottlenecks.",
      solution: "Engineered a distributed microservices system with Spring Boot 3, Spring Cloud Gateway WebMVC, Netflix Eureka discovery, Base-62 compression, and a modern React client.",
      features: [
        "Base-62 URL Compression",
        "JWT Authentication & Dashboard",
        "Real-Time Click Analytics",
        "Netflix Eureka Discovery",
        "Resilient Redirection Cache"
      ],
      outcome: "Delivered a production-ready microservices platform supporting 56.8B+ unique URLs with sub-15ms p95 redirect latency."
    },
    developer: {
      title: "ShortUrl — Distributed URL Shortener Microservices",
      overview: "Enterprise-grade microservices system engineered with Spring Boot 3, Spring Cloud Gateway WebMVC, and Netflix Eureka. Implements Base-62 encoding supporting 56.8B+ URLs, JWT security, dynamic click analytics, and sub-15ms p95 redirection latency.",
      technologies: [
        "Java 21",
        "Spring Boot 3",
        "Spring Cloud Eureka",
        "Spring Cloud Gateway",
        "React 19",
        "Tailwind CSS",
        "JWT",
        "Spring Data JPA",
        "MySQL"
      ],
      architecture: {
        description: "Distributed microservices topology featuring decoupled API Gateway WebMVC routing, dynamic service registration via Netflix Eureka, Base-62 hashing engine, and isolated redirect caching for maximum throughput."
      },
      challenges: [
        "Achieving sub-15ms p95 redirect throughput under high concurrent traffic",
        "Designing resilient Base-62 encoding with collision prevention across 56.8B+ URLs",
        "Implementing dynamic routing and token validation across gateway filter chains"
      ],
      engineeringDecisions: [
        "Decoupled gateway and discovery registry microservices",
        "Stateless JWT token issuance with BCrypt encryption",
        "Optimized database indexing on shortened hash tokens"
      ]
    }
  },
  {
    id: "track2act",
    slug: "track2act",
    category: "fullstack",
    github: "https://github.com/shivanshmishra54/track2act",
    liveDemo: null,
    image: null,
    color: "#171717",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "Track2Act",
      summary: "AI-Powered Supply Chain & Fleet Logistics Ecosystem",
      problem: "Modern supply chain operations struggle with unexpected route delays, lack of real-time GPS fleet tracking, and manual bottleneck resolution across diverse supply chain stakeholders.",
      solution: "Developed an enterprise PaaS combining interactive live map telemetry via React Leaflet, a 6-tier RBAC system, and autonomous route exception intelligence powered by Hugging Face foundation models.",
      features: [
        "Real-Time GPS Telemetry",
        "Hugging Face AI Exception Analytics",
        "6-Role Access Control (RBAC)",
        "Interactive React Leaflet Map",
        "Driver Milestone Proof-of-Delivery"
      ],
      outcome: "Equipped logistics teams with automated predictive rerouting, driver proof-of-delivery updates, and end-to-end supply chain operational clarity."
    },
    developer: {
      title: "Track2Act — AI Supply Chain & Logistics PaaS",
      overview: "Full-stack enterprise logistics platform integrating Hugging Face AI (Mixtral-8x7B) for automated route deviation reasoning. Features 6-tier RBAC, React Leaflet GPS telemetry, Spring Boot 3 REST APIs, and optimized transactional schemas.",
      technologies: [
        "React 18",
        "Spring Boot 3",
        "Java 21",
        "Hugging Face AI",
        "React Leaflet",
        "MySQL",
        "Tailwind CSS",
        "shadcn/ui",
        "JWT"
      ],
      architecture: {
        description: "Enterprise PaaS uncoupled monolith architecture designed for microservices migration. Communicates strictly over REST with JWT filter authentication, delegating predictive reasoning to Hugging Face inference pipelines."
      },
      challenges: [
        "Real-time GPS telemetry event synchronization across dispatchers and mobile drivers",
        "Integrating LLM inference with strict enterprise latency guardrails and fallback states",
        "Handling complex 6-role permission trees within single-page state management"
      ],
      engineeringDecisions: [
        "Hugging Face inference integration for automated disruption analytics",
        "React Leaflet geospatial visualization with dynamic marker updates",
        "Fine-grained Spring Security RBAC filters across multi-tenant endpoints"
      ]
    }
  },
  {
    id: "employee-management",
    slug: "employee-management",
    category: "fullstack",
    github: "https://github.com/shivanshmishra54/Employee-Management-System-using-React-and-Spring-Boot",
    liveDemo: null,
    image: null,
    color: "#262626",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "Employee Management System",
      summary: "Full-Stack HR & Workforce Operations Platform",
      problem: "Growing companies need a reliable, centralized platform to oversee workforce records, manage department personnel, and perform real-time CRUD operations without human data discrepancies.",
      solution: "Engineered a modern full-stack web application with React client and Spring Boot 3 backend, incorporating instant form validation, clean REST APIs, and responsive data tables.",
      features: [
        "Real-Time Personnel CRUD",
        "Instant Form Validation",
        "Controller-Service-Repository Flow",
        "Clean Responsive Data Grids",
        "CORS-Secured API Communication"
      ],
      outcome: "Delivered a clean, high-reliability HR portal that streamlines personnel administration and ensures zero data loss."
    },
    developer: {
      title: "Employee Management System — Spring Boot & React CRUD Suite",
      overview: "Full-stack workforce management platform engineered with Spring Boot 3 (Java 21) and React 18. Implements Controller-Service-Repository architecture, complete RESTful CRUD APIs, Hibernate ORM entity mapping, and responsive React data grids.",
      technologies: [
        "Java 21",
        "Spring Boot 3",
        "React 18",
        "MySQL",
        "Hibernate ORM",
        "RESTful APIs",
        "Bootstrap 5",
        "Maven"
      ],
      architecture: {
        description: "Multi-tier layered architecture adhering to strict separation of concerns (Controller, Service, Repository). Uses Hibernate JPA for automated schema binding and connection pooling with CORS-enabled REST endpoints."
      },
      challenges: [
        "Ensuring ACID consistency across high-volume employee record mutations",
        "Maintaining synchronized validation rules between frontend forms and backend DTOs",
        "Decoupling REST endpoints with secure CORS configuration for multi-origin client compatibility"
      ],
      engineeringDecisions: [
        "Controller-Service-Repository pattern for maximum testability and modularity",
        "Hibernate ORM with connection pooling for relational integrity",
        "Unified error handling controller advice for consistent JSON error contracts"
      ]
    }
  },
  {
    id: "spring-boot-login-system",
    slug: "spring-boot-login-system",
    category: "backend",
    github: "https://github.com/shivanshmishra54/spring-boot-login-system",
    liveDemo: null,
    image: null,
    color: "#171717",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "Spring Boot Security Login System",
      summary: "Enterprise Authentication & Access Control Engine",
      problem: "Web applications require robust identity protection, automated email verification, and secure password recovery mechanisms to prevent unauthorized access and credential vulnerability.",
      solution: "Built a standalone security identity provider featuring Spring Security 6, multi-threaded async email OTP verification, time-limited token password resets, and role-based permissions.",
      features: [
        "Spring Security 6 Protection",
        "Async Multi-Threaded Email OTP",
        "Time-Based Token Password Reset",
        "ROLE_USER & ROLE_ADMIN RBAC",
        "Professional HTML Email Templates"
      ],
      outcome: "Implemented a hardened authentication foundation ensuring safe registration, instant OTP verification, and foolproof credential recovery."
    },
    developer: {
      title: "Spring Boot Security Login & Access Management System",
      overview: "Enterprise identity provider and access manager built with Spring Boot 3 and Spring Security 6. Implements database-backed UserDetailsService, multi-threaded async email OTP delivery, time-limited cryptographic password reset tokens, and tuned connection pooling.",
      technologies: [
        "Java 21",
        "Spring Boot 3",
        "Spring Security 6",
        "Spring Data JPA",
        "MySQL",
        "Thymeleaf",
        "JavaMailSender",
        "Maven"
      ],
      architecture: {
        description: "Multi-layered security pipeline incorporating Spring Security 6 filter chains, custom UserDetailsService, BCrypt hashing, and asynchronous mail service task executors for non-blocking email dispatch."
      },
      challenges: [
        "Preventing thread blocking during SMTP email OTP transactions via asynchronous executors",
        "Securing time-sensitive token lifecycles for password recovery against replay attacks",
        "Enforcing strict role hierarchies without degrading session query performance"
      ],
      engineeringDecisions: [
        "Spring Security 6 filter chain configuration with stateless session capability",
        "Database-backed UserDetailsService with BCrypt hashing",
        "Async multi-threaded email dispatching with JavaMailSender"
      ]
    }
  }
];

export function getFeaturedProjects() {
  return projects.filter(p => p.paths?.freelancer || p.paths?.developer);
}

export function getFreelancerProjects() {
  return projects.filter(p => p.paths?.freelancer);
}

export function getDeveloperProjects() {
  return projects.filter(p => p.paths?.developer);
}

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug);
}
