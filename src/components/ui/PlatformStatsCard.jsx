import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { fetchPlatformStats } from '../../services/platformStats';
import { AnimatedNumber } from './AnimatedNumber';

export function PlatformStatsCard({ platform }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      setLoading(true);
      const data = await fetchPlatformStats(platform.statsProvider, platform.handle);
      if (mounted) {
        setStats(data);
        setLoading(false);
      }
    };

    loadStats();
    return () => { mounted = false; };
  }, [platform]);

  const renderStats = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2 text-gray-500 py-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-xs uppercase tracking-widest font-mono">Loading metrics...</span>
        </div>
      );
    }

    if (stats?.status === 'success') {
      if (platform.statsProvider === 'youtube') {
        return (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
            <div>
              <div className="text-xl md:text-2xl font-serif text-[#f1eee8] mb-1">
                <AnimatedNumber value={stats.videos} />
              </div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#aaa9a4]">Videos</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-serif text-[#f1eee8] mb-1">
                <AnimatedNumber value={stats.subscribers} />
              </div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#aaa9a4]">Subscribers</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-serif text-[#f1eee8] mb-1">
                <AnimatedNumber value={stats.views} />
              </div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#aaa9a4]">Views</div>
            </div>
          </div>
        );
      }

      if (platform.statsProvider === 'leetcode') {
        return (
          <div className="pt-4 border-t border-white/[0.08]">
            <div className="text-3xl font-serif text-[#f1eee8] mb-1">
              <AnimatedNumber value={stats.totalSolved} format={false} />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#aaa9a4]">Problems Solved</div>
          </div>
        );
      }

      if (platform.statsProvider === 'codeforces') {
        return (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
            <div>
              <div className="text-xl font-serif text-[#f1eee8] mb-1">
                <AnimatedNumber value={stats.rating} format={false} />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#aaa9a4] font-mono">Rating</div>
            </div>
            <div>
              <div className="text-xl font-serif text-[#f1eee8] mb-1">
                {stats.rank || 'N/A'}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#aaa9a4] font-mono">Rank</div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="flex flex-col pt-4 border-t border-white/[0.08]">
        <div className="text-xl font-serif text-[#f1eee8] mb-1">—</div>
        <div className="text-[10px] uppercase tracking-widest text-[#aaa9a4] font-mono">Stats unavailable right now</div>
      </div>
    );
  };

  return (
    <div className="group flex flex-col p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.22] transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-serif font-normal text-[#f1eee8]">{platform.label}</h3>
          <p className="text-xs font-mono text-[#aaa9a4]">@{platform.handle}</p>
        </div>
      </div>
      
      {renderStats()}

      <a 
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#aaa9a4] hover:text-[#f1eee8] transition-colors"
      >
        <span>Visit Profile</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
