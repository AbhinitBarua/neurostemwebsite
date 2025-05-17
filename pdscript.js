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
        // Find text node that is a direct child, or wrap existing text
        let textContent = '';
        link.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                textContent = node.textContent.trim();
                node.textContent = ''; // Clear original text node
            }
        });
        if (textContent && !link.querySelector('.nav-text')) {
            const span = document.createElement('span');
            span.className = 'nav-text';
            span.textContent = textContent;
            link.appendChild(span); // Append after icon
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

            // If clicking on a link that targets a specific element within a section
            const targetId = this.getAttribute('data-section-target');
            if (targetId) {
                showSection(targetId);
                const targetLink = document.querySelector(`.nav-link[data-section="${targetId}"]`);
                if(targetLink) {
                     navLinks.forEach(navLink => navLink.classList.remove('active'));
                     targetLink.classList.add('active');
                }
            }
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

    // AI Diagnostics Section Interactivity
    const aiModelOptions = document.querySelectorAll('.ai-model-option');
    let selectedAiModel = 'R1-50B'; // Default

    aiModelOptions.forEach(option => {
        option.addEventListener('click', function() {
            aiModelOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedAiModel = this.getAttribute('data-model');
            console.log('Selected AI Model:', selectedAiModel);
        });
    });

    const runAnalysisButton = document.getElementById('runAiAnalysis');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressStatus = document.getElementById('progressStatus');
    const estimatedTime = document.getElementById('estimatedTime');
    const aiReportView = document.querySelector('.ai-report-view');

    if (runAnalysisButton) {
        runAnalysisButton.addEventListener('click', function() {
            progressBarContainer.style.display = 'block';
            aiReportView.style.display = 'none'; // Hide previous report
            progressStatus.textContent = 'Status: Analyzing with ' + selectedAiModel + '...';
            estimatedTime.textContent = 'Estimated time: ~2 minutes'; // Placeholder

            let progress = 0;
            progressBarFill.style.width = '0%';
            progressBarFill.textContent = '0%';

            const interval = setInterval(() => {
                progress += 10;
                if (progress <= 100) {
                    progressBarFill.style.width = progress + '%';
                    progressBarFill.textContent = progress + '%';
                }
                if (progress >= 100) {
                    clearInterval(interval);
                    progressStatus.textContent = 'Status: Analysis Complete!';
                    estimatedTime.textContent = 'Report generated.';
                    // Simulate showing report
                    document.getElementById('reportModelUsed').textContent = selectedAiModel;
                    document.getElementById('reportTimestamp').textContent = new Date().toLocaleString();
                    aiReportView.style.display = 'block';
                     // Scroll to report
                    aiReportView.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // Simulate progress
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Basic Toggles for AI Settings (example)
    const settingToggles = document.querySelectorAll('#ai-settings .switch input[type="checkbox"]');
    settingToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            console.log(`Setting ${this.id} changed to: ${this.checked}`);
            // Here you would typically save this preference
        });
    });

});
