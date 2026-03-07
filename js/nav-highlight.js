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

    // Внизу страницы (футер в зоне видимости) — всегда Контакты
    if (docHeight > 0 && scrollY >= docHeight - 80) {
      sections.forEach(function (s) {
        s.link.classList.toggle('active', s === sections[sections.length - 1]);
      });
      return;
    }

    var current = null;
    // Ищем секцию, чья верхняя граница уже прошла точку чуть ниже верха вьюпорта
    for (var i = sections.length - 1; i >= 0; i--) {
      var top = sections[i].section.offsetTop - 80;
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
  // При загрузке с хешем (#portfolio и т.д.) обновить подсветку после скролла к секции
  if (window.location.hash) {
    window.addEventListener('load', function () { requestAnimationFrame(setActive); });
  }
})();
