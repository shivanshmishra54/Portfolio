import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../data/services';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';
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
    <section id="services" className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">02 / CORE OFFERINGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08]">
            <AnimeTextReveal trigger="visible">What I Deliver</AnimeTextReveal>
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-[#aaa9a4] font-light max-w-2xl leading-relaxed">
            Concrete engineering solutions tailored for early-stage founders, growing startups, and agencies requiring scalable digital products.
          </p>
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
                  className="w-full text-left p-7 md:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] hover:border-white/[0.22] transition-all duration-300 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  {/* Top row: Icon + Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f1eee8]">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-lg md:text-xl font-serif font-normal tracking-tight text-[#f1eee8]">
                        {service.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`text-[#aaa9a4] transition-transform duration-300 mt-1 flex-shrink-0 ${isExpanded ? 'rotate-180 text-[#f1eee8]' : ''}`} 
                    />
                  </div>
                  
                  <p className="text-xs sm:text-sm text-[#aaa9a4] leading-relaxed font-light">
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
                        <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-5">
                          <p className="text-xs sm:text-sm text-[#dcd8d0] leading-relaxed font-light">
                            {service.detailedDescription}
                          </p>
                          
                          {/* Deliverables */}
                          {service.deliverables && service.deliverables.length > 0 && (
                            <div>
                              <p className="text-[10px] font-mono tracking-widest text-[#aaa9a4] uppercase mb-2">Deliverables</p>
                              <ul className="space-y-1.5">
                                {service.deliverables.map((d, i) => (
                                  <li key={i} className="text-xs sm:text-sm text-[#dcd8d0] flex items-start gap-2 font-mono">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] mt-1.5 flex-shrink-0" />
                                    <span>{d}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {service.technologies.map((tech) => (
                              <span key={tech} className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-[#dcd8d0] font-mono border border-white/[0.06]">
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
