import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API, { fileUrl } from "../api/axios";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    API.get(`/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        return API.get(`/projects?category=${res.data.category}`);
      })
      .then((res) => {
        setRelated(res.data.filter((p) => p._id !== id).slice(0, 3));
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // Build image list for lightbox
  useEffect(() => {
    if (project) {
      const imgs = [project.image, ...(project.gallery || [])].filter(Boolean);
      setLightboxImages(imgs);
    }
  }, [project]);

  // Keyboard navigation for lightbox
  const handleKey = useCallback(
    (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % lightboxImages.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (i) => (i - 1 + lightboxImages.length) % lightboxImages.length
        );
    },
    [lightboxOpen, lightboxImages.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () =>
    setLightboxIndex((i) => (i + 1) % lightboxImages.length);
  const prevImage = () =>
    setLightboxIndex(
      (i) => (i - 1 + lightboxImages.length) % lightboxImages.length
    );

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) return null;

  const gallery = project.gallery || [];
  const allImages = [project.image, ...gallery].filter(Boolean);

  return (
    <main className="pd">
      <div className="container">
        <Link to="/#projects" className="pd-back">
          ← Back to Projects
        </Link>

        {/* HERO */}
        <div className="pd-hero">
          <div className="pd-hero-info">
            <span className="pd-category">
              {project.category === "web" ? "Web Development" : "App Development"}
            </span>
            <h1>{project.title}</h1>
            <p className="pd-subtitle">{project.description}</p>

            <div className="pd-meta">
              {project.role && (
                <div>
                  <span>Role</span>
                  <strong>{project.role}</strong>
                </div>
              )}
              {project.duration && (
                <div>
                  <span>Duration</span>
                  <strong>{project.duration}</strong>
                </div>
              )}
              <div>
                <span>Category</span>
                <strong>{project.category.toUpperCase()}</strong>
              </div>
            </div>

            <div className="pd-actions">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  🚀 Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  ◉ View Code
                </a>
              )}
            </div>

            <div className="pd-tags">
              {project.tags?.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="pd-hero-image">
  {project.image ? (
    <img
      src={fileUrl(project.image)}
      alt={project.title}
    />
  ) : (
    <div className="pd-no-image">No image</div>
  )}
</div>
        </div>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="pd-gallery">
            <h2>Project Gallery</h2>
            <div className="pd-thumbs">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  className="pd-thumb"
                  onClick={() => openLightbox(i + 1)}
                >
                  <img src={fileUrl(img)} alt={`shot-${i + 1}`} />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* BODY */}
        <section className="pd-body">
          <div className="pd-body-main">
            <h2>About This Project</h2>
            <p style={{ whiteSpace: "pre-line" }}>
              {project.longDescription || project.description}
            </p>

            {project.features?.length > 0 && (
              <>
                <h2 style={{ marginTop: 32 }}>Key Features</h2>
                <ul className="pd-features">
                  {project.features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="pd-sidebar">
            <h3>Project Info</h3>
            <div className="pd-info-row">
              <span>Category</span>
              <strong>{project.category.toUpperCase()}</strong>
            </div>
            {project.role && (
              <div className="pd-info-row">
                <span>Role</span>
                <strong>{project.role}</strong>
              </div>
            )}
            {project.duration && (
              <div className="pd-info-row">
                <span>Duration</span>
                <strong>{project.duration}</strong>
              </div>
            )}
            <div className="pd-info-row">
              <span>Tech Stack</span>
              <strong>{project.tags?.join(", ") || "—"}</strong>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: 16 }}
              >
                Visit Live Site →
              </a>
            )}
          </aside>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="pd-related">
            <h2>More Projects</h2>
            <div className="pd-related-grid">
              {related.map((r) => (
                <Link
                  to={`/project/${r._id}`}
                  key={r._id}
                  className="pd-related-card"
                >
                  <div className="pd-related-image">
                    {r.image ? (
                      <img src={fileUrl(r.image)} alt={r.title} />
                    ) : (
                      <span>▣</span>
                    )}
                  </div>
                  <div className="pd-related-info">
                    <h3>{r.title}</h3>
                    <p>{r.description.slice(0, 90)}...</p>
                    <span className="pd-related-link">View Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div className="pd-lightbox" onClick={() => setLightboxOpen(false)}>
          <button
            className="pd-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>

          {lightboxImages.length > 1 && (
            <>
              <button
                className="pd-lightbox-nav pd-lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className="pd-lightbox-nav pd-lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          <div
            className="pd-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fileUrl(lightboxImages[lightboxIndex])}
              alt="Full size"
            />
            <div className="pd-lightbox-counter">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}