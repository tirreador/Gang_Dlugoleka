document.documentElement.classList.add("js");

// Po potwierdzeniu oficjalnych nazw wpisz je tylko tutaj. Wartość null
// zachowuje neutralną, widoczną także bez JavaScriptu etykietę z HTML.
const partnerNames = [null, null];
document.querySelectorAll("[data-partner-name]").forEach((element) => {
  const confirmedName = partnerNames[Number(element.dataset.partnerName)];
  if (confirmedName) element.textContent = confirmedName;
});

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const menuLinks = [...navigation.querySelectorAll("a")];

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

function closeMenu({ restoreFocus = true } = {}) {
  if (menuButton.getAttribute("aria-expanded") !== "true") return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  if (restoreFocus) menuButton.focus({ preventScroll: true });
}

function openMenu() {
  menuButton.setAttribute("aria-expanded", "true");
  navigation.classList.add("is-open");
  header.classList.add("is-open");
  document.body.classList.add("menu-open");
  menuLinks[0]?.focus();
}

menuButton.addEventListener("click", () => {
  if (menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
  } else {
    openMenu();
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (menuButton.getAttribute("aria-expanded") !== "true") return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = [menuButton, ...navigation.querySelectorAll(focusableSelector)];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu({ restoreFocus: false });
});
setHeaderState();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px" });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const galleryItems = [...document.querySelectorAll("[data-gallery-item]")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector(".lightbox__image");
const lightboxCaption = lightbox.querySelector("#lightbox-caption");
const lightboxCount = lightbox.querySelector(".lightbox__count");
const closeLightboxButton = lightbox.querySelector(".lightbox__close");
const previousButton = lightbox.querySelector(".lightbox__nav--prev");
const nextButton = lightbox.querySelector(".lightbox__nav--next");
let activeImageIndex = 0;
let galleryTrigger = null;

function showGalleryImage(index) {
  activeImageIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeImageIndex];
  const thumbnail = item.querySelector("img");

  lightboxImage.src = item.href;
  lightboxImage.alt = thumbnail.alt;
  lightboxCaption.textContent = item.dataset.caption;
  lightboxCount.textContent = `${activeImageIndex + 1} / ${galleryItems.length}`;
}

function openLightbox(index, trigger) {
  galleryTrigger = trigger;
  showGalleryImage(index);
  lightbox.showModal();
  closeLightboxButton.focus();
}

function closeLightbox() {
  lightbox.close();
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    if (typeof lightbox.showModal !== "function") return;
    event.preventDefault();
    openLightbox(index, item);
  });
});

closeLightboxButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => showGalleryImage(activeImageIndex - 1));
nextButton.addEventListener("click", () => showGalleryImage(activeImageIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showGalleryImage(activeImageIndex - 1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    showGalleryImage(activeImageIndex + 1);
  }
});

lightbox.addEventListener("close", () => {
  galleryTrigger?.focus({ preventScroll: true });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
