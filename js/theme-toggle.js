// Переключение светлой/тёмной темы с сохранением в localStorage
(function () {
  var STORAGE_KEY = "theme";

  function getInitialTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (_) {}
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }

  function init() {
    var current = getInitialTheme();
    applyTheme(current);

    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

