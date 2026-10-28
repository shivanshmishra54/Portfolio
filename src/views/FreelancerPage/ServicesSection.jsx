import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../data/services';
import { Code2, Server, Layout, Link as LinkIcon, ChevronDown } from 'lucide-react';

const iconMap = {
  Code2, Server, Layout, Link: LinkIcon,
};

export function ServicesSection() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase mb-4">Services</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
            What I Do
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2;
            const isExpanded = expandedId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="w-full text-left p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300"
                  aria-expanded={isExpanded}
                >
                  {/* Top row: Icon + Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800">
                        <Icon size={20} className="text-gray-700 dark:text-gray-300" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`text-gray-400 transition-transform duration-300 mt-1 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 space-y-5">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {service.detailedDescription}
                          </p>
                          
                          {/* Deliverables */}
                          {service.deliverables && service.deliverables.length > 0 && (
                            <div>
                              <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Deliverables</p>
                              <ul className="space-y-1">
                                {service.deliverables.map((d, i) => (
                                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech) => (
                              <span key={tech} className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
