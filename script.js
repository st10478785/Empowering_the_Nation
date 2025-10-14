// Main JavaScript file for Empowering The Nation website
// Contains all functionality for navigation, forms, and interactive elements

// DOM Content - Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeDropdowns();
    initializeTestimonialSlider();
    initializeCourseFilters();
    initializeCourseSearch();
    initializeCourseModals();
    initializeEnrollmentForm();
    initializeFormValidation();
    initializePricingCalculator();
});

// Theme Management Functions
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme based on localStorage or default to light
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        themeToggle.checked = currentTheme === 'dark';
    }
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const theme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            showNotification('Theme updated', `Switched to ${theme} mode`, 'success');
        });
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const closeMenuBtn = document.querySelector('.close-mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu function
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close menu event listeners
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Dropdown Menu Functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (!toggle) return;
        
        // Toggle dropdown on click
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
        
        // Handle dropdown items click
        const dropdownItems = dropdown.querySelectorAll('.dropdown-content a');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                dropdown.classList.remove('active');
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
    
    // Close dropdowns on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Testimonial Slider Functionality
function initializeTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const slides = track.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    
    // Update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Next slide button
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });
    
    // Previous slide button
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 5000);
    
    // Pause auto-advance on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
    });
}

// Course Filtering Functionality
function initializeCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (filterBtns.length === 0 || courseCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter courses based on selection
            courseCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            checkNoResults();
        });
    });
}

