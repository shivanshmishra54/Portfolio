import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Briefcase, Loader2 } from 'lucide-react';
import { useAvatarState, AvatarState } from '../../components/3d/AvatarContext';

export function PathSelectorSection() {
  const { setAvatarState } = useAvatarState();
  const navigate = useNavigate();
  const [transitioningTo, setTransitioningTo] = useState(null);

  const handlePathSelect = (path, state) => {
    if (transitioningTo) return;
    
    // Set the state for the avatar to react
    setAvatarState(state);
    setTransitioningTo(path);
    
    // Scroll smoothly to top so user sees the avatar reacting
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Wait for cinematic effect then navigate
    setTimeout(() => {
      navigate(`/${path}`);
    }, 1500);
  };

  return (
    <section className="py-32 md:py-48 bg-gray-50 dark:bg-black relative">
      {/* Full-screen transition overlay */}
      <AnimatePresence>
        {transitioningTo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-700 pointer-events-none
              ${transitioningTo === 'freelancer' ? 'bg-white/90 dark:bg-black/90 backdrop-blur-sm' : 'bg-gray-900/90 dark:bg-black/95 backdrop-blur-md'}
            `}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              {transitioningTo === 'freelancer' ? (
                <>
                  <Briefcase size={64} className="text-gray-900 dark:text-white" strokeWidth={1} />
                  <h2 className="text-4xl font-bold tracking-tight uppercase text-gray-900 dark:text-white">
                    Client Solutions
                  </h2>
                </>
              ) : (
                <>
                  <Code size={64} className="text-white" strokeWidth={1} />
                  <h2 className="text-4xl font-bold tracking-tight uppercase text-white">
                    Engineering Systems
                  </h2>
                </>
              )}
              <Loader2 className={`animate-spin ${transitioningTo === 'freelancer' ? 'text-gray-900 dark:text-white' : 'text-white'}`} size={24} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-6">
            How would you like to work with me?
          </h2>
          <p className="text-xl font-light text-gray-600 dark:text-gray-400">
            Choose the path that matches what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Freelancer Path */}
          <button 
            onClick={() => handlePathSelect('freelancer', AvatarState.GREETING)}
            onMouseEnter={() => setAvatarState(AvatarState.HAPPY)}
            onMouseLeave={() => { if(!transitioningTo) setAvatarState(AvatarState.IDLE) }}
            className="group relative text-left overflow-hidden rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-900 dark:hover:border-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <Briefcase size={48} strokeWidth={1} className="text-gray-900 dark:text-white mb-8" />
                <h3 className="text-sm font-mono tracking-widest text-gray-500 mb-4 uppercase">Hire me as a</h3>
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-6">
                  Freelancer
                </h4>
                <p className="text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
                  Need a website, application, backend system, AI integration, or complete software solution?
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white group-hover:gap-5 transition-all">
                Explore Freelance Path <ArrowRight size={18} />
              </div>
            </div>
          </button>

          {/* Developer Path */}
          <button 
            onClick={() => handlePathSelect('developer', AvatarState.THINKING)}
            onMouseEnter={() => setAvatarState(AvatarState.FOCUSED)}
            onMouseLeave={() => { if(!transitioningTo) setAvatarState(AvatarState.IDLE) }}
            className="group relative text-left overflow-hidden rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-900 dark:hover:border-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <Code size={48} strokeWidth={1} className="text-gray-900 dark:text-white mb-8" />
                <h3 className="text-sm font-mono tracking-widest text-gray-500 mb-4 uppercase">Hire me as a</h3>
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-6">
                  Software Developer
                </h4>
                <p className="text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
                  Looking for a dedicated software developer to build reliable, scalable software in your engineering team?
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white group-hover:gap-5 transition-all">
                Explore Developer Path <ArrowRight size={18} />
              </div>
            </div>
          </button>

        </div>
      </div>
    </section>
  );
}
