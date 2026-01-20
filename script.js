// ===== PRELOADER =====
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 800);
    });
});

// ===== NAVIGATION SCROLL =====
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMobile = document.getElementById('navMobile');
            const navToggle = document.getElementById('navToggle');
            if (navMobile && navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Staggered animation for children
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-item[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const suffix = counter.dataset.suffix || '';
                const numberEl = counter.querySelector('.stat-number');

                if (numberEl) {
                    animateCounter(numberEl, 0, target, 2000, suffix);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

function animateCounter(element, start, end, duration, suffix) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + range * easeOutQuart);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMobile.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== BUTTON SHINE EFFECT =====
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const shine = this.querySelector('.btn-shine');
        if (shine) {
            shine.style.left = '-100%';
            setTimeout(() => {
                shine.style.transition = 'left 0.5s ease';
                shine.style.left = '100%';
            }, 10);
        }
    });

    btn.addEventListener('mouseleave', function() {
        const shine = this.querySelector('.btn-shine');
        if (shine) {
            shine.style.transition = 'none';
            shine.style.left = '-100%';
        }
    });
});

// ===== PARALLAX EFFECT =====
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.spec-card, .credential-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.nav-cta, .btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== SCROLL PROGRESS =====
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
document.body.appendChild(scrollProgress);

const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(181, 101, 143, 0.1);
        z-index: 9999;
    }
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #b8658f, #d4a5bd);
        width: 0%;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(progressStyle);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

// ===== STICKY BOTTOM BAR =====
const bottomBar = document.getElementById('bottomBar');
let bottomBarShown = false;

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Show bottom bar after scrolling past hero section
    if (scrolled > windowHeight * 0.5 && !bottomBarShown) {
        bottomBar.classList.add('visible');
        bottomBarShown = true;
    }

    // Hide when near footer
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < windowHeight) {
            bottomBar.classList.remove('visible');
        } else if (scrolled > windowHeight * 0.5) {
            bottomBar.classList.add('visible');
        }
    }
});

// ===== COOKIE BANNER =====
const cookieBanner = document.getElementById('cookieBanner');
const cookieIcon = document.getElementById('cookieIcon');
const cookieClose = document.getElementById('cookieClose');
const cookieAccept = document.getElementById('cookieAccept');
const cookieReject = document.getElementById('cookieReject');

// Check if user has already made a choice
function getCookieConsent() {
    return localStorage.getItem('cookieConsent');
}

// Save cookie consent
function saveCookieConsent(consent) {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
}

// Show banner
function showCookieBanner() {
    cookieBanner.classList.add('visible');
    cookieIcon.classList.remove('visible');
}

// Hide banner and show icon
function hideCookieBanner() {
    cookieBanner.classList.remove('visible');
    cookieIcon.classList.add('visible');
}

// Initialize on page load
if (!getCookieConsent()) {
    setTimeout(() => {
        showCookieBanner();
    }, 1000);
} else {
    cookieIcon.classList.add('visible');
}

// Close button - just hides, shows icon
if (cookieClose) {
    cookieClose.addEventListener('click', hideCookieBanner);
}

// Cookie icon - reopens banner
if (cookieIcon) {
    cookieIcon.addEventListener('click', showCookieBanner);
}

// Accept all
if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
        saveCookieConsent({
            necessary: true,
            analytics: true,
            timestamp: new Date().toISOString()
        });
        hideCookieBanner();
    });
}

// Reject all
if (cookieReject) {
    cookieReject.addEventListener('click', () => {
        saveCookieConsent({
            necessary: true,
            analytics: false,
            timestamp: new Date().toISOString()
        });
        hideCookieBanner();
    });
}

console.log('Natalia Pucz - Premium Therapy Website Loaded');
