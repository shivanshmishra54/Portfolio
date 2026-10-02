import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { journey } from '../../data/journey';

export function JourneyPreviewSection() {
  const previewSteps = journey.filter(item => item.featured).slice(0, 4);

  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading 
          title="The Journey" 
          subtitle="My professional progression and technical evolution." 
        />

        <div className="relative mt-16 pb-16">
          {/* Horizontal line for desktop, vertical for mobile (visual abstraction) */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {previewSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col md:items-center text-left md:text-center group"
              >
                <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full mb-6 hidden md:block outline outline-8 outline-gray-50 dark:outline-gray-950 transition-transform group-hover:scale-150"></div>
                <span className="text-sm font-mono tracking-widest text-gray-500 dark:text-gray-400 mb-2">{step.dateLabel}</span>
                <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-500 font-light">{step.category}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-start md:justify-center">
          <Link 
            to="/journey"
            className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white"
          >
            View Full Journey
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
