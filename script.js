// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen first
    initLoadingScreen();
    
    // Initialize all functionality
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initSkillsAnimation();
    initContactForm();
    initSmoothScrolling();
    initTouchAnimations();
    initParticles();
    initTypingEffect();
    initKineticText();
    initScrollReveal();
});

// Custom Cursor
function initCustomCursor() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(follower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let isMoving = false;
        let moveTimeout;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            
            isMoving = true;
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        });
        
        // Smooth follower animation
        function animateFollower() {
            if (isMoving) {
                followerX += (mouseX - followerX) * 0.15;
                followerY += (mouseY - followerY) * 0.15;
                
                follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            }
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .cert-link, .profile-name-link, .company-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                follower.style.transform = 'scale(1.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
            });
        });
    }
}

// Touch Animations
function initTouchAnimations() {
    const touchElements = document.querySelectorAll('.info-card, .skill-card, .cert-card, .btn, .profile-name-link, .company-link');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        element.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, 100);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function(e) {
            this.style.transform = '';
            this.style.transition = '';
        }, { passive: true });
    });
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 11, 30, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(199, 40, 122, 0.3)';
        } else {
            header.style.background = 'rgba(15, 11, 30, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(199, 40, 122, 0.1)';
        }
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll(`
        .hero-content > *,
        .about-content > *,
        .skill-card,
        .timeline-item,
        .experience-card,
        .cert-card,
        .contact-item,
        .contact-form
    `);
    
    animatedElements.forEach((element, index) => {
        // Add staggered delay for better visual effect
        element.style.transitionDelay = `${index * 0.1}s`;
        
        if (element.closest('.hero')) {
            element.classList.add('slide-in-left');
        } else if (element.closest('.about') && index % 2 === 0) {
            element.classList.add('slide-in-left');
        } else if (element.closest('.about') && index % 2 === 1) {
            element.classList.add('slide-in-right');
        } else {
            element.classList.add('fade-in');
        }
        
        observer.observe(element);
    });
}

// Skills progress bar animation
function initSkillsAnimation() {
    const skillsSection = document.querySelector('#skills');
    let skillsAnimated = false;
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Animate skill progress bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate all fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Create mailto link
        const mailtoLink = `mailto:pkvetrivelvvm@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Try to open email client
        try {
            window.location.href = mailtoLink;
            showFormMessage('Opening your email client... If it doesn\'t open, please copy the details and email manually.', 'success');
            
            // Reset form after successful submission
            setTimeout(() => {
                form.reset();
            }, 1000);
        } catch (error) {
            // Fallback: copy to clipboard
            const emailContent = `To: pkvetrivelvvm@gmail.com\nSubject: ${subject}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            
            navigator.clipboard.writeText(emailContent).then(() => {
                showFormMessage('Email details copied to clipboard! Please paste in your email client.', 'success');
            }).catch(() => {
                showFormMessage('Please email directly to: pkvetrivelvvm@gmail.com', 'error');
            });
        }
    } else {
        showFormMessage('Please fill in all required fields correctly.', 'error');
    }
}

// Validate individual form field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error styling
    field.classList.remove('error');
    removeFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = `${capitalize(fieldName)} is required.`;
    }
    // Email validation
    else if (fieldType === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    // Name validation (only letters and spaces)
    else if (fieldName === 'name' && value !== '') {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(value)) {
            isValid = false;
            errorMessage = 'Name should only contain letters and spaces.';
        }
    }
    // Message minimum length
    else if (fieldName === 'message' && value !== '' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message should be at least 10 characters long.';
    }
    
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Clear field error styling
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    removeFieldError(field);
}

// Show field error message
function showFieldError(field, message) {
    removeFieldError(field); // Remove existing error first
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-1);
        display: block;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Remove field error message
