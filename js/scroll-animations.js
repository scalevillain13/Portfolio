/**
 * Плавная загрузка: класс .page-loaded на body для анимации появления при заходе на сайт
 * Анимации при скролле: класс .in-view секциям при появлении в viewport
 * При полной загрузке/рефреше — всегда показываем страницу с верха (без прокрутки к якорю в URL)
 */
(function () {
  function addPageLoaded() {
    document.body.classList.add('page-loaded');
  }

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

  if (!('IntersectionObserver' in window)) {
    return;
  }

  var sections = document.querySelectorAll('.about, .skills, .portfolio, .faq, .game, .contact, .footer');
  if (!sections.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
