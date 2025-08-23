// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Header background on scroll - FIXED VERSION
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            // Remove any inline styles that might be interfering
            header.style.background = '';
            header.style.backdropFilter = '';
        }
    }

    // Initialize header state
    function initializeHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        // Clear any inline styles
        header.style.background = '';
        header.style.backdropFilter = '';
        
        // Set proper class based on scroll position
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Event listeners for header
    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('load', initializeHeader);
    window.addEventListener('pageshow', function() {
        setTimeout(initializeHeader, 100);
    });

    // Initialize header immediately
    initializeHeader();

    // Create floating particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        // Clear existing particles first
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            // Random size variation
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Tab switching functionality
    function initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons.length === 0) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Activate first tab by default if none are active
        const activeTab = document.querySelector('.tab-button.active');
        if (!activeTab && tabButtons.length > 0) {
            tabButtons[0].click();
        }
    }

    // Hamburger menu functionality
    function initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        if (!hamburger || !mobileMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Play button functionality
    function initializePlayButtons() {
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', () => {
                console.log('Play button clicked - Add your demo functionality here');
                // Add modal functionality or redirect to video here
                alert('Demo video would play here!');
            });
        });
    }

    // Feature item hover effects (enhanced)
    function initializeFeatureHovers() {
        document.querySelectorAll('.feature-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(8px)';
                this.style.background = 'rgba(102, 126, 234, 0.1)';
                this.style.paddingLeft = '20px';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.background = '';
                this.style.paddingLeft = '';
            });
        });
    }

    // Service card hover effects
    function initializeServiceCards() {
        document.querySelectorAll('.service-showcase').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Smooth scrolling for anchor links
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animate elements on scroll
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Contact form handling (if exists)
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }, 3000);
                
                // Show success message
                alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            }, 2000);
        });
    }

    // Counter animation for stats (if exists)
    function initializeStatsCounter() {
        function animateCounter(element, start, end, duration) {
            let startTime = null;
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value + (element.textContent.includes('%') ? '%' : 
                                              element.textContent.includes('+') ? '+' : '');
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        }

        // Animate stats when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target.querySelector('.stat-number');
                    if (number) {
                        const text = number.textContent;
                        const value = parseInt(text.replace(/[^\d]/g, ''));
                        number.textContent = '0' + text.replace(/\d/g, '');
                        animateCounter(number, 0, value, 2000);
                        statsObserver.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-item').forEach(item => {
            statsObserver.observe(item);
        });
    }

    // Initialize all components
    function initializeAll() {
        createParticles();
        initializeTabs();
        initializeHamburgerMenu();
        initializePlayButtons();
        initializeFeatureHovers();
        initializeServiceCards();
        initializeSmoothScrolling();
        initializeScrollAnimations();
        initializeContactForm();
        initializeStatsCounter();
    }

    // Run initialization
    initializeAll();

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            initializeHeader();
        }
    });
});

// Additional resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate any size-dependent elements
    const header = document.querySelector('.header');
    if (header) {
        setTimeout(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100);
    }
});
window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Tab switching functionality
        // Add this to your services.js file or in a <script> tag in Services.html
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const hash = window.location.hash.replace('#', '');
    
    if (serviceParam || hash) {
        const targetService = serviceParam || hash;
        
        // Remove active class from all
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.service-item').forEach(item => item.classList.remove('active'));
        
        // Activate target service
        const targetTab = document.querySelector(`[data-service="${targetService}"]`);
        const targetSection = document.getElementById(targetService);
        
        if (targetTab && targetSection) {
            targetTab.classList.add('active');
            targetSection.classList.add('active');
            
            // Smooth scroll to section
            setTimeout(() => {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        }
    }
});

        // Mobile menu toggle (if needed)
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                // Add mobile menu functionality if needed
            });
        }


        