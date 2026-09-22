import React from "react";

const PHRASES = [
  { text: "Building Scalable Web Applications", style: "outline" },
  { text: "Crafting Modern User Experiences", style: "solid" },
];

export default function Marquee() {
  // Duplicate so the loop is seamless
  const items = [...PHRASES, ...PHRASES];

  return (
    <section className="marquee-section" aria-hidden="true">
      <div className="marquee-row">
        <div className="marquee-track">
          {items.map((phrase, i) => (
            <span
              className={`marquee-item marquee-item-${phrase.style}`}
              key={i}
            >
            
              <span className="marquee-text">{phrase.text}</span>
              < Star />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Inline SVG starburst */
function Star() {
  return (
    <svg
      className="marquee-star"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path
        d="M12 1 L13.6 8.2 L20.5 4.5 L16.8 11.4 L24 13 L16.8 14.6 L20.5 21.5 L13.6 17.8 L12 25 L10.4 17.8 L3.5 21.5 L7.2 14.6 L0 13 L7.2 11.4 L3.5 4.5 L10.4 8.2 Z"
        transform="translate(0,-1)"
      />
    </svg>
  );
}