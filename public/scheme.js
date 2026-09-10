const steps = document.querySelectorAll(".reveal-step");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reveal-enabled");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  );

  steps.forEach((step, index) => {
    step.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 90}ms`);
    observer.observe(step);
  });
}
