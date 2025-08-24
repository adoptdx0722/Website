// Clean and optimized services.js - Handles tab navigation and page functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // TAB NAVIGATION SYSTEM
    // ==========================================
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Function to activate a specific service/tab
    function activateService(serviceName) {
        // Remove active class from all tabs and services
        tabButtons.forEach(btn => btn.classList.remove('active'));
        serviceItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to the target tab and service
        const targetTab = document.querySelector(`[data-service="${serviceName}"]`);
        const targetService = document.getElementById(serviceName);
        
        if (targetTab && targetService) {
            targetTab.classList.add('active');
            targetService.classList.add('active');
            
            // Update URL without triggering page reload
            const newUrl = `?service=${serviceName}#${serviceName}`;
            window.history.replaceState({}, '', newUrl);
            
            // Smooth scroll to section after a brief delay
            setTimeout(() => {
                targetService.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
    
    // Function to get service from URL (either hash or parameter)
    function getServiceFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        const hash = window.location.hash.replace('#', '');
        
        // Priority: URL parameter > hash > default (invoice)
        return serviceParam || hash || 'invoice';
    }
    
    // Initialize the correct tab based on URL
    function initializeServiceTabs() {
        const activeService = getServiceFromUrl();
        activateService(activeService);
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.getAttribute('data-service');
            activateService(serviceName);
        });
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        initializeServiceTabs();
    });
    
    // Handle hash changes (when someone clicks a link with #hash)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            activateService(hash);
        }
    });
    
    // Initialize tabs on page load
    initializeServiceTabs();
    
    // ==========================================
    // HEADER FUNCTIONALITY
    // ==========================================
    
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            header.style.background = '';
            header.style.backdropFilter = '';
        }
    }
    
    function initializeHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        header.style.background = '';
        header.style.backdropFilter = '';
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('load', initializeHeader);
    initializeHeader();
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    
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
    
    // ==========================================
    // PARTICLES ANIMATION
    // ==========================================
    
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    
    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ==========================================
    // HOVER EFFECTS
    // ==========================================
    
    function initializeHoverEffects() {
        // Feature item hovers
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

        // Service card hovers
        document.querySelectorAll('.service-showcase').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ==========================================
    // INITIALIZE ALL COMPONENTS
    // ==========================================
    
    initializeHamburgerMenu();
    createParticles();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeHoverEffects();
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            initializeHeader();
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        setTimeout(() => {
            initializeHeader();
        }, 100);
    });
});