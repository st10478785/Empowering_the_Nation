// ===== Global Variables =====
let currentTheme = localStorage.getItem("theme") || "light";
let currentTestimonial = 0;
let testimonialInterval;

// ===== DOM Content Loaded =====
document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
  initializeMobileMenu();
  initializeTestimonials();
  initializeCourseFilters();
  initializeCourseSearch();
  initializeCourseDetails();
  initializeEnrollmentForm();
  initializePricingCalculator();
  initializeModals();
  initializeNotifications();

  // Add animation classes after page load
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// ===== Theme Management =====
function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle");

  // Set initial theme
  setTheme(currentTheme);

  // Add event listener for theme toggle
  if (themeToggle) {
    themeToggle.checked = currentTheme === "dark";
    themeToggle.addEventListener("change", function () {
      currentTheme = this.checked ? "dark" : "light";
      setTheme(currentTheme);
      showNotification(
        "Theme changed",
        `Switched to ${currentTheme} mode`,
        "success"
      );
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update theme toggle if exists
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.checked = theme === "dark";
  }
}

// ===== Mobile Menu =====
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const closeMobileMenu = document.querySelector(".close-mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.add("active");
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    closeMobileMenu.addEventListener("click", closeMobileMenuHandler);
    mobileOverlay.addEventListener("click", closeMobileMenuHandler);

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenuHandler);
    });
  }
}

function closeMobileMenuHandler() {
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileOverlay = document.getElementById("mobile-overlay");

  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ===== Testimonials Slider =====
function initializeTestimonials() {
  const testimonialTrack = document.getElementById("testimonial-track");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");

  if (!testimonialTrack || testimonialSlides.length === 0) return;

  // Set up event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", showPrevTestimonial);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", showNextTestimonial);
  }

  // Auto-advance testimonials
  startTestimonialAutoAdvance();

  // Pause auto-advance on hover
  testimonialTrack.addEventListener("mouseenter", pauseTestimonialAutoAdvance);
  testimonialTrack.addEventListener("mouseleave", startTestimonialAutoAdvance);
}

function showPrevTestimonial() {
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  currentTestimonial =
    (currentTestimonial - 1 + testimonialSlides.length) %
    testimonialSlides.length;
  updateTestimonialPosition();
}

function showNextTestimonial() {
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  updateTestimonialPosition();
}

function updateTestimonialPosition() {
  const testimonialTrack = document.getElementById("testimonial-track");
  if (testimonialTrack) {
    testimonialTrack.style.transform = `translateX(-${
      currentTestimonial * 100
    }%)`;
  }
}

function startTestimonialAutoAdvance() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(showNextTestimonial, 5000);
}

function pauseTestimonialAutoAdvance() {
  clearInterval(testimonialInterval);
}

// ===== Course Filters =====
function initializeCourseFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  if (filterButtons.length === 0 || courseCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      filterCourses(filter);
    });
  });
}

function filterCourses(filter) {
  const courseCards = document.querySelectorAll(".course-card");
  const noResults = document.getElementById("no-results");
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const category = card.getAttribute("data-category");
    const isVisible = filter === "all" || category === filter;

    card.style.display = isVisible ? "block" : "none";

    if (isVisible) {
      visibleCount++;
    }
  });

  // Show/hide no results message
  if (noResults) {
    noResults.classList.toggle("hidden", visibleCount > 0);
  }
}

// ===== Course Search =====
function initializeCourseSearch() {
  const searchInput = document.getElementById("course-search");
  const courseCards = document.querySelectorAll(".course-card");

  if (!searchInput || courseCards.length === 0) return;

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim();
    const noResults = document.getElementById("no-results");
    let visibleCount = 0;

    courseCards.forEach((card) => {
      const title = card
        .querySelector(".course-title")
        .textContent.toLowerCase();
      const description = card
        .querySelector(".course-description")
        .textContent.toLowerCase();
      const isVisible =
        title.includes(searchTerm) || description.includes(searchTerm);

      card.style.display = isVisible ? "block" : "none";

      if (isVisible) {
        visibleCount++;
      }
    });

    // Show/hide no results message
    if (noResults) {
      noResults.classList.toggle("hidden", visibleCount > 0);
    }
  });
}

