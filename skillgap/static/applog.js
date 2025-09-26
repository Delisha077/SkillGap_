// Application Data
const appData = {
  userTypes: [
    "Student",
    "Recent Graduate", 
    "Job Seeker",
    "Career Changer"
  ],
  socialLoginProviders: [
    {"name": "Google", "icon": "🌐", "color": "#4285F4"},
    {"name": "LinkedIn", "icon": "💼", "color": "#0077B5"},
    {"name": "GitHub", "icon": "🐙", "color": "#333"}
  ],
  benefits: [
    {
      "icon": "📊",
      "title": "Instant Resume Analysis", 
      "description": "Upload your resume and get immediate feedback on your skills"
    },
    {
      "icon": "🎯", 
      "title": "Discover Skill Gaps",
      "description": "Compare your profile with job requirements and find missing skills"
    },
    {
      "icon": "📚",
      "title": "Personalized Learning",
      "description": "Get curated resource recommendations to bridge skill gaps"
    },
    {
      "icon": "📈",
      "title": "Track Progress", 
      "description": "Monitor your skill development journey over time"
    }
  ],
  testimonial: {
    "text": "This tool helped me identify the exact skills I was missing for my dream job. Within 3 months, I landed an internship at a top tech company!",
    "author": "Sarah Chen",
    "role": "Computer Science Student, Stanford University"
  },
  demoCredentials: {
    "email": "demo@student.com",
    "password": "demo123"
  }
};

// Global State
let currentUserType = 'Student';
let isLoading = false;

// DOM Elements
const elements = {
  loginForm: null,
  signupForm: null,
  forgotForm: null,
  toast: null,
  loginBtn: null,
  signupBtn: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  populateContent();
  setupEventListeners();
});

function initializeElements() {
  elements.loginForm = document.getElementById('login-form');
  elements.signupForm = document.getElementById('signup-form');
  elements.forgotForm = document.getElementById('forgot-form');
  elements.toast = document.getElementById('toast');
  elements.loginBtn = document.getElementById('login-btn');
  elements.signupBtn = document.getElementById('signup-btn');
}

function populateContent() {
  populateBenefits();
  populateTestimonial();
  populateUserTypes();
  populateSocialProviders();
}

function populateBenefits() {
  const benefitsList = document.getElementById('benefits-list');
  
  appData.benefits.forEach(benefit => {
    const benefitElement = document.createElement('div');
    benefitElement.className = 'benefit-item';
    
    benefitElement.innerHTML = `
      <div class="benefit-icon">${benefit.icon}</div>
      <div class="benefit-content">
        <h4 class="benefit-title">${benefit.title}</h4>
        <p class="benefit-description">${benefit.description}</p>
      </div>
    `;
    
    benefitsList.appendChild(benefitElement);
  });
}

function populateTestimonial() {
  const testimonial = appData.testimonial;
  document.getElementById('testimonial-text').textContent = `"${testimonial.text}"`;
  document.getElementById('testimonial-author').textContent = testimonial.author;
  document.getElementById('testimonial-role').textContent = testimonial.role;
}

function populateUserTypes() {
  const userTypeContainer = document.getElementById('user-type-options');
  
  appData.userTypes.forEach((type, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `user-type-btn ${index === 0 ? 'active' : ''}`;
    button.textContent = type;
    button.onclick = () => selectUserType(type, button);
    
    userTypeContainer.appendChild(button);
  });
}

function populateSocialProviders() {
  const socialContainer = document.getElementById('social-providers');
  
  appData.socialLoginProviders.forEach(provider => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'social-btn';
    button.onclick = () => handleSocialLogin(provider.name);
    
    button.innerHTML = `
      <span class="social-icon">${provider.icon}</span>
      <span>${provider.name}</span>
    `;
    
    socialContainer.appendChild(button);
  });
}

function setupEventListeners() {
  // Password visibility toggle
  setupPasswordToggle();
  
  // Form submission prevention for demo
  document.addEventListener('submit', function(e) {
    e.preventDefault();
  });
  
  // Toast auto-hide
  elements.toast.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'transform' && elements.toast.classList.contains('show')) {
      setTimeout(() => hideToast(), 4000);
    }
  });
}

