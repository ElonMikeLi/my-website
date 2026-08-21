// ========== ALBUM DATA INIT ==========
// 从 albums.js 的 ALBUM_DATA 构建内部专辑列表
// 目录约定：pictures/01.jpg 放封面，mp3/01/01.mp3 放歌曲

const albums = (typeof ALBUM_DATA !== 'undefined' && ALBUM_DATA && ALBUM_DATA.length > 0)
  ? ALBUM_DATA.map((data, i) => {
      const idx = i + 1;
      const pad = n => n.toString().padStart(2, '0');
      // 封面路径：优先用 data.cover，否则用 pictures/XX.jpg
      const cover = data.cover || `pictures/${pad(idx)}.jpg`;
      // 曲目列表：优先用 data.tracks，否则给一首默认曲目
      const tracks = (data.tracks && data.tracks.length > 0)
        ? data.tracks.map((t, ti) => ({
            title: t.title || `Track ${ti + 1}`,
            file: t.file || `mp3/${pad(idx)}/${pad(ti + 1)}.mp3`
          }))
        : [{ title: data.title || 'Untitled', file: `mp3/${pad(idx)}/01.mp3` }];

      return {
        id: i,
        title: data.title || 'Untitled',
        artist: data.artist || 'Unknown',
        genre: data.genre || 'Electronic',
        year: data.year || null,
        cover: cover,
        tracks: tracks,
        // 兼容旧字段（Web Audio 合成用）
        colors: generateAlbumColors(i, data.genre)
      };
    })
  : [
      // 兜底：如果 ALBUM_DATA 不存在，给一张默认专辑
      {
        id: 0,
        title: 'My Collection',
        artist: 'Various Artists',
        genre: 'Electronic',
        year: null,
        cover: 'pictures/01.jpg',
        tracks: [{ title: 'Track 1', file: 'mp3/01/01.mp3' }],
        colors: ['#0f0c29', '#302b63', '#24243e']
      }
    ];

// 根据流派生成专辑配色（用于缺封面时的渐变背景）
function generateAlbumColors(index, genre) {
  const palettes = {
    'electronic': [['#0f0c29', '#302b63', '#24243e']],
    'synthwave':  [['#FF006E', '#8338EC', '#3A86FF']],
    'indie':      [['#232526', '#414345']],
    'ambient':    [['#1a2980', '#26d0ce']],
    'jazz':       [['#355C7D', '#6C5B7B', '#C06C84']],
    'rock':       [['#870000', '#190A05']],
    'metal':      [['#000000', '#1a1a1a', '#333']],
    'hip hop':    [['#000000', '#434343']],
    'lo-fi':      [['#3E5151', '#DECBA4']],
    'folk':       [['#134E5E', '#71B280']],
    'country':    [['#D1913C', '#FFD194']],
    'classical':  [['#2C3E50', '#4CA1AF']],
    'r&b':        [['#4A0000', '#8B0000', '#DC143C']],
    'funk':       [['#FF8C00', '#FFD700', '#FF6347']],
    'pop':        [['#ff6b9d', '#c44569', '#f8b500']],
    'reggae':     [['#134E5E', '#00b09b', '#96c93d']],
    'world':      [['#614385', '#516395', '#9B59B6']],
    'post rock':  [['#283048', '#859398']],
  };
  const key = (genre || 'electronic').toLowerCase();
  const palette = palettes[key] || palettes['electronic'];
  return palette[index % palette.length];
}

// ========== LOADING ==========
let loadProgress = 0;
const loadingBar = document.getElementById('loadingBar');
const loadingEl = document.getElementById('loading');

const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 15;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loadingEl.classList.add('hidden');
    }, 300);
  }
  loadingBar.style.width = loadProgress + '%';
}, 100);

window.addEventListener('load', () => {
  loadProgress = Math.max(loadProgress, 90);
});

// ========== CUSTOM CURSOR ==========
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .album-card, .blog-card, .about-tag, .timeline-item, .quote-dot').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ========== SCROLL PROGRESS & NAV ==========
const scrollProgress = document.getElementById('scrollProgress');
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + '%';

  if (scrollTop > 100) {
    nav.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    nav.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== MOBILE MENU ==========
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ========== HERO PARTICLES ==========
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let heroMouseX = 0, heroMouseY = 0;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  initParticles();
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 15000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    // Mouse repulsion
    const dx = p.x - heroMouseX;
    const dy = p.y - heroMouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      p.vx += (dx / dist) * force * 0.2;
      p.vy += (dy / dist) * force * 0.2;
    }

    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.99;
    p.vy *= 0.99;

    // Wrap around
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    ctx.fill();

    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 100) * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  heroMouseX = e.clientX - rect.left;
  heroMouseY = e.clientY - rect.top;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawParticles();

