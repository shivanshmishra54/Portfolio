import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 md:py-20 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Identity */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-4 block">
              {profile.name}
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
              {profile.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={profile.social.email} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Resume">
                <FileText size={20} />
              </a>
            </div>
          </div>

          {/* Paths */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Paths</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/freelancer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Freelancer
                </Link>
              </li>
              <li>
                <Link to="/developer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Software Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/developer/journey" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Journey
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, Tailwind & R3F.
          </p>
        </div>
      </div>
    </footer>
  );
}
