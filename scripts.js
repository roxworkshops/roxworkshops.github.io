const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-media]").forEach((frame) => {
  const media = frame.querySelector("img, video");
  if (!media) return;

  const markMissing = () => frame.classList.add("is-missing");
  media.addEventListener("error", markMissing);

  if (media.tagName === "IMG" && media.complete && media.naturalWidth === 0) {
    markMissing();
  }

  if (media.tagName === "VIDEO") {
    media.addEventListener("stalled", markMissing);
    media.addEventListener("emptied", markMissing);
    window.setTimeout(() => {
      if (media.readyState === 0 && media.networkState !== 1) markMissing();
    }, 1200);
  }
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
