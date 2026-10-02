import { skills } from '../../data/skills';
import { getDeveloperProjects } from '../../data/projects';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import * as LucideIcons from 'lucide-react';
import { FaJava, FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiSpringboot, SiSpringsecurity, SiHibernate, SiTailwindcss, SiVite, SiMysql, SiPostgresql, SiRedis, SiIntellijidea, SiPostman, SiApachemaven, SiLeetcode } from 'react-icons/si';
import { BsGrid1X2, BsFileCode } from 'react-icons/bs';
import { TbBrandVscode } from 'react-icons/tb';

const TechIconMap = {
  FaJava, FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub,
  SiSpringboot, SiSpringsecurity, SiHibernate, SiTailwindcss, SiVite, SiMysql, SiPostgresql, SiRedis, SiIntellijidea, SiPostman, SiApachemaven, SiLeetcode,
  BsGrid1X2, BsFileCode,
  TbBrandVscode
};

export function TechnicalSkillsSection() {
  const projects = getDeveloperProjects();

  // Helper to find projects using a specific skill name
  const getProjectsForSkill = (skillName) => {
    return projects.filter(p => {
      const technologies = p.developer?.technologies || [];
      return technologies.some(t => t.toLowerCase() === skillName.toLowerCase() || 
                                    t.toLowerCase().includes(skillName.toLowerCase()));
    });
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-8 bg-gray-900 dark:bg-white"></span>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">Arsenal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">
              Technical Stack
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md font-light text-sm md:text-base">
            Verified technologies utilized across production systems, custom applications, and theoretical computer science.
          </p>
        </div>

        <div className="space-y-16">
          {skills.map((category, idx) => {
            const CategoryIcon = LucideIcons[category.icon] || LucideIcons.Code2;
            
            return (
              <ScrollReveal 
                key={category.id}
                delay={idx * 0.1}
                yOffset={20}
              >
                <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <div className={`p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 ${category.color}`}>
                    <CategoryIcon size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {category.category}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.items.map((skill, sIdx) => {
                    const relatedProjects = getProjectsForSkill(skill.name);
                    const TechIcon = TechIconMap[skill.icon] || LucideIcons.Code;
                    
                    return (
                      <div 
                        key={sIdx}
                        className="flex flex-col p-6 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="text-4xl shrink-0" style={{ color: skill.iconColor || 'currentColor' }}>
                            <TechIcon />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">{skill.name}</h4>
                            <p className="text-xs text-gray-500 font-mono mt-1">{category.category.replace(' & ', ' / ')}</p>
                          </div>
                        </div>

                        {/* Project mapping */}
                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-900">
                          <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Used In:</p>
                          {relatedProjects.length > 0 ? (
                            <ul className="space-y-1">
                              {relatedProjects.slice(0, 3).map(p => (
                                <li key={p.id} className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                  {p.developer?.title}
                                </li>
                              ))}
                              {relatedProjects.length > 3 && (
                                <li className="text-xs text-gray-500 italic">+{relatedProjects.length - 3} more...</li>
                              )}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500 italic">Core/Theoretical Knowledge</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
