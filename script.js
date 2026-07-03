// ============================================
// Environment flags
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(hover: none)').matches;

// ============================================
// Scroll Progress Indicator
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (window.pageYOffset / documentHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ============================================
// Typing Effect (hero roles)
// ============================================
(function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const roles = [
        'SaaS platforms.',
        'AI-powered products.',
        'internal tools.',
        'full-stack web apps.',
        'things that ship.'
    ];

    if (prefersReducedMotion) {
        el.textContent = roles[0];
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const current = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 2100);
                return;
            }
            setTimeout(tick, 65);
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(tick, 350);
                return;
            }
            setTimeout(tick, 35);
        }
    }

    setTimeout(tick, 900);
})();

// ============================================
// Animated Stat Counters
// ============================================
(function initCounters() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';

        if (prefersReducedMotion) {
            el.textContent = target + suffix;
            return;
        }

        const duration = 1600;
        const start = performance.now();

        function frame(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => counterObserver.observe(stat));
})();

// ============================================
// Spotlight effect (cards track cursor)
// ============================================
if (!isTouchDevice) {
    document.querySelectorAll('[data-spotlight]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
    });
}

// ============================================
// Magnetic buttons
// ============================================
if (!isTouchDevice && !prefersReducedMotion) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        const strength = 0.25;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// 3D Tilt on project cards
// ============================================
if (!isTouchDevice && !prefersReducedMotion) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// Back to Top
// ============================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('show', window.pageYOffset > 500);
}, { passive: true });

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// Burger menu
// ============================================
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Smooth scrolling for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// Navbar scrolled state
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 60);
}, { passive: true });

// ============================================
// Reveal on scroll (with stagger)
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // Stagger siblings revealed in the same batch
        const parent = el.parentElement;
        const siblings = parent ? [...parent.children].filter(c => c.classList.contains('reveal')) : [el];
        const index = siblings.indexOf(el);
        el.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.4)}s`);

        el.classList.add('fade-in');

        // Animate skill bars when their category appears
        if (el.classList.contains('skill-category')) {
            el.querySelectorAll('.skill-progress').forEach(bar => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.progress + '%';
                }, 250);
            });
        }

        revealObserver.unobserve(el);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
// Contact form (Web3Forms)
// ============================================
const contactForm = document.getElementById('contactForm');
const formModal = document.getElementById('formModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

function showModal(title, message, type) {
    modalIcon.className = `modal-icon ${type}`;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    formModal.classList.add('show');
}

function hideModal() {
    formModal.classList.remove('show');
}

modalClose.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formModal.classList.contains('show')) hideModal();
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const label = submitButton.querySelector('span');
    const originalText = label.textContent;

    label.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.success) {
            showModal('Message Sent!', "Thank you for reaching out! I'll get back to you soon.", 'success');
            contactForm.reset();
        } else {
            showModal('Oops!', 'Something went wrong. Please try again or email me directly.', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showModal('Oops!', 'Something went wrong. Please try again or email me directly.', 'error');
    } finally {
        label.textContent = originalText;
        submitButton.disabled = false;
    }
});

// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });
