/**
 * Maulik Parmar - Portfolio Interactivity
 * Focus: Clean filter tabs, modal lightbox, mobile navigation, and smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initProjectFilters();
  initNavScroll();
  initModalListeners();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* Project Category Filters */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Smooth Navigation & Scroll Spy */
function initNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/* Lightbox Modal */
function openLightbox(imageSrc, title) {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');

  if (modalBackdrop && modalImage) {
    modalImage.src = imageSrc;
    if (modalTitle && title) {
      modalTitle.textContent = title;
    }
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalImage = document.getElementById('modal-image');

  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
    if (modalImage) {
      modalImage.src = '';
    }
    document.body.style.overflow = '';
  }
}

function initModalListeners() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

// Attach to window for inline onclick attributes
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
