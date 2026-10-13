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
    <section className="relative bg-white dark:bg-[#0a0a0a] transition-colors duration-300 py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-gray-900 dark:bg-white" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">
              Academic Foundation
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
            Educational Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl font-light text-base md:text-lg">
            Swipe right-to-left to review academic excellence shaping software engineering principles, distributed systems, and algorithmic problem solving.
          </p>
        </div>

        {/* Circular Swipe Cards Deck */}
        <CircularCardDeck
          items={educationData}
          aspectClass="min-h-[460px] md:min-h-[500px]"
          renderCard={(education, index, { total }) => (
            <div className="w-full rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0c] shadow-2xl overflow-hidden transition-all duration-300">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-neutral-900 bg-gray-50/70 dark:bg-[#111111]/70">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">
                    0{index + 1} / 0{total}
                  </span>
                  <span className="h-3 w-[1px] bg-gray-300 dark:bg-neutral-800" />
                  <span className="px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-neutral-200 rounded border border-gray-200 dark:border-neutral-800">
                    {getTierBadge(index)}
                  </span>
                </div>

                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {education.period || education.year}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-black border border-gray-200 dark:border-neutral-800 flex items-center justify-center text-gray-900 dark:text-white shrink-0 mt-1 shadow-sm">
                      {getIcon(index)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {education.degree}
                      </h3>
                      <p className="text-base font-medium text-gray-700 dark:text-neutral-300 mt-1 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        {education.institution || education.school}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-light pl-4 border-l-2 border-gray-300 dark:border-neutral-700">
                    {education.description}
                  </p>

                  {/* Academic Highlights */}
                  {education.achievements && education.achievements.length > 0 && (
                    <div className="p-5 rounded-xl border border-gray-100 dark:border-neutral-900 bg-gray-50/70 dark:bg-[#111111]/70 mt-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-neutral-500 mb-3 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                        Honors & Accomplishments
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {education.achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 text-xs font-semibold text-gray-900 dark:text-white shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Curriculum & Key Topics */}
                {education.skills && education.skills.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 dark:border-neutral-900 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-neutral-500">
                      Core Curriculum:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {education.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 text-xs font-mono bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-neutral-300 rounded border border-gray-200/50 dark:border-neutral-800"
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
