document.addEventListener('DOMContentLoaded', function() {
    setupSignInForm();
    initializeDummyDatabase();
});

/**
 * Dummy database of users
 */
let dummyUsers = [];

/**
 * Initialize dummy database with sample users
 */
function initializeDummyDatabase() {
    dummyUsers = [
        { email: 'user1@example.com', mobile: '9876543210', name: 'John Doe' },
        { email: 'user2@example.com', mobile: '9876543211', name: 'Jane Smith' },
        { email: 'user3@example.com', mobile: '9876543212', name: 'Alex Johnson' }
    ];
    
    // Store in session storage for persistence
    sessionStorage.setItem('dummyUsers', JSON.stringify(dummyUsers));
}

/**
 * Check if user exists in the dummy database
 */
function checkUserExists(identifier) {
    // Get users from session storage
    const users = JSON.parse(sessionStorage.getItem('dummyUsers')) || dummyUsers;
    
    // Check if identifier matches any email or mobile in the database
    return users.some(user => 
        user.email === identifier || user.mobile === identifier
    );
}

/**
 * Set up sign-in form functionality
 */
function setupSignInForm() {
    const continueButton = document.querySelector('.continue-button');
    const inputField = document.getElementById('user-input');
    
    // Set focus to input field on page load
    if (inputField) {
        setTimeout(() => inputField.focus(), 300);
    }
    
    // Set up button click handler
    if (continueButton) {
        continueButton.addEventListener('click', handleContinueClick);
    }
    
    // Allow pressing Enter key to submit
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleContinueClick();
        }
    });
    
    // Add field focus/blur events for styling
    setupFieldEvents();
}

/**
 * Setup field events for focus and blur
 */
function setupFieldEvents() {
    const formField = document.querySelector('.form-field');
    const inputField = document.getElementById('user-input');
    
    if (formField && inputField) {
        // Add focus class when field is focused
        inputField.addEventListener('focus', () => {
            formField.classList.add('focused');
        });
        
        // Remove focus class when field loses focus
        inputField.addEventListener('blur', () => {
            formField.classList.remove('focused');
        });
    }
}

/**
 * Handle click on the Continue button
 */
