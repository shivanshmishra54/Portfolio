import { skills } from '../../data/skills';
import { getDeveloperProjects } from '../../data/projects';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';
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
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
              <span className="text-[#f97316]/90 font-medium">03 / ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08]">
              <AnimeTextReveal trigger="visible">Technical Stack</AnimeTextReveal>
            </h2>
          </div>
          <p className="text-[#aaa9a4] max-w-md font-light text-sm md:text-base leading-relaxed">
            Verified technologies utilized across production systems, custom client applications, and theoretical computer science.
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
                <div className="flex items-center gap-3.5 mb-8 border-b border-white/[0.08] pb-4">
                  <div className="p-2.5 bg-white/[0.04] rounded-xl border border-white/[0.08] text-[#f1eee8]">
                    <CategoryIcon size={18} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#f1eee8] tracking-tight">
                    {category.category}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                  {category.items.map((skill, sIdx) => {
                    const relatedProjects = getProjectsForSkill(skill.name);
                    const TechIcon = TechIconMap[skill.icon] || LucideIcons.Code;
                    
                    return (
                      <div 
                        key={sIdx}
                        className="flex flex-col p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.22] transition-colors justify-between"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="text-3xl shrink-0 text-[#f1eee8] opacity-80">
                            <TechIcon />
                          </div>
                          <div>
                            <h4 className="text-sm font-mono uppercase tracking-wider text-[#f1eee8] font-semibold">{skill.name}</h4>
                            <p className="text-[11px] text-[#aaa9a4] font-mono mt-0.5">{category.category.replace(' & ', ' / ')}</p>
                          </div>
                        </div>

                        {/* Project mapping */}
                        <div className="mt-auto pt-4 border-t border-white/[0.08]">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#aaa9a4] mb-1.5">Used In:</p>
                          {relatedProjects.length > 0 ? (
                            <ul className="space-y-1">
                              {relatedProjects.slice(0, 2).map(p => (
                                <li key={p.id} className="text-xs font-mono text-[#dcd8d0] truncate">
                                  {p.developer?.title}
                                </li>
                              ))}
                              {relatedProjects.length > 2 && (
                                <li className="text-[11px] font-mono text-[#aaa9a4]">+{relatedProjects.length - 2} more...</li>
                              )}
                            </ul>
                          ) : (
                            <p className="text-xs font-mono text-[#aaa9a4] italic">Core/Theoretical Rigor</p>
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
