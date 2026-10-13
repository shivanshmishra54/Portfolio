import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";
import { Github, ArrowUpRight } from "lucide-react";
import { ProjectVisualBanner } from "@/components/ui/ProjectVisualBanner";
import { projects } from "@/data/projects";

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main className="bg-white dark:bg-black" ref={container}>
        <section className="text-gray-900 dark:text-white w-full py-20">
          <div className="max-w-5xl mx-auto px-6 mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
              Featured Systems
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-light text-base md:text-lg">
              Explore the core architectures and production applications engineered from scratch.
            </p>
          </div>

          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            const presentation = project.developer || project.freelancer;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                title={presentation.title}
                category={project.category}
                description={presentation.overview || presentation.summary}
                progress={scrollYProgress}
                range={[i * (1 / projects.length), 1]}
                targetScale={targetScale}
                githubLink={project.github}
                tags={presentation.technologies || presentation.features}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  category,
  description,
  progress,
  range,
  targetScale,
  githubLink,
  tags,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container px-4"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative -top-[15%] h-auto w-[92%] md:w-[85%] lg:w-[75%] xl:w-[68%] origin-top project-card"
        whileHover={{
          y: -6,
          transition: { duration: 0.3 },
        }}
      >
        <div className="w-full flex flex-col md:flex-row bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Visual Banner section */}
          <div className="w-full md:w-[50%] p-4 sm:p-6 flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
            <ProjectVisualBanner
              title={title.split('—')[0].trim()}
              category={category}
              tags={tags}
            />
          </div>

          {/* Content section */}
          <div className="w-full md:w-[50%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                  System 0{i + 1}
                </span>
                <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300">
                  {category}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {description}
              </p>

              {tags && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tags.slice(0, 4).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 flex items-center">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Github size={16} /> View Codebase <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
  tags: PropTypes.array,
};
