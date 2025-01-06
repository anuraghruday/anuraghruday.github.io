// scripts.js

// Initialize AOS
document.addEventListener('DOMContentLoaded', function () {
  AOS.init();
});

// Popup Functions
function openPopup(contentId) {
  // Show the popup card
  const popupCard = document.getElementById(contentId);
  popupCard.classList.add('active');

  // Show the overlay
  const overlay = document.getElementById('popupOverlay');
  overlay.classList.add('active');
}

function closePopup(contentId) {
  // Hide the popup card
  const popupCard = document.getElementById(contentId);
  popupCard.classList.remove('active');

  // Hide the overlay if no other popup is open
  const overlay = document.getElementById('popupOverlay');
  overlay.classList.remove('active');
}

// Close popup with Esc key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const activePopups = document.querySelectorAll('.popup-card.active');
    activePopups.forEach((popup) => {
      popup.classList.remove('active');
    });
    document.getElementById('popupOverlay').classList.remove('active');
  }
});

// Close popup when clicking on overlay
const popupOverlay = document.getElementById('popupOverlay');
popupOverlay.addEventListener('click', function () {
  const activePopups = document.querySelectorAll('.popup-card.active');
  activePopups.forEach((popup) => {
    popup.classList.remove('active');
  });
  popupOverlay.classList.remove('active');
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', function () {
  sidebar.classList.toggle('open');
});
