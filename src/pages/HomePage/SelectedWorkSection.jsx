import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { getFeaturedProjects } from '../../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export function SelectedWorkSection() {
  const featured = getFeaturedProjects().slice(0, 3); // top 3

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading 
          title="Selected Work" 
          subtitle="A curated selection of robust, scalable engineering solutions." 
        />

        <div className="space-y-24 md:space-y-32">
          {featured.map((project, idx) => {
            // Default to developer presentation for the homepage overview
            const presentation = project.developer || project.freelancer;
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
              >
                {/* Image side */}
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl aspect-video relative group">
                  <img 
                    src={project.image} 
                    alt={presentation.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
                
                {/* Text side */}
                <div className="w-full md:w-1/2 flex flex-col items-start">
                  <span className="text-sm font-mono tracking-widest text-gray-500 mb-4 uppercase">{project.category}</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-4">
                    {presentation.title}
                  </h3>
                  <p className="text-lg font-light text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {presentation.overview || presentation.summary}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {(presentation.technologies || presentation.features || []).slice(0, 4).map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium uppercase tracking-wider border border-gray-200 dark:border-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6">
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
                        View Project <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
                        Code <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
