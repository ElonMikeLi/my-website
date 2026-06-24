// ============================================================
// 常量配置（一处修改，全局生效）
// ============================================================
const CONFIG = {
  SVG_DRAW_DURATION: 1500,       // SVG 绘制动画时长 (ms)
  LOADER_VISIBLE_DURATION: 1900, // 加载画面总停留时长 (ms)
  LOADER_EXIT_DURATION: 500,     // 加载画面退出动画时长 (ms)
  TEXT_SCRAMBLE_INTERVAL: 2500,  // 文字打乱间隔 (ms)
  CURSOR_GLOW_LERP: 0.15,       // 光晕跟随平滑系数
  PARALLAX_HERO: 0.3,            // Hero 视差系数
  HEADER_SCROLL_THRESHOLD: 20,   // 头部阴影触发滚动距离
  SMOOTH_SCROLL_OFFSET: 80,      // 锚点滚动偏移量
};

// ============================================================
// 文章数据
// ============================================================
const posts = [
  {
    title: "不问归期，不提旧人",
    date: "2026-06-22",
    tag: "随笔",
    excerpt: "跨山越海皆陌路，余生岁岁又年年。世间风月千万种，再无一处可相逢。过往温柔与欢喜，尽数封存在昨日。往后前路各自独行，不问归期，也莫提旧人。",
  },
];

// ============================================================
// DOM 引用（统一获取，方便调试）
// ============================================================
const DOM = {
  get postList() { return document.getElementById("postList"); },
  get yearEl() { return document.getElementById("year"); },
  get menuBtn() { return document.getElementById("menuBtn"); },
  get nav() { return document.getElementById("nav"); },
  get header() { return document.querySelector(".site-header"); },
  get cursorGlow() { return document.getElementById("cursorGlow"); },
  get loader() { return document.getElementById("loader"); },
};

// ============================================================
// 状态变量
// ============================================================
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let mouseInViewport = false;
let cursorRAF = null;

// ============================================================
// 光标光晕 —— 鼠标在视口内才运行动画，离开时停止
// ============================================================
function updateCursorGlow() {
  const glow = DOM.cursorGlow;
  if (!glow) return;

  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  cursorX += dx * CONFIG.CURSOR_GLOW_LERP;
  cursorY += dy * CONFIG.CURSOR_GLOW_LERP;

  glow.style.left = `${cursorX}px`;
  glow.style.top = `${cursorY + window.scrollY}px`;

  if (mouseInViewport) {
    cursorRAF = requestAnimationFrame(updateCursorGlow);
  }
}

function startCursorGlow() {
  if (cursorRAF) cancelAnimationFrame(cursorRAF);
  cursorRAF = requestAnimationFrame(updateCursorGlow);
}

function stopCursorGlow() {
  if (cursorRAF) {
    cancelAnimationFrame(cursorRAF);
    cursorRAF = null;
  }
}

function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!mouseInViewport) {
    mouseInViewport = true;
    const glow = DOM.cursorGlow;
    if (glow) glow.style.opacity = "1";
    startCursorGlow();
  }
}

function handleMouseLeave() {
  mouseInViewport = false;
  const glow = DOM.cursorGlow;
  if (glow) glow.style.opacity = "0";
}

