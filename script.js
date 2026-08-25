const initializeSite = () => {
  // Configuração Oficial do WhatsApp de Fabi Neves
  const WHATSAPP_NUMBER = '551194272631';

  // 1. Procedimentos Oferecidos
  const servicesData = [
    {
      id: '01',
      name: 'Fio a Fio',
      shortDesc: 'Efeito natural e delicado, realçando os cílios um a um.',
      desc: 'Técnica clássica onde uma extensão é colada individualmente em cada fio natural. Proporciona alongamento, curvatura e acabamento discreto e elegante.',
      duration: '2h00',
      image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '02',
      name: 'Volume Brasileiro',
      shortDesc: 'Fios em formato Y para volume moderado e marcante.',
      desc: 'Utiliza fios em formato de Y que proporcionam densidade sem pesar a estrutura natural, garantindo um olhar preenchido e sofisticado.',
      duration: '2h15',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '03',
      name: 'Volume Egípcio',
      shortDesc: 'Fios em formato W que oferecem textura e acabamento único.',
      desc: 'Combina leveza com volume diferenciado através de fios em formato W, entregando textura expressiva e harmonia ao desenho dos olhos.',
      duration: '2h30',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '04',
      name: 'Lash Lifting',
      shortDesc: 'Curvatura e tratamento direto nos cílios naturais.',
      desc: 'Tratamento que curva, alinha e nutre os cílios naturais, proporcionando a sensação de fios mais longos e definidos sem extensões artificiais.',
      duration: '1h15',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '05',
      name: 'Design de Sobrancelhas',
      shortDesc: 'Alinhamento personalizado conforme a harmonia do rosto.',
      desc: 'Mapeamento facial e desenho simétrico das sobrancelhas para valorizar a expressão natural e destacar as linhas do seu rosto com equilíbrio.',
      duration: '45min',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '06',
      name: 'Brow Lamination',
      shortDesc: 'Alinhamento, fixação e preenchimento dos fios da sobrancelha.',
      desc: 'Técnica que alinha os fios naturais para cima, encobrindo falhas e garantindo um visual moderno, volumoso, alinhado e natural.',
      duration: '1h00',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // 2. Renderizar lista de procedimentos
  const servicesContainer = document.getElementById('servicesList');

  if (servicesContainer) {
    servicesContainer.innerHTML = servicesData.map(service => `
      <div class="service-item" data-id="${service.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${service.name}">
        <span class="service-num">${service.id}</span>
        <h3 class="service-title">${service.name}</h3>
        <p class="service-short-desc">${service.shortDesc}</p>
        <button class="service-btn" aria-hidden="true">+</button>
      </div>
    `).join('');
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
