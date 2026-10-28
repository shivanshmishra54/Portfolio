'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { profile } from '../../data/profile';
import { useContactModal } from '../ui/ContactContext';
import { Github, Linkedin, Mail, FileText, Youtube, ArrowUp, Sun, Moon } from 'lucide-react';
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openModal } = useContactModal();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    { href: profile.social.github, icon: Github, label: 'GitHub' },
    { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: profile.social.leetcode, icon: SiLeetcode, label: 'LeetCode' },
    { href: profile.social.codechef, icon: SiCodechef, label: 'CodeChef' },
    { href: profile.social.codeforces, icon: SiCodeforces, label: 'Codeforces' },
    { href: profile.social.youtube, icon: Youtube, label: 'YouTube' },
    { href: profile.social.email, icon: Mail, label: 'Email' },
    { href: profile.resume, icon: FileText, label: 'Resume' },
  ].filter(item => Boolean(item.href));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-16 sm:py-24 bg-[#030303] text-[#f1eee8] border-t border-white/[0.08] relative z-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">

          {/* Identity & Presence Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl sm:text-3xl font-serif tracking-tight text-[#f1eee8]">
                  Shivansh <em className="italic text-[#aaa9a4] font-normal">Mishra</em>
                </span>
              </Link>
              <p className="text-[#aaa9a4] max-w-md text-sm sm:text-base font-normal leading-relaxed mb-6">
                {profile.tagline || 'Building resilient distributed microservices, low-latency engines, and production full-stack systems.'}
              </p>

              {/* Live status badge with warm orange indicator */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#aaa9a4]">
                <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                <span className="text-[11px] uppercase tracking-wider">Available for high-impact roles & projects</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-8">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="p-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#aaa9a4] hover:text-[#f1eee8] hover:border-white/[0.25] hover:bg-white/[0.06] transition-all duration-200"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={16} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Paths Column */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#aaa9a4] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
              <span>01 / Paths</span>
            </h3>
            <ul className="space-y-3 text-sm font-normal">
              <li>
                <Link href="/developer" className="text-[#aaa9a4] hover:text-[#f1eee8] transition-colors flex items-center justify-between group">
                  <span>Software Developer</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </Link>
              </li>
              <li>
                <Link href="/freelancer" className="text-[#aaa9a4] hover:text-[#f1eee8] transition-colors flex items-center justify-between group">
                  <span>Freelance Services</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </Link>
              </li>
              <li>
                <Link href="/journey" className="text-[#aaa9a4] hover:text-[#f1eee8] transition-colors flex items-center justify-between group">
                  <span>Journey & Milestones</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </Link>
              </li>
              <li>
                <Link href="/3d-lab" className="text-[#aaa9a4] hover:text-[#f1eee8] transition-colors flex items-center justify-between group">
                  <span>In Motion (See My Life)</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#aaa9a4] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
              <span>02 / Direct</span>
            </h3>
            <ul className="space-y-3 text-sm font-normal">
              <li>
                <button
                  onClick={() => openModal('neutral')}
                  className="text-[#aaa9a4] hover:text-[#f1eee8] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Initiate Contact</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </button>
              </li>
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#aaa9a4] hover:text-[#f1eee8] transition-colors flex items-center justify-between group"
                >
                  <span>View Resume</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#aaa9a4] hover:text-[#f1eee8] transition-colors flex items-center justify-between group"
                >
                  <span>GitHub Repositories</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar with Editorial Theme Toggle */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#aaa9a4]">
          <p>© {currentYear} Shivansh Mishra. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.2] text-[#f1eee8] transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={12} className="text-[#f97316]" />
                    <span className="text-[10px] tracking-wider uppercase">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={12} className="text-[#f97316]" />
                    <span className="text-[10px] tracking-wider uppercase">Light Mode</span>
                  </>
                )}
              </button>
            )}
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#aaa9a4] hover:text-[#f1eee8] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
