import React, { useEffect, useState } from "react";

export default function Loader({ visible }) {
  const [mounted, setMounted] = useState(visible);
  const [hiding, setHiding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [particles, setParticles] = useState([]);

  // ---------- Lifecycle ----------
  useEffect(() => {
    if (visible) {
      setMounted(true);
      setHiding(false);
      setProgress(0);
      setTypedText("");
    } else if (mounted) {
      setHiding(true);
      const t = setTimeout(() => {
        setMounted(false);
        setHiding(false);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [visible, mounted]);

  // ---------- Typing effect ----------
  useEffect(() => {
    if (!mounted) return;
    const full = "Muhammad Usman";
    let i = 0;
    const timer = setInterval(() => {
      if (i <= full.length) {
        setTypedText(full.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 90);
    return () => clearInterval(timer);
  }, [mounted]);

  // ---------- Progress bar ----------
  useEffect(() => {
    if (!mounted) return;
    let current = 0;
    const interval = setInterval(() => {
      // Ease-out approach to 92 (final 8% jumps when app ready)
      const step = Math.max(1, Math.round((92 - current) * 0.12));
      current = Math.min(92, current + step);
      setProgress(current);
      if (current >= 92) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, [mounted]);

  // ---------- Complete progress when hiding ----------
  useEffect(() => {
    if (hiding && progress < 100) {
      setProgress(100);
    }
  }, [hiding, progress]);

  // ---------- Generate particles once ----------
  useEffect(() => {
    const arr = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
    }));
    setParticles(arr);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`loader-screen ${hiding ? "hide" : ""}`}>
      {/* Animated grid */}
      <div className="loader-grid"></div>

      {/* Floating particles */}
      <div className="loader-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="loader-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow orbs */}
      <div className="loader-glow loader-glow-1"></div>
      <div className="loader-glow loader-glow-2"></div>

      {/* Main content */}
      <div className="loader-content">
        {/* Rotating rings + center logo */}
        <div className="loader-orb">
          <div className="loader-ring loader-ring-1"></div>
          <div className="loader-ring loader-ring-2"></div>
          <div className="loader-ring loader-ring-3"></div>

          <div className="loader-core">
            <span className="loader-code">&lt;/&gt;</span>
          </div>

          {/* Orbiting icons */}
          <div className="loader-orbit loader-orbit-1">
            <span>⚛️</span>
          </div>
          <div className="loader-orbit loader-orbit-2">
            <span>🟢</span>
          </div>
          <div className="loader-orbit loader-orbit-3">
            <span>🍃</span>
          </div>
          <div className="loader-orbit loader-orbit-4">
            <span>⚡</span>
          </div>
        </div>

        {/* Typing text */}
        <div className="loader-title">
          <span className="loader-bracket">&lt;</span>
          <span className="loader-typed">{typedText}</span>
          <span className="loader-cursor">|</span>
          <span className="loader-bracket">/&gt;</span>
        </div>

        {/* Progress bar */}
        <div className="loader-progress-wrap">
          <div className="loader-progress-track">
            <div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="loader-progress-shine"></div>
            </div>
          </div>
          <div className="loader-progress-info">
            <span className="loader-progress-label">
              {progress < 100 ? "Loading portfolio" : "Ready"}
            </span>
            <span className="loader-progress-percent">{progress}%</span>
          </div>
        </div>

        {/* Bottom hint */}
        <p className="loader-hint">
          Crafted with <span className="loader-heart">♥</span> by MERN Dev
        </p>
      </div>
    </div>
  );
}