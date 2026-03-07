// Переключение светлой/тёмной темы с сохранением в localStorage
(function () {
  var STORAGE_KEY = "theme";

  function getInitialTheme() {
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (stored === "light" || stored === "dark") return stored;
    // Уважаем системные настройки, если нет сохранённого выбора
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark");
      toggle.setAttribute("aria-label", theme === "dark" ? "Тёмная тема. Переключить на светлую" : "Светлая тема. Переключить на тёмную");
    }
  }

  // Применяем тему ДО рендера, чтобы не было мигания
  applyTheme(getInitialTheme());

  function init() {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    var theme = document.documentElement.getAttribute("data-theme");
    toggle.setAttribute("aria-pressed", theme === "dark");
    toggle.setAttribute("aria-label", theme === "dark" ? "Тёмная тема. Переключить на светлую" : "Светлая тема. Переключить на тёмную");

    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "light" ? "dark" : "light");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
