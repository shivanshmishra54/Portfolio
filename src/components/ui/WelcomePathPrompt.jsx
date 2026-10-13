import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Code2, ArrowRight } from 'lucide-react';

export function WelcomePathPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const autoDismissDuration = 5000; // 5 seconds
  const remainingTimeRef = useRef(autoDismissDuration);
  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Only show if not already dismissed in this session
    const hasSeen = sessionStorage.getItem('seen_path_prompt');
    if (hasSeen) return;

    // Trigger popup 3 seconds after page load
    const openTimer = setTimeout(() => {
      setIsVisible(true);
      startTimeRef.current = Date.now();
    }, 3000);

    return () => clearTimeout(openTimer);
  }, []);

  // Countdown timer with hover pause capability
  useEffect(() => {
    if (!isVisible) return;

    let lastTimestamp = Date.now();

    const tick = () => {
      const now = Date.now();
      const elapsed = now - lastTimestamp;
      lastTimestamp = now;

      if (!isPaused) {
        remainingTimeRef.current -= elapsed;
        const pct = Math.max(0, (remainingTimeRef.current / autoDismissDuration) * 100);
        setProgress(pct);

        if (remainingTimeRef.current <= 0) {
          handleDismiss();
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, isPaused]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('seen_path_prompt', 'true');
  };

  const handleSelectPath = (path) => {
    sessionStorage.setItem('seen_path_prompt', 'true');
    setIsVisible(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm sm:max-w-md bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-left"
          role="dialog"
          aria-label="Choose your portfolio path"
        >
          {/* Main Card Content */}
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 dark:bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900 dark:bg-white"></span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-500 dark:text-neutral-400 font-semibold">
                  Personalized Guide
                </span>
              </div>

              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close prompt"
              >
                <X size={16} />
              </button>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-1">
              What are you looking for today?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400 mb-5 leading-relaxed font-light">
              Are you here for development services or evaluating software engineering expertise?
            </p>

            {/* Path Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => handleSelectPath('/freelancer')}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#181818] hover:border-gray-400 dark:hover:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800 text-left transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                    <Briefcase size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white block uppercase tracking-wider">Freelancer</span>
                    <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-mono">Services & Projects</span>
                  </div>
                </div>
                <ArrowRight size={13} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => handleSelectPath('/developer')}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#181818] hover:border-gray-400 dark:hover:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800 text-left transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                    <Code2 size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white block uppercase tracking-wider">Developer</span>
                    <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-mono">Systems & Stack</span>
                  </div>
                </div>
                <ArrowRight size={13} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          {/* Countdown Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-neutral-900 h-1">
            <motion.div
              className="h-full bg-gray-900 dark:bg-white"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
