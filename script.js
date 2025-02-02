// Intersection Observer to add/remove "visible" class based on section's visibility
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px', // no margin
    threshold: 0.1 // when 25% of the section is in view
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Expandable sections
const expandables = document.querySelectorAll('.expandable');

expandables.forEach(expandable => {
    expandable.addEventListener('click', function() {
        expandable.classList.toggle('open');
    });
});

// Close expands when out of scope
const closeExpandablesOutOfScope = () => {
    expandables.forEach(expandable => {
        if (!expandable.classList.contains('open')) return;
        const rect = expandable.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) {
            expandable.classList.remove('open');
        }
    });
};

// Listen for scroll and resize events to close expands that are out of view
window.addEventListener('scroll', closeExpandablesOutOfScope);
window.addEventListener('resize', closeExpandablesOutOfScope);

// Adjust the scrolling behavior for anchor links
const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    });
});

// Toggle mobile menu visibility
const nav = document.querySelector('nav');