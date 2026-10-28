'use client';

import React from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEOHead } from '../../components/layout/SEOHead';
import { HeroSection } from './HeroSection';
import { KineticProofStrip } from '../../components/ui/KineticProofStrip';
import { TypographicMarquee } from '../../components/ui/TypographicMarquee';
import { PerspectiveSwitcher } from '../../components/ui/PerspectiveSwitcher';
import { AboutSection } from './AboutSection';
import { SelectedWorkSection } from './SelectedWorkSection';
import { JourneyPreviewSection } from './JourneyPreviewSection';
import { CurrentlyBuildingSection } from './CurrentlyBuildingSection';
import { WelcomePathPrompt } from '../../components/ui/WelcomePathPrompt';
import { AvatarProvider } from '../../components/3d/AvatarContext';

export default function HomePage() {
  return (
    <PageTransition>
      <SEOHead 
        title="Overview" 
      />
      <AvatarProvider>
        <div className="flex flex-col w-full min-h-screen bg-[#030303] text-[#f1eee8]">
          <div id="hero"><HeroSection /></div>
          <div id="proof"><KineticProofStrip /></div>
          <TypographicMarquee />
          <div id="perspectives"><PerspectiveSwitcher /></div>
          <div id="about"><AboutSection /></div>
          <div id="work"><SelectedWorkSection /></div>
          <div id="journey"><JourneyPreviewSection /></div>
          <div id="now"><CurrentlyBuildingSection /></div>
          <WelcomePathPrompt />
        </div>
      </AvatarProvider>
    </PageTransition>
  );
}
