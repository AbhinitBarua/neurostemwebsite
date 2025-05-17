document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.nav-links');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Change to X icon
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Change back to bars
            }
        });
    }

    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('main section[id]');
    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Scroll Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: unobserve after first animation
            } else {
                // Optional: remove class if you want animation to repeat on scroll up/down
                // entry.target.classList.remove('is-visible'); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const birdsContainer = document.getElementById('birds-animation-container');
    const numberOfBirds = 10; // Adjust how many birds you want at a time (roughly)
    const minBirdDelay = 500; // Minimum delay between new birds in ms
    const maxBirdDelay = 3000; // Maximum delay

    function createBird() {
        if (!birdsContainer) return;

        const bird = document.createElement('div');
        bird.classList.add('bird');
        bird.innerHTML = ''; // Bird emoji 🐦 (U+1F426). You can use others like 🕊️ (U+1F54A)

        // Randomize properties
        const startY = Math.random() * 70 + 10; // Start Y position (10% to 80% of viewport height)
        const scale = Math.random() * 0.5 + 0.5; // Scale (0.5x to 1.0x)
        const duration = Math.random() * 10 + 15; // Flight duration (15s to 25s)
        const yOffsetVariance = (Math.random() - 0.5) * 50; // Slight vertical drift up/down during flight

        bird.style.top = `${startY}%`;
        bird.style.setProperty('--bird-scale', scale);
        bird.style.setProperty('--translate-y-offset', `${yOffsetVariance}px`);
        bird.style.animationDuration = `${duration}s`;
        
        // Random direction (left-to-right or right-to-left)
        if (Math.random() > 0.5) {
            bird.style.left = '-50px'; // Start off-screen left
        } else {
            bird.style.right = '-50px'; // Start off-screen right
            bird.style.transform = 'scaleX(-1)'; // Flip bird horizontally
             // Adjust animation for right-to-left
            bird.style.animationName = 'flyAcrossReversed'; // We'll need a new keyframe for this
        }


        birdsContainer.appendChild(bird);

        // Remove bird after animation finishes
        bird.addEventListener('animationend', () => {
            bird.remove();
        });
    }

    // Generate birds periodically
    function spawnBirds() {
        if (document.hidden) { // Don't spawn if tab is not visible
            setTimeout(spawnBirds, maxBirdDelay);
            return;
        }
        createBird();
        const nextBirdTime = Math.random() * (maxBirdDelay - minBirdDelay) + minBirdDelay;
        setTimeout(spawnBirds, nextBirdTime);
    }

    if (birdsContainer) { // Only start if the container exists
       spawnBirds(); // Start the bird spawning
    }


    // Placeholder for "Start Diagnosis"
    const startDiagnosisBtn = document.querySelector('a[href="#diagnosis-placeholder"]');
    // ... (rest of your script.js) ...
});
    
    // Placeholder for "Start Diagnosis"
    const startDiagnosisBtn = document.querySelector('a[href="#diagnosis-placeholder"]');
    if (startDiagnosisBtn) {
        startDiagnosisBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Diagnosis feature coming soon!");
        });
    }

    // Role Button Interaction (Login/Sign Up section)
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            roleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log(`Role selected: ${button.textContent}`);
            // Here you could show different form fields or handle logic based on role
        });
    });

    // Form submission (basic prevention)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add actual form submission logic here (e.g., AJAX)
            alert('Form submitted (simulated)! Thank you.');
            form.reset(); // Reset form fields
        });
    });

});
