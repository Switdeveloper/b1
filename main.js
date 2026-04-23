document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('is-open');
            menuToggle.textContent = navLinks.classList.contains('is-open') ? '✕' : '☰';
        });
    }

    // 2. Setup IntersectionObserver for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve if we only want it to animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 3. Observe elements with the .reveal class
    const revealElements = document.querySelectorAll('.reveal, .reveal-group');
    revealElements.forEach(el => observer.observe(el));

    // 4. Stagger animations inside a reveal-group
    const revealGroups = document.querySelectorAll('.reveal-group');
    revealGroups.forEach(group => {
        const children = group.querySelectorAll('.reveal');
        children.forEach((child, index) => {
            child.style.setProperty('--index', index);
        });
    });

    // 5. Active link handling for navigation
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const linkPath = new URL(item.href).pathname;
        if (currentPath === linkPath || (currentPath === '/' && linkPath.includes('index.html'))) {
            item.classList.add('active');
        }
    });
});
