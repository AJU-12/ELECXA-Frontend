document.addEventListener('DOMContentLoaded', function() {
    // Load user details from sessionStorage if available
    loadUserData();
    
    // Set up tab switching
    setupTabs();
    
    // Set up form submission
    setupFormSubmission();
    
    // Setup floating labels
    setupFloatingLabels();
});

/**
 * Load user data from sessionStorage and populate form fields
 */
function loadUserData() {
    // Check if user data exists in sessionStorage
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
    
    // Populate personal details if available
    if (userData.personalInfo) {
        const personalInfo = userData.personalInfo;
        
        // Fill in form fields with available data
        document.getElementById('fullname').value = personalInfo.fullName || '';
        document.getElementById('email').value = personalInfo.email || '';
        document.getElementById('phone').value = personalInfo.phone || '';
    }
    
    // Populate shipping address if available
    if (userData.shippingAddress) {
        const address = userData.shippingAddress;
        
        // Fill in form fields with available data
        document.getElementById('address').value = address.streetAddress || '';
        document.getElementById('apt').value = address.apartment || '';
        document.getElementById('pincode').value = address.pincode || '';
        document.getElementById('city').value = address.city || '';
        document.getElementById('state').value = address.state || '';
    }
    
    // Trigger input events to adjust labels for filled fields
    document.querySelectorAll('.input-field').forEach(input => {
        if (input.value) {
            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
        }
    });
}

/**
 * Set up tab switching functionality
 */
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle tab content switching (for future implementation)
            const tabName = this.textContent.trim().toLowerCase();
            
            // Save tab state to sessionStorage
            sessionStorage.setItem('activeProfileTab', tabName);
            
            // For now, just show an alert
            if (tabName !== 'profile') {
                alert(`The ${tabName} section will be implemented soon!`);
            }
        });
    });
    
    // Restore active tab from sessionStorage if available
    const activeTab = sessionStorage.getItem('activeProfileTab');
    if (activeTab) {
        tabs.forEach(tab => {
            const tabName = tab.textContent.trim().toLowerCase();
            if (tabName === activeTab) {
                tab.click();
            }
        });
    }
}

/**
 * Set up form submission to save user data
 */
function setupFormSubmission() {
    const editButton = document.querySelector('.edit-button');
    
    editButton.addEventListener('click', function() {
        // Get form values
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const apartment = document.getElementById('apt').value;
        const pincode = document.getElementById('pincode').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        
        // Validate required fields
        if (!fullName || !email || !phone || !address || !pincode || !city || !state) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create user data object
        const userData = {
            personalInfo: {
                fullName,
                email,
                phone
            },
            shippingAddress: {
                streetAddress: address,
                apartment,
                pincode,
                city,
                state
            }
        };
        
        // Save to sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success message
        alert('Profile updated successfully!');
    });
}

/**
 * Set up floating labels behavior
 */
function setupFloatingLabels() {
    const inputFields = document.querySelectorAll('.input-field');
    
    // Add focus and blur events to each input field
    inputFields.forEach(input => {
        // Function to handle focus/blur/input events
        const handleInputState = () => {
            const field = input.closest('.form-field');
            if (input.value.trim() !== '') {
                field.classList.add('filled');
            } else {
                field.classList.remove('filled');
            }
        };
        
        // Add focus event
        input.addEventListener('focus', () => {
            input.closest('.form-field').classList.add('focused');
        });
        
        // Add blur event
        input.addEventListener('blur', () => {
            input.closest('.form-field').classList.remove('focused');
            handleInputState();
        });
        
        // Add input event
        input.addEventListener('input', handleInputState);
        
        // Initialize state - apply filled class if input has value
        handleInputState();
    });
    
    // Also check on page load to ensure fields with values have proper styling
    window.addEventListener('load', () => {
        inputFields.forEach(input => {
            const field = input.closest('.form-field');
            if (input.value.trim() !== '') {
                field.classList.add('filled');
                // Ensure the label is positioned correctly
                const label = field.querySelector('label');
                if (label) {
                    label.style.top = '-9px';
                    label.style.left = '12px';
                    label.style.fontSize = '12px';
                    label.style.background = 'white';
                }
            }
        });
    });
} 