(function () {
    const qs = (sel, ctx = document) => ctx.querySelector(sel);
    const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  
    const body = document.body;
    // New header/burger
    const burger = qs('.burger');
    const menuContainer = qs('.menu-container');
  
    const feedbackModal = qs('#feedback-modal');
    const feedbackForm = qs('#feedback-modal-form');
    const inlineFeedbackForm = qs('#feedback-form');
    const confirmModal = qs('#confirm-modal');
    const confirmClose = qs('#confirm-close');
    const progressRing = qs('#progress-ring');
    const productsModal = qs('#products-modal');
    const productsWrapper = qs('#products-swiper-wrapper');
  
    const yearEl = qs('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // GSAP base
    if (window.gsap) {
      const { gsap } = window;
      if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
      if (window.ScrollSmoother) {
        try {
          window.ScrollSmoother.create({
            wrapper: '.smooth-wrapper',
            content: '.smooth-content',
            smooth: 0.8,
            effects: true,
          });
        } catch (_) {}
      }
  
      // no header GSAP integration needed for new burger menu
    }
  
    // Language switcher (for new header)
    const langSwitch = qs('#lang-switch');
    const langBtn = qs('#lang-btn');
    const langList = qs('#lang-list');
    langBtn?.addEventListener('click', () => {
      const open = langSwitch.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', String(open));
      langBtn.classList.toggle('is-active', open);
    });
    langList?.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;
      langBtn.textContent = li.dataset.lang?.toUpperCase() || 'EN';
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
      langBtn.classList.remove('is-active');
    });
    document.addEventListener('click', (e) => {
      if (!langSwitch?.contains(e.target)) {
        langSwitch?.classList.remove('open');
        langBtn?.setAttribute('aria-expanded', 'false');
        langBtn?.classList.remove('is-active');
      }
    });

    // Burger/menu logic
    if (burger && menuContainer) {
      const menuLine = qs('.menu-line');
      let scrollPosition = 0;
      burger.addEventListener('click', () => {
        const isActive = menuContainer.classList.contains('active');
        if (!isActive) {
          scrollPosition = window.scrollY || window.pageYOffset;
          body.style.overflow = 'hidden';
          body.classList.add('menu-open');
          menuContainer.classList.add('active');
          setTimeout(() => { menuContainer.classList.add('line-animate'); }, 50);
          setTimeout(() => {
            menuContainer.classList.add('show-content');
            menuContainer.classList.add('hide-line');
            // trigger staggered content appearance slightly after panels are visible
            setTimeout(() => { menuContainer.classList.add('content-appear'); }, 250);
          }, 600);
          burger.classList.add('active');
        } else {
          menuContainer.classList.remove('show-content');
          menuContainer.classList.add('hide-content');
          if (menuLine) menuLine.style.animation = 'shrinkLine 0.6s forwards';
          setTimeout(() => {
            menuContainer.classList.remove('active', 'line-animate', 'hide-content', 'hide-line', 'content-appear');
            if (menuLine) menuLine.style.animation = '';
            body.style.overflow = '';
            body.classList.remove('menu-open');
            window.scrollTo(0, scrollPosition);
          }, 600);
          burger.classList.remove('active');
        }
      });

      // Close menu when clicking a navigation link and then smooth-scroll to target
      function closeMenuAnd(fnAfter) {
        if (!menuContainer.classList.contains('active')) { fnAfter && fnAfter(); return; }
        menuContainer.classList.remove('show-content');
        menuContainer.classList.add('hide-content');
        if (menuLine) menuLine.style.animation = 'shrinkLine 0.6s forwards';
        setTimeout(() => {
          menuContainer.classList.remove('active', 'line-animate', 'hide-content', 'hide-line', 'content-appear');
          if (menuLine) menuLine.style.animation = '';
          body.style.overflow = '';
          body.classList.remove('menu-open');
          burger.classList.remove('active');
          fnAfter && fnAfter();
        }, 600);
      }

      menuContainer.addEventListener('click', (e) => {
        const link = e.target.closest('.menu-left a[href]');
        if (!link) return;
        const href = link.getAttribute('href') || '';
        e.preventDefault();
        e.stopPropagation();
        const isHash = href.startsWith('#') && href.length > 1;
        const target = isHash ? qs(href) : null;
        closeMenuAnd(() => {
          if (target) {
            if (window.gsap && window.ScrollToPlugin) {
              window.gsap.to(window, { duration: 0.6, scrollTo: target, ease: 'power2.out' });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          } else if (href && !href.startsWith('#')) {
            window.location.href = href;
          }
        });
      });
    }
  
    // Remove AOS init; GSAP handles all animations now
  
    // Swiper: Repair
    const repairSwiper = new Swiper('.repair-swiper', {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 32,
      loop: true,
      speed: 900,
      pagination: { el: '.repair-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.repair-swiper .swiper-button-next', prevEl: '.repair-swiper .swiper-button-prev' },
    });
  
    // On-scroll reveals for text and accent blocks (replay on each enter)
    if (window.gsap && window.ScrollTrigger) {
      const { gsap, ScrollTrigger } = window;
      const revealEls = [
        '.section .section-heading h2',
        '.repair .swiper-slide',
        '.accessories-gallery .acc-card',
        '.about .about-intro-media',
        // '.features li', // handled by a dedicated staggered animation below
        '.promo-banner',
        '.contacts .contact-form-block',
        '.contact-columns .contact-col',
      ];

      // Alternate directions and longer distance
      const directions = ['y', 'x', 'y', 'x'];
      gsap.utils.toArray(revealEls.join(','))
        .forEach((el, idx) => {
          const dir = directions[idx % directions.length];
          const fromVars = { autoAlpha: 0 };
          fromVars[dir] = dir === 'x' ? (idx % 2 ? -40 : 40) : 50;
          gsap.set(el, fromVars);
          const toVars = { autoAlpha: 1, duration: 1.1, ease: 'power2.out' };
          toVars[dir] = 0;
          gsap.to(el, {
            ...toVars,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          });
        });

      // Features badges: reveal left-to-right order, animation drops from top (fall into place)
      const featuresList = qs('.features');
      if (featuresList) {
        const items = gsap.utils.toArray('.features li');
        gsap.set(items, { autoAlpha: 0, y: -32, transformOrigin: 'top center' });
        gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 0 }, // DOM order => left-to-right, then next row
          scrollTrigger: {
            trigger: featuresList,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        });
      }
    }
  
    // Accessories gallery data rendered from JS
    const categories = [
      { id: 'adapters', title: 'Adapters', img: '../img/adapter-1.png', products: [
        { title: 'USB-C 65W GaN Charger', img: 'https://images.unsplash.com/photo-1551727974-8af20a3322e0?w=1200&q=60&auto=format&fit=crop', specs: ['65W PD', 'Dual USB-C', 'EU plug'] },
        { title: 'USB-C to Lightning Cable', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=60&auto=format&fit=crop', specs: ['MFi certified', '1m length'] },
      ] },
      { id: 'cases', title: 'Cases', img: 'https://images.unsplash.com/photo-1585386959984-a4155223165e?w=800&q=70&auto=format&fit=crop', products: [
        { title: 'Shockproof Case', img: 'https://images.unsplash.com/photo-1520975922284-7b99cf8c4f68?w=1200&q=60&auto=format&fit=crop', specs: ['TPU', 'Raised edges'] },
        { title: 'Leather Case', img: 'https://images.unsplash.com/photo-1551727974-8af20a3322e0?w=1200&q=60&auto=format&fit=crop', specs: ['Genuine leather', 'MagSafe compatible'] },
      ] },
      { id: 'headphones', title: 'Headphones', img: 'https://images.unsplash.com/photo-1518442325758-8f018bd6f3b0?w=800&q=70&auto=format&fit=crop', products: [
        { title: 'Wireless ANC Headphones', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=60&auto=format&fit=crop', specs: ['Bluetooth 5.2', 'ANC'] },
        { title: 'In-ear Wired', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=60&auto=format&fit=crop', specs: ['3.5mm', 'Silicone tips'] },
      ] },
      { id: 'cables', title: 'Cables', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=70&auto=format&fit=crop', products: [
        { title: 'USB-C 3.2 Cable', img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=60&auto=format&fit=crop', specs: ['10Gbps', '100W'] },
        { title: 'HDMI 2.1 Cable', img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&q=60&auto=format&fit=crop', specs: ['8K', '48Gbps'] },
      ] },
      { id: 'powerbanks', title: 'Power Banks', img: 'https://images.unsplash.com/photo-1609599006353-81aa3c03a4fc?w=800&q=70&auto=format&fit=crop', products: [
        { title: '10000mAh Slim', img: 'https://images.unsplash.com/photo-1609599006353-81aa3c03a4fc?w=1200&q=60&auto=format&fit=crop', specs: ['20W PD', 'USB-C'] },
        { title: '20000mAh Pro', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=60&auto=format&fit=crop', specs: ['65W PD', 'Dual port'] },
      ] },
    ];
  
    const track = qs('#gallery-track');
    let currentIndex = 1; // start from second
    let initialLayoutDone = false;
  
    function renderCards() {
      if (!track) return;
      const total = categories.length;
      const gap = 24; // базовый зазор между центрами (добавится к полу-ширинам)
      const offsetX = Math.round(track.clientWidth * 0);
      const offsetY = Math.round(track.clientHeight * 0);

      // Build once, then only reposition on subsequent calls
      if (!initialLayoutDone) {
        track.innerHTML = '';
        track.classList.add('is-initial');
        categories.forEach((cat) => {
          const card = document.createElement('article');
          card.className = 'acc-card';
          card.innerHTML = `
            <div class="acc-media"><img src="${cat.img}" alt="${cat.title}" loading="lazy"/></div>
            <div class="acc-info">
              <h4>${cat.title}</h4>
              <button class="btn ghost" data-cat="${cat.id}">View</button>
            </div>
          `;
          track.appendChild(card);
        });
      }

      const elements = Array.from(track.querySelectorAll('.acc-card'));

      // Assign classes to compute natural widths for slide distance
      elements.forEach((card, idx) => {
        const rel = (idx - currentIndex + total) % total;
        let pos = rel;
        if (pos > total / 2) pos -= total;
        card.classList.remove('is-center', 'is-adjacent');
        if (pos === 0) card.classList.add('is-center');
        else if (Math.abs(pos) === 1) card.classList.add('is-adjacent');
      });

      const centerEl = track.querySelector('.acc-card.is-center') || elements[0];
      const adjEl = track.querySelector('.acc-card.is-adjacent') || elements[1] || elements[0];
      const centerW = centerEl ? centerEl.getBoundingClientRect().width : 0;
      const adjW = adjEl ? adjEl.getBoundingClientRect().width : 0;
      const slideDistance = Math.max(120, Math.round(centerW / 2 + gap + adjW / 2));

      // Position via CSS variables for smooth transitions
      elements.forEach((card, idx) => {
        const rel = (idx - currentIndex + total) % total;
        let pos = rel;
        if (pos > total / 2) pos -= total;

        let dx = 0;
        let dy = 0;
        let z = 1;
        let opacity = 1;
        let pe = 'auto';

        if (pos === 0) {
          dx = 0;
          dy = 0;
          z = 3;
          opacity = 1;
          pe = 'auto';
        } else if (Math.abs(pos) === 1) {
          const dir = pos < 0 ? -1 : 1;
          dx = dir * (Math.abs(pos) * slideDistance - offsetX);
          dy = -offsetY;
          z = 2;
          opacity = 1;
          pe = 'auto';
        } else {
          const dir = pos < 0 ? -1 : 1;
          const off = Math.abs(pos) * slideDistance;
          dx = dir * off;
          dy = 0;
          z = 1;
          opacity = 0;
          pe = 'none';
        }

      if (window.gsap) {
        if (window.CustomEase && !gsap.parseEase('gallerySoft')) {
          window.CustomEase.create('gallerySoft', 'M0,0 C0.08,0 0.12,0.02 0.16,0.06 0.24,0.14 0.3,0.26 0.38,0.38 0.46,0.5 0.55,0.64 0.66,0.76 0.76,0.88 0.88,0.96 1,1');
        }
          const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
          tl.to(card, { '--dx': `${dx}px`, '--dy': `${dy}px`, duration: 1.2, ease: 'gallerySoft' }, 0)
            .to(card, { opacity, filter: z === 2 ? 'brightness(0.9)' : 'none', duration: 1.2, ease: 'gallerySoft' }, 0);
        } else {
          card.style.setProperty('--dx', `${dx}px`);
          card.style.setProperty('--dy', `${dy}px`);
          card.style.opacity = String(opacity);
        }
        card.style.zIndex = String(z);
        card.style.pointerEvents = pe;
      });

      if (!initialLayoutDone) {
        // Allow the browser to paint initial state without transitions, then enable animations
        requestAnimationFrame(() => {
          track.classList.remove('is-initial');
          initialLayoutDone = true;
        });
      }
    }
    renderCards();

    // Reposition on resize
    window.addEventListener('resize', () => { renderCards(); });
  
    function move(dir) {
      currentIndex = (currentIndex + dir + categories.length) % categories.length;
      renderCards();
    }
    qs('.accessories-gallery .gallery-arrow.left')?.addEventListener('click', () => move(-1));
    qs('.accessories-gallery .gallery-arrow.right')?.addEventListener('click', () => move(1));
  
    // Swipe for gallery
    (function enableSwipe() {
      if (!track) return;
      let startX = 0;
      let delta = 0;
      track.addEventListener('pointerdown', (e) => {
        // Ignore when clicking interactive elements so clicks work (desktop)
        if (e.button !== undefined && e.button !== 0) return;
        if (e.target.closest('[data-cat]') || e.target.closest('button') || e.target.closest('a')) {
          startX = 0;
          delta = 0;
          return;
        }
        startX = e.clientX;
        delta = 0;
        try { track.setPointerCapture?.(e.pointerId); } catch (_) {}
      });
      track.addEventListener('pointermove', (e) => { if (!startX) return; delta = e.clientX - startX; });
      track.addEventListener('pointerup', (e) => {
        try { track.releasePointerCapture?.(e.pointerId); } catch (_) {}
        if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
        startX = 0; delta = 0;
      });
    })();
  
    // Open products modal from category card
  // Click handler for opening products modal (desktop/mobile)
  document.addEventListener('pointerup', (e) => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const catId = btn.getAttribute('data-cat');
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return;
    openProductsModal(cat);
  }, { passive: false });
  
    let productsSwiper;
    function openProductsModal(cat) {
      if (!productsModal) return;
      productsWrapper.innerHTML = '';
      cat.products.forEach((p) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
          <article class="product-card">
            <div class="product-media"><img src="${p.img}" alt="${p.title}"></div>
            <div class="product-card-content">
              <h4>${p.title}</h4>
              <p>${(p.desc || 'High quality accessory for your device.')}</p>
              <ul>${(p.specs || []).map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
          </article>
        `;
        productsWrapper.appendChild(slide);
      });
      // Add placeholder slides to enrich modal
      for (let i = 0; i < 3; i++) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
          <article class="product-card">
            <div class="product-media"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=60&auto=format&fit=crop" alt="Placeholder"></div>
            <div class="product-card-content">
              <h4>Placeholder Item ${i + 1}</h4>
              <p>Sample description for the accessory product.</p>
              <ul><li>Spec A</li><li>Spec B</li><li>Spec C</li></ul>
            </div>
          </article>
        `;
        productsWrapper.appendChild(slide);
      }
      openModal(productsModal);
      // Create/Update swiper
      if (productsSwiper) { productsSwiper.update(); }
      else {
        productsSwiper = new Swiper('.products-swiper', {
          slidesPerView: 1,
          spaceBetween: 12,
          loop: true,
          navigation: { nextEl: '.products-swiper .swiper-button-next', prevEl: '.products-swiper .swiper-button-prev' },
        });
      }
    }
  
    // Generic open/close modal helpers
    function openModal(modal) {
      if (!window.gsap) {
        modal.setAttribute('aria-hidden', 'false');
        return;
      }
      const { gsap } = window;
      modal.setAttribute('aria-hidden', 'false');
      const win = qs('.modal-window', modal);
      const backdrop = qs('.modal-backdrop', modal);
      gsap.set(win, { y: 18, scale: 0.96, opacity: 0 });
      gsap.set(backdrop, { opacity: 0 });
      gsap.to(backdrop, { opacity: 1, duration: 0.35, ease: 'power1.out' });
      gsap.to(win, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' });
    }
    function closeModal(modal) {
      if (!window.gsap) {
        modal.setAttribute('aria-hidden', 'true');
        return;
      }
      const { gsap } = window;
      const win = qs('.modal-window', modal);
      const backdrop = qs('.modal-backdrop', modal);
      gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power1.in' });
      gsap.to(win, { y: 12, scale: 0.98, opacity: 0, duration: 0.35, ease: 'power1.in', onComplete: () => modal.setAttribute('aria-hidden', 'true') });
    }
  
    // Open feedback modal by attribute
    qsa('[data-open="feedback-modal"]').forEach((btn) => btn.addEventListener('click', () => openModal(feedbackModal)));
  
    // Close modals by X or backdrop click
    qsa('.modal').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target.matches('[data-close]')) closeModal(modal);
      });
    });

  // Modal close button hover in/out rotation
  qsa('.modal .modal-close').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.remove('is-rotating-out');
      // restart animation
      // eslint-disable-next-line no-unused-expressions
      btn.offsetWidth;
      btn.classList.add('is-rotating-in');
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('is-rotating-in');
      // restart animation
      // eslint-disable-next-line no-unused-expressions
      btn.offsetWidth;
      btn.classList.add('is-rotating-out');
    });
  });
  
    // Submit handlers for forms: show confirmation with 3s ring
    function handleSubmit(e) {
      e.preventDefault();
      const modal = e.target.closest('.modal');
      if (modal) closeModal(modal);
      startConfirmCountdown();
    }
    feedbackForm?.addEventListener('submit', handleSubmit);
    inlineFeedbackForm?.addEventListener('submit', handleSubmit);
  
    let confirmTimer;
    function startConfirmCountdown() {
      openModal(confirmModal);
      // 3 seconds progress
      const duration = 3000;
      const start = performance.now();
      cancelAnimationFrame(confirmTimer);
      (function frame(t) {
        const elapsed = Math.min(t - start, duration);
        const p = Math.round((elapsed / duration) * 100);
        progressRing && (progressRing.style.setProperty('--p', p));
        if (elapsed < duration) confirmTimer = requestAnimationFrame(frame); else closeModal(confirmModal);
      })(start);
    }
    confirmClose?.addEventListener('click', () => closeModal(confirmModal));
  
    // Smooth scroll on same-page links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = qs(id);
      if (!target) return;
      e.preventDefault();
      if (window.gsap && window.ScrollToPlugin) {
        window.gsap.to(window, { duration: 0.6, scrollTo: target, ease: 'power2.out' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Ripple origin on hover for buttons-like elements (set CSS vars --x/--y)
    document.addEventListener('mousemove', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--x', `${e.clientX - r.left}px`);
      btn.style.setProperty('--y', `${e.clientY - r.top}px`);
    }, { passive: true });

    // Ripple origin for lang and phone buttons too
    document.addEventListener('mousemove', (e) => {
      const el = e.target.closest('.lang-btn, .cta-phone');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    }, { passive: true });
  
    // Swipe support for Swiper already included by Swiper itself
  })();