'use client';

import React, { useState } from 'react';
import { ThreeScene } from '@/components/3d';
import { AvatarProvider } from '@/components/3d/AvatarContext';
import { InMotionJourney } from '@/components/character/InMotionJourney';
import { Sparkles, Globe2, ArrowLeft } from 'lucide-react';

export default function ThreeLab() {
  const [showGlobeView, setShowGlobeView] = useState(false);

  return (
    <AvatarProvider>
      <div className="relative w-full min-h-screen bg-[#030303] text-[#f1eee8]">
        
        {showGlobeView ? (
          /* ========================================================
             OPTIONAL MODE: 3D SPATIAL GLOBE & SHADER LAB
             Retained for full backward compatibility & spatial exploration
             ======================================================== */
          <div className="relative w-screen h-screen bg-[#030303] overflow-hidden">
            {/* Top HUD */}
            <div className="absolute top-24 left-6 md:left-10 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                <p className="text-[10px] font-mono tracking-[0.25em] text-[#f97316]/90 uppercase">01 / SPATIAL LAB</p>
              </div>
              <h1 className="text-2xl md:text-4xl font-serif text-[#f1eee8] tracking-tight">3D Spatial Globe</h1>
              <p className="text-xs font-mono text-[#aaa9a4]/70 mt-1">Interactive WebGL sphere · R3F · Skill node projection</p>
            </div>

            {/* Top Right: Return to 2D Character Story */}
            <div className="absolute top-24 right-6 md:right-10 z-20 pointer-events-auto">
              <button
                onClick={() => setShowGlobeView(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.15] bg-[#0c0c0c]/90 hover:border-white/[0.3] backdrop-blur-md text-xs font-mono text-[#f1eee8] transition-all cursor-pointer shadow-xl hover:scale-105"
              >
                <ArrowLeft size={13} className="text-[#f97316]" />
                <span>RETURN TO &ldquo;SEE MY LIFE&rdquo; STORY</span>
              </button>
            </div>

            {/* 3D Scene viewport */}
            <div className="w-full h-full">
              <ThreeScene usePlaceholder={true} />
            </div>
          </div>
        ) : (
          /* ========================================================
             PRIMARY EXPERIENCE: IN MOTION (SEE MY LIFE)
             Scroll-driven 2D character journey across 7 verified scenes
             ======================================================== */
          <InMotionJourney 
            showGlobeView={showGlobeView}
            onToggleGlobe={() => setShowGlobeView(true)}
          />
        )}

      </div>
    </AvatarProvider>
  );
}
