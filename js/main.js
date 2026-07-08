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

  // ------------------------------------------------------
  // Animação ao scroll (reveal)
  // ------------------------------------------------------
  (function () {
    var groups = [
      { selector: '#sobre .feature-card', effect: 'reveal-scale' },
      { selector: '#sobre .stat', effect: '' },
      { selector: '#caracol .feature-card', effect: '' },
      { selector: '#caracol .caracol-cta', effect: 'reveal-zoom' },
      { selector: '#produtos .product-card', effect: 'reveal-scale' },
      { selector: '#servicos .service-chip', effect: '' },
      { selector: '#servicos .step-card', effect: '' },
      { selector: '.testi-card', effect: 'reveal-scale' },
      { selector: '.guarantee', effect: 'reveal-zoom' },
      { selector: '#diferenciais .feature-card', effect: '' },
      { selector: '#casos .case-card', effect: 'reveal-scale' },
      { selector: '.contact-info .contact-item', effect: 'reveal-left' },
      { selector: '.contact-info .hours-box', effect: 'reveal-left' },
      { selector: '.form-card', effect: 'reveal-right' },
      { selector: '.section-head', effect: '' },
      { selector: '.logos-marquee-wrap', effect: '' }
    ];

    var STAGGER_MS = 90;

    groups.forEach(function (group) {
      var items = document.querySelectorAll(group.selector);
      items.forEach(function (el, i) {
        el.classList.add('reveal');
        if (group.effect) el.classList.add(group.effect);
        el.style.transitionDelay = (i % 6) * STAGGER_MS + 'ms';
      });
    });

    var revealEls = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(function (el) { observer.observe(el); });
  })();

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
