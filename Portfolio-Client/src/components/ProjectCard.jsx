import React from "react";
import { Link } from "react-router-dom";
import { fileUrl } from "../api/axios";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/project/${project._id}`}
      className="project-card reveal"
      data-category={project.category}
    >
      <div className="project-image">
        {project.image ? (
          <img
            src={fileUrl(project.image)}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "▣"
        )}
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags?.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span className="project-link">View Project ↗</span>
      </div>
    </Link>
  );
}