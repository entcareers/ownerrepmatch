/**
 * OwnerRepMatch - Site JavaScript
 * Handles mobile navigation and global interactions
 */

(function() {
  'use strict';

  // Mobile Navigation Toggle
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav-link');

  if (menuBtn && nav) {
    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isOpen);
      nav.classList.toggle('is-open');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when clicking a nav link
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        menuBtn.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('is-open') && 
          !nav.contains(e.target) && 
          !menuBtn.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scroll for anchor links (if not handled by CSS)
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });

})();