function handleContinueClick() {
    const inputField = document.getElementById('user-input');
    
    if (!inputField || !inputField.value.trim()) {
        // Show error if input is empty
        showError('Please enter your mobile number or email');
        return;
    }
    
    const inputValue = inputField.value.trim();
    
    // Simple validation for email format
    if (inputValue.includes('@') && !isValidEmail(inputValue)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Simple validation for mobile format (basic check for numbers only)
    if (!inputValue.includes('@') && !isValidMobile(inputValue)) {
        showError('Please enter a valid mobile number');
        return;
    }
    
    // If validation passes, store input in session storage
    sessionStorage.setItem('userIdentifier', inputValue);
    
    // Show loading state
    showLoading();
    
    // Simulate a server request (replace with actual API call)
    setTimeout(function() {
        // Check if user exists in database
        if (checkUserExists(inputValue)) {
            // User exists, show password screen
            showPasswordScreen(inputValue);
        } else {
            // User doesn't exist, show sign up screen
            showSignUpScreen(inputValue);
        }
    }, 800);
}

/**
 * Show the password screen
 */
function showPasswordScreen(identifier) {
    const formContainer = document.querySelector('.form-container');
    const isEmail = identifier.includes('@');
    
    // Create new content for password screen
    const passwordHTML = `
        <div class="password-container">
            <h2 class="password-title">Welcome back</h2>
            <p class="password-text">Sign in to your account</p>
            
            <div class="user-info">
                <span class="user-identifier">${identifier}</span>
                <button class="change-identifier-small">Change</button>
            </div>
            
            <div class="form-field password-field">
                <input type="password" id="password-input" class="input-field" placeholder=" ">
                <label for="password-input" class="field-label">Enter your password</label>
                <button class="toggle-password" type="button">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            
            <div class="forgot-password">
                <a href="#" class="forgot-link">Forgot password?</a>
            </div>
            
            <button class="sign-in-button">
                <span class="sign-in-text">Sign in</span>
            </button>
            
            <div class="divider">
                <span class="divider-text">or</span>
            </div>
            
            <button class="sign-in-otp-button">
                <span class="sign-in-otp-text">Sign in via OTP</span>
            </button>
        </div>
    `;
    
    // Replace form content with password screen
    formContainer.innerHTML = passwordHTML;
    
    // Add styles for password screen
    addPasswordStyles();
    
    // Setup password field focus and toggle visibility
    setupPasswordField();
    
    // Setup sign in button
    document.querySelector('.sign-in-button').addEventListener('click', handleSignInClick);
    
    // Setup OTP button - show OTP verification screen when clicked
    document.querySelector('.sign-in-otp-button').addEventListener('click', () => {
        showVerificationScreen(identifier);
    });
    
    // Setup change identifier button
    document.querySelector('.change-identifier-small').addEventListener('click', handleChangeClick);
}

/**
 * Add CSS styles for password screen
 */
function addPasswordStyles() {
    if (!document.getElementById('password-styles')) {
        const style = document.createElement('style');
        style.id = 'password-styles';
        style.textContent = `
            /* Main container styles */
            .container {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                position: relative;
                padding-bottom: 48px; /* Space for footer */
                box-sizing: border-box;
                overflow-y: auto;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }
            
            .container::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }
            
            /* Common styling for all screen types */
            .verification-container, 
            .password-container,
            .signup-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0 20px 20px;
                position: relative;
            }
            
            .password-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .password-title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 10px;
                text-align: center;
            }
            
            .password-text {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.7);
                margin-bottom: 20px;
                text-align: center;
            }
            
            .user-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 12px 15px;
                background-color: #f7f7f7;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            
            .user-identifier {
                font-size: 14px;
                color: #333;
                font-weight: 500;
            }
            
            .change-identifier-small {
                background: transparent;
                border: none;
                color: var(--primary-color);
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                padding: 0;
                transition: all 0.2s ease;
            }
            
            .change-identifier-small:hover {
                text-decoration: underline;
            }
            
            .password-field {
                position: relative;
                width: 100%;
                margin-bottom: 15px;
            }
            
            .toggle-password {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                background: transparent;
                border: none;
                color: #777;
                cursor: pointer;
                z-index: 10;
                padding: 5px;
            }
            
            .forgot-password {
                width: 100%;
                text-align: right;
                margin-bottom: 25px;
            }
            
            .forgot-link {
                color: var(--primary-color);
                font-size: 13px;
                font-weight: 500;
                text-decoration: none;
                transition: all 0.2s ease;
            }
            
            .forgot-link:hover {
                text-decoration: underline;
            }
            
            .sign-in-button {
                width: 100%;
                height: 50px;
                background: linear-gradient(180deg, var(--primary-color) 0%, var(--primary-dark) 100%);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
                margin-bottom: 20px;
                padding: 0;
                overflow: hidden;
                position: relative;
            }
            
            .sign-in-button:hover {
                box-shadow: 0 4px 12px rgba(102, 52, 225, 0.3);
                transform: translateY(-2px);
            }
            
            .sign-in-text {
                color: white;
                font-size: 14px;
                font-weight: 500;
                line-height: 1;
                display: inline-block;
                width: 100%;
                text-align: center;
            }
            
            .divider {
                width: 100%;
                text-align: center;
                border-bottom: 1px solid #e0e0e0;
                line-height: 0.1em;
                margin: 10px 0 20px;
            }
            
            .divider-text {
                background: #fff;
                color: #777;
                padding: 0 10px;
                font-size: 13px;
            }
            
            .sign-in-otp-button {
                width: 100%;
                height: 50px;
                background: white;
                border: 1.5px solid var(--primary-color);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-bottom: 10px;
                padding: 0;
                overflow: hidden;
                position: relative;
            }
            
            .sign-in-otp-button:hover {
                background-color: rgba(102, 52, 225, 0.05);
            }
            
            .sign-in-otp-text {
                color: var(--primary-color);
                font-size: 14px;
                font-weight: 500;
                line-height: 1;
                display: inline-block;
                width: 100%;
                text-align: center;
            }
            
            /* Footer styling */
            .footer {
                position: fixed !important;
                bottom: 0;
                left: 0;
                width: 100vw;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 20px;
                background-color: #f8f8f8;
                border-top: 1px solid rgba(0, 0, 0, 0.06);
                z-index: 100;
            }
            
            .footer-logo {
                height: 32px !important;
                margin-right: 15px;
            }
            
            .copyright {
                font-size: 13px;
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Setup password field behavior
 */
function setupPasswordField() {
    const passwordField = document.querySelector('.password-field');
    const nameField = document.querySelector('.name-field');
    const passwordInput = document.getElementById('password-input');
    const nameInput = document.getElementById('name-input');
    const toggleButton = document.querySelector('.toggle-password');
    
    // Setup name field if it exists (sign-up screen)
    if (nameInput && nameField) {
        // Focus name field on page load
        setTimeout(() => nameInput.focus(), 300);
        
        // Add focus class when name field is focused
        nameInput.addEventListener('focus', () => {
            nameField.classList.add('focused');
        });
        
        // Remove focus class when name field loses focus
        nameInput.addEventListener('blur', () => {
            nameField.classList.remove('focused');
        });
    }
    
    // Setup password field
    if (passwordInput && passwordField) {
        // Only focus password if name field doesn't exist (password screen)
        if (!nameInput) {
            setTimeout(() => passwordInput.focus(), 300);
        }
        
        // Add focus class when password field is focused
        passwordInput.addEventListener('focus', () => {
            passwordField.classList.add('focused');
        });
        
        // Remove focus class when password field loses focus
        passwordInput.addEventListener('blur', () => {
            passwordField.classList.remove('focused');
        });
    }
    
    // Toggle password visibility
    if (toggleButton && passwordInput) {
        toggleButton.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Change icon based on visibility
            const icon = toggleButton.querySelector('i');
            if (icon) {
                if (type === 'password') {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            }
        });
    }
}

/**
 * Handle sign in button click
 */
function handleSignInClick() {
    const passwordInput = document.getElementById('password-input');
    
    if (!passwordInput || !passwordInput.value.trim()) {
        // Show error if password is empty
        showPasswordError('Please enter your password');
        return;
    }
    
    // Show loading state
    const signInButton = document.querySelector('.sign-in-button');
    const signInText = document.querySelector('.sign-in-text');
    
    if (signInButton && signInText) {
        const originalText = signInText.textContent;
        signInText.textContent = 'Signing in...';
        signInButton.disabled = true;
        signInButton.style.opacity = '0.7';
        
        // Simulate verification (replace with actual API call)
        setTimeout(() => {
            // Successful verification - redirect to home page
            window.location.href = '/';
            
            // In case of error, show error and reset button
            // showPasswordError('Invalid password. Please try again.');
            // signInText.textContent = originalText;
            // signInButton.disabled = false;
            // signInButton.style.opacity = '1';
        }, 1500);
    }
}

/**
 * Show password-specific error message
 */
function showPasswordError(message) {
    // Remove existing error message if any
    const existingError = document.querySelector('.password-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'password-error-message error-message';
    errorDiv.textContent = message;
    
    // Add error message after the password field
    const passwordField = document.querySelector('.password-field');
    passwordField.insertAdjacentElement('afterend', errorDiv);
    
    // Add error class to password field
    passwordField.classList.add('error');
    
    // Remove error after 3 seconds
    setTimeout(function() {
        errorDiv.remove();
        passwordField.classList.remove('error');
    }, 3000);
}

/**
 * Show the verification screen
 */
function showVerificationScreen(identifier) {
    const formContainer = document.querySelector('.form-container');
    const isEmail = identifier.includes('@');
    const maskedIdentifier = isEmail ? maskEmail(identifier) : maskMobile(identifier);
    
    // Create new content
    const verificationHTML = `
        <div class="verification-container">
            <h2 class="verification-title">Verify your ${isEmail ? 'email' : 'mobile number'}</h2>
            <p class="verification-text">We've sent a 6-digit code to ${maskedIdentifier}</p>
            
            <div class="otp-container">
                <input type="text" class="otp-input" maxlength="1" autofocus>
                <input type="text" class="otp-input" maxlength="1">
                <input type="text" class="otp-input" maxlength="1">
                <input type="text" class="otp-input" maxlength="1">
                <input type="text" class="otp-input" maxlength="1">
                <input type="text" class="otp-input" maxlength="1">
            </div>
            
            <div class="resend-container">
                <p class="resend-text">Didn't receive the code? <a href="#" class="resend-link">Resend</a></p>
                <p class="timer-text">Resend code in <span class="timer">30</span>s</p>
            </div>
            
            <button class="verify-button">
                <span class="verify-text">Verify</span>
            </button>
            
            <button class="change-identifier">
                <span class="change-text">Change ${isEmail ? 'email' : 'mobile number'}</span>
            </button>
        </div>
    `;
    
    // Replace form content with verification screen
    formContainer.innerHTML = verificationHTML;
    
    // Add styles for verification screen
    addVerificationStyles();
    
    // Setup OTP input field behavior
    setupOTPInputs();
    
    // Setup countdown timer
    setupCountdownTimer();
    
    // Setup verify button
    document.querySelector('.verify-button').addEventListener('click', handleVerifyClick);
    
    // Setup change identifier button
    document.querySelector('.change-identifier').addEventListener('click', handleChangeClick);
}

/**
 * Add CSS styles for verification screen
 */
function addVerificationStyles() {
    if (!document.getElementById('verification-styles')) {
        const style = document.createElement('style');
        style.id = 'verification-styles';
        style.textContent = `
            /* Main container styles */
            .container {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                position: relative;
                padding-bottom: 48px; /* Space for footer */
                box-sizing: border-box;
                overflow-y: auto;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }
            
            .container::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }
            
            /* Common styling for all screen types */
            .verification-container, 
            .password-container,
            .signup-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0 20px 20px;
                position: relative;
            }
            
            .verification-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .verification-title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 10px;
                text-align: center;
            }
            
            .verification-text {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.7);
                margin-bottom: 30px;
                text-align: center;
            }
            
            .otp-container {
                display: flex;
                gap: 10px;
                margin-bottom: 25px;
                width: 100%;
                justify-content: center;
            }
            
            .otp-input {
                width: 45px;
                height: 45px;
                border-radius: 8px;
                border: 1.5px solid rgba(0, 0, 0, 0.2);
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                background: white;
                transition: all 0.3s ease;
            }
            
            .otp-input:focus {
                border-color: var(--primary-color);
                outline: none;
                box-shadow: 0 0 0 2px rgba(102, 52, 225, 0.2);
            }
            
            .resend-container {
                margin-bottom: 30px;
                text-align: center;
            }
            
            .resend-text {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.7);
                margin-bottom: 5px;
            }
            
            .resend-link {
                color: var(--primary-color);
                font-weight: 500;
                text-decoration: none;
            }
            
            .timer-text {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
            }
            
            .timer {
                font-weight: 600;
            }
            
            .verify-button {
                width: 100%;
                height: 50px;
                background: linear-gradient(180deg, var(--primary-color) 0%, var(--primary-dark) 100%);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
                margin-bottom: 15px;
            }
            
            .verify-button:hover {
                box-shadow: 0 4px 12px rgba(102, 52, 225, 0.3);
                transform: translateY(-2px);
            }
            
            .verify-text {
                color: white;
                font-size: 14px;
                font-weight: 500;
            }
            
            .change-identifier {
                background: transparent;
                border: none;
                color: var(--primary-color);
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                padding: 10px;
                transition: all 0.2s ease;
            }
            
            .change-identifier:hover {
                text-decoration: underline;
            }
            
            /* Footer styling */
            .footer {
                position: fixed !important;
                bottom: 0;
                left: 0;
                width: 100vw;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 20px;
                background-color: #f8f8f8;
                border-top: 1px solid rgba(0, 0, 0, 0.06);
                z-index: 100;
            }
            
            .footer-logo {
                height: 32px !important;
                margin-right: 15px;
            }
            
            .copyright {
                font-size: 13px;
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Setup OTP input fields behavior
 */
function setupOTPInputs() {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        // Auto-focus next input when a digit is entered
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        // Handle backspace to go to previous input
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        // Ensure only numbers are entered
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
        
        // Paste OTP support - distribute digits across inputs
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').trim();
            
            if (/^\d+$/.test(pastedData)) {
                const digits = pastedData.split('');
                
                otpInputs.forEach((input, index) => {
                    if (digits[index]) {
                        input.value = digits[index];
                    }
                });
                
                // Focus on last field or the next empty field
                const lastFilledIndex = Math.min(digits.length - 1, otpInputs.length - 1);
                otpInputs[lastFilledIndex].focus();
            }
        });
    });
}

