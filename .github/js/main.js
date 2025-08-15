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
  let currentLang = 'en';
  // i18n dictionaries
  const I18N = {
    en: {
      'menu.title': 'Menu',
      'menu.general': 'General',
      'menu.repair': 'Repair',
      'menu.store': 'Store',
      'menu.about': 'About us',
      'menu.contacts': 'Contacts',
      'menu.phone': 'Phone',
      'menu.address': 'Address',
      'menu.address_value': 'City, Main Street, 42',
      'hero.title': 'Your Tech, Restored. Your Life, Uninterrupted.',
      'hero.subtitle': 'Seamless Solutions for Every Device.',
      'hero.cta': 'Get a quote',
      'repair.title': 'Repair',
      'repair.cta.phone': 'Fix my phone',
      'repair.cta.tablet': 'Fix my tablet',
      'repair.cta.laptop': 'Fix my laptop',
      'repair.cta.pc': 'Fix my PC',
      'store.intro.title': 'Elevate Your Tech: Premium Accessories & Essential Components',
      'store.intro.body': "Welcome to our comprehensive online store, your ultimate destination for high-quality gadget accessories and essential repair components. We understand that your devices are integral to your daily life, and protecting them, enhancing their functionality, or bringing them back to peak performance is paramount. That's why we've meticulously curated a diverse selection of products designed to meet every need of the modern tech user.",
      'about.intro.title': 'Our Story: Passion for Tech, Commitment to You',
      'about.intro.body': 'At Neoconsult, our journey began with a simple yet profound passion: a deep appreciation for technology and a steadfast commitment to keeping your digital life running smoothly. In an era where smartphones, tablets, laptops, and computers are not just tools but extensions of ourselves, we understand the frustration and disruption that a malfunctioning device can cause. This understanding is the cornerstone of our mission: to provide reliable, efficient, and accessible gadget repair services and high-quality accessories that empower you to stay connected, productive, and entertained.',
      'features.free_diag': 'Free diagnostics',
      'features.warranty': '2-year warranty',
      'features.home_service': 'Home service',
      'features.specialists': 'Best specialists',
      'features.original_parts': 'Original spare parts',
      'features.support': 'Advanced support',
      'promotions.banner': 'Seasonal Offer: 10% off screen replacements this month.',
      'contacts.title': 'Get in touch',
      'form.name': 'Name',
      'form.phone': 'Phone',
      'form.desc': 'Short description',
      'form.placeholder': 'Up to 70 characters',
      'form.send': 'Send',
      'footer.feedback': 'Feedback',
      'modal.feedback.title': 'Feedback',
      'confirm.title': 'Thank you!',
      'confirm.desc': 'A manager will contact you within 5–10 minutes.',
      'confirm.close': 'Close',
      'products.title': 'Products',
      // Gallery i18n
      'gallery.view': 'View',
      'gallery.cat.adapters': 'Adapters',
      'gallery.cat.cases': 'Cases',
      'gallery.cat.headphones': 'Headphones',
      'gallery.cat.cables': 'Cables',
      'gallery.cat.powerbanks': 'Powerbanks',
      // Product i18n (keys referenced in code)
      'products.adapters.gan65.title': 'USB-C 65W GaN Charger',
      'products.adapters.gan65.desc': 'High quality accessory for your device.',
      'products.adapters.gan65.specs.0': '65W PD',
      'products.adapters.gan65.specs.1': 'Dual USB-C',
      'products.adapters.gan65.specs.2': 'EU plug',
      'products.adapters.c2l.title': 'USB-C to Lightning Cable',
      'products.adapters.c2l.desc': 'High quality accessory for your device.',
      'products.adapters.c2l.specs.0': 'MFi certified',
      'products.adapters.c2l.specs.1': '1m length',
      'products.cases.shock.title': 'Shockproof Case',
      'products.cases.shock.desc': 'High quality accessory for your device.',
      'products.cases.shock.specs.0': 'TPU',
      'products.cases.shock.specs.1': 'Raised edges',
      'products.cases.leather.title': 'Leather Case',
      'products.cases.leather.desc': 'High quality accessory for your device.',
      'products.cases.leather.specs.0': 'Genuine leather',
      'products.cases.leather.specs.1': 'MagSafe compatible',
      'products.headphones.anc.title': 'Wireless ANC Headphones',
      'products.headphones.anc.desc': 'High quality accessory for your device.',
      'products.headphones.anc.specs.0': 'Bluetooth 5.2',
      'products.headphones.anc.specs.1': 'ANC',
      'products.headphones.inear.title': 'In-ear Wired',
      'products.headphones.inear.desc': 'High quality accessory for your device.',
      'products.headphones.inear.specs.0': '3.5mm',
      'products.headphones.inear.specs.1': 'Silicone tips',
      'products.cables.usbc32.title': 'USB-C 3.2 Cable',
      'products.cables.usbc32.desc': 'High quality accessory for your device.',
      'products.cables.usbc32.specs.0': '10Gbps',
      'products.cables.usbc32.specs.1': '100W',
      'products.cables.hdmi21.title': 'HDMI 2.1 Cable',
      'products.cables.hdmi21.desc': 'High quality accessory for your device.',
      'products.cables.hdmi21.specs.0': '8K',
      'products.cables.hdmi21.specs.1': '48Gbps',
      'products.powerbanks.pb10k.title': '10000mAh Slim',
      'products.powerbanks.pb10k.desc': 'High quality accessory for your device.',
      'products.powerbanks.pb10k.specs.0': '20W PD',
      'products.powerbanks.pb10k.specs.1': 'USB-C',
      'products.powerbanks.pb20k.title': '20000mAh Pro',
      'products.powerbanks.pb20k.desc': 'High quality accessory for your device.',
      'products.powerbanks.pb20k.specs.0': '65W PD',
      'products.powerbanks.pb20k.specs.1': 'Dual port',
    },
    ru: {
      'menu.title': 'Меню',
      'menu.general': 'Главная',
      'menu.repair': 'Ремонт',
      'menu.store': 'Магазин',
      'menu.about': 'О нас',
      'menu.contacts': 'Контакты',
      'menu.phone': 'Телефон',
      'menu.address': 'Адрес',
      'menu.address_value': 'Город, Главная улица, 42',
      'hero.title': 'Ваша техника — как новая. Ваша жизнь — без перерывов.',
      'hero.subtitle': 'Бесшовные решения для любого устройства.',
      'hero.cta': 'Рассчитать стоимость',
      'repair.title': 'Ремонт',
      'repair.cta.phone': 'Починить телефон',
      'repair.cta.tablet': 'Починить планшет',
      'repair.cta.laptop': 'Починить ноутбук',
      'repair.cta.pc': 'Починить ПК',
      'store.intro.title': 'Ваши устройства на высоте: аксессуары и комплектующие',
      'store.intro.body': 'Добро пожаловать в наш онлайн-магазин — место, где вы найдёте качественные аксессуары и необходимые комплектующие для ремонта. Мы понимаем, насколько важны гаджеты в повседневной жизни, поэтому тщательно подобрали ассортимент, который поможет защитить устройства, расширить их возможности и вернуть им максимум производительности.',
      'about.intro.title': 'О нас: страсть к технологиям и забота о вас',
      'about.intro.body': 'Наша история началась с искренней любви к технологиям и стремления поддерживать вашу цифровую жизнь. Мы знаем, как неприятна поломка устройства, поэтому наша миссия — предоставлять надёжный ремонт и качественные аксессуары, которые помогают оставаться на связи, работать продуктивно и отдыхать с удовольствием.',
      'features.free_diag': 'Бесплатная диагностика',
      'features.warranty': 'Гарантия 2 года',
      'features.home_service': 'Выезд на дом',
      'features.specialists': 'Лучшие специалисты',
      'features.original_parts': 'Оригинальные запчасти',
      'features.support': 'Расширенная поддержка',
      'promotions.banner': 'Специальное предложение: скидка 10% на замену экрана в этом месяце.',
      'contacts.title': 'Свяжитесь с нами',
      'form.name': 'Имя',
      'form.phone': 'Телефон',
      'form.desc': 'Краткое описание',
      'form.placeholder': 'До 70 символов',
      'form.send': 'Отправить',
      'footer.feedback': 'Обратная связь',
      'modal.feedback.title': 'Обратная связь',
      'confirm.title': 'Спасибо!',
      'confirm.desc': 'Менеджер свяжется с вами в течение 5–10 минут.',
      'confirm.close': 'Закрыть',
      'products.title': 'Товары',
      // Gallery i18n
      'gallery.view': 'Смотреть',
      'gallery.cat.adapters': 'Адаптеры',
      'gallery.cat.cases': 'Чехлы',
      'gallery.cat.headphones': 'Наушники',
      'gallery.cat.cables': 'Кабели',
      'gallery.cat.powerbanks': 'Пауэрбанки',
      // Product i18n
      'products.adapters.gan65.title': 'USB-C 65Вт GaN зарядное устройство',
      'products.adapters.gan65.desc': 'Качественный аксессуар для вашего устройства.',
      'products.adapters.gan65.specs.0': 'PD 65Вт',
      'products.adapters.gan65.specs.1': 'Два USB-C',
      'products.adapters.gan65.specs.2': 'Евровилка',
      'products.adapters.c2l.title': 'Кабель USB-C — Lightning',
      'products.adapters.c2l.desc': 'Качественный аксессуар для вашего устройства.',
      'products.adapters.c2l.specs.0': 'Сертификация MFi',
      'products.adapters.c2l.specs.1': 'Длина 1 м',
      'products.cases.shock.title': 'Ударопрочный чехол',
      'products.cases.shock.desc': 'Качественный аксессуар для вашего устройства.',
      'products.cases.shock.specs.0': 'TPU',
      'products.cases.shock.specs.1': 'Приподнятые бортики',
      'products.cases.leather.title': 'Кожаный чехол',
      'products.cases.leather.desc': 'Качественный аксессуар для вашего устройства.',
      'products.cases.leather.specs.0': 'Натуральная кожа',
      'products.cases.leather.specs.1': 'Совместим с MagSafe',
      'products.headphones.anc.title': 'Беспроводные наушники с ANC',
      'products.headphones.anc.desc': 'Качественный аксессуар для вашего устройства.',
      'products.headphones.anc.specs.0': 'Bluetooth 5.2',
      'products.headphones.anc.specs.1': 'Шумоподавление',
      'products.headphones.inear.title': 'Вкладыши проводные',
      'products.headphones.inear.desc': 'Качественный аксессуар для вашего устройства.',
      'products.headphones.inear.specs.0': 'Разъем 3.5 мм',
      'products.headphones.inear.specs.1': 'Силиконовые амбушюры',
      'products.cables.usbc32.title': 'Кабель USB-C 3.2',
      'products.cables.usbc32.desc': 'Качественный аксессуар для вашего устройства.',
      'products.cables.usbc32.specs.0': '10 Гбит/с',
      'products.cables.usbc32.specs.1': '100 Вт',
      'products.cables.hdmi21.title': 'Кабель HDMI 2.1',
      'products.cables.hdmi21.desc': 'Качественный аксессуар для вашего устройства.',
      'products.cables.hdmi21.specs.0': '8K',
      'products.cables.hdmi21.specs.1': '48 Гбит/с',
      'products.powerbanks.pb10k.title': '10000 мА·ч Slim',
      'products.powerbanks.pb10k.desc': 'Качественный аксессуар для вашего устройства.',
      'products.powerbanks.pb10k.specs.0': 'PD 20Вт',
      'products.powerbanks.pb10k.specs.1': 'USB-C',
      'products.powerbanks.pb20k.title': '20000 мА·ч Pro',
      'products.powerbanks.pb20k.desc': 'Качественный аксессуар для вашего устройства.',
      'products.powerbanks.pb20k.specs.0': 'PD 65Вт',
      'products.powerbanks.pb20k.specs.1': 'Два порта',
    },
    ro: {
      'menu.title': 'Meniu',
      'menu.general': 'Acasă',
      'menu.repair': 'Reparații',
      'menu.store': 'Magazin',
      'menu.about': 'Despre noi',
      'menu.contacts': 'Contacte',
      'menu.phone': 'Telefon',
      'menu.address': 'Adresă',
      'menu.address_value': 'Oraș, Strada Principală, 42',
      'hero.title': 'Tehnologia ta, ca nouă. Viața ta, fără întreruperi.',
      'hero.subtitle': 'Soluții fără cusur pentru orice dispozitiv.',
      'hero.cta': 'Cere ofertă',
      'repair.title': 'Reparații',
      'repair.cta.phone': 'Repară telefonul',
      'repair.cta.tablet': 'Repară tableta',
      'repair.cta.laptop': 'Repară laptopul',
      'repair.cta.pc': 'Repară PC-ul',
      'store.intro.title': 'Ridică-ți tehnologia: accesorii premium și componente esențiale',
      'store.intro.body': 'Bine ai venit în magazinul nostru online, destinația ta pentru accesorii de calitate și componente esențiale pentru reparații. Înțelegem cât de importante sunt dispozitivele în viața de zi cu zi, de aceea am selectat cu grijă produse care protejează, îmbunătățesc funcționalitatea și readuc performanța maximă.',
      'about.intro.title': 'Povestea noastră: pasiune pentru tehnologie, dedicare pentru tine',
      'about.intro.body': 'Povestea noastră a început din pasiunea pentru tehnologie și dorința de a-ți susține viața digitală. Știm cât de deranjantă este o defecțiune, de aceea misiunea noastră este să oferim reparații de încredere și accesorii de calitate, ca tu să rămâi conectat, productiv și relaxat.',
      'features.free_diag': 'Diagnosticare gratuită',
      'features.warranty': 'Garanție 2 ani',
      'features.home_service': 'Serviciu la domiciliu',
      'features.specialists': 'Cei mai buni specialiști',
      'features.original_parts': 'Piese originale',
      'features.support': 'Asistență avansată',
      'promotions.banner': 'Ofertă sezonieră: reducere 10% la înlocuirea ecranului în această lună.',
      'contacts.title': 'Contactează-ne',
      'form.name': 'Nume',
      'form.phone': 'Telefon',
      'form.desc': 'Descriere scurtă',
      'form.placeholder': 'Până la 70 de caractere',
      'form.send': 'Trimite',
      'footer.feedback': 'Feedback',
      'modal.feedback.title': 'Feedback',
      'confirm.title': 'Mulțumim!',
      'confirm.desc': 'Un manager te va contacta în 5–10 minute.',
      'confirm.close': 'Închide',
      'products.title': 'Produse',
      // Gallery i18n
      'gallery.view': 'Vezi',
      'gallery.cat.adapters': 'Adaptatoare',
      'gallery.cat.cases': 'Huse',
      'gallery.cat.headphones': 'Căști',
      'gallery.cat.cables': 'Cabluri',
      'gallery.cat.powerbanks': 'Baterii externe',
      // Product i18n
      'products.adapters.gan65.title': 'Încărcător USB-C 65W GaN',
      'products.adapters.gan65.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.adapters.gan65.specs.0': 'PD 65W',
      'products.adapters.gan65.specs.1': 'Dual USB-C',
      'products.adapters.gan65.specs.2': 'Priză UE',
      'products.adapters.c2l.title': 'Cablu USB-C la Lightning',
      'products.adapters.c2l.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.adapters.c2l.specs.0': 'Certificat MFi',
      'products.adapters.c2l.specs.1': 'Lungime 1m',
      'products.cases.shock.title': 'Husă rezistentă la șocuri',
      'products.cases.shock.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.cases.shock.specs.0': 'TPU',
      'products.cases.shock.specs.1': 'Margini ridicate',
      'products.cases.leather.title': 'Husă din piele',
      'products.cases.leather.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.cases.leather.specs.0': 'Piele naturală',
      'products.cases.leather.specs.1': 'Compatibilă MagSafe',
      'products.headphones.anc.title': 'Căști wireless cu ANC',
      'products.headphones.anc.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.headphones.anc.specs.0': 'Bluetooth 5.2',
      'products.headphones.anc.specs.1': 'ANC',
      'products.headphones.inear.title': 'Căști intraauriculare cu fir',
      'products.headphones.inear.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.headphones.inear.specs.0': 'Jack 3.5mm',
      'products.headphones.inear.specs.1': 'Dopuri din silicon',
      'products.cables.usbc32.title': 'Cablu USB-C 3.2',
      'products.cables.usbc32.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.cables.usbc32.specs.0': '10Gbps',
      'products.cables.usbc32.specs.1': '100W',
      'products.cables.hdmi21.title': 'Cablu HDMI 2.1',
      'products.cables.hdmi21.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.cables.hdmi21.specs.0': '8K',
      'products.cables.hdmi21.specs.1': '48Gbps',
      'products.powerbanks.pb10k.title': '10000mAh Slim',
      'products.powerbanks.pb10k.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.powerbanks.pb10k.specs.0': 'PD 20W',
      'products.powerbanks.pb10k.specs.1': 'USB-C',
      'products.powerbanks.pb20k.title': '20000mAh Pro',
      'products.powerbanks.pb20k.desc': 'Accesoriu de înaltă calitate pentru dispozitivul tău.',
      'products.powerbanks.pb20k.specs.0': 'PD 65W',
      'products.powerbanks.pb20k.specs.1': 'Port dublu',
    },
  };

  function t(key) {
    const dict = I18N[currentLang] || I18N.en;
    return dict[key] || (I18N.en && I18N.en[key]) || '';
  }

  function applyI18n(lang) {
    const dict = I18N[lang] || I18N.en;
    currentLang = (lang && I18N[lang]) ? lang : 'en';
    qsa('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = dict[key];
      if (typeof val === 'string') el.textContent = val;
    });
    qsa('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = dict[key];
      if (typeof val === 'string') el.setAttribute('placeholder', val);
    });
    try { renderCards(); } catch (_) {}
  }
  langBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = langSwitch.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(open));
    langBtn.classList.toggle('is-active', open);
    if (langList) {
      if (open) {
        // раскрываем из размера кнопки до авто-высоты
        const targetHeight = Math.min(200, Math.max(155, langList.scrollHeight + 8));
        langList.style.height = '0px';
        langList.style.opacity = '0';
        langList.offsetHeight; // force reflow
        langList.style.height = targetHeight + 'px';
        langList.style.opacity = '1';
      } else {
        langList.style.height = '0px';
        langList.style.opacity = '0';
      }
    }
  });
  langList?.addEventListener('click', (e) => {
    e.stopPropagation();
    const li = e.target.closest('li');
    if (!li) return;
    langBtn.textContent = li.dataset.lang?.toUpperCase() || 'EN';
    // Apply i18n by selected language
    const selected = (li.dataset.lang || 'en');
    try { applyI18n(selected); } catch (_) {}
    langSwitch.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
    langBtn.classList.remove('is-active');
    if (langList) {
      langList.style.height = '0px';
      langList.style.opacity = '0';
    }
  });
  document.addEventListener('click', (e) => {
    if (!langSwitch?.contains(e.target)) {
      langSwitch?.classList.remove('open');
      langBtn?.setAttribute('aria-expanded', 'false');
      langBtn?.classList.remove('is-active');
      if (langList) {
        langList.style.height = '0px';
        langList.style.opacity = '0';
      }
    }
  });

  // Initial language from button text (EN/RU/RO), default EN
  try { applyI18n((langBtn?.textContent || 'EN').trim().toLowerCase()); } catch (_) {}
  
  // Recompute gallery layout once fonts (including Cyrillic/Romanian subsets) are loaded
  try {
    const preload = [];
    if (document.fonts?.load) {
      preload.push(document.fonts.ready);
      preload.push(document.fonts.load('16px "Montserrat"', 'ЯяЖжĂăÎîȘșȚț'));
      preload.push(document.fonts.load('16px "Unbounded"', 'ЯяЖжĂăÎîȘșȚț'));
    }
    Promise.all(preload).then(() => { try { renderCards(); } catch (_) {} });
    window.addEventListener('load', () => { try { renderCards(); } catch (_) {} });
  } catch (_) {}

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

  // Reveal slide button late in the transition (starts 0.4s before end, lasts 0.6s)
  (function attachRepairButtonReveal() {
    const swiperEl = qs('.repair-swiper');
    if (!swiperEl || !repairSwiper) return;
    const REVEAL_OFFSET_MS = 400; // start 0.4s before transition end
    let timerId;

    function scheduleReveal() {
      const duration = (repairSwiper.params.speed || 900);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        // Remove from all slides, then add to active
        qsa('.repair .swiper-slide.is-btn-visible').forEach((s) => s.classList.remove('is-btn-visible'));
        const active = swiperEl.querySelector('.swiper-slide-active');
        active && active.classList.add('is-btn-visible');
      }, Math.max(0, duration - REVEAL_OFFSET_MS));
    }

    // Initially hide all, schedule for first active
    qsa('.repair .swiper-slide').forEach((s) => s.classList.remove('is-btn-visible'));
    // After init, schedule first reveal
    repairSwiper.on('init', scheduleReveal);
    // On slide change start, reschedule
    repairSwiper.on('slideChangeTransitionStart', () => {
      qsa('.repair .swiper-slide.is-btn-visible').forEach((s) => s.classList.remove('is-btn-visible'));
      scheduleReveal();
    });
    // Swiper 10 requires calling init manually only if init: false; here it's auto-initialized
    // Ensure first reveal as well
    scheduleReveal();
  })();

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

    // Store intro image: reveal from right to left (x: 40 -> 0)
    const storeIntroMedia = qs('.store .store-intro-media');
    if (storeIntroMedia) {
      gsap.set(storeIntroMedia, { autoAlpha: 0, x: 40 });
      gsap.to(storeIntroMedia, {
        autoAlpha: 1,
        x: 0,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: storeIntroMedia,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }
  }

  // Accessories gallery data rendered from JS
  const categories = [
    { id: 'adapters', title: 'gallery.cat.adapters', img: './img/adapter-1.png', products: [
      { key: 'products.adapters.gan65', img: 'https://images.unsplash.com/photo-1551727974-8af20a3322e0?w=1200&q=60&auto=format&fit=crop', specs: ['0','1','2'] },
      { key: 'products.adapters.c2l', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
    ] },
    { id: 'cases', title: 'gallery.cat.cases', img: './img/cases-1.png', products: [
      { key: 'products.cases.shock', img: 'https://images.unsplash.com/photo-1520975922284-7b99cf8c4f68?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
      { key: 'products.cases.leather', img: 'https://images.unsplash.com/photo-1551727974-8af20a3322e0?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
    ] },
    { id: 'headphones', title: 'gallery.cat.headphones', img: './img/headphones-1.png', products: [
      { key: 'products.headphones.anc', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
      { key: 'products.headphones.inear', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
    ] },
    { id: 'cables', title: 'gallery.cat.cables', img: './img/cable-1.png', products: [
      { key: 'products.cables.usbc32', img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
      { key: 'products.cables.hdmi21', img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
    ] },
    { id: 'powerbanks', title: 'gallery.cat.powerbanks', img: './img/powerbank-1.png', products: [
      { key: 'products.powerbanks.pb10k', img: 'https://images.unsplash.com/photo-1609599006353-81aa3c03a4fc?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
      { key: 'products.powerbanks.pb20k', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=60&auto=format&fit=crop', specs: ['0','1'] },
    ] },
  ];

  const track = qs('#gallery-track');
  let currentIndex = 1; // start from second
  let initialLayoutDone = false;

  function renderCards() {
    if (!track) return;
    const total = categories.length;
    // Tablet landscape: tighten spacing so side cards don't overlap arrow buttons
    const isTabletLandscape = window.matchMedia('(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)').matches;
    const gap = isTabletLandscape ? 16 : 24; // немного уменьшаем базовый зазор на планшетах горизонтально
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
            <div class="acc-media"><img src="${cat.img}" alt="${t(cat.title)}" loading="lazy"/></div>
            <div class="acc-title"><span class="acc-title-text">${t(cat.title)}</span></div>
            <div class="acc-info">
              <button class="btn ghost" data-cat="${cat.id}">${t('gallery.view')}</button>
            </div>
          `;
          track.appendChild(card);
        });
    }

    const elements = Array.from(track.querySelectorAll('.acc-card'));

    // Update titles and buttons on language change
    elements.forEach((card, idx) => {
      const cat = categories[idx];
      if (!cat) return;
      const titleEl = card.querySelector('.acc-title-text');
      const mediaImg = card.querySelector('.acc-media img');
      const btn = card.querySelector('button[data-cat]');
      if (titleEl) titleEl.textContent = t(cat.title);
      if (mediaImg) mediaImg.alt = t(cat.title);
      if (btn) btn.textContent = t('gallery.view');
    });

    // Compute and set curtain width per card based on full title width (layout width, not transformed)
    elements.forEach((card) => {
      const titleEl = card.querySelector('.acc-title-text');
      const curtain = card.querySelector('.acc-title');
      if (!titleEl || !curtain) return;
      const title = titleEl.textContent || '';
      if (!title) return;
      // Create a measurer element so offsetWidth is unaffected by CSS transforms
      const measurer = document.createElement('span');
      measurer.style.position = 'absolute';
      measurer.style.visibility = 'hidden';
      measurer.style.whiteSpace = 'nowrap';
      measurer.style.left = '-9999px';
      measurer.style.top = '0';
      measurer.style.font = 'inherit';
      measurer.style.fontSize = getComputedStyle(titleEl).fontSize;
      measurer.style.fontFamily = getComputedStyle(titleEl).fontFamily;
      card.appendChild(measurer);
      measurer.textContent = title;
      // Include subpixel width to avoid rounding bias; fall back to offsetWidth
      const rect = measurer.getBoundingClientRect();
      const textWidth = rect.width || measurer.offsetWidth; // layout width, not affected by transforms
      measurer.remove();
      // Rely on CSS max-content; only set minimum width to avoid jitter at start
      const minW = Math.max(80, Math.ceil(textWidth * 0.82));
      card.style.setProperty('--curtain-w', minW + 'px');
      // Measure curtain height for reliable button positioning
      // Force reflow after width set, then read height
      const _ = curtain.offsetHeight; // eslint-disable-line no-unused-vars
      const curtainHeight = curtain.getBoundingClientRect().height;
      card.style.setProperty('--curtain-h', Math.ceil(curtainHeight) + 'px');
    });

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
    let slideDistance = Math.max(120, Math.round(centerW / 2 + gap + adjW / 2));
    // На планшетах в горизонтальной ориентации немного сдвигаем соседние карточки ближе к центру
    if (isTabletLandscape) slideDistance = Math.round(slideDistance * 0.9);

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
        const targetScale = (pos === 0) ? 1.3 : (Math.abs(pos) === 1 ? 0.95 : 0.85);
        const targetBright = (pos === 0) ? 1 : (Math.abs(pos) === 1 ? 0.9 : 0.85);
        tl.to(card, { '--dx': `${dx}px`, '--dy': `${dy}px`, duration: 1.2, ease: 'gallerySoft' }, 0)
          .to(card, { '--scale': targetScale, duration: 1.2, ease: 'gallerySoft' }, 0)
          .to(card, { '--bright': targetBright, opacity, duration: 1.2, ease: 'gallerySoft' }, 0);
      } else {
        card.style.setProperty('--dx', `${dx}px`);
        card.style.setProperty('--dy', `${dy}px`);
        const targetScale = (pos === 0) ? 1.3 : (Math.abs(pos) === 1 ? 0.95 : 0.85);
        card.style.setProperty('--scale', String(targetScale));
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
    let dragging = false;
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
      dragging = true;
      track.classList.add('is-dragging');
      try {
        e.preventDefault();
        track.setPointerCapture?.(e.pointerId);
      } catch (_) {}
    });
    track.addEventListener('pointermove', (e) => { if (!startX) return; delta = e.clientX - startX; });
    track.addEventListener('pointerup', (e) => {
      try { track.releasePointerCapture?.(e.pointerId); } catch (_) {}
      if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
      dragging = false;
      track.classList.remove('is-dragging');
      startX = 0; delta = 0;
    });
    track.addEventListener('pointercancel', () => { dragging = false; track.classList.remove('is-dragging'); startX = 0; delta = 0; });
    track.addEventListener('mouseleave', () => { if (!dragging) return; dragging = false; track.classList.remove('is-dragging'); startX = 0; delta = 0; });
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
      const title = t(`${p.key}.title`);
      const desc = t(`${p.key}.desc`) || t('products.desc') || 'High quality accessory for your device.';
      const specsList = (p.specs || []).map((idx) => `<li>${t(`${p.key}.specs.${idx}`)}</li>`).join('');
      slide.innerHTML = `
        <article class="product-card">
          <div class="product-media"><img src="${p.img}" alt="${title}"></div>
          <div class="product-card-content">
            <h4>${title}</h4>
            <p>${desc}</p>
            <ul>${specsList}</ul>
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
      // Lock page scroll only for products modal
      if (modal === productsModal) { 
        body.classList.add('modal-open');
        try { window.ScrollSmoother?.get()?.paused(true); } catch (_) {}
      }
      return;
    }
    const { gsap } = window;
    modal.setAttribute('aria-hidden', 'false');
    // Lock page scroll only for products modal
    if (modal === productsModal) { 
      body.classList.add('modal-open');
      try { window.ScrollSmoother?.get()?.paused(true); } catch (_) {}
    }
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
      if (modal === productsModal) { 
        body.classList.remove('modal-open');
        try { window.ScrollSmoother?.get()?.paused(false); } catch (_) {}
      }
      return;
    }
    const { gsap } = window;
    const win = qs('.modal-window', modal);
    const backdrop = qs('.modal-backdrop', modal);
    gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power1.in' });
    gsap.to(win, { y: 12, scale: 0.98, opacity: 0, duration: 0.35, ease: 'power1.in', onComplete: () => {
      modal.setAttribute('aria-hidden', 'true');
      if (modal === productsModal) { 
        body.classList.remove('modal-open');
        try { window.ScrollSmoother?.get()?.paused(false); } catch (_) {}
      }
    } });
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
  document.addEventListener('mouseenter', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    // Initialize ripple origin to cursor position on entry
    btn.style.setProperty('--x', `${(e.clientX ?? (r.left + r.width/2)) - r.left}px`);
    btn.style.setProperty('--y', `${(e.clientY ?? (r.top + r.height/2)) - r.top}px`);
  }, true);

    // Ripple origin for lang and phone buttons too
    document.addEventListener('mousemove', (e) => {
      const el = e.target.closest('.lang-btn, .cta-phone');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    }, { passive: true });
    document.addEventListener('mouseenter', (e) => {
      const el = e.target.closest('.lang-btn, .cta-phone');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${(e.clientX ?? (r.left + r.width/2)) - r.left}px`);
      el.style.setProperty('--y', `${(e.clientY ?? (r.top + r.height/2)) - r.top}px`);
    }, true);

  // Swipe support for Swiper already included by Swiper itself
})();