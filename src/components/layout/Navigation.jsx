import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useContactModal } from '../ui/ContactContext';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { openModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Determine context
  const getNavContext = () => {
    if (location.pathname.startsWith('/freelancer')) return navigation.freelancer;
    if (location.pathname.startsWith('/developer')) return navigation.developer;
    return navigation.homepage;
  };

  const currentNav = getNavContext();

  // Scroll to section on same page, or open modal for Contact/Connect
  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);
    
    if (item.label === 'Connect' || item.label === 'Contact') {
      e.preventDefault();
      let context = 'neutral';
      if (location.pathname.startsWith('/freelancer')) context = 'freelancer';
      else if (location.pathname.startsWith('/developer')) context = 'developer';
      openModal(context);
      return;
    }

    if (item.path.startsWith(location.pathname + '#')) {
      e.preventDefault();
      const id = item.path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase flex items-center gap-2"
        >
          {profile.name.split(' ')[0]}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-wrap justify-end max-w-[70%]">
          {currentNav.map((item) => {
            if (item.label === 'Path') {
              return (
                <div className="relative group cursor-pointer" key={item.label}>
                  <span className="text-[11px] lg:text-xs font-semibold tracking-wider uppercase transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center py-2">
                    {item.label}
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl py-2 flex flex-col min-w-[200px]">
                      <Link to="/freelancer" className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors whitespace-nowrap">Freelancer</Link>
                      <Link to="/developer" className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors whitespace-nowrap">Software Developer</Link>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.label === 'Connect' || item.label === 'Contact') {
              return (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-[11px] lg:text-xs font-semibold tracking-wider uppercase transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white py-2"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className="text-[11px] lg:text-xs font-semibold tracking-wider uppercase transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white py-2"
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-900 dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-xl py-6 px-6 md:hidden flex flex-col gap-4"
          >
            {currentNav.map((item) => {
              if (item.label === 'Path') {
                return (
                  <div key={item.label} className="flex flex-col gap-4 border-l-2 border-gray-100 dark:border-gray-800 pl-4 my-2">
                    <Link to="/freelancer" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wide uppercase transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Freelancer</Link>
                    <Link to="/developer" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wide uppercase transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Software Developer</Link>
                  </div>
                );
              }

              if (item.label === 'Connect' || item.label === 'Contact') {
                return (
                  <button
                    key={item.label}
                    onClick={(e) => handleNavClick(e, item)}
                    className="text-left text-sm font-semibold tracking-wide uppercase transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-sm font-semibold tracking-wide uppercase transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