// ===== Course Details Modal =====
function initializeCourseDetails() {
  const detailButtons = document.querySelectorAll(".course-detail-btn");
  const modal = document.getElementById("course-modal");
  const modalClose = document.getElementById("modal-close");

  if (detailButtons.length === 0 || !modal) return;

  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseId = this.getAttribute("data-course");
      showCourseDetails(courseId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

function showCourseDetails(courseId) {
  const modal = document.getElementById("course-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");

  if (!modal || !modalTitle || !modalContent) return;

  // Course data - in a real app, this would come from an API
  const courseData = getCourseData(courseId);

  if (!courseData) {
    showNotification("Error", "Course details not found", "error");
    return;
  }

  modalTitle.textContent = courseData.title;
  modalContent.innerHTML = generateCourseModalContent(courseData);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function getCourseData(courseId) {
  const courses = {
    "first-aid": {
      title: "First Aid Level 1",
      description:
        "Essential first aid skills for workplace and home safety. Learn life-saving techniques and emergency response procedures.",
      duration: "6 weeks",
      price: "R1,500",
      outcomes: [
        "CPR and emergency response procedures",
        "Wound care and bandaging techniques",
        "Fracture and sprain management",
        "Burn treatment and prevention",
        "Emergency scene management",
      ],
      requirements: [
        "Minimum age: 16 years",
        "Basic literacy and numeracy",
        "No prior medical knowledge required",
      ],
      certification: "SAQA Accredited Certificate upon successful completion",
    },
    sewing: {
      title: "Sewing Essentials",
      description:
        "Master basic to intermediate sewing techniques. Perfect for starting a small business or enhancing your skills.",
      duration: "6 weeks",
      price: "R1,500",
      outcomes: [
        "Machine operation and maintenance",
        "Pattern reading and cutting",
        "Garment construction techniques",
        "Alterations and repairs",
        "Basic embroidery and finishing",
      ],
      requirements: [
        "No prior experience required",
        "Basic hand-eye coordination",
        "Own sewing machine recommended but not required",
      ],
      certification: "Certificate of Completion",
    },
    landscaping: {
      title: "Landscaping",
      description:
        "Complete landscaping and garden design training. Learn to create and maintain beautiful outdoor spaces.",
      duration: "6 months",
      price: "R4,500",
      outcomes: [
        "Plant knowledge and selection",
        "Landscape design principles",
        "Irrigation system installation",
        "Garden maintenance techniques",
        "Business management for landscaping",
      ],
      requirements: [
        "Grade 10 certificate or equivalent",
        "Physical fitness for outdoor work",
        "Interest in plants and gardening",
      ],
      certification: "NQF Level 3 Certificate in Landscaping",
    },
    "life-skills": {
      title: "Life Skills",
      description:
        "Develop essential personal and professional skills for success in work and life.",
      duration: "6 weeks",
      price: "R1,500",
      outcomes: [
        "Effective communication techniques",
        "Financial literacy and budgeting",
        "Problem-solving and decision making",
        "Time management and organization",
        "Career planning and job search skills",
      ],
      requirements: [
        "No formal education required",
        "Willingness to participate in group activities",
        "Openness to personal development",
      ],
      certification: "Certificate of Completion",
    },
    "child-minding": {
      title: "Child Minding",
      description:
        "Professional childcare training for aspiring nannies, au pairs, and daycare providers.",
      duration: "6 weeks",
      price: "R750",
      outcomes: [
        "Child development stages",
        "Safety protocols and emergency procedures",
        "Nutrition planning for children",
        "Age-appropriate activity planning",
        "Professional ethics and communication",
      ],
      requirements: [
        "Minimum age: 18 years",
        "Clean criminal record",
        "Patience and love for children",
      ],
      certification: "Child Minding Certificate",
    },
    cooking: {
      title: "Cooking",
      description:
        "Learn fundamental cooking techniques and meal preparation for home or small catering business.",
      duration: "6 weeks",
      price: "R750",
      outcomes: [
        "Basic cooking methods and techniques",
        "Food safety and hygiene practices",
        "Meal planning and nutrition basics",
        "Knife skills and food preparation",
        "Recipe adaptation and creation",
      ],
      requirements: [
        "No prior cooking experience required",
        "Access to basic kitchen equipment",
        "Willingness to taste and experiment",
      ],
      certification: "Basic Cooking Certificate",
    },
    "garden-maintenance": {
      title: "Garden Maintenance",
      description:
        "Essential gardening skills for residential and commercial property maintenance.",
      duration: "6 weeks",
      price: "R750",
      outcomes: [
        "Lawn care and maintenance",
        "Plant care and pruning techniques",
        "Weed and pest control methods",
        "Basic landscaping principles",
        "Tool maintenance and safety",
      ],
      requirements: [
        "Physical fitness for outdoor work",
        "No prior gardening experience required",
        "Interest in plants and outdoor work",
      ],
      certification: "Garden Maintenance Certificate",
    },
  };

  return courses[courseId] || null;
}

function generateCourseModalContent(courseData) {
  return `
        <div class="course-modal-content">
            <div class="course-modal-section">
                <h3>Course Description</h3>
                <p>${courseData.description}</p>
            </div>
            
            <div class="course-modal-section">
                <h3>Course Details</h3>
                <div class="course-details-grid">
                    <div class="detail-item">
                        <span class="detail-label">Duration:</span>
                        <span class="detail-value">${courseData.duration}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Price:</span>
                        <span class="detail-value">${courseData.price}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Certification:</span>
                        <span class="detail-value">${
                          courseData.certification
                        }</span>
                    </div>
                </div>
            </div>
            
            <div class="course-modal-section">
                <h3>Learning Outcomes</h3>
                <ul class="outcomes-list">
                    ${courseData.outcomes
                      .map((outcome) => `<li>${outcome}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="course-modal-section">
                <h3>Requirements</h3>
                <ul class="requirements-list">
                    ${courseData.requirements
                      .map((req) => `<li>${req}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>
    `;
}

function closeModal() {
  const modal = document.getElementById("course-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ===== Enrollment Form =====
function initializeEnrollmentForm() {
  const enrollmentForm = document.getElementById("enrollment-form");
  if (!enrollmentForm) return;

  // Step navigation
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");

  nextButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const nextStep = this.getAttribute("data-next");
      if (validateStep(parseInt(this.closest(".form-step").id.split("-")[1]))) {
        goToStep(nextStep);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const prevStep = this.getAttribute("data-prev");
      goToStep(prevStep);
    });
  });

  // Form submission
  enrollmentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateStep(4)) {
      submitEnrollmentForm();
    }
  });

  // Real-time validation
  const formInputs = enrollmentForm.querySelectorAll("input, select, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    // Real-time validation for required fields
    if (input.hasAttribute("required")) {
      input.addEventListener("input", function () {
        validateField(this);
      });
    }
  });

  // Update review section in real-time
  const reviewFields = enrollmentForm.querySelectorAll("input, select");
  reviewFields.forEach((field) => {
    field.addEventListener("change", updateReviewSection);
    field.addEventListener("input", updateReviewSection);
  });
}

