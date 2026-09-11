const disclosures = document.querySelectorAll(".product-disclosure");
const sharedPlatformCards = document.querySelectorAll(".shared-platform-card");

disclosures.forEach((details) => {
  const summary = details.querySelector("summary");
  const syncState = () => summary.setAttribute("aria-expanded", String(details.open));
  details.addEventListener("toggle", syncState);
  syncState();
});

sharedPlatformCards.forEach((card) => {
  card.addEventListener("click", () => {
    const nextState = !card.classList.contains("is-flipped");
    sharedPlatformCards.forEach((item) => {
      item.classList.remove("is-flipped");
      item.setAttribute("aria-pressed", "false");
    });
    card.classList.toggle("is-flipped", nextState);
    card.setAttribute("aria-pressed", String(nextState));
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    card.classList.remove("is-flipped");
    card.setAttribute("aria-pressed", "false");
    card.blur();
  });
});

function revealHashTarget() {
  const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (!target) return;
  target.classList.add("hash-target");
  window.setTimeout(() => target.classList.remove("hash-target"), 1400);
}

window.addEventListener("hashchange", revealHashTarget);
revealHashTarget();
