import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.querySelectorAll(".skill-progress").forEach((bar) => {
              bar.style.width = bar.dataset.width;
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe existing .reveal elements
    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        io.observe(el);
      });
    };

    observeAll();

    // Watch for new .reveal elements added later (like skills from API)
    const mo = new MutationObserver(() => {
      observeAll();
    });

    mo.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}