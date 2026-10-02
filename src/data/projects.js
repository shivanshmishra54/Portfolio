export const projects = [
  {
    id: "shorturl",
    slug: "shorturl",
    category: "backend",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://github.com/Shivansh54mishra",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    color: "#5196fd",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "ShortUrl",
      summary: "Distributed URL Shortening Platform",
      problem: "Need a scalable backend system that can shorten, store, and redirect URLs with high performance and security.",
      solution: "Built a distributed microservices system with independent API gateways, JWT authentication, and optimized redirect logic.",
      features: ["Base-62 encoding", "JWT auth", "Dynamic discovery", "Sub-15ms latency"],
      outcome: "Delivered a production-ready platform supporting billions of unique URLs with sub-15ms redirect latency."
    },
    developer: {
      title: "ShortUrl",
      overview: "Architected a distributed system with independent API Gateways & microservices. Implemented Base-62 encoding supporting 56.8B+ URLs, JWT auth, dynamic Netflix Eureka discovery, and sub-15ms p95 redirect latency.",
      technologies: ["Java", "Spring Boot", "Microservices", "Netflix Eureka", "JWT"],
      architecture: {
        description: "Microservices architecture with API gateway, service discovery via Netflix Eureka, Base-62 encoding for compact URLs, and JWT-based authentication."
      },
      challenges: ["Achieving sub-15ms redirect latency", "Designing for 56.8B+ URL capacity", "Implementing dynamic service discovery"],
      engineeringDecisions: ["Base-62 encoding", "JWT auth", "Dynamic discovery"]
    }
  },
  {
    id: "track2act",
    slug: "track2act",
    category: "fullstack",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://github.com/Shivansh54mishra",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    color: "#10B981",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "Track2Act",
      summary: "AI-Powered Logistics & Fleet Management",
      problem: "A logistics operation needed a platform to track fleet routes, manage shipments, and provide different access levels to different team roles.",
      solution: "Developed a full-stack React + MySQL application with live map integration, real-time shipment tracking, and a 4-tier role-based access system.",
      features: ["Role-Based Access Control", "Live route visualization", "Real-time monitoring"],
      outcome: "Delivered a complete platform enabling real-time fleet monitoring and multi-role operational management."
    },
    developer: {
      title: "Track2Act",
      overview: "Full-stack logistics platform with Role-Based Access Control (RBAC) across 4 user roles. Features live route visualization via React Leaflet, optimized MySQL queries, and real-time shipment monitoring.",
      technologies: ["React.js", "MySQL", "React Leaflet"],
      architecture: {
        description: "Built a full-stack application with React frontend featuring live map visualization, a MySQL-backed API layer, and role-based access for 4 distinct user types."
      },
      challenges: ["Implementing live route visualization with React Leaflet", "Designing a 4-role RBAC system", "Optimizing complex MySQL queries for real-time data"],
      engineeringDecisions: ["React Leaflet integration", "MySQL optimization", "RBAC"]
    }
  },
  {
    id: "auth-engine",
    slug: "auth-engine",
    category: "backend",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://github.com/Shivansh54mishra",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    color: "#8f89ff",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "Authentication Engine",
      summary: "Secure Identity Provider System",
      problem: "Need a secure, reusable authentication system supporting multiple user roles and email verification.",
      solution: "Developed a standalone identity provider with JWT, BCrypt hashing, Spring Security filter chains, and async email OTP.",
      features: ["Role-based access", "Password hashing", "Email OTP"],
      outcome: "Delivered a production-ready auth engine that can be integrated into any application requiring secure user management."
    },
    developer: {
      title: "Authentication & Authorization Engine",
      overview: "Standalone identity provider subsystem using JWT to secure 10+ role-based API endpoints. Configured BCrypt hashing, custom Spring Security filter chains, and asynchronous email OTP notifications.",
      technologies: ["Java", "Spring Security", "JWT", "BCrypt"],
      architecture: {
        description: "Built a standalone auth engine with JWT tokens, BCrypt password hashing, custom Spring Security filter chains, and asynchronous email OTP verification."
      },
      challenges: ["Designing custom Spring Security filter chains", "Implementing asynchronous email OTP flow", "Securing 10+ role-based API endpoints"],
      engineeringDecisions: ["JWT for stateless auth", "BCrypt hashing", "Custom security filter chains"]
    }
  },
  {
    id: "skillcraft",
    slug: "skillcraft",
    category: "frontend",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://portfolio-or-shivansh-mishra--shivansh54iron.replit.app/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    color: "#ed649e",
    paths: {
      freelancer: true,
      developer: true
    },
    freelancer: {
      title: "SkillCraft Interactive Suite",
      summary: "Suite of 4 responsive web applications",
      problem: "Required multiple interactive web applications built rapidly with consistent responsive design.",
      solution: "Developed 4 React-based applications with Tailwind CSS, clean component architecture, and optimized rendering.",
      features: ["Landing page", "Calculator", "To-do app", "Browser game"],
      outcome: "Delivered a complete suite of interactive web applications meeting all quality and responsiveness requirements."
    },
    developer: {
      title: "SkillCraft Interactive Web Apps Suite",
      overview: "Suite of 4 responsive web applications including a modern landing page, advanced calculator, interactive to-do app, and browser game built with React.js, Tailwind CSS, and clean rendering pipelines.",
      technologies: ["React.js", "Tailwind CSS"],
      architecture: {
        description: "Built 4 distinct React applications all with responsive layouts and clean component rendering pipelines."
      },
      challenges: ["Delivering 4 distinct applications within a tight timeline", "Maintaining consistent quality across different app types", "Ensuring responsive design for each application"],
      engineeringDecisions: ["React components", "Tailwind styling", "Clean rendering pipelines"]
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