// ========== TYPEWRITER ==========
const typewriterEl = document.getElementById('typewriter');
const typewriterTexts = [
  '独立开发者',
  '音乐收藏爱好者',
  '记录生活的人',
  '永远在路上'
];
let twIndex = 0, twCharIndex = 0, twDeleting = false;

function typewriter() {
  const current = typewriterTexts[twIndex];
  if (twDeleting) {
    typewriterEl.textContent = current.substring(0, twCharIndex - 1);
    twCharIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, twCharIndex + 1);
    twCharIndex++;
  }

  let delay = twDeleting ? 50 : 100;

  if (!twDeleting && twCharIndex === current.length) {
    delay = 2000;
    twDeleting = true;
  } else if (twDeleting && twCharIndex === 0) {
    twDeleting = false;
    twIndex = (twIndex + 1) % typewriterTexts.length;
    delay = 500;
  }

  setTimeout(typewriter, delay);
}
setTimeout(typewriter, 1500);

// ========== CLOCK ==========
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
  const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  document.getElementById('clockTime').textContent = timeStr;
  document.getElementById('clockDate').textContent = dateStr;
}
updateClock();
setInterval(updateClock, 1000);

// ========== SPIRAL ALBUMS ==========
const spiralTrack = document.getElementById('spiralTrack');
const spiralContainer = document.getElementById('spiralContainer');
const spiralCore = document.getElementById('spiralCore');

let spiralRotation = 0;
let spiralTilt = 0;
let targetRotation = 0;
let targetTilt = 0;
let isDragging = false;
let dragStartX = 0, dragStartY = 0;
let dragStartRotation = 0, dragStartTilt = 0;
let dragStartTime = 0;
let dragVelocity = 0;
let autoRotate = true;
let currentAlbumIndex = -1;
let currentTrackIndex = 0;

// Create album cards
albums.forEach((album, i) => {
  const card = document.createElement('div');
  card.className = 'album-card';
  card.dataset.index = i;
  const [c1, c2] = album.colors;
  card.innerHTML = `
    <div class="album-cover" style="background-image: linear-gradient(135deg, ${c1}, ${c2}); background-size: cover; background-position: center;">
      <div class="album-cover-circle"></div>
      <div class="album-cover-title">${album.title}</div>
      <div class="album-cover-artist">${album.artist}</div>
      <img src="${album.cover}" alt="${album.title}"
           style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;"
           onerror="this.style.display='none'">
    </div>
    <div class="album-info">
      <div class="album-title">${album.title}</div>
      <div class="album-artist">${album.artist}</div>
      <span class="album-genre">${album.genre}</span>
    </div>
  `;
  card.addEventListener('click', (e) => {
    if (Math.abs(dragVelocity) > 2) return; // Skip if was dragging
    playAlbum(i);
  });
  spiralTrack.appendChild(card);
});

function positionAlbums() {
  const cards = spiralTrack.querySelectorAll('.album-card');
  const total = cards.length;
  const spiralTurns = Math.max(2.5, Math.min(5, total / 6));
  const spiralHeight = Math.max(600, total * 50);

  cards.forEach((card, i) => {
    const angle = (i / total) * Math.PI * 2 * spiralTurns + spiralRotation * 0.01;
    const yOffset = (i / total - 0.5) * spiralHeight;
    const radius = 250;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const scale = (z + radius) / (radius * 2) * 0.5 + 0.5;
    const zIndex = Math.round(z + radius);

    card.style.transform = `translate3d(${x}px, ${yOffset}px, ${z}px) rotateY(${angle * 180 / Math.PI + 90}deg) scale(${scale})`;
    card.style.zIndex = zIndex;
    card.style.opacity = scale * 0.7 + 0.3;
  });
}

