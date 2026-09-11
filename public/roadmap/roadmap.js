const stages = new Set(["core", "pay-by-link", "ecommerce", "igaming"]);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function stageFromHash() {
  const id = window.location.hash.slice(1);
  return stages.has(id) ? document.getElementById(id) : null;
}

function setExpandedState(details) {
  const summary = details.querySelector("summary");
  if (summary) summary.setAttribute("aria-expanded", String(details.open));
}

function openStage(details, shouldScroll = true) {
  details.open = true;
  setExpandedState(details);
  if (shouldScroll) {
    details.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
  }
}

document.querySelectorAll(".roadmap-stage").forEach((details) => {
  setExpandedState(details);
  details.addEventListener("toggle", () => setExpandedState(details));
});

document.querySelectorAll("[data-roadmap-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    openStage(target);
  });
});

window.addEventListener("hashchange", () => {
  const target = stageFromHash();
  if (target) openStage(target);
});

const initialStage = stageFromHash();
if (initialStage) requestAnimationFrame(() => openStage(initialStage, true));
