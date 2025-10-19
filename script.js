// Main JavaScript for Sattvayog by Arti

document.addEventListener('DOMContentLoaded', function() {
    // Initialize parallax effect
    initParallax();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize testimonial slider
    initTestimonialSlider();
});

// Parallax scrolling effect
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const parallaxBg = section.querySelector('.parallax-bg');
            if (parallaxBg) {
                const speed = 0.5;
                const yPos = -(scrollPosition * speed);
                parallaxBg.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(this.getAttribute('href').indexOf('#'));
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('#navToggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const navToggle = document.querySelector('#navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth;
    let currentIndex = 0;
    
    // Set initial position
    updateSliderPosition();
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
    }
    
    // Dot navigation
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateSliderPosition();
            });
        });
    }
    
    function updateSliderPosition() {
        const position = -currentIndex * cardWidth;
        track.style.transform = `translateX(${position}px)`;
        
        // Update active dot
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    // Auto slide every 5 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSliderPosition();
    }, 5000);
}

// Fade-in animation for elements
window.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
    
    parallaxElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;
        
        if (elementTop < windowHeight) {
            const distance = (windowHeight - elementTop) * 0.1;
            element.style.transform = `translateY(${distance}px)`;
        }
    });
});