function setupPasswordToggle() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => {
    input.addEventListener('input', function() {
      const toggle = this.parentElement.querySelector('.password-toggle');
      if (toggle) {
        toggle.style.display = this.value ? 'block' : 'none';
      }
    });
  });
}

// User Type Selection
function selectUserType(type, buttonElement) {
  currentUserType = type;
  
  // Update active state
  document.querySelectorAll('.user-type-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  buttonElement.classList.add('active');
  
  showToast(`Selected: ${type}`, 'info', '🎯');
}

// Form Navigation
function showLoginForm() {
  elements.loginForm.classList.remove('hidden');
  elements.signupForm.classList.add('hidden');
  elements.forgotForm.classList.add('hidden');
  clearErrors();
}

function showSignupForm() {
  elements.loginForm.classList.add('hidden');
  elements.signupForm.classList.remove('hidden');
  elements.forgotForm.classList.add('hidden');
  clearErrors();
}

function showForgotPassword() {
  elements.loginForm.classList.add('hidden');
  elements.signupForm.classList.add('hidden');
  elements.forgotForm.classList.remove('hidden');
  clearErrors();
}

// Password Toggle
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('password-toggle-icon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleIcon.textContent = '👁️';
  }
}

// Form Validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + '-error');
  
  field.classList.add('error');
  errorElement.textContent = message;
  
  field.addEventListener('input', function() {
    clearFieldError(fieldId);
  }, { once: true });
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + '-error');
  
  if (field) field.classList.remove('error');
  if (errorElement) errorElement.textContent = '';
}

function clearErrors() {
  document.querySelectorAll('.form-control').forEach(field => {
    field.classList.remove('error');
  });
  document.querySelectorAll('.error-message').forEach(error => {
    error.textContent = '';
  });
}

// Button Loading States
function setButtonLoading(button, isLoading) {
  const btnText = button.querySelector('.btn-text');
  const btnSpinner = button.querySelector('.btn-spinner');
  
  if (isLoading) {
    btnText.style.opacity = '0.7';
    btnSpinner.classList.remove('hidden');
    button.disabled = true;
  } else {
    btnText.style.opacity = '1';
    btnSpinner.classList.add('hidden');
    button.disabled = false;
  }
}

// Authentication Functions
async function handleLogin(event) {
  event.preventDefault();
  
  if (isLoading) return;
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember-me').checked;
  
  // Validation
  let isValid = true;
  
  if (!email) {
    showFieldError('email', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!password) {
    showFieldError('password', 'Password is required');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Start loading
  isLoading = true;
  setButtonLoading(elements.loginBtn, true);

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.message || 'Login failed');
    }
    showToast('Login successful! Redirecting...', 'success', '✅');
    setTimeout(() => {
      window.location.href = '/';
    }, 800);
  } catch (err) {
    showToast(err.message || 'Invalid email or password', 'error', '❌');
  } finally {
    isLoading = false;
    setButtonLoading(elements.loginBtn, false);
  }
}

async function handleSignup(event) {
  event.preventDefault();
  
  if (isLoading) return;
  
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const agreedToTerms = document.getElementById('terms-agreement').checked;
  
  // Validation
  let isValid = true;
  
  if (!name) {
    showToast('Full name is required', 'error', '❌');
    isValid = false;
  }
  
  if (!email) {
    showToast('Email is required', 'error', '❌');
    isValid = false;
  } else if (!validateEmail(email)) {
    showToast('Please enter a valid email address', 'error', '❌');
    isValid = false;
  }
  
  if (!password) {
    showToast('Password is required', 'error', '❌');
    isValid = false;
  } else if (!validatePassword(password)) {
    showToast('Password must be at least 6 characters', 'error', '❌');
    isValid = false;
  }
  
  if (!agreedToTerms) {
    showToast('You must agree to the terms and conditions', 'error', '❌');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Start loading
  isLoading = true;
  setButtonLoading(elements.signupBtn, true);

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.message || 'Signup failed');
    }
    showToast(`Welcome ${name}! Account created successfully!`, 'success', '🎉');
    setTimeout(() => {
      showLoginForm();
      document.getElementById('email').value = email;
      showToast('Please sign in with your new account', 'info', 'ℹ️');
    }, 800);
  } catch (err) {
    showToast(err.message || 'Signup failed', 'error', '❌');
  } finally {
    isLoading = false;
    setButtonLoading(elements.signupBtn, false);
  }
}

