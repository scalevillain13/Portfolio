/**
 * Анимация печати текста в hero при заходе на сайт
 */
(function () {
  var DELAY_MS = 58;

  function wrapElement(el, startDelay) {
    if (!el || el.querySelector('.hero-char')) return startDelay;
    var text = el.textContent;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'hero-char';
      span.style.animationDelay = (startDelay + i * DELAY_MS) + 'ms';
      span.textContent = text[i];
      fragment.appendChild(span);
    }
    el.textContent = '';
    el.appendChild(fragment);
    return startDelay + text.length * DELAY_MS;
  }

  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var greeting = document.querySelector('.hero-greeting.hero-text');
    var title = document.querySelector('.hero-title.hero-text');
    var subtitle = document.querySelector('.hero-subtitle.hero-text');
    var tagline = document.querySelector('.hero-tagline.hero-text');

    var delay = 400;
    if (greeting) delay = wrapElement(greeting, delay);
    if (title) delay = wrapElement(title, delay);
    if (subtitle) delay = wrapElement(subtitle, delay);
    if (tagline) wrapElement(tagline, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
