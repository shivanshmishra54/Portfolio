import { PageTransition } from '../../components/layout/PageTransition';
import { SEOHead } from '../../components/layout/SEOHead';
import { DeveloperHero } from './DeveloperHero';
import { ArchitectureSection } from './ArchitectureSection';
import { TechnicalSkillsSection } from './TechnicalSkillsSection';
import { EngineeringProjectsSection } from './EngineeringProjectsSection';
import { ProblemSolvingSection } from './ProblemSolvingSection';
import { CodingProfilesSection } from './CodingProfilesSection';
import { DeveloperContactSection } from './DeveloperContactSection';

// Shared Portfolio sections
import ExperienceSection from '../Experience/Experience';
import Education from '../Education/Education';
import Certificates from '../Certificates/Certificates';

export default function DeveloperPage() {
  return (
    <PageTransition>
      <SEOHead 
        title="Software Engineer — Shivansh Mishra" 
        description="Explore my software engineering portfolio, technical skills, system architecture approach, and projects." 
      />
      <div className="flex flex-col w-full min-h-screen">
        <div id="hero"><DeveloperHero /></div>
        <div id="engineering-profile"><ArchitectureSection /></div>
        <div id="skills"><TechnicalSkillsSection /></div>
        <div id="projects"><EngineeringProjectsSection /></div>
        <div id="problem-solving"><ProblemSolvingSection /></div>
        <div id="coding-profiles"><CodingProfilesSection /></div>
        <div id="experience"><ExperienceSection /></div>
        <div id="education"><Education /></div>
        <div id="certifications"><Certificates /></div>
        <div id="contact"><DeveloperContactSection /></div>
      </div>
    </PageTransition>
  );
}
