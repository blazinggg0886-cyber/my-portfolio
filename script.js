// ========== RESPONSIVE FUNCTIONS ==========

// Initialize responsive behavior
function initResponsive() {
  const screenWidth = window.innerWidth;
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  
  if (screenWidth <= 768) {
    // Mobile adjustments
    adjustMobileLayout();
  } else {
    // Desktop adjustments
    adjustDesktopLayout();
  }
}

// Mobile layout adjustments
function adjustMobileLayout() {
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  if (navLinks) navLinks.style.display = 'none';
  if (navCta) navCta.style.display = 'none';
}

// Desktop layout adjustments
function adjustDesktopLayout() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('open');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  if (navLinks) navLinks.style.display = 'flex';
  if (navCta) navCta.style.display = 'block';
}

// Handle window resize
window.addEventListener('resize', () => {
  initResponsive();
  handleNavbarResize();
});

// ========== NAVIGATION ==========

// Navbar shrink on scroll
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '12px 6%';
  } else {
    navbar.style.padding = '18px 6%';
  }
}

// Handle navbar resize responsively
function handleNavbarResize() {
  const screenWidth = window.innerWidth;
  const navbar = document.getElementById('navbar');
  
  if (screenWidth <= 768) {
    navbar.style.padding = '16px 5%';
  } else {
    navbar.style.padding = window.scrollY > 50 ? '12px 6%' : '18px 6%';
  }
}

// Mobile menu functions
function openMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = 'auto'; // Allow body scroll
  }
}

// Project modal functions
function openProjectModal(type) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalBody) return;
  
  // Clear previous content
  modalBody.innerHTML = '';
  
  // Load content based on type
  if (type === 'feranmite') {
    modalBody.innerHTML = `
      <h2 style="color: var(--orange); margin-bottom: 20px; font-family: 'Syne', sans-serif;">Feranmite Technology</h2>
      <iframe src="https://www.behance.net/embed/project/241093057?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>
      <p style="color: var(--gray); margin-top: 20px; font-size: 0.9rem;">A Tech Brand with a Modern Visual System, Focused on Innovation, Digital Solutions, and a Strong Visual Presence</p>
    `;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }
  
  if (modal) {
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }
});

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    if (mobileMenu && mobileMenu.classList.contains('open') && 
        !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
});

// ========== SCROLL REVEAL (INTERSECTION OBSERVER) ==========

// Use Intersection Observer for zero-lag scroll reveals
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});

// Fallback for elements visible on page load
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add('visible');
  }
  });
});

// ========== PORTFOLIO FILTERING ==========

// Portfolio filter function
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  
  document.querySelectorAll('.project-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = 'block';
      // Small delay for smooth animation
      setTimeout(() => card.classList.add('visible'), 10);
    } else {
      card.classList.remove('visible');
      setTimeout(() => card.style.display = 'none', 300);
    }
  });
}

// ========== PORTFOLIO BEHANCE LINKS ==========

// Setup portfolio project links
// Behance projects configured
const projectLinks = {
  'project-0': 'https://www.behance.net/gallery/236409043/RUUVOO',
  'project-1': 'https://www.behance.net/gallery/239126657/Queens-Aura',
  'project-2': 'https://www.behance.net/gallery/246610951/Gabriel-Adewunmi',
  'project-3': 'https://www.behance.net/gallery/230353441/Bellas-Place-Brand-Identity',
  'project-4': 'https://www.behance.net/gallery/',
  'project-5': 'https://www.behance.net/gallery/',
  'project-6': 'https://www.behance.net/gallery/241093057/Feramite-Tech?platform=direct',
  'project-7': 'https://www.behance.net/gallery/',
  'project-8': 'https://www.behance.net/gallery/226294513/TRIONLIFE',
  'project-9': 'https://www.behance.net/gallery/',
  'project-10': 'https://www.behance.net/gallery/',
  'project-11': 'https://www.behance.net/gallery/',
  'project-12': 'https://www.behance.net/gallery/',
};

