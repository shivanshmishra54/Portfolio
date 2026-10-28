import React from 'react';
import { buildCapabilities } from '../../data/services';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import { Globe, AppWindow, LayoutDashboard, Server, Shield, Brain, User, Briefcase, Code, Building, Cloud, Database, Link as LinkIcon, Wrench, PlusCircle, Bot } from 'lucide-react';

const iconMap = {
  Globe, AppWindow, LayoutDashboard, Server, Shield, Brain, User, Briefcase, Code, Building, Cloud, Database, Link: LinkIcon, Wrench, PlusCircle, Bot
};

export function WhatICanBuildSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <ScrollReveal
          delay={0}
          yOffset={20}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase mb-4">Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-4">
            What I Can Build
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl">
            From simple websites to complex, data-driven systems — here is what you can hire me to build.
          </p>
        </ScrollReveal>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildCapabilities.map((cap, index) => {
            const Icon = iconMap[cap.icon] || Globe;

            return (
              <ScrollReveal
                key={cap.id}
                delay={index * 0.08}
                yOffset={20}
                className="group p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-400 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300 h-full flex flex-col"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 mb-6 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <Icon size={24} className="text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                  {cap.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  {cap.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
