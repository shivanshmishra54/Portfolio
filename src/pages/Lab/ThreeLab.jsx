import React from 'react';
import { ThreeScene } from '@/components/3d';
import { AvatarProvider } from '@/components/3d/AvatarContext';

export default function ThreeLab() {
  return (
    <AvatarProvider>
      <div className="w-screen h-screen bg-[#04081A] overflow-hidden pt-16">
        <div className="absolute top-20 left-4 z-10 text-white space-y-2">
          <h1 className="text-2xl font-bold tracking-widest text-gray-200">3D Foundation Lab</h1>
          <p className="text-sm text-gray-400">Testing isolated 3D environment.</p>
        </div>
        
        {/* 3D Scene container */}
        <div className="w-full h-full">
          <ThreeScene usePlaceholder={true} />
        </div>
      </div>
    </AvatarProvider>
  );
}
