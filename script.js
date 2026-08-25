const initializeSite = () => {
  // Configuração Oficial do WhatsApp de Fabi Neves
// ==========================================================================
  // SERVIÇOS (CATÁLOGO EDITORIAL COM ACORDEÃO E WHATSAPP AUTOMÁTICO)
  // ==========================================================================
  const WHATSAPP_NUMBER = '551194272631';

  const servicesData = [
    {
      id: '01',
      name: 'Fio a Fio',
      desc: 'Olhar natural com fio a fio para realçar sua beleza.',
      duration: 'Duração: consultar',
      image: 'assets/procedimentos/fio-a-fio.jpg'
    },
    {
      id: '02',
      name: 'Volume Brasileiro',
      desc: 'Volume marcante e cheio, com acabamento natural.',
      duration: 'Duração: consultar',
      image: 'assets/procedimentos/volume-brasileiro.jpg'
    },
    {
      id: '03',
      name: 'Volume Egípcio',
      desc: 'Fios em formato W que oferecem textura e acabamento único.',
      duration: 'Duração: consultar',
      image: 'assets/procedimentos/volume-egipcio.jpg'
    },
    {
      id: '04',
      name: 'Lash Lifting',
      desc: 'Cílios curvados e alongados de forma natural.',
      duration: 'Duração: consultar',
      image: 'assets/procedimentos/lash-lifting.jpg'
    },
    {
      id: '05',
      name: 'Design de Sobrancelhas',
      desc: 'Modelagem personalizada para realçar a harmonia do seu rosto.',
      duration: 'Duração: consultar',
      image: 'assets/procedimentos/design-de-sobrancelhas.jpg'
    },
    {
      id: '06',
      name: 'Brow Lamination',
      desc: 'Sobrancelhas alinhadas, definidas e com efeito volumoso.',
      duration: 'Duração: consultar',
      image: 'assets/procedimentos/brow-lamination.jpg'
    }
  ];

  const servicesContainer = document.getElementById('servicesList');

  if (servicesContainer) {
    servicesContainer.innerHTML = servicesData.map(service => {
      const whatsappMsg = `Olá, Fabi! Gostaria de agendar o procedimento ${service.name}.`;
      const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

      return `
        <div class="service-item" id="service-${service.id}">
          <div class="service-header" data-id="${service.id}" role="button" aria-expanded="false" tabindex="0">
            <span class="service-num">${service.id}</span>
            <div class="service-title-group">
              <h3 class="service-title">${service.name}</h3>
            </div>
            <button class="service-toggle-btn" aria-label="Abrir detalhes de ${service.name}">+</button>
          </div>

          <div class="service-details-drawer">
            <div class="service-details-content">
              <div class="service-card-body">
                <div class="service-img-wrapper">
                  <img src="${service.image}" alt="${service.name}" class="service-img" loading="lazy">
                </div>
                <div class="service-info">
                  <h4 class="service-info-name">${service.name}</h4>
                  <p class="service-info-desc">${service.desc}</p>
                  <p class="service-duration">${service.duration}</p>
                  <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Agendar este procedimento</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Controle de abertura exclusiva (apenas 1 item aberto por vez)
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
      const header = item.querySelector('.service-header');

      const toggleItem = () => {
        const isOpen = item.classList.contains('active');

        // Fecha todos os outros
        serviceItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.service-header').setAttribute('aria-expanded', 'false');
          }
        });

        // Alterna o atual
        if (isOpen) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      };

      header.addEventListener('click', toggleItem);
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleItem();
        }
      });
    });
  }
  
  // 3. Modal de Serviços com WhatsApp dinâmico
  const serviceModal = document.getElementById('serviceModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalDuration = document.getElementById('modalDuration');
  const modalCta = document.getElementById('modalCta');

  function openServiceModal(service) {
    modalTag.textContent = `Procedimento ${service.id}`;
    modalTitle.textContent = service.name;
    modalDesc.textContent = service.desc;
    modalDuration.textContent = service.duration;
    modalImg.src = service.image;
    modalImg.alt = service.name;

    // Mensagem com encodeURIComponent
    const message = `Olá, Fabi! Gostaria de agendar o procedimento ${service.name}. Poderia me informar os horários disponíveis?`;
    modalCta.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    serviceModal.classList.add('active');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    serviceModal.classList.remove('active');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const service = servicesData.find(s => s.id === id);
      if (service) openServiceModal(service);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeServiceModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeServiceModal);

  // 4. Lightbox da Galeria
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
      if (serviceModal && serviceModal.classList.contains('active')) closeServiceModal();
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
