import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { profile } from '../../data/profile';
import { Cpu, Server, ShieldCheck } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black relative border-t border-gray-100 dark:border-neutral-900 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Photo & Identity Side */}
          <div className="lg:col-span-5">
            <SectionHeading 
              title="Who is Shivansh?" 
              subtitle="Engineering mindset, technical foundation, and core focus." 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-8 relative"
            >
              <div className="relative inline-block w-full max-w-sm">
                <div className="absolute -inset-2 bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl transform -rotate-1 opacity-70 blur-sm transition-all duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-950 shadow-2xl">
                  <img 
                    src={profile.photo} 
                    alt="Shivansh Mishra" 
                    loading="lazy"
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="p-4 bg-gray-50/90 dark:bg-[#111]/90 border-t border-gray-200/60 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{profile.name}</p>
                      <p className="text-xs font-mono text-gray-500 dark:text-neutral-400">K.J. Somaiya · CGPA 8.72</p>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded bg-gray-200/70 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300">
                      3rd Year IT
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Professional Statements */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="p-7 md:p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50/70 dark:bg-[#0c0c0c] transition-all hover:border-gray-300 dark:hover:border-neutral-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white">
                  <Cpu size={17} />
                </div>
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 dark:text-neutral-500 uppercase">
                  Who I Am
                </h3>
              </div>
              <p className="text-base md:text-lg font-light leading-relaxed text-gray-800 dark:text-gray-200">
                Software Engineer and Systems Builder focused on architecting resilient, production-grade applications. Currently in my 3rd year of B.Tech in Information Technology at K.J. Somaiya Institute of Technology (CGPA: 8.72), with verified contributions to enterprise open source (<span className="text-gray-900 dark:text-white font-medium">Spring Boot Admin</span>) and top-tier national hackathon recognition.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-7 md:p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50/70 dark:bg-[#0c0c0c] transition-all hover:border-gray-300 dark:hover:border-neutral-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white">
                  <Server size={17} />
                </div>
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 dark:text-neutral-500 uppercase">
                  What I Build
                </h3>
              </div>
              <p className="text-base md:text-lg font-light leading-relaxed text-gray-800 dark:text-gray-200">
                I engineer high-throughput distributed microservices topologies with Spring Boot 3, Spring Cloud Gateway, and Netflix Eureka, sub-15ms Base-62 compression engines, event-driven streaming with Apache Kafka and Redis, and responsive full-stack applications in React.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-7 md:p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50/70 dark:bg-[#0c0c0c] transition-all hover:border-gray-300 dark:hover:border-neutral-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white">
                  <ShieldCheck size={17} />
                </div>
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 dark:text-neutral-500 uppercase">
                  What I Care About
                </h3>
              </div>
              <p className="text-base md:text-lg font-light leading-relaxed text-gray-800 dark:text-gray-200">
                Architectural scalability, sub-millisecond latency profiles, fault tolerance, and clean modular code design. I take deep ownership in collaborating with engineering peers and stakeholders to transform complex system requirements into scalable, reliable production software.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
