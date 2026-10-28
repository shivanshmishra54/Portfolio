import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { profile } from '../../data/profile';
import { useContactModal } from '../../components/ui/ContactContext';

export function ProjectInquirySection() {
  const { openModal } = useContactModal();

  return (
    <section id="inquiry" className="py-24 md:py-32 bg-gray-900 dark:bg-gray-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-mono tracking-[0.3em] text-gray-400 uppercase mb-6">Start a Project</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase mb-6 leading-tight">
              Have a project
              <br />
              in mind?
            </h2>
            <p className="text-lg font-light text-gray-400 mb-8 leading-relaxed max-w-md">
              Tell me what you're trying to build. I'll review your requirements and respond within 24–48 hours.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a 
                href={`mailto:${profile.email}`} 
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                {profile.email}
              </a>
              {profile.social.github && (
                <a 
                  href={profile.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
              {profile.social.linkedin && (
                <a 
                  href={profile.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: Contact Modal Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-start lg:justify-center"
          >
            <button
              onClick={() => openModal('freelancer')}
              className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-white text-black text-sm font-bold tracking-widest uppercase rounded hover:opacity-85 transition-opacity"
            >
              <Send size={16} /> Open Project Inquiry
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
