/**
 * Navigation Component Loader
 * Loads the reusable navigation component and handles active states
 */

// Case studies configuration
const caseStudies = [
  { key: 'built', url: 'built-payment-management.html' },
  { key: 'implentioRedesign', url: 'implentio-redesign-and-demo.html' },
  { key: 'implentioDesignSystem', url: 'implentio-design-system.html' },
  { key: 'bambee', url: 'bambee-employment-termination.html' }
];

// Load navigation component
async function loadNavigation() {
  try {
    const response = await fetch('nav-component.html');
    const html = await response.text();

    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', html);

    // Initialize navigation after it's loaded
    initializeNavigation();
  } catch (error) {
    console.error('Error loading navigation:', error);
  }
}

// Initialize navigation - set active states and populate case study submenu
function initializeNavigation() {
  const currentPage = getCurrentPage();

  // Populate desktop case study submenu
  populateDesktopSubmenu(currentPage);

  // Populate mobile case study links
  populateMobileCaseStudies(currentPage);

  // Set active states for primary nav
  setActiveNavStates(currentPage);
}

// Get current page identifier
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  // Remove .html extension if present for comparison
  const baseFilename = filename.replace('.html', '');

  if (baseFilename === 'index' || baseFilename === '' || filename === 'index.html') return 'home';
  if (baseFilename === 'built-payment-management') return 'built';
  if (baseFilename === 'implentio-redesign-and-demo') return 'implentioRedesign';
  if (baseFilename === 'implentio-design-system') return 'implentioDesignSystem';
  if (baseFilename === 'bambee-employment-termination') return 'bambee';

  return 'home';
}

// Populate desktop case study submenu
function populateDesktopSubmenu(currentPage) {
  const submenu = document.getElementById('case-study-submenu');
  if (!submenu) return;

  // Only show submenu on case study pages (never on homepage)
  const isCaseStudyPage = caseStudies.some(study => study.key === currentPage);
  if (!isCaseStudyPage || currentPage === 'home') {
    submenu.innerHTML = '';
    submenu.style.display = 'none';
    return;
  }

  // Show submenu on case study pages
  submenu.style.display = 'flex';

  let html = '';

  caseStudies.forEach(study => {
    const studyConfig = TITLES[study.key];
    const isCurrent = study.key === currentPage;

    if (isCurrent) {
      // Current page - show with arrow
      html += `
        <div class="flex items-center gap-2 px-1 py-1 cursor-default">
          <svg width="23" height="8" viewBox="0 0 69 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-900 flex-shrink-0">
            <path d="M68.7 12.2C63.9667 14.5333 59.6 18.1333 55.6 23H53C53.9333 21 54.9333 19.2 56 17.6C57 16 58.0333 14.5667 59.1 13.3H0V9.9H59.1C58.0333 8.63333 57 7.2 56 5.6C54.9333 4 53.9333 2.2 53 0.2H55.6C59.6 5 63.9667 8.6 68.7 11.2V12.2Z" fill="currentColor"/>
          </svg>
          <span class="whitespace-nowrap text-sm text-gray-900">${studyConfig.navLabel || studyConfig.companyName}</span>
        </div>
      `;
    } else {
      // Other pages - show as link with hidden arrow
      html += `
        <a href="${study.url}" class="flex items-center gap-2 px-1 py-1 group">
          <svg width="23" height="8" viewBox="0 0 69 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-500 flex-shrink-0 opacity-0">
            <path d="M68.7 12.2C63.9667 14.5333 59.6 18.1333 55.6 23H53C53.9333 21 54.9333 19.2 56 17.6C57 16 58.0333 14.5667 59.1 13.3H0V9.9H59.1C58.0333 8.63333 57 7.2 56 5.6C54.9333 4 53.9333 2.2 53 0.2H55.6C59.6 5 63.9667 8.6 68.7 11.2V12.2Z" fill="currentColor"/>
          </svg>
          <span class="case-study-text relative whitespace-nowrap text-sm text-gray-500 transition-colors group-hover:text-gray-900">${studyConfig.navLabel || studyConfig.companyName}</span>
        </a>
      `;
    }
  });

  submenu.innerHTML = html;
}

