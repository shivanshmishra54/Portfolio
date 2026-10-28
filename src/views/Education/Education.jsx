'use client';

import React from "react";
import {
  Award,
  Calendar,
  BookOpen,
  GraduationCap,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { education as educationData } from "@/data/education";
import { CircularCardDeck } from "@/components/ui/CircularCardDeck";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";

export default function EducationSection() {
  const getTierBadge = (idx) => {
    switch (idx) {
      case 0:
        return "Undergraduate Engineering";
      case 1:
        return "Higher Secondary (HSC)";
      default:
        return "Secondary School (SSC)";
    }
  };

  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return <GraduationCap className="w-6 h-6" />;
      case 1:
        return <Trophy className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <section className="relative bg-[#030303] text-[#f1eee8] transition-colors duration-300 py-24 md:py-32 overflow-hidden border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col mb-10">
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">08 / ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08] mb-4">
            <AnimeTextReveal trigger="visible">Educational Journey</AnimeTextReveal>
          </h2>
          <p className="text-[#aaa9a4] max-w-2xl font-light text-base md:text-lg leading-relaxed">
            Academic rigor shaping software engineering principles, distributed systems architectures, and algorithmic problem solving.
          </p>
        </div>

        {/* Circular Swipe Cards Deck */}
        <CircularCardDeck
          items={educationData}
          aspectClass="min-h-[460px] md:min-h-[500px]"
          renderCard={(education, index, { total }) => (
            <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl overflow-hidden transition-all duration-300">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#080808]/90">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#aaa9a4]">
                    0{index + 1} / 0{total}
                  </span>
                  <span className="h-3 w-[1px] bg-white/[0.12]" />
                  <span className="px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-[#f1eee8] rounded-full border border-white/[0.08]">
                    {getTierBadge(index)}
                  </span>
                </div>

                <span className="text-xs font-mono uppercase tracking-wider text-[#aaa9a4] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {education.period || education.year}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#f1eee8] shrink-0 mt-1 shadow-sm">
                      {getIcon(index)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal tracking-tight text-[#f1eee8]">
                        {education.degree}
                      </h3>
                      <p className="text-sm font-mono text-[#aaa9a4] mt-1 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#aaa9a4]" />
                        {education.institution || education.school}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-[#dcd8d0] leading-relaxed font-light pl-4 border-l-2 border-white/[0.15]">
                    {education.description}
                  </p>

                  {/* Academic Highlights */}
                  {education.achievements && education.achievements.length > 0 && (
                    <div className="p-5 rounded-xl border border-white/[0.08] bg-[#080808] mt-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#aaa9a4] mb-3 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-[#f97316]" />
                        Honors & Accomplishments
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {education.achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#f1eee8] shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#f97316]" />
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Curriculum & Key Topics */}
                {education.skills && education.skills.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#aaa9a4]">
                      Core Curriculum:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {education.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] text-[#dcd8d0] rounded border border-white/[0.06]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
