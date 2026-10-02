import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { ContactProvider } from "./components/ui/ContactContext";
import "./assets/css/index.css";

// Lazy load route components
const HomePage = lazy(() => import("./pages/HomePage"));
const FreelancerPage = lazy(() => import("./pages/FreelancerPage"));
const DeveloperPage = lazy(() => import("./pages/DeveloperPage"));
const JourneyPage = lazy(() => import("./pages/JourneyPage"));
const ThreeLab = lazy(() => import("./pages/Lab/ThreeLab"));

export default function App() {
  const location = useLocation();

  // Loading fallback
  const Fallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin"></div>
    </div>
  );

  return (
    <ContactProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navigation />
        
        <main className="flex-grow flex flex-col">
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
  );
}
