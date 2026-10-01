import React from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEOHead } from '../../components/layout/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function DeveloperPage() {
  return (
    <PageTransition>
      <SEOHead title="Software Developer" description="Hire me as a Software Developer" />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-black pt-24 px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase text-gray-900 dark:text-white mb-6">
            Software Developer
          </h1>
          <p className="text-xl font-light text-gray-600 dark:text-gray-400 mb-12">
            Engineering-focused experience coming into focus in the next phase.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={16} /> Back to Overview
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