async function handleForgotPassword(event) {
  event.preventDefault();
  
  const email = document.getElementById('forgot-email').value.trim();
  
  if (!email) {
    showToast('Email is required', 'error', '❌');
    return;
  }
  
  if (!validateEmail(email)) {
    showToast('Please enter a valid email address', 'error', '❌');
    return;
  }

  try {
    const res = await fetch('/api/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.message || 'Unable to send reset link');
    }
    showToast('Password reset link sent to your email!', 'success', '📧');
    setTimeout(() => {
      showLoginForm();
    }, 800);
  } catch (err) {
    showToast(err.message || 'Unable to send reset link', 'error', '❌');
  }
}

function loginWithDemo() {
  document.getElementById('email').value = appData.demoCredentials.email;
  document.getElementById('password').value = appData.demoCredentials.password;
  
  showToast('Demo credentials loaded! Click Sign In to continue.', 'info', '🚀');
}

function handleSocialLogin(provider) {
  showToast(`${provider} login coming soon!`, 'info', '🔗');
  
  // Simulate social login
  setTimeout(() => {
    showToast(`Welcome! Signed in with ${provider}`, 'success', '✅');
    setTimeout(() => {
      window.open('https://example.com/skill-analyzer', '_blank');
    }, 2000);
  }, 1500);
}

// Toast Notifications
function showToast(message, type = 'info', icon = 'ℹ️') {
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');
  
  // Remove existing type classes
  elements.toast.classList.remove('toast--success', 'toast--error', 'toast--info');
  
  // Set content
  toastIcon.textContent = icon;
  toastMessage.textContent = message;
  
  // Add type class
  elements.toast.classList.add(`toast--${type}`);
  
  // Show toast
  elements.toast.classList.remove('hidden');
  setTimeout(() => {
    elements.toast.classList.add('show');
  }, 10);
}

function hideToast() {
  elements.toast.classList.remove('show');
  setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 300);
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
  // Auto-focus first input when switching forms
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.classList.contains('auth-form') && !target.classList.contains('hidden')) {
          const firstInput = target.querySelector('input[type="text"], input[type="email"]');
          if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
          }
        }
      }
    });
  });
  
  document.querySelectorAll('.auth-form').forEach(form => {
    observer.observe(form, { attributes: true });
  });
  
  // Enhanced keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Escape key to close forms or go back
    if (e.key === 'Escape') {
      if (!elements.loginForm.classList.contains('hidden')) {
        // Already on login form, do nothing
        return;
      } else if (!elements.signupForm.classList.contains('hidden') || !elements.forgotForm.classList.contains('hidden')) {
        showLoginForm();
        e.preventDefault();
      }
    }
    
    // Enter key on user type buttons
    if (e.key === 'Enter' && e.target.classList.contains('user-type-btn')) {
      e.target.click();
      e.preventDefault();
    }
  });
  
  // Form field enhancements
  const formFields = document.querySelectorAll('.form-control');
  formFields.forEach(field => {
    field.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
    
    // Real-time validation feedback
    if (field.type === 'email') {
      field.addEventListener('input', debounce(function() {
        if (this.value && !validateEmail(this.value)) {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
        }
      }, 500));
    }
  });
});

// Accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels and descriptions
  document.querySelectorAll('.user-type-btn').forEach((btn, index) => {
    btn.setAttribute('aria-describedby', 'user-type-description');
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', index === 0 ? 'true' : 'false');
  });
  
  // Add form validation announcements
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const errors = this.querySelectorAll('.error-message:not(:empty)');
      if (errors.length > 0) {
        const errorMessages = Array.from(errors).map(error => error.textContent).join('. ');
        announceToScreenReader(`Form validation errors: ${errorMessages}`);
      }
    });
  });
}

function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

console.log('🚀 Skill Gap Analyzer Login initialized successfully!');