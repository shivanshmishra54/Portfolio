import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export const AvatarState = {
  IDLE: 'idle',
  THINKING: 'thinking',
  HAPPY: 'happy',
  CURIOUS: 'curious',
  GREETING: 'greeting',
  FOCUSED: 'focused'
};

const AvatarContext = createContext();

export function AvatarProvider({ children }) {
  const [avatarState, setAvatarState] = useState(AvatarState.GREETING);
  const [activeCloud, setActiveCloud] = useState(null);
  const idleTimerRef = useRef(null);

  // Behavior: Initial greeting -> Idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarState(AvatarState.IDLE);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Idle behavior generator
  useEffect(() => {
    if (avatarState !== AvatarState.IDLE && avatarState !== AvatarState.THINKING) return;

    const scheduleNextIdleBehavior = () => {
      const delay = Math.random() * 3000 + 4000; // 4-7 seconds
      
      idleTimerRef.current = setTimeout(() => {
        // Occasionally switch to thinking
        if (Math.random() > 0.7) {
          setAvatarState(AvatarState.THINKING);
          
          // Switch back to idle after thinking
          setTimeout(() => {
            setAvatarState(AvatarState.IDLE);
          }, 3000);
        } else {
          // Just re-trigger an idle variation
          setAvatarState(AvatarState.IDLE);
          scheduleNextIdleBehavior();
        }
      }, delay);
    };

    scheduleNextIdleBehavior();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [avatarState]);

  const triggerState = (newState, duration = 0) => {
    setAvatarState(newState);
    
    if (duration > 0) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setAvatarState(AvatarState.IDLE);
      }, duration);
    }
  };

  return (
    <AvatarContext.Provider value={{ avatarState, setAvatarState, activeCloud, setActiveCloud, triggerState }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatarState() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatarState must be used within an AvatarProvider');
  }
  return context;
}
