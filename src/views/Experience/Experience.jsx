'use client';

import React from "react";
import {
  Code2,
  Activity,
  Cpu,
  Layers,
  Network,
  Binary,
  Calendar,
  Briefcase,
  GitPullRequest,
  Trophy,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { experience as experiences } from "@/data/experience";
import { CircularCardDeck } from "@/components/ui/CircularCardDeck";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";

export default function ExperienceSection() {
  const getTypeBadge = (type) => {
    switch ((type || "").toLowerCase()) {
      case "opensource":
        return {
          label: "Open Source Contribution",
          icon: <GitPullRequest className="w-3.5 h-3.5" />,
        };
      case "hackathon":
        return {
          label: "National Hackathon",
          icon: <Trophy className="w-3.5 h-3.5" />,
        };
      case "work":
        return {
          label: "Work Experience",
          icon: <Briefcase className="w-3.5 h-3.5" />,
        };
      default:
        return {
          label: "Engineering Simulation",
          icon: <Layers className="w-3.5 h-3.5" />,
        };
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Github":
        return <GitPullRequest className="w-6 h-6" />;
      case "Cpu":
        return <Cpu className="w-6 h-6" />;
      case "Network":
        return <Network className="w-6 h-6" />;
      case "Binary":
        return <Binary className="w-6 h-6" />;
      case "Activity":
        return <Activity className="w-6 h-6" />;
      case "Layers":
        return <Layers className="w-6 h-6" />;
      default:
        return <Code2 className="w-6 h-6" />;
    }
  };

  return (
    <section className="relative bg-[#030303] text-[#f1eee8] transition-colors duration-300 py-24 md:py-32 overflow-hidden border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col mb-10">
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">07 / TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08] mb-4">
            <AnimeTextReveal trigger="visible">Professional Experience &amp; Hackathons</AnimeTextReveal>
          </h2>
          <p className="text-[#aaa9a4] max-w-2xl font-light text-base md:text-lg leading-relaxed">
            Swipe right-to-left to explore verified open source contributions, software engineering internships, national hackathon podiums, and enterprise simulations.
          </p>
        </div>

        {/* Circular Swipe Cards Deck */}
        <CircularCardDeck
          items={experiences}
          aspectClass="min-h-[500px] md:min-h-[540px]"
          renderCard={(experience, index, { total }) => {
            const typeBadge = getTypeBadge(experience.type);
            return (
              <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl overflow-hidden transition-all duration-300">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#080808]/90">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#aaa9a4]">
                      0{index + 1} / 0{total}
                    </span>
                    <span className="h-3 w-[1px] bg-white/[0.12]" />
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-[#f1eee8] rounded-full border border-white/[0.08]">
                      {typeBadge.icon}
                      <span>{typeBadge.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#aaa9a4] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {experience.period}
                    </span>
                    {experience.link && (
                      <a
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1eee8] text-[#030303] text-xs font-mono font-semibold hover:bg-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#f1eee8] shrink-0 mt-1 shadow-sm">
                        {getIcon(experience.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal tracking-tight text-[#f1eee8]">
                            {experience.title}
                          </h3>
                          {experience.role && (
                            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#aaa9a4]">
                              {experience.role}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-mono text-[#aaa9a4] mt-1 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#aaa9a4]" />
                          {experience.company}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-[#dcd8d0] leading-relaxed font-light pl-4 border-l-2 border-white/[0.15]">
                      {experience.description}
                    </p>

                    {/* Key Highlights */}
                    {experience.highlights && experience.highlights.length > 0 && (
                      <div className="p-5 rounded-xl border border-white/[0.08] bg-[#080808] mt-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#aaa9a4] mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#f97316]" />
                          Key Impact & Milestones
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {experience.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 text-xs md:text-sm text-[#dcd8d0] font-light"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] mt-1.5 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with Technologies & Action */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {experience.technologies?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] text-[#dcd8d0] rounded border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {experience.prLink && (
                      <a
                        href={experience.prLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#f1eee8] font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View Merged PR #5738</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
}
