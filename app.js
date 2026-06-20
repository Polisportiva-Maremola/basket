/* ============================================================
   POLISPORTIVA MAREMOLA — app.js
   ============================================================ */
(function () {
  'use strict';

  /* ── LIVE CLOCK (HUD) ── */
  var clockEl = document.getElementById('clock');
  function tickClock() {
    if (!clockEl) return;
    var n = new Date();
    var p = function (x) { return String(x).padStart(2, '0'); };
    clockEl.textContent = p(n.getHours()) + ':' + p(n.getMinutes()) + ':' + p(n.getSeconds());
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ── COUNTDOWN to next match ── */
  // Target: next Saturday 21:00 (rolling), so the scorebug always feels live.
  function nextMatchDate() {
    var now = new Date();
    var d = new Date(now);
    var day = d.getDay();                 // 0 Sun … 6 Sat
    var diff = (6 - day + 7) % 7;         // days until Saturday
    d.setDate(d.getDate() + diff);
    d.setHours(21, 0, 0, 0);
    if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 7);
    return d;
  }
  var target = nextMatchDate();
  var cdEls = {
    d: document.querySelector('[data-cd="d"]'),
    h: document.querySelector('[data-cd="h"]'),
    m: document.querySelector('[data-cd="m"]'),
    s: document.querySelector('[data-cd="s"]')
  };
  function tickCountdown() {
    var diff = Math.max(0, target.getTime() - Date.now());
    var s = Math.floor(diff / 1000);
    var pad = function (x) { return String(x).padStart(2, '0'); };
    if (cdEls.d) cdEls.d.textContent = pad(Math.floor(s / 86400));
    if (cdEls.h) cdEls.h.textContent = pad(Math.floor((s % 86400) / 3600));
    if (cdEls.m) cdEls.m.textContent = pad(Math.floor((s % 3600) / 60));
    if (cdEls.s) cdEls.s.textContent = pad(s % 60);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ── TICKER (broadcast bottom line) ── */
  var feed = [
    { k: 'Ultima', t: 'Maremola 78 — 71 Loano · W' },
    { k: 'Top Scorer', t: 'M. Ferro 24 PTI', up: true },
    { k: 'Serie D', t: 'Maremola 1ª · 12V — 3P' },
    { k: 'Rimbalzi', t: 'L. Conti 11 RIM', up: true },
    { k: 'Minibasket', t: 'Aquilotti — Festa il 14/06' },
    { k: 'Trasferta', t: 'Bus tifoseria · iscrizioni aperte' },
    { k: 'Under 19', t: 'Qualificati ai playoff regionali', up: true },
    { k: 'Tesseramenti', t: 'Stagione 25/26 · posti aperti' }
  ];
  var track = document.getElementById('ticker');
  if (track) {
    var html = feed.map(function (i) {
      return '<span class="ticker-item"><span class="k">' + i.k + '</span> <span class="' +
        (i.up ? 'up' : '') + '">' + i.t + '</span></span>';
    }).join('');
    track.innerHTML = html + html; // duplicate for seamless -50% loop
  }

  /* ── ROSTER (2K-style player cards) ── */
  var rosters = {
    prima: [
      { n: 'M. Ferro', r: 'Playmaker', pos: 'PG', num: 4, ovr: 86, cap: true, st: [['PT', 18], ['AS', 7], ['3P', 41]] },
      { n: 'L. Conti', r: 'Ala grande', pos: 'PF', num: 11, ovr: 84, st: [['PT', 14], ['RB', 9], ['ST', 2]] },
      { n: 'D. Russo', r: 'Guardia', pos: 'SG', num: 8, ovr: 82, st: [['PT', 16], ['3P', 38], ['AS', 4]] },
      { n: 'A. Bianchi', r: 'Centro', pos: 'C', num: 23, ovr: 81, st: [['PT', 12], ['RB', 11], ['BS', 2]] },
      { n: 'G. Marino', r: 'Ala piccola', pos: 'SF', num: 7, ovr: 79, st: [['PT', 13], ['RB', 6], ['AS', 3]] },
      { n: 'S. Greco', r: 'Guardia', pos: 'SG', num: 15, ovr: 77, st: [['PT', 9], ['3P', 35], ['ST', 1]] },
      { n: 'F. Costa', r: 'Playmaker', pos: 'PG', num: 3, ovr: 76, st: [['PT', 7], ['AS', 5], ['ST', 2]] },
      { n: 'R. Esposito', r: 'Centro', pos: 'C', num: 33, ovr: 75, st: [['PT', 8], ['RB', 8], ['BS', 1]] }
    ],
    under: [
      { n: 'T. Riva', r: 'Playmaker', pos: 'PG', num: 5, ovr: 74, cap: true, st: [['PT', 15], ['AS', 6], ['3P', 33]] },
      { n: 'N. Galli', r: 'Ala', pos: 'SF', num: 9, ovr: 72, st: [['PT', 13], ['RB', 7], ['ST', 2]] },
      { n: 'E. Moretti', r: 'Guardia', pos: 'SG', num: 12, ovr: 71, st: [['PT', 12], ['3P', 31], ['AS', 3]] },
      { n: 'P. Villa', r: 'Centro', pos: 'C', num: 21, ovr: 70, st: [['PT', 10], ['RB', 10], ['BS', 2]] },
      { n: 'C. Sala', r: 'Ala grande', pos: 'PF', num: 14, ovr: 69, st: [['PT', 9], ['RB', 8], ['ST', 1]] },
      { n: 'M. Lombardi', r: 'Guardia', pos: 'SG', num: 6, ovr: 68, st: [['PT', 8], ['3P', 29], ['AS', 2]] }
    ],
    mini: [
      { n: 'Aquilotti', r: '2015 — 2016', pos: 'U8', num: 0, ovr: 99, cap: true, st: [['DIV', 18], ['👟', 2], ['🏀', 1]] },
      { n: 'Scoiattoli', r: '2017 — 2018', pos: 'U7', num: 0, ovr: 99, st: [['DIV', 22], ['👟', 2], ['🏀', 1]] },
      { n: 'Pulcini', r: '2019', pos: 'U6', num: 0, ovr: 99, st: [['DIV', 14], ['👟', 2], ['🏀', 1]] }
    ]
  };

  var grid = document.getElementById('rosterGrid');
  function renderRoster(key) {
    if (!grid) return;
    var list = rosters[key] || [];
    grid.innerHTML = list.map(function (p) {
      var stats = p.st.map(function (s) {
        return '<div class="pstat"><b>' + s[1] + '</b><span>' + s[0] + '</span></div>';
      }).join('');
      var num = p.num > 0 ? p.num : '🏀';
      return '<article class="pcard">' +
        (p.cap ? '<span class="captain-flag">' + (key === 'mini' ? 'Squad' : 'Capitano') + '</span>' : '') +
        '<div class="pcard-top">' +
          '<div class="ovr"><b>' + p.ovr + '</b><span>OVR</span></div>' +
          '<span class="pos">' + p.pos + '</span>' +
        '</div>' +
        '<div class="pnum">' + num + '</div>' +
        '<div class="pcard-body">' +
          '<div class="pname">' + p.n + '<small>' + p.r + '</small></div>' +
          '<div class="pstats">' + stats + '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    // micro stagger-in
    Array.prototype.forEach.call(grid.children, function (el, i) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1)';
      setTimeout(function () { el.style.opacity = 1; el.style.transform = 'none'; }, 40 + i * 45);
    });
  }
  renderRoster('prima');

  var tabs = document.querySelectorAll('.tab[data-roster]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
      t.setAttribute('aria-selected', 'true');
      renderRoster(t.getAttribute('data-roster'));
    });
  });

  /* ── COUNT-UP for hero meta ── */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var b = el.querySelector('b');
    if (!b || isNaN(target)) return;
    var suffix = /\+/.test(b.textContent) ? '+' : '';
    var start = null, dur = 1100;
    function step(ts) {
      if (!start) start = ts;
      var prog = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - prog, 3);
      b.textContent = Math.round(target * eased) + (prog === 1 ? suffix : '');
      if (prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── REVEAL + count-up on scroll ── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        if (e.target.classList.contains('hero-meta')) {
          e.target.querySelectorAll('.m').forEach(countUp);
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  var heroMeta = document.querySelector('.hero-meta');
  if (heroMeta) io.observe(heroMeta);

  /* ── ACTIVE NAV on scroll ── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = navLinks.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var id = '#' + e.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { if (s) spy.observe(s); });

  /* ── MOBILE MENU ── */
  var burger = document.getElementById('burger');
  var hud = document.getElementById('hud');
  if (burger && hud) {
    burger.addEventListener('click', function () { hud.classList.toggle('open'); });
    hud.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { hud.classList.remove('open'); });
    });
  }
})();
