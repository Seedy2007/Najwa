document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Remove if you want one-time animation
      }
    });
  }, {
    threshold: 0.2
  });

  animatedElements.forEach((el) => observer.observe(el));
});
const projectCards = document.querySelectorAll(".project-card");

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

projectCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.2}s`; // stagger delay
  cardObserver.observe(card);
});
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const heroText = document.querySelector(".hero-text");
  const scrollBar = document.getElementById("scroll-bar");

  // Nav fade-in
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Parallax effect
  const offset = window.scrollY * 0.2;
  heroText.style.transform = `translateY(${offset}px)`;

  // Scroll progress bar
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollBar.style.width = `${scrollPercent}%`;
});

const heroText = document.querySelector(".hero-text");

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

heroObserver.observe(heroText);
const contactSection = document.querySelector(".contact-animate");

const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      contactObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

contactObserver.observe(contactSection);
const footer = document.querySelector("footer");

const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      footerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

footerObserver.observe(footer);
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeButton = document.querySelector(".close-button");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img").src;
    const title = card.querySelector("h3").textContent;
    const desc = card.querySelector(".modal-details p[data-modal]")?.textContent || "";
    modalImage.src = img;
    modalTitle.textContent = title;
    modalDescription.textContent = desc;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
