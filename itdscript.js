document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    // Function to show a section and hide others
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
    }
    
    // Add nav-text span to sidebar links for responsive CSS
    navLinks.forEach(link => {
        const icon = link.querySelector('i');
        let textContent = '';
        link.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                textContent = node.textContent.trim();
                node.textContent = ''; 
            }
        });
        if (textContent && !link.querySelector('.nav-text')) {
            const span = document.createElement('span');
            span.className = 'nav-text';
            span.textContent = textContent;
            if(icon && icon.nextSibling) {
                link.insertBefore(span, icon.nextSibling);
            } else if (icon) {
                 link.appendChild(span);
            } else {
                link.prepend(span);
            }
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

    // Initialize: Show the default active section
    const initialActiveLink = document.querySelector('.sidebar-nav .nav-link.active');
    if (initialActiveLink) {
        showSection(initialActiveLink.getAttribute('data-section'));
    } else if (sections.length > 0 && navLinks.length > 0) {
        showSection(sections[0].id);
        navLinks[0].classList.add('active');
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggleInst');
    if (darkModeToggle) {
        if (localStorage.getItem('darkModeInst') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('darkModeInst', 'enabled');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkModeInst', 'disabled');
            }
        });
    }

    // Modal Handling
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    const closeButtons = document.querySelectorAll('.modal .close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });


    // Placeholder for AI Model Usage Chart (using Chart.js - library not included here)
    const chartCanvas = document.getElementById('aiModelUsageChart');
    if (chartCanvas && typeof Chart !== 'undefined') { // Check if Chart.js is loaded
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut', // or 'pie'
            data: {
                labels: ['R1-50B', 'L2-4B', 'X3-20B'],
                datasets: [{
                    label: 'AI Model Usage',
                    data: [
                        parseInt(document.getElementById('r1Usage')?.textContent || '0'),
                        parseInt(document.getElementById('l2Usage')?.textContent || '0'),
                        parseInt(document.getElementById('x3Usage')?.textContent || '0')
                    ],
                    backgroundColor: [
                        'rgba(41, 128, 185, 0.7)', // --primary-color
                        'rgba(52, 152, 219, 0.7)', // --secondary-color
                        'rgba(26, 188, 156, 0.7)'  // --accent-color
                    ],
                    borderColor: [
                        'rgba(41, 128, 185, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(26, 188, 156, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    } else if (chartCanvas) {
        chartCanvas.parentElement.innerHTML += "<p style='text-align:center; font-size:0.9em; color: #777;'><em>Chart library not loaded. Install Chart.js to see the graph.</em></p>";
    }

});