function goToStep(stepNumber) {
  // Hide all steps
  const steps = document.querySelectorAll(".form-step");
  steps.forEach((step) => {
    step.classList.remove("active");
  });

  // Show current step
  const currentStep = document.getElementById(`step-${stepNumber}`);
  if (currentStep) {
    currentStep.classList.add("active");
  }

  // Update progress bar
  updateProgressBar(stepNumber);

  // Scroll to top of form
  const formContainer = document.querySelector(".enrollment-form-container");
  if (formContainer) {
    formContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateProgressBar(stepNumber) {
  const progressFill = document.querySelector(".progress-fill");
  const progressIndicators = document.querySelectorAll(".progress-indicator");

  if (progressFill) {
    const progressPercentage = (stepNumber / 4) * 100;
    progressFill.style.width = `${progressPercentage}%`;
  }

  // Update active indicators
  progressIndicators.forEach((indicator, index) => {
    if (index < stepNumber) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

function validateStep(stepNumber) {
  const currentStep = document.getElementById(`step-${stepNumber}`);
  let isValid = true;

  // Validate required fields in current step
  const requiredFields = currentStep.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  // Special validation for radio groups
  if (stepNumber === 2) {
    const scheduleSelected = currentStep.querySelector(
      'input[name="schedule"]:checked'
    );
    if (!scheduleSelected) {
      showFieldError(currentStep.querySelector(".schedule-error"));
      isValid = false;
    } else {
      hideFieldError(currentStep.querySelector(".schedule-error"));
    }
  }

  if (stepNumber === 3) {
    const fundingSelected = currentStep.querySelector(
      'input[name="funding"]:checked'
    );
    if (!fundingSelected) {
      showFieldError(currentStep.querySelector(".funding-error"));
      isValid = false;
    } else {
      hideFieldError(currentStep.querySelector(".funding-error"));
    }
  }

  if (!isValid) {
    showNotification(
      "Please check your form",
      "Some required fields are missing or invalid",
      "error"
    );
  }

  return isValid;
}

function validateField(field) {
  const formGroup = field.closest(".form-group");
  let isValid = true;

  // Clear previous error state
  hideFieldError(formGroup);

  // Check required fields
  if (field.hasAttribute("required") && !field.value.trim()) {
    showFieldError(formGroup, "This field is required");
    isValid = false;
  }

  // Email validation
  if (field.type === "email" && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      showFieldError(formGroup, "Please enter a valid email address");
      isValid = false;
    }
  }

  // Phone validation (basic)
  if (field.type === "tel" && field.value.trim()) {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    if (!phoneRegex.test(field.value)) {
      showFieldError(formGroup, "Please enter a valid phone number");
      isValid = false;
    }
  }

  // ID number validation (South African)
  if (field.id === "id-number" && field.value.trim()) {
    const idRegex = /^[0-9]{13}$/;
    if (!idRegex.test(field.value)) {
      showFieldError(formGroup, "Please enter a valid 13-digit ID number");
      isValid = false;
    }
  }

  return isValid;
}

function showFieldError(formGroup, message = "") {
  formGroup.classList.add("error");
  const errorMessage = formGroup.querySelector(".error-message");
  if (errorMessage && message) {
    errorMessage.textContent = message;
  }
}

function hideFieldError(formGroup) {
  formGroup.classList.remove("error");
}

function updateReviewSection() {
  // Personal Information
  const firstName = document.getElementById("first-name").value || "-";
  const lastName = document.getElementById("last-name").value || "-";
  const idNumber = document.getElementById("id-number").value || "-";
  const phone = document.getElementById("phone").value || "-";
  const email = document.getElementById("email").value || "-";

  document.getElementById(
    "review-name"
  ).textContent = `${firstName} ${lastName}`;
  document.getElementById("review-id").textContent = idNumber;
  document.getElementById("review-phone").textContent = phone;
  document.getElementById("review-email").textContent = email;

  // Course Selection
  const courseSelect = document.getElementById("course");
  const selectedCourse = courseSelect.options[courseSelect.selectedIndex];
  const courseText = selectedCourse.text || "-";
  const scheduleOption = document.querySelector(
    'input[name="schedule"]:checked'
  );
  const scheduleText = scheduleOption
    ? scheduleOption.parentElement.querySelector(".option-title").textContent
    : "-";

  document.getElementById("review-course").textContent = courseText;
  document.getElementById("review-schedule").textContent = scheduleText;

  // Funding Information
  const fundingOption = document.querySelector('input[name="funding"]:checked');
  const fundingText = fundingOption
    ? fundingOption.parentElement.querySelector(".option-title").textContent
    : "-";

  document.getElementById("review-funding").textContent = fundingText;
}

function submitEnrollmentForm() {
  const formData = new FormData(document.getElementById("enrollment-form"));
  const enrollmentForm = document.getElementById("enrollment-form");
  const successMessage = document.querySelector(".success-message");

  // In a real application, you would send the form data to a server here
  // For demonstration, we'll simulate a successful submission

  // Show loading state
  const submitButton = enrollmentForm.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<span class="btn-icon">⏳</span> Submitting...';
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Hide form and show success message
    enrollmentForm.style.display = "none";
    successMessage.classList.add("active");

    // Reset form (for demonstration)
    enrollmentForm.reset();

    showNotification(
      "Application Submitted",
      "Thank you for your application! We will contact you within 2 business days.",
      "success"
    );
  }, 2000);
}

// ===== Pricing Calculator =====
function initializePricingCalculator() {
  const calculateBtn = document.getElementById("calculate-btn");
  const resetBtn = document.getElementById("reset-calculator");
  const saveQuoteBtn = document.getElementById("save-quote");

  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculatePricing);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetCalculator);
  }

  if (saveQuoteBtn) {
    saveQuoteBtn.addEventListener("click", saveQuote);
  }

  // Recalculate when inputs change
  const calculatorInputs = document.querySelectorAll(
    "#course-select, #funding-option, #additional-students"
  );
  calculatorInputs.forEach((input) => {
    input.addEventListener("change", calculatePricing);
  });
}

