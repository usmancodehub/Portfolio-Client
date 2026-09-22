import React, { useState } from "react";
import useActiveSection from "../hooks/useActiveSection";
import { useData } from "../context/DataContext";
import { fileUrl } from "../api/axios";

const SECTIONS = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const active = useActiveSection(SECTIONS);
  const { cvUrl } = useData();

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.body.classList.toggle("light", next);
    document.body.style.setProperty("--bg", next ? "#170c20" : "#08060e");
  };

  return (
    <header>
      <nav className="container">
        <a href="#home" className="logo">
          <span className="logo-icon">&lt;/&gt;</span>
          PORT<span>FOLIO</span>
        </a>

        <div className={`nav-links ${open ? "open" : ""}`} id="navLinks">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={active === s ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {light ? "☀" : "☾"}
          </button>

          {cvUrl ? (
            <a
              href={fileUrl(cvUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              ♙ Download CV
            </a>
          ) : (
            <a href="#contact" className="btn btn-outline">
              ♙ Download CV
            </a>
          )}

          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>
    </header>
  );
}