// ============================================================
// 视差滚动 —— 改用 scroll 事件驱动，消除独立 RAF 循环
// ============================================================
function updateParallax() {
  const shapes = document.querySelectorAll("[data-parallax]");
  const scrollPosition = window.scrollY;

  shapes.forEach((shape) => {
    const speed = parseFloat(shape.dataset.parallax) || 0.05;
    shape.style.transform = `translateY(${scrollPosition * speed}px)`;
  });

  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollPosition * CONFIG.PARALLAX_HERO}px)`;
  }
}

// ============================================================
// 渲染文章列表
// ============================================================
function renderPosts() {
  const list = DOM.postList;
  if (!list) {
    console.warn("renderPosts: #postList not found");
    return;
  }
  if (!posts.length) return;

  list.innerHTML = posts
    .map(
      (post) => `
      <article class="post">
        <div class="post-meta">${post.tag} / ${post.date}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </article>
    `
    )
    .join("");

  const postItems = list.querySelectorAll(".post");
  postItems.forEach((post, index) => {
    post.style.opacity = "0";
    post.style.transform = "translateY(20px)";
    post.style.transition = `all 0.5s ease ${index * 0.1 + 0.2}s`;
    requestAnimationFrame(() => {
      post.style.opacity = "1";
      post.style.transform = "translateY(0)";
    });
  });
}

// ============================================================
// 移动端菜单
// ============================================================
function setupMenu() {
  const btn = DOM.menuBtn;
  const navEl = DOM.nav;
  if (!btn || !navEl) {
    if (!btn) console.warn("setupMenu: #menuBtn not found");
    if (!navEl) console.warn("setupMenu: #nav not found");
    return;
  }

  function closeMenuOutside(e) {
    if (!navEl.contains(e.target) && !btn.contains(e.target)) {
      navEl.classList.remove("open");
      btn.innerHTML = "☰";
      document.removeEventListener("click", closeMenuOutside);
    }
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // 防冒泡，避免触发 document 的 closeMenuOutside
    navEl.classList.toggle("open");
    btn.innerHTML = navEl.classList.contains("open") ? "✕" : "☰";
    if (navEl.classList.contains("open")) {
      document.addEventListener("click", closeMenuOutside);
    } else {
      document.removeEventListener("click", closeMenuOutside);
    }
  });
}

// ============================================================
// 头部滚动阴影
// ============================================================
function setupScrollEffect() {
  const hdr = DOM.header;
  if (!hdr) {
    console.warn("setupScrollEffect: .site-header not found");
    return;
  }

  const handler = () => {
    hdr.classList.toggle("scrolled", window.scrollY > CONFIG.HEADER_SCROLL_THRESHOLD);
  };

  window.addEventListener("scroll", handler, { passive: true });
  handler();
}

// ============================================================
// 底部年份
// ============================================================
function setYear() {
  const el = DOM.yearEl;
  if (el) {
    el.textContent = new Date().getFullYear();
  } else {
    console.warn("setYear: #year not found");
  }
}

// ============================================================
// 锚点平滑滚动
// ============================================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - CONFIG.SMOOTH_SCROLL_OFFSET,
          behavior: "smooth",
        });
        const navEl = DOM.nav;
        const btn = DOM.menuBtn;
        if (navEl) navEl.classList.remove("open");
        if (btn) btn.innerHTML = "☰";
      }
    });
  });
}

// ============================================================
// 交互初始化
// ============================================================
function initInteractiveEffects() {
  console.log("Initializing interactive effects...");

  document.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("scroll", updateParallax, { passive: true });

  // 初始调用一次，设置正确位置
  updateParallax();

  console.log("Interactive effects initialized!");
}

// ============================================================
// 页面切后台暂停动画，优化性能
// ============================================================
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopCursorGlow();
  } else if (mouseInViewport) {
    startCursorGlow();
  }
});

// ============================================================
// 主入口
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing app...");

  // 锚点页面：立即滚动到顶部
  if (window.location.hash) {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  const loader = DOM.loader;
  const body = document.body;
  const html = document.documentElement;

  // ========== SVG 手写绘制动画 ==========
  function animateSvg() {
    const paths = document.querySelectorAll("#loaderSvg path");
    console.log("Found", paths.length, "SVG paths");

    if (paths.length === 0) {
      console.log("No SVG paths found!");
      return;
    }

    try {
      const pathData = Array.from(paths).map((path, index) => {
        const length = path.getTotalLength();
        console.log("Path", index, "length:", length);
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = "none";
        return { path, length, delay: index * 0.2 };
      });

      const startTime = performance.now();
      console.log("Starting SVG animation at", startTime);

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / CONFIG.SVG_DRAW_DURATION, 1);

        pathData.forEach(({ path, length, delay }) => {
          if (progress >= delay) {
            const adjustedProgress = Math.min((progress - delay) / (1 - delay), 1);
            const eased = 1 - Math.pow(1 - adjustedProgress, 3);
            path.style.strokeDashoffset = length * (1 - eased);
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log("SVG animation complete");
          pathData.forEach(({ path }) => {
            path.style.strokeDashoffset = 0;
          });
        }
      }

      requestAnimationFrame(animate);
    } catch (e) {
      console.log("SVG animation error, showing logo directly:", e);
      paths.forEach((path) => {
        path.style.strokeDashoffset = 0;
      });
    }
  }

  // 立即启动 SVG 绘制
  animateSvg();

  // ========== 移除加载画面 ==========
  function removeLoader() {
    if (loader) {
      console.log("Removing loader...");

      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      loader.style.transition = `opacity ${CONFIG.LOADER_EXIT_DURATION}ms ease, transform ${CONFIG.LOADER_EXIT_DURATION}ms ease`;
      loader.style.opacity = "0";
      loader.style.transform = "translateY(-100%)";
      html.style.overflowY = "auto";
      body.style.overflowY = "auto";

      setTimeout(() => {
        loader.style.display = "none";
        console.log("Loader removed");
        initTextScramble();
      }, CONFIG.LOADER_EXIT_DURATION);
    } else {
      html.style.overflowY = "auto";
      body.style.overflowY = "auto";
      initTextScramble();
    }
  }

  setTimeout(removeLoader, CONFIG.LOADER_VISIBLE_DURATION);

  renderPosts();
  setupMenu();
  setupScrollEffect();
  setupSmoothScroll();
  setYear();
  initInteractiveEffects();
});

// ============================================================
// TextScramble 文字打乱类
// ============================================================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 10);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// ============================================================
// 文字打乱动画初始化
// ============================================================
function initTextScramble() {
  const phrases = ["MIKE LI", "RECORD LIFE", "THINK & CREATE", "MINIMAL"];

  const el = document.querySelector(".text");
  if (!el) {
    console.warn("initTextScramble: .text element not found");
    return;
  }

  console.log("Text scramble initialized on element:", el);

  const fx = new TextScramble(el);

  let counter = 0;
  const next = () => {
    console.log("Setting text to:", phrases[counter]);
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, CONFIG.TEXT_SCRAMBLE_INTERVAL);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();
}