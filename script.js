/* ─── CUSTOM CURSOR ─── */
const cursorOuter = document.getElementById('cursorOuter');
const cursorInner = document.getElementById('cursorInner');

let outerX = 0, outerY = 0;
let innerX = 0, innerY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    innerX = e.clientX;
    innerY = e.clientY;
    cursorInner.style.left = innerX + 'px';
    cursorInner.style.top  = innerY + 'px';
});

function animateCursor() {
    outerX += (mouseX - outerX) * 0.15;
    outerY += (mouseY - outerY) * 0.15;
    cursorOuter.style.left = outerX + 'px';
    cursorOuter.style.top  = outerY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .edu-card, .skill-group');
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOuter.classList.add('hovered');
        cursorInner.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursorOuter.classList.remove('hovered');
        cursorInner.classList.remove('hovered');
    });
});

/* ─── FLOATING PETALS ─── */
const petalColors = ['#F06292','#CE93D8','#90CAF9','#EF9A9A','#BA68C8','#FF8A80'];
const petalsContainer = document.getElementById('petals');
const PETAL_COUNT = 18;

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = Math.random() * 12 + 6;
    petal.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px; height: ${size}px;
        background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
        animation-duration: ${Math.random() * 12 + 10}s;
        animation-delay: ${Math.random() * 10}s;
    `;
    petalsContainer.appendChild(petal);
}
for (let i = 0; i < PETAL_COUNT; i++) createPetal();

/* ─── NAV SCROLL ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── TYPING EFFECT ─── */
const roles = ['Full-Stack Developer', 'AI Enthusiast', 'Problem Solver', 'React Developer'];
let rIdx = 0, cIdx = 0, deleting = false;
const roleEl = document.getElementById('typedRole');

function typeRole() {
    const current = roles[rIdx];
    roleEl.textContent = deleting
        ? current.substring(0, cIdx--)
        : current.substring(0, cIdx++);

    let delay = deleting ? 80 : 140;
    if (!deleting && cIdx > current.length) { delay = 1800; deleting = true; }
    else if (deleting && cIdx < 0)          { deleting = false; rIdx = (rIdx + 1) % roles.length; cIdx = 0; delay = 400; }
    setTimeout(typeRole, delay);
}
typeRole();

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ─── VANILLA TILT (edu cards) ─── */
document.addEventListener('DOMContentLoaded', () => {
    const tiltEls = document.querySelectorAll('[data-tilt]');
    tiltEls.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 16;
            const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -16;
            el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = 'transform 0.4s ease';
            setTimeout(() => el.style.transition = '', 400);
        });
    });
});

/* ─── CONTACT FORM ─── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = this.querySelector('.submit-btn');
    const orig = btn.innerHTML;

    btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    // Simulate send (replace with EmailJS if needed)
    setTimeout(() => {
        status.innerHTML = '✨ Message sent! I\'ll get back to you soon.';
        status.style.color = 'var(--purple)';
        btn.innerHTML = orig;
        btn.disabled = false;
        this.reset();
    }, 1500);
});

/* ─── ACTIVE NAV LINK ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navAnchors.forEach(a => {
        a.style.background = a.getAttribute('href') === '#' + current
            ? 'linear-gradient(135deg, var(--pink-deep), var(--purple))'
            : '';
        a.style.color = a.getAttribute('href') === '#' + current ? 'white' : '';
        a.style.borderColor = a.getAttribute('href') === '#' + current ? 'transparent' : '';
    });
});