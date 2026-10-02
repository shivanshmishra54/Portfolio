import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFreelancerProjects } from '../../data/projects';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

export function FreelanceWorkSection() {
  const projects = getFreelancerProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work" className="py-24 md:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase mb-4">Selected Work</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-4">
            Projects I&apos;ve Built
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl">
            Real projects demonstrating full-stack capability, from concept through deployment.
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
                <div className="flex items-center justify-between p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">Featured Project</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                      {project.freelancer.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xl">
                      {project.freelancer.summary}
                    </p>
                  </div>
                  <ChevronRight 
                    size={20} 
                    className={`text-gray-400 flex-shrink-0 ml-4 transition-transform duration-300 ${selectedProject?.id === project.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
                  />
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
                    <div className="px-6 md:px-8 pb-8 pt-2">
                      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 md:p-8">
                        {/* Project Image */}
                        <div className="w-full aspect-video rounded-lg overflow-hidden mb-8 bg-gray-100 dark:bg-gray-900">
                          <img 
                            src={project.image} 
                            alt={project.freelancer.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Case Study Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                          {project.freelancer.problem && (
                            <div>
                              <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">The Problem</h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.freelancer.problem}</p>
                            </div>
                          )}
                          {project.freelancer.solution && (
                            <div>
                              <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">The Solution</h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.freelancer.solution}</p>
                            </div>
                          )}
                          {project.freelancer.outcome && (
                            <div>
                              <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">The Result</h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.freelancer.outcome}</p>
                            </div>
                          )}
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.freelancer.features?.map((feature) => (
                            <span key={feature} className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono">
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                              aria-label={`View ${project.freelancer.title} on GitHub`}
                            >
                              <Github size={16} /> Source Code
                            </a>
                          )}
                          {project.liveDemo && project.liveDemo !== project.github && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                              aria-label={`View ${project.freelancer.title} live demo`}
                            >
                              <ExternalLink size={16} /> Live Demo
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
