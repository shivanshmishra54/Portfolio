'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

export function CircularCardDeck({
  items,
  renderCard,
  className = "",
  aspectClass = "min-h-[520px] md:min-h-[560px]",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    const velocityThreshold = 400;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swiped right-to-left -> go to next card
      next();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swiped left-to-right -> go to prev card
      prev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  return (
    <div className={`relative w-full flex flex-col items-center select-none overflow-x-clip ${className}`}>
      {/* 3D Perspective Circular Deck Stage */}
      <div 
        className={`relative w-full max-w-5xl flex items-center justify-center py-2 sm:py-4 px-2 sm:px-4 [perspective:1400px] ${aspectClass}`}
      >
        <div className="relative w-full max-w-2xl lg:max-w-[760px] h-full flex items-center justify-center [transform-style:preserve-3d]">
          {items.map((item, index) => {
            // Circular relative offset
            let diff = index - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isRight = diff === 1;
            const isLeft = diff === -1;
            // Only show immediate adjacent cards for clean peek without clutter
            const isVisible = Math.abs(diff) <= 1;

            if (!isVisible) return null;

            // Compute circular curved positioning with ZERO overlap over active card
            let xOffset = "0%";
            let scale = 1;
            let rotateY = 0;
            let zIndex = 30;
            let opacity = 1;
            let blur = "0px";

            if (isRight) {
              // Positioned cleanly outside active card bounds (50% + margin)
              xOffset = "94%";
              scale = 0.82;
              rotateY = -14;
              zIndex = 10;
              opacity = 0.35;
              blur = "1.5px";
            } else if (isLeft) {
              // Positioned cleanly outside active card bounds (-50% - margin)
              xOffset = "-94%";
              scale = 0.82;
              rotateY = 14;
              zIndex = 10;
              opacity = 0.35;
              blur = "1.5px";
            }

            return (
              <motion.div
                key={item.id || index}
                className={`absolute w-full origin-center ${
                  isCenter ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-auto cursor-pointer hidden md:block"
                }`}
                style={{
                  zIndex,
                  filter: `blur(${blur})`,
                }}
                animate={{
                  x: xOffset,
                  scale,
                  rotateY,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.8,
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isRight) next();
                  if (isLeft) prev();
                }}
              >
                <div className="w-full transition-transform duration-300">
                  {renderCard(item, index, {
                    isActive: isCenter,
                    isNext: isRight,
                    isPrev: isLeft,
                    total,
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Circular Deck Controls Bar */}
      <div className="flex items-center justify-between w-full max-w-2xl lg:max-w-[760px] px-3 sm:px-6 mt-3 sm:mt-4 z-40">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={prev}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/[0.1] bg-[#0c0c0c] hover:bg-[#161616] hover:border-white/[0.25] text-[#f1eee8] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/[0.1] bg-[#0c0c0c] hover:bg-[#161616] hover:border-white/[0.25] text-[#f1eee8] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next card"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Circular Pagination Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex
                  ? "w-6 sm:w-8 bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                  : "w-1.5 sm:w-2 bg-white/[0.15] hover:bg-white/[0.3]"
              }`}
              aria-label={`Go to card ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#aaa9a4]/70">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#f97316]" />
          <span>SWIPE</span>
        </div>
      </div>
    </div>
  );
}

CircularCardDeck.propTypes = {
  items: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
  className: PropTypes.string,
  aspectClass: PropTypes.string,
};
