document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
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

    // Add nav-text span to sidebar links if not already there (for responsive CSS)
    navLinks.forEach(link => {
        const icon = link.querySelector('i');
        const existingTextNode = Array.from(link.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
        if (existingTextNode) {
            const span = document.createElement('span');
            span.className = 'nav-text';
            span.textContent = existingTextNode.textContent;
            link.replaceChild(span, existingTextNode); // Replace text node with span
        }
    });


    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            mainContent.scrollTop = 0; 
        });
    });

    // Initialize: Show the 'home-overview' section by default
    const initialActiveLink = document.querySelector('.sidebar-nav .nav-link.active');
    if (initialActiveLink) {
        const initialSectionId = initialActiveLink.getAttribute('data-section');
        showSection(initialSectionId);
    } else {
        if (sections.length > 0 && navLinks.length > 0) {
             showSection(sections[0].id); 
             navLinks[0].classList.add('active');
        }
    }

    // Add more JS for interactivity like:
    // - Modal popups for "View Patient Profile" or "Add New Patient"
    // - Handling form submissions (e.g., AJAX for prescriptions, AI analysis requests)
    // - Dynamic loading of calendar events or patient lists
    // - Real-time updates for notifications (WebSocket or polling)
    // - Implementing accept/dispute AI diagnosis logic
});
