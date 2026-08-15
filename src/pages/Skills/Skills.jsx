import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconCloudDemo from "@/components/globe";
import {
  Code2,
  Database,
  Terminal,
  Cpu,
  Layers,
  Award,
} from "lucide-react";
import {
  FaReact,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaDocker,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiMysql,
  SiPostman,
  SiTailwindcss,
  SiIntellijidea,
  SiApachemaven,
  SiPostgresql,
  SiRedis,
  SiVercel,
  SiVite,
  SiLeetcode,
  SiHackerrank,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { BsGrid1X2, BsFileCode } from "react-icons/bs";

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <Card className="group relative overflow-hidden bg-gray-900/80 border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer"></div>
    <CardContent className="p-6 relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span className="transform group-hover/badge:scale-110 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className="font-medium">{skill.name}</span>
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Terminal,
      title: "Backend & Java Stack",
      color: "text-red-400",
      skills: [
        { name: "Java", icon: <FaJava className="w-4 h-4 text-[#ED8B00]" /> },
        {
          name: "Spring Boot",
          icon: <SiSpringboot className="w-4 h-4 text-[#6DB33F]" />,
        },
        {
          name: "Spring Security",
          icon: <SiSpringsecurity className="w-4 h-4 text-[#6DB33F]" />,
        },
        {
          name: "Hibernate / JPA",
          icon: <SiHibernate className="w-4 h-4 text-[#59666C]" />,
        },
        {
          name: "REST APIs",
          icon: <BsGrid1X2 className="w-4 h-4 text-[#FF6C37]" />,
        },
        {
          name: "Microservices",
          icon: <Layers className="w-4 h-4 text-[#38BDF8]" />,
        },
      ],
    },
    {
      icon: Code2,
      title: "Frontend Development",
      color: "text-blue-400",
      skills: [
        { name: "React.js", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
        {
          name: "JavaScript",
          icon: <FaJsSquare className="w-4 h-4 text-[#F7DF1E]" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />,
        },
        {
          name: "HTML5",
          icon: <FaHtml5 className="w-4 h-4 text-[#E34F26]" />,
        },
        {
          name: "CSS3",
          icon: <FaCss3Alt className="w-4 h-4 text-[#1572B6]" />,
        },
        {
          name: "Vite",
          icon: <SiVite className="w-4 h-4 text-[#646CFF]" />,
        },
      ],
    },
    {
      icon: Database,
      title: "Databases & Storage",
      color: "text-green-400",
      skills: [
        {
          name: "MySQL",
          icon: <SiMysql className="w-4 h-4 text-[#4479A1]" />,
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="w-4 h-4 text-[#336791]" />,
        },
        {
          name: "Redis",
          icon: <SiRedis className="w-4 h-4 text-[#DC382D]" />,
        },
        {
          name: "DBMS",
          icon: <Database className="w-4 h-4 text-[#10B981]" />,
        },
      ],
    },
    {
      icon: Cpu,
      title: "Developer Tools",
      color: "text-orange-400",
      skills: [
        { name: "Git", icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        { name: "GitHub", icon: <FaGithub className="w-4 h-4 text-white" /> },
        {
          name: "IntelliJ IDEA",
          icon: <SiIntellijidea className="w-4 h-4 text-[#FE315D]" />,
        },
        {
          name: "VS Code",
          icon: <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />,
        },
        {
          name: "Postman",
          icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" />,
        },
        {
          name: "Maven",
          icon: <SiApachemaven className="w-4 h-4 text-[#C71A36]" />,
        },
      ],
    },
    {
      icon: Layers,
      title: "CS Fundamentals",
      color: "text-purple-400",
      skills: [
        {
          name: "Data Structures",
          icon: <BsFileCode className="w-4 h-4 text-[#A855F7]" />,
        },
        {
          name: "Algorithms",
          icon: <SiLeetcode className="w-4 h-4 text-[#FFA116]" />,
        },
        {
          name: "OOP Concepts",
          icon: <Cpu className="w-4 h-4 text-[#38BDF8]" />,
        },
        {
          name: "Operating Systems",
          icon: <Terminal className="w-4 h-4 text-[#34D399]" />,
        },
        {
          name: "C Programming",
          icon: <BsFileCode className="w-4 h-4 text-[#A8B9CC]" />,
        },
      ],
    },
    {
      icon: Award,
      title: "Achievements & Badges",
      color: "text-yellow-400",
      skills: [
        {
          name: "202+ LeetCode Solved",
          icon: <SiLeetcode className="w-4 h-4 text-[#FFA116]" />,
        },
        {
          name: "ET GenAI Semi-Finalist",
          icon: <Award className="w-4 h-4 text-[#EAB308]" />,
        },
        {
          name: "HackerRank Certified",
          icon: <SiHackerrank className="w-4 h-4 text-[#2EC866]" />,
        },
        {
          name: "J.P. Morgan Job Sim",
          icon: <Award className="w-4 h-4 text-[#38BDF8]" />,
        },
      ],
    },
  ];

  return (
    <main className="pt-15 lg:pt-0 text-white min-h-screen bg-[#04081A] relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <section className="container mx-auto px-4 py-11 relative z-10">
        <div className="flex justify-center items-center ">
          <IconCloudDemo />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
            />
          ))}
        </div>
      </section>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(100, 100, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }
      `}</style>
    </main>
  );
};

export default SkillsSection;