function animateSpiral() {
  if (autoRotate && !isDragging) {
    targetRotation += 0.15;
  }

  // Inertia
  if (!isDragging && Math.abs(dragVelocity) > 0.1) {
    targetRotation += dragVelocity;
    dragVelocity *= 0.95;
  }

  spiralRotation += (targetRotation - spiralRotation) * 0.1;
  spiralTilt += (targetTilt - spiralTilt) * 0.1;

  spiralTrack.style.transform = `rotateX(${spiralTilt}deg)`;
  positionAlbums();

  requestAnimationFrame(animateSpiral);
}
animateSpiral();

// Mouse drag
spiralContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartRotation = targetRotation;
  dragStartTilt = targetTilt;
  dragStartTime = Date.now();
  dragVelocity = 0;
  autoRotate = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  targetRotation = dragStartRotation + dx * 0.8;
  targetTilt = Math.max(-20, Math.min(20, dragStartTilt - dy * 0.1));
  dragVelocity = dx * 0.05;
});

document.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  setTimeout(() => { autoRotate = true; }, 2000);
});

// Mouse parallax
spiralContainer.addEventListener('mousemove', (e) => {
  if (isDragging) return;
  const rect = spiralContainer.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  targetTilt = -x * 5;
});

// Touch support
spiralContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  dragStartRotation = targetRotation;
  dragStartTilt = targetTilt;
  dragStartTime = Date.now();
  dragVelocity = 0;
  autoRotate = false;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - dragStartX;
  const dy = e.touches[0].clientY - dragStartY;
  targetRotation = dragStartRotation + dx * 0.8;
  targetTilt = Math.max(-20, Math.min(20, dragStartTilt - dy * 0.1));
  dragVelocity = dx * 0.05;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  isDragging = false;
  setTimeout(() => { autoRotate = true; }, 2000);
});

// Scroll-driven rotation
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const scrollDiff = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;

  const rect = spiralContainer.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    targetRotation += scrollDiff * 0.3;
  }
});

// View toggle
document.querySelectorAll('.spiral-view-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.spiral-view-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (btn.dataset.view === 'list') {
      spiralTrack.style.transition = 'transform 0.5s ease';
      targetTilt = 0;
      autoRotate = false;
    } else {
      spiralTrack.style.transition = 'transform 0.5s ease';
      autoRotate = true;
    }
    setTimeout(() => { spiralTrack.style.transition = ''; }, 500);
  });
});

// ========== AUDIO ENGINE ==========
let audioCtx = null;
let isPlaying = false;
let currentAlbum = null;
let currentTrack = null;
let startTime = 0;
let pauseTime = 0;
let masterGain = null;
let activeNodes = [];

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.3;
  masterGain.connect(audioCtx.destination);
}

function stopAllAudio() {
  activeNodes.forEach(node => {
    try {
      if (node.stop) node.stop();
      if (node.disconnect) node.disconnect();
    } catch(e) {}
  });
  activeNodes = [];
}

// 播放整张专辑（从第一首开始）
function playAlbum(albumIndex) {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  currentAlbumIndex = albumIndex;
  currentAlbum = albums[albumIndex];
  currentTrackIndex = 0;

  updatePlayerUI();
  renderTrackList();

  document.getElementById('playerModal').classList.add('show');
  document.getElementById('miniPlayer').classList.add('show');
  spiralCore.classList.add('playing');

  playCurrentTrack();
}

// 播放当前曲目
function playCurrentTrack() {
  if (!currentAlbum) return;
  currentTrack = currentAlbum.tracks[currentTrackIndex];

  // 更新 UI 上的曲目高亮
  updateTrackHighlight();
  updateMiniPlayerTrack();

  // 尝试播放真实音频文件
  const trackFile = currentTrack.file;
  if (trackFile) {
    stopAllAudio();
    if (!window.realAudio) {
      window.realAudio = new Audio();
      // 歌曲播完自动下一首
      window.realAudio.addEventListener('ended', onTrackEnded);
      // 加载元数据后更新时长显示
      window.realAudio.addEventListener('loadedmetadata', () => {
        updateProgressDisplay();
      });
    }
    window.realAudio.src = trackFile;
    window.realAudio.loop = false;
    window.realAudio.play().then(() => {
      window.isRealAudio = true;
      isPlaying = true;
      updatePlayIcons();
    }).catch(() => {
      // 文件加载失败，回退到 Web Audio 合成
      window.isRealAudio = false;
      playSynthTrack();
    });
    return;
  }

  // 没有文件路径，直接用合成音乐
  window.isRealAudio = false;
  playSynthTrack();
}

