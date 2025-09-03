document.addEventListener("DOMContentLoaded", () => {
  // Fade-in and slide-up animations
  const animatedElements = document.querySelectorAll(".fade-in, .slide-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach((el) => observer.observe(el));

  // Project cards fade-in after featured section is visible
  const featuredSection = document.getElementById("featured");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const projectCards = document.querySelectorAll(".project-card");
        projectCards.forEach((card, index) => {
          card.style.transitionDelay = `${index * 0.2}s`;
          card.classList.add("visible");
        });
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  sectionObserver.observe(featuredSection);
});

// Scroll effects
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

// Hero text fade-in
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

// Contact section animation
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

// Footer animation
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

// Modal viewer
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
