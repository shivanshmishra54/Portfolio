import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThreeScene } from '../../components/3d';
import { profile } from '../../data/profile';
import { useAvatarState, AvatarState } from '../../components/3d/AvatarContext';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';

function OrbitingCloud({ path, label, phase, setHovering }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { setAvatarState, setActiveCloud } = useAvatarState();
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((t) => {
    if (prefersReducedMotion) return;
    
    // Continuous smooth orbit math
    const timeInSeconds = t / 1000;
    const speed = 0.4;
    
    // Adjust orbit radii based on viewport size
    const isMobile = window.innerWidth < 768;
    // Keep radiusX wide enough to orbit the centered text on desktop
    const radiusX = isMobile ? window.innerWidth * 0.35 : Math.min(500, window.innerWidth * 0.35);
    const radiusY = isMobile ? 40 : 100;
    
    const angle = timeInSeconds * speed + phase;
    
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    
    // Depth (scale and brightness) based on Z position
    const z = Math.sin(angle); // 1 = front, -1 = back
    // Hover overrides scale slightly, but retains base depth
    const baseScale = 1 + z * 0.15;
    const activeScale = isHovered ? baseScale * 1.05 : baseScale;
    
    if (ref.current) {
      ref.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${activeScale})`;
      ref.current.style.zIndex = z > 0 ? 30 : 10;
      ref.current.style.filter = `brightness(${1 + (z * 0.1) + (isHovered ? 0.1 : 0)})`;
    }
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHovering(true);
    setActiveCloud(path);
    setAvatarState(path === 'freelancer' ? AvatarState.HAPPY : AvatarState.FOCUSED);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHovering(false);
    setActiveCloud(null);
  };

  return (
    <button
      ref={ref}
      onClick={() => setHovering('clicked')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-label={`Explore ${label} path`}
      className={`
        absolute top-1/2 left-1/2 pointer-events-auto flex items-center justify-center
        w-36 h-24 md:w-52 md:h-32 rounded-[45%] md:rounded-[50%]
        bg-white/85 dark:bg-gray-900/85 backdrop-blur-md
        shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)]
        border border-white/40 dark:border-gray-700/40
        transition-colors duration-300 hover:bg-white dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white
      `}
      style={prefersReducedMotion ? {
        transform: `translate(calc(-50% + ${phase === 0 ? -150 : 150}px), -50%)`
      } : {}}
    >
      <span className="text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white text-center px-4">
        {label}
      </span>
    </button>
  );
}

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const { setAvatarState, setActiveCloud } = useAvatarState();
  const navigate = useNavigate();
  const [transitioningTo, setTransitioningTo] = useState(null);

  // Text content parallax - reduced slightly for the split layout
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleCloudClick = (path, state) => {
    if (transitioningTo) return;
    setAvatarState(state);
    setActiveCloud(path);
    setTransitioningTo(path);
    setTimeout(() => {
      navigate(`/${path}`);
      setActiveCloud(null);
    }, 1500);
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[850px] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-black pt-10">
      
      {/* 3D Canvas constrained to the entire screen. usePlaceholder is TRUE. */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <ThreeScene usePlaceholder={true} />
      </div>

      {/* Orbiting Clouds wrapper centered on the full screen */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <OrbitingCloud 
          path="freelancer" 
          label="Freelancer" 
          phase={0} 
          setHovering={(v) => v === 'clicked' ? handleCloudClick('freelancer', AvatarState.GREETING) : (!transitioningTo && !v && setAvatarState(AvatarState.IDLE))}
        />
        <OrbitingCloud 
          path="developer" 
          label="Software Developer" 
          phase={Math.PI} // 180 degrees opposite
          setHovering={(v) => v === 'clicked' ? handleCloudClick('developer', AvatarState.THINKING) : (!transitioningTo && !v && setAvatarState(AvatarState.IDLE))}
        />
      </div>

      {/* CENTERED: Text Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 w-full flex flex-col justify-center items-center px-6 pointer-events-none pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white uppercase mb-4 drop-shadow-sm text-center leading-none">
            {profile.name}
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 tracking-[0.2em] font-light uppercase text-center leading-relaxed md:leading-loose max-w-2xl">
            {profile.tagline.split(' · ').map((part, index, array) => (
              <span key={index} className="inline-block whitespace-nowrap">
                {part}
                {index < array.length - 1 && <span className="mx-2 md:mx-3 opacity-30">/</span>}
              </span>
            ))}
          </p>
        </motion.div>
      </motion.div>

      {/* Cinematic Transition Overlay */}
      <AnimatePresence>
        {transitioningTo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`fixed inset-0 z-50 transition-colors duration-700 pointer-events-none
              ${transitioningTo === 'freelancer' ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md' : 'bg-gray-900/95 dark:bg-black/95 backdrop-blur-md'}
            `}
          />
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase font-medium">Scroll to explore</span>
        <motion.div 
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-gray-400 to-transparent"
        />
      </motion.div>

    </section>
  );
}
