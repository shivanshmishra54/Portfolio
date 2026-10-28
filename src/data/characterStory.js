/**
 * Character Story Data for Phase 6 — "In Motion: See My Life"
 * 7 verified scenes detailing Shivansh Mishra's genuine engineering journey.
 * Single source of truth for narrative, poses, expressions, and technical milestones.
 */

export const storyScenes = [
  {
    id: 'scene-1',
    number: '01',
    chapter: 'THE SPARK',
    title: 'The Beginning of Curiosity',
    subtitle: 'Where curiosity met computational logic in Mumbai',
    description:
      'Growing up in Mumbai, I was fascinated by the invisible logic powering digital systems. What began as dismantling electronics and writing primitive scripts quickly transformed into a lifelong pursuit: engineering resilient software that solves real-world human problems.',
    characterImage: '/character/scene1_intro.webp',
    cutoutImage: '/character/scene1_cutout.webp',
    poseLabel: 'Welcoming & Introducing',
    mood: 'Welcoming · Curious · Driven',
    accentColor: '#f97316',
    ambientGradient: 'radial-gradient(ellipse at center, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.04) 45%, transparent 70%)',
    highlights: [
      { label: 'Location', value: 'Mumbai, India' },
      { label: 'First Spark', value: 'System Automations' },
      { label: 'Philosophy', value: 'Code with Purpose' }
    ],
    technicalEnvironment: {
      tag: 'ORIGIN STORY',
      detail: 'Curiosity-driven engineering from first principles'
    }
  },
  {
    id: 'scene-2',
    number: '02',
    chapter: 'FOUNDATIONS',
    title: 'Academic Rigor & CS Core',
    subtitle: 'Mastering mathematical and architectural foundations',
    description:
      'At K.J. Somaiya Institute of Technology, I grounded my engineering in core computer science. Beyond lectures, I dove deep into Data Structures, Algorithms, Memory Models, Operating Systems, and Distributed Networks—maintaining a verified 8.72 CGPA throughout my academic journey.',
    characterImage: '/character/scene2_learning.webp',
    cutoutImage: '/character/scene2_cutout.webp',
    poseLabel: 'Studying & Investigating',
    mood: 'Focused · Analytical · Methodical',
    accentColor: '#f59e0b',
    ambientGradient: 'radial-gradient(ellipse at center, rgba(245,158,11,0.16) 0%, rgba(245,158,11,0.03) 45%, transparent 70%)',
    highlights: [
      { label: 'Institution', value: 'K.J. Somaiya Institute' },
      { label: 'Degree', value: 'B.Tech IT (2024–2028)' },
      { label: 'Academic Standing', value: '8.72 CGPA' }
    ],
    technicalEnvironment: {
      tag: 'CORE SYSTEMS',
      detail: 'Memory allocation, binary trees, recursion trees, and complexity analysis'
    }
  },
  {
    id: 'scene-3',
    number: '03',
    chapter: 'ALGORITHMS',
    title: 'Algorithmic Problem Solving',
    subtitle: 'Deconstructing complexity through structured intuition',
    description:
      'Engineering intuition is honed through relentless practice. I tackled over 200+ algorithm challenges across LeetCode, CodeChef, and Codeforces—optimizing time and space complexities, mastering dynamic programming, graphs, and low-level data structures.',
    characterImage: '/character/scene3_thinking.webp',
    cutoutImage: '/character/scene3_cutout.webp',
    poseLabel: 'Thinking & Deconstructing',
    mood: 'Analytical · Deep Focus · Tenacious',
    accentColor: '#f97316',
    ambientGradient: 'radial-gradient(ellipse at center, rgba(249,115,22,0.16) 0%, rgba(249,115,22,0.03) 45%, transparent 70%)',
    highlights: [
      { label: 'Problems Solved', value: '200+ Verified' },
      { label: 'Platforms', value: 'LeetCode · CodeChef · CF' },
      { label: 'Core Strengths', value: 'DP · Graphs · Trees · O(1)' }
    ],
    technicalEnvironment: {
      tag: 'ALGORITHMIC ENGINE',
      detail: 'Depth-first search, memoization tables, sliding windows, and amortized bounds'
    }
  },
  {
    id: 'scene-4',
    number: '04',
    chapter: 'PRODUCTION ARCHITECTURE',
    title: 'Building Scalable Software',
    subtitle: 'From theoretical algorithms to high-throughput production systems',
    description:
      'With deep fundamentals established, I shifted focus to production-grade distributed architectures. Designing backend services with Spring Boot, Apache Kafka event streams, Redis sub-millisecond caching, PostgreSQL, and resilient REST interfaces that handle enterprise scale.',
    characterImage: '/character/scene4_coding.webp',
    cutoutImage: '/character/scene4_cutout.webp',
    poseLabel: 'Architecting & Coding',
    mood: 'Intense · Production-Ready · Pragmatic',
    accentColor: '#ea580c',
    ambientGradient: 'radial-gradient(ellipse at center, rgba(234,88,12,0.16) 0%, rgba(234,88,12,0.03) 45%, transparent 70%)',
    highlights: [
      { label: 'Backend Stack', value: 'Java · Spring Boot · REST' },
      { label: 'Distributed Tech', value: 'Kafka · Redis · Docker' },
      { label: 'Architecture', value: 'Event-Driven Microservices' }
    ],
    technicalEnvironment: {
      tag: 'SYSTEM TOPOLOGY',
      detail: 'Message queues, write-through caching, database connection pooling, Docker'
    }
  },
  {
    id: 'scene-5',
    number: '05',
    chapter: 'HACKATHONS',
    title: 'Competitive Engineering & Wins',
    subtitle: 'Transforming high-pressure constraints into verified solutions',
    description:
      'High-velocity innovation requires rapid execution under pressure. Participating in 6+ competitive hackathons including ET GenAI, Adobe University, AI for Bharat, and Bharatiya Antariksh, I led engineering squads from whiteboard architecture to production deployment within 24–36 hours.',
    characterImage: '/character/scene5_hackathon.webp',
    cutoutImage: '/character/scene5_cutout.webp',
    poseLabel: 'Triumphant Celebration',
    mood: 'Energized · Victorious · Collaborative',
    accentColor: '#f59e0b',
    ambientGradient: 'radial-gradient(ellipse at center, rgba(245,158,11,0.20) 0%, rgba(245,158,11,0.04) 45%, transparent 70%)',
    highlights: [
      { label: 'Competitions', value: '6+ Hackathons Attended' },
      { label: 'ET GenAI 2026', value: 'Semi-Finalist (55k+ Contenders)' },
      { label: 'National Ranks', value: 'Adobe Top 200 · Collegiate Top 10' }
    ],
    technicalEnvironment: {
      tag: 'INNOVATION SPRINT',
      detail: 'End-to-end prototyping, cloud deployment pipelines, live jury demos'
    }
  },
  {
    id: 'scene-6',
    number: '06',
    chapter: 'OPEN SOURCE',
    title: 'Open Source & Global Impact',
    subtitle: 'Contributing to battle-tested enterprise tools',
    description:
      'True engineering maturity is demonstrated by improving tools that thousands of developers rely on daily. I contributed directly to Spring Boot Admin (merged PR #5738 implementing aggregate log size controls) and have submitted over 10+ PRs across open-source repositories.',
    characterImage: '/character/scene6_opensource.webp',
    cutoutImage: '/character/scene6_cutout.webp',
    poseLabel: 'Code Review & Collaboration',
    mood: 'Community-Driven · Rigorous · Open',
    accentColor: '#f97316',
    ambientGradient: 'radial-gradient(ellipse at center, rgba(249,115,22,0.16) 0%, rgba(249,115,22,0.03) 45%, transparent 70%)',
    highlights: [
      { label: 'Major Contribution', value: 'Spring Boot Admin PR #5738' },
      { label: 'Open Source PRs', value: '10+ Submitted & Merged' },
      { label: 'Domain', value: 'Enterprise Observability' }
    ],
    technicalEnvironment: {
      tag: 'ENTERPRISE ECOSYSTEM',
      detail: 'Code review, unit tests, backward compatibility, CI/CD pipelines'
    }
  },
  {
    id: 'scene-7',
    number: '07',
    chapter: 'THE NEXT CHAPTER',
    title: 'Engineering The Future',
    subtitle: 'Ready for high-impact teams and ambitious client projects',
    description:
      'The journey has built a strong engineering foundation across systems programming, distributed microservices, and modern user experiences. Today, I am ready to collaborate with forward-thinking engineering organizations and ambitious clients worldwide.',
    characterImage: '/character/scene7_nextchapter.webp',
    cutoutImage: '/character/scene7_cutout.webp',
    poseLabel: 'Confident Visionary',
    mood: 'Confident · Ready · Forward-Looking',
    accentColor: '#f97316',
    ambientGradient: 'radial-gradient(ellipse at center, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.05) 50%, transparent 75%)',
    highlights: [
      { label: 'Availability', value: 'Open for High-Impact Roles' },
      { label: 'Dual Path', value: 'Developer & Freelancer' },
      { label: 'Vision', value: 'Scalable Systems, End-to-End' }
    ],
    technicalEnvironment: {
      tag: 'NEXT HORIZON',
      detail: 'Distributed computing, real-time architectures, enterprise scale'
    }
  }
];

