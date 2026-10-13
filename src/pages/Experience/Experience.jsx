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
    <section className="relative bg-gray-50 dark:bg-black transition-colors duration-300 py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-gray-900 dark:bg-white" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">
              Experience & Track Record
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
            Professional Experience & Hackathons
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl font-light text-base md:text-lg">
            Swipe right-to-left to explore open source contributions, software engineering internships, national hackathon podiums, and enterprise simulations.
          </p>
        </div>

        {/* Circular Swipe Cards Deck */}
        <CircularCardDeck
          items={experiences}
          aspectClass="min-h-[500px] md:min-h-[540px]"
          renderCard={(experience, index, { total }) => {
            const typeBadge = getTypeBadge(experience.type);
            return (
              <div className="w-full rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0c] shadow-2xl overflow-hidden transition-all duration-300">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-neutral-900 bg-gray-50/70 dark:bg-[#111111]/70">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">
                      0{index + 1} / 0{total}
                    </span>
                    <span className="h-3 w-[1px] bg-gray-300 dark:bg-neutral-800" />
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider bg-gray-200/80 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 rounded">
                      {typeBadge.icon}
                      <span>{typeBadge.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {experience.period}
                    </span>
                    {experience.link && (
                      <a
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gray-900 text-white dark:bg-white dark:text-black text-xs font-mono font-semibold hover:opacity-85 transition-opacity"
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
                      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-black border border-gray-200 dark:border-neutral-800 flex items-center justify-center text-gray-900 dark:text-white shrink-0 mt-1 shadow-sm">
                        {getIcon(experience.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {experience.title}
                          </h3>
                          {experience.role && (
                            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-gray-100 dark:bg-neutral-900 border border-gray-200/70 dark:border-neutral-800 text-gray-600 dark:text-neutral-300">
                              {experience.role}
                            </span>
                          )}
                        </div>
                        <p className="text-base font-medium text-gray-700 dark:text-neutral-300 mt-1 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          {experience.company}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-light pl-4 border-l-2 border-gray-300 dark:border-neutral-700">
                      {experience.description}
                    </p>

                    {/* Key Highlights */}
                    {experience.highlights && experience.highlights.length > 0 && (
                      <div className="p-5 rounded-xl border border-gray-100 dark:border-neutral-900 bg-gray-50/70 dark:bg-[#111111]/70 mt-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-neutral-500 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                          Key Impact & Milestones
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {experience.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 text-xs md:text-sm text-gray-700 dark:text-neutral-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white mt-1.5 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with Technologies & Action */}
                  <div className="pt-4 border-t border-gray-100 dark:border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {experience.technologies?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-neutral-300 rounded border border-gray-200/50 dark:border-neutral-800"
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gray-900 dark:text-white font-semibold hover:underline"
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
