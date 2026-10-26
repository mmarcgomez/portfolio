/* =========================================================
   Mar's Farm · interactions
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel) { return document.querySelector(sel); };

  /* ---------- Pixel sprites (each char = one pixel) ---------- */
  var SPRITES = {
    junimo: { pal: { d: '#2f5d1e', g: '#7ed957', k: '#1b1b1b', l: '#4caf3a' }, px: [
      '....ll......',
      '.....l......',
      '.....d......',
      '...dddddd...',
      '..dggggggd..',
      '.dggggggggd.',
      '.dgkggggkgd.',
      '.dgkggggkgd.',
      '.dggggggggd.',
      '.dggggggggd.',
      '..dddddddd..',
      '..dd....dd..'] },
    star: { pal: { o: '#b5651d', y: '#ffd93b', Y: '#fff3a0' }, px: [
      '....o....',
      '...oYo...',
      'oooyYyooo',
      'oyyyyyyyo',
      '.oyyyyyo.',
      '..oyyyo..',
      '.oyyoyyo.',
      '.oyo.oyo.',
      '.oo...oo.'] },
    heart: { pal: { d: '#7a1622', r: '#e24a5a', w: '#ffb3bd' }, px: [
      '.dd.dd.',
      'dwrdrrd',
      'drrrrrd',
      'drrrrrd',
      '.drrrd.',
      '..drd..',
      '...d...'] },
    coin: { pal: { d: '#8a5a0b', y: '#ffd93b', Y: '#fff3a0' }, px: [
      '..dddd..',
      '.dyyyyd.',
      'dyYyyyyd',
      'dyYyyyyd',
      'dyyyyyyd',
      'dyyyyyyd',
      '.dyyyyd.',
      '..dddd..'] },
    letter: { pal: { d: '#6b4220', W: '#fff6dc', r: '#e04545' }, px: [
      'ddddddddddd',
      'ddWWWWWWWdd',
      'dWdWWWWWdWd',
      'dWWdWWWdWWd',
      'dWWWdrdWWWd',
      'dWWWWWWWWWd',
      'dWWWWWWWWWd',
      'ddddddddddd'] },
    pumpkin: { pal: { O: '#f28c28', o: '#d0661a', d: '#7a3b0c', G: '#4f8a2b' }, px: [
      '.....GG.....',
      '......G.....',
      '..dddddddd..',
      '.dOoOOoOOod.',
      'dOOoOOoOOoOd',
      'dOOoOOoOOoOd',
      'dOOoOOoOOoOd',
      'dOOoOOoOOoOd',
      '.dOoOOoOOod.',
      '..dddddddd..'] },
    parsnip: { pal: { w: '#f5e3b3', W: '#e2c27f', d: '#9c7a3c', G: '#5aa83a' }, px: [
      '..G...G...',
      '..GG.GG...',
      '...GGGG...',
      '....GG....',
      '...dwwd...',
      '..dwwWwd..',
      '..dwwwwd..',
      '..dwWwwd..',
      '...dwwd...',
      '...dwwd...',
      '....dd....',
      '....d.....'] },
    strawberry: { pal: { r: '#e8384f', y: '#ffe08a', d: '#8c1d2c', G: '#4f9a2f' }, px: [
      '...G.G.G..',
      '....GGG...',
      '.drrrrrrd.',
      'drryrrryrd',
      'drrrrrrrrd',
      'dryrrryrrd',
      '.drrrrrrd.',
      '..drryrd..',
      '...drrd...',
      '....dd....'] },
    sunflower: { pal: { y: '#ffcc33', b: '#7a4a1c', G: '#4f9a2f' }, px: [
      '...yyyy...',
      '..yybbyy..',
      '.yybbbbyy.',
      '.yybbbbyy.',
      '..yybbyy..',
      '...yyyy...',
      '....G.....',
      '..GGG.....',
      '....G.GG..',
      '....GGG...',
      '....G.....',
      '....G.....'] },
    sprout: { pal: { G: '#5aa83a', g: '#8fd65a' }, px: [
      '........',
      '........',
      '........',
      '.g....g.',
      '.gG..Gg.',
      '..GGGG..',
      '...GG...',
      '...G....'] },
    sun: { pal: { y: '#f5a623', Y: '#ffe066' }, px: [
      '....y....',
      '.y.....y.',
      '...yyy...',
      '..yYYYy..',
      'y.yYYYy.y',
      '..yYYYy..',
      '...yyy...',
      '.y.....y.',
      '....y....'] },
    moon: { pal: { m: '#f6f0c4', s: '#c9bf7f' }, px: [
      '..mmmm..',
      '.mmms...',
      'mmms....',
      'mmm.....',
      'mmm.....',
      'mmms...m',
      '.mmmmmm.',
      '..mmmm..'] },
    arrow: { pal: { r: '#d9481f', d: '#7a2410' }, px: [
      'ddddddd',
      'drrrrrd',
      '.drrrd.',
      '..drd..',
      '...d...'] },
    quest: { pal: { P: '#fbe6b6', k: '#9c7a3c', d: '#6b4220', r: '#e04545' }, px: [
      '.dddddddd.',
      'dPPPPPPPrd',
      'dPkkkkkPrd',
      'dPPPPPPPPd',
      'dPkkkkkkPd',
      'dPPPPPPPPd',
      'dPkkkkPPPd',
      'dPPPPPPPPd',
      '.dddddddd.'] },
    fish: { pal: { B: '#4aa3df', W: '#cfeeff', k: '#1b1b1b', d: '#1f4f7a' }, px: [
      '...dddd.....',
      '.ddBBBBdd.dd',
      'dBkBBBBBBdBd',
      'dBBBBBBBBBBd',
      'dWWWWWWWBdBd',
      '.ddWWWWdd.dd',
      '...dddd.....'] },
    gem: { pal: { P: '#c58cff', p: '#9b59e0', d: '#4b2380' }, px: [
      '..ddddd..',
      '.dPpPpPd.',
      'dPPpPpPPd',
      'dpPPpPPpd',
      '.dpPpPpd.',
      '..dpPpd..',
      '...dPd...',
      '....d....'] },
    sword: { pal: { W: '#e8eef5', d: '#5a6470', b: '#8a5a2b' }, px: [
      '........dd',
      '.......dWd',
      '......dWd.',
      '.....dWd..',
      '....dWd...',
      '.d.dWd....',
      '..dbd.....',
      '..bdd.....',
      '.b..d.....',
      'b.........'] },
    mailbox: { pal: { B: '#3d7fd1', b: '#2a5ea8', d: '#1d3b66', r: '#e04545', w: '#8a5a2b', G: '#5aa83a' }, px: [
      '........rr..',
      '........rrr.',
      '.ddddddd.r..',
      'dBBBBBBBdr..',
      'dBbbbbbBdr..',
      'dBbbbbbBd...',
      'dBBBBBBBd...',
      '.ddddddd....',
      '....ww......',
      '....ww......',
      '....ww......',
      '....ww......',
      '...wwww.....',
      '..GGGGGG....'] },
    leaf: { pal: { c: 'currentColor', d: 'rgba(0,0,0,.35)' }, px: [
      '....dd',
      '..dccd',
      '.dccd.',
      'dccd..',
      '.dd...',
      'd.....'] },
    paw: { pal: { d: '#6b4220', p: '#f7a8b8' }, px: [
      '...dd..dd...',
      '..dppddppd..',
      '..dppddppd..',
      'dd.dd..dd.dd',
      'dpd......dpd',
      'dpd.dddd.dpd',
      '.d.dppppd.d.',
      '..dppppppd..',
      '.dppppppppd.',
      '.dppppppppd.',
      '..dppppppd..',
      '...dddddd...'] },
    petal: { pal: { p: '#ffb7d5', P: '#ff8fbf' }, px: [
      '.pp.',
      'pPPp',
      'pPPp',
      '.pp.'] }
  };

  function spriteSVG(name) {
    var s = SPRITES[name];
    if (!s) return '';
    var w = 0, h = s.px.length, rects = '';
    for (var y = 0; y < h; y++) {
      var row = s.px[y];
      w = Math.max(w, row.length);
      var x = 0;
      while (x < row.length) {
        var c = row[x];
        if (c === '.') { x++; continue; }
        var run = 1;
        while (row[x + run] === c) run++;
        rects += '<rect x="' + x + '" y="' + y + '" width="' + run + '" height="1" fill="' + s.pal[c] + '"/>';
        x += run;
      }
    }
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + rects + '</svg>';
  }

  function paint(el, name) {
    if (name) el.setAttribute('data-sprite', name);
    el.innerHTML = spriteSVG(el.getAttribute('data-sprite'));
  }

  function paintAll(root) {
    (root || document).querySelectorAll('.px[data-sprite]').forEach(function (el) { paint(el); });
  }

  function makeSprite(name) {
    var i = document.createElement('i');
    i.className = 'px';
    paint(i, name);
    return i;
  }

  paintAll();

  /* ---------- Toast ---------- */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2800);
  }

  /* ---------- Day / night ---------- */
  var root = document.documentElement;
  function syncThemeIcons() {
    var night = root.getAttribute('data-theme') === 'night';
    paint($('#themeIcon'), night ? 'moon' : 'sun');
    paint($('#hudIcon'), night ? 'moon' : 'sun');
  }
  syncThemeIcons();

  $('#themeBtn').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'night' ? 'day' : 'night';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('farm-theme', next); } catch (e) {}
    syncThemeIcons();
    toast(next === 'night' ? 'The sun sets over the valley...' : 'You slept well. Rise and shine!');
  });

  /* ---------- HUD clock: real date as a Stardew day ---------- */
  var DAYS = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  function season(m) { return m >= 2 && m <= 4 ? 'Spring' : m >= 5 && m <= 7 ? 'Summer' : m >= 8 && m <= 10 ? 'Fall' : 'Winter'; }
  function tickClock() {
    var d = new Date();
    var h = d.getHours(), m = Math.floor(d.getMinutes() / 10) * 10; // Stardew time moves in 10-minute steps
    var h12 = h % 12 || 12;
    $('#hudDay').textContent = DAYS[d.getDay()] + ' ' + d.getDate();
    $('#hudSeason').textContent = season(d.getMonth());
    $('#hudTime').textContent = h12 + ':' + (m < 10 ? '0' : '') + m + (h < 12 ? ' am' : ' pm');
  }
  tickClock();
  setInterval(tickClock, 30000);
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Logo letters ---------- */
  var logo = $('#logo');
  var COLORS = ['#ffcf3f', '#8fd14f', '#ff9a3c', '#6ec6ff', '#ff7aa2'];
  var ci = 0;
  logo.setAttribute('aria-label', logo.textContent);
  logo.innerHTML = logo.textContent.split('').map(function (ch, i) {
    if (ch === ' ') return '<span aria-hidden="true">&nbsp;</span>';
    var color = COLORS[ci++ % COLORS.length];
    return '<span aria-hidden="true" style="color:' + color + ';animation-delay:' + (i * 0.06) + 's">' + ch + '</span>';
  }).join('');

  /* ---------- Dialogue box ---------- */
  var LINES = [
    "Hi! I'm Mar, welcome to my farm. Here I grow software instead of parsnips.",
    "I'm studying Multiplatform Application Development (DAM) and learning something new every single day.",
    "Lately I've been planting AI agents and backend systems... one of them even talks back!",
    "Take a look around: my projects are in the field and my mailbox is always open."
  ];
  var dlgText = $('#dlgText'), lineIdx = 0, typing = null;
  function typeLine(text) {
    clearInterval(typing);
    if (reduceMotion) { dlgText.textContent = text; typing = null; return; }
    var n = 0;
    dlgText.textContent = '';
    typing = setInterval(function () {
      n++;
      dlgText.textContent = text.slice(0, n);
      if (n >= text.length) { clearInterval(typing); typing = null; }
    }, 24);
  }
  function nextLine() {
    if (typing) { clearInterval(typing); typing = null; dlgText.textContent = LINES[lineIdx]; return; }
    lineIdx = (lineIdx + 1) % LINES.length;
    typeLine(LINES[lineIdx]);
  }
  $('#dialogue').addEventListener('click', nextLine);
  $('#dlgNext').addEventListener('click', function (e) { e.stopPropagation(); nextLine(); });
  typeLine(LINES[0]);

  /* ---------- Sky: stars ---------- */
  var stars = $('#stars');
  for (var s = 0; s < 55; s++) {
    var st = document.createElement('span');
    st.style.left = Math.random() * 100 + '%';
    st.style.top = Math.random() * 100 + '%';
    st.style.animationDelay = (Math.random() * 3) + 's';
    if (Math.random() < .25) { st.style.width = st.style.height = '4px'; }
    stars.appendChild(st);
  }

  /* ---------- Crops that grow ---------- */
  var cropsEl = $('#crops');
  var CROP_TYPES = ['parsnip', 'pumpkin', 'strawberry', 'sunflower', 'parsnip', 'strawberry', 'pumpkin', 'sunflower', 'parsnip', 'strawberry'];
  CROP_TYPES.forEach(function (type, i) {
    var spot = document.createElement('div');
    spot.className = 'crop';
    var sp = makeSprite('sprout');
    sp.style.visibility = 'hidden';
    spot.appendChild(sp);
    cropsEl.appendChild(spot);
    var grow = function (name) { sp.style.visibility = 'visible'; paint(sp, name); sp.classList.remove('pop'); void sp.offsetWidth; sp.classList.add('pop'); };
    if (reduceMotion) { grow(type); return; }
    setTimeout(function () { grow('sprout'); }, 600 + i * 180);
    setTimeout(function () { grow(type); }, 2200 + i * 220);
  });

  /* ---------- Junimos (click them for gold!) ---------- */
  var gold = 0, goldEl = $('#gold'), goldBox = document.querySelector('.hud-gold');
  var junimos = $('#junimos');
  var JUNIMO_TINTS = ['none', 'hue-rotate(160deg)', 'hue-rotate(260deg)', 'hue-rotate(-60deg)'];
  JUNIMO_TINTS.forEach(function (tint, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'junimo';
    b.tabIndex = -1;
    b.setAttribute('aria-hidden', 'true');
    b.style.filter = tint;
    b.style.animationDuration = (22 + i * 7) + 's';
    b.style.animationDelay = (-i * 9) + 's';
    b.appendChild(makeSprite('junimo'));
    b.addEventListener('click', function (e) {
      addGold(10, e.clientX, e.clientY);
      b.classList.remove('spin'); void b.offsetWidth; b.classList.add('spin');
    });
    junimos.appendChild(b);
  });

  function addGold(n, x, y) {
    gold += n;
    goldEl.textContent = gold;
    goldBox.classList.remove('bump'); void goldBox.offsetWidth; goldBox.classList.add('bump');
    var f = document.createElement('span');
    f.className = 'floater';
    f.textContent = '+' + n + 'g';
    f.style.left = (x - 20) + 'px';
    f.style.top = (y - 30) + 'px';
    document.body.appendChild(f);
    setTimeout(function () { f.remove(); }, 1000);
    if (gold === 10) toast('You found a Junimo! They love to be clicked.');
    if (gold === 100) toast('Achievement unlocked: Junimo Friend ★');
  }

  /* ---------- Backpack items ---------- */
  var ITEMS = [
    { id: 'python', name: 'Python', type: 'Language', desc: 'My main crop. AI agents, Flask apps, OOP practice and MySQL scripts.' },
    { id: 'java', name: 'Java', type: 'Language', desc: 'Learned in DAM: OOP, multiplatform apps and Spring Boot web apps like PawVet.' },
    { id: 'js', name: 'JavaScript', type: 'Language', desc: "Brings web pages to life, like Jarvis' animated eyes." },
    { id: 'html', name: 'HTML', type: 'Markup', desc: 'The soil every web page grows from.' },
    { id: 'css', name: 'CSS', type: 'Styling', desc: 'Paint for the farmhouse: layouts, colors and animations.' },
    { id: 'react', name: 'React', type: 'Library', desc: 'Component-based interfaces. Currently growing.' },
    { id: 'nodejs', name: 'Node.js', type: 'Runtime', desc: 'JavaScript on the server side.' },
    { id: 'flask', name: 'Flask', type: 'Framework', desc: "Lightweight Python web server behind Jarvis' real-time interface." },
    { id: 'mysql', name: 'MySQL', type: 'Database', desc: 'Tables and queries from Python connectors and Spring Data JPA.' },
    { id: 'ollama', name: 'Ollama', type: 'AI tool', emoji: '🦙', desc: 'Runs LLMs like Llama 3 locally. The brain of my agents.' },
    { id: 'git', name: 'Git', type: 'Tool', desc: 'Version control. Every commit is a seed planted.' },
    { id: 'github', name: 'GitHub', type: 'Platform', desc: 'Where my projects live and grow.' },
    { id: 'vscode', name: 'VS Code', type: 'Editor', desc: 'My trusty watering can.' }
  ];
  var inv = $('#inventory'), info = $('#itemInfo'), buttons = [];
  function showItem(item, btn) {
    var icon = info.querySelector('#infoIcon, .emoji');
    if (item.emoji) {
      var e = document.createElement('span');
      e.className = 'emoji'; e.id = 'infoIcon'; e.textContent = item.emoji; e.setAttribute('aria-hidden', 'true');
      icon.replaceWith(e);
    } else {
      var img = document.createElement('img');
      img.id = 'infoIcon'; img.alt = ''; img.width = 40; img.height = 40;
      img.src = 'assets/icons/' + item.id + '.svg';
      icon.replaceWith(img);
    }
    $('#infoName').textContent = item.name;
    $('#infoType').textContent = item.type;
    $('#infoDesc').textContent = item.desc;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
  }
  ITEMS.forEach(function (item, i) {
    var li = document.createElement('li');
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', item.name);
    b.title = item.name;
    if (item.emoji) {
      b.innerHTML = '<span class="emoji" aria-hidden="true">' + item.emoji + '</span>';
    } else {
      b.innerHTML = '<img src="assets/icons/' + item.id + '.svg" alt="" width="40" height="40" loading="lazy">';
    }
    ['mouseenter', 'focus', 'click'].forEach(function (ev) { b.addEventListener(ev, function () { showItem(item, b); }); });
    li.appendChild(b);
    inv.appendChild(li);
    buttons.push(b);
    if (i === 0) b.setAttribute('aria-pressed', 'true');
  });
  for (var k = 0; k < 3; k++) {
    var li = document.createElement('li');
    li.innerHTML = '<span class="inv-empty" aria-hidden="true"></span>';
    inv.appendChild(li);
  }

  /* ---------- Active tab while scrolling ---------- */
  var tabLinks = document.querySelectorAll('.tabs a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tabLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section').forEach(function (sec) { io.observe(sec); });
  }

  /* ---------- Energy bar = how much page is left ---------- */
  var fill = $('#energyFill'), tired = false;
  function onScroll() {
    var max = document.documentElement.scrollHeight - innerHeight;
    var p = max > 0 ? Math.min(1, scrollY / max) : 0;
    var left = 1 - p * 0.9;
    fill.style.height = (left * 100) + '%';
    fill.style.background = 'hsl(' + Math.round(left * 110) + ' 75% 45%)';
    if (p > 0.98 && !tired) { tired = true; toast("You're getting tired... why not send Mar a letter?"); }
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Seasonal weather ---------- */
  var weather = $('#weather');
  var now = new Date(), month = now.getMonth(), seasonName = season(month);
  if (!reduceMotion) {
    var count = innerWidth < 640 ? 7 : 13;
    var LEAF_COLORS = ['#e8742a', '#d9481f', '#f2b134', '#b5651d'];
    for (var p = 0; p < count; p++) {
      var part = document.createElement('div');
      part.className = 'particle';
      if (seasonName === 'Fall') {
        var leaf = makeSprite('leaf');
        leaf.style.color = LEAF_COLORS[p % LEAF_COLORS.length];
        part.appendChild(leaf);
      } else if (seasonName === 'Spring') {
        part.appendChild(makeSprite('petal'));
        part.style.width = part.style.height = '12px';
      } else if (seasonName === 'Winter') {
        part.classList.add('snow');
      } else {
        continue; // summer: just fireflies at night
      }
      part.style.left = Math.random() * 100 + '%';
      part.style.animationDuration = (10 + Math.random() * 9) + 's';
      part.style.animationDelay = (-Math.random() * 18) + 's';
      part.querySelector('.px') && (part.querySelector('.px').style.animationDelay = (-Math.random() * 3) + 's');
      weather.appendChild(part);
    }
    for (var f = 0; f < 10; f++) {
      var ff = document.createElement('div');
      ff.className = 'firefly';
      ff.style.left = Math.random() * 100 + '%';
      ff.style.top = 30 + Math.random() * 65 + '%';
      ff.style.animationDelay = (-Math.random() * 9) + 's, ' + (-Math.random() * 2) + 's';
      weather.appendChild(ff);
    }
  }

  /* ---------- Contact letter (EmailJS) ---------- */
  // Fill these in from the EmailJS dashboard (see README). The public key is
  // meant to live in client code; restrict allowed domains in EmailJS instead.
  var EMAILJS = {
    publicKey: 'VugqTaugISu3QwTWJ',
    serviceId: 'service_335aqgn',
    templateId: 'template_p8isklk'
  };
  var CONTACT_EMAIL = 'mmargomez01@gmail.com';
  var form = $('#letterForm'), status = $('#formStatus'), sendBtn = $('#sendBtn');
  var emailReady = !!window.emailjs && !/^YOUR_/.test(EMAILJS.publicKey + EMAILJS.serviceId + EMAILJS.templateId);

  if (emailReady) {
    emailjs.init({
      publicKey: EMAILJS.publicKey,
      blockHeadless: true,
      limitRate: { id: 'mars-farm-letter', throttle: 10000 } // one letter every 10 s
    });
  }

  function fail(msg) {
    status.className = 'form-status err';
    status.textContent = msg + ' You can also write to ' + CONTACT_EMAIL + '.';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    if (f.honey.value) return;
    if (!emailReady) { fail('The mailbox is closed for now.'); return; }

    f.time.value = new Date().toLocaleString();
    status.className = 'form-status';
    status.textContent = 'Walking to the mailbox...';
    sendBtn.disabled = true;

    emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form)
      .then(function () {
        status.className = 'form-status ok';
        status.textContent = 'Your letter is in the mailbox! Mar will write back soon.';
        form.classList.add('sent');
        var mb = $('#mailbox');
        mb.classList.remove('got-mail'); void mb.offsetWidth; mb.classList.add('got-mail');
        toast('Letter delivered ✉');
        form.reset();
        setTimeout(function () { form.classList.remove('sent'); }, 900);
      }, function (err) {
        var limited = err && (err.status === 429 || /limit/i.test(err.text || ''));
        fail(limited ? 'Easy there, the mail carrier needs a breather. Try again in a few seconds.'
                     : 'The letter got lost on the way.');
      })
      .then(function () { sendBtn.disabled = false; });
  });
})();