function calculatePricing() {
  const courseSelect = document.getElementById("course-select");
  const fundingOption = document.getElementById("funding-option");
  const additionalStudents =
    parseInt(document.getElementById("additional-students").value) || 0;

  if (!courseSelect.value) {
    showNotification(
      "Please select a course",
      "Choose a course to calculate pricing",
      "warning"
    );
    return;
  }

  const selectedCourse = courseSelect.options[courseSelect.selectedIndex];
  const basePrice = parseFloat(selectedCourse.getAttribute("data-price"));

  if (isNaN(basePrice)) {
    showNotification("Error", "Invalid course price", "error");
    return;
  }

  // Calculate discounts and final price
  const fundingDiscount = calculateFundingDiscount(
    fundingOption.value,
    basePrice
  );
  const groupDiscount = calculateGroupDiscount(additionalStudents, basePrice);
  const totalDiscount = fundingDiscount + groupDiscount;
  const finalPrice = (basePrice - totalDiscount) * (1 + additionalStudents);

  // Update display
  updatePricingDisplay(
    basePrice,
    fundingDiscount,
    groupDiscount,
    finalPrice,
    fundingOption.value
  );
}

function calculateFundingDiscount(fundingType, basePrice) {
  switch (fundingType) {
    case "full-payment":
      return basePrice * 0.05; // 5% discount
    case "payment-plan":
      return 0; // No discount for payment plans
    case "employer":
      return basePrice * 0.1; // 10% discount for employer sponsorship
    case "bursary":
      return basePrice * 0.15; // 15% discount for bursary
    default:
      return 0;
  }
}

