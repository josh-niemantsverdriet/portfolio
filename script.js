const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        });
    }, {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));
} else {
    revealElements.forEach(element => element.classList.add('visible'));
}

const year = document.getElementById('year');

if (year) {
    year.textContent = new Date().getFullYear();
}
