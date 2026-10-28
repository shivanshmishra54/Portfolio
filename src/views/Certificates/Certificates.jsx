'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Calendar, Eye, X } from 'lucide-react';
import { certificates } from '@/data/certificates';
import { AnimeTextReveal } from '@/components/ui/AnimeTextReveal';
import { CircularCardDeck } from '@/components/ui/CircularCardDeck';

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState(null);

  const getVerifyLabel = (pdfUrl) => {
    if (!pdfUrl) return 'Verified Credential';
    if (pdfUrl.includes('oracle.com')) return 'Verify Oracle Badge';
    if (pdfUrl.includes('hack2skill.com')) return 'Verify Hack2skill';
    if (pdfUrl.includes('hackerrank.com')) return 'Verify HackerRank';
    if (pdfUrl.includes('theforage.com')) return 'Verify Forage';
    if (pdfUrl.endsWith('.pdf')) return 'Open Certificate PDF';
    return 'Verify Credential';
  };

  return (
    <section id="certifications" className="relative scroll-mt-28 bg-[#030303] text-[#f1eee8] py-14 sm:py-16 md:py-20 overflow-hidden border-b border-white/[0.08]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">09 / CREDENTIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.1] mb-2 sm:mb-3">
            <AnimeTextReveal trigger="visible">Certifications &amp; Honors</AnimeTextReveal>
          </h2>
          <p className="text-[#aaa9a4] max-w-2xl font-light text-sm sm:text-base leading-relaxed">
            Swipe right-to-left to explore verified certifications across Software Engineering, Cloud Architecture, Artificial Intelligence, and Algorithmic Problem Solving.
          </p>
        </div>

        {/* Circular Swipe Cards Deck */}
        <CircularCardDeck
          items={certificates}
          aspectClass="min-h-[460px] sm:min-h-[420px] md:min-h-[350px] lg:min-h-[330px]"
          renderCard={(cert, index, { total }) => (
            <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl overflow-hidden transition-all duration-300">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-b border-white/[0.08] bg-[#080808]/90">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#aaa9a4]">
                    0{index + 1} / {total < 10 ? `0${total}` : total}
                  </span>
                  <span className="h-3 w-[1px] bg-white/[0.12]" />
                  <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-[#f1eee8] rounded-full border border-white/[0.08] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                    {cert.category}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#aaa9a4] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#aaa9a4]/80" />
                    {cert.date}
                  </span>
                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f1eee8] text-[#030303] text-[11px] font-mono font-semibold hover:bg-white transition-colors shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body - Compact Split Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Left Side: Certificate Image Preview */}
                <div className="md:col-span-5 relative bg-[#060606] border-b md:border-b-0 md:border-r border-white/[0.08] flex items-center justify-center p-3 sm:p-4 group/img overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full max-h-[160px] sm:max-h-[190px] md:max-h-[220px] object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-105 select-none"
                  />

                  {/* Hover Quick Preview Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(cert.image);
                      }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 border border-white/30 transition-all hover:scale-105 cursor-pointer shadow-xl"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Fullscreen</span>
                    </button>
                  </div>

                  {/* Issuer Overlay Tag */}
                  <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-mono text-[#f1eee8] flex items-center gap-1 border border-white/10 shadow-lg">
                    <ShieldCheck className="w-3 h-3 text-[#f97316]" />
                    <span>{cert.issuer}</span>
                  </div>
                </div>

                {/* Right Side: Credential Details */}
                <div className="md:col-span-7 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between space-y-2.5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#aaa9a4]/70">
                        ISSUED BY {cert.issuer.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-serif font-normal text-[#f1eee8] tracking-tight leading-snug">
                      {cert.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-[#aaa9a4] font-light leading-relaxed pl-2.5 border-l-2 border-white/[0.15] line-clamp-3 md:line-clamp-none">
                      {cert.description}
                    </p>

                    {/* Verified Skills / Topics */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="pt-1">
                        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#aaa9a4]/70 mb-1">
                          VERIFIED COMPETENCIES
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#f1eee8]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider bg-[#f1eee8] text-[#030303] hover:bg-white transition-all font-semibold shadow-md hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ShieldCheck className="w-3 h-3 text-[#030303]" />
                        <span>{getVerifyLabel(cert.pdfUrl)}</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-70" />
                      </a>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(cert.image);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#aaa9a4] hover:text-[#f1eee8] text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer hover:bg-white/[0.08]"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}
        />

      </div>

      {/* Fullscreen Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-5xl max-h-[90vh] bg-[#0c0c0c] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/[0.1] hover:bg-white/[0.2] text-[#f1eee8] p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImage}
                alt="Certificate High-Res Preview"
                className="max-h-[85vh] w-auto mx-auto object-contain rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
