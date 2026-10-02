import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useContactModal } from '../../components/ui/ContactContext';

export function DeveloperContactSection() {
  const { openModal } = useContactModal();
  
  return (
    <section className="py-32 bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Let's build something scalable.
          </h2>
          
          <p className="text-xl text-gray-400 font-light mb-16">
            Looking for a Software Developer to join your engineering team? Let's discuss architecture, code, and how I can contribute.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <button 
              onClick={() => openModal('developer')}
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors flex items-center gap-3"
            >
              Get in touch <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-8 text-gray-400">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={profile.social.email} className="hover:text-white transition-colors p-2">
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