// 用 Web Audio 合成播放（无真实文件时的回退）
function playSynthTrack() {
  stopAllAudio();
  generateGenreMusic(currentAlbum.genre);
  isPlaying = true;
  startTime = audioCtx.currentTime;
  pauseTime = 0;
  updatePlayIcons();

  // 合成音乐也模拟"播完切下一首"（30 秒循环）
  if (window.synthEndTimer) clearTimeout(window.synthEndTimer);
  window.synthEndTimer = setTimeout(() => {
    if (isPlaying && !window.isRealAudio) {
      onTrackEnded();
    }
  }, 30000);
}

// 曲目播放完毕 → 下一首
function onTrackEnded() {
  nextTrack();
}

// 下一首（当前专辑内；最后一首则跳到下一张专辑第一首）
function nextTrack() {
  if (!currentAlbum) return;

  if (currentTrackIndex < currentAlbum.tracks.length - 1) {
    currentTrackIndex++;
  } else {
    // 专辑最后一首 → 下一张专辑第一首
    currentAlbumIndex = (currentAlbumIndex + 1) % albums.length;
    currentAlbum = albums[currentAlbumIndex];
    currentTrackIndex = 0;
    updatePlayerUI();
    renderTrackList();
  }

  playCurrentTrack();
}

// 上一首（当前专辑内；第一首则跳到上一张专辑最后一首）
function prevTrack() {
  if (!currentAlbum) return;

  if (currentTrackIndex > 0) {
    currentTrackIndex--;
  } else {
    // 专辑第一首 → 上一张专辑最后一首
    currentAlbumIndex = (currentAlbumIndex - 1 + albums.length) % albums.length;
    currentAlbum = albums[currentAlbumIndex];
    currentTrackIndex = currentAlbum.tracks.length - 1;
    updatePlayerUI();
    renderTrackList();
  }

  playCurrentTrack();
}

// 跳到指定曲目
function jumpToTrack(trackIndex) {
  if (!currentAlbum || trackIndex < 0 || trackIndex >= currentAlbum.tracks.length) return;
  currentTrackIndex = trackIndex;
  playCurrentTrack();
}

// 更新播放器 UI（封面、专辑名、艺人）
function updatePlayerUI() {
  const cover = currentAlbum.cover;
  document.getElementById('playerCover').src = cover;
  document.getElementById('playerCover').onerror = function() { this.style.display = 'none'; };
  document.getElementById('playerTitle').textContent = currentAlbum.title;
  document.getElementById('playerArtist').textContent = currentAlbum.artist;
  document.getElementById('miniPlayerCover').src = cover;
  document.getElementById('miniPlayerCover').onerror = function() { this.style.display = 'none'; };
  document.getElementById('miniPlayerTitle').textContent = currentAlbum.title;
  document.getElementById('miniPlayerArtist').textContent = currentAlbum.artist;
}

// 更新迷你播放器的当前曲目名
function updateMiniPlayerTrack() {
  if (!currentTrack) return;
  // 迷你播放器显示：曲目名 + 艺人
  document.getElementById('miniPlayerTitle').textContent = currentTrack.title;
  document.getElementById('miniPlayerArtist').textContent = currentAlbum.artist;
}

// 渲染曲目列表
function renderTrackList() {
  const listEl = document.getElementById('trackList');
  if (!listEl || !currentAlbum) return;

  listEl.innerHTML = '';
  currentAlbum.tracks.forEach((track, i) => {
    const item = document.createElement('div');
    item.className = 'track-item' + (i === currentTrackIndex ? ' active' : '');
    item.innerHTML = `
      <span class="track-number">${(i + 1).toString().padStart(2, '0')}</span>
      <span class="track-title">${track.title}</span>
      <span class="track-duration">—</span>
    `;
    item.addEventListener('click', () => {
      jumpToTrack(i);
    });
    listEl.appendChild(item);
  });
}

// 更新曲目列表高亮
function updateTrackHighlight() {
  const items = document.querySelectorAll('.track-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentTrackIndex);
  });
}

