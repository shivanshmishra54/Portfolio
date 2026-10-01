import React from 'react';

export function WebGLFallback({ fallbackImage }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-0">
      <div className="relative w-full h-full max-w-lg mx-auto flex items-center justify-center">
        {fallbackImage ? (
          <img 
            src={fallbackImage} 
            alt="3D Experience Fallback" 
            className="w-full h-auto max-h-[80vh] object-contain opacity-80 mix-blend-screen"
          />
        ) : (
          <div className="text-gray-400 text-sm font-medium tracking-widest uppercase">
            Interactive Experience Unavailable
          </div>
        )}
      </div>
    </div>
  );
}