/**
 * Setup countdown timer for OTP resend
 */
function setupCountdownTimer() {
    const timerElement = document.querySelector('.timer');
    let seconds = 30;
    
    const countdown = setInterval(() => {
        seconds--;
        if (timerElement) {
            timerElement.textContent = seconds;
        }
        
        if (seconds <= 0) {
            clearInterval(countdown);
            enableResendLink();
        }
    }, 1000);
}

/**
 * Enable resend link after countdown
 */
function enableResendLink() {
    const timerText = document.querySelector('.timer-text');
    const resendLink = document.querySelector('.resend-link');
    
    if (timerText) {
        timerText.style.display = 'none';
    }
    
    if (resendLink) {
        resendLink.style.pointerEvents = 'auto';
        resendLink.style.opacity = '1';
        
        // Add resend functionality
        resendLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleResendOTP();
        });
    }
}

/**
 * Handle OTP resend
 */
function handleResendOTP() {
    const timerText = document.querySelector('.timer-text');
    const timerElement = document.querySelector('.timer');
    const resendLink = document.querySelector('.resend-link');
    
    // Disable resend link
    if (resendLink) {
        resendLink.style.pointerEvents = 'none';
        resendLink.style.opacity = '0.5';
    }
    
    // Show timer again
    if (timerText) {
        timerText.style.display = 'block';
    }
    
    // Reset timer
    if (timerElement) {
        timerElement.textContent = '30';
    }
    
    // Show toast message
    showToast('OTP sent successfully!');
    
    // Restart countdown
    setupCountdownTimer();
}

