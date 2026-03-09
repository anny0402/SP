// SP Photography - General UI logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Trigger hero animations after loader is gone
                    triggerHeroAnimations();
                }, 500);
            }
        }, 1000);
    });

    function triggerHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const scaleUp = document.querySelector('.scale-up');

        if (scaleUp) scaleUp.classList.add('visible');
        if (heroTitle) {
            heroTitle.classList.add('visible');
            const spans = heroTitle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transitionDelay = `${index * 0.2}s`;
            });
        }

        // Trigger all initial fade-ins in the hero
        document.querySelectorAll('.hero .fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }

    // 2. Navbar Scroll Effect
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Parallax Effect for Hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const scroll = window.pageYOffset;
            hero.style.backgroundPositionY = `${scroll * 0.5}px`;
        }
    });

    // 3. Advanced Reveal System
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a staggered container, handle children
                if (entry.target.classList.contains('stagger-container')) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, i * 150);
                    });
                }
            }
        });
    }, revealOptions);

    // Observe all animatable elements
    const elementsToObserve = [
        '.fade-in',
        '.fade-in-left',
        '.scale-up',
        '.reveal-text',
        '.stagger-container'
    ];

    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            revealObserver.observe(el);
        });
    });

    // 4. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
