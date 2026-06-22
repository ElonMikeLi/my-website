const posts = [
  {
    title: "重新找回慢节奏：我的晨间一小时",
    date: "2026-06-18",
    tag: "生活",
    excerpt:
      "过去一个月，我尝试把起床后的第一小时留给自己，不看消息、不刷短视频，只做散步、拉伸和记录。",
  },
  {
    title: "如何用一页纸做每周复盘",
    date: "2026-06-12",
    tag: "方法",
    excerpt:
      "我把每周复盘压缩成一页：本周进展、关键问题、下周重点。长期坚持后，决策明显更清晰。",
  },
  {
    title: "一次城市夜跑给我的启发",
    date: "2026-06-05",
    tag: "随笔",
    excerpt:
      "跑步时我意识到，很多焦虑来自\"想太多做太少\"。先跑出第一公里，答案往往会在路上出现。",
  },
  {
    title: "我的个人网站第一版上线清单",
    date: "2026-05-28",
    tag: "建站",
    excerpt:
      "记录从 0 到 1 搭建个人主页时最重要的 5 件事：定位、结构、文案、风格与持续更新机制。",
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

function updateCursorGlow() {
  if (!cursorGlow) return;
  
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  cursorX += dx * 0.15;
  cursorY += dy * 0.15;
  
  cursorGlow.style.left = `${cursorX}px`;
  cursorGlow.style.top = `${cursorY + scrollY}px`;
  
  requestAnimationFrame(updateCursorGlow);
}

function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function handleMouseLeave() {
  if (cursorGlow) cursorGlow.classList.add("hidden");
}

function handleMouseEnter() {
  if (cursorGlow) cursorGlow.classList.remove("hidden");
}

function handleScroll() {
  scrollY = window.scrollY;
}

function updateParallax() {
  const shapes = document.querySelectorAll("[data-parallax]");
  const scrollPosition = window.scrollY;
  
  shapes.forEach((shape) => {
    const speed = parseFloat(shape.dataset.parallax) || 0.05;
    const yPos = scrollPosition * speed;
    shape.style.transform = `translateY(${yPos}px)`;
  });
  
  // Update hero content parallax
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroOffset = scrollPosition * 0.3;
    heroContent.style.transform = `translateY(${heroOffset}px)`;
  }
  
  // Update showcase number parallax
  const showcaseNumber = document.querySelector('.showcase-number');
  if (showcaseNumber) {
    const showcaseOffset = scrollPosition * 0.15;
    showcaseNumber.style.transform = `translateX(-50%) translateY(${showcaseOffset}px)`;
  }
  
  requestAnimationFrame(updateParallax);
}

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

function setupMenu() {
  if (!menuBtn || !nav) return;
  
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.innerHTML = nav.classList.contains("open") ? "✕" : "☰";
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove("open");
      menuBtn.innerHTML = "☰";
    }
  });
}

function setupScrollEffect() {
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function setYear() {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        nav.classList.remove("open");
        menuBtn.innerHTML = "☰";
      }
    });
  });
}

function initInteractiveEffects() {
  console.log("Initializing interactive effects...");
  
  updateCursorGlow();
  console.log("Cursor glow started");
  
  updateParallax();
  console.log("Parallax started");
  
  document.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("mouseenter", handleMouseEnter);
  window.addEventListener("scroll", handleScroll, { passive: true });
  
  // Add hover effects to showcase cards
  const showcaseCards = document.querySelectorAll(".showcase-card");
  showcaseCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
  
  // Animated stats counter
  const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((stat) => {
      const target = parseInt(stat.textContent);
      if (isNaN(target)) return;
      
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = stat.textContent.includes('∞') ? '∞' : target + '+';
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + '+';
        }
      }, 20);
    });
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  const statsContainer = document.querySelector('.stats');
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }
  
  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu
        nav.classList.remove('open');
        menuBtn.innerHTML = 'MENU';
      }
    });
  });
  
  console.log("Interactive effects initialized!");
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing app...");
  renderPosts();
  setupMenu();
  setupScrollEffect();
  setupSmoothScroll();
  setYear();
  initInteractiveEffects();
  initTextScramble();
});

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

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

// ——————————————————————————————————————————————————
// Initialize Text Scramble Effect
// ——————————————————————————————————————————————————

function initTextScramble() {
  const phrases = [
    'MIKE LI',
    'RECORD LIFE',
    'THINK & CREATE',
    'MINIMAL'
  ]
  
  const el = document.querySelector('.text')
  if (!el) return
  
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2500)
    })
    counter = (counter + 1) % phrases.length
  }
  
  // Start after initial animations
  setTimeout(next, 1000)
}
