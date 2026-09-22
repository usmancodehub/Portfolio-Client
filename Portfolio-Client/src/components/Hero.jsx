import React, { useEffect } from "react";
import useTypingEffect from "../hooks/useTypingEffect";
import { useData } from "../context/DataContext";
import { fileUrl } from "../api/axios";

const ROLES = [
  "MERN Stack Developer",
  "Full Stack Web Developer",
  "App Developer",
  "Frontend Developer",
];

export default function Hero() {
  const text = useTypingEffect(ROLES);
  const { heroImage } = useData();

  useEffect(() => {
    if (heroImage) {
      const url = fileUrl(heroImage);
      document.querySelectorAll(".hero").forEach((el) => {
        el.style.backgroundImage = `linear-gradient(90deg, rgba(7,3,14,.12), rgba(7,3,14,.02)), url("${url}")`;
      });
    }
  }, [heroImage]);

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <span className="hello">👋 Full Stack Engineer</span>
          <h1>
            Muhammad <span className="gradient-text">Usman</span>
          </h1>
          <h2>
            <span className="typing">{text}</span>
          </h2>
          <p className="hero-description">
            I'm a passionate MERN Stack and App Developer, focused on building
            modern, responsive, and user-friendly web applications and mobile
            apps. I love turning creative ideas into real digital solutions.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects →
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me ✉
            </a>
          </div>
          <div className="socials">
            <a href="https://github.com/usmancodehub" target="_blank" rel="noopener noreferrer">
              ◉ GitHub
            </a>
            <a href="https://www.linkedin.com/in/muhammad-usman-73a27b34a/" target="_blank" rel="noopener noreferrer">
              ▣ LinkedIn
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              ◎ Instagram
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              𝕏
            </a>
          </div>
        </div>
      </div>

      <div className="hero-badge badge-top">⚡ MERN Stack Developer</div>
      <div className="hero-badge badge-bottom">♡ Web & App Developer</div>
      <div className="scroll-hint">
        <span>↓</span> Scroll to explore
      </div>
    </section>
  );
}