/**
 * Maulik Parmar - Executive Portfolio Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCategoryFilters();
  initModalListeners();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
}

/* Category Filter Tabs */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Switch Main Viewport Image on Thumbnail Click */
function switchMainImage(targetId, newSrc, newAlt) {
  const targetImg = document.getElementById(targetId);
  if (targetImg) {
    targetImg.src = newSrc;
    if (newAlt) targetImg.alt = newAlt;
    
    // Also update the onclick on the parent window-viewport so clicking to enlarge shows the newly selected image
    const parentViewport = targetImg.closest('.window-viewport');
    if (parentViewport) {
      parentViewport.setAttribute('onclick', `openLightbox('${newSrc}', '${newAlt}')`);
    }
  }
}

/* Lightbox Modal */
function openLightbox(src, title) {
  const backdrop = document.getElementById('lightbox-backdrop');
  const img = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');

  if (backdrop && img) {
    img.src = src;
    if (titleEl && title) titleEl.textContent = title;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(e) {
  if (e && e.target && e.target.closest('.lightbox-modal') && !e.target.classList.contains('lightbox-close')) {
    return;
  }
  const backdrop = document.getElementById('lightbox-backdrop');
  const img = document.getElementById('lightbox-image');

  if (backdrop) {
    backdrop.classList.remove('open');
    if (img) img.src = '';
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

// Expose globals for inline attributes
window.switchMainImage = switchMainImage;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
