'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { getFeaturedProjects } from '../../data/projects';
import { Github, ArrowUpRight, Sparkles, Server, CheckCircle2 } from 'lucide-react';
import { ProjectVisualBanner } from '../../components/ui/ProjectVisualBanner';
import { CircularCardDeck } from '../../components/ui/CircularCardDeck';

export function SelectedWorkSection() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] transition-colors duration-300 overflow-hidden border-t border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col mb-10">
          <SectionHeading 
            kicker="04 / SELECTED WORK"
            title="Selected Work" 
            subtitle="Explore featured engineering architectures and verified client solutions." 
          />
        </div>

        {/* Circular Swipe Cards Deck */}
        <CircularCardDeck
          items={featured}
          aspectClass="min-h-[620px] md:min-h-[660px]"
          renderCard={(project, index, { total }) => (
            <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl overflow-hidden transition-all duration-300">
              {/* Card Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.08] bg-[#080808]/90">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#aaa9a4]">
                    0{index + 1} / 0{total}
                  </span>
                  <span className="h-3 w-[1px] bg-white/[0.12]" />
                  <span className="px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-[#f1eee8] rounded-full border border-white/[0.08]">
                    {project.category}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#aaa9a4]">
                    <span>•</span>
                    <span>Freelance & Engineering</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
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
              </div>

              {/* Card Body Grid */}
              <div className="p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
                {/* Left Column: Visual Banner, Title, Summary & Tech */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <ProjectVisualBanner
                    title={project.freelancer?.title || project.developer?.title.split('—')[0].trim()}
                    category={project.category}
                    tags={(project.developer?.technologies || project.freelancer?.features || []).slice(0, 3)}
                    image={project.image}
                    className="h-44 md:h-52"
                  />

                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight text-[#f1eee8] mb-2">
                      {project.freelancer?.title || project.developer?.title}
                    </h3>
                    <p className="text-sm font-light text-[#aaa9a4] leading-relaxed mb-4">
                      {project.freelancer?.summary || project.developer?.overview}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(project.developer?.technologies || project.freelancer?.features || []).slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] text-[#dcd8d0] rounded border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Path Quicklinks */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.08] text-xs font-mono">
                      <Link
                        href="/developer"
                        className="inline-flex items-center gap-1 text-[#aaa9a4] hover:text-[#f1eee8] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Developer Path</span>
                        <ArrowUpRight size={12} />
                      </Link>
                      <span className="text-white/[0.2]">•</span>
                      <Link
                        href="/freelancer"
                        className="inline-flex items-center gap-1 text-[#aaa9a4] hover:text-[#f1eee8] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Freelancer Path</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Column: Both Freelancer & Developer Perspectives */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Client / Freelance Lens */}
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#080808]">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#aaa9a4] mb-2.5 flex items-center gap-2">
                      <Sparkles size={14} className="text-[#f1eee8]" />
                      <span>Freelance Perspective · Client Solution</span>
                    </h4>
                    <p className="text-xs md:text-sm text-[#aaa9a4] leading-relaxed mb-3">
                      <strong className="text-[#f1eee8] font-semibold">Problem: </strong>
                      {project.freelancer?.problem}
                    </p>
                    {project.freelancer?.outcome && (
                      <div className="flex items-start gap-2 pt-2 border-t border-white/[0.08]">
                        <CheckCircle2 size={14} className="text-[#f97316] shrink-0 mt-0.5" />
                        <p className="text-xs font-mono text-[#f1eee8]">
                          <span className="uppercase text-[#aaa9a4] font-semibold">Delivered Impact: </span>
                          {project.freelancer.outcome}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Systems Engineering Lens */}
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#080808]">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#aaa9a4] mb-2.5 flex items-center gap-2">
                      <Server size={14} className="text-[#f1eee8]" />
                      <span>Developer Perspective · Architecture</span>
                    </h4>
                    <p className="text-xs md:text-sm text-[#aaa9a4] leading-relaxed mb-3">
                      {project.developer?.architecture?.description || project.developer?.overview}
                    </p>
                    {project.developer?.engineeringDecisions && project.developer.engineeringDecisions.length > 0 && (
                      <div className="pt-2 border-t border-white/[0.08]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#aaa9a4] block mb-1.5">
                          Engineering Decisions:
                        </span>
                        <ul className="space-y-1">
                          {project.developer.engineeringDecisions.slice(0, 2).map((dec, i) => (
                            <li key={i} className="text-xs text-[#dcd8d0] flex items-start gap-2 font-mono">
                              <span className="text-[#aaa9a4]">•</span>
                              <span>{dec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
