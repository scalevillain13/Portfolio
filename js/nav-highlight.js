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
    var viewportMid = scrollY + window.innerHeight * 0.4;
    var current = null;

    for (var i = sections.length - 1; i >= 0; i--) {
      var top = sections[i].section.offsetTop;
      var height = sections[i].section.offsetHeight;
      if (viewportMid >= top && viewportMid < top + height) {
        current = sections[i];
        break;
      }
    }

    if (!current && scrollY > 0 && sections.length) {
      current = sections[sections.length - 1];
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
