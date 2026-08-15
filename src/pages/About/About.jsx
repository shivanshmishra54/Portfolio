import HeroImg from "@/assets/images/hero.jpg";
import { FaCode } from "react-icons/fa";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Developer, Problem Solver, Tech Explorer
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block object-cover w-full h-full"
                  alt="Shivansh Mishra"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                Hello! I'm Shivansh Mishra, a curious learner, problem solver,
                and tech explorer passionate about building impactful software
                solutions.{" "}
                <span className="font-bold text-white">
                  Currently pursuing B.Tech in Information Technology at K.J. Somaiya Institute of Technology (CGPA: 8.72)
                </span>
                , I specialize in full-stack development.
              </p>
              <p className="text-white">
                I focus on architecting scalable backend systems using Java,
                Spring Boot, Microservices, and building interactive, seamless
                user interfaces with React.js and modern web standards.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    "I have a strong foundation in DSA and core CS concepts,
                    having solved 200+ problems on LeetCode. I love exploring new
                    technologies, tackling challenging problems, and collaborating
                    to create high-performance real-world solutions."
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Shivansh Mishra
                    </cite>
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                      <FaCode className="w-4 h-4" />
                      <span>Full-Stack & Systems Developer</span>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
