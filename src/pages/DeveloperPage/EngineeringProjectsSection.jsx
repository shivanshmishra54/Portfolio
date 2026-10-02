import { getDeveloperProjects } from '../../data/projects';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import { ArrowUpRight, Github, LayoutTemplate, Database, Server, Workflow } from 'lucide-react';

export function EngineeringProjectsSection() {
  const projects = getDeveloperProjects();

  return (
    <section className="py-24 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-gray-900 dark:bg-white"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">Engineering</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
            Selected Systems
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl font-light text-base md:text-lg">
            A deep dive into the architectures, problems, and technical decisions behind my most significant engineering projects.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project) => (
            <ScrollReveal 
              key={project.id}
              delay={0.1}
              yOffset={40}
              className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
            >
              
              {/* Left Column: Context & Arch */}
              <div className="w-full lg:w-5/12 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Software Engineer
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {project.developer.title}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 font-light mb-8">
                  {project.developer.overview}
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
                      <Github size={16} /> Source Code
                    </a>
                  )}
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
                      <LayoutTemplate size={16} /> Live Demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Engineering Details */}
              <div className="w-full lg:w-7/12 flex flex-col gap-12">
                
                <div className="bg-white dark:bg-[#0a0a0a] p-8 border border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-3">
                    <Workflow size={14} /> System Architecture
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-2">Architecture</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.developer.architecture?.description}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-2">Decisions</h5>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed list-disc list-inside">
                        {project.developer.engineeringDecisions?.map((dec, i) => (
                          <li key={i}>{dec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-[#0a0a0a] p-8 border border-gray-100 dark:border-gray-800">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-3">
                      <Server size={14} /> Technical Challenges
                    </h4>
                    <ul className="space-y-4">
                      {project.developer.challenges?.map((challenge, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-gray-400 dark:bg-gray-600 shrink-0"></span>
                          <span className="leading-relaxed">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-[#0a0a0a] p-8 border border-gray-100 dark:border-gray-800">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-3">
                      <Database size={14} /> Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.developer.technologies?.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-xs text-gray-700 dark:text-gray-300 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
