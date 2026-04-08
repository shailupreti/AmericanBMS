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

// Intersection Observer for scroll animations (with staggered delays)
(function() {
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add staggered delay for cards in grids
                var parent = entry.target.parentElement;
                if (parent) {
                    var siblings = parent.querySelectorAll('.pillar-card, .security-card, .impact-card, .cert-preview-card, .feoc-card, .scale-card, .cell-card, .chem-card, .sim-card');
                    var index = Array.prototype.indexOf.call(siblings, entry.target);
                    if (index > 0) {
                        entry.target.style.transitionDelay = (index * 0.1) + 's';
                    }
                }
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.pillar-card, .security-card, .impact-card, .cert-preview-card, .cert-detail, .feature-item, .split-visual, .feoc-card, .scale-card, .cell-card, .chem-card, .sim-card, .workflow-step'
    ).forEach(function(el) {
        observer.observe(el);
    });
})();

// ============================================
// TYPEWRITER EFFECT
// ============================================
(function() {
    var el = document.getElementById('typewriter');
    if (!el) return;

    var text = "Powering America's";
    var i = 0;
    var speed = 80;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            el.classList.add('typewriter-done');
        }
    }

    // Start after a brief delay for page load
    setTimeout(type, 500);
})();

// ============================================
// ANIMATED COUNTERS
// ============================================
(function() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animated = new Set();

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !animated.has(entry.target)) {
                animated.add(entry.target);
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(c) { observer.observe(c); });
})();

// ============================================
// FLOATING PARTICLES (Hero)
// ============================================
(function() {
    var container = document.getElementById('heroParticles');
    if (!container) return;

    var particleCount = 30;
    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        particle.style.animationDelay = (Math.random() * 4) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(particle);
    }
})();

// ============================================
// PARALLAX ON SCROLL
// ============================================
(function() {
    var heroGlow = document.querySelector('.hero-glow');
    var orbits = document.querySelectorAll('.orbit-ring');
    if (!heroGlow && !orbits.length) return;

    window.addEventListener('scroll', function() {
        var scrollY = window.scrollY;
        if (scrollY > window.innerHeight) return; // Skip when past hero

        if (heroGlow) {
            heroGlow.style.transform = 'translateX(-50%) translateY(' + (scrollY * 0.3) + 'px)';
        }
        orbits.forEach(function(ring, i) {
            ring.style.transform = 'rotate(' + (scrollY * (0.05 + i * 0.02)) + 'deg)';
        });
    }, { passive: true });
})();

// ============================================
// CONTACT FORM — Web3Forms
// ============================================
(function() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var btn = form.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        var formData = new FormData(form);

        fetch('https://formsubmit.co/ajax/admin@c4v.us', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.success) {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#10b981';
                form.reset();
            } else {
                btn.textContent = 'Error — Try Again';
                btn.style.background = '#ef4444';
            }
            setTimeout(function() {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        })
        .catch(function() {
            btn.textContent = 'Error — Try Again';
            btn.style.background = '#ef4444';
            setTimeout(function() {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    });
})();

// Animate stat numbers on scroll (for non-counter stats like impact-number)
(function() {
    var stats = document.querySelectorAll('.impact-number');
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
