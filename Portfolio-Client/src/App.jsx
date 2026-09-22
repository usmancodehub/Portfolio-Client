import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";   // ← NEW


function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />                {/* ← NEW — between Hero and About */}
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const MIN_DISPLAY = 3200;   // minimum time loader stays
    const MAX_WAIT = 5500;      // force-hide after this
    const start = Date.now();

    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY - elapsed);

      setTimeout(() => {
        setLoading(false);

        // Trigger portfolio fade-in slightly after loader starts fading
        setTimeout(() => {
          setContentVisible(true);
          document.body.style.overflow = "";
        }, 200);
      }, remaining);
    };

    // Wait for fonts + page load
    const fontReady =
      document.fonts && document.fonts.ready
        ? document.fonts.ready.catch(() => {})
        : Promise.resolve();

    const pageReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => {
            window.addEventListener("load", resolve, { once: true });
          });

    Promise.race([
      Promise.all([fontReady, pageReady]).then(finish),
      new Promise((resolve) => setTimeout(resolve, MAX_WAIT)).then(finish),
    ]);
  }, []);

  const hideNavbar = location.pathname.startsWith("/project/");

  return (
    <DataProvider>
      <Loader visible={loading} />
      <CustomCursor />                                     {/* ← NEW */}

      <div className={`portfolio-content ${contentVisible ? "visible" : ""}`}>
        {!hideNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>

        <Footer />
      </div>
    </DataProvider>
  );
}