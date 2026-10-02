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
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div>
              <div className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-1">
                <AnimatedNumber value={stats.videos} />
              </div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500">Videos</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-1">
                <AnimatedNumber value={stats.subscribers} />
              </div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500">Subscribers</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-1">
                <AnimatedNumber value={stats.views} />
              </div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500">Views</div>
            </div>
          </div>
        );
      }

      if (platform.statsProvider === 'leetcode') {
        return (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">
              <AnimatedNumber value={stats.totalSolved} format={false} />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-500">Problems Solved</div>
          </div>
        );
      }

      if (platform.statsProvider === 'codeforces') {
        return (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div>
              <div className="text-xl font-light text-gray-900 dark:text-white mb-1">
                <AnimatedNumber value={stats.rating} format={false} />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Rating</div>
            </div>
            <div>
              <div className="text-xl font-light text-gray-900 dark:text-white mb-1">
                {stats.rank || 'N/A'}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Rank</div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="flex flex-col pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="text-xl font-light text-gray-900 dark:text-white mb-1">—</div>
        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Stats unavailable right now</div>
      </div>
    );
  };

  return (
    <div className="group flex flex-col p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{platform.label}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{platform.handle}</p>
        </div>
      </div>
      
      {renderStats()}

      <a 
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
      >
        Visit Profile <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