// ========== WEB AUDIO SYNTHESIS (genre patterns) ==========
function generateGenreMusic(genre) {
  const now = audioCtx.currentTime;
  const bpm = getGenreBPM(genre);
  const beatTime = 60 / bpm;

  switch(genre.toLowerCase()) {
    case 'electronic':
    case 'synthwave':
      playElectronicPattern(now, beatTime);
      break;
    case 'rock':
    case 'metal':
      playRockPattern(now, beatTime);
      break;
    case 'jazz':
      playJazzPattern(now, beatTime);
      break;
    case 'ambient':
    case 'post rock':
      playAmbientPattern(now, beatTime);
      break;
    case 'hip hop':
    case 'lo-fi':
      playHipHopPattern(now, beatTime);
      break;
    case 'folk':
    case 'country':
    case 'acoustic':
      playFolkPattern(now, beatTime);
      break;
    case 'classical':
      playClassicalPattern(now, beatTime);
      break;
    case 'funk':
    case 'r&b':
    case 'pop':
    default:
      playFunkPopPattern(now, beatTime);
      break;
  }
}

function getGenreBPM(genre) {
  const bpmMap = {
    'electronic': 120, 'synthwave': 110, 'rock': 130, 'metal': 140,
    'jazz': 90, 'ambient': 70, 'post rock': 80, 'hip hop': 95,
    'lo-fi': 80, 'folk': 100, 'country': 110, 'classical': 70,
    'funk': 115, 'r&b': 90, 'pop': 120, 'indie': 110,
    'reggae': 75, 'world': 100
  };
  return bpmMap[genre.toLowerCase()] || 100;
}

function createOsc(freq, type, gainVal, startTime, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(startTime);
  osc.stop(startTime + duration);
  activeNodes.push(osc, gain);
  return osc;
}

function playKick(time) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
  gain.gain.setValueAtTime(0.5, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.2);
  activeNodes.push(osc, gain);
}

function playSnare(time) {
  const noise = audioCtx.createBufferSource();
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.1, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1000;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.2, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  noise.start(time);
  noise.stop(time + 0.1);
  activeNodes.push(noise, filter, gain);
}

function playHat(time) {
  const noise = audioCtx.createBufferSource();
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 5000;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.08, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  noise.start(time);
  noise.stop(time + 0.05);
  activeNodes.push(noise, filter, gain);
}

function playBassNote(freq, time, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.value = freq;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 300;
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.15, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + duration);
  activeNodes.push(osc, filter, gain);
}

function playPadNote(freq, time, duration) {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc1.type = 'sine';
  osc2.type = 'sine';
  osc1.frequency.value = freq;
  osc2.frequency.value = freq * 1.005;
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.05, time + 0.5);
  gain.gain.linearRampToValueAtTime(0.05, time + duration - 0.5);
  gain.gain.linearRampToValueAtTime(0, time + duration);
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(masterGain);
  osc1.start(time);
  osc2.start(time);
  osc1.stop(time + duration);
  osc2.stop(time + duration);
  activeNodes.push(osc1, osc2, gain);
}

function playMelodyNote(freq, time, duration, type='sine') {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + duration);
  activeNodes.push(osc, gain);
}

function playElectronicPattern(startTime, beatTime) {
  const loopLen = beatTime * 16;
  const loops = 2;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    for (let i = 0; i < 16; i++) {
      if (i % 2 === 0) playKick(t0 + i * beatTime / 2);
    }
    for (let i = 2; i < 16; i += 4) {
      playSnare(t0 + i * beatTime / 2);
    }
    for (let i = 0; i < 32; i++) {
      playHat(t0 + i * beatTime / 4);
    }
    const bassNotes = [55, 55, 73, 65, 55, 55, 82, 73];
    for (let i = 0; i < 8; i++) {
      playBassNote(bassNotes[i], t0 + i * beatTime, beatTime * 0.8);
    }
    playPadNote(110, t0, loopLen);
    playPadNote(165, t0, loopLen);
    const melody = [440, 554, 659, 880, 659, 554];
    for (let i = 0; i < 16; i++) {
      playMelodyNote(melody[i % melody.length], t0 + i * beatTime / 2, beatTime / 3, 'triangle');
    }
  }
}

function playRockPattern(startTime, beatTime) {
  const loopLen = beatTime * 8;
  const loops = 4;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    for (let i = 0; i < 8; i++) {
      playKick(t0 + i * beatTime);
    }
    playSnare(t0 + beatTime);
    playSnare(t0 + beatTime * 3);
    playSnare(t0 + beatTime * 5);
    playSnare(t0 + beatTime * 7);
    const chords = [82, 82, 110, 98];
    for (let i = 0; i < 4; i++) {
      const t = t0 + i * beatTime * 2;
      createOsc(chords[i], 'sawtooth', 0.04, t, beatTime * 1.8);
      createOsc(chords[i] * 1.5, 'square', 0.02, t, beatTime * 1.8);
    }
    for (let i = 0; i < 8; i++) {
      playBassNote(55, t0 + i * beatTime, beatTime * 0.7);
    }
  }
}

