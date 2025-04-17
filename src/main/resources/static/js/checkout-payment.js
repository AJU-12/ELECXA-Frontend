document.addEventListener('DOMContentLoaded', function() {
    // Load order summary from sessionStorage
    loadOrderSummary();
    
    // Add click event listeners to payment methods
    setupPaymentMethods();
    
    // Add focus and blur event listeners to input fields
    setupFormFields();
});

/**
 * Load order summary from sessionStorage
 */
function loadOrderSummary() {
    // Get total cost from sessionStorage
    const totalCost = sessionStorage.getItem('totalCost') || '110999';
    const shippingCost = sessionStorage.getItem('shippingCost') || '0';
    const deliveryOption = sessionStorage.getItem('deliveryOption') || 'standard';
    
    // Display order total
    const orderTotalElement = document.querySelector('.order-total-value');
    if (orderTotalElement) {
        orderTotalElement.textContent = '₹' + parseInt(totalCost).toLocaleString('en-IN');
    }
    
    // Display shipping info in order summary if available
    const shippingInfoElement = document.querySelector('.shipping-info');
    if (shippingInfoElement) {
        const shippingLabel = deliveryOption === 'express' ? 'Express Delivery (1-2 days)' : 'Standard Delivery (3-5 days)';
        const shippingCostText = shippingCost === '0' ? 'Free' : '₹' + parseInt(shippingCost).toLocaleString('en-IN');
        shippingInfoElement.textContent = `${shippingLabel}: ${shippingCostText}`;
    }
}

/**
 * Setup payment method selection
 */
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove selected class from all methods
            paymentMethods.forEach(m => m.classList.remove('selected'));
            
            // Add selected class to clicked method
            this.classList.add('selected');
            
            // Store selected payment method
            const methodName = this.querySelector('.payment-method-title').textContent;
            sessionStorage.setItem('paymentMethod', methodName);
        });
    });
}

/**
 * Setup form field interactions
 */
function setupFormFields() {
    const formFields = document.querySelectorAll('.form-field');
    
    formFields.forEach(field => {
        const input = field.querySelector('.input-field');
        if (!input) return;
        
        input.addEventListener('focus', () => {
            field.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                field.classList.remove('focused');
            }
        });
        
        // Initialize fields that might have values
        if (input.value !== '') {
            field.classList.add('focused');
        }
    });
} 