import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../components/3d/hooks/useReducedMotion';
import { ScrollReveal } from '../../components/layout/ScrollReveal';
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
    <section className="py-24 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-gray-900 dark:bg-white"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">Systems Thinking</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
            Architecture Principles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl font-light text-base md:text-lg">
            I approach software development as an engineering discipline. It’s not just about writing code that works; it’s about structuring systems that are maintainable, secure, and scalable.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-20 overflow-x-auto pb-8">
          <div className="min-w-[800px] flex items-center justify-between py-12 px-8 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-xl relative">
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
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-900 dark:text-white mb-4 shadow-sm">
                    {node.icon}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white text-center mb-1">{node.label}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500 text-center">{node.desc}</p>
                </motion.div>
                
                {i < diagramNodes.length - 1 && (
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={edgeVariants}
                    className="flex-grow h-[2px] bg-gray-300 dark:bg-gray-700 origin-left -mx-4 relative top-[-1.5rem]"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 dark:border-gray-700 rotate-45"></div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((p, idx) => (
            <ScrollReveal 
              key={idx}
              delay={idx * 0.1}
              yOffset={20}
              className="p-8 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111] hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white mb-6">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {p.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
