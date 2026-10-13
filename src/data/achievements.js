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
  const hackathonsCount = experience.filter(item => item.type === 'hackathon').length;
  const projectsCount = projects.length;
  const certsCount = certificates.length;

  const leetcodeAchievement = achievements.find(a => a.category === 'competitive' && a.id?.includes('leetcode'));
  const leetcodeNum = leetcodeAchievement 
    ? (leetcodeAchievement.title.match(/\d+/) ? parseInt(leetcodeAchievement.title.match(/\d+/)[0], 10) : 200)
    : 200;

  return [
    {
      id: "projects",
      label: "Projects Completed",
      value: `${projectsCount}+`,
      rawCount: projectsCount,
      hasPlus: true,
      description: "Full-Stack & Systems"
    },
    {
      id: "certifications",
      label: "Certifications",
      value: `${certsCount}`,
      rawCount: certsCount,
      hasPlus: false,
      description: "Oracle, AWS, HackerRank & JPMorgan"
    },
    {
      id: "hackathons",
      label: "Hackathons",
      value: `${hackathonsCount}`,
      rawCount: hackathonsCount,
      hasPlus: false,
      description: "National & University Competitions"
    },
    {
      id: "leetcode",
      label: "LeetCode Solved",
      value: `${leetcodeNum}+`,
      rawCount: leetcodeNum,
      hasPlus: true,
      description: "Algorithmic Challenges"
    }
  ];
}

