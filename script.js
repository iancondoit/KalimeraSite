// Hero Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let slideInterval;

    // Initialize carousel
    function initCarousel() {
        showSlide(0);
        startAutoSlide();
    }

    // Show specific slide with enhanced transitions
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
        
        // Add subtle zoom effect to active slide image
        const activeImg = slides[index].querySelector('img');
        if (activeImg) {
            activeImg.style.transform = 'scale(1.02)';
            setTimeout(() => {
                activeImg.style.transform = 'scale(1)';
            }, 100);
        }
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto slide functionality
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoSlide();
            if (diff > 0) {
                // Swipe left, show next slide
                nextSlide();
            } else {
                // Swipe right, show previous slide
                prevSlide();
            }
            startAutoSlide();
        }
    }
    
    if (heroSection) {
        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    // Initialize carousel
    initCarousel();
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight + 
                                   document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.inquiry-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Basic form validation
            const requiredFields = ['customer-type', 'company-type', 'first-name', 'last-name', 'company', 'email', 'phone'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!formObject[field] || formObject[field].trim() === '') {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById('email');
            if (!emailRegex.test(formObject.email)) {
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                emailInput.style.borderColor = '#ddd';
            }
            
            if (isValid) {
                // Show success message (in a real implementation, this would send to a server)
                alert('Thank you for your inquiry! We will contact you within 24 hours.');
                
                // Reset form
                this.reset();
                
                // Log form data for development (remove in production)
                console.log('Form submission:', formObject);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
});

// Enhanced scroll-based animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add animate-on-scroll class to elements and observe them
    const animateElements = document.querySelectorAll('.product-item, .team-member, .capability-item, .service-item, .product-category, .partner-item, .format-item, .contact-item');
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        // Add staggered delays for grouped elements
        if (index % 4 === 1) el.classList.add('delay-1');
        if (index % 4 === 2) el.classList.add('delay-2');
        if (index % 4 === 3) el.classList.add('delay-3');
        if (index % 4 === 0 && index > 0) el.classList.add('delay-4');
        
        observer.observe(el);
    });
    
    // Also animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll');
        observer.observe(header);
    });
});

// Mobile menu toggle (for future mobile optimization)
document.addEventListener('DOMContentLoaded', function() {
    // This would be implemented if we add a mobile hamburger menu
    // For now, the responsive design handles mobile navigation
});

// Enhanced partner interactions
document.addEventListener('DOMContentLoaded', function() {
    const partnerItems = document.querySelectorAll('.partner-item');
    
    partnerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add pulse effect to other partner items
            partnerItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.98)';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset all partner items
            partnerItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
        });
    });
});

// Utility function for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-to-top functionality if needed
document.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
    
    // Could add a scroll-to-top button here if desired
    // For now, keeping it simple
});

// Console log for development
console.log('Kalimera Imports website loaded successfully!'); 