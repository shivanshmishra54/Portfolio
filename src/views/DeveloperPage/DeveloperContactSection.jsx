'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { ArrowRight, Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si';
import { useContactModal } from '../../components/ui/ContactContext';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

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
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] relative overflow-hidden border-t border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          <div className="flex items-center gap-2.5 mb-4 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">07 / CONNECT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.05] mb-6">
            <AnimeTextReveal trigger="visible">
              Let's build something <em className="italic font-normal text-[#dcd8d0]">scalable</em>.
            </AnimeTextReveal>
          </h2>
          
          <p className="text-base sm:text-lg text-[#aaa9a4] font-light max-w-2xl mb-10 leading-relaxed">
            Looking for a Software Engineer to join your engineering team? Let's discuss microservices architecture, clean code standards, and how I can contribute.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <button 
              onClick={() => openModal('developer')}
              className="editorial-btn-primary px-8 py-3.5 text-xs tracking-wider cursor-pointer shadow-xl"
            >
              <span>Initiate Conversation</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 text-[#aaa9a4]">
            {devSocials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="p-3 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#aaa9a4] hover:text-[#f1eee8] hover:border-white/[0.25] hover:bg-white/[0.06] transition-all duration-200"
                title={label}
                aria-label={label}
              >
                <Icon size={18} className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
