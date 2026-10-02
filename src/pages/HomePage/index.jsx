import React from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEOHead } from '../../components/layout/SEOHead';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { CapabilitiesSection } from './CapabilitiesSection';
import { SelectedWorkSection } from './SelectedWorkSection';
import { ProofSection } from './ProofSection';
import { JourneyPreviewSection } from './JourneyPreviewSection';
import { CurrentlyBuildingSection } from './CurrentlyBuildingSection';

import { AvatarProvider } from '../../components/3d/AvatarContext';

export default function HomePage() {
  return (
    <PageTransition>
      <SEOHead 
        title="Overview" 
      />
      <AvatarProvider>
        <div className="flex flex-col w-full min-h-screen">
          <div id="hero"><HeroSection /></div>
          <div id="about"><AboutSection /></div>
          <div id="capabilities"><CapabilitiesSection /></div>
          <div id="work"><SelectedWorkSection /></div>
          <div id="proof"><ProofSection /></div>
          <div id="journey"><JourneyPreviewSection /></div>
          <div id="now"><CurrentlyBuildingSection /></div>
        </div>
      </AvatarProvider>
    </PageTransition>
  );
}
