(function () {
  'use strict';

  var canvas = document.getElementById('snake-canvas');
  var scoreEl = document.getElementById('snake-score');
  var bestEl = document.getElementById('snake-best');
  var statusEl = document.getElementById('snake-status');
  var startBtn = document.getElementById('snake-start');
  var pauseBtn = document.getElementById('snake-pause');
  var padButtons = document.querySelectorAll('.game-pad-btn');

  if (!canvas || !scoreEl || !bestEl || !statusEl || !startBtn) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var CELL = 20;
  var GRID = canvas.width / CELL;
  var BEST_KEY = 'portfolioSnakeBest';

  var SPEED_LEVELS = [
    { minScore: 0,  ms: 130 },
    { minScore: 5,  ms: 110 },
    { minScore: 12, ms: 95 },
    { minScore: 20, ms: 80 },
    { minScore: 30, ms: 65 }
  ];

  var snake = [];
  var food = { x: 0, y: 0 };
  var direction = 'right';
  var nextDirection = 'right';
  var timerId = null;
  var isRunning = false;
  var isPaused = false;
  var isGameOver = false;
  var score = 0;
  var best = 0;
  var currentSpeed = SPEED_LEVELS[0].ms;

  function safeGetBest() {
    try {
      var saved = localStorage.getItem(BEST_KEY);
      var parsed = Number(saved);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    } catch (e) { return 0; }
  }

  function safeSetBest(value) {
    try { localStorage.setItem(BEST_KEY, String(value)); } catch (e) { /* no-op */ }
  }

  function getVector(dir) {
    if (dir === 'up') return { x: 0, y: -1 };
    if (dir === 'down') return { x: 0, y: 1 };
    if (dir === 'left') return { x: -1, y: 0 };
    return { x: 1, y: 0 };
  }

  function isOpposite(current, next) {
    return (
      (current === 'up' && next === 'down') ||
      (current === 'down' && next === 'up') ||
      (current === 'left' && next === 'right') ||
      (current === 'right' && next === 'left')
    );
  }

  function setDirection(next) {
    if (!isRunning || isPaused) return;
    if (isOpposite(direction, next)) return;
    nextDirection = next;
  }

  function getSpeedForScore(s) {
    var ms = SPEED_LEVELS[0].ms;
    for (var i = SPEED_LEVELS.length - 1; i >= 0; i--) {
      if (s >= SPEED_LEVELS[i].minScore) { ms = SPEED_LEVELS[i].ms; break; }
    }
    return ms;
  }

  function getLevelName() {
    for (var i = SPEED_LEVELS.length - 1; i >= 0; i--) {
      if (score >= SPEED_LEVELS[i].minScore) return i + 1;
    }
    return 1;
  }

  function updateScoreText() {
    scoreEl.textContent = String(score);
    bestEl.textContent = String(best);
  }

  function placeFood() {
    var x, y, onSnake;
    do {
      x = Math.floor(Math.random() * GRID);
      y = Math.floor(Math.random() * GRID);
      onSnake = snake.some(function (p) { return p.x === x && p.y === y; });
    } while (onSnake);
    food.x = x;
    food.y = y;
  }

  function isSnakeHit(head) {
    return snake.some(function (p) { return p.x === head.x && p.y === head.y; });
  }

  function getThemeColors() {
    var s = getComputedStyle(document.documentElement);
    return {
      bg: s.getPropertyValue('--bg-elevated').trim() || '#141821',
      border: s.getPropertyValue('--border').trim() || 'rgba(255,255,255,0.12)',
      snake: s.getPropertyValue('--accent').trim() || '#22d3ee',
      snakeHead: s.getPropertyValue('--text').trim() || '#f8fafc',
      dead: '#ef4444'
    };
  }

  /* ---------- DRAWING ---------- */

  function drawGrid(colors) {
    // Более контрастная сетка, чтобы клетки не сливались с фоном
    // Небольшой нейтральный серый, хорошо виден в обеих темах
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    for (var i = 0; i <= GRID; i++) {
      var pos = i * CELL + 0.5;
      ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(canvas.width, pos); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawApple() {
    var cx = food.x * CELL + CELL / 2;
    var cy = food.y * CELL + CELL / 2;
    var r = CELL / 2 - 1.5;

    ctx.save();

    var glow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 2.5);
    glow.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
    glow.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(cx - r * 2.5, cy - r * 2.5, r * 5, r * 5);

    var grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
    grad.addColorStop(0, '#ff6b6b');
    grad.addColorStop(0.7, '#e53e3e');
    grad.addColorStop(1, '#c53030');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    var highlight = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 0, cx - r * 0.35, cy - r * 0.35, r * 0.5);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlight;
    ctx.beginPath();
    ctx.arc(cx - r * 0.25, cy - r * 0.25, r * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38a169';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy - r + 1);
    ctx.lineTo(cx + 0.5, cy - r - 2.5);
    ctx.stroke();

    ctx.fillStyle = '#48bb78';
    ctx.beginPath();
    ctx.ellipse(cx + 2, cy - r - 1, 2.5, 1.5, Math.PI * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawSnakeHead(part, colors, dead) {
    var cx = part.x * CELL + CELL / 2;
    var cy = part.y * CELL + CELL / 2;
    var r = CELL / 2 - 1;

    ctx.save();

    if (dead) {
      ctx.fillStyle = colors.dead;
    } else {
      var grad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 0, cx, cy, r * 1.2);
      grad.addColorStop(0, '#5eead4');
      grad.addColorStop(1, colors.snake);
      ctx.fillStyle = grad;
    }

    roundedRect(part.x * CELL + 1, part.y * CELL + 1, CELL - 2, CELL - 2, 4);
    ctx.fill();

    if (!dead) {
      var eyeOffX = 0, eyeOffY = 0;
      var tongueAngle = 0;

      if (direction === 'right') { eyeOffX = 2; tongueAngle = 0; }
      else if (direction === 'left') { eyeOffX = -2; tongueAngle = Math.PI; }
      else if (direction === 'up') { eyeOffY = -2; tongueAngle = -Math.PI / 2; }
      else { eyeOffY = 2; tongueAngle = Math.PI / 2; }

      var eye1x, eye1y, eye2x, eye2y;
      if (direction === 'right' || direction === 'left') {
        eye1x = cx + eyeOffX; eye1y = cy - 3;
        eye2x = cx + eyeOffX; eye2y = cy + 3;
      } else {
        eye1x = cx - 3; eye1y = cy + eyeOffY;
        eye2x = cx + 3; eye2y = cy + eyeOffY;
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(eye1x, eye1y, 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(eye2x, eye2y, 2.2, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#1a202c';
      ctx.beginPath(); ctx.arc(eye1x + eyeOffX * 0.3, eye1y + eyeOffY * 0.3, 1.1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(eye2x + eyeOffX * 0.3, eye2y + eyeOffY * 0.3, 1.1, 0, Math.PI * 2); ctx.fill();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tongueAngle);
      ctx.strokeStyle = '#e53e3e';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(r - 1, 0);
      ctx.lineTo(r + 3, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(r + 3, 0);
      ctx.lineTo(r + 5, -1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(r + 3, 0);
      ctx.lineTo(r + 5, 1.5);
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      ctx.beginPath(); ctx.moveTo(cx - 3, cy - 3); ctx.lineTo(cx - 1, cy - 1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 1, cy - 3); ctx.lineTo(cx - 3, cy - 1); ctx.stroke();

      ctx.beginPath(); ctx.moveTo(cx + 1, cy - 3); ctx.lineTo(cx + 3, cy - 1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 3, cy - 3); ctx.lineTo(cx + 1, cy - 1); ctx.stroke();
    }

    ctx.restore();
  }

  function drawSnakeBody(parts, colors, dead) {
    for (var idx = parts.length - 1; idx >= 1; idx--) {
      var part = parts[idx];
      var x = part.x * CELL + 1;
      var y = part.y * CELL + 1;
      var w = CELL - 2;
      var h = CELL - 2;

      if (dead) {
        ctx.fillStyle = colors.dead + '70';
      } else {
        var alpha = Math.max(0.4, 1 - (idx / parts.length) * 0.6);
        ctx.globalAlpha = alpha;

        var even = idx % 2 === 0;
        if (even) {
          ctx.fillStyle = colors.snake;
        } else {
          ctx.fillStyle = shadeColor(colors.snake, -20);
        }
      }

      roundedRect(x, y, w, h, 3);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function shadeColor(hex, percent) {
    var col = hex.replace('#', '');
    if (col.length === 3) col = col[0]+col[0]+col[1]+col[1]+col[2]+col[2];
    var num = parseInt(col, 16);
    var r = Math.min(255, Math.max(0, (num >> 16) + percent));
    var g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent));
    var b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  }

  function draw(dead) {
    var colors = getThemeColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(colors);
    if (!dead) drawApple();
    drawSnakeBody(snake, colors, dead);
    drawSnakeHead(snake[0], colors, dead);
  }

  function drawPauseOverlay() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px Manrope, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u23F8 \u041F\u0410\u0423\u0417\u0410', canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';
  }

  function drawGameOverEffect(callback) {
    var step = 0;
    var total = 4;
    var interval = 120;

    function blink() {
      draw(step % 2 === 0);
      step++;
      if (step < total) {
        setTimeout(blink, interval);
      } else {
        draw(true);
        drawDeathOverlay();
        if (callback) callback();
      }
    }
    blink();
  }

  function drawDeathOverlay() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ef4444';
    ctx.font = '700 20px Manrope, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 14);

    ctx.fillStyle = '#ffffff';
    ctx.font = '500 14px Manrope, sans-serif';
    ctx.fillText('\u041E\u0447\u043A\u0438: ' + score, canvas.width / 2, canvas.height / 2 + 14);
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';
  }

  /* ---------- GAME LOGIC ---------- */

  function restartTimer() {
    if (timerId) clearInterval(timerId);
    currentSpeed = getSpeedForScore(score);
    timerId = setInterval(tick, currentSpeed);
  }

  function stopGame(reason) {
    isRunning = false;
    isGameOver = true;
    if (timerId) { clearInterval(timerId); timerId = null; }

    if (score > best) {
      best = score;
      safeSetBest(best);
    }
    updateScoreText();

    drawGameOverEffect(function () {
      statusEl.textContent = reason + ' \u0423\u0440\u043E\u0432\u0435\u043D\u044C: ' + getLevelName() + '. \u041D\u0430\u0436\u043C\u0438 \u00AB\u0421\u0442\u0430\u0440\u0442 / \u0420\u0435\u0441\u0442\u0430\u0440\u0442\u00BB.';
    });
  }

  function tick() {
    direction = nextDirection;
    var vec = getVector(direction);
    var head = { x: snake[0].x + vec.x, y: snake[0].y + vec.y };

    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
      stopGame('\u0421\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u0435 \u0441\u043E \u0441\u0442\u0435\u043D\u043E\u0439!');
      return;
    }

    if (isSnakeHit(head)) {
      stopGame('\u0417\u043C\u0435\u0439\u043A\u0430 \u0432\u0440\u0435\u0437\u0430\u043B\u0430\u0441\u044C \u0432 \u0441\u0435\u0431\u044F!');
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 1;
      if (score > best) best = score;
      updateScoreText();
      placeFood();

      var newSpeed = getSpeedForScore(score);
      if (newSpeed !== currentSpeed) {
        restartTimer();
        statusEl.textContent = '\u0423\u0440\u043E\u0432\u0435\u043D\u044C ' + getLevelName() + '! \u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0440\u0430\u0441\u0442\u0451\u0442.';
      }
    } else {
      snake.pop();
    }

    draw(false);
  }

  function togglePause() {
    if (!isRunning && !isPaused) return;

    if (isPaused) {
      isPaused = false;
      isRunning = true;
      statusEl.textContent = '\u0418\u0433\u0440\u0430 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u0442\u0441\u044F. \u0423\u0440\u043E\u0432\u0435\u043D\u044C: ' + getLevelName() + '.';
      restartTimer();
    } else {
      isPaused = true;
      isRunning = false;
      if (timerId) { clearInterval(timerId); timerId = null; }
      drawPauseOverlay();
      statusEl.textContent = '\u041F\u0430\u0443\u0437\u0430. \u041F\u0440\u043E\u0431\u0435\u043B \u0438\u043B\u0438 \u043A\u043D\u043E\u043F\u043A\u0430 \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F.';
    }
  }

  function startGame() {
    if (timerId) { clearInterval(timerId); timerId = null; }

    snake = [
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 }
    ];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    isRunning = true;
    isPaused = false;
    isGameOver = false;
    currentSpeed = SPEED_LEVELS[0].ms;
    updateScoreText();
    placeFood();
    draw(false);
    statusEl.textContent = '\u0423\u0440\u043E\u0432\u0435\u043D\u044C 1. \u0421\u0442\u0440\u0435\u043B\u043A\u0438 / WASD / \u043A\u043D\u043E\u043F\u043A\u0438. \u041F\u0440\u043E\u0431\u0435\u043B \u2014 \u043F\u0430\u0443\u0437\u0430.';
    timerId = setInterval(tick, currentSpeed);
  }

  function onKeyDown(event) {
    var key = event.key;
    var code = event.code;

    if (key === ' ' || key === 'Escape') {
      event.preventDefault();
      if (isGameOver) return;
      togglePause();
      return;
    }

    var dir = '';
    if (key === 'ArrowUp'   || code === 'KeyW') dir = 'up';
    if (key === 'ArrowDown' || code === 'KeyS') dir = 'down';
    if (key === 'ArrowLeft' || code === 'KeyA') dir = 'left';
    if (key === 'ArrowRight'|| code === 'KeyD') dir = 'right';

    if (!dir) return;
    event.preventDefault();
    setDirection(dir);
  }

  function initPad() {
    if (!padButtons.length) return;
    padButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = btn.getAttribute('data-dir');
        if (dir) setDirection(dir);
      });
    });
  }

  function init() {
    best = safeGetBest();
    updateScoreText();
    snake = [
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 }
    ];
    placeFood();
    draw(false);
    startBtn.addEventListener('click', startGame);
    if (pauseBtn) pauseBtn.addEventListener('click', function () {
      if (!isGameOver) togglePause();
    });
    document.addEventListener('keydown', onKeyDown);
    initPad();
  }

  init();
})();
