import React from 'react';
import { motion } from 'framer-motion';
import { journey } from '../../data/journey';

const TimelineNode = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between w-full mb-16 md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Connector Line (Desktop Horizontal) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 w-full h-[2px] bg-gray-200 dark:bg-gray-800 -translate-y-1/2 -z-10" 
           style={{ [isEven ? 'right' : 'left']: '50%', width: '50%' }} />
      
      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Center Node */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-white dark:bg-black border-4 border-gray-900 dark:border-white shadow-xl shrink-0 mx-4 md:mx-auto">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-900 dark:bg-white" />
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-5/12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:shadow-2xl transition-all duration-300"
      >
        <div className="mb-4 flex flex-col gap-1">
          <span className="text-xs font-mono tracking-widest uppercase text-gray-500">
            {item.dateLabel}
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
            {item.category}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-2">
          {item.title}
        </h3>
        
        {item.organization && (
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {item.organization}
          </p>
        )}
        
        {item.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {item.description}
          </p>
        )}

        {item.details && item.details.length > 0 && (
          <ul className="space-y-2 mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            {item.details.map((detail, idx) => (
              <li key={idx} className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export function JourneyTimeline() {
  // Filter out non-public items
  const timelineData = journey.filter(item => item.showPublic !== false);

  return (
    <div className="relative container mx-auto px-4 md:px-6 max-w-5xl py-24">
      {/* Vertical Line (Mobile & Desktop Core) */}
      <div className="absolute left-9 md:left-1/2 top-24 bottom-24 w-[2px] bg-gray-200 dark:bg-gray-800 md:-translate-x-1/2" />

      <div className="flex flex-col relative z-10">
        {timelineData.map((item, index) => (
          <TimelineNode key={item.id} item={item} index={index} />
        ))}
      </div>
      
      {/* End Node */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-start md:justify-center mt-8 pl-4 md:pl-0"
      >
        <div className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold tracking-widest uppercase rounded-full">
          The Journey Continues
        </div>
      </motion.div>
    </div>
  );
}
