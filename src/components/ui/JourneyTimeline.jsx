import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { journey } from '../../data/journey';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';

const TimelineNode = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative flex items-center justify-between w-full mb-16 md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Connector Line (Desktop Horizontal) */}
      <div 
        className="hidden md:block absolute top-1/2 left-1/2 w-full h-[1px] bg-white/[0.08] -translate-y-1/2 -z-10" 
        style={{ [isEven ? 'right' : 'left']: '50%', width: '50%' }} 
      />
      
      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Center Node */}
      <div className="relative z-10 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#080808] border border-white/[0.15] shadow-xl shrink-0 mx-4 md:mx-auto group">
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : (isEven ? 35 : -35) }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-5/12 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] p-6 md:p-8 hover:border-white/[0.22] hover:bg-[#101010] transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-mono tracking-widest uppercase text-[#aaa9a4]/80">
            {item.dateLabel}
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-[#f97316] bg-[#f97316]/10 px-2.5 py-0.5 rounded-full border border-[#f97316]/25">
            {item.category}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-serif text-[#f1eee8] mb-2 font-normal">
          {item.title}
        </h3>
        
        {item.organization && (
          <p className="text-xs font-mono uppercase tracking-wider text-[#aaa9a4] mb-3">
            {item.organization}
          </p>
        )}
        
        {item.description && (
          <p className="text-sm text-[#aaa9a4] leading-relaxed mb-4 font-light">
            {item.description}
          </p>
        )}

        {item.details && item.details.length > 0 && (
          <ul className="space-y-2 mt-4 border-t border-white/[0.06] pt-4">
            {item.details.map((detail, idx) => (
              <li key={idx} className="text-xs md:text-sm text-[#dcd8d0] flex items-start gap-2.5 font-light">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export function JourneyTimeline() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const timelineData = journey.filter(item => item.showPublic !== false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 75%"]
  });

  return (
    <div ref={containerRef} className="relative container mx-auto px-4 md:px-6 max-w-5xl py-12 md:py-16">
      {/* Background Track Line */}
      <div className="absolute left-9 md:left-1/2 top-12 bottom-16 w-[1px] bg-white/[0.08] md:-translate-x-1/2" />

      {/* Progress-Linked Scroll Filled Spine */}
      {!prefersReducedMotion && (
        <motion.div 
          style={{ scaleY: scrollYProgress }}
          className="absolute left-[35px] md:left-1/2 top-12 bottom-16 w-[2px] bg-gradient-to-b from-[#ff6b00] via-[#f97316] to-[#ff7a00] md:-translate-x-1/2 origin-top shadow-[0_0_10px_rgba(249,115,22,0.5)] z-0" 
        />
      )}

      <div className="flex flex-col relative z-10">
        {timelineData.map((item, index) => (
          <TimelineNode key={item.id} item={item} index={index} />
        ))}
      </div>
      
      {/* End Node */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-start md:justify-center mt-12 pl-4 md:pl-0"
      >
        <div className="px-6 py-3 bg-[#f1eee8] hover:bg-white text-[#030303] text-xs font-mono font-medium tracking-widest uppercase rounded-full shadow-xl transition-transform hover:scale-105">
          The Journey Continues →
        </div>
      </motion.div>
    </div>
  );
}
