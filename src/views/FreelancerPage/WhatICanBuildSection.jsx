import React from 'react';
import { buildCapabilities } from '../../data/services';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';
import { Globe, AppWindow, LayoutDashboard, Server, Shield, Brain, User, Briefcase, Code, Building, Cloud, Database, Link as LinkIcon, Wrench, PlusCircle, Bot } from 'lucide-react';

const iconMap = {
  Globe, AppWindow, LayoutDashboard, Server, Shield, Brain, User, Briefcase, Code, Building, Cloud, Database, Link: LinkIcon, Wrench, PlusCircle, Bot
};

export function WhatICanBuildSection() {
  return (
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <ScrollReveal
          delay={0}
          yOffset={20}
          className="mb-14 md:mb-18"
        >
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">03 / CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08] mb-4">
            <AnimeTextReveal trigger="visible">What I Can Build</AnimeTextReveal>
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light text-[#aaa9a4] max-w-2xl leading-relaxed">
            From modern responsive client interfaces to complex, data-driven backend systems — here is what you can contract me to architect and deliver.
          </p>
        </ScrollReveal>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {buildCapabilities.map((cap, index) => {
            const Icon = iconMap[cap.icon] || Globe;

            return (
              <ScrollReveal
                key={cap.id}
                delay={index * 0.08}
                yOffset={20}
                className="group p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] hover:border-white/[0.22] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f1eee8] mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-serif font-normal tracking-tight text-[#f1eee8] mb-2.5">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#aaa9a4] leading-relaxed font-light">
                    {cap.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
