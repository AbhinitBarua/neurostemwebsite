// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Navigation active state
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Feature Card interaction
    const featureCards = document.querySelectorAll('.feature-card');
    const spotlightDetails = document.getElementById('spotlight-details');
    const spotlightImage = document.getElementById('spotlight-image');
    
    // Feature data
    const featureData = {
        trilayer: {
            title: "Tri-Layer Stimulation System",
            description: "Our revolutionary three-level feedback system combines brain (EEG), body (haptic/muscle stimulation), and emotion (facial expression/HRV) to maximize neuroplasticity and recovery.",
            points: [
                "EEG headset continuously monitors brain activity and attention levels",
                "Haptic gloves and socks provide precise muscle stimulation based on neural signals",
                "Facial camera and HRV sensors detect stress and engagement levels to adapt therapy difficulty"
            ],
            uniqueness: "While most devices focus only on EEG or physical movement, NeuroStem's tri-layer approach creates a comprehensive neurological rehabilitation environment."
        },
        mirror: {
            title: "Mirror Mind AI Engine",
            description: "Our AI creates a digital twin of the patient's brain behavior, continuously learning and adapting to optimize therapy sessions.",
            points: [
                "Creates personalized cognitive exercise regimens based on neural patterns",
                "Predicts which exercises will best help rewire neural circuits",
                "Automatically adjusts difficulty, modality, and pacing based on patient response"
            ],
            uniqueness: "The adaptive AI-based twin brain technology represents a breakthrough in personalized neuro-rehabilitation."
        },
        remote: {
            title: "Remote Neuronet: Swarm-Rehab System",
            description: "Enabling multiple patients with similar conditions to engage in multi-user cognitive games together, promoting social neuroplasticity.",
            points: [
                "Patients collaborate to solve puzzles and perform synchronized rehabilitation",
                "Peer influence enhances cognitive activation and motivation",
                "Secure blockchain technology ensures patient data privacy"
            ],
            uniqueness: "Most cognitive tools are designed for individual use. Our Swarm-Rehab system harnesses the power of social connection for enhanced recovery."
        },
        modular: {
            title: "Modular NeuroBox",
            description: "A low-cost, plug-and-play solution designed for use in rural and underserved areas without consistent internet access.",
            points: [
                "EEG headband, brain-exercise tablet, and haptic band in one portable kit",
                "Pre-programmed challenges for different conditions",
                "Solar-powered with hand-crank backup charging system"
            ],
            uniqueness: "Bringing advanced neuroscience technology to underserved communities through frugal innovation."
        },
        emotional: {
            title: "Emotionally Intelligent Rehab Companion",
            description: "An AI-powered virtual character that guides patients through therapy while adapting to their emotional state.",
            points: [
                "Detects patient mood through facial expression and voice analysis",
                "Adjusts communication style, exercises, and difficulty based on emotional state",
                "Provides personalized encouragement and motivation"
            ],
            uniqueness: "Our emotionally intelligent companion creates a supportive environment that addresses the often-overlooked emotional aspects of neurological recovery."
        },
        sleep: {
            title: "SleepSync Neuro Recovery Mode",
            description: "A wearable device that promotes neuroplasticity during sleep, when memory consolidation is most active.",
            points: [
                "Detects sleep phases using advanced EEG monitoring",
                "Delivers precisely timed auditory or haptic cues during optimal brainwave states",
                "Enhances synaptic growth passively during rest"
            ],
            uniqueness: "SleepSync taps into the brain's natural recovery processes during sleep, a largely unexplored frontier in neurological rehabilitation."
        }
    };
    
    // Set default spotlight content
    updateSpotlight('trilayer');
    
    // Add click event to feature cards
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureType = this.getAttribute('data-feature');
            updateSpotlight(featureType);
            
            // Highlight active card
            featureCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    function updateSpotlight(featureType) {
        const feature = featureData[featureType];
        
        let html = `
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
            <ul>
        `;
        
        feature.points.forEach(point => {
            html += `<li>${point}</li>`;
        });
        
        html += `
            </ul>
            <p><strong>What makes it unique:</strong> ${feature.uniqueness}</p>
        `;
        
        spotlightDetails.innerHTML = html;
        spotlightImage.alt = feature.title;
        
        // In a real implementation, you would change the image source to match the feature
        // For this example, we're using placeholder images
    }
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            dots[i].classList.remove('active');
            
            if (i < index) {
                testimonial.style.transform = 'translateX(-100%)';
            } else if (i > index) {
                testimonial.style.transform = 'translateX(100%)';
            }
        });
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Initialize carousel
    showTestimonial(0);
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real implementation, you would send this data to a server
        // For this example, we'll just show a success message
        
        // Reset form
        contactForm.reset();
        
        // Show success message (in a real implementation)
        alert('Thank you for your message! We will get back to you soon.');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animation
    const fadeInElements = document.querySelectorAll('.feature-card, .stat-item, .about-image, .spotlight-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .feature-card, .stat-item, .about-image, .spotlight-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card.active {
        border-left: 3px solid var(--primary-color);
    }
    
    header.scrolled {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        padding: 10px 0;
    }
</style>
`);