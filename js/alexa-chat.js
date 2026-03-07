/**
 * Чат «Алекса» — ответы по ключевым словам (без внешнего API).
 * Темы: React, JS, HTML, CSS, Git, Vite, Vue, образование, обо мне, привет/пока.
 */
(function () {
  'use strict';

  var REPLIES = {
    hello: [
      'Привет! Чем могу помочь?',
      'Здравствуй! Спроси про опыт, образование или про Александра.',
      'Привет! Я Алекса. Задай любой вопрос из моей темы.',
      'Добрый день! Готова ответить про навыки и опыт.',
      'Хай! Спроси про React, JS, Git, Vue или просто поболтаем.',
    ],
    bye: [
      'До свидания! Удачи.',
      'Пока! Заходи ещё.',
      'Было приятно. До встречи!',
      'Пока! Если будут вопросы — пиши.',
    ],
    react:
      'Работаю с React 1,5+ года. Писал SPA на React, хуки (useState, useEffect, useMemo, useCallback), компонентный подход, работа с API (fetch, axios), управление состоянием. Есть опыт с drag-and-drop, формами, фильтрами и пагинацией. В проектах: приложение погоды, Kanban-доска, коммерческие лендинги.',
    javascript:
      'Твёрдый middle: 2+ года коммерческой разработки. Пишу на ES6+, понимаю асинхронность (Promise, async/await), замыкания, прототипы, модули. Работаю с DOM, событиями, Fetch API, localStorage. Умею проектировать архитектуру компонентов и выносить логику в переиспользуемые модули. Опыт с ванильным JS и React.',
    html:
      'Опыт с HTML5 и семантической вёрсткой: разметка лендингов и многостраничных сайтов, формы, доступность (a11y). Использую в проектах на React и в статичных лендингах.',
    css:
      'Работаю с CSS3: адаптив, Flexbox, Grid, анимации, переменные. Есть опыт с препроцессорами (SASS), Tailwind. Адаптивная вёрстка под разные устройства — в приоритете.',
    git:
      'Уверенно пользуюсь Git: коммиты, ветки, merge, push/pull, работа с GitHub. Делал pull request\'ы, ревью кода, решал конфликты. Понимаю workflow с feature-ветками. Для командной разработки и своих проектов уровня хватает.',
    vite:
      'Использую Vite в проектах на React (например, приложение Погода) для быстрой сборки и удобного dev-сервера. Опыт с настройкой и подключением плагинов.',
    vue:
      'Есть опыт с Vue 3: проект Circles — круговой прогресс-бар на Composition API, SVG/Canvas, адаптивная вёрстка. Понимаю реактивность и компонентный подход во Vue.',
    education:
      'Учусь на 2 курсе по специальности РПО (разработчик ПО) в колледже IT TOP ACADEMY. Прохожу курсы «FullStack-разработчик» в Яндекс Практикуме. Работаю на фрилансе 1,5 года: вёрстка, лендинги, доработки под ключ.',
    about:
      'Александр — frontend-разработчик из Краснодара, 18 лет. Самоучка. Более 30 заказов, 25+ лендингов. Делаю быстро и качественно, открыт к удалёнке и релокации. Пишу интерфейсы и мечтает вырасти до fullstack.',
    skills:
      'Frontend: HTML5, CSS3, JavaScript (ES6+), React (middle), TypeScript, адаптивная вёрстка, Vite, Vue, Tailwind, SASS, Figma. Бэкенд и инструменты: REST API, Node.js, NestJS, PHP, Laravel, MySQL, Docker, WordPress, Git. Опыт с змейкой на канвасе — считаю, что это тоже навык.',
    unknown:
      'Пока не знаю ответ на такой вопрос. Спроси про опыт с React, JavaScript, HTML, CSS, Git, Vite, Vue, про образование или про Александра — или просто поздоровайся.',
  };

  var HELLO_WORDS = [
    'привет', 'здравствуй', 'здравствуйте', 'хай', 'добрый день', 'добрый вечер', 'доброе утро',
    'приветствую', 'здарова', 'здоров', 'hello', 'hi', 'hey', 'добр',
  ];
  var BYE_WORDS = [
    'пока', 'до свидания', 'прощай', 'до встречи', 'удачи', 'bye', 'goodbye', 'до скорого',
    'всего хорошего', 'бывай',
  ];

  function normalize(str) {
    return (str || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function matchWords(text, words) {
    var t = normalize(text);
    return words.some(function (w) { return t.indexOf(w) !== -1; });
  }

  function matchTopic(text, keywords) {
    var t = normalize(text);
    return keywords.some(function (k) { return t.indexOf(k) !== -1; });
  }

  function getReply(text) {
    if (!text) return REPLIES.unknown;

    if (matchWords(text, HELLO_WORDS)) {
      return REPLIES.hello[Math.floor(Math.random() * REPLIES.hello.length)];
    }
    if (matchWords(text, BYE_WORDS)) {
      return REPLIES.bye[Math.floor(Math.random() * REPLIES.bye.length)];
    }
    if (matchTopic(text, ['react'])) return REPLIES.react;
    if (matchTopic(text, ['javascript', 'js', 'джаваскрипт', 'яваскрипт'])) return REPLIES.javascript;
    if (matchTopic(text, ['html', 'хтмл'])) return REPLIES.html;
    if (matchTopic(text, ['css', 'каскад', 'стили'])) return REPLIES.css;
    if (matchTopic(text, ['git', 'гит'])) return REPLIES.git;
    if (matchTopic(text, ['vite', 'вайт'])) return REPLIES.vite;
    if (matchTopic(text, ['vue', 'вью'])) return REPLIES.vue;
    if (matchTopic(text, ['образование', 'учёба', 'учился', 'учиться', 'практикум', 'колледж', 'курсы', 'рпо', 'it top', 'яндекс'])) return REPLIES.education;
    if (matchTopic(text, ['расскажи про навыки', 'про навыки', 'навыки', 'какие навыки', 'какой стек'])) return REPLIES.skills;
    if (matchTopic(text, ['обо мне', 'о себе', 'кто ты', 'расскажи о себе', 'расскажи про опыт', 'про опыт', 'александр', 'саша', 'верстальщик', 'фриланс', 'опыт работы', 'краснодар'])) return REPLIES.about;

    return REPLIES.unknown;
  }

  function addMessage(container, isUser, name, text) {
    var wrap = document.createElement('div');
    wrap.className = 'alexa-msg alexa-msg--' + (isUser ? 'user' : 'bot');
    if (!isUser) {
      var nameSpan = document.createElement('span');
      nameSpan.className = 'alexa-msg-name';
      nameSpan.textContent = name;
      wrap.appendChild(nameSpan);
    }
    var p = document.createElement('p');
    p.className = 'alexa-msg-text';
    p.textContent = text;
    wrap.appendChild(p);
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
    requestAnimationFrame(function () {
      wrap.classList.add('alexa-msg--visible');
    });
  }

  function send() {
    var input = document.getElementById('alexa-input');
    var messages = document.getElementById('alexa-messages');
    if (!input || !messages) return;

    var text = input.value.trim();
    if (!text) return;

    addMessage(messages, true, 'Вы', text);
    input.value = '';

    var reply = getReply(text);
    addMessage(messages, false, 'Алекса', reply);
  }

  function init() {
    var form = document.getElementById('alexa-form');
    var input = document.getElementById('alexa-input');
    if (!form || !input) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      send();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
