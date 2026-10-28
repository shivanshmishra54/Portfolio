'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { profile } from '../../data/profile';
import { useContactModal } from '../../components/ui/ContactContext';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

export function ProjectInquirySection() {
  const { openModal } = useContactModal();

  return (
    <section id="inquiry" className="py-24 md:py-32 bg-[#080808] border-t border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
              <p className="text-[11px] font-mono tracking-[0.25em] text-[#aaa9a4] uppercase">09 / ENGAGEMENT</p>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#f1eee8] mb-6 leading-tight">
              <AnimeTextReveal trigger="visible">
                Have an ambitious project in mind?
              </AnimeTextReveal>
            </h2>
            <p className="text-base md:text-lg font-light text-[#aaa9a4] mb-8 leading-relaxed max-w-md">
              Share your project vision, target timeline, and core requirements. I review every serious inquiry and respond within 24–48 hours.
            </p>

            {/* Contact info */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <a 
                href={`mailto:${profile.email}`} 
                className="inline-flex items-center gap-2 text-sm text-[#f1eee8] hover:text-white transition-colors font-mono"
              >
                <span className="text-white/40">Email:</span> {profile.email}
              </a>
              <div className="flex items-center gap-4 pt-2">
                {profile.social.github && (
                  <a 
                    href={profile.social.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-widest text-[#aaa9a4] hover:text-[#f1eee8] transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
                {profile.social.linkedin && (
                  <a 
                    href={profile.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-widest text-[#aaa9a4] hover:text-[#f1eee8] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Modal Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-start lg:justify-center"
          >
            <div className="p-8 md:p-10 rounded-3xl bg-[#0c0c0c] border border-white/[0.08] w-full max-w-md text-center">
              <h3 className="text-2xl font-serif text-[#f1eee8] mb-3">Direct Collaboration</h3>
              <p className="text-sm text-[#aaa9a4] mb-8 font-light">Open a structured project brief with scope, budget, and timeline estimates.</p>
              <button
                onClick={() => openModal('freelancer')}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#f1eee8] text-[#030303] text-xs font-medium tracking-widest uppercase rounded-full hover:bg-white transition-all shadow-lg"
              >
                <Send size={15} /> Open Project Inquiry
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
