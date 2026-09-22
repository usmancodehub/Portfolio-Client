import React from "react";
import { useData } from "../context/DataContext";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Skills() {
  const { skills, tools } = useData();
  useScrollReveal();

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title reveal">
          My <span>Skills</span>
        </h2>
        <p className="section-subtitle reveal">
          Technologies and tools I work with.
        </p>

        <div className="skills-layout">
          <div className="skills-grid">
            {skills.length === 0 ? (
              <p style={{ color: "#b4a9c5", fontSize: 13 }}>
                Loading skills...
              </p>
            ) : (
              skills.map((s) => (
                <div className="skill-card reveal" key={s._id}>
                  <span className="skill-icon">{s.icon}</span>
                  <h3>{s.name}</h3>
                  <span className="skill-percent">{s.percent}%</span>
                  <div className="skill-track">
                    <div
                      className="skill-progress"
                      data-width={`${s.percent}%`}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="tools reveal">
            {tools.map((t) => (
              <span className="tool-tag" key={t._id}>
                {t.icon} {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}