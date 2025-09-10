// script.js - Enhanced interactive features for Najwa's Interior Design website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initSmoothScrolling();
    initScrollAnimations();
    initProfileCardInteractions();
    initProjectModals();
    initScrollDownButton();
    initNavigationEffects();
    initTypewriterEffect();
    initFixedHeroBackground();
    initNavigationHideShow();
    initProfileCardParallax();
    initContactItemsInteractions();
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
        threshold: 0.15,
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
            this.style.transform = 'scale(1.05) translateY(-8px)';
            this.style.boxShadow = '0 15px 45px rgba(0, 0, 0, 0.25)';
        });
        
        profileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
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
            const imageUrl = getComputedStyle(this.querySelector('.project-image')).backgroundImage.slice(5, -2);
            
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
                        <button class="modal-close-btn">Close Project</button>
                    </div>
                </div>
            `;
            
            // Add modal to page
            body.appendChild(modal);
            
            // Disable body scroll when modal is open
            document.body.style.overflow = 'hidden';
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Close modal functionality
            const closeModal = function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 400);
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', closeOnEscape);
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
        
        // Add floating animation
        scrollDownBtn.style.animation = 'float 3s ease-in-out infinite';
    }
}

// Navigation effects on scroll
function initNavigationEffects() {
    const nav = document.querySelector('nav');
    const headerHeight = document.querySelector('#hero').offsetHeight;
    
    window.addEventListener('scroll', function() {
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

// Typewriter effect for hero text
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
                setTimeout(typeWriter, 500);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('#hero'));
    }
}

// Fixed hero background (no parallax)
function initFixedHeroBackground() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        // Remove any parallax effect and keep it fixed
        heroBackground.style.position = 'fixed';
        heroBackground.style.transform = 'none';
        
        // Reset any scroll event listeners that might affect it
        window.addEventListener('scroll', function() {
            heroBackground.style.transform = 'none';
        });
    }
}

// Navigation hide/show when scrolling out of hero section
function initNavigationHideShow() {
    const nav = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', debounce(function() {
        const currentScrollY = window.scrollY;
        
        // Show/hide based on scroll position
        if (currentScrollY > heroHeight * 0.8) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
            nav.classList.add('visible');
        }
    }, 100));
}

// Profile card parallax effect
function initProfileCardParallax() {
    const profileCard = document.querySelector('.profile-blur');
    const heroSection = document.getElementById('hero');
    
    if (profileCard && heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.2; // Positive rate to make it follow the scroll
            
            // Only apply parallax within the hero section
            if (scrolled < heroSection.offsetHeight) {
                profileCard.style.transform = `translateY(${rate}px)`;
                
                // Add hover effect compatibility
                if (!profileCard.matches(':hover')) {
                    profileCard.style.transform = `translateY(${rate}px) scale(1)`;
                }
            }
        });
    }
}

// Contact items interactions
function initContactItemsInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Copy to clipboard functionality
            const text = this.querySelector('p').textContent;
            
            // Create temporary textarea for copying
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                
                // Show feedback
                const originalBg = this.style.background;
                this.style.background = 'rgba(212, 175, 55, 0.2)';
                
                setTimeout(() => {
                    this.style.background = originalBg;
                }, 1000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            
            document.body.removeChild(textarea);
        });
    });
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