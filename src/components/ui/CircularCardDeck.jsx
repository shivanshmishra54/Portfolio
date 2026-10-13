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
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* 3D Perspective Circular Deck Stage */}
      <div 
        className={`relative w-full max-w-6xl flex items-center justify-center overflow-hidden py-10 px-4 [perspective:1400px] ${aspectClass}`}
      >
        <div className="relative w-full max-w-3xl h-full flex items-center justify-center [transform-style:preserve-3d]">
          {items.map((item, index) => {
            // Circular relative offset
            let diff = index - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isRight = diff === 1;
            const isLeft = diff === -1;
            const isFarRight = diff === 2;
            const isFarLeft = diff === -2;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) return null;

            // Compute circular curved positioning
            let xOffset = "0%";
            let scale = 1;
            let rotateY = 0;
            let zIndex = 30;
            let opacity = 1;
            let blur = "0px";

            if (isRight) {
              xOffset = "58%";
              scale = 0.88;
              rotateY = -15;
              zIndex = 20;
              opacity = 0.55;
              blur = "1px";
            } else if (isLeft) {
              xOffset = "-58%";
              scale = 0.88;
              rotateY = 15;
              zIndex = 20;
              opacity = 0.55;
              blur = "1px";
            } else if (isFarRight) {
              xOffset = "102%";
              scale = 0.74;
              rotateY = -28;
              zIndex = 10;
              opacity = 0.2;
              blur = "2px";
            } else if (isFarLeft) {
              xOffset = "-102%";
              scale = 0.74;
              rotateY = 28;
              zIndex = 10;
              opacity = 0.2;
              blur = "2px";
            }

            return (
              <motion.div
                key={item.id || index}
                className="absolute w-full origin-center cursor-grab active:cursor-grabbing"
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
      <div className="flex items-center justify-between w-full max-w-3xl px-6 mt-4 z-40">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] hover:bg-gray-100 dark:hover:bg-neutral-900 text-gray-900 dark:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] hover:bg-gray-100 dark:hover:bg-neutral-900 text-gray-900 dark:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Circular Pagination Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex
                  ? "w-8 bg-gray-900 dark:bg-white"
                  : "w-2 bg-gray-300 dark:bg-neutral-700 hover:bg-gray-400 dark:hover:bg-neutral-500"
              }`}
              aria-label={`Go to card ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-neutral-500">
          <MoveHorizontal className="w-3.5 h-3.5" />
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
