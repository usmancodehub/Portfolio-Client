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

        <div className="case-study-list">
          {visible.map((project) => (
            <CaseStudyCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Single case study card — blurred background image + content on top
--------------------------------------------------------------------------- */
function CaseStudyCard({ project }) {
  return (
    <article className="case-study-card reveal">
      {/* ---------- BLURRED BACKGROUND ---------- */}
      <div className="case-study-bg">
        {project.image ? (
          <img src={fileUrl(project.image)} alt="" aria-hidden="true" />
        ) : (
          <div className="case-study-bg-fallback"></div>
        )}
      </div>

      {/* ---------- DARK OVERLAY (readability) ---------- */}
      <div className="case-study-overlay"></div>

      {/* ---------- CONTENT ---------- */}
      <div className="case-study-content">
        {/* Title */}
        <h3 className="case-study-title">{project.title}</h3>

        {/* Short description */}
        <p className="case-study-desc">{project.description}</p>

        {/* CTA */}
        <Link to={`/project/${project._id}`} className="case-study-btn">
          <span>VIEW CASE STUDY</span>
          <span className="case-study-btn-arrow">↗</span>
        </Link>
      </div>
    </article>
  );
}