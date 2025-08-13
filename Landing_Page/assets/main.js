document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('#mobileNav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavOverlay = document.querySelector('#mobileNavOverlay');

    function toggleMobileMenu() {
        const isOpen = mobileNav.classList.contains('active');
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', toggleMobileMenu);
    }
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on nav link click
    if (mobileNav) {
        mobileNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Solutions Tabs
    const solutionTabs = document.querySelectorAll('.solutions-tabs .tab-btn');
    const solutionPanes = document.querySelectorAll('.solution-pane');

    solutionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;

            // Update active tab
            solutionTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding pane
            solutionPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Pricing Tabs
    const pricingTabs = document.querySelectorAll('.pricing-tabs .tab-btn');
    const pricingCards = document.querySelectorAll('.pricing-price');

    pricingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pricingTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const period = tab.dataset.period;
            pricingCards.forEach(card => {
                if (card.dataset[period]) {
                    card.querySelector('.price-value').textContent = card.dataset[period].split('/')[0];
                }
            });
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        if (themeToggle && savedTheme === 'dark') {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        }
    }

    // Smooth Scroll
    document.querySelectorAll('.nav-link, a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        mobileNavOverlay.classList.remove('active');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = 'auto';
                    }
                }
            }
        });
    });

    // Form Submission
    const ctaForm = document.querySelector('.cta-form');
    const formMessage = document.querySelector('.form-message');

    if (ctaForm && formMessage) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = ctaForm.querySelector('input[type="email"]');
            const nameInput = ctaForm.querySelector('input[type="text"]');
            const companyInput = ctaForm.querySelector('input[type="text"]:nth-child(3)');
            const email = emailInput.value.trim();
            const name = nameInput.value.trim();
            const company = companyInput.value.trim();

            if (!name || !email || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formMessage.textContent = 'Please fill all fields with valid information';
                formMessage.style.color = '#ff6b6b';
            } else {
                formMessage.textContent = 'Thank you! A representative will contact you shortly.';
                formMessage.style.color = 'white';
                emailInput.value = '';
                nameInput.value = '';
                companyInput.value = '';

                // Trigger confetti effect
                triggerConfetti();
            }

            formMessage.classList.add('show');
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        });
    }

    // Confetti effect
    function triggerConfetti() {
        const confettiSettings = {
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        };

        // Check if confetti function exists (would need to include confetti.js library)
        if (typeof confetti === 'function') {
            confetti(confettiSettings);
        }
    }

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-fade-in').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Tooltip initialization
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.querySelector('.tooltip-text');
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        });
        tooltip.addEventListener('mouseleave', () => {
            const tooltipText = tooltip.querySelector('.tooltip-text');
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
});
