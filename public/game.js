/* Starwillow Witch School: a cozy game for Michelle, Seo-Ah, and Carrot the turtle. */
(() => {
  'use strict';

  // ---------- Data ----------
  const CROPS = {
    moonberry:    { name: 'Moonberry',     em: '🫐', grow: 30, seed: 2, sell: 3 },
    carrot:       { name: 'Carrot',        em: '🥕', grow: 24, seed: 2, sell: 3 },
    starflower:   { name: 'Starflower',    em: '🌼', grow: 40, seed: 3, sell: 4 },
    fairyblossom: { name: 'Fairy Blossom', em: '🌸', grow: 40, seed: 3, sell: 4 },
    glowshroom:   { name: 'Glowshroom',    em: '🍄', grow: 50, seed: 4, sell: 5 },
    pumpkin:      { name: 'Pumpkin',       em: '🎃', grow: 60, seed: 5, sell: 7 },
  };

  const RECIPES = {
    glow:    { name: 'Glow Potion',          em: '✨', ings: ['glowshroom', 'starflower'],                sell: 8,  effect: 'glow',    desc: 'Makes everything sparkle and shine.' },
    float:   { name: 'Float Potion',         em: '🎈', ings: ['fairyblossom', 'moonberry'],               sell: 8,  effect: 'float',   desc: 'Whoosh! You float up like a balloon.' },
    giggle:  { name: 'Giggle Potion',        em: '😆', ings: ['carrot', 'moonberry'],                     sell: 6,  effect: 'giggle',  desc: 'Everything wiggles and giggles.' },
    sleepy:  { name: 'Sleepy Potion',        em: '😴', ings: ['fairyblossom', 'glowshroom'],              sell: 8,  effect: 'sleep',   desc: 'A cozy nap that skips to tomorrow.' },
    speedy:  { name: 'Speedy Turtle Potion', em: '🐢', ings: ['carrot', 'glowshroom'],                    sell: 9,  effect: 'zoom',    desc: 'Carrot zooms around and waters every plant!' },
    grow:    { name: 'Growth Potion',        em: '🌱', ings: ['carrot', 'pumpkin'],                       sell: 10, effect: 'grow',    desc: 'Every planted seed grows up instantly.' },
    rainbow: { name: 'Rainbow Potion',       em: '🌈', ings: ['fairyblossom', 'moonberry', 'starflower'], sell: 12, effect: 'rainbow', desc: 'Paints the whole sky with rainbows.' },
    friend:  { name: 'Friendship Potion',    em: '💖', ings: ['moonberry', 'pumpkin', 'starflower'],      sell: 14, effect: 'friend',  desc: 'Seo-Ah\'s favorite! A warm, happy feeling.' },
  };
  const SOUP = { name: 'Bubbly Mystery Soup', em: '🥣', sell: 1 };
  const recipeKey = ings => [...ings].sort().join('+');
  const RECIPE_BY_KEY = Object.fromEntries(Object.entries(RECIPES).map(([id, r]) => [recipeKey(r.ings), id]));

  const FURNITURE = {
    bed:      { name: 'Cozy Bed',          em: '🛏️', price: 0 },
    plant:    { name: 'Potted Plant',      em: '🪴', price: 6 },
    candle:   { name: 'Candle',            em: '🕯️', price: 5 },
    bow:      { name: 'Big Bow',           em: '🎀', price: 4 },
    cake:     { name: 'Strawberry Cake',   em: '🍰', price: 7 },
    books:    { name: 'Spell Books',       em: '📚', price: 8 },
    teddy:    { name: 'Teddy Bear',        em: '🧸', price: 10 },
    mirror:   { name: 'Magic Mirror',      em: '🪞', price: 12 },
    globe:    { name: 'Crystal Ball',      em: '🔮', price: 12 },
    moon:     { name: 'Moon Lamp',         em: '🌙', price: 14 },
    couch:    { name: 'Comfy Couch',       em: '🛋️', price: 15 },
    pond:     { name: 'Carrot\'s Pond',    em: '🪷', price: 18 },
    // Gifts from Seo-Ah (not sold in the shop)
    chime:    { name: 'Wind Chime from Seo-Ah',   em: '🎐', gift: true },
    lantern:  { name: 'Lantern from Seo-Ah',      em: '🏮', gift: true },
    photo:    { name: 'Best Friends Photo',       em: '🖼️', gift: true },
    star:     { name: 'Best Friends Star',        em: '🌟', gift: true },
  };

  const HEART_GIFTS = [
    { hearts: 3,  item: 'chime',   text: 'I made this wind chime for you! In Korea it\'s called a pung-gyeong. It sings when the wind says hi. 🎐' },
    { hearts: 6,  item: 'lantern', text: 'This lantern is like the ones at the lantern festival back home. Now your room will glow! 🏮' },
    { hearts: 10, item: 'photo',   text: 'Look! It\'s a photo of us and Carrot from our first day. Let\'s keep it forever! 🖼️' },
    { hearts: 15, item: 'star',    text: 'You\'re my best friend, Michelle. This star means we\'ll always be friends. Chingu yeongwonhi! 🌟' },
  ];

  const KOREAN_WORDS = [
    ['안녕 (annyeong)', 'hi!'],
    ['친구 (chingu)', 'friend'],
    ['마녀 (manyeo)', 'witch'],
    ['거북이 (geobugi)', 'turtle — that\'s Carrot!'],
    ['꽃 (kkot)', 'flower'],
    ['별 (byeol)', 'star'],
    ['고마워 (gomawo)', 'thank you'],
    ['사랑해 (saranghae)', 'I love you'],
    ['화이팅 (hwaiting)', 'you can do it!'],
    ['맛있어 (masisseo)', 'yummy!'],
    ['당근 (danggeun)', 'carrot — like Carrot\'s name!'],
    ['마법 (mabeop)', 'magic'],
  ];

  const SEOAH_CHATS = [
    'Michelle! Did you finish the homework? I tried to brew a Float Potion and my hat floated away! 😂',
    'Professor Hootsworth fell asleep in class again. Shh, don\'t tell!',
    'My halmeoni (that\'s grandma!) makes the best tteokbokki. I\'ll bring you some!',
    'Carrot looks extra shiny today. I think he likes you a LOT.',
    'When we\'re grown-up witches, let\'s open a potion café together!',
    'I love starflowers. They look like tiny suns. 🌼',
    'Want to have a sleepover in the dorm? We can read spell books with flashlights!',
    'I practiced my broom flying! I only crashed into the hedge twice. 🧹',
  ];

  const CARROT_LINES = [
    '*happy turtle noises* 🐢 (Carrot wants a snack!)',
    'Carrot does a slow, proud little spin.',
    'Carrot blinks at you very slowly. That means "I love you" in turtle.',
    'Carrot nudges your boot toward the garden. Time to water?',
    'Carrot yawns. Even turtles get sleepy at witch school.',
    'Carrot is trying to stir the cauldron with his tiny foot. So helpful!',
  ];

  const LESSONS = [
    { want: 'crop:moonberry',   reward: 5,  intro: 'Welcome to Plant Magic class! Every witch starts with a garden. Grow and bring me one Moonberry.', hint: 'Plant a Moonberry seed in the Garden, water it, and wait for it to sparkle.' },
    { want: 'potion:giggle',    reward: 6,  intro: 'Today: Potion Basics! Brew a Giggle Potion.', hint: 'Giggle Potion = 🥕 Carrot + 🫐 Moonberry. Stir, stir, stir!' },
    { want: 'potion:glow',      reward: 8,  intro: 'Night is coming. Brew a Glow Potion to light our classroom.', hint: 'Glow Potion = 🍄 Glowshroom + 🌼 Starflower.' },
    { want: 'potion:float',     reward: 8,  intro: 'Floating lesson! Please brew a Float Potion. Hold on to your hats!', hint: 'Float Potion = 🌸 Fairy Blossom + 🫐 Moonberry.' },
    { want: 'potion:speedy',    reward: 10, intro: 'Animal Magic class! Brew a potion that helps our animal friends.', hint: 'Speedy Turtle Potion = 🥕 Carrot + 🍄 Glowshroom. Carrot will love it.' },
    { want: 'potion:rainbow',   reward: 12, intro: 'Advanced class! A Rainbow Potion uses THREE ingredients.', hint: 'Rainbow Potion = 🌸 Fairy Blossom + 🫐 Moonberry + 🌼 Starflower.' },
    { want: 'potion:friend',    reward: 15, intro: 'The final lesson of the term: the Friendship Potion. Share it with someone special.', hint: 'Friendship Potion = 🫐 Moonberry + 🎃 Pumpkin + 🌼 Starflower.' },
  ];

  const PEOPLE = {
    michelle: { name: 'Michelle', img: 'assets/portrait-michelle.jpg' },
    seoah:    { name: 'Seo-Ah',   img: 'assets/portrait-seoah.jpg' },
    carrot:   { name: 'Carrot',   img: 'assets/portrait-carrot.jpg' },
    owl:      { name: 'Professor Hootsworth', em: '🦉' },
    bramble:  { name: 'Mrs. Bramble', em: '🦔' },
  };

  const SAVE_KEY = 'starwillow-save-v1';
  const ROOM_SIZE = 36;

  // ---------- State ----------
  function newState() {
    const room = Array(ROOM_SIZE).fill(null);
    room[0] = 'bed';
    return {
      started: false,
      day: 1,
      stars: 10,
      hearts: 0,
      seeds: { moonberry: 3, carrot: 2, starflower: 2 },
      crops: {},
      potions: {},
      furniture: {},
      room,
      plots: Array.from({ length: 6 }, () => null),
      discovered: [],
      lesson: 0,
      bonusLesson: null,
      giftsGiven: [],
      daily: { talked: false, gifted: false, carrot: false, word: 0 },
      sound: true,
      savedAt: Date.now(),
    };
  }

  let S = load();
  let scene = 'garden';
  let pot = S.pot || [];
  let stir = 0;
  let roomSel = null;

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return newState();
      const s = Object.assign(newState(), JSON.parse(raw));
      // Plants keep growing while the game is closed, until they need water again.
      const away = Math.max(0, (Date.now() - (s.savedAt || Date.now())) / 1000);
      s.plots.forEach(p => { if (p) growPlot(p, away); });
      return s;
    } catch {
      return newState();
    }
  }
  function save() {
    S.savedAt = Date.now();
    S.pot = pot;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch {}
  }

  const add = (bag, id, n = 1) => { bag[id] = (bag[id] || 0) + n; if (bag[id] <= 0) delete bag[id]; };
  const $ = sel => document.querySelector(sel);

  // ---------- Sound ----------
  let audio;
  function chime(notes = [660, 880], dur = 0.12, type = 'sine') {
    if (!S.sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = audio.currentTime;
      notes.forEach((f, i) => {
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0 + i * dur);
        g.gain.exponentialRampToValueAtTime(0.18, t0 + i * dur + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * dur + dur * 2.2);
        o.connect(g).connect(audio.destination);
        o.start(t0 + i * dur); o.stop(t0 + i * dur + dur * 2.5);
      });
    } catch {}
  }
  const SFX = {
    tap: () => chime([520], 0.06, 'triangle'),
    plant: () => chime([392, 523], 0.09, 'triangle'),
    water: () => chime([880, 740, 660], 0.06),
    harvest: () => chime([523, 659, 784, 1046], 0.08),
    coin: () => chime([988, 1319], 0.07, 'square'),
    magic: () => chime([523, 659, 784, 988, 1175, 1568], 0.08),
    oops: () => chime([330, 262], 0.12, 'triangle'),
    heart: () => chime([659, 784, 1046], 0.1),
  };

  // ---------- UI helpers ----------
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.remove('hidden');
    t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add('hidden'), 2200);
  }

  function sparkle(x, y, ems = ['✨', '⭐', '💫'], count = 8) {
    const fx = $('#fx');
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'spark';
      s.textContent = ems[i % ems.length];
      s.style.left = (x - 15 + (Math.random() * 60 - 30)) + 'px';
      s.style.top = (y - 15 + (Math.random() * 30 - 15)) + 'px';
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.animationDelay = (i * 0.05) + 's';
      fx.appendChild(s);
      setTimeout(() => s.remove(), 1800);
    }
  }
  function sparkleAt(el, ems, count) {
    const r = el.getBoundingClientRect();
    sparkle(r.left + r.width / 2, r.top + r.height / 2, ems, count);
  }
  function overlay(cls, ms = 2600) {
    const o = document.createElement('div');
    o.className = cls; $('#fx').appendChild(o);
    setTimeout(() => o.remove(), ms);
  }

  // Dialog queue: lines of { who, text }.
  let dialogQueue = [];
  let dialogDone = null;
  function say(lines, done) {
    dialogQueue = lines.slice();
    dialogDone = done || null;
    nextLine();
  }
  function nextLine() {
    const line = dialogQueue.shift();
    if (!line) {
      $('#dialog').classList.add('hidden');
      const d = dialogDone; dialogDone = null;
      if (d) d();
      return;
    }
    const p = PEOPLE[line.who];
    $('#dialog-avatar').innerHTML = p.img ? `<img src="${p.img}" alt="">` : p.em;
    $('#dialog-name').textContent = p.name;
    $('#dialog-text').textContent = line.text;
    $('#dialog').classList.remove('hidden');
  }

  function openModal(html) { $('#modal-card').innerHTML = html; $('#modal').classList.remove('hidden'); }
  function closeModal() { $('#modal').classList.add('hidden'); }

  function updateHud() {
    $('#hud-stars').textContent = S.stars;
    $('#hud-hearts').textContent = S.hearts;
  }

  // ---------- Garden ----------
  function growPlot(p, seconds) {
    let left = seconds;
    while (left > 0 && p.watered && p.stage < 2) {
      const stageLen = CROPS[p.crop].grow / 2;
      const need = stageLen - p.progress;
      if (left >= need) {
        left -= need; p.stage++; p.progress = 0; p.watered = false;
      } else {
        p.progress += left; left = 0;
      }
    }
  }

  function renderGarden() {
    const plots = S.plots.map((p, i) => {
      if (!p) return `<button class="plot" data-act="plot" data-i="${i}"><span style="opacity:.5">➕</span><span class="label">Plant</span></button>`;
      const c = CROPS[p.crop];
      if (p.stage >= 2) return `<button class="plot ready" data-act="plot" data-i="${i}">${c.em}<span class="label">Harvest!</span></button>`;
      const icon = p.stage === 0 ? '🌰' : '🌿';
      const label = p.watered ? `${c.name}` : 'Needs water';
      const drops = p.watered ? '<span class="drops">💧</span>' : '';
      return `<button class="plot" data-act="plot" data-i="${i}">${icon}${drops}<span class="label">${label}</span></button>`;
    }).join('');
    return `<div class="scene bg-garden">
      <h2>🌱 Michelle's Garden</h2>
      <p class="hint">Tap a patch to plant, tap again to water. Plants never wilt — take your time!</p>
      <div class="plots">${plots}</div>
    </div>`;
  }

  function plotTap(i, el) {
    const p = S.plots[i];
    if (!p) return seedPicker(i);
    const c = CROPS[p.crop];
    if (p.stage >= 2) {
      S.plots[i] = null;
      const n = p.crop === 'pumpkin' ? 1 : 2;
      add(S.crops, p.crop, n);
      S.stars += 1;
      SFX.harvest();
      sparkleAt(el, [c.em, '⭐', '✨']);
      toast(`You picked ${n} ${c.name}${n > 1 ? 's' : ''}! +1 ⭐`);
    } else if (!p.watered) {
      p.watered = true;
      SFX.water();
      sparkleAt(el, ['💧', '💦'], 6);
    } else {
      const secs = Math.ceil(c.grow / 2 - p.progress);
      toast(`${c.name} is growing… ${secs}s 🌱`);
      SFX.tap();
    }
    save(); render();
  }

  function seedPicker(i) {
    const ids = Object.keys(S.seeds).filter(id => S.seeds[id] > 0);
    const items = ids.length
      ? ids.map(id => `<div class="list-item"><span class="em">${CROPS[id].em}</span>
          <div class="grow"><b>${CROPS[id].name} seeds × ${S.seeds[id]}</b><small>Grows in about ${CROPS[id].grow} seconds</small></div>
          <button class="btn primary" data-act="plant" data-i="${i}" data-id="${id}">Plant</button></div>`).join('')
      : `<div class="empty">No seeds left! Visit Mrs. Bramble's shop 🛍️ to buy more.</div>`;
    openModal(`<h3>🌰 Pick a seed</h3>${items}<div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  function plant(i, id) {
    if (!S.seeds[id]) return;
    add(S.seeds, id, -1);
    S.plots[i] = { crop: id, stage: 0, progress: 0, watered: false };
    closeModal(); SFX.plant(); save(); render();
    toast(`Planted ${CROPS[id].name}! Now tap it to water 💧`);
  }

  // ---------- Cauldron ----------
  function renderCauldron() {
    const inPot = pot.map(id => CROPS[id].em).join(' ') || '';
    const ids = Object.keys(CROPS).filter(id => S.crops[id] > 0 || pot.includes(id));
    const ings = ids.length
      ? ids.map(id => `<button class="ing" data-act="addIng" data-id="${id}" ${pot.includes(id) || pot.length >= 3 || !S.crops[id] ? 'disabled' : ''}>
          ${CROPS[id].em}<small>${CROPS[id].name} × ${S.crops[id] || 0}</small></button>`).join('')
      : `<p class="hint">Your basket is empty. Harvest plants in the Garden first! 🌱</p>`;
    const ready = pot.length > 0 && stir >= 100;
    return `<div class="scene bg-cauldron">
      <h2>🧪 Potion Room</h2>
      <p class="hint">${pot.length ? 'Draw circles in the cauldron with your finger to stir!' : 'Tap up to 3 ingredients to drop them in.'}</p>
      <div class="cauldron-wrap" id="cauldron">
        <div class="cauldron"></div>
        <div class="brew" id="brew"></div>
        <div class="in-pot">${inPot}</div>
      </div>
      <div class="stir-meter"><div id="stir-fill" style="width:${stir}%"></div></div>
      <div class="row">
        <button class="btn" data-act="stirBtn" ${pot.length ? '' : 'disabled'}>🥄 Stir</button>
        <button class="btn primary" data-act="brew" ${ready ? '' : 'disabled'}>✨ Brew!</button>
        <button class="btn" data-act="emptyPot" ${pot.length ? '' : 'disabled'}>↩️ Empty</button>
      </div>
      <div class="ingredients">${ings}</div>
    </div>`;
  }

  function bindCauldron() {
    const wrap = $('#cauldron');
    if (!wrap) return;
    let last = null;
    const center = () => { const r = wrap.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
    wrap.addEventListener('pointerdown', e => { last = Math.atan2(e.clientY - center()[1], e.clientX - center()[0]); wrap.setPointerCapture(e.pointerId); });
    wrap.addEventListener('pointermove', e => {
      if (last === null || !pot.length) return;
      const [cx, cy] = center();
      const a = Math.atan2(e.clientY - cy, e.clientX - cx);
      let d = a - last;
      if (d > Math.PI) d -= 2 * Math.PI;
      if (d < -Math.PI) d += 2 * Math.PI;
      last = a;
      addStir(Math.abs(d) / (3 * Math.PI) * 100); // one and a half circles fills the meter
    });
    const end = () => { last = null; $('#brew') && $('#brew').classList.remove('stirring'); };
    wrap.addEventListener('pointerup', end);
    wrap.addEventListener('pointercancel', end);
  }

  function addStir(amount) {
    const was = stir;
    stir = Math.min(100, stir + amount);
    $('#brew').classList.add('stirring');
    $('#stir-fill').style.width = stir + '%';
    if (Math.floor(stir / 25) > Math.floor(was / 25)) chime([440 + stir * 4], 0.05, 'triangle');
    if (stir >= 100 && was < 100) {
      SFX.magic();
      sparkleAt($('#cauldron'), ['🫧', '✨'], 8);
      render();
    }
  }

  function brew() {
    const key = recipeKey(pot);
    const id = RECIPE_BY_KEY[key];
    pot = []; stir = 0;
    if (!id) {
      add(S.potions, 'soup');
      SFX.oops();
      say([{ who: 'carrot', text: 'Blorp! It turned into Bubbly Mystery Soup 🥣. Carrot sniffs it… and sneezes. Try a different mix!' }]);
    } else {
      const r = RECIPES[id];
      add(S.potions, id);
      const isNew = !S.discovered.includes(id);
      SFX.magic();
      sparkleAt($('#cauldron'), [r.em, '✨', '⭐'], 12);
      if (isNew) {
        S.discovered.push(id);
        S.stars += 3;
        say([{ who: 'michelle', text: `I made a ${r.name} ${r.em}! It's a brand-new recipe for my book! (+3 ⭐)` }]);
      } else {
        toast(`You brewed a ${r.name} ${r.em}!`);
      }
    }
    save(); render();
  }

  // ---------- Class ----------
  function currentLesson() {
    if (S.lesson < LESSONS.length) return LESSONS[S.lesson];
    if (!S.bonusLesson) {
      const ids = Object.keys(RECIPES);
      const id = ids[Math.floor(Math.random() * ids.length)];
      S.bonusLesson = { want: 'potion:' + id, reward: Math.ceil(RECIPES[id].sell * 1.5), intro: `Extra credit! Could you brew me a ${RECIPES[id].name}?`, hint: `${RECIPES[id].name} = ${RECIPES[id].ings.map(i => CROPS[i].em + ' ' + CROPS[i].name).join(' + ')}` };
      save();
    }
    return S.bonusLesson;
  }
  function wantInfo(want) {
    const [kind, id] = want.split(':');
    const item = kind === 'crop' ? CROPS[id] : RECIPES[id];
    const bag = kind === 'crop' ? S.crops : S.potions;
    return { kind, id, item, have: bag[id] || 0, bag };
  }

  function renderClass() {
    const L = currentLesson();
    const w = wantInfo(L.want);
    return `<div class="scene bg-class">
      <div class="chalk">Starwillow Witch School · Day ${S.day} · ${S.lesson < LESSONS.length ? `Lesson ${S.lesson + 1} of ${LESSONS.length}` : 'Extra credit'}</div>
      <div class="class-row">
        <button class="npc" data-act="owl"><div class="face">🦉</div><div class="nm">Prof. Hootsworth</div></button>
        <button class="npc" data-act="seoah"><div class="face"><img src="assets/portrait-seoah.jpg" alt=""></div><div class="nm">Seo-Ah 💖 ${S.hearts}</div></button>
      </div>
      <div class="lesson-card">
        <div>📜 <b>Today's lesson</b></div>
        <div class="want">${w.item.em}</div>
        <div>${L.intro}</div>
        <div style="margin-top:6px;font-size:16px;opacity:.8">💡 ${L.hint}</div>
        <div class="row">
          <button class="btn primary" data-act="turnIn" ${w.have ? '' : 'disabled'}>Give ${w.item.name} (${w.have}) · +${L.reward} ⭐</button>
        </div>
      </div>
      <div class="row">
        <button class="btn pink" data-act="talk" ${S.daily.talked ? 'disabled' : ''}>💬 Chat with Seo-Ah</button>
        <button class="btn pink" data-act="giftMenu" ${S.daily.gifted ? 'disabled' : ''}>🎁 Give a gift</button>
      </div>
    </div>`;
  }

  function turnIn() {
    const L = currentLesson();
    const w = wantInfo(L.want);
    if (!w.have) return;
    add(w.bag, w.id, -1);
    S.stars += L.reward;
    const wasLast = S.lesson === LESSONS.length - 1;
    if (S.lesson < LESSONS.length) S.lesson++; else S.bonusLesson = null;
    SFX.coin(); save(); render();
    const lines = [{ who: 'owl', text: `Hoo-hoo! Wonderful work, Michelle! Here are ${L.reward} stars. ⭐` }];
    if (wasLast) lines.push(
      { who: 'owl', text: 'You have finished every lesson this term. You are a real Starwillow witch now! 🎓' },
      { who: 'seoah', text: 'We did it, Michelle!! Best witch friends forever! 💖' },
    );
    else lines.push({ who: 'seoah', text: ['Yay! Hwaiting, Michelle! 💪', 'You\'re so good at this!', 'Carrot is clapping. Well… flapping. 🐢'][Math.floor(Math.random() * 3)] });
    say(lines);
  }

  function giveHearts(n) {
    const before = S.hearts;
    S.hearts += n;
    SFX.heart();
    sparkle(window.innerWidth / 2, window.innerHeight / 2, ['💖', '💕', '✨'], 10);
    const unlock = HEART_GIFTS.find(g => before < g.hearts && S.hearts >= g.hearts);
    return unlock;
  }

  function talk() {
    if (S.daily.talked) return;
    S.daily.talked = true;
    const chat = SEOAH_CHATS[(S.day - 1) % SEOAH_CHATS.length];
    const [ko, en] = KOREAN_WORDS[S.daily.word % KOREAN_WORDS.length];
    const unlock = giveHearts(1);
    save(); render();
    const lines = [
      { who: 'seoah', text: chat },
      { who: 'seoah', text: `Korean word of the day: ${ko} means "${en}"! 🇰🇷` },
      { who: 'michelle', text: `${ko.split(' ')[0]}! I'll remember that. 💖` },
    ];
    if (unlock) pushUnlock(lines, unlock);
    say(lines);
  }

  function pushUnlock(lines, unlock) {
    add(S.furniture, unlock.item);
    lines.push({ who: 'seoah', text: unlock.text });
    lines.push({ who: 'michelle', text: `Thank you, Seo-Ah! I'll put it in my room! (${FURNITURE[unlock.item].em} added to your Room)` });
    save();
  }

  function giftMenu() {
    const rows = [];
    Object.keys(S.crops).forEach(id => rows.push(`<div class="list-item"><span class="em">${CROPS[id].em}</span><div class="grow"><b>${CROPS[id].name} × ${S.crops[id]}</b><small>${id === 'starflower' ? 'Seo-Ah LOVES these!' : 'A nice gift'}</small></div><button class="btn pink" data-act="gift" data-kind="crop" data-id="${id}">Give</button></div>`));
    Object.keys(S.potions).forEach(id => {
      const p = id === 'soup' ? SOUP : RECIPES[id];
      rows.push(`<div class="list-item"><span class="em">${p.em}</span><div class="grow"><b>${p.name} × ${S.potions[id]}</b><small>${['friend', 'rainbow'].includes(id) ? 'Seo-Ah LOVES these!' : id === 'soup' ? 'Hmm… are you sure? 😅' : 'A nice gift'}</small></div><button class="btn pink" data-act="gift" data-kind="potion" data-id="${id}">Give</button></div>`);
    });
    openModal(`<h3>🎁 Gift for Seo-Ah</h3>${rows.join('') || '<div class="empty">Nothing to give yet. Grow something in the garden!</div>'}<div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  function gift(kind, id) {
    const bag = kind === 'crop' ? S.crops : S.potions;
    if (!bag[id] || S.daily.gifted) return;
    add(bag, id, -1);
    S.daily.gifted = true;
    closeModal();
    const loved = id === 'starflower' || id === 'friend' || id === 'rainbow';
    const lines = [];
    let unlock;
    if (id === 'soup') {
      lines.push({ who: 'seoah', text: 'Mystery soup?! 😂 It smells like socks… but you made me laugh so hard! Thanks!' });
      unlock = giveHearts(1);
    } else if (loved) {
      lines.push({ who: 'seoah', text: id === 'friend' ? 'A Friendship Potion?! Michelle… that\'s the sweetest thing ever! 🥹💖' : 'WAH! This is my absolute favorite! Gomawo, Michelle!! 💖💖' });
      unlock = giveHearts(3);
    } else {
      lines.push({ who: 'seoah', text: 'For me? Thank you, Michelle! You\'re the best. 😊' });
      unlock = giveHearts(1);
    }
    if (unlock) pushUnlock(lines, unlock);
    save(); render(); say(lines);
  }

  // ---------- Room ----------
  function renderRoom() {
    const tiles = S.room.map((f, i) => `<button class="tile" data-act="tile" data-i="${i}">${f ? FURNITURE[f].em : ''}</button>`).join('');
    const owned = Object.keys(S.furniture).filter(id => S.furniture[id] > 0);
    const tray = owned.length
      ? owned.map(id => `<button class="${roomSel === id ? 'sel' : ''}" data-act="pick" data-id="${id}" aria-label="${FURNITURE[id].name}">${FURNITURE[id].em}<small>${S.furniture[id]}</small></button>`).join('')
      : '<span class="hint">Buy furniture in the shop, or make friends with Seo-Ah for gifts!</span>';
    return `<div class="scene bg-room">
      <h2>🏡 Michelle's Dorm Room</h2>
      <p class="hint">${roomSel ? `Tap a spot to place the ${FURNITURE[roomSel].name}.` : 'Pick something above, then tap where it goes. Tap an item in the room to put it away.'}</p>
      <div class="tray">${tray}</div>
      <div class="room-grid">${tiles}</div>
      <div class="row"><button class="btn primary" data-act="sleep">🌙 Go to sleep (next day)</button></div>
    </div>`;
  }

  function tileTap(i) {
    const here = S.room[i];
    if (roomSel) {
      if (here) add(S.furniture, here);
      S.room[i] = roomSel;
      add(S.furniture, roomSel, -1);
      if (!S.furniture[roomSel]) roomSel = null;
      SFX.plant();
    } else if (here) {
      add(S.furniture, here);
      S.room[i] = null;
      SFX.tap();
    }
    save(); render();
  }

  function sleep(viaPotion) {
    overlay('overlay-sleep', 2400);
    chime([392, 330, 262], 0.25);
    setTimeout(() => {
      S.day++;
      S.daily = { talked: false, gifted: false, carrot: false, word: (S.daily.word || 0) + 1 };
      save(); render();
      toast(`☀️ Good morning! Day ${S.day} at Starwillow`);
    }, 1100);
    if (!viaPotion) closeModal();
  }

  // ---------- Shop ----------
  function renderShop() {
    const seeds = Object.entries(CROPS).map(([id, c]) => `<div class="shop-item"><div class="em">${c.em}</div><div class="nm">${c.name} seeds</div><small>You have ${S.seeds[id] || 0}</small><button class="btn primary" data-act="buySeed" data-id="${id}" ${S.stars < c.seed ? 'disabled' : ''}>${c.seed} ⭐</button></div>`).join('');
    const furn = Object.entries(FURNITURE).filter(([, f]) => !f.gift && f.price > 0).map(([id, f]) => `<div class="shop-item"><div class="em">${f.em}</div><div class="nm">${f.name}</div><button class="btn primary" data-act="buyFurn" data-id="${id}" ${S.stars < f.price ? 'disabled' : ''}>${f.price} ⭐</button></div>`).join('');
    const sellRows = [
      ...Object.keys(S.crops).map(id => ({ kind: 'crop', id, em: CROPS[id].em, name: CROPS[id].name, n: S.crops[id], price: CROPS[id].sell })),
      ...Object.keys(S.potions).map(id => { const p = id === 'soup' ? SOUP : RECIPES[id]; return { kind: 'potion', id, em: p.em, name: p.name, n: S.potions[id], price: p.sell }; }),
    ];
    const sell = sellRows.length
      ? sellRows.map(r => `<div class="shop-item"><div class="em">${r.em}</div><div class="nm">${r.name} × ${r.n}</div><button class="btn" data-act="sell" data-kind="${r.kind}" data-id="${r.id}">Sell +${r.price} ⭐</button></div>`).join('')
      : '<p class="hint">Nothing to sell yet.</p>';
    return `<div class="scene bg-shop">
      <h2>🦔 Mrs. Bramble's Shop</h2>
      <p class="hint">"Welcome, dearie! Seeds, sweet things, and cozy furniture!"</p>
      <div class="shop-section">🌰 Seeds</div><div class="shop-grid">${seeds}</div>
      <div class="shop-section">🛋️ Furniture</div><div class="shop-grid">${furn}</div>
      <div class="shop-section">💰 Sell</div><div class="shop-grid">${sell}</div>
    </div>`;
  }

  function buySeed(id, el) {
    const c = CROPS[id];
    if (S.stars < c.seed) return;
    S.stars -= c.seed; add(S.seeds, id);
    SFX.coin(); sparkleAt(el, [c.em], 3); save(); render();
  }
  function buyFurn(id, el) {
    const f = FURNITURE[id];
    if (S.stars < f.price) return;
    S.stars -= f.price; add(S.furniture, id);
    SFX.coin(); sparkleAt(el, [f.em, '✨'], 4); save(); render();
    toast(`${f.em} ${f.name} sent to your Room!`);
  }
  function sell(kind, id) {
    const bag = kind === 'crop' ? S.crops : S.potions;
    if (!bag[id]) return;
    const price = kind === 'crop' ? CROPS[id].sell : (id === 'soup' ? SOUP : RECIPES[id]).sell;
    add(bag, id, -1); S.stars += price;
    SFX.coin(); save(); render();
  }

  // ---------- Bag, book, potions ----------
  function bag() {
    const rows = [];
    Object.keys(S.seeds).forEach(id => rows.push(`<div class="list-item"><span class="em">🌰</span><div class="grow"><b>${CROPS[id].name} seeds × ${S.seeds[id]}</b><small>Plant these in the Garden</small></div></div>`));
    Object.keys(S.crops).forEach(id => rows.push(`<div class="list-item"><span class="em">${CROPS[id].em}</span><div class="grow"><b>${CROPS[id].name} × ${S.crops[id]}</b><small>Use in potions${id === 'carrot' ? ' — or feed Carrot!' : ''}</small></div>${id === 'carrot' ? '<button class="btn" data-act="feedCarrot">Feed Carrot</button>' : ''}</div>`));
    Object.keys(S.potions).forEach(id => {
      const p = id === 'soup' ? SOUP : RECIPES[id];
      rows.push(`<div class="list-item"><span class="em">${p.em}</span><div class="grow"><b>${p.name} × ${S.potions[id]}</b><small>${p.desc || 'Smells… interesting.'}</small></div><button class="btn primary" data-act="drink" data-id="${id}">Use</button></div>`);
    });
    openModal(`<h3>🎒 Michelle's Bag</h3>${rows.join('') || '<div class="empty">Your bag is empty.</div>'}<div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  function book() {
    const rows = Object.entries(RECIPES).map(([id, r]) => {
      const known = S.discovered.includes(id);
      return `<div class="list-item"><span class="em">${known ? r.em : '❓'}</span><div class="grow"><b>${known ? r.name : '??? Secret recipe'}</b>
        <small>${known ? r.ings.map(i => CROPS[i].em + ' ' + CROPS[i].name).join(' + ') + ' — ' + r.desc : `Uses ${r.ings.length} ingredients. Experiment or ask Professor Hootsworth!`}</small></div></div>`;
    }).join('');
    openModal(`<h3>📖 Recipe Book (${S.discovered.length}/${Object.keys(RECIPES).length})</h3>${rows}<div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  function drink(id) {
    if (!S.potions[id]) return;
    add(S.potions, id, -1);
    closeModal(); save();
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    if (id === 'soup') {
      SFX.oops();
      say([{ who: 'michelle', text: 'Bleh! Tastes like soggy socks! 🤢' }, { who: 'carrot', text: 'Carrot hides in his shell, giggling.' }]);
      return render();
    }
    const effect = RECIPES[id].effect;
    SFX.magic();
    if (effect === 'rainbow') { overlay('overlay-rainbow'); sparkle(cx, cy, ['🌈', '✨', '💜'], 14); toast('🌈 Rainbows everywhere!'); }
    if (effect === 'glow') { overlay('overlay-glow'); sparkle(cx, cy, ['✨', '🌟', '💫'], 16); toast('✨ Everything is glowing!'); }
    if (effect === 'float') { document.body.classList.add('float'); setTimeout(() => document.body.classList.remove('float'), 3000); toast('🎈 Wheee, floating!'); }
    if (effect === 'giggle') { document.body.classList.add('giggle'); setTimeout(() => document.body.classList.remove('giggle'), 2500); toast('😆 Hee hee hee!'); }
    if (effect === 'sleep') { sleep(true); }
    if (effect === 'zoom') {
      const c = $('#carrot-buddy');
      c.classList.remove('zoomy'); void c.offsetWidth; c.classList.add('zoomy');
      setTimeout(() => c.classList.remove('zoomy'), 2500);
      let n = 0;
      S.plots.forEach(p => { if (p && p.stage < 2 && !p.watered) { p.watered = true; n++; } });
      save();
      toast(n ? `🐢💨 Carrot zoomed and watered ${n} plant${n > 1 ? 's' : ''}!` : '🐢💨 ZOOM! Carrot is SO fast!');
    }
    if (effect === 'grow') {
      let n = 0;
      S.plots.forEach(p => { if (p && p.stage < 2) { p.stage = 2; p.watered = false; p.progress = 0; n++; } });
      save();
      sparkle(cx, cy, ['🌱', '🌿', '🌼'], 14);
      toast(n ? `🌱 ${n} plant${n > 1 ? 's' : ''} grew up instantly!` : '🌱 Plant some seeds first, then try this!');
      if (!n) add(S.potions, id); // nothing to grow: keep the potion
    }
    if (effect === 'friend') {
      const unlock = giveHearts(2);
      const lines = [{ who: 'michelle', text: 'Mmm, it tastes like warm cocoa and hugs. I should go see Seo-Ah!' }, { who: 'seoah', text: 'Michelle! I suddenly felt like giving you a big hug! 🤗 (+2 💖)' }];
      if (unlock) pushUnlock(lines, unlock);
      say(lines);
    }
    save(); render();
  }

  function carrotTap() {
    const el = $('#carrot-buddy');
    sparkleAt(el, ['💚', '🐢'], 4);
    chime([300, 400], 0.08, 'triangle');
    if (!S.daily.carrot) {
      S.daily.carrot = true;
      const ids = Object.keys(CROPS);
      const id = ids[Math.floor(Math.random() * ids.length)];
      add(S.crops, id);
      save(); render();
      say([{ who: 'carrot', text: `Carrot was digging in the flowerbed and found a ${CROPS[id].name} ${CROPS[id].em}! He found a treasure for you today.` }]);
      return;
    }
    say([{ who: 'carrot', text: CARROT_LINES[Math.floor(Math.random() * CARROT_LINES.length)] }]);
  }

  function feedCarrot() {
    if (!S.crops.carrot) return;
    add(S.crops, 'carrot', -1);
    S.stars += 1;
    closeModal(); save(); render();
    sparkleAt($('#carrot-buddy'), ['🥕', '💚', '⭐'], 8);
    SFX.heart();
    say([{ who: 'carrot', text: 'CRUNCH CRUNCH! Carrot ate the carrot. (Yes, really!) He looks super happy. +1 ⭐' }]);
  }

  function settings() {
    openModal(`<h3>⚙️ Settings</h3>
      <div class="list-item"><span class="em">${S.sound ? '🔊' : '🔇'}</span><div class="grow"><b>Sound</b><small>Cute chimes and sparkles</small></div><button class="btn" data-act="toggleSound">${S.sound ? 'Turn off' : 'Turn on'}</button></div>
      <div class="list-item"><span class="em">🏠</span><div class="grow"><b>Play on the iPad Home Screen</b><small>In Safari, tap Share ⬆️ then "Add to Home Screen". Your progress saves on this iPad.</small></div></div>
      <div class="list-item"><span class="em">🧹</span><div class="grow"><b>Start over</b><small>Erases all progress</small></div><button class="btn" data-act="reset">Start over</button></div>
      <div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  // ---------- Rendering ----------
  const SCENES = { garden: renderGarden, cauldron: renderCauldron, class: renderClass, room: renderRoom, shop: renderShop };
  function render() {
    const scroll = $('#scene .scene')?.scrollTop || 0;
    $('#scene').innerHTML = SCENES[scene]();
    const sc = $('#scene .scene'); if (sc) sc.scrollTop = scroll;
    document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.scene === scene));
    updateHud();
    if (scene === 'cauldron') bindCauldron();
  }

  function go(next) {
    if (scene === 'room' && next !== 'room') roomSel = null;
    scene = next;
    SFX.tap();
    render();
    $('#scene .scene').scrollTop = 0;
  }

  function startGame() {
    $('#title').classList.add('hidden');
    $('#game').classList.remove('hidden');
    render();
    if (!S.started) {
      S.started = true; save();
      say([
        { who: 'michelle', text: 'My first day at Starwillow Witch School! I\'m so excited I could float! ✨' },
        { who: 'carrot', text: 'Carrot pokes his head out of Michelle\'s bag and blinks happily. 🐢' },
        { who: 'seoah', text: 'Michelle! Over here! We\'re in the same class! Annyeong! 👋' },
        { who: 'michelle', text: 'Seo-Ah! Yay! Best friends AND classmates!' },
        { who: 'owl', text: 'Hoo-hoo! Welcome, young witches. Your first lesson: grow a Moonberry in your garden. Off you go!' },
        { who: 'seoah', text: 'Tap a garden patch to plant a seed, then tap again to water it. Hwaiting! 💪' },
      ]);
    }
  }

  // ---------- Events ----------
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el) {
      if (e.target.id === 'modal') closeModal();
      return;
    }
    const { act, i, id, kind } = el.dataset;
    switch (act) {
      case 'play': SFX.magic(); startGame(); break;
      case 'go': go(el.dataset.scene); break;
      case 'dialog-next': SFX.tap(); nextLine(); break;
      case 'close': SFX.tap(); closeModal(); break;
      case 'plot': plotTap(+i, el); break;
      case 'plant': plant(+i, id); break;
      case 'addIng':
        if (pot.length < 3 && !pot.includes(id) && S.crops[id]) { add(S.crops, id, -1); pot.push(id); stir = 0; SFX.plant(); save(); render(); sparkleAt($('#cauldron'), ['🫧'], 4); }
        break;
      case 'emptyPot': pot.forEach(p => add(S.crops, p)); pot = []; stir = 0; SFX.tap(); save(); render(); break;
      case 'stirBtn': if (pot.length) addStir(20); break;
      case 'brew': brew(); break;
      case 'owl': SFX.tap(); say([{ who: 'owl', text: currentLesson().intro }, { who: 'owl', text: '💡 ' + currentLesson().hint }]); break;
      case 'seoah': S.daily.talked ? say([{ who: 'seoah', text: 'See you after class, Michelle! Don\'t forget to water your plants! 🌱' }]) : talk(); break;
      case 'talk': talk(); break;
      case 'turnIn': turnIn(); break;
      case 'giftMenu': SFX.tap(); giftMenu(); break;
      case 'gift': gift(kind, id); break;
      case 'tile': tileTap(+i); break;
      case 'pick': roomSel = roomSel === id ? null : id; SFX.tap(); render(); break;
      case 'sleep': sleep(false); break;
      case 'buySeed': buySeed(id, el); break;
      case 'buyFurn': buyFurn(id, el); break;
      case 'sell': sell(kind, id); break;
      case 'bag': SFX.tap(); bag(); break;
      case 'book': SFX.tap(); book(); break;
      case 'settings': SFX.tap(); settings(); break;
      case 'drink': drink(id); break;
      case 'carrot': carrotTap(); break;
      case 'feedCarrot': feedCarrot(); break;
      case 'toggleSound': S.sound = !S.sound; save(); settings(); break;
      case 'reset':
        if (el.dataset.confirm) { localStorage.removeItem(SAVE_KEY); S = newState(); pot = []; stir = 0; closeModal(); $('#game').classList.add('hidden'); $('#title').classList.remove('hidden'); }
        else { el.dataset.confirm = '1'; el.textContent = 'Tap again to erase'; }
        break;
    }
  });

  // Grow plants every second while playing.
  setInterval(() => {
    let changed = false;
    S.plots.forEach(p => {
      if (p && p.watered && p.stage < 2) {
        const before = p.stage;
        growPlot(p, 1);
        if (p.stage !== before) changed = true;
      }
    });
    if (changed) { save(); if (scene === 'garden' && !$('#game').classList.contains('hidden')) { render(); chime([784, 988], 0.06); } }
  }, 1000);
  setInterval(save, 5000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});

  window.__starwillow = { get state() { return S; } }; // for testing
})();
