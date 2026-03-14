/**
 * Плавная загрузка: класс .page-loaded на body.
 * Анимации при скролле: каждому элементу добавляется .in-view при появлении в viewport
 * (заголовки, карточки, пункты) — появление плавное по мере прокрутки.
 */
(function () {
  function addPageLoaded() {
    if (document.body.classList.contains('loading') && document.getElementById('loading-screen')) return;
    document.body.classList.add('page-loaded');
  }

  /* Параллакс hero: --scroll для смещения mac-окна */
  function setScrollVar() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.style.setProperty('--scroll', reduced ? 0 : window.scrollY);
  }
  window.addEventListener('scroll', setScrollVar, { passive: true });
  window.addEventListener('load', setScrollVar);
  setScrollVar();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPageLoaded);
  } else {
    addPageLoaded();
  }

  window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  });

  if (!('IntersectionObserver' in window)) return;

  var revealSelectors = [
    '.about .section-title',
    '.about .section-subtitle',
    '.about .about-card',
    '.skills .section-title',
    '.skills .section-subtitle',
    '.skills .skill-category-card',
    '.portfolio .section-title',
    '.portfolio .portfolio-intro',
    '.portfolio .portfolio-item',
    '.portfolio .portfolio-placeholder',
    '.contact .section-title',
    '.contact .contact-intro',
    '.contact .contact-link'
  ];

  var revealElements = [];
  revealSelectors.forEach(function (sel) {
    try {
      var list = document.querySelectorAll(sel);
      for (var i = 0; i < list.length; i++) revealElements.push(list[i]);
    } catch (e) {}
  });

  var skillTags = document.querySelectorAll('.skills .skill-tags li');
  for (var j = 0; j < skillTags.length; j++) revealElements.push(skillTags[j]);

  if (!revealElements.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      if (!document.body.classList.contains('page-loaded')) return;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();
