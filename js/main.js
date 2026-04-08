// Theme Management
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    function getPreferredTheme() {
        const stored = localStorage.getItem('abms-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('abms-theme', theme);
    }

    setTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
})();

// Mobile Navigation
(function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
})();

// Navbar scroll effect
(function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    var lastScroll = 0;
    window.addEventListener('scroll', function() {
        var scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for scroll animations
(function() {
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.pillar-card, .security-card, .impact-card, .cert-preview-card, .cert-detail, .feature-item, .split-visual'
    ).forEach(function(el) {
        observer.observe(el);
    });
})();

// Contact form handler
(function() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--color-success, #10b981)';
        setTimeout(function() {
            btn.textContent = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
})();

// Animate stat numbers on scroll
(function() {
    var stats = document.querySelectorAll('.stat-value, .impact-number');
    var animated = new Set();

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !animated.has(entry.target)) {
                animated.add(entry.target);
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(function(stat) { observer.observe(stat); });
})();
