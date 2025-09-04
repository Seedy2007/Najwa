// =======================
// DOMContentLoaded Events
// =======================
document.addEventListener("DOMContentLoaded", () => {
  setupAnimatedElements();
  observeFeaturedSection();
  observeSectionDividers();
});

// =======================
// Scroll Effects
// =======================
window.addEventListener("scroll", () => {
  handleHeaderScroll();
  applyHeroParallax();
  updateScrollProgress();
  updateHeroBackground();
});

// =======================
// Mouse Parallax on Hero
// =======================
document.querySelector("#hero").addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 5;
  const y = (e.clientY / window.innerHeight - 0.5) * 5;
  const heroText = document.querySelector(".hero-text");
  heroText.dataset.mouseOffset = `${x},${y}`;
});

// =======================
// Intersection Observers
// =======================
setupHeroObserver();
setupContactObserver();
setupFooterObserver();

// =======================
// Modal Viewer
// =======================
setupModalViewer();

// =======================
// Functions
// =======================

function setupAnimatedElements() {
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
}

function observeFeaturedSection() {
  const featuredSection = document.getElementById("featured");
  if (!featuredSection) return;

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
}

function observeSectionDividers() {
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
}

function handleHeaderScroll() {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
}

function applyHeroParallax() {
  const heroText = document.querySelector(".hero-text");
  const scrollOffset = window.scrollY * 0.2;
  const mouseOffset = heroText.dataset.mouseOffset || "0,0";
  const [mx, my] = mouseOffset.split(",").map(Number);
  heroText.style.transform = `translate(${mx}px, ${scrollOffset + my}px)`;
}

function updateScrollProgress() {
  const scrollBar = document.getElementById("scroll-bar");
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollBar.style.width = `${scrollPercent}%`;
}

function updateHeroBackground() {
  const hero = document.getElementById("hero");
  const offset = window.scrollY * 0.5;
  hero.style.backgroundPosition = `center ${offset}px`;
}

function setupHeroObserver() {
  const heroText = document.querySelector(".hero-text");
  if (!heroText) return;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  heroObserver.observe(heroText);
}

function setupContactObserver() {
  const contactSection = document.querySelector(".contact-animate");
  if (!contactSection) return;

  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  contactObserver.observe(contactSection);
}

function setupFooterObserver() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        footerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  footerObserver.observe(footer);
}

function setupModalViewer() {
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

  closeButton.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}
