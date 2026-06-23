const posts = [
  {
    title: "不问归期，不提旧人",
    date: "2026-06-22",
    tag: "随笔",
    excerpt: "跨山越海皆陌路，余生岁岁又年年。世间风月千万种，再无一处可相逢。过往温柔与欢喜，尽数封存在昨日。往后前路各自独行，不问归期，也莫提旧人。",
  },
];

const postList = document.getElementById("postList");
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const header = document.querySelector(".site-header");
const cursorGlow = document.getElementById("cursorGlow");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let scrollY = 0;
let cursorRAF = null;
let parallaxRAF = null;

// 光标光晕动画
function updateCursorGlow() {
  if (!cursorGlow) return;
  
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  cursorX += dx * 0.15;
  cursorY += dy * 0.15;
  
  cursorGlow.style.left = `${cursorX}px`;
  cursorGlow.style.top = `${cursorY + scrollY}px`;
  
  cursorRAF = requestAnimationFrame(updateCursorGlow);
}

function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorGlow) cursorGlow.classList.remove("hidden");
}

function handleMouseOutWindow() {
  if (cursorGlow) cursorGlow.classList.add("hidden");
}

// 全局滚动统一更新scrollY
function handleScroll() {
  scrollY = window.scrollY;
}

// 视差滚动动画
function updateParallax() {
  const shapes = document.querySelectorAll("[data-parallax]");
  const scrollPosition = window.scrollY;
  
  shapes.forEach((shape) => {
    const speed = parseFloat(shape.dataset.parallax) || 0.05;
    const yPos = scrollPosition * speed;
    shape.style.transform = `translateY(${yPos}px)`;
  });
  
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroOffset = scrollPosition * 0.3;
    heroContent.style.transform = `translateY(${heroOffset}px)`;
  }
  
  parallaxRAF = requestAnimationFrame(updateParallax);
}

// 渲染文章列表
function renderPosts() {
  if (!postList) return;

  postList.innerHTML = posts
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

  const postItems = document.querySelectorAll(".post");
  postItems.forEach((post, index) => {
    post.style.opacity = "0";
    post.style.transform = "translateY(20px)";
    post.style.transition = `all 0.5s ease ${index * 0.1 + 0.2}s`;
    setTimeout(() => {
      post.style.opacity = "1";
      post.style.transform = "translateY(0)";
    }, 100);
  });
}

// 移动端菜单（修复原setupMobileMenu未定义报错）
function setupMenu() {
  if (!menuBtn || !nav) return;

  function closeMenuOutside(e) {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove("open");
      menuBtn.innerHTML = "☰";
      document.removeEventListener("click", closeMenuOutside);
    }
  }
  
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.innerHTML = nav.classList.contains("open") ? "✕" : "☰";
    if (nav.classList.contains("open")) {
      document.addEventListener("click", closeMenuOutside);
    } else {
      document.removeEventListener("click", closeMenuOutside);
    }
  });
}

// 头部滚动阴影
function setupScrollEffect() {
  if (!header) return;
  
  const headerScrollHandle = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", headerScrollHandle, { passive: true });
  headerScrollHandle();
}

// 底部年份
function setYear() {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// 锚点平滑滚动（只保留一套，删除重复代码）
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        nav.classList.remove("open");
        menuBtn.innerHTML = "☰";
      }
    });
  });
}

// 交互初始化
function initInteractiveEffects() {
  console.log("Initializing interactive effects...");
  
  updateCursorGlow();
  console.log("Cursor glow started");
  
  updateParallax();
  console.log("Parallax started");
  
  document.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("mouseout", handleMouseOutWindow);
  window.addEventListener("scroll", handleScroll, { passive: true });
  
  console.log("Interactive effects initialized!");
}

// 页面切后台暂停动画，优化性能
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(cursorRAF);
    cancelAnimationFrame(parallaxRAF);
  } else {
    updateCursorGlow();
    updateParallax();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing app...");
  
  if (window.location.hash) {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  
  const loader = document.getElementById('loader');
  const body = document.body;
  const html = document.documentElement;
  
  // 【修复LOGO闪烁核心函数】
  function animateSvg() {
    const paths = document.querySelectorAll('#loaderSvg path');
    console.log("Found", paths.length, "SVG paths");
    
    if (paths.length === 0) {
      console.log("No SVG paths found!");
      return;
    }
    
    const duration = 1500;
    // 页面加载瞬间先完整显示LOGO打底，杜绝空白闪烁
    paths.forEach(path => {
      path.style.strokeDasharray = path.getTotalLength();
      path.style.strokeDashoffset = 0;
    });

    try {
      const pathData = Array.from(paths).map((path, index) => {
        const length = path.getTotalLength();
        console.log("Path", index, "length:", length);
        path.style.strokeDashoffset = length;
        path.style.transition = 'none';
        return { path, length, delay: index * 0.2 };
      });
      
      const startTime = performance.now();
      console.log("Starting SVG animation at", startTime);
      
      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
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
      paths.forEach(path => {
        path.style.strokeDashoffset = 0;
      });
    }
  }
  
  // 移除100ms延迟，DOM加载完立刻启动LOGO绘制
  animateSvg();
  
  function removeLoader() {
    if (loader) {
      console.log("Removing loader...");
      
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      loader.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      loader.style.opacity = '0';
      loader.style.transform = 'translateY(-100%)';
      html.style.overflowY = 'auto';
      body.style.overflowY = 'auto';
      
      setTimeout(() => {
        loader.style.display = 'none';
        console.log("Loader removed");
        initTextScramble();
      }, 600);
    } else {
      html.style.overflowY = 'auto';
      body.style.overflowY = 'auto';
      initTextScramble();
    }
  }
  
  // 同步动画时长，消除LOGO画完后的空白等待间隙
  setTimeout(removeLoader, 1900);
  
  renderPosts();
  setupMenu(); // 修复原报错 setupMobileMenu()
  setupScrollEffect();
  setupSmoothScroll();
  setYear();
  initInteractiveEffects();
});

// 文字乱码动画类（完全保留原样）
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 10)
      const end = start + Math.floor(Math.random() * 20)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// 文字动画初始化
function initTextScramble() {
  const phrases = [
    'MIKE LI',
    'RECORD LIFE',
    'THINK & CREATE',
    'MINIMAL'
  ]
  
  const el = document.querySelector('.text')
  if (!el) {
    console.log("Text scramble element not found");
    return;
  }
  
  console.log("Text scramble initialized on element:", el);
  
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    console.log("Setting text to:", phrases[counter]);
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2500)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()
}
