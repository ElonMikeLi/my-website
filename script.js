const posts = [
  {
    title: "不问归期，不提旧人",
    date: "2026-06-22",
    tag: "随笔",
    excerpt: "跨山越海皆陌路，余生岁岁又年年。世间风月千万种，再无一处可相逢，过往温柔与欢喜，尽数封存在昨日，往后前路各自独行，不问归期，也莫提旧人。",
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
  
  const loader = document.getElementById('loader');
  const body = document.body;
  const html = document.documentElement;
  
  function removeLoader() {
    if (loader) {
      console.log("Removing loader...");
      loader.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      loader.style.opacity = '0';
      loader.style.transform = 'translateY(-100%)';
      html.style.overflowY = 'auto';
      body.style.overflowY = 'auto';
      
      setTimeout(() => {
        loader.style.display = 'none';
        console.log("Loader removed");
        // Start text scramble after loader is gone
        initTextScramble();
      }, 600);
    } else {
      html.style.overflowY = 'auto';
      body.style.overflowY = 'auto';
      initTextScramble();
    }
  }
  
  setTimeout(removeLoader, 2200);
  
  renderPosts();
  setupMobileMenu();
  setupScrollEffect();
  setupSmoothScroll();
  setYear();
  initInteractiveEffects();
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
