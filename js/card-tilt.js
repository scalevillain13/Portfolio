/**
 * Лёгкий 3D tilt карточек по положению курсора (Обо мне, Портфолио).
 * Устанавливает --mouse-x и --mouse-y (-1..1) на карточке.
 */
(function () {
  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var cards = document.querySelectorAll('.about-card, .portfolio-item');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var cx = (x - 0.5) * 2;
        var cy = (y - 0.5) * 2;
        card.style.setProperty('--mouse-x', cx.toFixed(2));
        card.style.setProperty('--mouse-y', cy.toFixed(2));
      });
      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--mouse-x', 0);
        card.style.setProperty('--mouse-y', 0);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
