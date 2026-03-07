/**
 * Ripple-эффект по клику на кнопки (.btn).
 * Создаёт span с круговой анимацией от точки клика, затем удаляет.
 * Не создаёт ripple при prefers-reduced-motion: reduce.
 */
(function () {
  function createRipple(e) {
    var btn = e.target.closest('.btn');
    if (!btn) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var rect = btn.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var size = Math.max(rect.width, rect.height) * 2;
    var half = size / 2;

    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + (x - half) + 'px',
      'top:' + (y - half) + 'px'
    ].join(';');

    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });

    btn.appendChild(ripple);
  }

  document.addEventListener('click', createRipple, false);
})();
