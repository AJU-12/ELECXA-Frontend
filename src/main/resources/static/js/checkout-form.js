document.addEventListener('DOMContentLoaded', function() {
    // Get all input fields
    const inputFields = document.querySelectorAll('.input-field');
    
    // Add focus and blur event listeners to each input field
    inputFields.forEach(input => {
        // Check if the input already has a value on page load
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Add focus event
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Add blur event
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
            
            // Simple validation for required fields
            if (this.required && this.value.trim() === '') {
                this.parentElement.classList.add('error');
            } else {
                this.parentElement.classList.remove('error');
            }
        });
        
        // Add input event for real-time validation
        input.addEventListener('input', function() {
            if (this.required && this.value.trim() === '') {
                this.parentElement.classList.add('error');
            } else {
                this.parentElement.classList.remove('error');
            }
        });
    });
    
    // Add required attribute to required fields
    document.querySelectorAll('.field-label.required').forEach(label => {
        const inputId = label.getAttribute('for');
        const input = document.getElementById(inputId);
        if (input) {
            input.required = true;
        }
    });
    
    // Function to save form data to sessionStorage
    function saveFormDataToSession() {
        // Save personal information
        sessionStorage.setItem('fullName', document.getElementById('fullname').value || '');
        sessionStorage.setItem('email', document.getElementById('email').value || '');
        sessionStorage.setItem('phone', document.getElementById('phone').value || '');
        
        // Save shipping address
        sessionStorage.setItem('address', document.getElementById('address').value || '');
        sessionStorage.setItem('apartment', document.getElementById('apt').value || '');
        sessionStorage.setItem('city', document.getElementById('city').value || '');
        sessionStorage.setItem('state', document.getElementById('state').value || '');
        sessionStorage.setItem('pincode', document.getElementById('pincode').value || '');
    }
    
    // Form submission
    const checkoutForm = document.querySelector('.checkout-container form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check all required fields
            let isValid = true;
            const requiredInputs = this.querySelectorAll('input[required]');
            
            requiredInputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.parentElement.classList.add('error');
                }
            });
            
            if (isValid) {
                // Save form data to sessionStorage
                saveFormDataToSession();
                
                // In a real application, you would submit the form or process the payment
                console.log('Form is valid, proceeding to checkout');
                
                // For demo purposes, show a success message
                const proceedButton = document.querySelector('.proceed-button');
                if (proceedButton) {
                    const originalText = proceedButton.textContent;
                    proceedButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    
                    // Simulate processing
                    setTimeout(() => {
                        proceedButton.innerHTML = '<i class="fas fa-check"></i> Success!';
                        proceedButton.style.backgroundColor = '#4CAF50';
                        
                        // Redirect after success
                        setTimeout(() => {
                            // Redirect to the next step
                            window.location.href = 'checkout-final.html';
                            
                            // Reset for demo purposes (this won't execute if redirected)
                            proceedButton.textContent = originalText;
                            proceedButton.style.backgroundColor = '';
                        }, 1500);
                    }, 1500);
                }
            }
        });
    }
    
    // Handle proceed button click
    const proceedButton = document.querySelector('.proceed-button');
    if (proceedButton) {
        proceedButton.addEventListener('click', function(e) {
            // Prevent default to handle redirection manually
            e.preventDefault();
            
            // Check form validity
            let isValid = true;
            const requiredInputs = document.querySelectorAll('input[required]');
            
            requiredInputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.parentElement.classList.add('error');
                }
            });
            
            if (isValid) {
                // Save form data to sessionStorage
                saveFormDataToSession();
                
                // Redirect to final checkout page
                window.location.href = 'checkout-final.html';
            } else {
                // Scroll to the first error
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}); 