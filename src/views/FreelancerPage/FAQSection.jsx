'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';

const faqs = [
  {
    question: "What is your typical process for a new project?",
    answer: "We start with a discovery call to understand your requirements, followed by a proposal and timeline. Once approved, I begin the design and development phases, keeping you updated with regular milestones."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, I work with clients globally. I am flexible with time zones and ensure smooth communication regardless of where you are located."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web technologies including React, Node.js, Next.js, and cloud infrastructure like AWS and Google Cloud. I choose the best stack based on the project's specific needs."
  },
  {
    question: "Do you provide maintenance after the project is completed?",
    answer: "Yes, I offer ongoing maintenance and support packages to ensure your application remains secure, up-to-date, and continues to perform optimally."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-[#030303] border-t border-white/[0.06]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-[#f97316]/90 uppercase">08 / ANSWERS</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#f1eee8] mb-4">
            <AnimeTextReveal trigger="visible">Frequently Asked Questions</AnimeTextReveal>
          </h2>
          <p className="text-base md:text-lg text-[#aaa9a4] max-w-2xl mx-auto font-light leading-relaxed">
            Direct clarity regarding freelance scope, collaboration workflows, turnaround times, and tech architecture.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0c0c0c] p-6 md:p-8 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] transition-colors"
            >
              <h3 className="text-lg md:text-xl font-serif text-[#f1eee8] mb-3">{faq.question}</h3>
              <p className="text-sm md:text-base text-[#aaa9a4] leading-relaxed font-light">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
