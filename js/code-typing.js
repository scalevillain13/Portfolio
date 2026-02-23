/**
 * Анимация «печать» кода в блоке developer.js — посимвольное появление
 */
(function () {
  var DELAY_MS = 32;

  function processNode(parent, node, indexHolder) {
    if (node.nodeType === Node.TEXT_NODE) {
      var text = node.textContent;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < text.length; i++) {
        var span = document.createElement('span');
        span.className = 'code-char';
        span.style.animationDelay = indexHolder.value + 'ms';
        indexHolder.value += DELAY_MS;
        span.textContent = text[i];
        fragment.appendChild(span);
      }
      parent.replaceChild(fragment, node);
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      var children = Array.from(node.childNodes);
      children.forEach(function (child) {
        processNode(node, child, indexHolder);
      });
    }
  }

  function init() {
    var block = document.querySelector('.code-block');
    if (!block) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var lines = block.querySelectorAll('.code-line');
    var indexHolder = { value: 0 };

    lines.forEach(function (line) {
      var nodes = Array.from(line.childNodes);
      nodes.forEach(function (node) {
        processNode(line, node, indexHolder);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
