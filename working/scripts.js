// Initialization and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
  });

  // Hamburger menu setup
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.floating-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', toggleNavMenu);
    hamburger.innerHTML = '☰'; // Add hamburger icon
  }

  // Set up scroll-based navigation highlighting
  document.addEventListener('scroll', handleScroll);
});



// Project Filter System
function initializeProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filter = btn.dataset.filter;

      // Filter projects
      projectCards.forEach(card => {
        const categories = card.dataset.categories.split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        // Use setTimeout to allow smooth transition
        if (!shouldShow) {
          card.classList.add('hidden');
          setTimeout(() => {
            card.style.display = 'none';
          }, 400); // Match transition duration
        } else {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.remove('hidden');
          }, 10);
        }
      });
    });
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeProjectFilters);

// Scroll Handling
function handleScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.floating-nav ul li a');
  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentSectionId)) {
      link.classList.add('active');
    }
  });
}

// Navigation Functions
function toggleNavMenu() {
  const nav = document.querySelector('.floating-nav');
  const hamburger = document.querySelector('.hamburger');
  const isExpanded = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isExpanded);
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

// Details Toggle
function toggleDetails(id) {
  const details = document.getElementById(id);
  if (details) details.classList.toggle('active');
}

// Global Event Listeners
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

