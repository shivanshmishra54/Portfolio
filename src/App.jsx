import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { ContactProvider } from "./components/ui/ContactContext";
import "./assets/css/index.css";
import "./styles/editorial.scss";

// Lazy load route components
const HomePage = lazy(() => import("./views/HomePage"));
const FreelancerPage = lazy(() => import("./views/FreelancerPage"));
const DeveloperPage = lazy(() => import("./views/DeveloperPage"));
const JourneyPage = lazy(() => import("./views/JourneyPage"));
const ThreeLab = lazy(() => import("./views/Lab/ThreeLab"));

export default function App() {
  const location = useLocation();

  // Loading fallback
  const Fallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#030303]">
      <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ContactProvider>
        <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#030303] text-[#f1eee8] selection:bg-white selection:text-black">
          <ScrollToTop />
          <Navigation />
          
          <main className="flex-grow flex flex-col w-full max-w-full overflow-x-hidden">
            <Suspense fallback={<Fallback />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/freelancer" element={<FreelancerPage />} />
                  <Route path="/developer" element={<DeveloperPage />} />
                  <Route path="/journey" element={<JourneyPage />} />
                  {/* Maintain old paths mapping to new components if necessary, or just rely on main 3 */}
                  <Route path="/3d-lab" element={<ThreeLab />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          <Footer />
        </div>
      </ContactProvider>
    </ReactLenis>
  );
}