// Course Search Functionality
function initializeCourseSearch() {
    const searchInput = document.getElementById('course-search');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (!searchInput || courseCards.length === 0) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        courseCards.forEach(card => {
            const title = card.querySelector('.course-title').textContent.toLowerCase();
            const description = card.querySelector('.course-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        checkNoResults();
    });
}

// Check for no results in course filtering/search
function checkNoResults() {
    const courseCards = document.querySelectorAll('.course-card');
    const noResults = document.getElementById('no-results');
    const visibleCards = Array.from(courseCards).filter(card => card.style.display !== 'none');
    
    if (noResults) {
        if (visibleCards.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    }
}

// Course Detail Modals Functionality
function initializeCourseModals() {
    const detailBtns = document.querySelectorAll('.course-detail-btn');
    const modal = document.getElementById('course-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (detailBtns.length === 0 || !modal) return;
    
    // Course data for modals
    const courseData = {
        'first-aid': {
            title: 'First Aid Level 1',
            description: 'Essential first aid skills for workplace and home safety. Learn life-saving techniques and emergency response procedures.',
            duration: '6 weeks',
            price: 'From R1500',
            outcomes: [
                'CPR certification and emergency response',
                'Wound care and bandaging techniques',
                'Fracture management and immobilization',
                'Burn treatment and first aid',
                'Emergency scene management'
            ],
            requirements: [
                'Minimum age: 16 years',
                'Basic literacy and numeracy',
                'Valid ID document'
            ]
        },
        'sewing': {
            title: 'Sewing Essentials',
            description: 'Master basic to intermediate sewing techniques. Perfect for starting a small business or enhancing your skills.',
            duration: '6 weeks',
            price: 'From R1500',
            outcomes: [
                'Machine operation and maintenance',
                'Pattern reading and cutting',
                'Garment construction techniques',
                'Alterations and repairs',
                'Basic embroidery and finishing'
            ],
            requirements: [
                'Minimum age: 16 years',
                'Basic literacy',
                'Access to sewing machine (provided in class)'
            ]
        },
        'landscaping': {
            title: 'Landscaping',
            description: 'Complete landscaping and garden design training. Learn to create and maintain beautiful outdoor spaces.',
            duration: '6 months',
            price: 'From R4500',
            outcomes: [
                'Plant knowledge and selection',
                'Landscape design principles',
                'Irrigation system installation',
                'Garden maintenance techniques',
                'Business management basics'
            ],
            requirements: [
                'Minimum age: 18 years',
                'Grade 10 certificate or equivalent',
                'Physical fitness for outdoor work'
            ]
        },
        'life-skills': {
            title: 'Life Skills',
            description: 'Develop essential personal and professional skills for success in work and life.',
            duration: '6 weeks',
            price: 'From R1500',
            outcomes: [
                'Effective communication skills',
                'Financial literacy and budgeting',
                'Problem-solving techniques',
                'Time management strategies',
                'Career planning and development'
            ],
            requirements: [
                'Minimum age: 16 years',
                'Basic literacy and numeracy'
            ]
        },
        'child-minding': {
            title: 'Child Minding',
            description: 'Professional childcare training for aspiring nannies, au pairs, and daycare providers.',
            duration: '6 weeks',
            price: 'From R750',
            outcomes: [
                'Child development stages',
                'Safety protocols and first aid',
                'Nutrition planning and meal prep',
                'Educational activity planning',
                'Professional childcare ethics'
            ],
            requirements: [
                'Minimum age: 18 years',
                'Clean criminal record',
                'Love for working with children'
            ]
        },
        'cooking': {
            title: 'Cooking',
            description: 'Learn fundamental cooking techniques and meal preparation for home or small catering business.',
            duration: '6 weeks',
            price: 'From R750',
            outcomes: [
                'Basic cooking methods',
                'Food safety and hygiene',
                'Meal planning and nutrition',
                'Recipe adaptation',
                'Kitchen management'
            ],
            requirements: [
                'Minimum age: 16 years',
                'Basic literacy',
                'Interest in cooking and food'
            ]
        },
        'garden-maintenance': {
            title: 'Garden Maintenance',
            description: 'Essential gardening skills for residential and commercial property maintenance.',
            duration: '6 weeks',
            price: 'From R750',
            outcomes: [
                'Lawn care and maintenance',
                'Plant care and pruning',
                'Weed and pest control',
                'Basic landscaping',
                'Tool maintenance'
            ],
            requirements: [
                'Minimum age: 16 years',
                'Physical fitness for outdoor work',
                'Interest in gardening'
            ]
        }
    };
    
    // Open modal event listeners
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.dataset.course;
            const course = courseData[courseId];
            
            if (course) {
                openCourseModal(course);
            }
        });
    });
    
    // Close modal event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeCourseModal);
    }
    
    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCourseModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCourseModal();
        }
    });
    
    // Open course modal function
    function openCourseModal(course) {
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        
        if (modalTitle && modalContent) {
            modalTitle.textContent = course.title;
            
            modalContent.innerHTML = `
                <div class="course-modal-content">
                    <p class="course-modal-description">${course.description}</p>
                    
                    <div class="course-modal-meta">
                        <div class="meta-item">
                            <strong>Duration:</strong> ${course.duration}
                        </div>
                        <div class="meta-item">
                            <strong>Price:</strong> ${course.price}
                        </div>
                    </div>
                    
                    <div class="course-modal-section">
                        <h3>Learning Outcomes</h3>
                        <ul class="outcomes-list">
                            ${course.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="course-modal-section">
                        <h3>Requirements</h3>
                        <ul class="requirements-list">
                            ${course.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="course-modal-section">
                        <h3>Certification</h3>
                        <p>Upon successful completion, students receive a SAQA accredited certificate that is nationally recognized.</p>
                    </div>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close course modal function
    function closeCourseModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Enrollment Form Management
function initializeEnrollmentForm() {
    const form = document.getElementById('enrollment-form');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const progressFill = document.querySelector('.progress-fill');
    const progressIndicators = document.querySelectorAll('.progress-indicator');
    
    if (!form || steps.length === 0) return;
    
    let currentStep = 1;
    
    // Show current step function
    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        const currentStepElement = document.getElementById(`step-${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update progress bar and indicators
        updateProgress(stepNumber);
    }
    
    // Update progress bar and indicators function
    function updateProgress(stepNumber) {
        const progressPercentage = ((stepNumber - 1) / (steps.length - 1)) * 100;
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        progressIndicators.forEach((indicator, index) => {
            if (index + 1 <= stepNumber) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Next step buttons event listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            
            if (validateStep(currentStep)) {
                currentStep = nextStep;
                showStep(currentStep);
                
                // Update review section if on last step
                if (currentStep === 4) {
                    updateReviewSection();
                }
            }
        });
    });
    
    // Previous step buttons event listeners
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            currentStep = prevStep;
            showStep(currentStep);
        });
    });
    
    // Form submission event listener
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                // Simulate form submission
                const successMessage = form.querySelector('.success-message');
                const formSteps = form.querySelectorAll('.form-step');
                
                formSteps.forEach(step => step.style.display = 'none');
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
                
                showNotification('Application Submitted', 'Thank you for your application! We will contact you within 2 business days.', 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    currentStep = 1;
                    showStep(currentStep);
                    formSteps.forEach(step => step.style.display = '');
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                }, 5000);
            }
        });
    }
    
    // Update review section with form data
    function updateReviewSection() {
        const formData = new FormData(form);
        
        // Personal information
        document.getElementById('review-name').textContent = 
            `${formData.get('first-name')} ${formData.get('last-name')}`;
        document.getElementById('review-id').textContent = formData.get('id-number');
        document.getElementById('review-phone').textContent = formData.get('phone');
        document.getElementById('review-email').textContent = formData.get('email');
        
        // Course selection
        const courseSelect = document.getElementById('course');
        const selectedCourse = courseSelect.options[courseSelect.selectedIndex].text;
        document.getElementById('review-course').textContent = selectedCourse;
        
        const selectedSchedule = form.querySelector('input[name="schedule"]:checked');
        document.getElementById('review-schedule').textContent = 
            selectedSchedule ? selectedSchedule.value : 'Not selected';
        
        // Funding information
        const selectedFunding = form.querySelector('input[name="funding"]:checked');
        document.getElementById('review-funding').textContent = 
            selectedFunding ? selectedFunding.value : 'Not selected';
    }
    
    // Step validation function
    function validateStep(step) {
        let isValid = true;
        
        switch(step) {
            case 1:
                isValid = validatePersonalInfo();
                break;
            case 2:
                isValid = validateCourseSelection();
                break;
            case 3:
                isValid = validateFunding();
                break;
            case 4:
                isValid = validateConsent();
                break;
        }
        
        if (!isValid) {
            showNotification('Validation Error', 'Please fill in all required fields correctly.', 'error');
        }
        
        return isValid;
    }
}

