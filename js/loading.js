(function () {
  'use strict';

  var text = 'Добро пожаловать';
  var delay = 55;
  var showDuration = 2800;

  function run() {
    var el = document.getElementById('loading-text');
    var screen = document.getElementById('loading-screen');
    if (!el || !screen) return;

    function typeNext(index) {
      if (index > text.length) return;
      if (index > 0) {
        var span = document.createElement('span');
        span.className = 'loading-screen__char';
        span.textContent = text[index - 1];
        el.appendChild(span);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { span.classList.add('is-visible'); });
        });
      }
      setTimeout(function () { typeNext(index + 1); }, delay);
    }

    typeNext(0);

    setTimeout(function () {
      screen.classList.add('loading-screen--hidden');
      setTimeout(function () {
        document.documentElement.classList.remove('loading');
        document.body.classList.remove('loading');
        document.body.classList.add('page-loaded');
        document.dispatchEvent(new CustomEvent('page-ready'));
        screen.style.display = 'none';
      }, 500);
    }, showDuration);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