function calculateGroupDiscount(additionalStudents, basePrice) {
  if (additionalStudents >= 10) {
    return basePrice * 0.15; // 15% discount
  } else if (additionalStudents >= 5) {
    return basePrice * 0.1; // 10% discount
  } else if (additionalStudents >= 2) {
    return basePrice * 0.05; // 5% discount
  } else {
    return 0;
  }
}

function updatePricingDisplay(
  basePrice,
  fundingDiscount,
  groupDiscount,
  finalPrice,
  fundingType
) {
  // Update basic pricing elements
  document.getElementById("course-fee").textContent = `R${basePrice.toFixed(
    2
  )}`;
  document.getElementById(
    "discount-amount"
  ).textContent = `-R${fundingDiscount.toFixed(2)}`;
  document.getElementById(
    "group-discount"
  ).textContent = `-R${groupDiscount.toFixed(2)}`;
  document.getElementById("total-amount").textContent = `R${finalPrice.toFixed(
    2
  )}`;

  // Update payment breakdown
  const paymentBreakdown = document.getElementById("payment-breakdown");
  paymentBreakdown.innerHTML = generatePaymentBreakdown(
    finalPrice,
    fundingType
  );
}

function generatePaymentBreakdown(finalPrice, fundingType) {
  if (fundingType === "payment-plan") {
    const installment = finalPrice / 3;
    const adminFee = 100;
    const totalWithFee = finalPrice + adminFee;

    return `
            <div class="payment-plan">
                <div class="payment-installment">
                    <span class="installment-label">Deposit (Today):</span>
                    <span class="installment-amount">R${installment.toFixed(
                      2
                    )}</span>
                </div>
                <div class="payment-installment">
                    <span class="installment-label">2nd Installment (30 days):</span>
                    <span class="installment-amount">R${installment.toFixed(
                      2
                    )}</span>
                </div>
                <div class="payment-installment">
                    <span class="installment-label">Final Installment (60 days):</span>
                    <span class="installment-amount">R${installment.toFixed(
                      2
                    )}</span>
                </div>
                <div class="payment-installment">
                    <span class="installment-label">Admin Fee:</span>
                    <span class="installment-amount">R${adminFee.toFixed(
                      2
                    )}</span>
                </div>
                <div class="result-divider"></div>
                <div class="payment-installment total">
                    <span class="installment-label">Total with Payment Plan:</span>
                    <span class="installment-amount">R${totalWithFee.toFixed(
                      2
                    )}</span>
                </div>
            </div>
        `;
  } else {
    return `
            <div class="payment-plan">
                <div class="payment-installment">
                    <span class="installment-label">Payment Method:</span>
                    <span class="installment-amount">${getPaymentMethod(
                      fundingType
                    )}</span>
                </div>
            </div>
        `;
  }
}

function getPaymentMethod(fundingType) {
  switch (fundingType) {
    case "full-payment":
      return "Once-off Payment";
    case "employer":
      return "Employer Invoice";
    case "bursary":
      return "Bursary Application";
    default:
      return "Standard Payment";
  }
}

