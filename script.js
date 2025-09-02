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

  // Nav fade-in
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Parallax effect
  const offset = window.scrollY * 0.2;
  heroText.style.transform = `translateY(${offset}px)`;
});
