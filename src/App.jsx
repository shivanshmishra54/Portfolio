import React, { useState, Suspense, lazy } from "react";
import "./assets/css/index.css";
import Header from "./pages/Header/Header";
import { Route, Routes } from "react-router-dom";

// Lazy load route components
const Hero = lazy(() => import("./pages/Hero/Hero"));
const Skills = lazy(() => import("./pages/Skills/Skills"));
const Experience = lazy(() => import("./pages/Experience/Experience"));
const Education = lazy(() => import("./pages/Education/Education"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Certificates = lazy(() => import("./pages/Certificates/Certificates"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

export default function App() {
  const [isOnePage, setIsOnePage] = useState(false); // Toggle state

  // Loading fallback
  const Fallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#04081A]">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <Header />
      {/* Conditional Rendering */}
      <Suspense fallback={<Fallback />}>
        {isOnePage ? (
          // One-Page Mode: Render all components together
          <>
            <Hero />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Certificates />
            <Contact />
          </>
        ) : (
          // Router Mode: Use routes for navigation
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        )}
      </Suspense>
    </>
  );
}
