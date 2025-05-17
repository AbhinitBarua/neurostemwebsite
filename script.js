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
            window.location.href = "https://neurostem.vercel.app/rd.html";
            form.reset(); // Reset form fields
        });
    });

});
