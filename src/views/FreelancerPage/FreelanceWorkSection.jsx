'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFreelancerProjects } from '../../data/projects';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import { Github, ChevronRight } from 'lucide-react';
import { ProjectVisualBanner } from '../../components/ui/ProjectVisualBanner';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

export function FreelanceWorkSection() {
  const projects = getFreelancerProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work" className="py-24 md:py-32 bg-[#030303] border-t border-white/[0.06]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-[#aaa9a4] uppercase">04 / CASE STUDIES</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#f1eee8] mb-4">
            <AnimeTextReveal trigger="visible">
              Projects Built for Impact
            </AnimeTextReveal>
          </h2>
          <p className="text-base md:text-lg text-[#aaa9a4] max-w-2xl font-light leading-relaxed">
            Real software systems engineered end-to-end, demonstrating verified architecture, performance, and pragmatic execution.
          </p>
        </motion.div>

        {/* Project List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 0.1}
              yOffset={20}
            >
              <button
                onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                className="w-full text-left group"
                aria-expanded={selectedProject?.id === project.id}
              >
                <div className="flex items-center justify-between p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] hover:border-white/[0.2] hover:bg-[#101010] transition-all duration-300">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#aaa9a4]/70 uppercase">
                        {project.category || 'Featured Project'}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#f1eee8] mb-2 group-hover:text-white transition-colors">
                      {project.freelancer.title}
                    </h3>
                    <p className="text-sm text-[#aaa9a4] line-clamp-2 max-w-xl font-light">
                      {project.freelancer.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-[#aaa9a4] hidden sm:inline">
                      {selectedProject?.id === project.id ? 'Close' : 'Details'}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#aaa9a4] group-hover:text-white group-hover:border-white/20 transition-all">
                      <ChevronRight 
                        size={16} 
                        className={`transition-transform duration-300 ${selectedProject?.id === project.id ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} 
                      />
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded Case Study */}
              <AnimatePresence>
                {selectedProject?.id === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 md:px-4 pb-6 pt-2">
                      <div className="rounded-2xl border border-white/[0.08] bg-[#080808] p-6 md:p-8">
                        {/* Project Visual Banner */}
                        <div className="w-full mb-8 rounded-xl overflow-hidden border border-white/[0.08]">
                          <ProjectVisualBanner
                            title={project.freelancer.title}
                            category={project.category}
                            tags={project.freelancer.features}
                            image={project.image}
                          />
                        </div>

                        {/* Case Study Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                          {project.freelancer.problem && (
                            <div className="p-5 rounded-xl bg-[#0c0c0c] border border-white/[0.06]">
                              <h4 className="text-[11px] font-mono tracking-widest text-white/50 uppercase mb-3">The Problem</h4>
                              <p className="text-sm text-[#aaa9a4] leading-relaxed font-light">{project.freelancer.problem}</p>
                            </div>
                          )}
                          {project.freelancer.solution && (
                            <div className="p-5 rounded-xl bg-[#0c0c0c] border border-white/[0.06]">
                              <h4 className="text-[11px] font-mono tracking-widest text-white/50 uppercase mb-3">The Solution</h4>
                              <p className="text-sm text-[#aaa9a4] leading-relaxed font-light">{project.freelancer.solution}</p>
                            </div>
                          )}
                          {project.freelancer.outcome && (
                            <div className="p-5 rounded-xl bg-[#0c0c0c] border border-white/[0.06]">
                              <h4 className="text-[11px] font-mono tracking-widest text-white/50 uppercase mb-3">The Result</h4>
                              <p className="text-sm text-[#aaa9a4] leading-relaxed font-light">{project.freelancer.outcome}</p>
                            </div>
                          )}
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.freelancer.features?.map((feature) => (
                            <span key={feature} className="text-xs px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#aaa9a4] font-mono">
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1eee8] text-[#030303] font-medium text-xs tracking-wider uppercase hover:bg-white transition-colors"
                              aria-label={`View ${project.freelancer.title} on GitHub`}
                            >
                              <Github size={14} /> View Codebase on GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