function resetCalculator() {
  document.getElementById("course-select").value = "";
  document.getElementById("funding-option").value = "full-payment";
  document.getElementById("additional-students").value = "0";

  // Reset display
  document.getElementById("course-fee").textContent = "R0.00";
  document.getElementById("discount-amount").textContent = "R0.00";
  document.getElementById("group-discount").textContent = "R0.00";
  document.getElementById("total-amount").textContent = "R0.00";
  document.getElementById("payment-breakdown").innerHTML = "";
}

function saveQuote() {
  const courseSelect = document.getElementById("course-select");
  const totalAmount = document.getElementById("total-amount").textContent;

  if (!courseSelect.value) {
    showNotification(
      "Please calculate a quote first",
      "Select a course and calculate pricing before saving",
      "warning"
    );
    return;
  }

  // In a real application, this would save to local storage or send to a server
  const quoteData = {
    course: courseSelect.options[courseSelect.selectedIndex].text,
    total: totalAmount,
    timestamp: new Date().toISOString(),
  };

  // Save to localStorage
  const savedQuotes = JSON.parse(localStorage.getItem("savedQuotes") || "[]");
  savedQuotes.push(quoteData);
  localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));

  showNotification(
    "Quote Saved",
    "Your pricing quote has been saved for future reference",
    "success"
  );
}

// ===== Modal Management =====
function initializeModals() {
  // Generic modal handling can be added here if needed
}

// ===== Notification System =====
function initializeNotifications() {
  // Notification system is ready to use
}

function showNotification(title, message, type = "info") {
  const notification = document.getElementById("notification");
  const notificationIcon = document.getElementById("notification-icon");
  const notificationTitle = document.getElementById("notification-title");
  const notificationMessage = document.getElementById("notification-message");

  if (!notification) return;

  // Set notification content
  notificationTitle.textContent = title;
  notificationMessage.textContent = message;

  // Set icon based on type
  let icon = "ℹ️";
  switch (type) {
    case "success":
      icon = "✅";
      break;
    case "error":
      icon = "❌";
      break;
    case "warning":
      icon = "⚠️";
      break;
  }
  notificationIcon.textContent = icon;

  // Set type class
  notification.className = `notification ${type} active`;

  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideNotification();
  }, 5000);
}

function hideNotification() {
  const notification = document.getElementById("notification");
  if (notification) {
    notification.classList.remove("active");
  }
}