function playJazzPattern(startTime, beatTime) {
  const loopLen = beatTime * 8;
  const loops = 4;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    for (let i = 0; i < 12; i++) {
      const swing = i % 2 === 0 ? 0 : 0.3;
      playHat(t0 + i * beatTime * (2/3) + swing * beatTime * 0.1);
    }
    const bassLine = [65, 73, 82, 98, 87, 98, 82, 73];
    for (let i = 0; i < 8; i++) {
      playBassNote(bassLine[i], t0 + i * beatTime, beatTime * 0.9);
    }
    const chordRoots = [130, 146, 164, 196];
    for (let i = 0; i < 4; i++) {
      playPadNote(chordRoots[i], t0 + i * beatTime * 2, beatTime * 1.8);
      playPadNote(chordRoots[i] * 1.25, t0 + i * beatTime * 2, beatTime * 1.8);
    }
    const scale = [261, 293, 329, 349, 392, 440, 493];
    for (let i = 0; i < 8; i++) {
      if (Math.random() > 0.3) {
        const note = scale[Math.floor(Math.random() * scale.length)];
        playMelodyNote(note, t0 + i * beatTime + Math.random() * 0.1, beatTime * 0.6, 'sine');
      }
    }
  }
}

function playAmbientPattern(startTime, beatTime) {
  const loopLen = beatTime * 16;
  const loops = 2;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    playPadNote(110, t0, loopLen * 0.9);
    playPadNote(165, t0 + beatTime * 2, loopLen * 0.8);
    playPadNote(220, t0 + beatTime * 4, loopLen * 0.7);
    playPadNote(277, t0 + beatTime * 6, loopLen * 0.6);
    const notes = [440, 523, 659, 784, 880];
    for (let i = 0; i < 8; i++) {
      const note = notes[i % notes.length];
      playMelodyNote(note, t0 + i * beatTime * 2 + Math.random() * beatTime, beatTime * 1.5, 'sine');
    }
    for (let i = 0; i < 4; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(80, t0 + i * beatTime * 4);
      osc.frequency.exponentialRampToValueAtTime(30, t0 + i * beatTime * 4 + 0.5);
      gain.gain.setValueAtTime(0.1, t0 + i * beatTime * 4);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + i * beatTime * 4 + 0.8);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t0 + i * beatTime * 4);
      osc.stop(t0 + i * beatTime * 4 + 0.8);
      activeNodes.push(osc, gain);
    }
  }
}

function playHipHopPattern(startTime, beatTime) {
  const loopLen = beatTime * 8;
  const loops = 4;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    playKick(t0);
    playKick(t0 + beatTime * 1.5);
    playKick(t0 + beatTime * 4);
    playKick(t0 + beatTime * 5.5);
    playSnare(t0 + beatTime);
    playSnare(t0 + beatTime * 3);
    playSnare(t0 + beatTime * 5);
    playSnare(t0 + beatTime * 7);
    for (let i = 0; i < 16; i++) {
      playHat(t0 + i * beatTime / 2);
    }
    playBassNote(55, t0, beatTime * 0.5);
    playBassNote(65, t0 + beatTime * 1.5, beatTime * 0.4);
    playBassNote(55, t0 + beatTime * 4, beatTime * 0.5);
    playBassNote(73, t0 + beatTime * 5.5, beatTime * 0.6);
    const melody = [330, 392, 440, 392];
    for (let i = 0; i < 4; i++) {
      playMelodyNote(melody[i], t0 + i * beatTime * 2, beatTime * 0.8, 'triangle');
    }
  }
}

function playFolkPattern(startTime, beatTime) {
  const loopLen = beatTime * 8;
  const loops = 4;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    const chord = [196, 246, 293, 329];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < chord.length; j++) {
        createOsc(chord[j], 'triangle', 0.02, t0 + i * beatTime * 2 + j * 0.01, beatTime * 1.5);
      }
    }
    playBassNote(82, t0, beatTime * 0.8);
    playBassNote(98, t0 + beatTime * 2, beatTime * 0.8);
    playBassNote(110, t0 + beatTime * 4, beatTime * 0.8);
    playBassNote(98, t0 + beatTime * 6, beatTime * 0.8);
    const notes = [440, 494, 523, 494, 440, 392, 440, 494];
    for (let i = 0; i < 8; i++) {
      playMelodyNote(notes[i], t0 + i * beatTime, beatTime * 0.5, 'sine');
    }
  }
}

