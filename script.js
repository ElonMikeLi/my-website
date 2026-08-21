/* ============================================
   MIKE LI — Personal Site v3
   Creative Upgrade · Full Interactions
   ============================================ */

(function () {
  'use strict';

  // =======================
  // 专辑数据 (18 张)
  // =======================
  const albums = [
    { name: 'Neon Dreams', artist: 'Luna Vale', genre: 'Pop', key: 'C', bpm: 110, mood: 'bright',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2x4im2es_ve_miaoda' },
    { name: 'Brick &amp; Bone', artist: 'The Silence', genre: 'Rock', key: 'E', bpm: 140, mood: 'dark',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2ypbjihu_ve_miaoda' },
    { name: 'Circuit', artist: 'Kairo', genre: 'Electronic', key: 'F#', bpm: 128, mood: 'tech',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2xoytafs_ve_miaoda' },
    { name: 'Smoke &amp; Honey', artist: 'Miles Okafor', genre: 'Jazz', key: 'Bb', bpm: 90, mood: 'warm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2ye4zuhs_ve_miaoda' },
    { name: 'Morning Fog', artist: 'Hollow Pines', genre: 'Folk', key: 'G', bpm: 75, mood: 'warm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2xuurocu_ve_miaoda' },
    { name: 'Crown Royal', artist: 'KNG', genre: 'Hip-Hop', key: 'D', bpm: 85, mood: 'dark',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2yq7j4ks_ve_miaoda' },
    { name: 'Nocturne', artist: 'Elena Voss', genre: 'Classical', key: 'C#', bpm: 60, mood: 'calm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2ypp2igs_ve_miaoda' },
    { name: 'Velvet Hour', artist: 'JUNE', genre: 'R&amp;B', key: 'Ab', bpm: 95, mood: 'warm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2yhv5mbu_ve_miaoda' },
    { name: 'Lighthouse', artist: 'Low Tide', genre: 'Post-Rock', key: 'A', bpm: 120, mood: 'epic',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2x5uccaw_ve_miaoda' },
    { name: 'Paper Flowers', artist: 'Warm Light', genre: 'Indie', key: 'D', bpm: 100, mood: 'warm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2ytpzacw_ve_miaoda' },
    { name: 'Deep Space', artist: 'Nebula', genre: 'Ambient', key: 'F', bpm: 50, mood: 'calm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2z3iksks_ve_miaoda' },
    { name: 'Ashes &amp; Fire', artist: 'Ironclad', genre: 'Metal', key: 'C', bpm: 160, mood: 'dark',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2z7go2ps_ve_miaoda' },
    { name: 'Neon Nights', artist: 'The Groove', genre: 'Funk', key: 'E', bpm: 115, mood: 'bright',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2z5ugwaw_ve_miaoda' },
    { name: 'Rainy Window', artist: 'Chillhop', genre: 'Lo-fi', key: 'Db', bpm: 70, mood: 'calm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq22q4csbu_ve_miaoda' },
    { name: 'Sunset Boulevard', artist: 'Kingston', genre: 'Reggae', key: 'G', bpm: 80, mood: 'warm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq22dcgmas_ve_miaoda' },
    { name: 'Retro Drive', artist: 'Synthwave Kid', genre: 'Synthwave', key: 'D', bpm: 118, mood: 'tech',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2z7go4qs_ve_miaoda' },
    { name: 'Open Road', artist: 'Carter Hayes', genre: 'Country', key: 'A', bpm: 92, mood: 'warm',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2zxo72nu_ve_miaoda' },
    { name: 'Tribal Echoes', artist: 'World Collective', genre: 'World', key: 'E', bpm: 100, mood: 'epic',
      cover: '/spark/app/app_17cg6xpg144/runtime/api/v1/storage/object/bucket_aadkq2zue2yfg_static/static%2Faadkq2z5ugwbw_ve_miaoda' }
  ];

  const $ = id => document.getElementById(id);

  // =======================
  // PAGE LOADER
  // =======================
  function runPageLoader() {
    const loader = $('pageLoader');
    const bar = $('loaderBarFill');
    const num = $('loaderNum');
    let progress = 0;

    const timer = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        bar.style.width = '100%';
        num.textContent = '100%';
        setTimeout(() => {
          loader.classList.add('hidden');
        }, 400);
      } else {
        bar.style.width = progress + '%';
        num.textContent = Math.floor(progress) + '%';
      }
    }, 120);
  }

  // =======================
  // 自定义光标
  // =======================
  function initCustomCursor() {
    if (window.innerWidth <= 900) return;

    const dot = $('cursorDot');
    const ring = $('cursorRing');
    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    function animateRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // hover 效果
    document.querySelectorAll('[data-cursor="link"], a, button, .album-card, .blog-card, .info-line, .tag').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('hover');
        dot.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hover');
        dot.classList.remove('hover');
      });
    });
  }

  // =======================
  // 滚动进度条
  // =======================
  function updateScrollProgress() {
    const bar = $('scrollProgress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  // =======================
  // Hero 粒子背景（鼠标引力场）
  // =======================
  function initParticles() {
    const canvas = $('heroParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero');

    let w, h;
    let particles = [];
    const PARTICLE_COUNT = window.innerWidth <= 900 ? 50 : 120;
    let mouseX = -9999;
    let mouseY = -9999;

    function resize() {
      const rect = hero.getBoundingClientRect();
      w = canvas.width = rect.width * devicePixelRatio;
      h = canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    }

    function initP() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: (Math.random() * 1.5 + 0.5) * devicePixelRatio,
          alpha: Math.random() * 0.6 + 0.2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        // 鼠标引力/斥力
        const dx = p.x - mouseX * devicePixelRatio;
        const dy = p.y - mouseY * devicePixelRatio;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150 * devicePixelRatio;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // 阻尼
        p.vx *= 0.96;
        p.vy *= 0.96;

        // 基础漂移
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        // 边界环绕
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      // 连接邻近粒子的线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const linkDist = 100 * devicePixelRatio;
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5 * devicePixelRatio;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
    });

    window.addEventListener('resize', () => {
      resize();
      initP();
    });

    resize();
    initP();
    draw();
  }

  // =======================
  // 打字机效果
  // =======================
  function initTypewriter() {
    const tagText = $('tagText');
    if (!tagText) return;

    const phrases = [
      '写作者 · 聆听者 · 记录者',
      '前端设计师 / 独立开发者',
      '黑胶收藏 · 胶片摄影',
      '认真生活，本身就是一种创作'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tick() {
      const phrase = phrases[phraseIdx];

      if (!isDeleting) {
        charIdx++;
        tagText.textContent = phrase.slice(0, charIdx);
        if (charIdx === phrase.length) {
          isDeleting = true;
          setTimeout(tick, 2500);
          return;
        }
        setTimeout(tick, 60);
      } else {
        charIdx--;
        tagText.textContent = phrase.slice(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(tick, 500);
          return;
        }
        setTimeout(tick, 30);
      }
    }

    // 等首屏动画差不多再开始
    setTimeout(tick, 1800);
  }

  // =======================
  // 实时时钟
  // =======================
  function initHeroClock() {
    const el = $('heroTime');
    if (!el) return;

    function update() {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, '0');
      const m = d.getMinutes().toString().padStart(2, '0');
      const s = d.getSeconds().toString().padStart(2, '0');
      el.textContent = `${h}:${m}:${s}`;
    }
    update();
    setInterval(update, 1000);
  }

  // =======================
  // 金句轮播
  // =======================
  function initQuoteSlider() {
    const items = document.querySelectorAll('.quote-item');
    const dots = document.querySelectorAll('.quote-dot');
    if (!items.length) return;

    let current = 0;
    const interval = 5000;

    function goTo(idx) {
      items[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (idx + items.length) % items.length;
      items[current].classList.add('active');
      dots[current].classList.add('active');
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    setInterval(() => goTo(current + 1), interval);
  }

  // =======================
  // 时间线节点渐入
  // =======================
  function initTimeline() {
    const section = document.querySelector('.timeline-section');
    const items = document.querySelectorAll('.timeline-item');
    if (!section || !items.length) return;

    let activated = false;

    function check() {
      if (activated) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7) {
        activated = true;
        section.classList.add('in-view');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('in-view');
          }, 200 + i * 300);
        });
      }
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  // =======================
  // 回到顶部
  // =======================
  function initBackToTop() {
    const btn = $('backToTop');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function update() {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // =======================
  // 图片懒加载模糊
  // =======================
  function initLazyImages() {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    imgs.forEach(img => {
      if (img.complete && img.naturalWidth) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
      }
    });
  }

  // =======================
  // 螺旋唱片墙
  // =======================
  const spiralContainer = $('spiralContainer');
  const spiralWrapper = $('spiralWrapper');
  const spiralCore = $('spiralCore');
  const tooltip = $('albumTooltip');
  const tooltipName = $('tooltipName');
  const tooltipArtist = $('tooltipArtist');
  const tooltipGenre = $('tooltipGenre');
  const nav = $('nav');
  const menuBtn = $('menuBtn');
  const mobileMenu = $('mobileMenu');

  // 播放相关
  const playOverlay = $('playOverlay');
  const playClose = $('playClose');
  const playCoverImg = $('playCoverImg');
  const playGenre = $('playGenre');
  const playAlbumName = $('playAlbumName');
  const playArtist = $('playArtist');
  const playPauseBtn = $('playPauseBtn');
  const prevBtn = $('prevBtn');
  const nextBtn = $('nextBtn');
  const progressBar = $('progressBar');
  const progressFill = $('progressFill');
  const progressHandle = $('progressHandle');
  const playCurrent = $('playCurrent');
  const playDuration = $('playDuration');
  const volumeSlider = $('volumeSlider');
  const playVisualizer = $('playVisualizer');
  const heroVisualizer = $('heroVisualizer');

  const miniPlayer = $('miniPlayer');
  const miniCoverImg = $('miniCoverImg');
  const miniName = $('miniName');
  const miniArtist = $('miniArtist');
  const miniPlayPause = $('miniPlayPause');
  const miniPrev = $('miniPrev');
  const miniNext = $('miniNext');
  const miniProgressFill = $('miniProgressFill');

  let rotationY = 0;
  let rotationX = -12;
  let targetRotationY = 0;
  let targetRotationX = -12;
  let currentView = 'spiral';
  let cards = [];
  let currentAlbumIndex = -1;
  let isPlaying = false;
  let isOverlayOpen = false;
  let isMobile = window.innerWidth <= 900;

  // 拖拽状态
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartRotationY = 0;
  let dragStartRotationX = 0;
  let dragStartTime = 0;
  let dragVelocityY = 0;
  let dragVelocityX = 0;
  let lastDragX = 0;
  let lastDragY = 0;
  let lastDragTime = 0;
  let autoRotateSpeed = 0.06;

  function createSpiralCards() {
    spiralContainer.innerHTML = '';
    cards = [];

    albums.forEach((album, i) => {
      const card = document.createElement('div');
      card.className = 'album-card';
      card.dataset.index = i;
      card.setAttribute('data-cursor', 'link');

      card.innerHTML = `
        <div class="album-card-inner">
          <img src="${album.cover}" alt="${album.name} — ${album.artist}" loading="lazy" />
        </div>
        <div class="album-info">
          <div class="album-info-main">
            <div class="album-info-name">${album.name}</div>
            <div class="album-info-artist">${album.artist}</div>
          </div>
          <div class="album-info-genre">${album.genre}</div>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        if (!isDragging) showTooltip(album);
      });
      card.addEventListener('mouseleave', hideTooltip);
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playAlbum(i);
        }
      });

      spiralContainer.appendChild(card);
      cards.push(card);
    });

    // 懒加载图片
    initLazyImages();
  }

  function updateSpiralPositions() {
    if (currentView === 'list') return;

    const count = cards.length;
    if (count === 0) return;

    const scale = isMobile ? 0.6 : 1;
    const radiusX = 300 * scale;
    const radiusZ = 500 * scale;
    const ySpread = 900 * scale;
    const rotations = 3.2;
    const startAngle = -Math.PI / 2;

    cards.forEach((card, i) => {
      const t = i / (count - 1);
      const angle = startAngle + t * Math.PI * 2 * rotations;
      const y = (t - 0.5) * ySpread;
      const x = Math.cos(angle) * radiusX;
      const z = Math.sin(angle) * radiusZ;
      const faceY = -angle * (180 / Math.PI) + 90;

      card.style.transform = `
        translate3d(${x}px, ${y}px, ${z}px)
        rotateY(${faceY}deg)
      `;
      card.dataset.z = z;
      card.dataset.y = y;
    });
  }

  function animateSpiral() {
    if (currentView === 'spiral' && !isOverlayOpen) {
      if (isDragging) {
        rotationY = targetRotationY;
        rotationX = targetRotationX;
      } else {
        rotationY += (targetRotationY - rotationY) * 0.08;
        rotationX += (targetRotationX - rotationX) * 0.08;
      }

      spiralContainer.style.transform = `
        rotateX(${rotationX}deg)
        rotateY(${rotationY}deg)
      `;
    }
    requestAnimationFrame(animateSpiral);
  }

  function inertiaTick() {
    if (!isDragging && currentView === 'spiral' && !isOverlayOpen) {
      if (Math.abs(dragVelocityY) > 0.01 || Math.abs(dragVelocityX) > 0.01) {
        targetRotationY += dragVelocityY;
        targetRotationX += dragVelocityX;
        dragVelocityY *= 0.95;
        dragVelocityX *= 0.95;
      } else {
        const wrapperRect = spiralWrapper.getBoundingClientRect();
        if (wrapperRect.top < window.innerHeight && wrapperRect.bottom > 0) {
          targetRotationY += autoRotateSpeed;
        }
      }
    }
    requestAnimationFrame(inertiaTick);
  }

  // 滚动处理
  let lastScrollY = window.scrollY;
  function handleScroll() {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    const wrapperRect = spiralWrapper.getBoundingClientRect();
    if (
      currentView === 'spiral' &&
      !isOverlayOpen &&
      !isDragging &&
      wrapperRect.top < window.innerHeight &&
      wrapperRect.bottom > 0
    ) {
      const scrollDelta = window.scrollY - lastScrollY;
      targetRotationY += scrollDelta * 0.1;
    }

    lastScrollY = window.scrollY;
    updateReveal();
    updateActiveNav();
    updateScrollProgress();
  }

  // 鼠标视差
  function handleMouseMove(e) {
    if (isDragging || currentView !== 'spiral' || isOverlayOpen || isMobile) return;
    const wrapperRect = spiralWrapper.getBoundingClientRect();
    if (wrapperRect.top >= window.innerHeight || wrapperRect.bottom <= 0) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (e.clientX - centerX) / centerX;
    const offsetY = (e.clientY - centerY) / centerY;

    targetRotationX = -12 + offsetY * 8;
    targetRotationY += offsetX * 0.12;
  }

  // 拖拽
  function getPointerPos(e) {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function onDragStart(e) {
    if (currentView !== 'spiral' || isOverlayOpen) return;
    if (e.target.closest('.view-toggle')) return;

    const pos = getPointerPos(e);
    isDragging = true;
    dragStartX = pos.x;
    dragStartY = pos.y;
    dragStartRotationY = targetRotationY;
    dragStartRotationX = targetRotationX;
    dragStartTime = performance.now();
    lastDragX = pos.x;
    lastDragY = pos.y;
    lastDragTime = dragStartTime;
    dragVelocityY = 0;
    dragVelocityX = 0;

    spiralWrapper.classList.add('dragging');
    if (e.cancelable) e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDragging) return;

    const pos = getPointerPos(e);
    const now = performance.now();
    const dx = pos.x - dragStartX;
    const dy = pos.y - dragStartY;

    targetRotationY = dragStartRotationY + dx * 0.4;
    targetRotationX = dragStartRotationX - dy * 0.15;
    targetRotationX = Math.max(-40, Math.min(40, targetRotationX));

    const dt = Math.max(1, now - lastDragTime);
    dragVelocityY = (pos.x - lastDragX) * 0.4 / dt * 16;
    dragVelocityX = -(pos.y - lastDragY) * 0.15 / dt * 16;

    lastDragX = pos.x;
    lastDragY = pos.y;
    lastDragTime = now;

    if (e.cancelable) e.preventDefault();
  }

  function onDragEnd(e) {
    if (!isDragging) return;

    const pos = e.changedTouches && e.changedTouches.length
      ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
      : { x: e.clientX, y: e.clientY };

    const dx = pos.x - dragStartX;
    const dy = pos.y - dragStartY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const duration = performance.now() - dragStartTime;

    isDragging = false;
    spiralWrapper.classList.remove('dragging');

    if (dist < 8 && duration < 250) {
      const card = e.target.closest('.album-card');
      if (card) {
        const idx = parseInt(card.dataset.index, 10);
        if (!isNaN(idx)) playAlbum(idx);
      }
    }
  }

  spiralWrapper.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
  spiralWrapper.addEventListener('touchstart', onDragStart, { passive: false });
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('touchcancel', onDragEnd);

  function showTooltip(album) {
    tooltipName.innerHTML = album.name;
    tooltipArtist.textContent = album.artist;
    tooltipGenre.textContent = album.genre;
    tooltip.classList.add('show');
  }

  function hideTooltip() {
    tooltip.classList.remove('show');
  }

  function setView(view) {
    currentView = view;
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });

    if (view === 'list') {
      spiralContainer.classList.add('list-view');
      tooltip.style.display = 'none';
    } else {
      spiralContainer.classList.remove('list-view');
      tooltip.style.display = '';
      updateSpiralPositions();
    }
  }

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  // 移动端菜单
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // =======================
  // Reveal 动画
  // =======================
  const revealEls = [];
  function initReveal() {
    const targets = document.querySelectorAll(
      '.section-head, .about-avatar, .info-line, .tag-cloud, .blog-card, .quote-container, .footer-card'
    );
    targets.forEach(el => {
      el.classList.add('reveal');
      revealEls.push(el);
    });
  }

  function updateReveal() {
    const viewportBottom = window.scrollY + window.innerHeight * 0.88;
    revealEls.forEach(el => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top < viewportBottom) {
        el.classList.add('in-view');
      }
    });
  }

  function updateActiveNav() {
    const sections = ['top', 'albums', 'about', 'blog', 'timeline', 'contact'];
    let currentId = 'top';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 150) currentId = id;
    }
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  // =======================
  // Web Audio 引擎
  // =======================
  let audioCtx = null;
  let masterGain = null;
  let analyser = null;
  let analyserData = null;
  let currentNodes = [];
  let startTime = 0;
  let pauseTime = 0;
  const CLIP_DURATION = 30;

  function ensureAudio() {
    if (audioCtx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.7;

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    analyserData = new Uint8Array(analyser.frequencyBinCount);

    // 信号路径：各音源 → analyser → masterGain → destination
    analyser.connect(masterGain);
    masterGain.connect(audioCtx.destination);
  }

  const NOTE_FREQS = {
    'C': 261.63, 'C#': 277.18, 'Db': 277.18, 'D': 293.66,
    'D#': 311.13, 'Eb': 311.13, 'E': 329.63, 'F': 349.23,
    'F#': 369.99, 'Gb': 369.99, 'G': 392.00, 'G#': 415.30,
    'Ab': 415.30, 'A': 440.00, 'A#': 466.16, 'Bb': 466.16, 'B': 493.88
  };

  const PROGRESSIONS = {
    bright: [0, 5, 7, 4],
    warm:   [0, 4, 5, 3],
    dark:   [0, -2, -5, -3],
    calm:   [0, 3, 7, 5],
    tech:   [0, 7, 5, -2],
    epic:   [0, 5, 3, 7]
  };

  function getFreq(noteName, octave = 4) {
    const base = NOTE_FREQS[noteName] || 261.63;
    return base * Math.pow(2, octave - 4);
  }

  function getScaleDegrees(keyFreq, mood) {
    const prog = PROGRESSIONS[mood] || PROGRESSIONS.warm;
    return prog.map(deg => keyFreq * Math.pow(2, deg / 12));
  }

  function makeKick(t, dest, punchy = false, vol = 0.6) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(punchy ? 120 : 80, t);
    osc.frequency.exponentialRampToValueAtTime(punchy ? 30 : 25, t + 0.15);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(t);
    osc.stop(t + 0.3);
    return osc;
  }

  function makeSnare(t, dest, vol = 0.4, clap = false) {
    const noise = audioCtx.createBufferSource();
    const duration = clap ? 0.05 : 0.1;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = clap ? 1500 : 1000;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (clap ? 0.12 : 0.18));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(t);
    noise.stop(t + 0.2);
    return noise;
  }

  function makeHat(t, dest, vol = 0.1) {
    const noise = audioCtx.createBufferSource();
    const bufferSize = audioCtx.sampleRate * 0.04;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6000;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    noise.start(t);
    noise.stop(t + 0.06);
    return noise;
  }

  function makeDrumTrack(bpm, genre, dest) {
    const beatDur = 60 / bpm;
    const totalBeats = Math.floor(CLIP_DURATION / beatDur);
    const nodes = [];

    for (let i = 0; i < totalBeats; i++) {
      const t = startTime + i * beatDur;
      const beatInBar = i % 4;

      if (['Hip-Hop', 'Lo-fi', 'Electronic', 'Synthwave', 'Funk', 'Pop', 'R&B'].includes(genre)) {
        if (beatInBar === 0 || beatInBar === 2) {
          nodes.push(makeKick(t, dest, genre === 'Electronic' || genre === 'Synthwave'));
        }
      } else if (['Rock', 'Metal', 'Post-Rock'].includes(genre)) {
        nodes.push(makeKick(t, dest));
        if (i % 2 === 1) nodes.push(makeKick(t + beatDur / 2, dest, false, 0.5));
      } else if (genre === 'Reggae') {
        if (beatInBar === 0) nodes.push(makeKick(t, dest, false, 0.4));
      }

      if (['Hip-Hop', 'Funk'].includes(genre) && beatInBar === 2) {
        nodes.push(makeSnare(t, dest, 0.7, genre === 'Funk'));
      } else if (['Rock', 'Metal', 'Pop', 'Post-Rock'].includes(genre) && (beatInBar === 1 || beatInBar === 3)) {
        nodes.push(makeSnare(t, dest, 0.6));
      }

      if (['Electronic', 'Synthwave', 'Pop', 'Hip-Hop', 'Funk', 'R&B'].includes(genre)) {
        for (let h = 0; h < 4; h++) {
          nodes.push(makeHat(t + h * beatDur / 4, dest, 0.1 + Math.random() * 0.06));
        }
      }
    }
    return nodes;
  }

  function makeBass(freq, t, dur, dest, genre) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = genre === 'Electronic' || genre === 'Synthwave' ? 800 : 600;
    osc.type = genre === 'Funk' ? 'square' : (genre === 'Electronic' || genre === 'Synthwave' ? 'sawtooth' : 'sine');
    osc.frequency.value = freq / 2;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
    gain.gain.setValueAtTime(0.25, t + dur * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    osc.start(t);
    osc.stop(t + dur + 0.05);
    return osc;
  }

  function makePad(freq, t, dur, dest, mood) {
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1800;

    const oscs = [];
    [0, 3, -3, 7].forEach(detune => {
      const osc = audioCtx.createOscillator();
      osc.type = mood === 'tech' ? 'sawtooth' : 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = detune;
      osc.connect(filter);
      oscs.push(osc);
    });

    filter.connect(gain);
    gain.connect(dest);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.06, t + 1.5);
    gain.gain.setValueAtTime(0.06, t + dur - 1.5);
    gain.gain.linearRampToValueAtTime(0.001, t + dur);
    oscs.forEach(o => { o.start(t); o.stop(t + dur + 0.1); });
    return oscs[0];
  }

  function makeMelody(freqs, startT, beatDur, dest, genre) {
    const nodes = [];
    let t = startT;
    freqs.forEach(freq => {
      if (!freq) { t += beatDur / 2; return; }
      const dur = beatDur * (Math.random() > 0.7 ? 0.5 : 0.9);
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = genre === 'Synthwave' || genre === 'Electronic' ? 'square' : 'triangle';
      osc.frequency.value = freq * 2;

      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.value = 5;
      lfoGain.gain.value = 3;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.setValueAtTime(0.12, t + dur * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(t);
      osc.stop(t + dur + 0.05);
      lfo.start(t);
      lfo.stop(t + dur + 0.05);
      nodes.push(osc);
      t += beatDur / 2;
    });
    return nodes;
  }

  function generateTrack(album) {
    stopAll();
    const keyFreq = getFreq(album.key, 4);
    const chordFreqs = getScaleDegrees(keyFreq, album.mood);
    const beatDur = 60 / album.bpm;
    const barDur = beatDur * 4;
    const totalBars = Math.floor(CLIP_DURATION / barDur);

    startTime = audioCtx.currentTime + 0.05;

    if (['Ambient', 'Classical', 'Folk'].indexOf(album.genre) === -1) {
      currentNodes.push(...makeDrumTrack(album.bpm, album.genre, analyser));
    }

    for (let b = 0; b < totalBars; b++) {
      const t = startTime + b * barDur;
      const chordRoot = chordFreqs[b % chordFreqs.length];

      if (['Ambient', 'Classical'].indexOf(album.genre) === -1) {
        currentNodes.push(makeBass(chordRoot, t, barDur * 0.95, analyser, album.genre));
      }

      if (['Ambient', 'Electronic', 'Synthwave', 'Post-Rock', 'Indie', 'R&B'].includes(album.genre)
          || album.mood === 'calm' || album.mood === 'epic') {
        currentNodes.push(makePad(chordRoot, t, barDur, analyser, album.mood));
        currentNodes.push(makePad(chordRoot * 1.5, t, barDur, analyser, album.mood));
      }
    }

    const melFreqs = [];
    const melBars = Math.min(8, totalBars);
    for (let m = 0; m < melBars * 8; m++) {
      if (Math.random() < 0.35) {
        melFreqs.push(null);
      } else {
        const degIdx = Math.floor(Math.random() * 5);
        const freq = chordFreqs[degIdx % chordFreqs.length];
        const oct = Math.random() < 0.5 ? 1 : 2;
        melFreqs.push(freq * oct);
      }
    }
    currentNodes.push(...makeMelody(melFreqs, startTime + beatDur * 2, beatDur / 2, analyser, album.genre));
  }

  function stopAll() {
    currentNodes.forEach(n => {
      try {
        if (n.stop) n.stop();
        if (n.disconnect) n.disconnect();
      } catch (e) {}
    });
    currentNodes = [];
  }

  function playAlbum(index) {
    ensureAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    currentAlbumIndex = index;
    const album = albums[index];

    updateNowPlayingUI(album);
    openPlayOverlay(album);
    generateTrack(album);

    isPlaying = true;
    updatePlayPauseIcons();
    miniPlayer.classList.add('active');

    pauseTime = 0;
    startTime = audioCtx.currentTime + 0.05;

    // 核心发光增强
    if (spiralCore) spiralCore.classList.add('playing');
  }

  function togglePlay() {
    if (currentAlbumIndex < 0) return;
    ensureAudio();

    if (isPlaying) {
      pauseTime = (audioCtx.currentTime - startTime) % CLIP_DURATION;
      stopAll();
      isPlaying = false;
      if (spiralCore) spiralCore.classList.remove('playing');
    } else {
      const album = albums[currentAlbumIndex];
      generateTrack(album);
      startTime = audioCtx.currentTime - pauseTime;
      isPlaying = true;
      if (spiralCore) spiralCore.classList.add('playing');
    }
    updatePlayPauseIcons();
  }

  function nextTrack() {
    if (currentAlbumIndex < 0) return;
    playAlbum((currentAlbumIndex + 1) % albums.length);
  }

  function prevTrack() {
    if (currentAlbumIndex < 0) return;
    playAlbum((currentAlbumIndex - 1 + albums.length) % albums.length);
  }

  function seekTo(ratio) {
    if (currentAlbumIndex < 0) return;
    const offset = ratio * CLIP_DURATION;
    const album = albums[currentAlbumIndex];
    stopAll();
    generateTrack(album);
    startTime = audioCtx.currentTime - offset;
  }

  function setVolume(val) {
    ensureAudio();
    if (masterGain) masterGain.gain.value = val / 100;
  }

  function getCurrentTime() {
    if (!isPlaying || currentAlbumIndex < 0) return pauseTime || 0;
    return (audioCtx.currentTime - startTime) % CLIP_DURATION;
  }

  function updatePlayPauseIcons() {
    const iconPlay = playPauseBtn.querySelector('.icon-play');
    const iconPause = playPauseBtn.querySelector('.icon-pause');
    const miniIconPlay = miniPlayPause.querySelector('.icon-play');
    const miniIconPause = miniPlayPause.querySelector('.icon-pause');

    if (isPlaying) {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      miniIconPlay.style.display = 'none';
      miniIconPause.style.display = 'block';
    } else {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      miniIconPlay.style.display = 'block';
      miniIconPause.style.display = 'none';
    }
  }

  function updateNowPlayingUI(album) {
    playCoverImg.src = album.cover;
    playGenre.textContent = album.genre;
    playAlbumName.innerHTML = album.name;
    playArtist.textContent = album.artist;
    miniCoverImg.src = album.cover;
    miniName.innerHTML = album.name;
    miniArtist.textContent = album.artist;
    playDuration.textContent = formatTime(CLIP_DURATION);
  }

  function openPlayOverlay() {
    isOverlayOpen = true;
    playOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePlayOverlay() {
    isOverlayOpen = false;
    playOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  // 播放控件事件
  playPauseBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
  playClose.addEventListener('click', closePlayOverlay);
  playOverlay.addEventListener('click', (e) => {
    if (e.target === playOverlay) closePlayOverlay();
  });
  miniPlayPause.addEventListener('click', togglePlay);
  miniPrev.addEventListener('click', prevTrack);
  miniNext.addEventListener('click', nextTrack);

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(Math.max(0, Math.min(1, ratio)));
  });

  volumeSlider.addEventListener('input', (e) => setVolume(e.target.value));

  // 进度更新
  function updateProgress() {
    if (currentAlbumIndex >= 0) {
      const current = getCurrentTime();
      const ratio = (current / CLIP_DURATION) * 100;
      progressFill.style.width = ratio + '%';
      progressHandle.style.left = ratio + '%';
      miniProgressFill.style.width = ratio + '%';
      playCurrent.textContent = formatTime(current);
    }
    requestAnimationFrame(updateProgress);
  }

  // =======================
  // 可视化
  // =======================
  function drawHeroVisualizer() {
    const canvas = heroVisualizer;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * devicePixelRatio) {
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
    }
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    const w = rect.width;
    const h = rect.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const t = performance.now() / 1000;

    ctx.clearRect(0, 0, w, h);

    // 多层扩散圆环
    for (let i = 0; i < 5; i++) {
      const phase = (t * 0.15 + i / 5) % 1;
      const radius = 60 + phase * Math.min(w, h) * 0.4;
      const alpha = (1 - phase) * 0.2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 中央脉动波形
    ctx.beginPath();
    const wavePoints = 60;
    const waveAmp = 15 + Math.sin(t * 1.5) * 5;
    for (let i = 0; i <= wavePoints; i++) {
      const x = (i / wavePoints) * w;
      const y = centerY + Math.sin(i * 0.3 + t * 2) * waveAmp + Math.sin(i * 0.1 + t) * waveAmp * 0.5;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    requestAnimationFrame(drawHeroVisualizer);
  }

  function drawPlayVisualizer() {
    const canvas = playVisualizer;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * devicePixelRatio) {
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
    }
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const barCount = 32;
    const barWidth = w / barCount - 2;
    const barGap = 2;

    for (let i = 0; i < barCount; i++) {
      let height;
      if (isPlaying && analyser && analyserData) {
        const idx = Math.floor(i * (analyserData.length / barCount));
        height = (analyserData[idx] / 255) * h * 0.9;
      } else {
        const t = performance.now() / 1000;
        height = (0.2 + Math.sin(i * 0.3 + t) * 0.15 + Math.sin(i * 0.7 + t * 1.5) * 0.1) * h * 0.3;
      }

      const x = i * (barWidth + barGap);
      const y = h - height;
      const grad = ctx.createLinearGradient(0, y, 0, h);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barWidth, height);
    }

    if (isPlaying && analyser) {
      analyser.getByteFrequencyData(analyserData);
    }

    requestAnimationFrame(drawPlayVisualizer);
  }

  // =======================
  // Resize
  // =======================
  function handleResize() {
    isMobile = window.innerWidth <= 900;
    if (currentView === 'spiral') updateSpiralPositions();
  }

  // =======================
  // 升级声明
  // =======================
  function announceUpgrade() {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        { type: 'miaoda:upgrade:available', kind: 'interactive-prototype' },
        '*'
      );
    }
  }

  // =======================
  // 初始化
  // =======================
  function init() {
    createSpiralCards();
    updateSpiralPositions();
    initReveal();
    animateSpiral();
    inertiaTick();
    updateProgress();

    // 各模块
    initCustomCursor();
    initParticles();
    initTypewriter();
    initHeroClock();
    initQuoteSlider();
    initTimeline();
    initBackToTop();
    initLazyImages();

    // 事件
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 可视化
    if (heroVisualizer) drawHeroVisualizer();
    if (playVisualizer) drawPlayVisualizer();

    // 音量
    setVolume(volumeSlider.value);

    // 升级声明
    announceUpgrade();

    // 初始触发
    handleScroll();
    updateReveal();
  }

  // 先运行 loading
  runPageLoader();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
