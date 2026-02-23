/**
 * Модальные окна «Подробнее» в секции Портфолио (несколько проектов)
 */
(function () {
  var triggers = document.querySelectorAll('.portfolio-detail-trigger');

  triggers.forEach(function (trigger) {
    var targetId = trigger.getAttribute('data-target');
    if (!targetId) return;
    var modal = document.getElementById(targetId.replace('#', ''));
    if (!modal) return;

    var closeBtn = modal.querySelector('.portfolio-modal-close');
    var backdrop = modal.querySelector('.portfolio-modal-backdrop');

    function openModal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      trigger.focus();
    }

    trigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  });
})();