function playClassicalPattern(startTime, beatTime) {
  const loopLen = beatTime * 16;
  const loops = 2;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    const baseFreq = 130;
    for (let v = 0; v < 4; v++) {
      playPadNote(baseFreq * Math.pow(2, v/12) + (Math.random()-0.5)*2, t0, loopLen * 0.9);
    }
    const melody = [261, 293, 329, 349, 392, 440, 493, 523, 493, 440, 392, 349, 329, 293, 261, 261];
    for (let i = 0; i < 16; i++) {
      playMelodyNote(melody[i], t0 + i * beatTime, beatTime * 0.8, 'sine');
    }
    for (let i = 0; i < 4; i++) {
      playBassNote(65, t0 + i * beatTime * 4, beatTime * 3.5);
    }
  }
}

function playFunkPopPattern(startTime, beatTime) {
  const loopLen = beatTime * 8;
  const loops = 4;
  for (let l = 0; l < loops; l++) {
    const t0 = startTime + l * loopLen;
    playKick(t0);
    playKick(t0 + beatTime * 2);
    playKick(t0 + beatTime * 4);
    playKick(t0 + beatTime * 6);
    playSnare(t0 + beatTime);
    playSnare(t0 + beatTime * 3);
    playSnare(t0 + beatTime * 5);
    playSnare(t0 + beatTime * 7);
    for (let i = 0; i < 16; i++) {
      playHat(t0 + i * beatTime / 2);
    }
    const bassLine = [65, 65, 82, 73, 65, 82, 98, 82];
    for (let i = 0; i < 8; i++) {
      playBassNote(bassLine[i], t0 + i * beatTime, beatTime * 0.6);
    }
    const chords = [261, 293, 329];
    for (let i = 0; i < 4; i++) {
      chords.forEach(freq => {
        createOsc(freq, 'sawtooth', 0.02, t0 + i * beatTime * 2 + beatTime * 0.5, beatTime * 0.3);
      });
    }
    const melody = [523, 587, 659, 698, 659, 587];
    for (let i = 0; i < 8; i++) {
      playMelodyNote(melody[i % melody.length], t0 + i * beatTime, beatTime * 0.4, 'triangle');
    }
  }
}

// ========== PLAYBACK CONTROLS ==========
function togglePlay() {
  if (!currentAlbum) return;

  if (window.isRealAudio && window.realAudio) {
    if (isPlaying) {
      window.realAudio.pause();
      isPlaying = false;
    } else {
      window.realAudio.play().catch(() => {});
      isPlaying = true;
    }
  } else {
    if (!audioCtx) return;
    if (isPlaying) {
      pauseTime = audioCtx.currentTime - startTime;
      stopAllAudio();
      if (window.synthEndTimer) clearTimeout(window.synthEndTimer);
      isPlaying = false;
    } else {
      generateGenreMusic(currentAlbum.genre);
      startTime = audioCtx.currentTime - pauseTime;
      // 重新设置结束定时器
      const remaining = 30000 - (pauseTime * 1000);
      if (window.synthEndTimer) clearTimeout(window.synthEndTimer);
      window.synthEndTimer = setTimeout(() => {
        if (isPlaying && !window.isRealAudio) {
          onTrackEnded();
        }
      }, Math.max(remaining, 1000));
      isPlaying = true;
    }
  }
  updatePlayIcons();
}

function updatePlayIcons() {
  const playIcon = document.getElementById('playerPlayIcon');
  const miniPlayIcon = document.getElementById('miniPlayIcon');
  const modal = document.getElementById('playerModal');

  if (isPlaying) {
    playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    miniPlayIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    modal.classList.add('playing');
    spiralCore.classList.add('playing');
  } else {
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    miniPlayIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    modal.classList.remove('playing');
    spiralCore.classList.remove('playing');
  }
}

