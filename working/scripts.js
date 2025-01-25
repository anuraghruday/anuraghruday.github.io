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
  nav.classList.toggle('open');
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