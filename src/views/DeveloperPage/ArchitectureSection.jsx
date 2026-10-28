'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
import { AnimeTextReveal } from '../../components/ui/AnimeTextReveal';
import { Layers, Network, Lock, Zap, Server, Database, Code2, Workflow, Link as LinkIcon } from 'lucide-react';

export function ArchitectureSection() {
  const prefersReducedMotion = useReducedMotion();

  const principles = [
    {
      icon: <Layers size={24} />,
      title: "Clean Architecture",
      desc: "Separation of concerns through layered architectures (Controllers, Services, Repositories). Ensuring business logic remains independent of UI or database frameworks.",
    },
    {
      icon: <Network size={24} />,
      title: "API-First Design",
      desc: "Building robust RESTful services with stateless communication, comprehensive error handling, and logical resource modeling.",
    },
    {
      icon: <Lock size={24} />,
      title: "Secure by Default",
      desc: "Implementing JWT authentication, BCrypt hashing, and role-based access control (RBAC) at the core of backend systems.",
    },
    {
      icon: <Zap size={24} />,
      title: "Scalable Data Flow",
      desc: "Designing optimized database schemas and efficient query strategies to handle complex relations without performance bottlenecks.",
    }
  ];

  const diagramNodes = [
    { id: 'client', icon: <Code2 size={24} />, label: "React Client", desc: "UI Component Layer" },
    { id: 'api', icon: <Network size={24} />, label: "REST API", desc: "JSON via HTTPS" },
    { id: 'controller', icon: <LinkIcon size={24} />, label: "Spring Controller", desc: "Routing & Auth" },
    { id: 'service', icon: <Workflow size={24} />, label: "Service Layer", desc: "Business Logic" },
    { id: 'repo', icon: <Server size={24} />, label: "Repository", desc: "JPA / Hibernate" },
    { id: 'db', icon: <Database size={24} />, label: "MySQL", desc: "Relational Data" },
  ];

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : custom * 0.15,
        duration: 0.4
      }
    })
  };

  const edgeVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: (custom) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : custom * 0.15 + 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <section className="py-24 md:py-32 bg-[#030303] text-[#f1eee8] border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaa9a4]">
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-[#f97316]/90 font-medium">02 / SYSTEMS THINKING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#f1eee8] leading-[1.08] mb-4">
            <AnimeTextReveal trigger="visible">Architecture Principles</AnimeTextReveal>
          </h2>
          <p className="text-[#aaa9a4] max-w-2xl font-light text-base md:text-lg leading-relaxed">
            I approach software development as an engineering discipline. It’s not just about writing code that works; it’s about structuring systems that are maintainable, secure, and resilient under load.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-20 overflow-x-auto pb-6">
          <div className="min-w-[800px] flex items-center justify-between py-12 px-8 bg-[#080808] border border-white/[0.08] rounded-2xl relative shadow-2xl">
            {diagramNodes.map((node, i) => (
              <React.Fragment key={node.id}>
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={nodeVariants}
                  className="flex flex-col items-center relative z-10 w-32"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] flex items-center justify-center text-[#f1eee8] mb-4 shadow-md group-hover:border-white/[0.2] transition-colors">
                    {node.icon}
                  </div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#f1eee8] font-semibold text-center mb-1">{node.label}</h4>
                  <p className="text-[11px] font-mono text-[#aaa9a4] text-center">{node.desc}</p>
                </motion.div>
                
                {i < diagramNodes.length - 1 && (
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={edgeVariants}
                    className="flex-grow h-[1px] bg-white/[0.12] origin-left -mx-4 relative top-[-1.5rem]"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-white/[0.25] rotate-45" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((p, idx) => (
            <ScrollReveal 
              key={idx}
              delay={idx * 0.1}
              yOffset={20}
              className="p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] hover:border-white/[0.22] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#f1eee8] mb-6">
                {p.icon}
              </div>
              <h3 className="text-xl font-serif font-normal text-[#f1eee8] mb-2">{p.title}</h3>
              <p className="text-sm font-light text-[#aaa9a4] leading-relaxed">
                {p.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
