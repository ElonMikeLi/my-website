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
}

function setupMenu() {
  if (!menuBtn || !nav) return;
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

function setYear() {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

renderPosts();
setupMenu();
setYear();
