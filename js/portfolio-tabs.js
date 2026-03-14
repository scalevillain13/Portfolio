/**
 * Переключение вкладок «Проекты» и «Стек» в секции Портфолио
 */
(function () {
  var tabList = document.querySelector('.portfolio-tabs');
  var tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  var tabPanels = document.querySelectorAll('.portfolio-tab-content');

  if (!tabList || !tabButtons.length || !tabPanels.length) return;

  function switchTab(activeBtn) {
    var targetId = activeBtn.getAttribute('aria-controls');
    if (!targetId) return;

    tabButtons.forEach(function (btn) {
      var isSelected = btn === activeBtn;
      btn.classList.toggle('portfolio-tab-btn--active', isSelected);
      btn.setAttribute('aria-selected', isSelected);
    });

    tabPanels.forEach(function (panel) {
      var isHidden = panel.id !== targetId;
      panel.classList.toggle('portfolio-tab-content--hidden', isHidden);
      panel.setAttribute('aria-hidden', isHidden);
      if (panel.id === 'portfolio-tab-stack' && !isHidden) {
        panel.querySelector('.stack-grid') && panel.querySelector('.stack-grid').classList.add('stack-grid--visible');
      }
    });
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchTab(btn);
    });
    btn.addEventListener('keydown', function (e) {
      var index = Array.prototype.indexOf.call(tabButtons, btn);
      var next;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = index < tabButtons.length - 1 ? tabButtons[index + 1] : tabButtons[0];
        next.focus();
        switchTab(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = index > 0 ? tabButtons[index - 1] : tabButtons[tabButtons.length - 1];
        next.focus();
        switchTab(next);
      }
    });
  });
})();
