import React, { useState, useEffect, useRef, useCallback } from 'react';
import { animate } from 'animejs';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*_-=+';

/**
 * SignalText: Technical scramble & decryption animation powered by Anime.js 4
 */
export function SignalText({ 
  children, 
  className = '', 
  scrambleOnHover = true,
  speed = 25 
}) {
  const text = typeof children === 'string' ? children : String(children || '');
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const elementRef = useRef(null);

  const startScramble = useCallback(() => {
    if (!text || isScramblingRef.current) return;
    isScramblingRef.current = true;
    
    // Anime.js 4 tween driving the interpolation index
    const progressObj = { index: 0 };
    
    animate(progressObj, {
      index: text.length,
      duration: Math.max(text.length * speed * 2, 450),
      ease: 'outQuad',
      onUpdate: () => {
        const currentIdx = Math.floor(progressObj.index);
        setDisplayText(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < currentIdx) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
      },
      onComplete: () => {
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    });
  }, [text, speed]);

  useEffect(() => {
    startScramble();
  }, [startScramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScramblingRef.current) {
      startScramble();
    }
  };

  return (
    <span 
      ref={elementRef}
      onMouseEnter={handleMouseEnter} 
      className={`inline-block editorial-mono tracking-wider transition-colors duration-200 cursor-default select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
