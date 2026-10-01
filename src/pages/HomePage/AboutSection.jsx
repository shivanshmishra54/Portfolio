import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/shared/SectionHeading';
import { profile } from '../../data/profile';

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          <div>
            <SectionHeading title="Who is Shivansh?" subtitle="A brief introduction to my professional identity." />
          </div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Who I Am</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 dark:text-gray-200">
                I am a curious learner, problem solver, and tech explorer passionate about building impactful software solutions. 
                Currently pursuing my B.Tech in Information Technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">What I Build</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 dark:text-gray-200">
                I specialize in full-stack development, architecting scalable backend systems using Java and Spring Boot, 
                and building interactive, seamless user interfaces with React.js.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">What I Care About</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 dark:text-gray-200">
                Crafting clean code, exploring new technologies, and tackling challenging architectural problems. 
                I thrive on collaborating to create high-performance real-world solutions.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