// Add click listeners to "View Project" buttons
document.addEventListener('DOMContentLoaded', () => {
  const viewButtons = document.querySelectorAll('.view-btn');
  
  viewButtons.forEach((btn, index) => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectCard = btn.closest('.project-card');
      const modalType = projectCard?.dataset.modal;
      
      // Check if this card has a modal
      if (modalType) {
        openProjectModal(modalType);
        return;
      }
      
      // Otherwise, handle as regular link
      const projectCat = projectCard?.dataset.cat;
      const projectKey = Object.keys(projectLinks)[index];
      const behanceUrl = projectLinks[projectKey];
      
      // Open Behance project
      if (behanceUrl && behanceUrl !== 'https://www.behance.net/gallery/' && !behanceUrl.includes('YOUR_BEHANCE')) {
        window.open(behanceUrl, '_blank');
      } else {
        alert('Project link coming soon! Check back later.');
      }
    });
    
    // Add hover effect
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });
});

// ========== FORM HANDLING ==========

// Form submit handler
function handleSubmit() {
  const nameInput = document.querySelector('input[placeholder*="Blazing"]');
  const emailInput = document.querySelector('input[type="email"]');
  const projectSelect = document.querySelector('select');
  const textarea = document.querySelector('textarea');
  const btn = document.querySelector('.btn-submit');
  
  // Validation
  if (!nameInput || !nameInput.value.trim()) {
    showFormError(nameInput, 'Please enter your name');
    return;
  }
  
  if (!emailInput || !emailInput.value.trim()) {
    showFormError(emailInput, 'Please enter your email');
    return;
  }
  
  if (!isValidEmail(emailInput.value)) {
    showFormError(emailInput, 'Please enter a valid email');
    return;
  }
  
  if (!projectSelect || !projectSelect.value) {
    showFormError(projectSelect, 'Please select a project type');
    return;
  }
  
  if (!textarea || !textarea.value.trim()) {
    showFormError(textarea, 'Please describe your project');
    return;
  }
  
  // Success feedback
  const originalText = btn.textContent;
  const originalBg = btn.style.background;
  const originalColor = btn.style.color;
  
  btn.textContent = "✓ Message Sent! I'll be in touch soon.";
  btn.style.background = 'var(--green-soft)';
  btn.style.color = 'var(--white)';
  btn.disabled = true;
  
  // Reset after 3 seconds
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = originalBg;
    btn.style.color = originalColor;
    btn.disabled = false;
    
    // Clear form
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
      field.value = '';
      field.style.borderColor = '';
    });
  }, 3000);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form error
function showFormError(input, message) {
  if (!input) return;
  input.style.borderColor = 'var(--orange)';
  input.style.boxShadow = '0 0 0 3px rgba(255, 107, 26, 0.15)';
  
  // Show error message
  const errorMsg = document.createElement('div');
  errorMsg.style.cssText = 'color: var(--orange); font-size: 0.75rem; margin-top: 4px;';
  errorMsg.textContent = message;
  
  // Remove previous error if exists
  const previousError = input.parentElement?.querySelector('[style*="color: var(--orange)"]');
  if (previousError) previousError.remove();
  
  input.parentElement.appendChild(errorMsg);
  
  // Clear error after 3 seconds
  setTimeout(() => {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    errorMsg.remove();
  }, 3000);
}

// ========== SMOOTH SCROLL ==========

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ========== INITIALIZATION ==========

// Run on page load
window.addEventListener('load', () => {
  initResponsive();
  revealVisible();
  handleNavbarResize();
});

// Update responsive on scroll
window.addEventListener('scroll', () => {
  handleNavbarScroll();
  revealVisible();
});

// Add touch support for mobile interactions
document.addEventListener('touchend', (e) => {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu && e.target.closest('.view-btn')) {
    e.target.closest('.view-btn').click();
  }
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
});
