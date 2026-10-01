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
import { PathSelectorSection } from './PathSelectorSection';

export default function HomePage() {
  return (
    <PageTransition>
      <SEOHead 
        title="Overview" 
      />
      <div className="flex flex-col w-full min-h-screen">
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <SelectedWorkSection />
        <ProofSection />
        <JourneyPreviewSection />
        <CurrentlyBuildingSection />
        <PathSelectorSection />
      </div>
    </PageTransition>
  );
}
