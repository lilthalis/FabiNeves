const initializeSite = () => {
  // ==========================================================================
  // INTERATIVIDADE DO ACCORDION DOS SERVIÇOS (ABERTURA EXCLUSIVA)
  // ==========================================================================
  const serviceItems = document.querySelectorAll('.service-item');

  const closeService = (item) => {
    item.classList.remove('active');
    const header = item.querySelector('.service-header');
    if (header) header.setAttribute('aria-expanded', 'false');
  };

  serviceItems.forEach(item => {
    const header = item.querySelector('.service-header');
    const closeButton = item.querySelector('.service-drawer-close');

    if (!header) return;

    const toggleService = () => {
      const isOpen = item.classList.contains('active');

      serviceItems.forEach(otherItem => {
        if (otherItem !== item) closeService(otherItem);
      });

      if (isOpen) {
        closeService(item);
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    };

    header.addEventListener('click', toggleService);
    header.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleService();
      }
    });

    if (closeButton) {
      closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        closeService(item);
        header.focus();
      });
    }
  });

  // 3. Lightbox da Galeria
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const fullImageUrl = item.getAttribute('data-image');
      if (lightboxImg) lightboxImg.src = fullImageUrl;
      if (lightbox) {
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  // Fechamento de modais via Tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('active')) closeLightbox();
    }
  });

  // 5. Menu Responsivo Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite);
} else {
  initializeSite();
}