// Form Validation Functions
function initializeFormValidation() {
    // Real-time validation for form fields
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    
    if (!formGroup) return true;
    
    // Clear previous error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation (South African)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            showFieldError(field, 'Please enter a valid South African phone number');
            return false;
        }
    }
    
    // ID number validation (South African)
    if (field.id === 'id-number' && value) {
        if (value.length !== 13 || !/^\d+$/.test(value)) {
            showFieldError(field, 'Please enter a valid 13-digit ID number');
            return false;
        }
    }
    
    return true;
}

// Show field error message
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    field.classList.add('error');
    formGroup.classList.add('error');
    
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

// Clear field error message
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    
    field.classList.remove('error');
    formGroup.classList.remove('error');
}

// Step-specific validation functions
function validatePersonalInfo() {
    const fields = [
        'first-name',
        'last-name',
        'id-number',
        'phone',
        'email',
        'address'
    ];
    
    let isValid = true;
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateCourseSelection() {
    const courseSelect = document.getElementById('course');
    const scheduleSelected = document.querySelector('input[name="schedule"]:checked');
    
    let isValid = true;
    
    // Validate course selection
    if (!courseSelect.value) {
        showFieldError(courseSelect, 'Please select a course');
        isValid = false;
    } else {
        clearFieldError(courseSelect);
    }
    
    // Validate schedule selection
    const scheduleError = document.querySelector('.schedule-error');
    if (!scheduleSelected) {
        if (scheduleError) {
            scheduleError.style.display = 'block';
        }
        isValid = false;
    } else {
        if (scheduleError) {
            scheduleError.style.display = 'none';
        }
    }
    
    return isValid;
}

function validateFunding() {
    const fundingSelected = document.querySelector('input[name="funding"]:checked');
    const fundingError = document.querySelector('.funding-error');
    
    if (!fundingSelected) {
        if (fundingError) {
            fundingError.style.display = 'block';
        }
        return false;
    } else {
        if (fundingError) {
            fundingError.style.display = 'none';
        }
        return true;
    }
}

function validateConsent() {
    const terms = document.querySelector('input[name="terms"]');
    const privacy = document.querySelector('input[name="privacy"]');
    
    if (!terms.checked || !privacy.checked) {
        showNotification('Consent Required', 'Please agree to the terms and privacy policy to continue.', 'warning');
        return false;
    }
    
    return true;
}

// Pricing Calculator Functionality
function initializePricingCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-calculator');
    const saveQuoteBtn = document.getElementById('save-quote');
    const courseSelect = document.getElementById('course-select');
    const fundingOption = document.getElementById('funding-option');

    if (!calculateBtn || !courseSelect) return;

    // Course prices data
    const coursePrices = {
        'first-aid': 1500,
        'sewing': 1500,
        'landscaping': 4500,
        'life-skills': 1500,
        'child-minding': 750,
        'cooking': 750,
        'garden-maintenance': 750
    };

    // Volume discount tiers
    const volumeDiscounts = {
        1: 0,   // 1 course: 0% discount
        2: 5,   // 2 courses: 5% discount
        3: 10,  // 3 courses: 10% discount
        4: 15   // 4+ courses: 15% discount
    };

    // Calculate total price function
    function calculateTotal() {
        const selectedOptions = Array.from(courseSelect.selectedOptions);
        
        if (selectedOptions.length === 0) {
            resetCalculator();
            return;
        }

        // Calculate subtotal
        let subtotal = 0;
        selectedOptions.forEach(option => {
            const courseId = option.value;
            subtotal += coursePrices[courseId] || 0;
        });

        // Calculate volume discount
        const numCourses = selectedOptions.length;
        const discountPercent = volumeDiscounts[Math.min(numCourses, 4)] || 0;
        const volumeDiscount = (subtotal * discountPercent) / 100;

        // Calculate payment discount
        const fundingType = fundingOption ? fundingOption.value : 'full-payment';
        let paymentDiscount = 0;
        
        if (fundingType === 'full-payment') {
            paymentDiscount = (subtotal * 5) / 100; // 5% discount for full payment
        }

        // Calculate final total
        const finalTotal = subtotal - volumeDiscount - paymentDiscount;

        // Update display
        updatePricingDisplay(subtotal, volumeDiscount, paymentDiscount, finalTotal, fundingType);
    }

    // Update pricing display function
    function updatePricingDisplay(subtotal, volumeDiscount, paymentDiscount, finalTotal, fundingType) {
        // Update basic pricing elements
        const courseFeeEl = document.getElementById('course-fee');
        const volumeDiscountEl = document.getElementById('volume-discount');
        const paymentDiscountEl = document.getElementById('payment-discount');
        const totalAmountEl = document.getElementById('total-amount');

        if (courseFeeEl) courseFeeEl.textContent = formatCurrency(subtotal);
        if (volumeDiscountEl) volumeDiscountEl.textContent = `-${formatCurrency(volumeDiscount)}`;
        if (paymentDiscountEl) paymentDiscountEl.textContent = `-${formatCurrency(paymentDiscount)}`;
        if (totalAmountEl) totalAmountEl.textContent = formatCurrency(finalTotal);

        // Update payment breakdown
        updatePaymentBreakdown(finalTotal, fundingType);
    }

    // Update payment breakdown function
    function updatePaymentBreakdown(total, fundingType) {
        const breakdownEl = document.getElementById('payment-breakdown');
        if (!breakdownEl) return;

        if (fundingType === 'payment-plan') {
            const installment = (total / 3).toFixed(2);
            const adminFee = 100;
            const totalWithFee = parseFloat(total) + adminFee;

            breakdownEl.innerHTML = `
                <div class="payment-plan">
                    <h4>Payment Plan (3 Months)</h4>
                    <div class="payment-installment">
                        <span class="installment-label">Deposit (Today):</span>
                        <span class="installment-amount">${formatCurrency(installment)}</span>
                    </div>
                    <div class="payment-installment">
                        <span class="installment-label">2nd Installment (30 days):</span>
                        <span class="installment-amount">${formatCurrency(installment)}</span>
                    </div>
                    <div class="payment-installment">
                        <span class="installment-label">Final Installment (60 days):</span>
                        <span class="installment-amount">${formatCurrency(installment)}</span>
                    </div>
                    <div class="payment-installment">
                        <span class="installment-label">Admin Fee:</span>
                        <span class="installment-amount">${formatCurrency(adminFee)}</span>
                    </div>
                    <div class="result-divider"></div>
                    <div class="payment-installment total">
                        <span class="installment-label">Total with Payment Plan:</span>
                        <span class="installment-amount">${formatCurrency(totalWithFee)}</span>
                    </div>
                </div>
            `;
        } else {
            breakdownEl.innerHTML = `
                <div class="payment-plan">
                    <div class="payment-installment">
                        <span class="installment-label">Payment Method:</span>
                        <span class="installment-amount">${getPaymentMethod(fundingType)}</span>
                    </div>
                </div>
            `;
        }
    }

    // Get payment method description function
    function getPaymentMethod(fundingType) {
        const methods = {
            'full-payment': 'Once-off Payment',
            'payment-plan': '3-Month Payment Plan',
            'employer': 'Employer Sponsorship',
            'bursary': 'Bursary Application'
        };
        return methods[fundingType] || 'Standard Payment';
    }

    // Format currency function
    function formatCurrency(amount) {
        return 'R' + parseFloat(amount).toLocaleString('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Reset calculator function
    function resetCalculator() {
        if (courseSelect) courseSelect.selectedIndex = -1;
        if (fundingOption) fundingOption.value = 'full-payment';
        
        const courseFeeEl = document.getElementById('course-fee');
        const volumeDiscountEl = document.getElementById('volume-discount');
        const paymentDiscountEl = document.getElementById('payment-discount');
        const totalAmountEl = document.getElementById('total-amount');
        const breakdownEl = document.getElementById('payment-breakdown');

        if (courseFeeEl) courseFeeEl.textContent = formatCurrency(0);
        if (volumeDiscountEl) volumeDiscountEl.textContent = formatCurrency(0);
        if (paymentDiscountEl) paymentDiscountEl.textContent = formatCurrency(0);
        if (totalAmountEl) totalAmountEl.textContent = formatCurrency(0);
        if (breakdownEl) breakdownEl.innerHTML = '';
    }

    // Save quote function
    function saveQuote() {
        const selectedOptions = Array.from(courseSelect.selectedOptions);
        
        if (selectedOptions.length === 0) {
            showNotification('No Courses Selected', 'Please select at least one course to save a quote.', 'warning');
            return;
        }

        const totalAmount = document.getElementById('total-amount').textContent;
        const courseNames = selectedOptions.map(option => option.text.split(' - ')[0]).join(', ');

        // In a real application, this would save to localStorage or send to a server
        const quoteData = {
            courses: courseNames,
            total: totalAmount,
            timestamp: new Date().toISOString(),
            quoteId: 'QT-' + Date.now()
        };

        // Simulate saving
        showNotification('Quote Saved', `Your quote for ${courseNames} has been saved. Total: ${totalAmount}`, 'success');
    }

    // Event listeners for pricing calculator
    calculateBtn.addEventListener('click', calculateTotal);
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCalculator);
    }
    
    if (saveQuoteBtn) {
        saveQuoteBtn.addEventListener('click', saveQuote);
    }

    // Recalculate when inputs change
    if (courseSelect) {
        courseSelect.addEventListener('change', calculateTotal);
    }
    
    if (fundingOption) {
        fundingOption.addEventListener('change', calculateTotal);
    }

    // Initialize calculator
    resetCalculator();
}

// Notification System Functions
function showNotification(title, message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notification-icon');
    const notificationTitle = document.getElementById('notification-title');
    const notificationMessage = document.getElementById('notification-message');
    
    if (!notification || !notificationIcon || !notificationTitle || !notificationMessage) return;
    
    // Set notification content
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    // Set notification type and icon
    notification.className = 'notification';
    notification.classList.add(type);
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notificationIcon.textContent = icons[type] || icons.info;
    
    // Show notification
    notification.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
    }
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

// Export functions for global access
window.showNotification = showNotification;
window.hideNotification = hideNotification;