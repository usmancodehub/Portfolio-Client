import React from "react";
import { useData } from "../context/DataContext";
import { fileUrl } from "../api/axios";
import useScrollReveal from "../hooks/useScrollReveal";

export default function About() {
  const { about } = useData();
  useScrollReveal();

  // Fallbacks — used if admin hasn't set anything yet
  const aboutLabel = about?.aboutLabel || "ABOUT ME";
  const headline =
    about?.headline ||
    "I'm a Senior Full Stack Engineer building enterprise SaaS, ERP, CRM and AI-powered solutions that solve real business problems.";
  const bio =
    about?.bio ||
    "I specialize in designing and developing scalable enterprise applications, SaaS platforms, ERP systems, CRM solutions, and automation workflows. Over the last 3+ years, I've delivered production-ready software for international clients using modern cloud technologies. My focus is on clean architecture, performance, maintainability, and building software that solves real business problems.";
  const clientNote =
    about?.clientNote ||
    "Worked with international clients including Great West Radon (Canada)";

  const stats = [
    {
      value: about?.stat1Value || "3+",
      label: about?.stat1Label || "YEARS EXPERIENCE",
    },
    {
      value: about?.stat2Value || "70+",
      label: about?.stat2Label || "ENTERPRISE MODULES BUILT",
    },
  ];

  // Portrait image (uses the hero image from settings, or a fallback)
  const portrait = about?.portrait ? fileUrl(about.portrait) : null;

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-layout">
          {/* ---------- LEFT: Portrait + floating icons ---------- */}
          <div className="about-portrait-wrap reveal">
            <div className="about-portrait-oval">
              {portrait ? (
                <img src={portrait} alt="Portrait" />
              ) : (
                <div className="about-portrait-placeholder">
                  <span>Your Photo</span>
                </div>
              )}
            </div>

            {/* Floating tech icon badges */}
            <div className="about-badge about-badge-1">⚛️</div>
            <div className="about-badge about-badge-2">📱</div>
            <div className="about-badge about-badge-3">💎</div>
            <div className="about-badge about-badge-4">🎨</div>
          </div>

          {/* ---------- RIGHT: Content ---------- */}
          <div className="about-content">
            <span className="about-label reveal">{aboutLabel}</span>

            <h2 className="about-headline reveal">{headline}</h2>

            <p className="about-bio reveal">{bio}</p>

            <p className="about-client-note reveal">{clientNote}</p>

            <div className="about-stats reveal">
              {stats.map((s, i) => (
                <div className="about-stat" key={i}>
                  <div className="about-stat-value">{s.value}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}