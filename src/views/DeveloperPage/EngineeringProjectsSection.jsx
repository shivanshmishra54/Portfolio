'use client';

import React from 'react';
import { getDeveloperProjects } from '../../data/projects';
import { ArrowUpRight, Github, Database, Server, Workflow } from 'lucide-react';
import { ProjectVisualBanner } from '../../components/ui/ProjectVisualBanner';
import { CircularCardDeck } from '../../components/ui/CircularCardDeck';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

export function EngineeringProjectsSection() {
  const projects = getDeveloperProjects();

  return (
    <section className="relative bg-[#030303] text-[#f1eee8] transition-colors duration-300 py-24 md:py-32 overflow-hidden border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col mb-10">
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">04 / SYSTEMS &amp; ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08] mb-4">
            <AnimeTextReveal trigger="visible">Selected Systems</AnimeTextReveal>
          </h2>
          <p className="text-[#aaa9a4] max-w-2xl font-light text-base md:text-lg leading-relaxed">
            Swipe right-to-left to explore scalable backend architectures, distributed services, and full-stack engineering implementations.
          </p>
        </div>

        {/* Circular Swipe Cards Deck */}
        <CircularCardDeck
          items={projects}
          aspectClass="min-h-[580px] md:min-h-[620px]"
          renderCard={(project, index, { total }) => (
            <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl overflow-hidden transition-all duration-300">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#080808]/90">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#aaa9a4]">
                    0{index + 1} / 0{total}
                  </span>
                  <span className="h-3 w-[1px] bg-white/[0.12]" />
                  <span className="px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-[#f1eee8] rounded-full border border-white/[0.08]">
                    {project.category}
                  </span>
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#f1eee8] text-[#030303] font-semibold hover:bg-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={13} />
                    <span>Source</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>

              {/* Card Body Grid */}
              <div className="p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Visual Typography Banner & Tech Tags */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <ProjectVisualBanner
                    title={project.developer.title.split('—')[0].trim()}
                    category={project.category}
                    tags={project.developer.technologies?.slice(0, 3)}
                    image={project.image}
                    className="h-44 md:h-52"
                  />

                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight text-[#f1eee8] mb-2">
                      {project.developer.title}
                    </h3>
                    <p className="text-sm text-[#aaa9a4] leading-relaxed font-light mb-4">
                      {project.developer.overview}
                    </p>

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.developer.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] text-[#dcd8d0] rounded border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Architectural Depth & Engineering Decisions */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                  {/* System Architecture Block */}
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#080808]">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#aaa9a4] mb-3 flex items-center gap-2">
                      <Workflow size={14} className="text-[#f1eee8]" /> System Architecture & Decisions
                    </h4>
                    <p className="text-sm text-[#f1eee8] leading-relaxed mb-3">
                      {project.developer.architecture?.description}
                    </p>

                    {project.developer.engineeringDecisions && (
                      <div className="pt-3 border-t border-white/[0.08]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#aaa9a4] block mb-2">
                          Key Decisions:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#aaa9a4]">
                          {project.developer.engineeringDecisions.map((dec, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />
                              <span className="text-[#dcd8d0]">{dec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Technical Challenges Block */}
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#080808]">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#aaa9a4] mb-3 flex items-center gap-2">
                      <Server size={14} className="text-[#f1eee8]" /> Engineering Challenges
                    </h4>
                    <ul className="space-y-2">
                      {project.developer.challenges?.map((challenge, i) => (
                        <li
                          key={i}
                          className="text-xs md:text-sm text-[#aaa9a4] flex items-start gap-2.5 font-light"
                        >
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-white/[0.3] shrink-0" />
                          <span className="leading-relaxed">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-[#aaa9a4]">
                      STATUS: PRODUCTION READY
                    </span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1eee8] text-[#030303] font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={14} /> Explore Repository
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