/**
 * Handle verify button click
 */
function handleVerifyClick() {
    const otpInputs = document.querySelectorAll('.otp-input');
    let otp = '';
    let isComplete = true;
    
    // Collect OTP from input fields
    otpInputs.forEach(input => {
        if (input.value.length === 0) {
            isComplete = false;
        }
        otp += input.value;
    });
    
    if (!isComplete) {
        showToast('Please enter the complete 6-digit code', true);
        return;
    }
    
    // Show loading state
    const verifyButton = document.querySelector('.verify-button');
    const verifyText = document.querySelector('.verify-text');
    
    if (verifyButton && verifyText) {
        const originalText = verifyText.textContent;
        verifyText.textContent = 'Verifying...';
        verifyButton.disabled = true;
        verifyButton.style.opacity = '0.7';
        
        // Simulate verification (replace with actual API call)
        setTimeout(() => {
            // Successful verification - redirect to home page
            window.location.href = '/';
            
            // In case of error, show error and reset button
            // showToast('Invalid OTP. Please try again.', true);
            // verifyText.textContent = originalText;
            // verifyButton.disabled = false;
            // verifyButton.style.opacity = '1';
        }, 1500);
    }
}

/**
 * Handle change identifier button click
 */
function handleChangeClick() {
    // Return to the sign-in screen
    const formContainer = document.querySelector('.form-container');
    
    // Get the stored identifier
    const storedIdentifier = sessionStorage.getItem('userIdentifier') || '';
    
    // Show welcome and sign-in text that were hidden for sign-up
    const welcomeText = document.querySelector('.welcome-text');
    const signInText = document.querySelector('.sign-in-text');
    const logo = document.querySelector('.logo');
    
    if (welcomeText) welcomeText.style.display = 'block';
    if (signInText) signInText.style.display = 'block';
    if (logo) {
        logo.style.marginTop = '70px';
        logo.style.marginBottom = '50px';
        logo.style.width = '150px';
    }
    
    // Create sign-in form HTML
    const signInHTML = `
        <div class="form-field">
            <input type="text" id="user-input" class="input-field" placeholder=" " value="${storedIdentifier}">
            <label for="user-input" class="field-label">Enter your Mobile No. / Email</label>
        </div>
        
        <button class="continue-button">
            <span class="continue-text">Continue</span>
        </button>
        
        <div class="divider"></div>
        
        <p class="info-text">We will use your email address to check if you already have an account.</p>
    `;
    
    // Replace content
    formContainer.innerHTML = signInHTML;
    
    // Set up form functionality again
    setupSignInForm();
    
    // Auto-select the input field text
    const inputField = document.getElementById('user-input');
    if (inputField) {
        inputField.focus();
        inputField.select();
    }
}

