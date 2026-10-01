import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Award, ExternalLink, ShieldCheck, Calendar, Eye, X } from "lucide-react";

import { certificates } from "@/data/certificates";


export default function Certificates() {
  const container = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });



  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950 pt-24 pb-16">
          <div className="text-center pt-6 pb-6 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500">
              Certifications & Honors
            </h1>
            <p className="text-gray-400 mt-3 text-base md:text-lg max-w-2xl mx-auto">
              Verified certifications across Software Engineering, Cloud Architecture, Artificial Intelligence, and Algorithmic Problem Solving.
            </p>
          </div>

          {certificates.map((cert, i) => {
            const targetScale = 1 - (certificates.length - i) * 0.035;
            return (
              <CertificateCard
                key={`c_${i}`}
                i={i}
                title={cert.title}
                issuer={cert.issuer}
                date={cert.date}
                category={cert.category}
                image={cert.image}
                pdfUrl={cert.pdfUrl}
                color={cert.color}
                description={cert.description}
                skills={cert.skills}
                onPreview={(img) => setSelectedImage(img)}
                progress={scrollYProgress}
                range={[i * (1 / certificates.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        {/* Lightbox / Modal for viewing high-res Certificate Image */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl p-2">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Certificate High-Res Preview"
                className="max-h-[85vh] w-auto mx-auto object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </main>
    </ReactLenis>
  );
}

function CertificateCard({
  i,
  title,
  issuer,
  date,
  category,
  description,
  skills,
  image,
  pdfUrl,
  color,
  onPreview,
  progress,
  range,
  targetScale,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 cert-container"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-3vh + ${i * 18}px)`,
        }}
        className="relative -top-[20%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top cert-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        {/* Modern split card design */}
        <div className="w-full flex flex-col md:flex-row bg-zinc-900/95 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Image section with preview button */}
          <div className="w-full md:w-[50%] h-[240px] md:h-[400px] lg:h-[430px] relative overflow-hidden bg-gray-950 flex items-center justify-center group/img">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-contain p-2 md:p-3 transition-transform duration-500 group-hover/img:scale-105"
            />

            {/* Hover overlay with Quick Preview button */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <button
                onClick={() => onPreview(image)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 border border-white/30 transition-all hover:scale-105"
              >
                <Eye className="w-4 h-4" />
                <span>View Fullscreen</span>
              </button>
            </div>

            {/* Certificate badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 border border-white/10 shadow-lg">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Certificate #{i + 1}</span>
            </div>

            {/* Issuer overlay tag */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs md:text-sm text-gray-200 flex items-center gap-1.5 border border-white/10 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{issuer}</span>
            </div>
          </div>

          {/* Content section */}
          <div className="w-full md:w-[50%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Category & Date Header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-400">
                    {category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{date}</span>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
                {title}
              </h2>

              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                {description}
              </p>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer / Action buttons */}
            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-3">
              <motion.a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 group shadow-lg"
                style={{
                  backgroundColor: `${color}20`,
                  borderColor: `${color}60`,
                  borderWidth: "1px",
                  color: "#fff",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {pdfUrl.includes("oracle.com")
                    ? "Verify Oracle Badge"
                    : pdfUrl.includes("hack2skill.com")
                    ? "Verify Hack2skill Badge"
                    : pdfUrl.includes("hackerrank.com")
                    ? "Verify HackerRank Badge"
                    : pdfUrl.includes("theforage.com")
                    ? "Verify Forage Certificate"
                    : pdfUrl.endsWith(".pdf")
                    ? "Open Certificate PDF"
                    : "Verify Credential"}
                </span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              <button
                onClick={() => onPreview(image)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

CertificateCard.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  pdfUrl: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onPreview: PropTypes.func.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
};
