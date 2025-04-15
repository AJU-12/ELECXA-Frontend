// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    header.insertBefore(mobileMenuToggle, nav);
    
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Product image hover effect
    const productImages = document.querySelectorAll('.grid-item img');
    
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add event listener for the 'Explore More' button in the brand banner
    const exploreMoreBtn = document.getElementById('explore-more-btn');
    if (exploreMoreBtn) {
        exploreMoreBtn.addEventListener('click', function() {
            const categoriesSection = document.getElementById('shop-categories');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Note: Hero slider functionality is now handled by Swiper.js
    // which is initialized in the index.html file
});

