import React from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEOHead } from '../../components/layout/SEOHead';
import { FreelancerHero } from './FreelancerHero';
import { ServicesSection } from './ServicesSection';
import { WhatICanBuildSection } from './WhatICanBuildSection';
import { FreelanceWorkSection } from './FreelanceWorkSection';
import { ProcessSection } from './ProcessSection';
import { TechCapabilitiesSection } from './TechCapabilitiesSection';
import { WhyWorkWithMeSection } from './WhyWorkWithMeSection';
import { FAQSection } from './FAQSection';
import { ProjectInquirySection } from './ProjectInquirySection';

export default function FreelancerPage() {
  return (
    <PageTransition>
      <SEOHead 
        title="Freelancer — Shivansh Mishra" 
        description="Hire Shivansh Mishra as a freelance software developer. Full-stack web development, backend APIs, React frontends, and complete software solutions." 
      />
      <div className="flex flex-col w-full min-h-screen">
        <div id="hero"><FreelancerHero /></div>
        <div id="services"><ServicesSection /></div>
        <div id="capabilities"><WhatICanBuildSection /></div>
        <div id="work"><FreelanceWorkSection /></div>
        <div id="process"><ProcessSection /></div>
        <div id="tech"><TechCapabilitiesSection /></div>
        <div id="why-me"><WhyWorkWithMeSection /></div>
        <div id="faq"><FAQSection /></div>
        <div id="inquiry"><ProjectInquirySection /></div>
      </div>
    </PageTransition>
  );
}
