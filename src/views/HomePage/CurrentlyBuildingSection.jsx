'use client';

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
    <section className="py-20 md:py-28 bg-[#030303] text-[#f1eee8] border-t border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeading 
            kicker="06 / INITIATIVES"
            title="Currently Doing" 
            subtitle="Active pursuits, real-time engineering projects, and ongoing technical depth." 
            className="mb-0"
          />
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-[#aaa9a4] bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f97316]"></span>
            </span>
            <span className="text-[#f1eee8]">Live Status · 2026</span>
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
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <CardWrapper
                  {...wrapperProps}
                  className={`h-full flex flex-col justify-between p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 group ${item.link ? 'cursor-pointer hover:-translate-y-1' : ''}`}
                >
                  <div>
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f1eee8] group-hover:scale-105 transition-transform">
                        <Icon size={18} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#aaa9a4]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] shadow-[0_0_6px_rgba(249,115,22,0.6)]"></span>
                        {item.badge}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#aaa9a4] mb-1.5">
                      {item.tag}
                    </p>

                    {/* Title */}
                    <h3 className="text-base font-serif font-normal text-[#f1eee8] tracking-tight mb-2.5 flex items-center justify-between">
                      <span>{item.title}</span>
                      {item.link && (
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#aaa9a4] shrink-0 ml-1" />
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#aaa9a4] leading-relaxed font-light mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights / Tags */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights?.map((hl, i) => (
                        <span 
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-[#dcd8d0] border border-white/[0.06]"
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
