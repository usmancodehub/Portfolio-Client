import React from "react";

export default function Footer() {
  const adminUrl = process.env.REACT_APP_ADMIN_URL || "http://localhost:3001";

  return (
    <footer>
      <div className="container">
        © {new Date().getFullYear()} Usman. All rights reserved.
        <a
          href={adminUrl}
          title="Admin"
          style={{
            marginLeft: 12,
            opacity: 0.15,
            fontSize: 11,
            textDecoration: "none",
            color: "inherit",
            transition: "opacity .3s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = 0.6)}
          onMouseLeave={(e) => (e.target.style.opacity = 0.15)}
        >
        
        </a>
      </div>
    </footer>
  );
}