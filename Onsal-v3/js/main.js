document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const overlay = document.querySelector('.overlay');
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    // Header transparency on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.remove('header-transparent');
            header.classList.add('header-solid');
            scrollToTopButton.classList.add('visible');
        } else {
            header.classList.add('header-transparent');
            header.classList.remove('header-solid');
            scrollToTopButton.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Scroll to top
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter products
                filterProducts(filter);
            });
        });
    }

    // Product filtering function
    function filterProducts(filter) {
        const products = document.querySelectorAll('[data-category]');
        products.forEach(product => {
            if (filter === 'all') {
                product.style.display = 'block';
            } else {
                if (product.getAttribute('data-category').includes(filter)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        });
    }
});
