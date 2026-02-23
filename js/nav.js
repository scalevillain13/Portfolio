/**
 * Навигация: мобильное меню (бургер, закрытие по клику на ссылку)
 */
(function () {
  const nav = document.querySelector('.header .nav');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });
})();
