# Empowering The Nation - Skills Training Academy Website
Group 1

ST10478785, Vishay Gosai

ST10472309, Joshua Zulu

ST10476635, Kemotheo Tlhale 

[Empowering The Natio (Logo)](_images/logo/Logo.jpeg)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Website Structure](#website-structure)
3. [Features](#features)
4. [Technical Specifications](#technical-specifications)
5. [File Structure](#file-structure)
6. [Design System](#design-system)
7. [JavaScript Functionality](#javascript-functionality)
8. [Accessibility Features](#accessibility-features)
9. [Responsive Design](#responsive-design)
10. [Browser Compatibility](#browser-compatibility)
11. [Performance Optimization](#performance-optimization)
12. [SEO Implementation](#seo-implementation)
13. [Development Guidelines](#development-guidelines)
14. [Deployment Instructions](#deployment-instructions)
15. [Maintenance](#maintenance)

## Project Overview

Empowering The Nation is a comprehensive skills training academy website designed to provide accessible vocational education to underserved communities in South Africa. The platform offers practical skills training courses with a focus on real-world application and employment opportunities.

**Mission**: To unlock opportunities for domestic workers, gardeners, and underserved communities through practical skills training that directly translates to better employment prospects and entrepreneurial opportunities.

**Target Audience**:
- Individuals seeking vocational skills training
- Domestic workers and gardeners looking to upskill
- Employers seeking trained staff
- Community organizations and partners

## Website Structure

The website consists of 7 main pages with consistent navigation and branding:

### Core Pages:
- **Home** (`index.html`) - Landing page with course overview and value proposition
- **Courses** (`courses.html`) - Detailed course catalog with filtering capabilities
- **Pricing** (`pricing.html`) - Transparent pricing with calculator functionality
- **About** (`about.html`) - Company story, mission, team, and impact metrics
- **Blog** (`blog.html`) - Educational content and success stories
- **Contact** (`contact.html`) - Contact information and inquiry forms
- **Enroll** (`enroll.html`) - Multi-step application process

## Features

### Core Functionality
- **Course Catalog**: Filterable grid of available courses with detailed information
- **Pricing Calculator**: Interactive tool for calculating course fees with various payment options
- **Multi-step Enrollment**: Streamlined 4-step application process
- **Blog System**: Categorized articles with search and filtering
- **Contact Forms**: Multiple contact methods with form validation
- **Responsive Navigation**: Mobile-first navigation with hamburger menu

### User Experience Features
- **Dark or Light Theme Toggle**: User preference-based theme switching
- **Loading Animations**: Smooth transitions and hover effects
- **Form Validation**: Real-time validation with error messaging
- **Accessibility Support**: Full keyboard navigation and screen reader support
- **Progress Indicators**: Visual progress tracking for multi-step forms

## Technical Specifications

### Frontend Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties (CSS variables), Flexbox, Grid, and modern layout techniques
- **JavaScript**: Vanilla JS for interactivity and form handling
- **Icons**: Emoji-based icon system for universal compatibility
- **Fonts**: System font stack for optimal performance

## File Structure

```
project-root/
│
├── index.html              # Homepage
├── courses.html            # Courses catalog
├── pricing.html            # Pricing and calculator
├── about.html              # About us page
├── blog.html               # Blog articles
├── contact.html            # Contact information
├── enroll.html             # Enrollment form
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
└── _images/                # Image assets
    ├── logo/
    │   └── Logo.jpeg       # Company logo
    └── screens/
        ├── First aid.jpg
        ├── Sewing.jpg
        ├── Garden maintenance.jpg
        ├── Life skill.jpg
        ├── Child minding.jpg
        ├── Cooking.jpg
        └── Home1.jpg
```

## Design System

### Color Palette
```css
/* Primary Colors */
--primary-color: #2c5aa0;      /* Main brand blue */
--primary-dark: #1e3d72;       /* Dark blue */
--primary-light: #4a7fd4;      /* Light blue */

/* Secondary Colors */
--secondary-color: #f8b739;    /* Accent yellow */
--secondary-dark: #d89a20;     /* Dark yellow */
--secondary-light: #f9d086;    /* Light yellow */

/* Neutral Colors */
--white: #ffffff;
--gray-100: #f1f3f4;
--gray-900: #202124;
--black: #000000;
```

### Typography Scale
- **Heading 1**: 3rem (48px)
- **Heading 2**: 1.875rem (30px)
- **Heading 3**: 1.5rem (24px)
- **Body Large**: 1.125rem (18px)
- **Body Regular**: 1rem (16px)
- **Body Small**: 0.875rem (14px)

## JavaScript Functionality

### Core Modules

#### 1. Theme Management

Dark/Light theme toggle with localStorage persistence


#### 2. Mobile Navigation

Mobile menu functionality with smooth animations


#### 3. Form Handling
- Multi-step form navigation with validation
- Real-time form validation with error messages
- Progress bar updates
- Form data persistence between steps

#### 4. Course Filtering & Search

 Course and blog filtering with search functionality


#### 5. Pricing Calculator
 Interactive pricing calculator with dynamic updates


#### 6. Testimonial Slider
 Smooth testimonial carousel with navigation controls


### Event Handlers
- Click events for navigation and UI interactions
- Input events for form validation
- Scroll events for animations
- Resize events for responsive behavior

### Utility Functions
- DOM element selection helpers
- Local storage management
- Form validation helpers
- Notification system

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Skip Links**: Direct access to main content
- **ARIA Labels**: Proper semantic markup
- **Keyboard Navigation**: Full tab navigation support
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Indicators**: Clear focus states for interactive elements
- **Screen Reader Support**: Proper heading structure and alt text

### JavaScript Accessibility
- Focus management in modals and forms
- ARIA live regions for dynamic content
- Keyboard event handling
- Screen reader announcements

## Responsive Design

### Breakpoints
- **Mobile**: 0px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Flexible grid systems using CSS Grid and Flexbox
- Responsive typography scaling

## Browser Compatibility

| Browser |
|---------|
| Chrome  |
| Firefox |
| Safari  |
| Edge    |
| iOS     |
| Android |

## Performance Optimization

### Loading Optimization
- **CSS**: Single optimized stylesheet
- **JavaScript**: Deferred loading and efficient event handling
- **Images**: Appropriate sizing and modern formats
- **Fonts**: System font stack for zero loading time

### JavaScript Optimization
- Efficient event delegation
- Debounced search functionality
- Lazy loading for non-critical features
- Minimal DOM manipulation

## SEO Implementation

### On-Page SEO
- **Meta Tags**: Unique title and description for each page
- **Structured Data**: Semantic HTML markup
- **Heading Hierarchy**: Proper H1-H6 structure
- **Alt Text**: Descriptive alt attributes for images

## Development Guidelines

### Code Standards
- **HTML**: Semantic markup with proper indentation
- **CSS**: BEM-like naming convention with CSS custom properties
- **JavaScript**: ES6+ features with proper error handling
- **Comments**: Comprehensive documentation

### JavaScript Best Practices
- Use strict mode
- Proper error handling with try-catch
- Event delegation for performance
- Modular function organization
- Descriptive variable and function names

## Deployment Instructions

### Pre-deployment Checklist
- [ ] Test all forms and interactive elements
- [ ] Validate HTML and CSS
- [ ] Test responsive design on multiple devices
- [ ] Verify accessibility features
- [ ] Check cross-browser compatibility
- [ ] Optimize image file sizes
- [ ] Test loading performance

### Deployment Steps
1. **Compress Images**: Optimize all images for web delivery
2. **Upload Files**: Transfer all files to web server
3. **Configure Server**: Ensure proper MIME types and caching
4. **Test Live Site**: Verify all functionality on live environment

## Maintenance

### Regular Updates
- **Content Updates**: Keep course information and pricing current
- **Blog Posts**: Regular publication of new articles
- **Security Updates**: Monitor for vulnerabilities
- **Browser Updates**: Test with new browser versions

### JavaScript Maintenance
- Regular testing of interactive features
- Performance monitoring
- Browser compatibility checks
- Code optimization and refactoring

## Support

For technical support or questions about the website functionality, please contact:
- **Email**: info@empoweringthenation.co.za
- **Phone**: 011 123 4567
- **WhatsApp**: 082 123 4567

---

**Empowering The Nation** - Transforming lives through practical skills development and accredited training programs.