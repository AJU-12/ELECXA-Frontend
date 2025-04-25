// Modern Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get search elements
    const searchContainers = document.querySelectorAll('.search-container');
    
    searchContainers.forEach(searchContainer => {
        const searchBar = searchContainer.querySelector('.search-bar');
        const searchClear = searchContainer.querySelector('.search-clear');
        const searchDropdown = searchContainer.querySelector('.search-dropdown');
        const searchDropdownClose = searchContainer.querySelector('.search-dropdown-close');
        const searchIcon = searchContainer.querySelector('.search-icon');
        const categoriesElements = searchContainer.querySelectorAll('.search-category');
        const suggestionItems = searchContainer.querySelectorAll('.search-suggestion-item');
        const productItems = searchContainer.querySelectorAll('.search-product-item');
        
        if (!searchBar) return;
        
        // Focus effect
        searchBar.addEventListener('focus', function() {
            searchContainer.classList.add('focused');
            openSearchDropdown();
        });
        
        searchBar.addEventListener('blur', function() {
            if (searchBar.value.length === 0) {
                searchContainer.classList.remove('focused');
            }
        });
        
        // Clear search
        if (searchClear) {
            searchClear.addEventListener('click', function(e) {
                e.preventDefault();
                searchBar.value = '';
                searchClear.style.opacity = '0';
                // Focus back on search bar
                searchBar.focus();
                resetSearchResults();
            });
        }
        
        // Close dropdown on outside click
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                closeSearchDropdown();
                searchContainer.classList.remove('focused');
            }
        });
        
        // Close dropdown on close button click
        if (searchDropdownClose) {
            searchDropdownClose.addEventListener('click', function(e) {
                e.preventDefault();
                closeSearchDropdown();
            });
        }
        
        // Clear button visibility on input
        searchBar.addEventListener('input', function() {
            if (this.value.length > 0) {
                searchClear.style.opacity = '1';
                searchProducts(this.value);
            } else {
                searchClear.style.opacity = '0';
                resetSearchResults();
            }
        });
        
        // Category click handler
        if (categoriesElements) {
            categoriesElements.forEach(category => {
                category.addEventListener('click', function() {
                    const categoryText = this.textContent.trim();
                    searchBar.value = categoryText;
                    searchClear.style.opacity = '1';
                    searchProducts(categoryText);
                    
                    // Add ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    this.appendChild(ripple);
                    
                    const rect = this.getBoundingClientRect();
                    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
                    ripple.style.left = (event.clientX - rect.left - ripple.offsetWidth / 2) + 'px';
                    ripple.style.top = (event.clientY - rect.top - ripple.offsetHeight / 2) + 'px';
                    
                    // Simulate form submission after a short delay
                    setTimeout(() => {
                        window.location.href = `products-page.html?category=${encodeURIComponent(categoryText)}`;
                    }, 400);
                    
                    // Remove ripple
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }
        
        // Suggestion click handler
        suggestionItems.forEach(item => {
            item.addEventListener('click', function() {
                const suggestionText = this.querySelector('.search-suggestion-text').textContent.trim();
                searchBar.value = suggestionText;
                searchClear.style.opacity = '1';
                searchProducts(suggestionText);
                // Simulate form submission after a short delay
                setTimeout(() => {
                    window.location.href = `products-page.html?search=${encodeURIComponent(suggestionText)}`;
                }, 300);
            });
        });
        
        // Product click handler
        productItems.forEach(item => {
            item.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                // Navigate to product page
                window.location.href = `product-info.html?id=${productId}`;
            });
        });
        
        // Search submit handler
        const searchForm = searchContainer.closest('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchQuery = searchBar.value.trim();
                if (searchQuery) {
                    // Add to recent searches (using localStorage)
                    addToRecentSearches(searchQuery);
                    
                    // Navigate to search results page
                    window.location.href = `products-page.html?search=${encodeURIComponent(searchQuery)}`;
                }
            });
        }
        
        // Function to open search dropdown
        function openSearchDropdown() {
            if (searchDropdown) {
                searchDropdown.classList.add('active');
                // Update recent searches
                updateRecentSearches();
                // Show popular products
                updatePopularProducts();
            }
        }
        
        // Function to close search dropdown
        function closeSearchDropdown() {
            if (searchDropdown) {
                searchDropdown.classList.remove('active');
            }
        }
        
        // Function to add to recent searches
        function addToRecentSearches(search) {
            let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            
            // Remove if already exists
            recentSearches = recentSearches.filter(item => item !== search);
            
            // Add to beginning
            recentSearches.unshift(search);
            
            // Limit to 5
            if (recentSearches.length > 5) {
                recentSearches = recentSearches.slice(0, 5);
            }
            
            // Save to localStorage
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
        
        // Function to update recent searches
        function updateRecentSearches() {
            const recentSearchesList = searchContainer.querySelector('.recent-searches-list');
            if (recentSearchesList) {
                recentSearchesList.innerHTML = '';
                
                const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
                
                if (recentSearches.length === 0) {
                    recentSearchesList.innerHTML = '<div class="no-recent-searches">No recent searches</div>';
                    return;
                }
                
                recentSearches.forEach(search => {
                    const li = document.createElement('li');
                    li.className = 'search-suggestion-item';
                    li.innerHTML = `
                        <div class="search-suggestion-icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <div class="search-suggestion-text">${search}</div>
                    `;
                    
                    li.addEventListener('click', function() {
                        searchBar.value = search;
                        searchClear.style.opacity = '1';
                        // Simulate form submission after a short delay
                        setTimeout(() => {
                            window.location.href = `products-page.html?search=${encodeURIComponent(search)}`;
                        }, 300);
                    });
                    
                    recentSearchesList.appendChild(li);
                });
            }
        }
        
        // Product Database (Would typically come from a backend API)
        const products = [
            { 
                id: 1, 
                name: 'SAMSUNG Galaxy S24 Ultra 5G (12GB RAM, 256GB, Titanium Gray)', 
                category: 'Mobile Phones', 
                price: 70999,
                image: '../img/Mobile Phones/image 19.jpg'
            },
            { 
                id: 2, 
                name: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium)', 
                category: 'Mobile Phones', 
                price: 149900,
                image: '../img/Mobile Phones/image 19.jpg'
            },
            { 
                id: 3, 
                name: 'MacBook Pro 14-inch (M3 Pro, 18GB RAM, 512GB SSD)', 
                category: 'Laptops', 
                price: 189900,
                image: '../img/Mobile Phones/image 19.jpg'
            },
            { 
                id: 4, 
                name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', 
                category: 'Audio Devices', 
                price: 26990,
                image: '../img/Mobile Phones/image 19.jpg'
            }
        ];
        
        // Function to update popular products
        function updatePopularProducts() {
            const popularProductsContainer = searchContainer.querySelector('.search-popular-products');
            if (popularProductsContainer) {
                popularProductsContainer.innerHTML = '';
                
                // Show first 4 products as popular
                products.slice(0, 4).forEach(product => {
                    const productEl = document.createElement('div');
                    productEl.className = 'search-product-item';
                    productEl.setAttribute('data-product-id', product.id);
                    
                    productEl.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="search-product-img">
                        <div class="search-product-info">
                            <div class="search-product-name">${product.name}</div>
                            <div class="search-product-price">₹${formatPrice(product.price)}</div>
                        </div>
                    `;
                    
                    productEl.addEventListener('click', function() {
                        window.location.href = `product-info.html?id=${product.id}`;
                    });
                    
                    popularProductsContainer.appendChild(productEl);
                });
            }
        }
        
        // Function to search products
        function searchProducts(query) {
            if (!query || query.length < 2) return;
            
            query = query.toLowerCase();
            
            // Filter products
            const filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(query) || 
                       product.category.toLowerCase().includes(query);
            });
            
            // Update search results
            updateSearchResults(filteredProducts, query);
        }
        
        // Function to update search results
        function updateSearchResults(filteredProducts, query) {
            const popularProductsContainer = searchContainer.querySelector('.search-popular-products');
            if (popularProductsContainer) {
                popularProductsContainer.innerHTML = '';
                
                if (filteredProducts.length === 0) {
                    popularProductsContainer.innerHTML = `
                        <div class="search-no-results">
                            <i class="fas fa-search"></i>
                            No products found for "${query}"
                        </div>
                    `;
                    return;
                }
                
                // Show filtered products
                filteredProducts.slice(0, 4).forEach(product => {
                    const productEl = document.createElement('div');
                    productEl.className = 'search-product-item';
                    productEl.setAttribute('data-product-id', product.id);
                    
                    productEl.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="search-product-img">
                        <div class="search-product-info">
                            <div class="search-product-name">${highlightText(product.name, query)}</div>
                            <div class="search-product-price">₹${formatPrice(product.price)}</div>
                        </div>
                    `;
                    
                    productEl.addEventListener('click', function() {
                        window.location.href = `product-info.html?id=${product.id}`;
                    });
                    
                    popularProductsContainer.appendChild(productEl);
                });
            }
        }
        
        // Function to reset search results
        function resetSearchResults() {
            if (searchDropdown && searchDropdown.classList.contains('active')) {
                updatePopularProducts();
            }
        }
        
        // Function to highlight text
        function highlightText(text, query) {
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<span class="highlighted">$1</span>');
        }
        
        // Function to format price
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    });
}); 