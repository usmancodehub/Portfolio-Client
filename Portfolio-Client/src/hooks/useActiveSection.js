import { useEffect, useState } from "react";

export default function useActiveSection(sections) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return active;
}