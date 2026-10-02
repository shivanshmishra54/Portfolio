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

import { skills as skillCategories } from "@/data/skills";

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
  // skillCategories is imported from @/data/skills

  return (
    <main className="pt-15 lg:pt-0 text-white min-h-screen bg-[#04081A] relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <section className="container mx-auto px-4 py-11 relative z-10">
        <div className="flex justify-center items-center ">
          <IconCloudDemo />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon === 'Terminal' ? Terminal : category.icon === 'Code2' ? Code2 : category.icon === 'Database' ? Database : category.icon === 'Cpu' ? Cpu : category.icon === 'Layers' ? Layers : Award;
            
            const mappedSkills = (category.items || category.skills).map(skill => {
              let ItemIcon = Terminal;
              if (skill.icon === 'FaJava') ItemIcon = FaJava;
              else if (skill.icon === 'SiSpringboot') ItemIcon = SiSpringboot;
              else if (skill.icon === 'SiSpringsecurity') ItemIcon = SiSpringsecurity;
              else if (skill.icon === 'SiHibernate') ItemIcon = SiHibernate;
              else if (skill.icon === 'BsGrid1X2') ItemIcon = BsGrid1X2;
              else if (skill.icon === 'Layers') ItemIcon = Layers;
              else if (skill.icon === 'FaReact') ItemIcon = FaReact;
              else if (skill.icon === 'FaJsSquare') ItemIcon = FaJsSquare;
              else if (skill.icon === 'SiTailwindcss') ItemIcon = SiTailwindcss;
              else if (skill.icon === 'FaHtml5') ItemIcon = FaHtml5;
              else if (skill.icon === 'FaCss3Alt') ItemIcon = FaCss3Alt;
              else if (skill.icon === 'SiVite') ItemIcon = SiVite;
              else if (skill.icon === 'SiMysql') ItemIcon = SiMysql;
              else if (skill.icon === 'SiPostgresql') ItemIcon = SiPostgresql;
              else if (skill.icon === 'SiRedis') ItemIcon = SiRedis;
              else if (skill.icon === 'Database') ItemIcon = Database;
              else if (skill.icon === 'FaGitAlt') ItemIcon = FaGitAlt;
              else if (skill.icon === 'FaGithub') ItemIcon = FaGithub;
              else if (skill.icon === 'SiIntellijidea') ItemIcon = SiIntellijidea;
              else if (skill.icon === 'TbBrandVscode') ItemIcon = TbBrandVscode;
              else if (skill.icon === 'SiPostman') ItemIcon = SiPostman;
              else if (skill.icon === 'SiApachemaven') ItemIcon = SiApachemaven;
              else if (skill.icon === 'BsFileCode') ItemIcon = BsFileCode;
              else if (skill.icon === 'SiLeetcode') ItemIcon = SiLeetcode;
              else if (skill.icon === 'Cpu') ItemIcon = Cpu;
              else if (skill.icon === 'SiHackerrank') ItemIcon = SiHackerrank;
              else if (skill.icon === 'Award') ItemIcon = Award;
              
              return {
                name: skill.name,
                icon: <ItemIcon className="w-4 h-4" style={{ color: skill.iconColor }} />
              };
            });

            return (
              <SkillCard
                key={index}
                icon={IconComponent}
                title={category.category || category.title}
                skills={mappedSkills}
                color={category.color}
              />
            );
          })}
        </div>
      </section>

    </main>
  );
};

export default SkillsSection;
