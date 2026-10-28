'use client';

import dynamic from 'next/dynamic';

const ThreeLab = dynamic(() => import('../../views/Lab/ThreeLab'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-[#030303] flex items-center justify-center text-white font-mono text-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#f97316] rounded-full animate-spin" />
        <span className="text-[#aaa9a4] text-xs tracking-widest">INITIALIZING_IN_MOTION...</span>
      </div>
    </div>
  ),
});

export default function Page() {
  return <ThreeLab />;
}
