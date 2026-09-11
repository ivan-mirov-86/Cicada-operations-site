const disclosures = document.querySelectorAll(".product-disclosure");

disclosures.forEach((details) => {
  const summary = details.querySelector("summary");
  const syncState = () => summary.setAttribute("aria-expanded", String(details.open));
  details.addEventListener("toggle", syncState);
  syncState();
});

function revealHashTarget() {
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  target.classList.add("hash-target");
  window.setTimeout(() => target.classList.remove("hash-target"), 1400);
}

window.addEventListener("hashchange", revealHashTarget);
revealHashTarget();
