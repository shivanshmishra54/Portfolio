import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { profile } from '../../data/profile';
import { GraduationCap, Sparkles, Layers, Youtube, ArrowUpRight } from 'lucide-react';

const iconMap = {
  GraduationCap,
  Sparkles,
  Layers,
  Youtube,
};

export function CurrentlyBuildingSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#070707] border-t border-gray-200 dark:border-neutral-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeading 
            title="Currently Doing" 
            subtitle="Active pursuits, real-time engineering projects, and ongoing learning." 
            className="mb-0"
          />
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-gray-500 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 px-3.5 py-1.5 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Status · 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.currentlyDoing.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            const CardWrapper = item.link ? 'a' : 'div';
            const wrapperProps = item.link ? {
              href: item.link,
              target: "_blank",
              rel: "noopener noreferrer",
            } : {};

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <CardWrapper
                  {...wrapperProps}
                  className={`h-full flex flex-col justify-between p-6 rounded-2xl bg-gray-50/90 dark:bg-[#0e0e0e] border border-gray-200/80 dark:border-neutral-800 hover:border-gray-400 dark:hover:border-neutral-600 transition-all duration-300 group ${item.link ? 'cursor-pointer hover:-translate-y-1' : ''}`}
                >
                  <div>
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                        <Icon size={20} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {item.badge}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">
                      {item.tag}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-2.5 flex items-center justify-between">
                      <span>{item.title}</span>
                      {item.link && (
                        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-300 shrink-0 ml-1" />
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights / Tags */}
                  <div className="pt-4 border-t border-gray-200/60 dark:border-neutral-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights?.map((hl, i) => (
                        <span 
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-200/60 dark:bg-neutral-900/90 text-gray-700 dark:text-gray-300 border border-gray-300/40 dark:border-neutral-800"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