// Populate mobile case study links
function populateMobileCaseStudies(currentPage) {
  const container = document.getElementById('mobile-case-study-submenu');
  if (!container) return;

  // Always show all case studies in mobile menu
  caseStudies.forEach(study => {
    const studyConfig = TITLES[study.key];
    const isCurrent = study.key === currentPage;

    const link = document.createElement('a');
    link.href = study.url;
    link.className = 'block px-1 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors' + (isCurrent ? ' text-gray-900' : '');
    link.textContent = studyConfig.navLabel || studyConfig.companyName;

    container.appendChild(link);
  });
}

// Set active states for primary navigation
function setActiveNavStates(currentPage) {
  // Work is active on all case study pages
  const isCaseStudyPage = caseStudies.some(study => study.key === currentPage);

  if (isCaseStudyPage) {
    const workNav = document.querySelector('[data-nav="work"] .nav-text');
    if (workNav) {
      workNav.classList.remove('text-gray-500');
      workNav.classList.add('text-gray-900');
      workNav.style.opacity = '1';
    }
  } else if (currentPage === 'home') {
    // Homepage - update links to use anchor links and change Home to Hello!
    const homeNav = document.querySelector('[data-nav="home"]');
    const workNav = document.querySelector('[data-nav="work"]');
    const aboutNav = document.querySelector('[data-nav="about"]');
    const contactNav = document.querySelector('[data-nav="contact"]');

    if (homeNav) {
      homeNav.href = '#hola';
      homeNav.setAttribute('data-section', 'hola');
      const homeText = homeNav.querySelector('.nav-text');
      if (homeText) homeText.textContent = 'Hello!';
    }
    if (workNav) {
      workNav.href = '#work';
      workNav.setAttribute('data-section', 'work');
    }
    if (aboutNav) {
      aboutNav.href = '#about';
      aboutNav.setAttribute('data-section', 'about');
    }
    if (contactNav) {
      contactNav.href = '#contact';
      contactNav.setAttribute('data-section', 'contact');
    }

    // Initialize scroll-based active state tracking for homepage
    initializeHomepageActiveStates();
  }
}

// Initialize active state tracking for homepage
function initializeHomepageActiveStates() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection && targetId !== 'work') { // Skip for #work to allow normal navigation
        e.preventDefault();
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Update active nav state based on scroll position
  function updateActiveNav() {
    let current = 'hola'; // Default to hola

    // Check if we're near the bottom of the page
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;

    // If near bottom, activate contact
    if (isNearBottom) {
      current = 'contact';
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if section is in viewport (with some offset for better UX)
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
    }

    // Update nav link active states
    navLinks.forEach(link => {
      const textSpan = link.querySelector('.nav-text');
      if (textSpan) {
        textSpan.classList.remove('active');
        textSpan.classList.remove('!text-black');
        if (link.getAttribute('data-section') === current) {
          textSpan.classList.add('active');
          textSpan.classList.add('!text-black');
        }
      }
    });
  }

  // Throttle scroll event for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call to set active state
  updateActiveNav();
}

// Hamburger menu functions (must be global for onclick handlers)
window.toggleMenu = function() {
  const overlay = document.getElementById('menuOverlay');
  overlay.classList.toggle('active');

  // Prevent body scroll when menu is open
  if (overlay.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

window.closeMenuOnBackdrop = function(event) {
  if (event.target.id === 'menuOverlay') {
    window.toggleMenu();
  }
};

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('menuOverlay');
    if (overlay && overlay.classList.contains('active')) {
      window.toggleMenu();
    }
  }
});

// Load navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNavigation);
} else {
  loadNavigation();
}
