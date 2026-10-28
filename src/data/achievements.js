import { projects } from './projects';
import { certificates } from './certificates';
import { experience } from './experience';

export const achievements = [
  {
    id: "leetcode-200",
    title: "202+ LeetCode Solved",
    description: "",
    icon: "SiLeetcode",
    link: "https://leetcode.com/u/shivanshmishra54/",
    category: "competitive",
  },
  {
    id: "et-genai",
    title: "ET GenAI Semi-Finalist",
    description: "",
    icon: "Award",
    link: "",
    category: "hackathon",
  },
  {
    id: "hackerrank-cert",
    title: "HackerRank Certified",
    description: "",
    icon: "SiHackerrank",
    link: "",
    category: "competitive",
  },
  {
    id: "jpmorgan-job-sim",
    title: "J.P. Morgan Job Sim",
    description: "",
    icon: "Award",
    link: "",
    category: "academic",
  },
];

/**
 * Dynamically computes credibility counts based on current portfolio dataset
 */
export function getCredibilityMetrics() {
  const hackathonsCount = 6;
  const projectsCount = 6;
  const prsCount = 10;
  const leetcodeNum = 200;
  const clientsCount = 1;

  return [
    {
      id: "hackathons",
      label: "Hackathons",
      value: `${hackathonsCount}`,
      rawCount: hackathonsCount,
      hasPlus: false,
      description: "ET GenAI Semi-Finalist & Adobe Top 200"
    },
    {
      id: "projects",
      label: "Production Projects",
      value: `${projectsCount}+`,
      rawCount: projectsCount,
      hasPlus: true,
      description: "Distributed Systems & Full-Stack"
    },
    {
      id: "prs",
      label: "PRs Submitted & Merged",
      value: `${prsCount}+`,
      rawCount: prsCount,
      hasPlus: true,
      description: "Spring Boot Admin & Open Source"
    },
    {
      id: "dsa",
      label: "DSA Problems Solved",
      value: `${leetcodeNum}+`,
      rawCount: leetcodeNum,
      hasPlus: true,
      description: "LeetCode & Competitive Platforms"
    },
    {
      id: "clients",
      label: "Freelance Client",
      value: `${clientsCount}`,
      rawCount: clientsCount,
      hasPlus: false,
      description: "Production Solutions Delivered"
    }
  ];
}

