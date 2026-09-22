import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const canvasRef = useRef(null);

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // ---------- Check device + enable only on desktop with fine pointer ----------
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const check = () => {
      setEnabled(mq.matches && !reduce.matches);
    };

    check();
    mq.addEventListener("change", check);
    reduce.addEventListener("change", check);

    return () => {
      mq.removeEventListener("change", check);
      reduce.removeEventListener("change", check);
    };
  }, []);

  // ---------- Main cursor logic ----------
  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;   // big glowing ring
    const dot = dotRef.current;         // small solid dot
    const canvas = canvasRef.current;   // particle canvas
    if (!cursor || !dot || !canvas) return;

    document.body.classList.add("has-custom-cursor");

    const ctx = canvas.getContext("2d");

    // Resize canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Cursor position tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Particle system
    const particles = [];
    const MAX_PARTICLES = 40;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = 2 + Math.random() * 3;
        this.life = 1;
        this.decay = 0.015 + Math.random() * 0.02;
        // Alternate between pink and purple for variety
        this.hue = Math.random() > 0.5 ? "#ff00a8" : "#a100ff";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02;      // slight gravity
        this.life -= this.decay;
        this.size *= 0.985;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.hue;
        ctx.shadowColor = this.hue;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Track last mouse position for spacing
    let lastEmitX = mouseX;
    let lastEmitY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Emit particles along the movement path
      const dx = mouseX - lastEmitX;
      const dy = mouseY - lastEmitY;
      const dist = Math.hypot(dx, dy);

      if (dist > 6) {
        const steps = Math.min(4, Math.floor(dist / 6));
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          particles.push(
            new Particle(
              lastEmitX + dx * t,
              lastEmitY + dy * t
            )
          );
        }
        lastEmitX = mouseX;
        lastEmitY = mouseY;

        // Cap particle count
        while (particles.length > MAX_PARTICLES) {
          particles.shift();
        }
      }
    };

    // Hover detection — enlarge cursor over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("a, button, input, textarea, select, [role='button'], .case-study-btn")
      ) {
        setHovering(true);
      }
    };
    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.closest("a, button, input, textarea, select, [role='button'], .case-study-btn")
      ) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Animation loop
    let rafId;
    const animate = () => {
      // Smooth follow for the big ring
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Draw particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Particle canvas — behind everything */}
      <canvas ref={canvasRef} className="cursor-canvas" />

      {/* Big glowing ring */}
      <div
        ref={cursorRef}
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
      />

      {/* Small solid dot */}
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}