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
    fort:     { name: 'Sleepover Tent',    em: '⛺', price: 8 },
    // Gifts & trophies (not sold in the shop)
    chime:    { name: 'Wind Chime from Seo-Ah',   em: '🎐', gift: true },
    lantern:  { name: 'Lantern from Seo-Ah',      em: '🏮', gift: true },
    photo:    { name: 'Best Friends Photo',       em: '🖼️', gift: true },
    star:     { name: 'Best Friends Star',        em: '🌟', gift: true },
    trophy:   { name: 'Golden Broom Trophy',      em: '🏆', gift: true },
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
    ['귀여워 (gwiyeowo)', 'so cute!'],
    ['대박 (daebak)', 'awesome / amazing!'],
    ['가자 (kaja)', 'let\'s go!'],
    ['행복 (haengbok)', 'happiness!'],
  ];

  const SEOAH_STORIES = [
    {
      q: 'Michelle! Professor Hootsworth accidentally turned his owl feathers sparkly pink in Potion Class! What should we do?',
      opts: [
        { label: '🎀 Give him a matching pink bow!', reply: 'Bahaha!! He looked in the mirror and said "Hoo-hoo, very fashionable!" Best idea ever, Michelle! 😂💖' },
        { label: '🧪 Brew a Starflower wash together!', reply: 'We stirred the potion so fast! His feathers turned snowy white again, except one sparkly pink tail feather! ✨' },
      ],
    },
    {
      q: 'My halmeoni sent a snack box from Seoul for us and Carrot! Which treat should we open first?',
      opts: [
        { label: '🍡 Honey rice cakes (kkultteok)!', reply: 'Masisseo!! They\'re filled with sweet sesame honey! Let\'s save a tiny piece of carrot on the side for Carrot too! 🐢💖' },
        { label: '🍓 Strawberry milk & star cookies!', reply: 'Cheers!! Pink strawberry milk tastes 100 times better when sharing with my best friend! 🍓🥛✨' },
      ],
    },
    {
      q: 'When we graduate Starwillow Witch School, what kind of magical shop should you, me, and Carrot open?',
      opts: [
        { label: '🧁 A Flying Bakery & Potion Café!', reply: 'YES!! You bake the tarts and cakes, I\'ll pour the starlight tea, and Carrot can be the official taste-tester! 🎂🐢' },
        { label: '🦋 An Enchanted Garden & Butterfly Sanctuary!', reply: 'Ooh! With glowing flowers, a giant pond for Carrot, and friendly bees making golden honey! 🌸🐝' },
      ],
    },
    {
      q: 'Look at Carrot! She\'s trying to climb onto your broomstick basket! Where should we fly after class?',
      opts: [
        { label: '🌈 Over the Rainbow Cloud Arch!', reply: 'Wheee! Hold onto your beige witch hat, Michelle — let\'s race through the rainbow rings! 🧹🌈' },
        { label: '🌙 Up to the Starlight Observatory!', reply: 'We can catch falling stars in our jars and wave to the moon owls! ✨🦉' },
      ],
    },
    {
      q: 'We have a free period before dinner! What do you want to practice together, Michelle?',
      opts: [
        { label: '🥧 Baking warm Moonberry Tarts!', reply: 'The whole dormitory is going to smell like warm berries and sugar! Let\'s make an extra one for Mrs. Bramble! 🥧💖' },
        { label: '✨ Secret floating spells!', reply: 'Abracadabra — WHOA! My spell book is floating to the ceiling! Catch it, Carrot!! 😂🎈' },
      ],
    },
  ];

  const SEOAH_CHATS = [
    'Michelle! Did you finish the homework? I tried to brew a Float Potion and my hat floated away! 😂',
    'Professor Hootsworth fell asleep in class again. Shh, don\'t tell!',
    'My halmeoni (that\'s grandma!) makes the best tteokbokki. I\'ll bring you some!',
    'Carrot looks extra shiny today. I think she likes you a LOT.',
    'When we\'re grown-up witches, let\'s open a potion & bakery café together!',
    'I love starflowers. They look like tiny suns. 🌼',
    'Want to have a sleepover in the dorm? We can bake cookies and read spell books!',
    'I practiced my broom flying! I only crashed into the hedge twice. 🧹',
  ];

  const CARROT_LINES = [
    '*happy turtle noises* 🐢 (Carrot wants a snack in her house!)',
    'Carrot does a slow, proud little spin.',
    'Carrot blinks at you very slowly. That means "I love you" in turtle.',
    'Carrot nudges your boot toward the garden. Time to catch butterflies?',
    'Carrot yawns inside her little shell. Even girl turtles get sleepy at witch school.',
    'Carrot is trying to stir the cauldron with her tiny flipper. So helpful!',
  ];

  const CRITTERS = {
    monarch:  { name: 'Sunny Monarch Butterfly', em: '🦋', kind: 'butterfly' },
    moonwing: { name: 'Moonwing Butterfly',      em: '🦋', kind: 'butterfly' },
    blossom:  { name: 'Blossom Pink Butterfly',  em: '🌸', kind: 'butterfly' },
    starwing: { name: 'Golden Star Butterfly',   em: '✨', kind: 'butterfly' },
    honeybee: { name: 'Fuzzy Honeybee',          em: '🐝', kind: 'bee', honey: 1 },
    queenbee: { name: 'Queen Bumblebee',         em: '🐝', kind: 'bee', honey: 2 },
  };

  const BAKES = {
    sugar_cookie:    { name: 'Star Sugar Cookies',        em: '🍪', kind: 'Cookies', cost: {},                              sell: 3,  desc: 'Warm buttery star-shaped cookies from the pantry!' },
    honey_cookie:    { name: 'Golden Honey Cookies',      em: '🍪', kind: 'Cookies', cost: { honey: 1 },                    sell: 6,  desc: 'Baked with sweet honey from the garden bees!' },
    berry_cookie:    { name: 'Moonberry Chip Cookies',    em: '🍪', kind: 'Cookies', cost: { moonberry: 1 },                sell: 6,  desc: 'Chewy cookies with purple moonberry chips.' },
    berry_tart:      { name: 'Sparkling Moonberry Tart',  em: '🥧', kind: 'Tart',    cost: { moonberry: 1, starflower: 1 }, sell: 9,  desc: 'Golden flaky tart filled with sparkly berry jam.' },
    blossom_tart:    { name: 'Fairy Blossom Fruit Tart',  em: '🥧', kind: 'Tart',    cost: { fairyblossom: 1 },             sell: 7,  desc: 'Sweet custard topped with glazed pink petals.' },
    pumpkin_tart:    { name: 'Pumpkin Spice Witch Tart',  em: '🥧', kind: 'Tart',    cost: { pumpkin: 1 },                  sell: 9,  desc: 'Cozy autumn tart dusted with cinnamon stars.' },
    carrot_cake:     { name: 'Carrot\'s Carrot Cake',     em: '🎂', kind: 'Cake',    cost: { carrot: 1 },                   sell: 8,  desc: 'Topped with cream frosting — Carrot\'s favorite!' },
    strawberry_cake: { name: 'Seo-Ah\'s Berry Cloud Cake',em: '🍰', kind: 'Cake',    cost: { fairyblossom: 1, moonberry: 1 }, sell: 11, desc: 'Fluffy two-tier cake — Seo-Ah loves it!' },
  };

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
      honey: 1,
      bakes: {},
      critters: {},
      carrotCare: { fed: false, watered: false, loves: 1 },
      potions: {},
      furniture: {},
      room,
      roomItems: [
        { uid: 'bed-1', id: 'bed', x: 22, y: 74 },
      ],
      sleepover: false,
      storyIdx: 0,
      plots: Array.from({ length: 6 }, () => null),
      discovered: [],
      lesson: 0,
      bonusLesson: null,
      giftsGiven: [],
      daily: { talked: false, gifted: false, carrot: false, wateredCarrot: false, word: 0 },
      sound: true,
      music: true,
      song: 0,
      savedAt: Date.now(),
    };
  }

  let S = load();
  let scene = 'garden';
  let pot = S.pot || [];
  let stir = 0;
  let roomSel = null;
  let ovenBusy = false;
  let gardenCritters = [];

  function spawnCritters() {
    const keys = Object.keys(CRITTERS);
    gardenCritters = Array.from({ length: 3 }, (_, idx) => {
      const id = keys[Math.floor(Math.random() * keys.length)];
      return {
        uid: Date.now() + '-' + idx + '-' + Math.random(),
        id,
        left: 10 + idx * 32 + Math.floor(Math.random() * 14),
        top: 6 + Math.floor(Math.random() * 24),
        delay: (idx * 0.6).toFixed(1),
      };
    });
  }
  spawnCritters();

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return newState();
      const s = Object.assign(newState(), JSON.parse(raw));
      s.bakes = s.bakes || {};
      s.critters = s.critters || {};
      s.carrotCare = Object.assign({ fed: false, watered: false, loves: 1 }, s.carrotCare || {});
      if (typeof s.honey !== 'number') s.honey = 1;
      if (typeof s.music !== 'boolean') s.music = true;
      if (typeof s.song !== 'number') s.song = 0;
      if (!Array.isArray(s.roomItems)) {
        s.roomItems = [];
        const oldRoom = Array.isArray(s.room) ? s.room : [];
        oldRoom.forEach((fid, idx) => {
          if (fid && FURNITURE[fid]) {
            const col = idx % 6, row = Math.floor(idx / 6);
            s.roomItems.push({ uid: 'mig-' + idx, id: fid, x: 18 + col * 11, y: 46 + row * 7 });
          }
        });
        if (!s.roomItems.length) s.roomItems.push({ uid: 'bed-1', id: 'bed', x: 22, y: 74 });
      }
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

  // ---------- Sound & Cozy Background Music ----------
  let audio;
  let musicMaster;
  let musicTimer = null;
  let musicStep = 0;

  // Midi note -> Hz
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

  // Three full cozy looping songs (melody + warm harp chord arpeggios + bass)
  const SONGS = [
    {
      name: '🌸 Starwillow Breeze',
      tempo: 340, // ms per eighth-note step
      // F major / D minor pentatonic cozy waltz-like 32-step loop
      melody: [
        77, null, 76, 72,  74, null, 69, null,
        72, null, 74, 76,  77, null, 81, null,
        84, null, 81, 77,  76, null, 74, 72,
        74, null, 72, 69,  65, null, null, null,
      ],
      harp: [
        65, 69, 72, 69,  62, 65, 69, 65,
        60, 64, 67, 64,  65, 69, 72, 69,
        67, 70, 74, 70,  65, 69, 72, 69,
        62, 67, 70, 67,  65, 69, 72, 69,
      ],
      bass: [
        53, null, null, null,  50, null, null, null,
        48, null, null, null,  53, null, null, null,
        55, null, null, null,  53, null, null, null,
        50, null, 55, null,    53, null, null, null,
      ],
    },
    {
      name: '🧪 Bubbling Starlight',
      tempo: 300,
      // Playful Little-Witch celesta & plucked harp in G major
      melody: [
        79, null, 83, 81,  79, null, 74, null,
        76, 79, 81, null,  79, null, null, null,
        83, null, 86, 83,  81, null, 79, 76,
        74, 76, 79, 76,    74, null, null, null,
      ],
      harp: [
        67, 71, 74, 71,  64, 67, 71, 67,
        60, 64, 67, 64,  62, 66, 69, 66,
        67, 71, 74, 71,  64, 67, 71, 67,
        62, 67, 71, 67,  67, 71, 74, 71,
      ],
      bass: [
        55, null, null, null,  52, null, null, null,
        48, null, null, null,  50, null, null, null,
        55, null, null, null,  52, null, null, null,
        50, null, 54, null,    55, null, null, null,
      ],
    },
    {
      name: '🌙 Moonberry Lullaby',
      tempo: 420,
      // Dreamy music-box lullaby in C major / A minor
      melody: [
        76, null, 79, null,  76, null, 72, null,
        74, null, 77, null,  76, null, null, null,
        81, null, 79, null,  76, null, 72, 74,
        72, null, 69, null,  72, null, null, null,
      ],
      harp: [
        60, 64, 67, 72,  57, 60, 64, 69,
        62, 65, 69, 74,  60, 64, 67, 72,
        65, 69, 72, 77,  60, 64, 67, 72,
        62, 67, 71, 67,  60, 64, 67, 72,
      ],
      bass: [
        48, null, null, null,  45, null, null, null,
        50, null, null, null,  48, null, null, null,
        53, null, null, null,  48, null, null, null,
        43, null, null, null,  48, null, null, null,
      ],
    },
  ];

  function ensureAudio() {
    try {
      if (!audio) {
        audio = new (window.AudioContext || window.webkitAudioContext)();
        musicMaster = audio.createGain();
        // Gentle low-pass filter so all notes sound warm and soft on iPad speakers
        const warmth = audio.createBiquadFilter();
        warmth.type = 'lowpass';
        warmth.frequency.value = 2400;
        musicMaster.gain.value = 0.28;
        musicMaster.connect(warmth).connect(audio.destination);
      }
      if (audio.state === 'suspended') audio.resume();
    } catch {}
  }

  function playMusicNote(midi, durSec, voice) {
    if (!audio || !musicMaster || !S.music) return;
    const t0 = audio.currentTime;
    const freq = mtof(midi);

    if (voice === 'celesta') {
      // Warm bell-like music box: fundamental sine + soft octave overtone
      const o1 = audio.createOscillator();
      const o2 = audio.createOscillator();
      const g = audio.createGain();
      const g2 = audio.createGain();
      o1.type = 'sine'; o1.frequency.value = freq;
      o2.type = 'triangle'; o2.frequency.value = freq * 2;
      g2.gain.value = 0.12;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.22, t0 + 0.025);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + durSec * 2.4);
      o1.connect(g);
      o2.connect(g2).connect(g);
      g.connect(musicMaster);
      o1.start(t0); o2.start(t0);
      o1.stop(t0 + durSec * 2.5); o2.stop(t0 + durSec * 2.5);
    } else if (voice === 'harp') {
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = 'triangle'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.11, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + durSec * 1.9);
      o.connect(g).connect(musicMaster);
      o.start(t0); o.stop(t0 + durSec * 2.0);
    } else if (voice === 'bass') {
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.14, t0 + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + durSec * 3.4);
      o.connect(g).connect(musicMaster);
      o.start(t0); o.stop(t0 + durSec * 3.5);
    }
  }

  function stepMusic() {
    if (!S.music || document.hidden) return;
    ensureAudio();
    const song = SONGS[S.song || 0] || SONGS[0];
    const i = musicStep % song.melody.length;
    const stepSec = song.tempo / 1000;
    if (song.melody[i]) playMusicNote(song.melody[i], stepSec * 1.6, 'celesta');
    if (song.harp[i]) playMusicNote(song.harp[i], stepSec * 1.2, 'harp');
    if (song.bass[i]) playMusicNote(song.bass[i], stepSec * 2.5, 'bass');
    musicStep = (musicStep + 1) % song.melody.length;
    musicTimer = setTimeout(stepMusic, song.tempo);
  }

  function startMusic() {
    stopMusic();
    if (!S.music) return;
    ensureAudio();
    musicTimer = setTimeout(stepMusic, 80);
    updateHud();
  }

  function stopMusic() {
    if (musicTimer) { clearTimeout(musicTimer); musicTimer = null; }
    updateHud();
  }

  function chime(notes = [660, 880], dur = 0.12, type = 'sine') {
    if (!S.sound) return;
    try {
      ensureAudio();
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

  // Dialog queue: lines of { who, text, choices?: [{ label, style?, onPick }] }.
  let dialogQueue = [];
  let dialogDone = null;
  let activeChoices = null;
  function say(lines, done) {
    $('#toast')?.classList.add('hidden');
    dialogQueue = lines.slice();
    dialogDone = done || null;
    nextLine();
  }
  function nextLine() {
    if (activeChoices) return; // wait for player to pick a choice button
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
    const tapEl = document.querySelector('.dialog-tap');
    if (line.choices && line.choices.length) {
      activeChoices = line.choices;
      const btns = line.choices.map((c, idx) =>
        `<button class="choice-btn ${c.pink ? 'pink' : ''}" data-act="dialogChoice" data-i="${idx}">${c.label}</button>`
      ).join('');
      $('#dialog-text').innerHTML = `<div>${line.text}</div><div class="dialog-choices">${btns}</div>`;
      if (tapEl) tapEl.textContent = 'choose an answer ▴';
    } else {
      activeChoices = null;
      $('#dialog-text').textContent = line.text;
      if (tapEl) tapEl.textContent = 'tap to continue ▸';
    }
    $('#dialog').classList.remove('hidden');
  }

  function openModal(html) { $('#modal-card').innerHTML = html; $('#modal').classList.remove('hidden'); }
  function closeModal() { $('#modal').classList.add('hidden'); }

  function updateHud() {
    $('#hud-stars').textContent = S.stars;
    $('#hud-hearts').textContent = S.hearts;
    const mb = $('#music-btn');
    if (mb) mb.textContent = S.music ? '🎵' : '🔇';
  }

  // ---------- Garden + Butterflies & Bees ----------
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

  function totalCritters() {
    return Object.values(S.critters || {}).reduce((a, b) => a + b, 0);
  }

  // Coordinates of the 6 painted oval soil mounds on assets/bg-garden.jpg
  const PLOT_POS = [
    [20.5, 49], [50.5, 48], [81.5, 49],
    [19.0, 74], [50.0, 74], [80.5, 74],
  ];

  function renderGarden() {
    if (!gardenCritters.length) spawnCritters();
    const sky = gardenCritters.map((c, idx) => {
      const info = CRITTERS[c.id];
      return `<button class="critter" data-act="catchCritter" data-i="${idx}" style="left:${c.left}%;top:${c.top}px;animation-delay:${c.delay}s" title="Tap to catch ${info.name}!">${info.em}</button>`;
    }).join('');
    const plots = S.plots.map((p, i) => {
      const [lx, ty] = PLOT_POS[i];
      const posStyle = `left:${lx}%;top:${ty}%`;
      // Empty soil mound: no "+ Plant" box or text — just tap the natural soil directly!
      if (!p) return `<button class="mound" style="${posStyle}" data-act="plot" data-i="${i}" aria-label="Empty soil bed ${i + 1}"></button>`;
      const c = CROPS[p.crop];
      if (p.stage >= 2) {
        return `<button class="mound ready" style="${posStyle}" data-act="plot" data-i="${i}">
          <span class="plant-em">${c.em}</span>
          <span class="label">✨ Pick ${c.name}</span>
        </button>`;
      }
      const icon = p.stage === 0 ? '🌱' : '🌿';
      const label = p.watered ? `${c.name}` : '💧 Tap to water';
      const drops = p.watered ? '<span class="drops">💧</span>' : '';
      return `<button class="mound" style="${posStyle}" data-act="plot" data-i="${i}">
        <span class="plant-em">${icon}</span>${drops}
        <span class="label">${label}</span>
      </button>`;
    }).join('');
    return `<div class="scene bg-garden">
      <div class="critter-bar">
        <h2 style="margin:0">🌱 Michelle's Garden</h2>
        <button class="critter-pill" data-act="critterBook">🦋 Caught: ${totalCritters()}</button>
        <span class="critter-pill">🍯 Honey: ${S.honey || 0}</span>
        <button class="critter-pill" data-act="callCritters">🌺 Call Butterflies &amp; Bees</button>
      </div>
      <div class="garden-meadow">
        <div class="critter-sky">${sky}</div>
        ${plots}
      </div>
    </div>`;
  }

  function catchCritter(idx, el) {
    const c = gardenCritters[idx];
    if (!c) return;
    const info = CRITTERS[c.id];
    add(S.critters, c.id, 1);
    S.stars += 1;
    let msg = `Caught a ${info.name} ${info.em}! (+1 ⭐)`;
    if (info.honey) {
      S.honey = (S.honey || 0) + info.honey;
      msg = `Caught a ${info.name} 🐝! She shared +${info.honey} 🍯 Honey for baking & +1 ⭐!`;
    }
    SFX.harvest();
    sparkleAt(el, [info.em, '✨', info.honey ? '🍯' : '⭐'], 10);
    gardenCritters.splice(idx, 1);
    if (!gardenCritters.length) setTimeout(() => { spawnCritters(); if (scene === 'garden') render(); }, 900);
    save(); render();
    toast(msg);
  }

  function critterBook() {
    const rows = Object.entries(CRITTERS).map(([id, c]) => {
      const n = S.critters[id] || 0;
      return `<div class="list-item"><span class="em">${n ? c.em : '❔'}</span><div class="grow"><b>${n ? c.name : '??? Mystery Critter'}</b><small>${c.kind === 'bee' ? 'Gives sweet 🍯 Honey for baking!' : 'Flutters over Michelle\'s garden flowers.'} · Caught: ${n}</small></div></div>`;
    }).join('');
    openModal(`<h3>🦋 Butterfly &amp; Bee Jar (${totalCritters()})</h3>${rows}<div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  // ---------- Witch Bakery (Tarts, Cakes & Cookies) ----------
  function canBake(id) {
    const cost = BAKES[id].cost;
    return Object.entries(cost).every(([k, need]) => (k === 'honey' ? (S.honey || 0) : (S.crops[k] || 0)) >= need);
  }

  function costLabel(cost) {
    const entries = Object.entries(cost);
    if (!entries.length) return 'Free pantry butter & sugar ✨';
    return entries.map(([k, n]) => k === 'honey' ? `🍯 Honey ×${n}` : `${CROPS[k].em} ${CROPS[k].name} ×${n}`).join(' + ');
  }

  function renderBakery() {
    const bakedIds = Object.keys(S.bakes).filter(id => S.bakes[id] > 0);
    const tray = bakedIds.length
      ? bakedIds.map(id => `<button class="ing" data-act="pastryAction" data-id="${id}">${BAKES[id].em}<small>${BAKES[id].name} × ${S.bakes[id]}</small></button>`).join('')
      : `<span style="font-size:15px;opacity:.8">No pastries on the tray yet — pick a recipe below to bake!</span>`;

    const cards = Object.entries(BAKES).map(([id, b]) => {
      const ok = !ovenBusy && canBake(id);
      return `<div class="bake-item">
        <div class="em">${b.em}</div>
        <div class="nm">${b.name}</div>
        <small>${costLabel(b.cost)}</small>
        <button class="btn primary" data-act="bake" data-id="${id}" ${ok ? '' : 'disabled'}>🔥 Bake ${b.kind}</button>
      </div>`;
    }).join('');

    return `<div class="scene bg-bakery">
      <h2>🧁 Michelle's Witch Bakery</h2>
      <p class="hint">Bake warm Cookies 🍪, Tarts 🥧, and Cakes 🎂 for Carrot, Seo-Ah, or yourself!</p>
      <div class="oven-card">
        <div class="oven-visual ${ovenBusy ? 'baking' : ''}" id="oven-box">
          <span>🔥</span><span>${ovenBusy ? '⏲️' : '🧁'}</span><span>🍪</span>
        </div>
        <div><b>${ovenBusy ? 'Baking in the warm oven… ✨' : `🍯 Honey: ${S.honey || 0} · Tap any recipe below to bake!`}</b></div>
        <div class="ingredients" style="margin-top:4px">${tray}</div>
      </div>
      <div class="bakery-grid">${cards}</div>
    </div>`;
  }

  function bakeItem(id, el) {
    if (ovenBusy || !canBake(id)) return;
    const b = BAKES[id];
    Object.entries(b.cost).forEach(([k, n]) => {
      if (k === 'honey') S.honey = Math.max(0, (S.honey || 0) - n);
      else add(S.crops, k, -n);
    });
    ovenBusy = true;
    SFX.plant();
    render();
    const ovenEl = $('#oven-box') || el;
    sparkleAt(ovenEl, ['🔥', '🧁', '✨'], 8);
    setTimeout(() => {
      ovenBusy = false;
      add(S.bakes, id, 1);
      S.stars += 2;
      SFX.magic();
      save(); render();
      if ($('#oven-box')) sparkleAt($('#oven-box'), [b.em, '⭐', '✨'], 12);
      toast(`🛎️ Ding! Fresh ${b.name} ${b.em} (+2 ⭐)`);
    }, 1100);
  }

  function pastryAction(id) {
    if (!S.bakes[id]) return;
    const b = BAKES[id];
    openModal(`<h3>${b.em} ${b.name}</h3>
      <p style="text-align:center;margin:4px 0 12px">${b.desc}</p>
      <div class="list-item"><span class="em">🍽️</span><div class="grow"><b>Eat a warm bite!</b><small>Yummy! Gives +2 ⭐ Stars</small></div><button class="btn primary" data-act="eatBake" data-id="${id}">Eat</button></div>
      <div class="list-item"><span class="em">🐢</span><div class="grow"><b>Feed to Carrot</b><small>Carrot loves fresh bakery treats! (+1 💚 &amp; +2 ⭐)</small></div><button class="btn primary" data-act="feedBakeCarrot" data-id="${id}">Feed Carrot</button></div>
      <div class="row"><button class="btn" data-act="close">Close</button></div>`);
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

  // ---------- Cauldron (Big Wooden Star-Ladle & Easy Finger-Swirling!) ----------
  const SPOON_SVG = `<svg viewBox="0 0 120 170" width="100%" height="100%">
    <defs>
      <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#d99b52"/>
        <stop offset="50%" stop-color="#b87333"/>
        <stop offset="100%" stop-color="#8a4f1d"/>
      </linearGradient>
      <radialGradient id="bowlGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff6b3"/>
        <stop offset="60%" stop-color="#ff9ee2"/>
        <stop offset="100%" stop-color="#9e6bff"/>
      </radialGradient>
    </defs>
    <!-- Glowing magic bowl of the ladle -->
    <ellipse cx="60" cy="138" rx="34" ry="22" fill="url(#wood)" stroke="#5c3010" stroke-width="4"/>
    <ellipse cx="60" cy="136" rx="26" ry="15" fill="url(#bowlGlow)"/>
    <!-- Thick carved wooden handle -->
    <rect x="51" y="24" width="18" height="106" rx="9" fill="url(#wood)" stroke="#5c3010" stroke-width="4"/>
    <!-- Pink ribbon bow on handle -->
    <path d="M40 50 Q60 60 80 50 Q60 40 40 50 Z" fill="#ff9ec7" stroke="#7a284f" stroke-width="3"/>
    <circle cx="60" cy="50" r="6" fill="#ffd966" stroke="#7a284f" stroke-width="2.5"/>
    <!-- Big golden star topper -->
    <polygon points="60,2 67,16 82,18 71,28 74,43 60,35 46,43 49,28 38,18 53,16" fill="#ffdf6b" stroke="#8c5319" stroke-width="3.5" stroke-linejoin="round"/>
  </svg>`;

  function renderCauldron() {
    const inPot = pot.map(id => CROPS[id].em).join(' ') || '';
    const ids = Object.keys(CROPS).filter(id => S.crops[id] > 0 || pot.includes(id));
    const ings = ids.length
      ? ids.map(id => `<button class="ing" data-act="addIng" data-id="${id}" ${pot.includes(id) || pot.length >= 3 || !S.crops[id] ? 'disabled' : ''}>
          ${CROPS[id].em}<small>${CROPS[id].name} × ${S.crops[id] || 0}</small></button>`).join('')
      : `<p class="hint">Your basket is empty. Pick crops in the Garden first! 🌱</p>`;
    const ready = pot.length > 0 && stir >= 100;
    return `<div class="scene bg-cauldron">
      <h2>🧪 Potion Room</h2>
      <p class="hint">${pot.length ? 'Grab the big magic ladle with your finger and swirl the pot! ✨' : 'Tap 2 or 3 ingredients below to drop them into the cauldron.'}</p>
      <div class="cauldron-wrap" id="cauldron">
        <div class="cauldron"></div>
        <div class="brew" id="brew"></div>
        <div class="in-pot" id="in-pot">${inPot}</div>
        <div id="cauldron-spoon" class="big-spoon idle-bob">${SPOON_SVG}</div>
      </div>
      <div class="stir-meter"><div id="stir-fill" style="width:${stir}%"></div></div>
      <div class="row">
        <button class="btn primary" data-act="brew" ${ready ? '' : 'disabled'}>✨ Brew!</button>
        <button class="btn" data-act="emptyPot" ${pot.length ? '' : 'disabled'}>↩️ Empty</button>
      </div>
      <div class="ingredients">${ings}</div>
    </div>`;
  }

  function bindCauldron() {
    const wrap = $('#cauldron');
    if (!wrap) return;
    let active = false;
    let prevPt = null;
    let bubbleTick = 0;

    const moveSpoon = (clientX, clientY, isStart) => {
      const r = wrap.getBoundingClientRect();
      const xPct = Math.max(15, Math.min(85, ((clientX - r.left) / r.width) * 100));
      const yPct = Math.max(18, Math.min(78, ((clientY - r.top) / r.height) * 100));
      const tilt = ((xPct - 50) * 0.55).toFixed(1);
      const sp = $('#cauldron-spoon');
      if (sp) {
        sp.classList.remove('idle-bob');
        sp.style.left = xPct + '%';
        sp.style.top = yPct + '%';
        sp.style.transform = `translate(-50%, -58%) rotate(${tilt}deg) scale(1.12)`;
      }
      if (!pot.length) return;
      if (isStart) {
        // Immediate satisfying swirl nudge as soon as she touches the spoon/pot!
        addStir(14);
        sparkle(clientX, clientY, ['🫧', '✨'], 3);
      } else if (prevPt) {
        const dist = Math.hypot(clientX - prevPt[0], clientY - prevPt[1]);
        if (dist > 0.5) {
          // Super responsive: ~180px of swirling fills the whole cauldron!
          addStir(dist * 0.58);
          bubbleTick += dist;
          if (bubbleTick > 28) {
            bubbleTick = 0;
            sparkle(clientX, clientY, ['🫧', '✨', '💫', '⭐'], 3);
          }
        }
      }
      prevPt = [clientX, clientY];
    };

    wrap.addEventListener('pointerdown', e => {
      e.preventDefault();
      active = true;
      try { wrap.setPointerCapture(e.pointerId); } catch {}
      moveSpoon(e.clientX, e.clientY, true);
    });
    wrap.addEventListener('pointermove', e => {
      if (!active) return;
      e.preventDefault();
      moveSpoon(e.clientX, e.clientY, false);
    });
    const end = () => {
      active = false;
      prevPt = null;
      $('#brew')?.classList.remove('stirring');
      $('#cauldron-spoon')?.classList.add('idle-bob');
    };
    wrap.addEventListener('pointerup', end);
    wrap.addEventListener('pointercancel', end);

    // Extra iOS Safari touch support
    wrap.addEventListener('touchstart', e => {
      if (!e.touches[0]) return;
      e.preventDefault();
      active = true;
      moveSpoon(e.touches[0].clientX, e.touches[0].clientY, true);
    }, { passive: false });
    wrap.addEventListener('touchmove', e => {
      if (!e.touches[0]) return;
      e.preventDefault();
      moveSpoon(e.touches[0].clientX, e.touches[0].clientY, false);
    }, { passive: false });
    wrap.addEventListener('touchend', end);
  }

  function addStir(amount) {
    if (stir >= 100) return;
    const was = stir;
    stir = Math.min(100, stir + amount);
    $('#brew')?.classList.add('stirring');
    const fill = $('#stir-fill');
    if (fill) fill.style.width = stir + '%';
    if (Math.floor(stir / 20) > Math.floor(was / 20)) chime([420 + stir * 4.5], 0.05, 'triangle');
    if (stir >= 100 && was < 100) {
      // Automatically brew as soon as she finishes stirring!
      setTimeout(() => { if (pot.length && stir >= 100) brew(); }, 180);
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

  // ---------- Broomstick Flying with Seo-Ah & Carrot ----------
  let skyRaf = null;
  let skyState = null;

  function stopSky() {
    if (skyRaf) { cancelAnimationFrame(skyRaf); skyRaf = null; }
  }

  function renderSky() {
    const r = skyState ? skyState.raceActive : true;
    const mPct = skyState ? Math.min(100, Math.round(skyState.mDist)) : 0;
    const sPct = skyState ? Math.min(100, Math.round(skyState.sDist)) : 0;
    return `<div class="scene bg-sky">
      <div class="sky-bar">
        <h2 style="margin:0">🧹 Broom Race with Seo-Ah</h2>
        ${r ? '<span class="critter-pill">✨ Slide your finger up &amp; down to steer through Rainbow Rings!</span>' : '<button class="btn primary" style="font-size:18px;padding:8px 22px" data-act="skyDash">🏁 Race Seo-Ah Again!</button>'}
      </div>
      <div class="race-track" style="width:min(94vw,860px);background:rgba(35,21,66,0.75);border:2px solid rgba(255,217,119,0.7);border-radius:999px;padding:6px 18px;margin-bottom:6px;position:relative;height:38px;display:flex;align-items:center;justify-content:space-between;color:#fff6e6;font-weight:bold;font-size:14px">
        <span>🚩 Start</span>
        <div style="position:absolute;left:48px;right:48px;top:4px;bottom:4px">
          <div id="race-seoah-pin" style="position:absolute;left:${sPct}%;top:0;transform:translateX(-50%);font-size:18px;transition:left .1s">🌸🧹</div>
          <div id="race-michelle-pin" style="position:absolute;left:${mPct}%;bottom:0;transform:translateX(-50%);font-size:18px;transition:left .1s">🐢🧹</div>
        </div>
        <span>🏁 Finish</span>
      </div>
      <div class="sky-stage" id="sky-stage">
        <canvas id="sky-canvas"></canvas>
        <div class="sky-bubble">
          <img src="assets/portrait-seoah.jpg" alt="Seo-Ah">
          <span id="sky-seoah-msg">${skyState && skyState.bannerMsg ? skyState.bannerMsg : 'You fly forward automatically — just slide up or down to catch 🌈 rings!'}</span>
        </div>
      </div>
    </div>`;
  }

  function bindSky() {
    stopSky();
    const cv = $('#sky-canvas');
    const stage = $('#sky-stage');
    if (!cv || !stage) return;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = stage.clientWidth || 760;
    const H = stage.clientHeight || 360;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.scale(dpr, dpr);

    let spawnCount = 0;
    if (!skyState) {
      skyState = {
        mx: W * 0.26, my: H * 0.45,
        tx: W * 0.26, ty: H * 0.45,
        sx: W * 0.22, sy: H * 0.68,
        sTargetY: H * 0.68,
        rings: 0, caught: 0,
        raceActive: true, mDist: 0, sDist: 0, mBoost: 0.6,
        bannerMsg: '',
        items: [], trail: [], starsBg: [],
        lastTime: performance.now(),
        spawnTick: 0,
      };
      for (let i = 0; i < 36; i++) {
        skyState.starsBg.push({ x: Math.random() * W, y: Math.random() * H * 0.85, r: 1 + Math.random() * 2, s: 0.4 + Math.random() * 0.8 });
      }
      for (let i = 0; i < 4; i++) spawnSkyItem(W, H, W * (0.42 + i * 0.16));
    }

    // One-finger vertical/free glide — no clicking required!
    const steer = (clientX, clientY) => {
      const r = cv.getBoundingClientRect();
      skyState.ty = Math.max(46, Math.min(H - 42, clientY - r.top));
    };

    cv.addEventListener('pointerdown', e => { e.preventDefault(); steer(e.clientX, e.clientY); });
    cv.addEventListener('pointermove', e => { e.preventDefault(); steer(e.clientX, e.clientY); });
    cv.addEventListener('touchstart', e => { if (e.touches[0]) { e.preventDefault(); steer(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });
    cv.addEventListener('touchmove', e => { if (e.touches[0]) { e.preventDefault(); steer(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });

    const SEOAH_FLY_CHEERS = [
      'Whoa, you and Carrot are zooming ahead!! 🐢💨',
      'Daebak! That rainbow ring made you super fast! 🌈',
      'Hehe, watch out for those storm clouds, Michelle! 🌸🧹',
      'Hwaiting, bestie!! It\'s neck and neck to the finish! 🏁✨',
      'Look at Carrot\'s little ears in the wind! 🐢💖',
    ];

    function spawnSkyItem(w, h, startX) {
      spawnCount++;
      // Every 3rd item is a Storm Cloud aimed near Michelle's current lane so she has to dodge!
      // Rainbow Rings spawn at a height away from Michelle's current lane so she has to steer to catch them!
      let kind;
      if (spawnCount % 3 === 0) kind = 'cloud';
      else if (spawnCount % 3 === 1) kind = 'ring';
      else kind = Math.random() < 0.65 ? 'star' : 'honey';

      let itemY;
      if (kind === 'cloud') {
        itemY = Math.max(52, Math.min(h - 52, skyState.my + (Math.random() * 36 - 18)));
      } else if (kind === 'ring') {
        // Spawn ring in the opposite half of the sky from Michelle's current position so she must steer to it!
        itemY = skyState.my < h * 0.5
          ? h * 0.58 + Math.random() * (h * 0.28)
          : 55 + Math.random() * (h * 0.28);
      } else {
        itemY = 52 + Math.random() * (h - 108);
      }

      skyState.items.push({
        kind,
        x: startX || (w + 45),
        y: itemY,
        vx: kind === 'cloud' ? 185 + Math.random() * 30 : 195 + Math.random() * 35,
        em: kind === 'star' ? '⭐' : kind === 'honey' ? '🍯' : '⛈️',
      });
    }

    function stepSky(now) {
      if (scene !== 'sky') { stopSky(); return; }
      const dt = Math.min(0.05, (now - skyState.lastTime) / 1000);
      skyState.lastTime = now;

      if (skyState.mBoost > 0) skyState.mBoost = Math.max(0, skyState.mBoost - dt * 1.1);
      else if (skyState.mBoost < 0) skyState.mBoost = Math.min(0, skyState.mBoost + dt * 1.0);

      if (skyState.raceActive) {
        // Real race challenge: Seo-Ah flies at ~12.5%/sec, while Michelle's base unboosted speed is 7.5%/sec.
        // Michelle MUST steer to Rainbow Rings and dodge Storm Clouds (⛈️) or Seo-Ah wins!
        skyState.mDist = Math.max(0, Math.min(100, skyState.mDist + (7.5 + skyState.mBoost * 7.5) * dt));
        skyState.sDist = Math.min(100, skyState.sDist + (12.5 + Math.sin(now / 480) * 1.0) * dt);

        const mPin = $('#race-michelle-pin');
        const sPin = $('#race-seoah-pin');
        if (mPin) mPin.style.left = Math.round(skyState.mDist) + '%';
        if (sPin) sPin.style.left = Math.round(skyState.sDist) + '%';

        if (skyState.mDist >= 100 || skyState.sDist >= 100) {
          skyState.raceActive = false;
          const michelleWon = skyState.mDist >= skyState.sDist;
          if (michelleWon) {
            S.stars += 5;
            const gotTrophy = !S.furniture.trophy && !S.roomItems.some(it => it.id === 'trophy');
            if (gotTrophy) add(S.furniture, 'trophy', 1);
            giveHearts(2);
            SFX.magic();
            sparkle(window.innerWidth / 2, window.innerHeight / 2, ['🏆', '🌈', '⭐', '💖'], 14);
            skyState.bannerMsg = gotTrophy
              ? '🏆 YOU BEAT SEO-AH!! +5 ⭐, +2 💖 & Golden Broom Trophy sent to your Room!'
              : '🏁 YOU WON THE RACE!! Great steering through the rings, Michelle! (+5 ⭐ & +2 💖)';
          } else {
            S.stars += 1;
            SFX.oops();
            skyState.bannerMsg = '🌸🏁 Seo-Ah Won the Race! "Hehe, I beat you! Steer into 🌈 Rings & dodge ⛈️ Clouds to beat me!" (+1 ⭐)';
          }
          save(); render();
          return;
        }
      }

      // Direct finger steering (no auto-magnet so Michelle's steering skill really counts!)
      const leadOffset = Math.max(-65, Math.min(85, (skyState.mDist - skyState.sDist) * 2.8));
      skyState.mx += ((W * 0.28 + leadOffset * 0.45) - skyState.mx) * Math.min(1, dt * 6);
      skyState.my += (skyState.ty - skyState.my) * Math.min(1, dt * 9.5);
      if (Math.random() < 0.05) skyState.sTargetY = 60 + Math.random() * (H - 120);
      const targetSx = Math.max(60, Math.min(W - 90, skyState.mx - leadOffset));
      skyState.sx += (targetSx - skyState.sx) * Math.min(1, dt * 4);
      skyState.sy += (skyState.sTargetY - skyState.sy) * Math.min(1, dt * 3.5);

      if (Math.random() < 0.6) {
        skyState.trail.push({ x: skyState.mx - 28, y: skyState.my + 4, life: 1, pink: false });
        skyState.trail.push({ x: skyState.sx - 24, y: skyState.sy + 4, life: 1, pink: true });
      }
      skyState.trail.forEach(t => { t.x -= (140 + skyState.mBoost * 70) * dt; t.life -= dt * 2.0; });
      skyState.trail = skyState.trail.filter(t => t.life > 0);

      skyState.spawnTick += dt;
      if (skyState.spawnTick > 0.56) {
        skyState.spawnTick = 0;
        spawnSkyItem(W, H);
      }

      // Clear & draw twilight sky + twinkling stars
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255, 245, 200, 0.85)';
      skyState.starsBg.forEach(st => {
        st.x -= Math.max(20, 55 + skyState.mBoost * 45) * st.s * dt;
        if (st.x < 0) st.x = W;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Finish Line banner when either racer is close to 100%!
      const leadPct = Math.max(skyState.mDist, skyState.sDist);
      if (skyState.raceActive && leadPct > 75) {
        const finX = W - ((leadPct - 75) / 25) * (W * 0.72);
        ctx.strokeStyle = 'rgba(255, 217, 119, 0.9)';
        ctx.lineWidth = 6;
        ctx.setLineDash([12, 12]);
        ctx.beginPath(); ctx.moveTo(finX, 20); ctx.lineTo(finX, H - 20); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = '34px sans-serif';
        ctx.fillText('🏁', finX, 36);
      }

      // Sparkle trails
      skyState.trail.forEach(t => {
        ctx.fillStyle = t.pink ? `rgba(255, 170, 215, ${t.life})` : `rgba(255, 225, 115, ${t.life})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 4 * t.life + 1, 0, Math.PI * 2);
        ctx.fill();
      });

      // Items (rainbow rings, stars, honey, storm clouds)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = skyState.items.length - 1; i >= 0; i--) {
        const it = skyState.items[i];
        it.x -= Math.max(90, it.vx + skyState.mBoost * 65) * dt;
        if (it.kind === 'ring') {
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#ff9ec7';
          ctx.beginPath(); ctx.ellipse(it.x, it.y, 18, 38, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.strokeStyle = '#ffd977';
          ctx.beginPath(); ctx.ellipse(it.x, it.y, 13, 31, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.strokeStyle = '#8ef0c8';
          ctx.beginPath(); ctx.ellipse(it.x, it.y, 8, 24, 0, 0, Math.PI * 2); ctx.stroke();
        } else {
          ctx.font = it.kind === 'cloud' ? '42px sans-serif' : '34px sans-serif';
          ctx.fillText(it.em, it.x, it.y);
        }

        const distM = Math.hypot(it.x - skyState.mx, it.y - skyState.my);
        if (distM < 44) {
          if (it.kind === 'ring') {
            skyState.rings++;
            skyState.mBoost = 1.25;
            skyState.mDist = Math.min(100, skyState.mDist + 8.5);
            S.stars += 2;
            SFX.magic();
            const msgEl = $('#sky-seoah-msg');
            if (msgEl) msgEl.textContent = SEOAH_FLY_CHEERS[skyState.rings % SEOAH_FLY_CHEERS.length];
          } else if (it.kind === 'star') {
            skyState.caught++;
            skyState.mBoost = Math.min(1.2, Math.max(0, skyState.mBoost) + 0.65);
            skyState.mDist = Math.min(100, skyState.mDist + 4.0);
            S.stars += 1;
            SFX.harvest();
          } else if (it.kind === 'honey') {
            skyState.caught++;
            skyState.mDist = Math.min(100, skyState.mDist + 3.0);
            S.honey = (S.honey || 0) + 1;
            SFX.coin();
          } else if (it.kind === 'cloud') {
            // Storm cloud slows Michelle down and pushes her back so Seo-Ah passes her!
            skyState.mBoost = -0.85;
            skyState.mDist = Math.max(0, skyState.mDist - 7.5);
            SFX.oops();
            const msgEl = $('#sky-seoah-msg');
            if (msgEl) msgEl.textContent = '⛈️ Oof, a storm cloud slowed you down! Dodge the ⛈️ clouds and aim for 🌈 rings!';
          }
          updateHud(); save();
          skyState.items.splice(i, 1);
        } else if (it.x < -60) {
          skyState.items.splice(i, 1);
        }
      }

      // Draw Seo-Ah on her pink blossom broom
      drawWitchOnBroom(ctx, skyState.sx, skyState.sy, {
        robe: '#ffafd2', hat: '#f48fb1', hair: '#2a1b24', name: 'Seo-Ah 🌸', carrot: false,
      });
      // Draw Michelle (black braided hair + warm beige witch robe/hat) + Carrot in broom basket!
      drawWitchOnBroom(ctx, skyState.mx, skyState.my, {
        robe: '#e6cba8', hat: '#d4b083', hair: '#18161b', name: 'Michelle & Carrot 🐢', carrot: true,
      });

      skyRaf = requestAnimationFrame(stepSky);
    }

    skyState.lastTime = performance.now();
    skyRaf = requestAnimationFrame(stepSky);
  }

  function drawWitchOnBroom(ctx, x, y, opt) {
    ctx.save();
    ctx.translate(x, y);
    // Broomstick shaft & bristles
    ctx.strokeStyle = '#8a5a36';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-36, 10); ctx.lineTo(32, 6); ctx.stroke();
    ctx.fillStyle = '#e0a858';
    ctx.beginPath(); ctx.moveTo(-34, 10); ctx.lineTo(-54, 2); ctx.lineTo(-52, 18); ctx.closePath(); ctx.fill();
    // Carrot in front basket for Michelle!
    if (opt.carrot) {
      ctx.font = '20px sans-serif';
      ctx.fillText('🐢', 24, -2);
    }
    // Robe body
    ctx.fillStyle = opt.robe;
    ctx.beginPath(); ctx.moveTo(-8, -4); ctx.lineTo(-20, 14); ctx.lineTo(8, 14); ctx.closePath(); ctx.fill();
    // Hair & head
    ctx.fillStyle = opt.hair;
    ctx.beginPath(); ctx.arc(0, -12, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffe2cc';
    ctx.beginPath(); ctx.arc(3, -11, 8, 0, Math.PI * 2); ctx.fill();
    // Pointed Witch Hat
    ctx.fillStyle = opt.hat;
    ctx.beginPath(); ctx.ellipse(0, -18, 17, 4, -0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-11, -18); ctx.lineTo(1, -36); ctx.lineTo(11, -18); ctx.closePath(); ctx.fill();
    // Name tag
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = 'rgba(255,248,235,0.92)';
    ctx.fillText(opt.name, 0, 27);
    ctx.restore();
  }

  function startSkyDash() {
    if (!skyState) skyState = null;
    if (skyState) {
      skyState.raceActive = true;
      skyState.mDist = 0;
      skyState.sDist = 0;
      skyState.mBoost = 0.8;
      skyState.bannerMsg = '';
    }
    SFX.magic();
    render();
  }

  // ---------- Class & Rich Seo-Ah Dialogues ----------
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
        <button class="btn pink" data-act="talk">💬 Talk with Seo-Ah</button>
        <button class="btn pink" data-act="giftMenu">🎁 Give a Gift</button>
        <button class="btn primary" data-act="inviteSleepover">🎀 Invite for Sleepover</button>
        <button class="btn primary" data-act="go" data-scene="sky">🧹 Fly Brooms</button>
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
    else lines.push({ who: 'seoah', text: ['Yay! Hwaiting, Michelle! 💪', 'You\'re so good at this!', 'Carrot is clapping. Well… flapping her flippers! 🐢'][Math.floor(Math.random() * 3)] });
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
    let unlock = null;
    if (!S.daily.talked) {
      S.daily.talked = true;
      unlock = giveHearts(1);
      save(); render();
    }
    const greeting = SEOAH_CHATS[(S.day + (S.storyIdx || 0)) % SEOAH_CHATS.length];
    say([
      {
        who: 'seoah',
        text: `${greeting} What do you want to do together, Michelle? 💖`,
        choices: [
          { label: '📖 Tell me a Witch School story!', pink: true, onPick: () => seoahStory() },
          { label: '🇰🇷 Teach me a Korean word & quiz me!', pink: true, onPick: () => seoahQuiz() },
          { label: '🔮 Read our Bestie Fortune!', onPick: () => seoahFortune() },
          { label: '🎀 Come to my room for a Sleepover!', onPick: () => startSleepover() },
          { label: '🧹 Let\'s go fly our brooms!', onPick: () => go('sky') },
        ],
      },
    ], () => {
      if (unlock) say([{ who: 'seoah', text: unlock.text }, { who: 'michelle', text: `Thank you, Seo-Ah!! (${FURNITURE[unlock.item].em} added to your Room)` }]);
    });
  }

  function seoahStory() {
    const st = SEOAH_STORIES[(S.storyIdx || 0) % SEOAH_STORIES.length];
    S.storyIdx = (S.storyIdx || 0) + 1;
    save();
    say([
      {
        who: 'seoah',
        text: st.q,
        choices: st.opts.map(o => ({
          label: o.label,
          pink: true,
          onPick: () => {
            const unlock = giveHearts(1);
            S.stars += 1;
            save(); render();
            const follow = [
              { who: 'seoah', text: o.reply + ' (+1 💖 & +1 ⭐)' },
            ];
            if (unlock) pushUnlock(follow, unlock);
            say(follow);
          },
        })),
      },
    ]);
  }

  function seoahQuiz() {
    const idx = (S.daily.word || 0) % KOREAN_WORDS.length;
    const [ko, rightEn] = KOREAN_WORDS[idx];
    S.daily.word = idx + 1;
    const wrong1 = KOREAN_WORDS[(idx + 3) % KOREAN_WORDS.length][1];
    const wrong2 = KOREAN_WORDS[(idx + 7) % KOREAN_WORDS.length][1];
    const opts = [
      { label: `✨ "${rightEn}"`, correct: true },
      { label: `🌙 "${wrong1}"`, correct: false },
      { label: `🍄 "${wrong2}"`, correct: false },
    ].sort(() => Math.random() - 0.5);
    save();
    say([
      { who: 'seoah', text: `Today's Korean word is ${ko}! Ready for a quick bestie quiz, Michelle? 🇰🇷` },
      {
        who: 'seoah',
        text: `What does ${ko} mean in English?`,
        choices: opts.map(o => ({
          label: o.label,
          pink: true,
          onPick: () => {
            if (o.correct) {
              const unlock = giveHearts(1);
              S.stars += 2;
              save(); render();
              const lines = [{ who: 'seoah', text: `딩동댕 (Ding-dong-daeng) — Correct!! ${ko} means "${rightEn}"! You're a Korean superstar, Michelle! (+1 💖 & +2 ⭐)` }];
              if (unlock) pushUnlock(lines, unlock);
              say(lines);
            } else {
              say([{ who: 'seoah', text: `Close! 😊 ${ko} actually means "${rightEn}"! Let's practice it together: ${ko.split(' ')[0]}! 💖` }]);
            }
          },
        })),
      },
    ]);
  }

  function seoahFortune() {
    const cropNames = Object.values(CROPS).map(c => `${c.em} ${c.name}`);
    const bakeNames = Object.values(BAKES).map(b => `${b.em} ${b.name}`);
    const lc = cropNames[Math.floor(Math.random() * cropNames.length)];
    const lb = bakeNames[Math.floor(Math.random() * bakeNames.length)];
    S.stars += 1; save(); render();
    say([
      { who: 'seoah', text: `🔮 *peeks into her crystal ball* Ooh! Today your lucky garden plant is ${lc}, and our lucky bakery snack is ${lb}!` },
      { who: 'seoah', text: 'And the stars say: Michelle, Seo-Ah, and Carrot will be best friends forever! (+1 ⭐)' },
    ]);
  }

  function pushUnlock(lines, unlock) {
    add(S.furniture, unlock.item);
    lines.push({ who: 'seoah', text: unlock.text });
    lines.push({ who: 'michelle', text: `Thank you, Seo-Ah! I'll put it in my room! (${FURNITURE[unlock.item].em} added to your Room)` });
    save();
  }

  function giftMenu() {
    const rows = [];
    Object.keys(S.bakes).forEach(id => {
      const b = BAKES[id];
      rows.push(`<div class="list-item"><span class="em">${b.em}</span><div class="grow"><b>${b.name} × ${S.bakes[id]}</b><small>Homemade bakery treat — Seo-Ah LOVES these! 💖</small></div><button class="btn pink" data-act="gift" data-kind="bake" data-id="${id}">Give</button></div>`);
    });
    Object.keys(S.crops).forEach(id => rows.push(`<div class="list-item"><span class="em">${CROPS[id].em}</span><div class="grow"><b>${CROPS[id].name} × ${S.crops[id]}</b><small>${id === 'starflower' ? 'Seo-Ah LOVES these!' : 'A nice gift'}</small></div><button class="btn pink" data-act="gift" data-kind="crop" data-id="${id}">Give</button></div>`));
    Object.keys(S.potions).forEach(id => {
      const p = id === 'soup' ? SOUP : RECIPES[id];
      rows.push(`<div class="list-item"><span class="em">${p.em}</span><div class="grow"><b>${p.name} × ${S.potions[id]}</b><small>${['friend', 'rainbow'].includes(id) ? 'Seo-Ah LOVES these!' : id === 'soup' ? 'Hmm… are you sure? 😅' : 'A nice gift'}</small></div><button class="btn pink" data-act="gift" data-kind="potion" data-id="${id}">Give</button></div>`);
    });
    openModal(`<h3>🎁 Gift for Seo-Ah</h3>${rows.join('') || '<div class="empty">Nothing to give yet. Bake a cookie or grow something in the garden!</div>'}<div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  function gift(kind, id) {
    const bag = kind === 'bake' ? S.bakes : kind === 'crop' ? S.crops : S.potions;
    if (!bag[id]) return;
    add(bag, id, -1);
    S.daily.gifted = true;
    closeModal();
    const loved = kind === 'bake' || id === 'starflower' || id === 'friend' || id === 'rainbow';
    const lines = [];
    let unlock;
    if (id === 'soup') {
      lines.push({ who: 'seoah', text: 'Mystery soup?! 😂 It smells like socks… but you made me laugh so hard! Thanks!' });
      unlock = giveHearts(1);
    } else if (kind === 'bake') {
      lines.push({ who: 'seoah', text: `You baked ${BAKES[id].name} ${BAKES[id].em} for me?! Masisseo — it's SO yummy, Michelle!! 🥹💖💖` });
      unlock = giveHearts(3);
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

  // ---------- Free-Form Illustrated Bedroom, Carrot's House & Sleepover ----------
  function renderRoom() {
    const owned = Object.keys(S.furniture).filter(id => S.furniture[id] > 0);
    const tray = owned.length
      ? owned.map(id => `<button class="${roomSel === id ? 'sel' : ''}" data-act="pick" data-id="${id}" aria-label="${FURNITURE[id].name}">${FURNITURE[id].em}<small>${S.furniture[id]}</small></button>`).join('')
      : '<span style="font-size:15px;font-weight:bold;color:var(--ink)">Drag items in your room to rearrange! Buy more in Shop 🛍️</span>';
    const cc = S.carrotCare || { fed: false, watered: false, loves: 1 };

    const pieces = (S.roomItems || []).map((it, idx) => {
      const f = FURNITURE[it.id];
      if (!f) return '';
      return `<button class="room-piece" data-room-idx="${idx}" style="left:${it.x}%;top:${it.y}%" title="Drag to move ${f.name}, or tap to put away">${f.em}</button>`;
    }).join('');

    const sleepoverBadge = S.sleepover
      ? `<button class="room-piece" data-act="sleepoverMenu" style="left:48%;top:68%;font-size:20px;background:rgba(255,240,248,0.94);padding:8px 14px;border:3px solid var(--pink);border-radius:22px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 20px rgba(0,0,0,.3)">
          <img src="assets/portrait-seoah.jpg" alt="Seo-Ah" style="width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid var(--pink)">
          <div style="text-align:left;color:var(--ink)"><b>🎀 Seo-Ah's Sleepover!</b><br><small>Tap for midnight snacks &amp; games ✨</small></div>
        </button>`
      : '';

    return `<div class="scene bg-room">
      <div class="critter-bar">
        <h2 style="margin:0">🏡 Michelle &amp; Carrot's Room</h2>
        <button class="btn pink" style="font-size:15px;padding:6px 14px" data-act="sleepoverMenu">🎀 ${S.sleepover ? 'Sleepover Games!' : 'Invite Seo-Ah for Sleepover!'}</button>
        <button class="btn primary" style="font-size:15px;padding:6px 14px" data-act="sleep">🌙 Sleep (Next Day)</button>
      </div>
      <div class="room-stage" id="room-stage">
        ${pieces}
        ${sleepoverBadge}
        <div class="carrot-corner" id="carrot-house-box">
          <div class="carrot-corner-top">
            <img src="assets/portrait-carrot.jpg" alt="Carrot">
            <div>
              <div style="font-weight:bold;font-size:16px;color:#6e3b10">🐢🏡 Carrot's House · 💚 ${cc.loves}</div>
              <div style="font-size:13px">🥣 ${cc.fed ? '🥕 Fed!' : 'Hungry'} · 💧 ${cc.watered ? '💦 Watered!' : 'Thirsty'}</div>
            </div>
          </div>
          <div class="carrot-corner-btns">
            <button class="btn primary" data-act="feedCarrotHouse">🥕 Feed Her</button>
            <button class="btn primary" data-act="waterCarrot">💧 Water</button>
            <button class="btn pink" data-act="petCarrotHouse">💚 Pet</button>
          </div>
        </div>
      </div>
      <div class="room-bottom-bar">
        <div class="tray">${tray}</div>
      </div>
    </div>`;
  }

  function bindRoom() {
    const stage = $('#room-stage');
    if (!stage) return;
    let draggingIdx = null;
    let moved = false;
    let startPt = [0, 0];

    stage.addEventListener('pointerdown', e => {
      const piece = e.target.closest('[data-room-idx]');
      if (piece) {
        e.preventDefault();
        draggingIdx = +piece.dataset.roomIdx;
        moved = false;
        startPt = [e.clientX, e.clientY];
        try { piece.setPointerCapture(e.pointerId); } catch {}
        return;
      }
      // If an item in the tray is selected and player taps open space in the room, place it there!
      if (roomSel && !e.target.closest('.carrot-corner') && !e.target.closest('[data-act]')) {
        const r = stage.getBoundingClientRect();
        const x = Math.max(10, Math.min(88, Math.round(((e.clientX - r.left) / r.width) * 100)));
        const y = Math.max(16, Math.min(86, Math.round(((e.clientY - r.top) / r.height) * 100)));
        S.roomItems.push({ uid: 'it-' + Date.now(), id: roomSel, x, y });
        add(S.furniture, roomSel, -1);
        if (!S.furniture[roomSel]) roomSel = null;
        SFX.plant();
        save(); render();
      }
    });

    stage.addEventListener('pointermove', e => {
      if (draggingIdx === null) return;
      if (Math.hypot(e.clientX - startPt[0], e.clientY - startPt[1]) > 6) moved = true;
      if (!moved) return;
      const r = stage.getBoundingClientRect();
      const x = Math.max(8, Math.min(90, Math.round(((e.clientX - r.left) / r.width) * 100)));
      const y = Math.max(14, Math.min(88, Math.round(((e.clientY - r.top) / r.height) * 100)));
      const it = S.roomItems[draggingIdx];
      if (it) {
        it.x = x; it.y = y;
        const dom = stage.querySelector(`[data-room-idx="${draggingIdx}"]`);
        if (dom) { dom.style.left = x + '%'; dom.style.top = y + '%'; }
      }
    });

    const endDrag = () => {
      if (draggingIdx === null) return;
      const idx = draggingIdx;
      draggingIdx = null;
      if (moved) {
        SFX.tap(); save();
      } else {
        // Quick tap on a placed item puts it back in the tray so Michelle can swap it easily
        const it = S.roomItems[idx];
        if (it) {
          add(S.furniture, it.id, 1);
          S.roomItems.splice(idx, 1);
          SFX.tap(); save(); render();
          toast(`Put ${FURNITURE[it.id].name} back in your tray`);
        }
      }
    };
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
  }

  function startSleepover() {
    S.sleepover = true;
    scene = 'room';
    SFX.magic();
    save(); render();
    sleepoverModal();
  }

  function sleepoverModal() {
    S.sleepover = true;
    save();
    if (scene === 'room') render();
    openModal(`<h3>🎀🌙 Bestie Sleepover with Seo-Ah!</h3>
      <p style="text-align:center;margin:2px 0 12px">Seo-Ah brought her pink sleeping bag &amp; flashlight to your room!</p>
      <div class="list-item"><span class="em">🍪</span><div class="grow"><b>Midnight Cookie &amp; Tea Party</b><small>Share warm pastries and honey rice cakes (+2 ⭐ &amp; +1 💖)</small></div><button class="btn pink" data-act="sleepoverAct" data-id="snacks">Share</button></div>
      <div class="list-item"><span class="em">🔦</span><div class="grow"><b>Pillow Fort Flashlight Stories</b><small>Pick a silly-spooky witch story under the blankets! (+1 💖)</small></div><button class="btn pink" data-act="sleepoverAct" data-id="stories">Tell Story</button></div>
      <div class="list-item"><span class="em">🐢</span><div class="grow"><b>Glow-Star Stickers on Carrot</b><small>Decorate Carrot's shell with glowing stars (+1 💚 &amp; +1 💖)</small></div><button class="btn primary" data-act="sleepoverAct" data-id="stickers">Decorate</button></div>
      <div class="list-item"><span class="em">🌟</span><div class="grow"><b>Wish on a Shooting Star</b><small>Look out the arched bedroom window together (+2 ⭐)</small></div><button class="btn primary" data-act="sleepoverAct" data-id="wish">Make Wish</button></div>
      <div class="list-item"><span class="em">😴</span><div class="grow"><b>Goodnight Sleepover!</b><small>Fall asleep in the pillow fort until tomorrow (+2 💖)</small></div><button class="btn primary" data-act="sleepoverAct" data-id="goodnight">Sleep</button></div>
      <div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  function sleepoverAct(id) {
    closeModal();
    if (id === 'snacks') {
      S.stars += 2;
      const unlock = giveHearts(1);
      save(); render();
      const lines = [
        { who: 'seoah', text: 'Yay!! Midnight cookies and strawberry milk on your lavender rug! Masisseo!! 🍪🍓 (+2 ⭐ & +1 💖)' },
        { who: 'carrot', text: 'Carrot munches a tiny midnight carrot crumb beside the pillow fort! 🐢🥕' },
      ];
      if (unlock) pushUnlock(lines, unlock);
      say(lines);
    } else if (id === 'stories') {
      say([
        {
          who: 'seoah',
          text: '🔦 *clicks flashlight on under the blanket fort* Ooooh! Which midnight story should we tell, Michelle?',
          choices: [
            {
              label: '👻 The Friendly Ghost in the Bakery!',
              pink: true,
              onPick: () => {
                giveHearts(1); save(); render();
                say([{ who: 'seoah', text: 'He only haunts the kitchen to Frost extra cupcakes at midnight!! 😂🧁 (+1 💖)' }]);
              },
            },
            {
              label: '🐸 The Frog Who Borrowed Prof. Hootsworth\'s Hat!',
              pink: true,
              onPick: () => {
                giveHearts(1); save(); render();
                say([{ who: 'seoah', text: 'Ribbit-hoo-hoo!! Carrot is laughing so hard her shell is shaking! 🐸🎩 (+1 💖)' }]);
              },
            },
          ],
        },
      ]);
    } else if (id === 'stickers') {
      S.carrotCare = S.carrotCare || { fed: false, watered: false, loves: 1 };
      S.carrotCare.loves += 1;
      giveHearts(1); save(); render();
      say([
        { who: 'michelle', text: 'Look, Seo-Ah! We put glow-in-the-dark star stickers all over Carrot\'s shell! ✨🐢' },
        { who: 'seoah', text: 'Gwiyeowo — she looks like a little galaxy turtle!! 🌟💖 (+1 💚 & +1 💖)' },
      ]);
    } else if (id === 'wish') {
      S.stars += 2;
      SFX.magic();
      sparkle(window.innerWidth / 2, window.innerHeight / 3, ['🌠', '🌟', '✨'], 14);
      save(); render();
      say([
        { who: 'seoah', text: 'Look out your window, Michelle — a shooting star over Starwillow Tower!! 🌠' },
        { who: 'michelle', text: 'I wish for us and Carrot to have the most magical year at Witch School ever! ✨ (+2 ⭐)' },
      ]);
    } else if (id === 'goodnight') {
      giveHearts(2);
      sleep(true);
      setTimeout(() => {
        say([{ who: 'seoah', text: 'Good morning, Michelle!! Best sleepover ever — let\'s do it again soon! ☀️💖 (+2 💖)' }]);
      }, 1300);
    }
  }

  function sleep(viaPotion) {
    overlay('overlay-sleep', 2400);
    chime([392, 330, 262], 0.25);
    setTimeout(() => {
      S.day++;
      S.daily = { talked: false, gifted: false, carrot: false, wateredCarrot: false, word: (S.daily.word || 0) + 1 };
      S.carrotCare = Object.assign({ loves: 1 }, S.carrotCare, { fed: false, watered: false });
      spawnCritters();
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
      ...Object.keys(S.bakes).map(id => ({ kind: 'bake', id, em: BAKES[id].em, name: BAKES[id].name, n: S.bakes[id], price: BAKES[id].sell })),
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
    const bag = kind === 'bake' ? S.bakes : kind === 'crop' ? S.crops : S.potions;
    if (!bag[id]) return;
    const price = kind === 'bake' ? BAKES[id].sell : kind === 'crop' ? CROPS[id].sell : (id === 'soup' ? SOUP : RECIPES[id]).sell;
    add(bag, id, -1); S.stars += price;
    SFX.coin(); save(); render();
  }

  // ---------- Bag, book, potions ----------
  function bag() {
    const rows = [];
    if (S.honey > 0) rows.push(`<div class="list-item"><span class="em">🍯</span><div class="grow"><b>Golden Honey × ${S.honey}</b><small>From garden bees — bake cookies &amp; tarts in the Bakery!</small></div></div>`);
    Object.keys(S.bakes).forEach(id => {
      const b = BAKES[id];
      rows.push(`<div class="list-item"><span class="em">${b.em}</span><div class="grow"><b>${b.name} × ${S.bakes[id]}</b><small>${b.desc}</small></div><button class="btn primary" data-act="pastryAction" data-id="${id}">Enjoy</button></div>`);
    });
    Object.keys(S.seeds).forEach(id => rows.push(`<div class="list-item"><span class="em">🌰</span><div class="grow"><b>${CROPS[id].name} seeds × ${S.seeds[id]}</b><small>Plant these in the Garden</small></div></div>`));
    Object.keys(S.crops).forEach(id => rows.push(`<div class="list-item"><span class="em">${CROPS[id].em}</span><div class="grow"><b>${CROPS[id].name} × ${S.crops[id]}</b><small>Use in potions or baking${id === 'carrot' ? ' — or feed Carrot!' : ''}</small></div>${id === 'carrot' ? '<button class="btn" data-act="feedCarrot">Feed Carrot</button>' : ''}</div>`));
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
      say([{ who: 'michelle', text: 'Bleh! Tastes like soggy socks! 🤢' }, { who: 'carrot', text: 'Carrot hides in her shell, giggling.' }]);
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
      say([{ who: 'carrot', text: `Carrot was digging in the flowerbed and found a ${CROPS[id].name} ${CROPS[id].em}! She brought a treasure for you today.` }]);
      return;
    }
    say([{ who: 'carrot', text: CARROT_LINES[Math.floor(Math.random() * CARROT_LINES.length)] }]);
  }

  function feedCarrot() {
    if (!S.crops.carrot) return;
    add(S.crops, 'carrot', -1);
    S.stars += 1;
    S.carrotCare = S.carrotCare || { fed: false, watered: false, loves: 1 };
    S.carrotCare.fed = true;
    S.carrotCare.loves = (S.carrotCare.loves || 0) + 1;
    closeModal(); save(); render();
    sparkleAt($('#carrot-buddy'), ['🥕', '💚', '⭐'], 8);
    SFX.heart();
    say([{ who: 'carrot', text: 'CRUNCH CRUNCH! Carrot ate the crunchy carrot! She wiggles her shell happily. +1 ⭐ & +1 💚' }]);
  }

  function feedCarrotHouse(el) {
    S.carrotCare = S.carrotCare || { fed: false, watered: false, loves: 1 };
    let snackName = 'crunchy garden carrot snack 🥕';
    if (S.bakes.carrot_cake) {
      add(S.bakes, 'carrot_cake', -1);
      snackName = 'slice of Fluffy Carrot Cake 🎂';
    } else if (S.crops.carrot) {
      add(S.crops, 'carrot', -1);
      snackName = 'fresh crunchy Carrot 🥕';
    }
    if (!S.carrotCare.fed) S.stars += 1;
    S.carrotCare.fed = true;
    S.carrotCare.loves = (S.carrotCare.loves || 0) + 1;
    SFX.heart();
    save(); render();
    if ($('#carrot-house-box')) sparkleAt($('#carrot-house-box'), ['🥕', '💚', '⭐'], 10);
    toast(`🐢🥕 Carrot munched her ${snackName}! (+1 💚)`);
  }

  function waterCarrot() {
    S.carrotCare = S.carrotCare || { fed: false, watered: false, loves: 1 };
    if (!S.carrotCare.watered) S.stars += 1;
    S.carrotCare.watered = true;
    S.carrotCare.loves = (S.carrotCare.loves || 0) + 1;
    SFX.water();
    save(); render();
    if ($('#carrot-house-box')) sparkleAt($('#carrot-house-box'), ['💧', '💦', '💚'], 10);
    toast('🐢💧 Fresh cool water! Carrot splashes her flippers happily! (+1 💚)');
  }

  function petCarrotHouse() {
    S.carrotCare = S.carrotCare || { fed: false, watered: false, loves: 1 };
    S.carrotCare.loves = (S.carrotCare.loves || 0) + 1;
    SFX.heart();
    save(); render();
    if ($('#carrot-house-box')) sparkleAt($('#carrot-house-box'), ['💚', '🐢', '✨'], 8);
    say([{ who: 'carrot', text: 'Carrot curls up inside her cozy little house and blinks happily at Michelle! 🐢🏡💚' }]);
  }

  function musicModal() {
    const songRows = SONGS.map((s, idx) => `<div class="list-item">
      <span class="em">${S.song === idx && S.music ? '🎶' : '🎵'}</span>
      <div class="grow"><b>${s.name}</b><small>${S.song === idx ? 'Selected melody' : 'Tap to play this melody'}</small></div>
      <button class="btn ${S.song === idx ? 'primary' : ''}" data-act="pickSong" data-i="${idx}">${S.song === idx && S.music ? 'Playing' : 'Play'}</button>
    </div>`).join('');
    openModal(`<h3>🎵 Witch School Music</h3>
      <div class="list-item"><span class="em">${S.music ? '🎵' : '🔇'}</span><div class="grow"><b>Background Music</b><small>Cozy music-box &amp; harp melodies</small></div><button class="btn primary" data-act="toggleMusic">${S.music ? 'Mute Music' : 'Turn On Music'}</button></div>
      ${songRows}
      <div class="list-item"><span class="em">${S.sound ? '🔊' : '🔇'}</span><div class="grow"><b>Sound Effects</b><small>Sparkles, water &amp; chimes</small></div><button class="btn" data-act="toggleSound">${S.sound ? 'Turn off' : 'Turn on'}</button></div>
      <div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  function settings() {
    openModal(`<h3>⚙️ Settings</h3>
      <div class="list-item"><span class="em">${S.music ? '🎵' : '🔇'}</span><div class="grow"><b>Music (${SONGS[S.song || 0].name})</b><small>Cozy background melody</small></div><button class="btn" data-act="toggleMusic">${S.music ? 'Turn off' : 'Turn on'}</button></div>
      <div class="list-item"><span class="em">${S.sound ? '🔊' : '🔇'}</span><div class="grow"><b>Sound Effects</b><small>Cute chimes and sparkles</small></div><button class="btn" data-act="toggleSound">${S.sound ? 'Turn off' : 'Turn on'}</button></div>
      <div class="list-item"><span class="em">🏠</span><div class="grow"><b>Play on the iPad Home Screen</b><small>In Safari, tap Share ⬆️ then "Add to Home Screen". Your progress saves on this iPad.</small></div></div>
      <div class="list-item"><span class="em">🧹</span><div class="grow"><b>Start over</b><small>Erases all progress</small></div><button class="btn" data-act="reset">Start over</button></div>
      <div class="row"><button class="btn" data-act="close">Close</button></div>`);
  }

  // ---------- Rendering ----------
  const SCENES = { garden: renderGarden, bakery: renderBakery, cauldron: renderCauldron, sky: renderSky, class: renderClass, room: renderRoom, shop: renderShop };
  function render() {
    const scroll = $('#scene .scene')?.scrollTop || 0;
    $('#scene').innerHTML = SCENES[scene]();
    const sc = $('#scene .scene'); if (sc) sc.scrollTop = scroll;
    document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.scene === scene));
    updateHud();
    if (scene === 'cauldron') bindCauldron();
    if (scene === 'room') bindRoom();
    if (scene === 'sky') bindSky(); else stopSky();
  }

  function go(next) {
    if (scene === 'room' && next !== 'room') roomSel = null;
    scene = next;
    SFX.tap();
    render();
    const sc = $('#scene .scene');
    if (sc) sc.scrollTop = 0;
  }

  function startGame() {
    $('#title').classList.add('hidden');
    $('#game').classList.remove('hidden');
    startMusic();
    render();
    if (!S.started) {
      S.started = true; save();
      say([
        { who: 'michelle', text: 'My first day at Starwillow Witch School! I\'m so excited I could float! ✨' },
        { who: 'carrot', text: 'Carrot pokes her head out of Michelle\'s bag and blinks happily. 🐢' },
        { who: 'seoah', text: 'Michelle! Over here! We\'re in the same class! Annyeong! 👋' },
        { who: 'michelle', text: 'Seo-Ah! Yay! Best friends AND classmates!' },
        { who: 'owl', text: 'Hoo-hoo! Welcome, young witches. Your first lesson: grow a Moonberry in your garden. Off you go!' },
        { who: 'seoah', text: 'Tap any soil bed in the garden to plant a seed, then tap again to water it. Hwaiting! 💪' },
      ]);
    }
  }

  // Resume/start music on any touch/click once in game (for iPad Safari AudioContext rules)
  document.addEventListener('pointerdown', () => {
    ensureAudio();
    if (S.music && !musicTimer && !$('#game').classList.contains('hidden')) startMusic();
  }, { passive: true });

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
      case 'dialogChoice': {
        const ch = activeChoices && activeChoices[+i];
        activeChoices = null;
        $('#dialog').classList.add('hidden');
        SFX.tap();
        if (ch && ch.onPick) ch.onPick();
        else nextLine();
        break;
      }
      case 'close': SFX.tap(); closeModal(); break;
      case 'plot': plotTap(+i, el); break;
      case 'plant': plant(+i, id); break;
      case 'catchCritter': catchCritter(+i, el); break;
      case 'callCritters': spawnCritters(); SFX.magic(); render(); toast('🦋🐝 Fresh butterflies & bees fluttered into the garden!'); break;
      case 'critterBook': SFX.tap(); critterBook(); break;
      case 'bake': bakeItem(id, el); break;
      case 'pastryAction': SFX.tap(); pastryAction(id); break;
      case 'eatBake':
        if (S.bakes[id]) {
          const b = BAKES[id];
          add(S.bakes, id, -1); S.stars += 2;
          closeModal(); SFX.harvest(); save(); render();
          toast(`😋 Yummy ${b.name} ${b.em}! (+2 ⭐)`);
        }
        break;
      case 'feedBakeCarrot':
        if (S.bakes[id]) {
          const b = BAKES[id];
          add(S.bakes, id, -1); S.stars += 2;
          S.carrotCare = S.carrotCare || { fed: false, watered: false, loves: 1 };
          S.carrotCare.fed = true; S.carrotCare.loves = (S.carrotCare.loves || 0) + 1;
          closeModal(); SFX.heart(); save(); render();
          sparkleAt($('#carrot-buddy'), [b.em, '💚', '⭐'], 10);
          say([{ who: 'carrot', text: `NOM NOM! Carrot gobbled up the ${b.name} ${b.em}! She is the happiest turtle ever! (+1 💚 & +2 ⭐)` }]);
        }
        break;
      case 'feedCarrotHouse': feedCarrotHouse(el); break;
      case 'waterCarrot': waterCarrot(); break;
      case 'petCarrotHouse': petCarrotHouse(); break;
      case 'addIng':
        if (pot.length < 3 && !pot.includes(id) && S.crops[id]) { add(S.crops, id, -1); pot.push(id); stir = 0; SFX.plant(); save(); render(); sparkleAt($('#cauldron'), ['🫧'], 4); }
        break;
      case 'emptyPot': pot.forEach(p => add(S.crops, p)); pot = []; stir = 0; SFX.tap(); save(); render(); break;
      case 'stirBtn': if (pot.length) addStir(20); break;
      case 'brew': brew(); break;
      case 'skyDash': startSkyDash(); break;
      case 'skyBoost':
        if (skyState) {
          skyState.mBoost = 2.0;
          skyState.mDist = Math.min(100, skyState.mDist + 5);
          SFX.magic();
        }
        break;
      case 'owl': SFX.tap(); say([{ who: 'owl', text: currentLesson().intro }, { who: 'owl', text: '💡 ' + currentLesson().hint }]); break;
      case 'seoah': talk(); break;
      case 'talk': talk(); break;
      case 'turnIn': turnIn(); break;
      case 'giftMenu': SFX.tap(); giftMenu(); break;
      case 'gift': gift(kind, id); break;
      case 'inviteSleepover': startSleepover(); break;
      case 'sleepoverMenu': SFX.tap(); sleepoverModal(); break;
      case 'sleepoverAct': sleepoverAct(id); break;
      case 'pick':
        if (S.furniture[id]) {
          // Place item right onto a cozy spot in the bedroom immediately so Michelle sees it right away, and she can drag it anywhere!
          const rx = 28 + Math.floor(Math.random() * 40);
          const ry = 42 + Math.floor(Math.random() * 34);
          S.roomItems.push({ uid: 'it-' + Date.now() + '-' + Math.random(), id, x: rx, y: ry });
          add(S.furniture, id, -1);
          roomSel = null;
          SFX.plant(); save(); render();
          toast(`Placed ${FURNITURE[id].name}! Drag it anywhere in your room ✨`);
        }
        break;
      case 'sleep': sleep(false); break;
      case 'buySeed': buySeed(id, el); break;
      case 'buyFurn': buyFurn(id, el); break;
      case 'sell': sell(kind, id); break;
      case 'bag': SFX.tap(); bag(); break;
      case 'book': SFX.tap(); book(); break;
      case 'music': SFX.tap(); musicModal(); break;
      case 'toggleMusic':
        S.music = !S.music;
        if (S.music) startMusic(); else stopMusic();
        save(); musicModal();
        break;
      case 'pickSong':
        S.song = +i; S.music = true; musicStep = 0;
        startMusic(); save(); musicModal();
        break;
      case 'settings': SFX.tap(); settings(); break;
      case 'drink': drink(id); break;
      case 'carrot': carrotTap(); break;
      case 'feedCarrot': feedCarrot(); break;
      case 'toggleSound': S.sound = !S.sound; save(); settings(); break;
      case 'reset':
        if (el.dataset.confirm) { stopMusic(); localStorage.removeItem(SAVE_KEY); S = newState(); pot = []; stir = 0; closeModal(); $('#game').classList.add('hidden'); $('#title').classList.remove('hidden'); }
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
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { save(); stopMusic(); }
    else if (S.music && !$('#game').classList.contains('hidden')) startMusic();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(r => r.update()).catch(() => {});
  }

  window.__starwillow = { get state() { return S; }, get musicPlaying() { return !!musicTimer; } }; // for testing
})();
