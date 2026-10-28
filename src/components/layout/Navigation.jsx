'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useContactModal } from '../ui/ContactContext';
import { SignalText } from '../ui/SignalText';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useContactModal();
  const { scrollYProgress } = useScroll();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Developer', path: '/developer' },
    { label: 'Freelancer', path: '/freelancer' },
    { label: 'Journey', path: '/journey' },
    { label: 'In Motion', path: '/3d-lab' },
  ];

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* 1. Kinetic Top Scroll Progress Bar */}
      <div 
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#0c0c0c]/90 z-[70] pointer-events-none"
      >
        <motion.div 
          className="h-full bg-[#f97316] origin-left shadow-[0_0_8px_rgba(249,115,22,0.45)]"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* 2. Wide Inset Header with Rounded-Rectangle Corners (Sarthak Reference) */}
      <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-11.5%)] max-w-[1240px] pointer-events-none">
        <div className="pointer-events-auto w-full rounded-[22px] sm:rounded-[30px] bg-[#080808]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.7)] px-5 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between transition-all duration-300">
          
          {/* Wordmark (Instrument Serif Editorial) */}
          <Link 
            href="/" 
            prefetch={true}
            className="group flex items-baseline text-xl sm:text-2xl font-serif text-[#f1eee8] tracking-tight hover:opacity-85 transition-opacity"
          >
            <span>Shivansh</span>
            <span className="italic font-normal text-[#aaa9a4] ml-1.5 group-hover:text-[#f1eee8] transition-colors">
              Mishra
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.label}
                  href={item.path}
                  prefetch={true}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide transition-colors duration-200 ${
                    active 
                      ? 'text-[#f1eee8] font-medium' 
                      : 'text-[#aaa9a4] hover:text-[#f1eee8]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill-active"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <SignalText scrambleOnHover={true}>{item.label}</SignalText>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Sarthak Reference "Let's talk ↗" Pill Button (Theme toggle moved to footer) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => openModal('neutral')}
              className="px-5 py-2 rounded-full bg-[#1c1c1c]/90 hover:bg-[#252525] border border-white/[0.14] text-[#f1eee8] text-xs font-sans font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Let's talk — open contact form"
            >
              <span>Let's talk</span>
              <ArrowUpRight size={13} className="text-[#aaa9a4]" />
            </button>
          </div>

          {/* Mobile Right Controls (< 768px) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => openModal('neutral')}
              className="px-3.5 py-1.5 rounded-full bg-[#1c1c1c]/90 hover:bg-[#252525] border border-white/[0.14] text-[#f1eee8] text-xs font-sans font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Talk — open contact form"
            >
              <span>Talk</span>
              <ArrowUpRight size={12} className="text-[#aaa9a4]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.12] bg-[#1c1c1c]/90 hover:bg-[#252525] text-xs font-mono uppercase tracking-wider text-[#f1eee8] transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Toggle navigation menu"
            >
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              {mobileMenuOpen ? <X size={13} /> : <Menu size={13} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto mt-2 w-full rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-white/[0.08] p-5 shadow-2xl flex flex-col gap-3"
            >
              {navLinks.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-serif tracking-tight py-1.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                      active ? 'bg-white/[0.06] text-[#f1eee8]' : 'text-[#aaa9a4] hover:text-[#f1eee8]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={13} className="text-[#aaa9a4]" />
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal('neutral');
                  }}
                  className="w-full py-2.5 rounded-full bg-[#f1eee8] text-[#030303] text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>Let's talk</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
