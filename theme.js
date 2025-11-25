// Theme switching functionality for DeepSync
document.addEventListener('DOMContentLoaded', function() {
    console.log('Theme.js loaded - Path:', window.location.pathname);
    
    // Create theme toggle if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        console.log('Creating theme toggle element');
        createThemeToggle();
    } else {
        console.log('Theme toggle already exists');
    }

    // Initialize theme
    initTheme();
    
    // Force synchronize the toggle state with the actual theme
    synchronizeToggleWithTheme();
    
    // Add event listener to checkbox
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    if (themeToggle) {
        console.log('Adding event listener to theme toggle');
        themeToggle.addEventListener('change', function() {
            console.log('Theme toggle changed. New state:', this.checked);
            toggleTheme(this.checked);
        });
    } else {
        console.error('Theme toggle checkbox not found!');
    }
});

/**
 * Makes sure the toggle checkbox state matches the body class
 */
function synchronizeToggleWithTheme() {
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    if (!themeToggle) return;
    
    // Checkbox should be checked for dark theme
    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeToggle.checked = isDarkTheme;
    
    console.log('Synchronized toggle state with theme. Dark theme:', isDarkTheme);
}

function createThemeToggle() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <span class="theme-toggle-icon"><i class="fas fa-sun"></i></span>
        <label class="theme-toggle-switch">
            <input type="checkbox" id="theme-toggle-checkbox">
            <span class="theme-toggle-slider"></span>
        </label>
        <span class="theme-toggle-icon"><i class="fas fa-moon"></i></span>
    `;
    
    header.appendChild(themeToggle);
    
    // Add theme toggle styles if not already present
    if (!document.getElementById('theme-toggle-styles')) {
        const themeStyles = document.createElement('style');
        themeStyles.id = 'theme-toggle-styles';
        themeStyles.innerHTML = `
            .theme-toggle {
                display: flex;
                align-items: center;
                margin-left: 20px;
            }
            
            .theme-toggle-icon {
                color: var(--text-color, white);
                font-size: 14px;
                margin: 0 8px;
            }
            
            .theme-toggle-switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 22px;
            }
            
            .theme-toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .theme-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #2c3e50;
                transition: .4s;
                border-radius: 22px;
            }
            
            .theme-toggle-slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .theme-toggle-slider {
                background-color: var(--primary-color, #6c63ff);
            }
            
            input:checked + .theme-toggle-slider:before {
                transform: translateX(20px);
            }
            
            /* Space themed elements for dark mode */
            .space-planet,
            .floating-particle {
                display: none;
                position: fixed;
                z-index: -1;
                opacity: 0;
                transition: opacity 1s ease;
            }
            
            body.dark-theme .space-planet,
            body.dark-theme .floating-particle {
                display: block;
                opacity: 0.5;
            }
            
            .space-planet {
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, var(--primary-color, #6c63ff) 0%, #1a1a2e 70%);
                box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
            }
            
            .planet-1 {
                width: 100px;
                height: 100px;
                top: 15%;
                right: 5%;
            }
            
            .planet-2 {
                width: 60px;
                height: 60px;
                bottom: 10%;
                left: 8%;
                background: radial-gradient(circle at 30% 30%, #e74c3c 0%, #c0392b 70%);
            }
            
            @media (max-width: 768px) {
                .theme-toggle {
                    margin-left: 10px;
                }
                
                .theme-toggle-icon {
                    font-size: 12px;
                    margin: 0 4px;
                }
                
                .theme-toggle-switch {
                    width: 36px;
                    height: 18px;
                }
                
                .theme-toggle-slider:before {
                    height: 12px;
                    width: 12px;
                    left: 3px;
                    bottom: 3px;
                }
                
                input:checked + .theme-toggle-slider:before {
                    transform: translateX(18px);
                }
            }
        `;
        document.head.appendChild(themeStyles);
    }
}

function initTheme() {
    // Check if we're on the landing page (index.html)
    const path = window.location.pathname;
    const isLandingPage = path === '/' || 
                         path === '/index.html' || 
                         path === '/DeepSync/' || 
                         path === '/DeepSync/index.html' || 
                         path.endsWith('/index.html') && !path.includes('/Roadmaps/') && 
                         !path.includes('/todo/') && 
                         !path.includes('/Time-Management/');
    
    // For landing page, always use dark theme
    if (isLandingPage) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        // Ensure toggle is checked for dark theme
        const themeToggle = document.getElementById('theme-toggle-checkbox');
        if (themeToggle) themeToggle.checked = true;
        return;
    }
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    // Check if browser has a preference
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        const themeToggle = document.getElementById('theme-toggle-checkbox');
        if (themeToggle) themeToggle.checked = true;
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        const themeToggle = document.getElementById('theme-toggle-checkbox');
        if (themeToggle) themeToggle.checked = false;
    } else {
        // Default to dark theme if no preference
        document.body.classList.add('dark-theme');
        const themeToggle = document.getElementById('theme-toggle-checkbox');
        if (themeToggle) themeToggle.checked = true;
    }
    
    // Apply theme to navbar immediately
    updateNavbarStyle();
    
    // Add theme variable styles if not present
    if (!document.getElementById('theme-variables')) {
        const themeVars = document.createElement('style');
        themeVars.id = 'theme-variables';
        themeVars.innerHTML = `
            body {
                --bg-color: #000000;
                --card-bg: #0a0a0a;
                --surface-color: #121212;
                --text-color: #ffffff;
                --text-secondary: rgba(255, 255, 255, 0.7);
                --border-color: #272727;
                --shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                --primary-color: #6c63ff;
                --primary-dark: #5a52e0;
                --primary-light: #8A84FF;
                --accent-color: #00d9b8;
                --accent-light: #00E6B5;
                --danger-color: #ff5555;
                --navbar-bg: rgba(10, 10, 10, 0.95);
                --navbar-border: #272727;
                
                transition: background-color 0.5s ease, color 0.5s ease;
            }
            
            body.light-theme {
                --bg-color: #f8f9fa;
                --card-bg: #ffffff;
                --surface-color: #f1f3f4;
                --text-color: #212529;
                --text-secondary: #6c757d;
                --border-color: #dee2e6;
                --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                --primary-color: #6c63ff;
                --primary-dark: #5a52e0;
                --primary-light: #8A84FF;
                --accent-color: #00d9b8;
                --accent-light: #00E6B5;
                --danger-color: #dc3545;
                --navbar-bg: rgba(255, 255, 255, 0.9);
                --navbar-border: rgba(0, 0, 0, 0.1);
            }

            /* Updated header/navbar styles */
            header {
                background-color: var(--navbar-bg) !important;
                border-bottom: 1px solid var(--navbar-border) !important;
                transition: background-color 0.5s ease, border-color 0.5s ease;
            }

            body.light-theme nav ul li a {
                color: #666;
            }

            body.light-theme nav ul li a:hover {
                color: #333;
            }

            body.light-theme nav ul li a.active {
                color: white;
            }

            /* For the main index.html page with different nav structure */
            body.light-theme #right-nav button {
                color: #333;
                border-color: #333;
            }

            body.light-theme #right-nav button:hover {
                background-color: #333;
                color: white;
            }
        `;
        document.head.appendChild(themeVars);
    }
}

/**
 * Toggles the theme based on the toggle state
 * @param {boolean} isDark - Whether to switch to dark theme
 */
function toggleTheme(isDark = null) {
    // Check if we're on the landing page (index.html)
    const path = window.location.pathname;
    const isLandingPage = path === '/' || 
                         path === '/index.html' || 
                         path === '/DeepSync/' || 
                         path === '/DeepSync/index.html' || 
                         (path.endsWith('/index.html') && 
                         !path.includes('/Roadmaps/') && 
                         !path.includes('/todo/') && 
                         !path.includes('/Time-Management/'));
    
    console.log('Toggle theme called. Path:', path, 'Is landing page:', isLandingPage);
    
    // Don't toggle theme on landing page
    if (isLandingPage) {
        // Keep dark theme for landing page
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        const themeToggle = document.getElementById('theme-toggle-checkbox');
        if (themeToggle) themeToggle.checked = true;
        console.log('Landing page - keeping dark theme');
        return;
    }
    
    // If isDark is provided, set the theme accordingly
    if (isDark !== null) {
        if (isDark) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            console.log('Explicitly switched to dark theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            console.log('Explicitly switched to light theme');
        }
    } 
    // Otherwise toggle based on current state
    else {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            console.log('Toggled to light theme');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            console.log('Toggled to dark theme');
        }
    }
    
    // Update navbar style when theme changes
    updateNavbarStyle();
    
    // Make sure toggle state matches theme
    synchronizeToggleWithTheme();
}

function updateNavbarStyle() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Check if we're on the landing page (index.html)
    const path = window.location.pathname;
    const isLandingPage = path === '/' || 
                         path === '/index.html' || 
                         path === '/DeepSync/' || 
                         path === '/DeepSync/index.html' || 
                         path.endsWith('/index.html') && !path.includes('/Roadmaps/') && 
                         !path.includes('/todo/') && 
                         !path.includes('/Time-Management/');
    
    // Don't update navbar style on landing page
    if (isLandingPage) {
        return;
    }
    
    if (header) {
        if (document.body.classList.contains('light-theme')) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(30, 30, 30, 0.8)';
            header.style.borderBottom = '1px solid #333';
        }
    }
    
    // Handle other pages with different nav structure
    if (nav && !header) {
        if (document.body.classList.contains('light-theme')) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        } else {
            nav.style.backgroundColor = 'transparent';
        }
    }
} 