// ===== Utility Functions =====
function formatCurrency(amount) {
  return "R" + parseFloat(amount).toFixed(2);
}

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

        // Course prices mapping
        const coursePrices = {
            'first-aid': 1500,
            'sewing': 1500,
            'landscaping': 4500,
            'life-skills': 1500,
            'child-minding': 750,
            'cooking': 750,
            'garden-maintenance': 750
        };

        // Course names mapping
        const courseNames = {
            'first-aid': 'First Aid Level 1',
            'sewing': 'Sewing Essentials',
            'landscaping': 'Landscaping',
            'life-skills': 'Life Skills',
            'child-minding': 'Child Minding',
            'cooking': 'Cooking',
            'garden-maintenance': 'Garden Maintenance'
        };

        // Discount tiers
        const discountTiers = {
            1: 0,    // 1 course: 0% discount
            2: 5,    // 2 courses: 5% discount
            3: 10,   // 3 courses: 10% discount
            4: 15    // 4+ courses: 15% discount
        };

        // Calculate discount based on number of courses
        function calculateDiscount(numCourses) {
            if (numCourses >= 4) return discountTiers[4];
            return discountTiers[numCourses] || 0;
        }

        // Update selected courses summary
        function updateSelectedCoursesSummary() {
            const courseSelect = document.getElementById('course');
            const selectedOptions = Array.from(courseSelect.selectedOptions);
            const selectedCoursesList = document.getElementById('selected-courses-list');
            const discountSummary = document.getElementById('discount-summary');
            
            // Clear previous summary
            selectedCoursesList.innerHTML = '';
            
            if (selectedOptions.length === 0) {
                discountSummary.innerHTML = '<p>No courses selected</p>';
                return;
            }
            
            // Calculate totals
            let subtotal = 0;
            const selectedCourses = [];
            
            selectedOptions.forEach(option => {
                const courseId = option.value;
                const courseName = courseNames[courseId];
                const coursePrice = coursePrices[courseId];
                
                subtotal += coursePrice;
                selectedCourses.push({ id: courseId, name: courseName, price: coursePrice });
                
                // Add to selected courses list
                const courseItem = document.createElement('div');
                courseItem.className = 'selected-course-item';
                courseItem.innerHTML = `
                    <span class="course-name">${courseName}</span>
                    <span class="course-price">R${coursePrice.toLocaleString()}</span>
                `;
                selectedCoursesList.appendChild(courseItem);
            });
            
            // Calculate discount
            const discountPercent = calculateDiscount(selectedOptions.length);
            const discountAmount = (subtotal * discountPercent) / 100;
            const finalTotal = subtotal - discountAmount;
            
            // Update discount summary
            discountSummary.innerHTML = `
                <div class="discount-line">
                    <span>Subtotal (${selectedOptions.length} courses):</span>
                    <span>R${subtotal.toLocaleString()}</span>
                </div>
                <div class="discount-line">
                    <span>Volume Discount (${discountPercent}%):</span>
                    <span class="discount-amount">-R${discountAmount.toLocaleString()}</span>
                </div>
                <div class="discount-line total">
                    <span>Final Total:</span>
                    <span>R${finalTotal.toLocaleString()}</span>
                </div>
            `;
            
            // Store calculated values for review step
            window.enrollmentData = window.enrollmentData || {};
            window.enrollmentData.selectedCourses = selectedCourses;
            window.enrollmentData.subtotal = subtotal;
            window.enrollmentData.discountPercent = discountPercent;
            window.enrollmentData.discountAmount = discountAmount;
            window.enrollmentData.finalTotal = finalTotal;
        }

        // Update review section with course information
        function updateCourseReview() {
            const data = window.enrollmentData;
            
            if (!data || !data.selectedCourses) return;
            
            const courseNames = data.selectedCourses.map(course => course.name).join(', ');
            const courseCount = data.selectedCourses.length;
            const discountPercent = data.discountPercent;
            
            document.getElementById('review-course').textContent = courseNames;
            document.getElementById('review-course-count').textContent = courseCount;
            document.getElementById('review-discount').textContent = `${discountPercent}%`;
            document.getElementById('review-total-before').textContent = `R${data.subtotal.toLocaleString()}`;
            document.getElementById('review-discount-amount').textContent = `-R${data.discountAmount.toLocaleString()}`;
            document.getElementById('review-final-total').textContent = `R${data.finalTotal.toLocaleString()}`;
        }

        // Form navigation and validation
        function showStep(stepNumber) {
            // Hide all steps
            document.querySelectorAll('.form-step').forEach(step => {
                step.classList.remove('active');
            });
            
            // Show current step
            document.getElementById(`step-${stepNumber}`).classList.add('active');
        }

        function updateProgressBar(stepNumber) {
            const progressFill = document.querySelector('.progress-fill');
            const percentage = (stepNumber / 4) * 100;
            progressFill.style.width = `${percentage}%`;
            
            // Update progress indicators
            document.querySelectorAll('.progress-indicator').forEach((indicator, index) => {
                if (index < stepNumber - 1) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        function validateStep2() {
            const courseSelect = document.getElementById('course');
            const selectedCourses = Array.from(courseSelect.selectedOptions);
            const scheduleSelected = document.querySelector('input[name="schedule"]:checked');
            
            let isValid = true;
            
            // Validate course selection
            if (selectedCourses.length === 0) {
                courseSelect.parentElement.classList.add('error');
                isValid = false;
            } else {
                courseSelect.parentElement.classList.remove('error');
            }
            
            // Validate schedule selection
            if (!scheduleSelected) {
                document.querySelector('.schedule-error').style.display = 'block';
                isValid = false;
            } else {
                document.querySelector('.schedule-error').style.display = 'none';
            }
            
            return isValid;
        }

        // Add event listeners when the document loads
        document.addEventListener('DOMContentLoaded', function() {
            const courseSelect = document.getElementById('course');
            
            if (courseSelect) {
                courseSelect.addEventListener('change', updateSelectedCoursesSummary);
            }
            
            // Form navigation
            const nextStepButtons = document.querySelectorAll('.next-step');
            const prevStepButtons = document.querySelectorAll('.prev-step');
            
            nextStepButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const currentStep = this.closest('.form-step').id.split('-')[1];
                    const nextStep = this.getAttribute('data-next');
                    
                    // Validate current step before proceeding
                    let isValid = true;
                    
                    switch (currentStep) {
                        case '2':
                            isValid = validateStep2();
                            break;
                    }
                    
                    if (isValid) {
                        if (nextStep === '4') {
                            updateCourseReview();
                        }
                        showStep(nextStep);
                        updateProgressBar(nextStep);
                    }
                });
            });
            
            prevStepButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const prevStep = this.getAttribute('data-prev');
                    showStep(prevStep);
                    updateProgressBar(prevStep);
                });
            });
            
            // Form submission
            const enrollmentForm = document.getElementById('enrollment-form');
            enrollmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                document.querySelector('.success-message').classList.add('active');
                document.querySelectorAll('.form-step').forEach(step => {
                    step.style.display = 'none';
                });
            });

        const volumeDiscounts = {
  1: 0, // 1 course: 0% discount
  2: 5, // 2 courses: 5% discount
  3: 10, // 3 courses: 10% discount
  4: 15, // 4+ courses: 15% discount
};

