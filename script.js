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
      "跑步时我意识到，很多焦虑来自“想太多做太少”。先跑出第一公里，答案往往会在路上出现。",
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

function renderPosts() {
  if (!postList) return;

  postList.innerHTML = posts
    .map(
      (post) => `
      <article class="post">
        <div class="post-meta">${post.date} · ${post.tag}</div>
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

renderPosts();
setupMenu();
setupScrollEffect();
setupSmoothScroll();
setYear();
