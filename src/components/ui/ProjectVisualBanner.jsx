import React from 'react';
import PropTypes from 'prop-types';
import { Terminal, Code2, Server, Cpu } from 'lucide-react';

export function ProjectVisualBanner({ 
  title, 
  category = "System", 
  tags = [], 
  image = null,
  className = "" 
}) {
  if (image) {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-gray-100 dark:bg-neutral-900 ${className}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  // Pure monochrome editorial typographic banner
  const getCategoryIcon = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'backend':
        return <Server className="w-4 h-4 text-gray-700 dark:text-gray-300" />;
      case 'fullstack':
        return <Code2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />;
      default:
        return <Terminal className="w-4 h-4 text-gray-700 dark:text-gray-300" />;
    }
  };

  return (
    <div 
      className={`w-full h-full min-h-[220px] md:min-h-[280px] relative flex flex-col justify-between p-6 md:p-8 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-gray-50 via-gray-100/50 to-gray-50 dark:from-neutral-950 dark:via-[#0c0c0c] dark:to-neutral-950 overflow-hidden select-none group transition-all duration-300 hover:border-gray-400 dark:hover:border-neutral-700 ${className}`}
    >
      {/* Subtle background technical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 dark:opacity-50 pointer-events-none" />

      {/* Top Technical Metadata Bar */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm text-xs font-mono uppercase tracking-wider text-gray-700 dark:text-neutral-300">
          {getCategoryIcon(category)}
          <span>{category}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-gray-400 dark:text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span>CODEBASE READY</span>
        </div>
      </div>

      {/* Center Title Display */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center text-center">
        <div className="inline-block relative">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white uppercase transition-transform duration-300 group-hover:scale-[1.02]">
            {title}
          </h3>
          <div className="h-[2px] w-12 mx-auto bg-gray-900 dark:bg-white mt-3 opacity-60 group-hover:w-20 transition-all duration-300" />
        </div>
      </div>

      {/* Bottom Tech Indicators */}
      <div className="relative z-10 flex items-center justify-between w-full pt-4 border-t border-gray-200/60 dark:border-neutral-900 text-xs">
        <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400 dark:text-neutral-500">
          Production Architecture
        </span>
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1.5">
            {tags.slice(0, 3).map((t, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-white/80 dark:bg-neutral-900/80 border border-gray-200 dark:border-neutral-800 rounded text-gray-600 dark:text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Editorial Corner Crosshairs */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-300 dark:text-neutral-800 pointer-events-none">+</div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-300 dark:text-neutral-800 pointer-events-none">+</div>
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-gray-300 dark:text-neutral-800 pointer-events-none">+</div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-300 dark:text-neutral-800 pointer-events-none">+</div>
    </div>
  );
}

ProjectVisualBanner.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  tags: PropTypes.array,
  image: PropTypes.string,
  className: PropTypes.string,
};
