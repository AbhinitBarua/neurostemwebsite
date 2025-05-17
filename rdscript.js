document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Function to show a section and hide others
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Remove 'active' class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // Add 'active' class to the clicked link
            this.classList.add('active');

            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);

            // Optional: Scroll to top of new section
            mainContent.scrollTop = 0; 
        });
    });

    // Initialize: Show the 'overview' section by default
    // (The 'active' class is already set in HTML for the overview section and link,
    // but this ensures it if JS needs to control initial state more dynamically)
    const initialActiveLink = document.querySelector('.sidebar-nav .nav-link.active');
    if (initialActiveLink) {
        const initialSectionId = initialActiveLink.getAttribute('data-section');
        showSection(initialSectionId);
    } else {
        // Fallback if no link is marked active initially
        showSection('overview'); 
        if (navLinks.length > 0) navLinks[0].classList.add('active');
    }

    // Simple Star Rating Interactivity (Example for AI Analysis section)
    const starRatingContainers = document.querySelectorAll('.star-rating');
    starRatingContainers.forEach(container => {
        const stars = container.querySelectorAll('i');
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                // Fill stars up to the clicked one
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.remove('far');
                    stars[i].classList.add('fas');
                }
                // Empty stars after the clicked one
                for (let i = index + 1; i < stars.length; i++) {
                    stars[i].classList.remove('fas');
                    stars[i].classList.add('far');
                }
                // You would typically send this rating (index + 1) to a backend here
                console.log('Rated:', index + 1, 'stars');
            });

            // Optional: Hover effect
            star.addEventListener('mouseover', function() {
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add('fa-beat-fade'); // A little hover animation
                }
            });
            star.addEventListener('mouseout', function() {
                 for (let i = 0; i <= index; i++) {
                    stars[i].classList.remove('fa-beat-fade');
                }
            });
        });
    });
    
    // Potentially add more JS for dynamic elements like chart generation,
    // form submissions (AJAX), modal popups for patient profiles, etc.
    // For now, this handles the basic navigation.

    // Responsive sidebar text handling (simple version for icon-only -> expand)
    // This is largely handled by CSS :hover, but JS could be used for more complex toggles
    // if a click was preferred to collapse/expand.
    // For this example, CSS :hover is sufficient for the 768px breakpoint.

});
