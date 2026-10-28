'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { storyScenes } from '../../data/characterStory';
import { CharacterParticleStage } from './CharacterParticleStage';
import { AnimeTextReveal } from '../ui/AnimeTextReveal';
import { 
  ArrowRight, 
  ArrowDown, 
  Code2, 
  Trophy, 
  GitPullRequest, 
  GraduationCap, 
  Compass, 
  Sparkles,
  ChevronRight,
  Globe2
} from 'lucide-react';

export function InMotionJourney({ onToggleGlobe, showGlobeView }) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  // Helper icons per scene
  const getSceneIcon = (index) => {
    switch (index) {
      case 0: return Sparkles;
      case 1: return GraduationCap;
      case 2: return Code2;
      case 3: return Code2;
      case 4: return Trophy;
      case 5: return GitPullRequest;
      case 6: return Compass;
      default: return Sparkles;
    }
  };

  // Continuous scroll progress calculation: 0.0 to (scenes.length - 1)
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const windowHeight = window.innerHeight;
    const centerY = windowHeight * 0.48;

    let detectedIdx = 0;
    let progress = 0;

    const refs = sectionRefs.current;
    for (let i = 0; i < refs.length; i++) {
      const el = refs[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height * 0.5;

      if (i === 0 && centerY < elCenter) {
        progress = 0;
        detectedIdx = 0;
        break;
      }

      if (i < refs.length - 1) {
        const nextEl = refs[i + 1];
        if (nextEl) {
          const nextRect = nextEl.getBoundingClientRect();
          const nextCenter = nextRect.top + nextRect.height * 0.5;

          if (centerY >= elCenter && centerY <= nextCenter) {
            const span = nextCenter - elCenter;
            const frac = span > 0 ? (centerY - elCenter) / span : 0;
            progress = i + frac;
            detectedIdx = frac > 0.5 ? i + 1 : i;
            break;
          }
        }
      } else {
        if (centerY >= elCenter) {
          progress = refs.length - 1;
          detectedIdx = refs.length - 1;
        }
      }
    }

    setScrollProgress(progress);
    setActiveSceneIndex(detectedIdx);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Smooth scroll to target scene
  const scrollToScene = (index) => {
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeScene = storyScenes[activeSceneIndex] || storyScenes[0];

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] text-[#f1eee8] pb-32">
      
      {/* Subtle Engineering Grid Backdrop */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* ========================================================
          1. TOP HERO HEADER: "SEE MY LIFE"
         ======================================================== */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-10 pt-24 sm:pt-28 pb-10 sm:pb-14 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#aaa9a4] uppercase">
              01 / IN MOTION · PERSONAL ODYSSEY
            </p>
          </div>
          
          {/* Main Page Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f1eee8] tracking-tight">
            See My <em className="italic text-[#aaa9a4] font-normal">Life</em>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#aaa9a4]/80 mt-2 max-w-xl leading-relaxed">
            Scroll-synchronized particle transformation journey of Shivansh Mishra&apos;s engineering evolution across 7 verified chapters.
          </p>
        </div>

        {/* Right Action: 3D Spatial Globe Toggle & Scroll Direction Hint */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onToggleGlobe}
            className="group pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.12] bg-[#0c0c0c]/90 hover:border-white/[0.3] backdrop-blur-md text-xs font-mono tracking-wider text-[#aaa9a4] hover:text-[#f1eee8] transition-all cursor-pointer shadow-lg hover:scale-105"
          >
            <Globe2 size={14} className="text-[#f97316] group-hover:rotate-45 transition-transform" />
            <span>{showGlobeView ? 'VIEW 2D CHARACTER STORY' : 'VIEW 3D SPATIAL LAB'}</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[#aaa9a4]">
            <ArrowDown size={12} className="animate-bounce text-[#f97316]" />
            <span>SCROLL TO ADVANCE</span>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. SCENE CHAPTERS & CHARACTER STAGE
         ======================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-6 sm:mt-10">
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* DESKTOP COLUMN 1: STICKY CHARACTER PARTICLE VIEWPORT */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start">
            <div className="relative w-full max-w-[390px] h-[520px] rounded-3xl bg-[#080808]/95 border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col items-center justify-between p-4 group">
              
              {/* Dynamic Ambient Background Glow in Restrained Warm Amber */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 pointer-events-none rounded-3xl blur-[50px] opacity-60 transition-all duration-700"
                style={{ background: activeScene.ambientGradient }}
              />

              {/* Top Sub-HUD: Chapter Counter */}
              <div className="relative z-20 w-full flex items-center justify-between px-3 py-1 text-[10px] font-mono text-[#aaa9a4] border-b border-white/[0.06] pb-2">
                <span className="flex items-center gap-1.5 text-[#f97316]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
                  SCROLL TRANSITION ENGINE
                </span>
                <span className="text-[#f1eee8]/80 font-bold">
                  CHAPTER {activeScene.number} / 07
                </span>
              </div>

              {/* Center Canvas: Scroll-Synchronized Particle Transformation Stage */}
              <div className="relative z-10 w-full flex-grow flex items-center justify-center py-2">
                <CharacterParticleStage
                  scenes={storyScenes}
                  activeSceneIndex={activeSceneIndex}
                  scrollProgress={scrollProgress}
                  width={340}
                  height={420}
                />
              </div>

              {/* Bottom State Pill */}
              <div className="relative z-20 w-full px-3 py-2 rounded-full bg-[#030303]/90 backdrop-blur-md border border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#aaa9a4] uppercase tracking-wider text-[10px]">CURRENT STATE</span>
                <span className="text-[#f1eee8] font-medium flex items-center gap-1.5">
                  <span 
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px]" 
                    style={{ backgroundColor: activeScene.accentColor, color: activeScene.accentColor }} 
                  />
                  {activeScene.poseLabel}
                </span>
              </div>

              {/* Corner Reticle Accents */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/30 pointer-events-none" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/30 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/30 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/30 pointer-events-none" />
            </div>

            {/* Sub-card: Chapter Mood & Philosophy */}
            <div className="mt-4 max-w-[390px] px-4 py-3 rounded-2xl bg-[#080808]/70 border border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#aaa9a4]">
              <span className="text-[10px] tracking-wider uppercase text-[#aaa9a4]/60">NARRATIVE THEME</span>
              <span className="text-[#f1eee8] font-medium">{activeScene.mood}</span>
            </div>
          </div>

          {/* COLUMN 2: 7 NARRATIVE CHAPTERS */}
          <div className="w-full lg:col-span-7 space-y-20 sm:space-y-28 py-6 lg:py-8">
            {storyScenes.map((scene, index) => {
              const ActiveIcon = getSceneIcon(index);

              return (
                <section
                  key={scene.id}
                  id={`scene-${index}`}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="relative min-h-[75vh] flex flex-col justify-center border-b border-white/[0.06] pb-16 sm:pb-24"
                >
                  {/* MOBILE CHARACTER CARD (Visible only on mobile / small screens) */}
                  <div className="block lg:hidden mb-8">
                    <div className="relative w-full max-w-[320px] mx-auto h-[380px] rounded-3xl bg-[#080808]/90 border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col items-center justify-between p-4">
                      {/* Ambient Bloom */}
                      <div 
                        aria-hidden="true" 
                        className="absolute inset-0 pointer-events-none blur-[40px] opacity-40"
                        style={{ background: scene.ambientGradient }}
                      />

                      <div className="relative z-10 w-full flex justify-between text-[10px] font-mono text-[#aaa9a4] pb-2 border-b border-white/[0.06]">
                        <span className="text-[#f97316] font-bold">CHAPTER {scene.number}</span>
                        <span>{scene.chapter}</span>
                      </div>

                      <img
                        src={scene.cutoutImage || scene.characterImage}
                        alt={`Shivansh Mishra Character - ${scene.title}`}
                        className="relative z-10 w-full h-[270px] object-contain filter contrast-[1.05] drop-shadow-xl select-none"
                      />

                      <div className="relative z-10 w-full px-3 py-1.5 rounded-full bg-[#030303]/85 border border-white/[0.08] flex items-center justify-between text-[10px] font-mono">
                        <span className="text-[#aaa9a4]">POSE</span>
                        <span className="text-[#f1eee8] font-medium">{scene.poseLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* NARRATIVE CONTENT */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5"
                  >
                    {/* Chapter Kicker */}
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-xs font-mono tracking-[0.25em] uppercase font-bold"
                        style={{ color: scene.accentColor }}
                      >
                        CHAPTER {scene.number} · {scene.chapter}
                      </span>
                      <span className="w-8 h-[1px] bg-white/[0.15]" />
                      <span className="text-[11px] font-mono text-[#aaa9a4] tracking-wide uppercase">
                        {scene.mood}
                      </span>
                    </div>

                    {/* Scene Title */}
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#f1eee8] tracking-tight leading-tight">
                      <AnimeTextReveal trigger="visible">
                        {scene.title}
                      </AnimeTextReveal>
                    </h2>

                    {/* Scene Subtitle */}
                    <p className="text-sm sm:text-base font-serif italic text-[#aaa9a4]">
                      &ldquo;{scene.subtitle}&rdquo;
                    </p>

                    {/* Scene Narrative Body */}
                    <p className="text-sm sm:text-base text-[#aaa9a4] font-light leading-relaxed max-w-2xl">
                      {scene.description}
                    </p>

                    {/* Scene Key Highlights Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {scene.highlights.map((item, i) => (
                        <div 
                          key={i} 
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-white/20 transition-colors"
                        >
                          <p className="text-[10px] font-mono tracking-widest uppercase text-[#aaa9a4]/70 mb-1">
                            {item.label}
                          </p>
                          <p className="text-xs sm:text-sm font-mono text-[#f1eee8] font-medium truncate">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Technical Environment Details */}
                    <div className="p-3.5 rounded-xl bg-[#080808] border border-white/[0.06] flex items-center gap-3 text-xs font-mono text-[#aaa9a4]">
                      <div className="p-2 rounded-lg bg-white/[0.05] text-[#f1eee8]">
                        <ActiveIcon size={15} style={{ color: scene.accentColor }} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                          {scene.technicalEnvironment.tag}
                        </span>
                        <span className="text-[#f1eee8]/90 text-[11px]">
                          {scene.technicalEnvironment.detail}
                        </span>
                      </div>
                    </div>

                    {/* Scene 7 Final Call to Action */}
                    {index === 6 && (
                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <Link
                          href="/developer"
                          className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f1eee8] text-[#030303] text-xs font-mono uppercase tracking-wider font-medium hover:bg-white transition-all shadow-lg hover:scale-105"
                        >
                          <span>Software Developer Path</span>
                          <ArrowRight size={13} />
                        </Link>
                        <Link
                          href="/freelancer"
                          className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.15] bg-white/[0.03] text-[#f1eee8] text-xs font-mono uppercase tracking-wider font-medium hover:border-white/30 hover:bg-white/[0.06] transition-all"
                        >
                          <span>Freelance Services</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </section>
              );
            })}
          </div>

        </div>

      </div>

      {/* ========================================================
          3. FLOATING HUD: CHAPTER PROGRESS & SCRUBBER PILLS
         ======================================================== */}
      <nav 
        aria-label="Scene Scrubber Navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full bg-[#080808]/90 border border-white/[0.12] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center gap-2 sm:gap-3 max-w-[95vw]"
      >
        <span className="hidden sm:inline-block text-[10px] font-mono text-[#aaa9a4] tracking-widest uppercase pr-1 border-r border-white/10">
          CHAPTER {storyScenes[activeSceneIndex]?.number || '01'} / 07
        </span>

        {/* Quick-Jump Scrubber Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {storyScenes.map((scene, index) => {
            const isCurrent = index === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => scrollToScene(index)}
                title={`Jump to Chapter ${scene.number}: ${scene.title}`}
                className={`transition-all cursor-pointer rounded-full flex items-center justify-center font-mono text-[10px] ${
                  isCurrent
                    ? 'w-7 sm:w-8 h-7 bg-[#f1eee8] text-[#030303] font-bold shadow-md scale-110'
                    : 'w-6 sm:w-7 h-6 sm:h-7 bg-white/[0.04] border border-white/[0.08] text-[#aaa9a4] hover:bg-white/[0.12] hover:text-[#f1eee8]'
                }`}
              >
                {scene.number}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            const nextIdx = (activeSceneIndex + 1) % storyScenes.length;
            scrollToScene(nextIdx);
          }}
          className="ml-1 p-1 rounded-full text-[#aaa9a4] hover:text-[#f1eee8] transition-colors"
          title="Next Chapter"
        >
          <ChevronRight size={14} />
        </button>
      </nav>

    </div>
  );
}