// Modal controls
document.getElementById('playerPlayPause').addEventListener('click', togglePlay);
document.getElementById('playerPrev').addEventListener('click', prevTrack);
document.getElementById('playerNext').addEventListener('click', nextTrack);
document.getElementById('playerClose').addEventListener('click', () => {
  document.getElementById('playerModal').classList.remove('show');
});

// Mini player controls
document.getElementById('miniPlayPause').addEventListener('click', togglePlay);
document.getElementById('miniPrev').addEventListener('click', prevTrack);
document.getElementById('miniNext').addEventListener('click', nextTrack);

// Click mini player to open modal
document.getElementById('miniPlayer').addEventListener('click', (e) => {
  if (e.target.closest('.mini-player-controls')) return;
  document.getElementById('playerModal').classList.add('show');
});

// Progress bar update
function updateProgressDisplay() {
  if (!currentAlbum) return;

  let elapsed, duration;
  if (window.isRealAudio && window.realAudio) {
    elapsed = window.realAudio.currentTime;
    duration = window.realAudio.duration || 0;
  } else if (audioCtx) {
    elapsed = audioCtx.currentTime - startTime;
    duration = 30;
  } else {
    return;
  }

  if (!duration || duration <= 0 || isNaN(duration)) return;
  const progress = (elapsed % duration) / duration * 100;
  document.getElementById('playerProgressFill').style.width = progress + '%';

  const currentSec = Math.floor(elapsed % duration);
  const totalSec = Math.floor(duration);
  document.getElementById('playerCurrentTime').textContent =
    Math.floor(currentSec / 60) + ':' + (currentSec % 60).toString().padStart(2, '0');
  document.getElementById('playerDuration').textContent =
    Math.floor(totalSec / 60) + ':' + (totalSec % 60).toString().padStart(2, '0');
}

setInterval(updateProgressDisplay, 100);

// Click progress bar to seek
document.getElementById('playerProgressBar').addEventListener('click', (e) => {
  if (!isPlaying && !currentAlbum) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  if (window.isRealAudio && window.realAudio) {
    if (window.realAudio.duration) {
      window.realAudio.currentTime = percent * window.realAudio.duration;
    }
  } else if (audioCtx && currentAlbum) {
    const duration = 30;
    startTime = audioCtx.currentTime - percent * duration;
    pauseTime = percent * duration;
    stopAllAudio();
    if (window.synthEndTimer) clearTimeout(window.synthEndTimer);
    if (isPlaying) {
      generateGenreMusic(currentAlbum.genre);
      const remaining = 30000 - (pauseTime * 1000);
      window.synthEndTimer = setTimeout(() => {
        if (isPlaying && !window.isRealAudio) {
          onTrackEnded();
        }
      }, Math.max(remaining, 1000));
    }
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  switch(e.code) {
    case 'Space':
      e.preventDefault();
      if (currentAlbum) togglePlay();
      break;
    case 'ArrowRight':
      nextTrack();
      break;
    case 'ArrowLeft':
      prevTrack();
      break;
    case 'KeyM':
      if (masterGain) masterGain.gain.value = masterGain.gain.value > 0 ? 0 : 0.3;
      if (window.realAudio) window.realAudio.muted = !window.realAudio.muted;
      break;
  }
});

// ========== QUOTE SLIDER ==========
const quoteItems = document.querySelectorAll('.quote-item');
const quoteDots = document.querySelectorAll('.quote-dot');
let currentQuote = 0;

function showQuote(index) {
  quoteItems.forEach((q, i) => q.classList.toggle('active', i === index));
  quoteDots.forEach((d, i) => d.classList.toggle('active', i === index));
  currentQuote = index;
}

quoteDots.forEach(dot => {
  dot.addEventListener('click', () => {
    showQuote(parseInt(dot.dataset.index));
    resetQuoteTimer();
  });
});

let quoteInterval;
function resetQuoteTimer() {
  clearInterval(quoteInterval);
  quoteInterval = setInterval(() => {
    showQuote((currentQuote + 1) % quoteItems.length);
  }, 5000);
}
resetQuoteTimer();

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.reveal, .blog-card, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ========== LAZY LOADING IMAGES ==========
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.filter = 'blur(10px)';
      entry.target.style.transition = 'opacity .6s ease, filter .6s ease';
      requestAnimationFrame(() => {
        entry.target.style.opacity = '1';
        entry.target.style.filter = 'blur(0)';
      });
      imageObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

lazyImages.forEach(img => imageObserver.observe(img));

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
