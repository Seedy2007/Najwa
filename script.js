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
