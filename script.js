// script.js - Interactive features for Najwa's Interior Design website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initSmoothScrolling();
    initScrollAnimations();
    initProfileCardInteractions();
    initProjectModals();
    initScrollDownButton();
    initNavigationEffects();
    initTypewriterEffect();
    initParallaxEffect();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-content, .project-item, .contact-content');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Profile card interactions
function initProfileCardInteractions() {
    const profileCard = document.querySelector('.profile-blur');
    
    if (profileCard) {
        // Hover effect
        profileCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
        });
        
        profileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        });
        
        // Click effect
        profileCard.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98) translateY(2px)';
        });
        
        profileCard.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
        });
    }
}

// Project modals for detailed view
function initProjectModals() {
    const projectItems = document.querySelectorAll('.project-item');
    const body = document.body;
    
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get project details
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const imageUrl = this.querySelector('.project-image').style.backgroundImage.slice(5, -2);
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'project-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-image" style="background-image: url('${imageUrl}')"></div>
                    <div class="modal-text">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <button class="modal-close-btn">Close</button>
                    </div>
                </div>
            `;
            
            // Add modal to page
            body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Close modal functionality
            const closeModal = function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    body.removeChild(modal);
                }, 300);
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        });
    });
}

// Scroll down button functionality
function initScrollDownButton() {
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('#about').offsetTop,
                behavior: 'smooth'
            });
        });
    }
}

// Navigation effects on scroll
function initNavigationEffects() {
    const nav = document.querySelector('nav');
    const headerHeight = document.querySelector('#hero').offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight * 0.8) {
            nav.style.opacity = '0.9';
            nav.style.transform = 'translateY(-10px)';
        } else {
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
        }
        
        // Highlight active section in navigation
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typewriter effect for hero text (optional)
function initTypewriterEffect() {
    const titleElement = document.querySelector('.profile-blur .title');
    
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start effect when hero section is in view
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('#hero'));
    }
}

// Parallax effect for hero background
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Utility function for debouncing (for performance)
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}