/**
 * Show a toast message
 */
function showToast(message, isError = false) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'toast-error' : 'toast-success'}`;
    toast.textContent = message;
    
    // Add toast styles if not already added
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                color: white;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                animation: fadeInOut 3s forwards;
            }
            
            .toast-success {
                background-color: #4CAF50;
            }
            
            .toast-error {
                background-color: #F44336;
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after animation completes
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate mobile number format (simple check for digits only)
 */
function isValidMobile(mobile) {
    const mobileRegex = /^\d{10,12}$/;
    return mobileRegex.test(mobile);
}

/**
 * Mask email for privacy
 */
function maskEmail(email) {
    const [username, domain] = email.split('@');
    if (username.length <= 3) {
        return `${username.substring(0, 1)}***@${domain}`;
    }
    return `${username.substring(0, 3)}***@${domain}`;
}

/**
 * Mask mobile number for privacy
 */
function maskMobile(mobile) {
    if (mobile.length <= 4) return mobile;
    return `${mobile.substring(0, 2)}****${mobile.substring(mobile.length - 2)}`;
}

/**
 * Show error message
 */
function showError(message) {
    // Remove existing error message if any
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Add error message after the form field
    const formField = document.querySelector('.form-field');
    formField.insertAdjacentElement('afterend', errorDiv);
    
    // Add error class to form field
    formField.classList.add('error');
    
    // Remove error after 3 seconds
    setTimeout(function() {
        errorDiv.remove();
        formField.classList.remove('error');
    }, 3000);
}

/**
 * Show loading state
 */
function showLoading() {
    const continueButton = document.querySelector('.continue-button');
    const continueText = document.querySelector('.continue-text');
    
    // Save original text
    const originalText = continueText.textContent;
    
    // Change to loading state
    continueText.textContent = 'Please wait...';
    continueButton.disabled = true;
    continueButton.style.opacity = '0.7';
    
    // Reset after timeout or error
    setTimeout(function() {
        continueText.textContent = originalText;
        continueButton.disabled = false;
        continueButton.style.opacity = '1';
    }, 5000); // Fallback timeout in case redirect fails
}

/**
 * Show the sign up screen
 */
function showSignUpScreen(identifier) {
    const formContainer = document.querySelector('.form-container');
    const isEmail = identifier.includes('@');
    
    // Hide welcome and sign-in text
    const welcomeText = document.querySelector('.welcome-text');
    const signInText = document.querySelector('.sign-in-text');
    const logo = document.querySelector('.logo');
    
    if (welcomeText) welcomeText.style.display = 'none';
    if (signInText) signInText.style.display = 'none';
    if (logo) {
        logo.style.marginTop = '20px';
        logo.style.marginBottom = '20px';
        logo.style.width = '150px';
    }
    
    // Create new content for sign up screen
    const signUpHTML = `
        <div class="signup-container">
            <h2 class="signup-title">Create Account</h2>
            <p class="signup-text">Looks like you're new here! Please set up your account.</p>
            
            <div class="user-info">
                <span class="user-identifier">${identifier}</span>
                <button class="change-identifier-small">Change</button>
            </div>
            
            <div class="form-field name-field">
                <input type="text" id="name-input" class="input-field" placeholder=" ">
                <label for="name-input" class="field-label">Enter your full name</label>
            </div>
            
            <div class="form-field password-field">
                <input type="password" id="password-input" class="input-field" placeholder=" ">
                <label for="password-input" class="field-label">Create a password</label>
                <button class="toggle-password" type="button">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            
            <div class="password-requirements">
                <p class="requirements-text">Password must contain:</p>
                <ul class="requirements-list">
                    <li class="requirement" id="req-length">At least 8 characters</li>
                    <li class="requirement" id="req-uppercase">One uppercase letter</li>
                    <li class="requirement" id="req-lowercase">One lowercase letter</li>
                    <li class="requirement" id="req-number">One number</li>
                </ul>
            </div>
            
            <button class="create-account-button">
                <span class="create-account-text">Create Account</span>
            </button>
            
            <div class="terms-privacy">
                <p class="terms-text">By creating an account, you agree to our <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="privacy-link">Privacy Policy</a>.</p>
            </div>
        </div>
    `;
    
    // Replace form content with sign up screen
    formContainer.innerHTML = signUpHTML;
    
    // Add styles for sign up screen
    addSignUpStyles();
    
    // Setup name field focus
    const nameInput = document.getElementById('name-input');
    if (nameInput) {
        setTimeout(() => nameInput.focus(), 300);
    }
    
    // Setup password field and validation
    setupPasswordField();
    setupPasswordValidation();
    
    // Setup sign up button
    document.querySelector('.create-account-button').addEventListener('click', handleCreateAccount);
    
    // Setup change identifier button
    document.querySelector('.change-identifier-small').addEventListener('click', handleChangeClick);
}

/**
 * Add CSS styles for sign up screen
 */
function addSignUpStyles() {
    if (!document.getElementById('signup-styles')) {
        const style = document.createElement('style');
        style.id = 'signup-styles';
        style.textContent = `
            /* Main container styles */
            .container {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                position: relative;
                padding-bottom: 48px; /* Space for footer */
                box-sizing: border-box;
                overflow-y: auto;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }
            
            .container::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }
            
            /* Common styling for all screen types */
            .verification-container, 
            .password-container,
            .signup-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0 20px 20px;
                position: relative;
            }
            
            .signup-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px 20px 30px;
                position: relative;
                flex: 1;
                overflow-y: auto;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }
            
            .signup-container::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }
            
            .signup-title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 8px;
                text-align: center;
                color: #222;
                letter-spacing: -0.5px;
            }
            
            .signup-text {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
                margin-bottom: 18px;
                text-align: center;
                max-width: 90%;
                line-height: 1.4;
            }
            
            .user-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 12px 16px;
                background-color: #f8f8f8;
                border-radius: 12px;
                margin-bottom: 18px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                transition: all 0.2s ease;
                border: 1px solid rgba(0,0,0,0.06);
            }
            
            .user-info:hover {
                background-color: #f5f5f5;
            }
            
            .user-identifier {
                font-size: 14px;
                color: #333;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 75%;
            }
            
            .change-identifier-small {
                background: transparent;
                border: none;
                color: var(--primary-color);
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                padding: 5px 8px;
                border-radius: 6px;
                transition: all 0.2s ease;
            }
            
            .change-identifier-small:hover {
                background-color: rgba(102, 52, 225, 0.08);
                text-decoration: none;
            }
            
            .form-field {
                position: relative;
                width: 100%;
                margin-bottom: 15px;
                overflow: visible;
            }
            
            .name-field .input-field,
            .password-field .input-field {
                width: 100%;
                height: 56px;
                border: 1.5px solid rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                padding: 0 16px;
                font-size: 15px;
                color: #333;
                background: white;
                transition: all 0.25s ease;
                letter-spacing: 0.3px;
                z-index: 1;
                position: relative;
            }
            
            .name-field .input-field:focus,
            .password-field .input-field:focus {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(102, 52, 225, 0.12);
                outline: none;
            }
            
            .name-field .field-label,
            .password-field .field-label {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 15px;
                color: #777;
                pointer-events: none;
                transition: all 0.25s ease;
                background: white;
                padding: 0 4px;
                z-index: 2;
            }
            
            .name-field.focused .field-label,
            .password-field.focused .field-label,
            .name-field .input-field:not(:placeholder-shown) + .field-label,
            .password-field .input-field:not(:placeholder-shown) + .field-label {
                top: 0;
                font-size: 12px;
                color: var(--primary-color);
                font-weight: 500;
                background: white;
            }
            
            .toggle-password {
                position: absolute;
                right: 14px;
                top: 50%;
                transform: translateY(-50%);
                background: transparent;
                border: none;
                color: #777;
                cursor: pointer;
                z-index: 10;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .toggle-password:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
            
            .password-requirements {
                width: 100%;
                margin-bottom: 20px;
                padding: 12px;
                background-color: #f9f9f9;
                border-radius: 12px;
                border: 1px solid rgba(0, 0, 0, 0.08);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
                transition: all 0.3s ease;
            }
            
            .requirements-text {
                font-size: 13px;
                color: #333;
                margin-bottom: 8px;
                font-weight: 600;
                letter-spacing: -0.2px;
            }
            
            .requirements-list {
                list-style-type: none;
                padding: 0;
                margin: 0;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
            }
            
            .requirement {
                font-size: 12px;
                color: #777;
                position: relative;
                padding-left: 20px;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                line-height: 1.3;
            }
            
            .requirement:before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 1.5px solid #ccc;
                background-color: white;
                transition: all 0.3s ease;
            }
            
            .requirement.valid {
                color: #2E7D32;
                font-weight: 500;
            }
            
            .requirement.valid:before {
                content: "✓";
                border-color: #2E7D32;
                background-color: #2E7D32;
                color: white;
                font-size: 10px;
                text-align: center;
                line-height: 14px;
            }
            
            .create-account-button {
                width: 100%;
                height: 54px;
                background: linear-gradient(180deg, var(--primary-color) 0%, var(--primary-dark) 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
                margin-bottom: 20px;
                padding: 0;
                overflow: hidden;
                position: relative;
                box-shadow: 0 4px 8px rgba(102, 52, 225, 0.15);
            }
            
            .create-account-button:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
                transform: translateX(-100%);
                transition: transform 0.6s ease;
            }
            
            .create-account-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(102, 52, 225, 0.25);
            }
            
            .create-account-button:hover:before {
                transform: translateX(100%);
            }
            
            .create-account-button:active {
                transform: translateY(0);
                box-shadow: 0 3px 6px rgba(102, 52, 225, 0.15);
            }
            
            .create-account-text {
                color: white;
                font-size: 15px;
                font-weight: 600;
                line-height: 1;
                display: inline-block;
                width: 100%;
                text-align: center;
                letter-spacing: 0.3px;
            }
            
            .terms-privacy {
                width: 100%;
                margin-top: 5px;
                padding: 10px;
                border-radius: 8px;
                background-color: rgba(0, 0, 0, 0.02);
            }
            
            .terms-text {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.6);
                text-align: center;
                line-height: 1.6;
            }
            
            .terms-link, .privacy-link {
                color: var(--primary-color);
                text-decoration: none;
                font-weight: 500;
                transition: all 0.2s ease;
                border-bottom: 1px solid transparent;
            }
            
            .terms-link:hover, .privacy-link:hover {
                border-bottom: 1px solid var(--primary-color);
            }
            
            /* Footer positioning */
            .footer {
                position: fixed !important;
                bottom: 0;
                left: 0;
                width: 100vw;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 20px;
                background-color: #f8f8f8;
                border-top: 1px solid rgba(0, 0, 0, 0.06);
                z-index: 100;
            }
            
            .footer-logo {
                height: 32px !important;
                margin-right: 15px;
            }
            
            .copyright {
                font-size: 13px;
                color: #666;
            }
            
            /* Animation for page load */
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .signup-container > * {
                animation: fadeIn 0.5s ease forwards;
                opacity: 0;
            }
            
            .signup-title {
                animation-delay: 0.1s;
            }
            
            .signup-text {
                animation-delay: 0.2s;
            }
            
            .user-info {
                animation-delay: 0.3s;
            }
            
            .name-field {
                animation-delay: 0.4s;
            }
            
            .password-field {
                animation-delay: 0.5s;
            }
            
            .password-requirements {
                animation-delay: 0.6s;
            }
            
            .create-account-button {
                animation-delay: 0.7s;
            }
            
            .terms-privacy {
                animation-delay: 0.8s;
            }
            
            /* Error state for input fields */
            .name-field.error .input-field,
            .password-field.error .input-field {
                border-color: #F44336;
                box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
            }
            
            .name-field.error .field-label,
            .password-field.error .field-label {
                color: #F44336;
            }
            
            /* Ensure body has proper styling */
            body {
                overflow-x: hidden;
                min-height: 100vh;
                margin: 0;
                display: flex;
                flex-direction: column;
            }
            
            /* Add responsive adjustments */
            @media (max-height: 700px) {
                .signup-container {
                    padding-top: 5px;
                }
                
                .signup-title {
                    margin-bottom: 8px;
                }
                
                .signup-text {
                    margin-bottom: 15px;
                }
                
                .user-info, .form-field {
                    margin-bottom: 15px;
                }
                
                .password-requirements {
                    margin-bottom: 20px;
                    padding: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Setup password validation
 */
function setupPasswordValidation() {
    const passwordInput = document.getElementById('password-input');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }
}

/**
 * Validate password against requirements
 */
function validatePassword() {
    const password = document.getElementById('password-input').value;
    
    // Check each requirement
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    // Update requirement visuals
    updateRequirement('req-length', hasLength);
    updateRequirement('req-uppercase', hasUppercase);
    updateRequirement('req-lowercase', hasLowercase);
    updateRequirement('req-number', hasNumber);
    
    // Return overall validity
    return hasLength && hasUppercase && hasLowercase && hasNumber;
}

/**
 * Update visual state of a requirement
 */
function updateRequirement(reqId, isValid) {
    const reqElement = document.getElementById(reqId);
    if (reqElement) {
        if (isValid) {
            reqElement.classList.add('valid');
        } else {
            reqElement.classList.remove('valid');
        }
    }
}

/**
 * Handle create account button click
 */
function handleCreateAccount() {
    const nameInput = document.getElementById('name-input');
    const passwordInput = document.getElementById('password-input');
    
    // Validate name
    if (!nameInput || !nameInput.value.trim()) {
        showToast('Please enter your full name', true);
        return;
    }
    
    // Validate password
    if (!validatePassword()) {
        showToast('Please meet all password requirements', true);
        return;
    }
    
    const name = nameInput.value.trim();
    const identifier = sessionStorage.getItem('userIdentifier');
    
    // Show loading state
    const createButton = document.querySelector('.create-account-button');
    const createText = document.querySelector('.create-account-text');
    
    if (createButton && createText) {
        const originalText = createText.textContent;
        createText.textContent = 'Creating account...';
        createButton.disabled = true;
        createButton.style.opacity = '0.7';
        
        // Simulate account creation
        setTimeout(() => {
            // Add user to dummy database
            const isEmail = identifier.includes('@');
            const newUser = {
                name: name,
                [isEmail ? 'email' : 'mobile']: identifier
            };
            
            // Get current users and add new one
            const users = JSON.parse(sessionStorage.getItem('dummyUsers')) || [];
            users.push(newUser);
            sessionStorage.setItem('dummyUsers', JSON.stringify(users));
            
            // Show success message
            showToast('Account created successfully!');
            
            // Redirect to home page after short delay
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }, 1500);
    }
} 