import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { fileUrl } from "../api/axios";
import useScrollReveal from "../hooks/useScrollReveal";

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Development" },
  { key: "app", label: "App Development" },
];

export default function Projects() {
  const { projects } = useData();
  const [filter, setFilter] = useState("all");
  useScrollReveal();

  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title reveal">
          My <span>Projects</span>
        </h2>
        <p className="section-subtitle reveal">
          Some of my web and mobile development projects.
        </p>

        <div className="project-filters reveal">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- STACKED CARDS ---------- */}
      <div className="stack-wrapper">
        {visible.map((project, i) => (
          <StackCard
            key={project._id}
            project={project}
            index={i}
            total={visible.length}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   A single stacked card
--------------------------------------------------------------------------- */
function StackCard({ project, index }) {
  return (
    <div
      className="stack-item"
      style={{
        top: `calc(80px + ${index * 18}px)`,
        zIndex: index + 1,
      }}
    >
      <article className="case-study-card">
        {/* ---------- BLURRED BACKGROUND ---------- */}
        <div className="case-study-bg">
          {project.image ? (
            <img src={fileUrl(project.image)} alt="" aria-hidden="true" />
          ) : (
            <div className="case-study-bg-fallback"></div>
          )}
        </div>

        {/* ---------- DARK OVERLAY ---------- */}
        <div className="case-study-overlay"></div>

        {/* ---------- CONTENT ---------- */}
        <div className="case-study-content">
          

          <h3 className="case-study-title">{project.title}</h3>

          <p className="case-study-desc">{project.description}</p>

          <Link to={`/project/${project._id}`} className="case-study-btn">
            <span>VIEW CASE STUDY</span>
            <span className="case-study-btn-arrow">↗</span>
          </Link>
        </div>
      </article>
    </div>
  );
}