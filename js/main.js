(() => {
  const data = window.BOZORGMEHR_DATA;
  const root = document.documentElement;
  const body = document.body;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  let lang = localStorage.getItem('bozorgmehr-lang') || 'fa';
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const toLocaleDigits = (value) => lang === 'fa' ? String(value).replace(/\d/g, (digit) => persianDigits[digit]) : String(value);
  const setImageFallback = (image) => { image.classList.add('image-fallback'); image.removeAttribute('src'); };

  function applyLanguage(next) {
    lang = next;
    const t = data.translations[lang];
    root.lang = t.lang; root.dir = t.dir;
    document.title = t.pageTitle;
    $$('.i18n').forEach((el) => { const key = el.dataset.i18n; if (t[key] !== undefined) el.innerHTML = t[key]; });
    $$('.lang-label').forEach((el) => el.textContent = t.switchLabel);
    $$('.lang-toggle').forEach((el) => el.setAttribute('aria-label', `Switch to ${t.switchLabel}`));
    $$('.menu-card').forEach((card) => {
      const item = data.menus.find((m) => m.id === card.dataset.id);
      card.querySelector('.menu-name').textContent = lang === 'fa' ? item.fa : item.en;
      card.querySelector('.menu-description').textContent = lang === 'fa' ? item.descFa : item.descEn;
    });
    $$('.year-start').forEach((el) => el.textContent = toLocaleDigits(1976));
    $$('.year-end').forEach((el) => el.textContent = toLocaleDigits(2026));
    $$('.menu-kicker').forEach((el, index) => { const n = toLocaleDigits(String(index + 1).padStart(2, '0')); el.textContent = `${n} / ${toLocaleDigits('07')}`; });
    localStorage.setItem('bozorgmehr-lang', lang);
  }

  function renderMenus() {
    const grid = $('.menu-grid');
    grid.innerHTML = data.menus.map((item, index) => `<article class="menu-card reveal" data-id="${item.id}">
      <div class="menu-visual"><img src="${item.image}" alt="${item.en}" loading="lazy"><span class="menu-number">${toLocaleDigits(`0${index + 1}`)}</span><span class="menu-icon">${item.icon}</span></div>
      <div class="menu-card-content"><div><p class="menu-kicker">${String(index + 1).padStart(2, '0')} / 07</p><h3 class="menu-name"></h3><p class="menu-description"></p></div><div class="menu-actions"><a class="text-link" href="${item.file}" target="_blank" rel="noopener" download><span class="i18n" data-i18n="menuAction"></span> <span>↗</span></a></div></div>
    </article>`).join('');
    applyLanguage(lang);
    $$('.menu-visual img').forEach((image) => image.addEventListener('error', () => setImageFallback(image), { once: true }));
  }

  function setup() {
    renderMenus();
    $$('.lang-toggle').forEach((button) => button.addEventListener('click', () => applyLanguage(lang === 'fa' ? 'en' : 'fa')));
    $('.menu-toggle').addEventListener('click', () => { body.classList.toggle('nav-open'); $('.menu-toggle').setAttribute('aria-expanded', body.classList.contains('nav-open')); });
    $$('.nav-link').forEach((link) => link.addEventListener('click', () => body.classList.remove('nav-open')));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 });
    $$('.reveal').forEach((el) => observer.observe(el));
    $('.year').textContent = new Date().getFullYear();
    setupLicenseCarousel();
  }
  function setupLicenseCarousel() {
    const slides = $$('.license-slide');
    const dots = $$('.license-dot');
    if (!slides.length) return;
    let active = 0;
    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === active));
      dots.forEach((dot, i) => { dot.classList.toggle('is-active', i === active); dot.setAttribute('aria-selected', String(i === active)); });
    };
    $('.license-prev')?.addEventListener('click', () => show(active - 1));
    $('.license-next')?.addEventListener('click', () => show(active + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    show(0);
  }
  document.addEventListener('DOMContentLoaded', setup);
})();
