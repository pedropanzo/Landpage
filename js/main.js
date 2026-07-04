// Wobotec · Caracol — main.js
// Handles: mobile navigation toggle, contact form submit feedback

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var mobilePanel = document.getElementById('mobilePanel');

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', function () {
      mobilePanel.classList.toggle('open');
    });

    // Close mobile menu after clicking a link
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobilePanel.classList.remove('open');
      });
    });
  }

  // Contact form submit feedback (front-end only demo)
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Solicitação enviada! Entraremos em contato em breve.');
      contactForm.reset();
    });
  }
});
