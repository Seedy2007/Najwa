document.addEventListener("DOMContentLoaded", () => {
  // Fade-in and slide-up animations with staggered delay
  const animatedElements = document.querySelectorAll(".fade-in, .slide-up");
  animatedElements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.2}s`;
  });

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

  if (featuredSection) sectionObserver.observe(featuredSection);

  // Section divider animation
  document.querySelectorAll(".section-divider").forEach((divider, i) => {
    divider.style.transitionDelay = `${i * 0.2}s`;

    const dividerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          dividerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    dividerObserver.observe(divider);
  });
});

// Scroll effects
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const heroText = document.querySelector(".hero-text");
  const scrollBar = document.getElementById("scroll-bar");

  // Nav fade-in
  header.classList.toggle("scrolled", window.scrollY > 50);

  // Combined parallax effect
  const scrollOffset = window.scrollY * 0.2;
  const mouseOffset = heroText.dataset.mouseOffset || "0,0";
  const [mx, my] = mouseOffset.split(",").map(Number);
  heroText.style.transform = `translate(${mx}px, ${scrollOffset + my}px)`;

  // Scroll progress bar
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollBar.style.width = `${scrollPercent}%`;
});

// Mouse-follow parallax on hero
document.querySelector("#hero").addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 5;
  const y = (e.clientY / window.innerHeight - 0.5) * 5;
  const heroText = document.querySelector(".hero-text");
  heroText.dataset.mouseOffset = `${x},${y}`;
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

if (heroText) heroObserver.observe(heroText);

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

if (contactSection) contactObserver.observe(contactSection);

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

if (footer) footerObserver.observe(footer);

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
