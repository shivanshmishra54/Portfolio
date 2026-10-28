import React from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEOHead } from '../../components/layout/SEOHead';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { JourneyTimeline } from '../../components/ui/JourneyTimeline';

export default function JourneyPage() {
  return (
    <PageTransition>
      <SEOHead 
        title="Journey — Shivansh Mishra" 
        description="The chronological story of my engineering growth, education, and professional experience." 
      />
      
      <div className="flex flex-col w-full min-h-screen pt-32 pb-24 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-6 max-w-7xl mb-12">
          <SectionHeading 
            title="The Journey" 
            subtitle="How I got from where I started to where I am now." 
            centered={true}
          />
        </div>

        <JourneyTimeline />
      </div>
    </PageTransition>
  );
}
