/**
 * Модальные окна «Подробнее» в секции Портфолио (несколько проектов)
 * С ловушкой фокуса (focus trap) для доступности с клавиатуры.
 */
(function () {
  var triggers = document.querySelectorAll('.portfolio-detail-trigger');

  function getFocusables(container) {
    var selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var nodes = container.querySelectorAll(selector);
    var list = [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].offsetParent !== null && !nodes[i].disabled) list.push(nodes[i]);
    }
    return list;
  }

  triggers.forEach(function (trigger) {
    var targetId = trigger.getAttribute('data-target');
    if (!targetId) return;
    var modal = document.getElementById(targetId.replace('#', ''));
    if (!modal) return;

    var closeBtn = modal.querySelector('.portfolio-modal-close');
    var backdrop = modal.querySelector('.portfolio-modal-backdrop');
    var backBtn = modal.querySelector('.portfolio-modal-back');

    function handleKeydown(e) {
      if (e.key !== 'Tab') return;
      var focusables = getFocusables(modal);
      if (focusables.length === 0) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function openModal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
      modal.addEventListener('keydown', handleKeydown);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      modal.removeEventListener('keydown', handleKeydown);
      trigger.focus();
    }

    trigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (backBtn) backBtn.addEventListener('click', closeModal);

    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  });
})();
