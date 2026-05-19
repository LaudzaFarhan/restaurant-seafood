document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => preloader.remove(), 500); // Remove from DOM after fade
    }, 1000); // Minimal 1s display for branding

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const navLogo = document.getElementById('nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileBtn = document.getElementById('mobile-menu-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav', 'py-2');
            navbar.classList.remove('py-4', 'bg-transparent');
            navLogo.classList.remove('text-white');
            navLogo.classList.add('text-ocean-900');
            
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-ocean-900');
            });
            
            mobileBtn.classList.remove('text-white');
            mobileBtn.classList.add('text-ocean-900');
        } else {
            navbar.classList.remove('glass-nav', 'py-2');
            navbar.classList.add('py-4', 'bg-transparent');
            navLogo.classList.add('text-white');
            navLogo.classList.remove('text-ocean-900');
            
            navLinks.forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-ocean-900');
            });
            
            mobileBtn.classList.add('text-white');
            mobileBtn.classList.remove('text-ocean-900');
        }
    });

    // 3. Mobile Menu Toggle with Accessibility
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon between bars and x
        if (isExpanded) {
            mobileMenuIcon.classList.remove('fa-xmark');
            mobileMenuIcon.classList.add('fa-bars');
        } else {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-xmark');
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuIcon.classList.remove('fa-xmark');
            mobileMenuIcon.classList.add('fa-bars');
        });
    });

    // 4. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 5. Dynamic Date for Reservation Form (Min Date = Today)
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // 6. Stats Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    let hasCounted = false;

    const runCounter = () => {
        if (hasCounted) return;
        
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 50) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + (counter.getAttribute('data-suffix') || '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + (counter.getAttribute('data-suffix') || '');
                    }
                };
                updateCounter();
            });
            hasCounted = true;
        }
    };
    
    window.addEventListener('scroll', runCounter);
    runCounter(); // Check on load

    // 7. Form Validation and Submission
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredInputs = resForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    input.classList.remove('border-ocean-700', 'focus:ring-coral-500', 'focus:border-coral-500');
                } else {
                    input.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    input.classList.add('border-ocean-700', 'focus:ring-coral-500', 'focus:border-coral-500');
                }
            });

            if (isValid) {
                const msg = document.getElementById('success-msg');
                msg.classList.remove('hidden');
                
                // Reset form
                resForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    msg.classList.add('hidden');
                }, 5000);
            }
        });

        // Remove error styles on input
        resForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                input.classList.add('border-ocean-700', 'focus:ring-coral-500', 'focus:border-coral-500');
            });
        });
    }
});