function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Show form success/error message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: var(--space-3);
        border-radius: var(--radius-lg);
        margin-bottom: var(--space-4);
        text-align: center;
        font-weight: 600;
        ${type === 'success' 
            ? 'background: rgba(16, 185, 129, 0.1); color: var(--success); border: 1px solid var(--success);'
            : 'background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid var(--error);'
        }
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Utility function to capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Resume Download Function
function downloadResume() {
    const resumeContent = `
VETRIVEL MURUGAN P
Aspiring Full Stack Developer

CONTACT INFORMATION
Email: pkvetrivelvvm@gmail.com
Phone: +91 7598611585
Location: Tenkasi, Tamil Nadu, India
LinkedIn: https://www.linkedin.com/in/mrvvmoffical2005
GitHub: https://github.com/mr-vvm-2005
Instagram: https://www.instagram.com/mr.vvm_official

PROFESSIONAL SUMMARY
Aspiring Full Stack Developer currently pursuing B.Tech in Information Technology while simultaneously enhancing practical skills through the comprehensive NxtWave CCBP 4.0 Full Stack Program. Gained hands-on experience during internship at IPCS Global, Tirunelveli, working on real-world full stack development projects. Passionate about creating innovative web solutions that solve real-world problems.

EDUCATION
• B.Tech Information Technology (2023 – 2027)
  Dr. Sivanthi Aditanar College of Engineering
  Focus: Software development, database management, and system design

• NxtWave CCBP 4.0 Full Stack Program (2023 – 2026)
  NxtWave Academy
  Comprehensive full stack development program covering modern web technologies

• Higher Secondary Education (Completed 2023)
  Shriram Vidhalaya Hr. Sec. School, Tenkasi
  Strong foundation in mathematics and computer science

TECHNICAL SKILLS
• Programming Languages: HTML5 (90%), CSS3 (85%), JavaScript (80%), Python (85%), SQL (70%)
• Frameworks & Libraries: ReactJS (75%)
• Specialized Skills: AI Website Creation (80%), Portfolio Design (85%), Video Editing (75%), Photography (70%)
• Development: Full Stack Web Development, Responsive Design, Database Management

PROFESSIONAL EXPERIENCE
Full Stack Development Intern
IPCS Global, Tirunelveli
• Gained hands-on experience in full stack web development
• Worked on real-world projects and collaborated with experienced developers
• Contributed to both frontend and backend development tasks
• Enhanced practical skills in modern web technologies

CERTIFICATIONS
• Python (Basic) - HackerRank
• Introduction to Databases - CCBP
• Build a Static Website - CCBP
• Build Your Own Responsive Website - CCBP
• Elements of AI - University of Helsinki (2 ECTS credits)
• Software Engineer Job Simulation - Forage

PERSONAL INFORMATION
Date of Birth: 11.09.2005
Nationality: Indian
Languages: Tamil, English

INTERESTS
• Web Development & Programming
• Artificial Intelligence & Machine Learning
• Photography & Video Editing
• Technology Innovation
• Continuous Learning

---
Generated on ${new Date().toLocaleDateString()}
    `.trim();

    // Create and download the file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Vetrivel_Murugan_P_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Show success message
    showFormMessage('Resume downloaded successfully!', 'success');
}

// Additional interactive features

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.image-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Certificate link click tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.cert-link')) {
        const certName = e.target.closest('.cert-card').querySelector('h3').textContent;
        console.log(`Certificate viewed: ${certName}`);
        
        // Add a visual feedback
        const link = e.target.closest('.cert-link');
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    }
});

// Add error styling to CSS dynamically
const errorStyles = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--error);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = errorStyles;
document.head.appendChild(styleElement);

// Intersection Observer for counting animations (future enhancement)
function initCountingAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Theme toggle functionality (future enhancement)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10); // Faster scroll handling

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

// Console welcome message
console.log(`
🚀 Welcome to Vetrivel Murugan P's Portfolio!
🎯 Aspiring Full Stack Developer
💼 B.Tech IT Student
📧 pkvetrivelvvm@gmail.com
🌐 mr.vvm - Modern Professional Portfolio

This portfolio showcases modern web development techniques:
✅ Responsive Design
✅ Smooth Animations
✅ Form Validation
✅ Accessibility Features
✅ Performance Optimization
✅ Modern Color Scheme
✅ Optimized Loading

Feel free to explore the code!
`);

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.display = 'none';
    }
});

// Add loading states for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        this.style.opacity = '0.8';
        setTimeout(() => {
            this.style.transform = '';
            this.style.opacity = '';
        }, 150);
    }, { passive: true });
});

// Optimize image loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
});