// Calculate volume discount
function calculateVolumeDiscount(numCourses) {
  if (numCourses >= 4) return volumeDiscounts[4];
  return volumeDiscounts[numCourses] || 0;
}

// Calculate total
function calculateTotal() {
  const courseSelect = document.getElementById("course-select");
  const selectedOptions = Array.from(courseSelect.selectedOptions);
  const fundingOption = document.getElementById("funding-option").value;

  if (selectedOptions.length === 0) {
    resetCalculator();
    return;
  }

  // Calculate subtotal
  let subtotal = 0;
  selectedOptions.forEach((option) => {
    const price = parseInt(option.getAttribute("data-price"));
    subtotal += price;
  });

  // Calculate volume discount
  const volumeDiscountPercent = calculateVolumeDiscount(selectedOptions.length);
  const volumeDiscountAmount = (subtotal * volumeDiscountPercent) / 100;

  // Calculate payment discount
  let paymentDiscountPercent = 0;
  if (fundingOption === "full-payment") {
    paymentDiscountPercent = 5;
  }
  const paymentDiscountAmount = (subtotal * paymentDiscountPercent) / 100;

  // Calculate final total
  const finalTotal = subtotal - volumeDiscountAmount - paymentDiscountAmount;

  // Update display
  document.getElementById(
    "course-fee"
  ).textContent = `R${subtotal.toLocaleString()}`;
  document.getElementById(
    "volume-discount"
  ).textContent = `-R${volumeDiscountAmount.toLocaleString()} (${volumeDiscountPercent}%)`;
  document.getElementById(
    "payment-discount"
  ).textContent = `-R${paymentDiscountAmount.toLocaleString()} (${paymentDiscountPercent}%)`;
  document.getElementById(
    "total-amount"
  ).textContent = `R${finalTotal.toLocaleString()}`;

  // Update payment breakdown
  updatePaymentBreakdown(finalTotal, fundingOption);
}

function updatePaymentBreakdown(total, fundingOption) {
  const breakdown = document.getElementById("payment-breakdown");

  if (fundingOption === "payment-plan") {
    const installment = (total / 3).toFixed(2);
    breakdown.innerHTML = `
                    <div class="payment-plan">
                        <h4>Payment Plan (3 months)</h4>
                        <div class="payment-installment">
                            <span class="installment-label">Month 1:</span>
                            <span class="installment-amount">R${installment}</span>
                        </div>
                        <div class="payment-installment">
                            <span class="installment-label">Month 2:</span>
                            <span class="installment-amount">R${installment}</span>
                        </div>
                        <div class="payment-installment">
                            <span class="installment-label">Month 3:</span>
                            <span class="installment-amount">R${installment}</span>
                        </div>
                    </div>
                `;
  } else {
    breakdown.innerHTML = "";
  }
}

function resetCalculator() {
  document.getElementById("course-fee").textContent = "R0.00";
  document.getElementById("volume-discount").textContent = "R0.00";
  document.getElementById("payment-discount").textContent = "R0.00";
  document.getElementById("total-amount").textContent = "R0.00";
  document.getElementById("payment-breakdown").innerHTML = "";
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculate-btn")
    .addEventListener("click", calculateTotal);
  document
    .getElementById("reset-calculator")
    .addEventListener("click", resetCalculator);
  document
    .getElementById("funding-option")
    .addEventListener("change", calculateTotal);
  document
    .getElementById("course-select")
    .addEventListener("change", calculateTotal);
});
// Export functions for global access (if needed)
window.hideNotification = hideNotification;});
