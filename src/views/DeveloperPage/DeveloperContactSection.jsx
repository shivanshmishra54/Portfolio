import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { ArrowRight, Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si';
import { useContactModal } from '../../components/ui/ContactContext';

export function DeveloperContactSection() {
  const { openModal } = useContactModal();

  const devSocials = [
    { href: profile.social.github, icon: Github, label: 'GitHub' },
    { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: profile.social.youtube, icon: Youtube, label: 'YouTube' },
    { href: profile.social.leetcode, icon: SiLeetcode, label: 'LeetCode' },
    { href: profile.social.codeforces, icon: SiCodeforces, label: 'Codeforces' },
    { href: profile.social.codechef, icon: SiCodechef, label: 'CodeChef' },
    { href: profile.social.email, icon: Mail, label: 'Email' },
  ].filter(s => Boolean(s.href));
  
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

          <div className="flex flex-wrap justify-center items-center gap-5 text-gray-400">
            {devSocials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="hover:text-white transition-colors p-2.5 rounded-lg hover:bg-white/5"
                title={label}
                aria-label={label}
              >
                <Icon size={22} className="w-[22px] h-[22px]" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
