document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [...sectionLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const closeMenu = () => {
    body.classList.remove('menu-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks?.addEventListener('click', (event) => {
    if (event.target.matches('a')) closeMenu();
  });

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        sectionLinks.forEach((link) => link.classList.toggle('is-active', link === activeLink));
      });
    },
    { rootMargin: '-38% 0px -55% 0px', threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));

  const modal = document.querySelector('[data-project-modal]');
  const modalImage = document.querySelector('[data-modal-image]');
  const modalCategory = document.querySelector('[data-modal-category]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalDescription = document.querySelector('[data-modal-description]');
  const modalStack = document.querySelector('[data-modal-stack]');
  const modalClose = document.querySelector('[data-modal-close]');

  const openProjectModal = (card) => {
    if (!modal) return;

    const title = card.dataset.projectTitle || '';
    const category = card.dataset.projectCategory || '';
    const image = card.dataset.projectImage || '';
    const description = card.dataset.projectDescription || '';
    const stack = (card.dataset.projectStack || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    modalImage.src = image;
    modalImage.alt = `${title} preview`;
    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalStack.innerHTML = stack.map((item) => `<span>${item}</span>`).join('');

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  };

  document.querySelectorAll('.project-card').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open details for ${card.dataset.projectTitle}`);

    card.addEventListener('click', () => openProjectModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  const closeModal = () => {
    if (!modal) return;
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
  };

  modalClose?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (event) => {
    const modalRect = modal.getBoundingClientRect();
    const isBackdropClick =
      event.clientX < modalRect.left ||
      event.clientX > modalRect.right ||
      event.clientY < modalRect.top ||
      event.clientY > modalRect.bottom;

    if (isBackdropClick) closeModal();
  });
});
