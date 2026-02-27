/**
 * Подсветка активного пункта навигации при скролле
 */
(function () {
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    if (!id) return;
    var section = document.getElementById(id);
    if (section) sections.push({ id: id, link: link, section: section });
  });

  if (!sections.length) return;

  function setActive() {
    var scrollY = window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // У самого верха — снимаем все активные
    if (scrollY < 60) {
      sections.forEach(function (s) { s.link.classList.remove('active'); });
      return;
    }

    var viewportMid = scrollY + window.innerHeight * 0.4;
    var current = null;

    // Ищем секцию, чья верхняя граница уже прошла середину вьюпорта
    for (var i = sections.length - 1; i >= 0; i--) {
      var top = sections[i].section.offsetTop - 80; // учитываем высоту шапки
      if (scrollY >= top) {
        current = sections[i];
        break;
      }
    }

    sections.forEach(function (s) {
      s.link.classList.toggle('active', s === current);
    });
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(setActive);
  });
  setActive();
})();
