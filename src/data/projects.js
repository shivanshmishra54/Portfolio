export const projects = [
  {
    id: "shorturl",
    slug: "shorturl",
    title: "ShortUrl",
    subtitle: "Distributed URL Shortening Platform",
    category: "backend",
    featured: true,
    freelancerRelevant: false,
    developerRelevant: true,
    description: "Architected a distributed system with independent API Gateways & microservices. Implemented Base-62 encoding supporting 56.8B+ URLs, JWT auth, dynamic Netflix Eureka discovery, and sub-15ms p95 redirect latency.",
    problem: "",
    solution: "",
    challenges: [],
    result: "",
    role: "Backend Developer",
    technologies: ["Java", "Spring Boot", "Microservices", "Netflix Eureka", "JWT"],
    features: ["Base-62 encoding", "JWT auth", "Dynamic discovery", "Sub-15ms latency"],
    architecture: "",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://github.com/Shivansh54mishra", // URL provided in original file
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    color: "#5196fd",
    caseStudy: {
      freelancer: {},
      developer: {}
    }
  },
  {
    id: "track2act",
    slug: "track2act",
    title: "Track2Act",
    subtitle: "AI-Powered Logistics & Fleet Management",
    category: "fullstack",
    featured: true,
    freelancerRelevant: true,
    developerRelevant: true,
    description: "Full-stack logistics platform with Role-Based Access Control (RBAC) across 4 user roles. Features live route visualization via React Leaflet, optimized MySQL queries, and real-time shipment monitoring.",
    problem: "",
    solution: "",
    challenges: [],
    result: "",
    role: "Full-Stack Developer",
    technologies: ["React.js", "MySQL", "React Leaflet"],
    features: ["RBAC", "Live route visualization", "Real-time monitoring"],
    architecture: "",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://github.com/Shivansh54mishra",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    color: "#10B981",
    caseStudy: {
      freelancer: {},
      developer: {}
    }
  },
  {
    id: "auth-engine",
    slug: "auth-engine",
    title: "Authentication & Authorization Engine",
    subtitle: "Standalone identity provider subsystem",
    category: "backend",
    featured: true,
    freelancerRelevant: false,
    developerRelevant: true,
    description: "Standalone identity provider subsystem using JWT to secure 10+ role-based API endpoints. Configured BCrypt hashing, custom Spring Security filter chains, and asynchronous email OTP notifications.",
    problem: "",
    solution: "",
    challenges: [],
    result: "",
    role: "Backend Developer",
    technologies: ["Java", "Spring Security", "JWT", "BCrypt"],
    features: ["Role-based endpoints", "BCrypt hashing", "Email OTP"],
    architecture: "",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://github.com/Shivansh54mishra",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    color: "#8f89ff",
    caseStudy: {
      freelancer: {},
      developer: {}
    }
  },
  {
    id: "skillcraft",
    slug: "skillcraft",
    title: "SkillCraft Interactive Web Apps Suite",
    subtitle: "Suite of 4 responsive web applications",
    category: "frontend",
    featured: true,
    freelancerRelevant: true,
    developerRelevant: true,
    description: "Suite of 4 responsive web applications including a modern landing page, advanced calculator, interactive to-do app, and browser game built with React.js, Tailwind CSS, and clean rendering pipelines.",
    problem: "",
    solution: "",
    challenges: [],
    result: "",
    role: "Frontend Developer",
    technologies: ["React.js", "Tailwind CSS"],
    features: ["Landing page", "Calculator", "To-do app", "Browser game"],
    architecture: "",
    github: "https://github.com/Shivansh54mishra",
    liveDemo: "https://portfolio-or-shivansh-mishra--shivansh54iron.replit.app/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    color: "#ed649e",
    caseStudy: {
      freelancer: {},
      developer: {}
    }
  }
];

export function getFeaturedProjects() {
  return projects.filter(p => p.featured);
}

export function getFreelancerProjects() {
  return projects.filter(p => p.freelancerRelevant);
}

export function getDeveloperProjects() {
  return projects.filter(p => p.developerRelevant);
}

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug);
}
