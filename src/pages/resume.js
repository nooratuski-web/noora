import { withBase } from "../paths.js";

const profileImage = withBase("/images/noora-portrait.jpg");
const asset = (name) => withBase(`/images/profile/${name}`);

const projects = [
  { name: "MORO", slug: "moro", type: "PERSONAL PROJECT", field: "原创角色 IP / AIGC 辅助探索", image: asset("project-moro.png") },
  { name: "NIGHT READING", slug: "night-reading", type: "PERSONAL PROJECT", field: "阅读产品 / UI・UX / 传播视觉", image: asset("project-night-reading.png") },
  { name: "MISTÉ", slug: "miste", type: "PERSONAL PROJECT", field: "概念香氛品牌 / 品牌识别 / 包装", image: asset("project-miste.png") },
  { name: "KAAT", slug: "kaat", type: "TEAM PROJECT", field: "剧场视觉 / 摄影实验 / 传单设计", detail: "参与水镜摄影测试、材质探索、视觉方向筛选与传单设计。", image: asset("project-kaat.png") },
];

function projectRows() {
  return projects.map((project, index) => `
    <a class="experience-row${index === 0 ? " is-active" : ""}" href="${withBase(`/project/${project.slug}`)}" data-link data-preview="${project.image}" data-preview-alt="${project.name} 项目代表图" aria-label="查看 ${project.name} 完整作品集">
      <span class="experience-number">0${index + 1}</span>
      <span class="experience-name">${project.name}</span>
      <span class="experience-meta"><b>${project.type}</b>${project.field}</span>
      ${project.detail ? `<span class="experience-detail">${project.detail}</span>` : ""}
    </a>`).join("");
}

export function resume() {
  return `
    <section data-page="resume" class="page page-resume resume-v2">
      <nav class="archive-tabs" aria-label="个人档案章节">
        <a href="#profile" data-section="profile" class="is-active">PROFILE</a>
        <a href="#off-duty" data-section="off-duty">OFF DUTY</a>
        <a href="#education" data-section="education">EDUCATION</a>
        <a href="#experience" data-section="experience">EXPERIENCE</a>
        <a href="#skills" data-section="skills">SKILLS</a>
      </nav>

      <article id="profile" class="archive-section archive-profile" data-archive-section="profile">
        <div class="profile-copy archive-reveal">
          <span class="archive-sticker sticker-heart" aria-hidden="true">♥</span>
          <h1>Hi, I’m<br><em>Noora.</em></h1>
          <p>我是一名平面设计专业学生，关注品牌视觉、角色 IP、编辑设计与数字体验。</p>
          <p>目前希望寻找创意视觉、品牌设计、IP 设计与 AIGC 相关的工作机会。</p>
          <dl class="profile-meta">
            <div><dt>BASED IN</dt><dd>Kyoto, Japan</dd></div>
            <div><dt>STATUS</dt><dd>Open to opportunities</dd></div>
          </dl>
        </div>
        <figure class="profile-portrait archive-reveal">
          <img src="${profileImage}" alt="Noora 在夜晚街道中的个人照片">
          <figcaption>A little curious,<br>always creating.</figcaption>
          <svg viewBox="0 0 120 92" aria-hidden="true"><path d="M8 12c35 2 66 20 84 49"/><path d="m78 58 17 5-4-18"/></svg>
        </figure>
      </article>

      <article id="off-duty" class="archive-section archive-off-duty" data-archive-section="off-duty">
        <div class="off-duty-collage archive-reveal">
          <img src="${asset("off-duty-collage.png")}" alt="Noora 的生活照片拼贴">
          <svg class="interest-loop" viewBox="0 0 800 160" aria-hidden="true">
            <path id="interest-path" d="M10 105 C210 15 570 15 790 105" fill="none"/>
            <text><textPath href="#interest-path" startOffset="-100%">GAME WORLDS · NOVELS · DOCUMENTARIES · HANDCRAFT · MIDNIGHT POETRY ·<animate attributeName="startOffset" from="-100%" to="0%" dur="24s" repeatCount="indefinite"/></textPath></text>
          </svg>
        </div>
        <div class="off-duty-copy archive-reveal">
          <span class="archive-sticker sticker-bard" aria-hidden="true">BARD MODE · ON</span>
          <h2 class="scramble-title" data-text="OFF DUTY">OFF DUTY</h2>
          <p>不做设计的时候，我通常在游戏世界里冒险，躲进小说和纪录片里观察别人的人生，或者低头做一些需要耐心的手工。</p>
          <p>夜深人静时，我偶尔会写诗，并郑重地自称“游吟诗人巴德”——虽然目前还没有酒馆愿意雇我。</p>
          <p>这些爱好让我不断收集故事、角色和情绪，也成为我做设计时取之不尽的小型素材库。</p>
          <p class="bard-note">Designer by day,<br>Bard after midnight.</p>
          <ul class="interest-index" aria-label="兴趣爱好"><li>GAME WORLDS</li><li>NOVELS</li><li>DOCUMENTARIES</li><li>HANDCRAFT</li><li>MIDNIGHT POETRY</li></ul>
        </div>
        <div class="cat-track" aria-hidden="true">
          <span class="cat-butterfly"><svg viewBox="0 0 48 40"><path d="M23 20C16 4 4 3 5 13c1 7 8 10 18 9M25 20C32 4 44 3 43 13c-1 7-8 10-18 9M23 20c-8 1-13 8-9 12 4 3 8-2 10-9M25 20c8 1 13 8 9 12-4 3-8-2-10-9M24 17v12"/></svg></span>
          <div class="cat-walker"><img src="${asset("cat-cutout.png")}" alt=""></div>
        </div>
      </article>

      <article id="midnight-note" class="archive-section archive-poem" data-archive-section="off-duty">
        <span class="poem-motif" aria-hidden="true">✦　☾　✦</span>
        <div class="poem-cn archive-reveal">
          <h2>你还记得海的味道吗。</h2>
          <div class="poem-lines"><p>风中弥漫着海的咸湿。</p><p>走进夜色与星沙，<br>捕捞遗落的蓝眼泪。</p><p>海浪一遍遍翻滚。</p><p>原来最先被打湿的，<br><em>是回忆。</em></p></div>
          <small>Written after midnight<br>by Bard Noora</small>
        </div>
        <div class="poem-jp archive-reveal" lang="ja"><p>あなたは、まだ海の匂いを覚えていますか。</p><p>風は、潮の匂いと湿った空気を運んでくる。</p><p>夜の海へと足を踏み入れ、星砂のあいだに零れ落ちた青い涙を掬い上げる。</p><p>波は、何度も何度も寄せては返す。</p><p>気づけば、最初に濡れていたのは、海ではなく、私の記憶だった。</p></div>
      </article>

      <article id="education" class="archive-section archive-education" data-archive-section="education">
        <div class="education-year archive-reveal" aria-label="2023年至2027年">2023<span>—</span>27</div>
        <div class="education-copy archive-reveal">
          <h2>EDUCATION</h2><h3>京都精華大学</h3><p>メディア表現学部<br>媒体表现与平面设计方向</p><p>2023.09 — 2027.03<br>2027年3月卒業予定</p>
          <div class="seminar-block"><h3>米山菜津子研究室</h3><p>紙メディアを中心に、文字・画像・実体媒体の表現を研究。</p></div>
          <ul class="study-index"><li>BRAND VISUAL</li><li>EDITORIAL DESIGN</li><li>VISUAL NARRATIVE</li><li>ORIGINAL IP</li><li>AIGC EXPLORATION</li></ul>
        </div>
        <div class="book-study archive-reveal">
          <button class="book-toggle" type="button" aria-pressed="false" aria-label="打开原创艺术书籍《人间草木》">
            <img class="book-closed" src="${asset("book-closed-cutout.png")}" alt="合上的原创艺术书籍《人间草木》"><img class="book-open" src="${asset("book-open-cutout.png")}" alt="打开的原创艺术书籍《人间草木》"><span>OPEN THE ARCHIVE</span>
          </button>
          <div class="book-caption"><h3>《人间草木》</h3><p>REN JIAN CAO MU · ORIGINAL ARTIST BOOK</p><p>从概念、文字、纸张处理到装订制作，全部由本人独立完成。</p></div>
        </div>
      </article>

      <article id="experience" class="archive-section archive-experience" data-archive-section="experience">
        <div class="experience-heading archive-reveal"><h2>SELECTED<br>PROJECT<br><em>EXPERIENCE</em></h2><p>从概念构思到视觉落地，持续练习建立完整的设计叙事。</p></div>
        <div class="experience-list archive-reveal">${projectRows()}</div>
        <figure class="experience-preview archive-reveal"><img src="${projects[0].image}" alt="MORO 项目代表图"></figure>
      </article>

      <article id="skills" class="archive-section archive-skills" data-archive-section="skills">
        <div class="skills-columns">
          <section class="archive-reveal"><h2>WHAT I DO</h2><ul><li>品牌视觉与 Campaign 设计</li><li>原创 IP 与系列化延展</li><li>编辑设计与信息排版</li><li>数字产品与传播视觉</li><li>AIGC 探索与人工精修</li></ul></section>
          <section class="archive-reveal"><h2>TOOLS</h2><ul class="tools-list"><li>Adobe Illustrator</li><li>Adobe Photoshop</li><li>Adobe InDesign</li><li>Figma</li><li>AIGC Tools</li></ul></section>
        </div>
        <section class="work-style archive-reveal"><h2>HOW I WORK</h2><ol><li>从内容与目标出发提炼创意</li><li>整合文字、图像与视觉叙事</li><li>重视版式细节与跨媒介一致性</li><li>主动沟通并保持清晰的协作反馈</li><li>使用 AIGC 提高探索与制作效率</li></ol></section>
        <footer class="archive-contact archive-reveal">
          <div><h2>OPEN TO<br><em>OPPORTUNITIES</em></h2><p>创意视觉 / 品牌设计 / IP设计 / AIGC</p></div>
          <address><span>Kyoto, Japan</span><a href="mailto:nooratuski@gmail.com">nooratuski@gmail.com</a><span>可配合回国工作安排</span></address>
          <p class="thanks-note">Thanks for scrolling.<br>Let’s make something worth remembering.</p>
        </footer>
      </article>
    </section>`;
}

function scramble(element) {
  const target = element.dataset.text || element.textContent;
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/·";
  const start = performance.now();
  const duration = 500;
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const fixed = Math.floor(progress * target.length);
    element.textContent = target.split("").map((char, index) => char === " " || index < fixed ? char : glyphs[Math.floor(Math.random() * glyphs.length)]).join("");
    if (progress < 1) requestAnimationFrame(frame); else element.textContent = target;
  }
  requestAnimationFrame(frame);
}

export function mountResume(root) {
  const cleanups = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.16 });
  root.querySelectorAll(".archive-reveal").forEach((element) => revealObserver.observe(element));
  cleanups.push(() => revealObserver.disconnect());

  const tabs = Array.from(root.querySelectorAll(".archive-tabs a"));
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const key = visible.target.dataset.archiveSection;
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.section === key));
    if (key === "off-duty") root.querySelector(".archive-off-duty")?.classList.add("is-in-view");
  }, { threshold: [0.25, 0.55] });
  root.querySelectorAll("[data-archive-section]").forEach((section) => sectionObserver.observe(section));
  cleanups.push(() => sectionObserver.disconnect());

  const scrambleTitle = root.querySelector(".scramble-title");
  if (scrambleTitle && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { scramble(scrambleTitle); observer.disconnect(); } }, { threshold: 0.7 });
    observer.observe(scrambleTitle);
    cleanups.push(() => observer.disconnect());
  }

  const offDuty = root.querySelector(".archive-off-duty");
  const catTrack = root.querySelector(".cat-track");
  const catWalker = root.querySelector(".cat-walker");
  const butterfly = root.querySelector(".cat-butterfly");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (offDuty && catTrack && catWalker && butterfly && finePointer && !reduceMotion) {
    let targetCat = window.innerWidth * .72;
    let currentCat = targetCat;
    let targetButterfly = targetCat + 110;
    let currentButterfly = targetButterfly;
    let butterflyY = 0;
    let currentY = 0;
    let direction = -1;
    let frameId = 0;

    const move = (event) => {
      const rect = catTrack.getBoundingClientRect();
      const pointerX = Math.max(18, Math.min(rect.width - 36, event.clientX - rect.left));
      const nextDirection = pointerX >= targetButterfly ? 1 : -1;
      if (Math.abs(pointerX - targetButterfly) > 3) direction = nextDirection;
      targetButterfly = pointerX;
      targetCat = Math.max(-24, Math.min(rect.width - catWalker.offsetWidth + 24, pointerX + (direction < 0 ? 42 : -112)));
      butterflyY = Math.max(-18, Math.min(24, ((event.clientY / window.innerHeight) - .5) * 42));
      catWalker.style.setProperty("--cat-facing", direction > 0 ? -1 : 1);
      catTrack.classList.add("is-pointer-following");
    };

    const render = () => {
      currentCat += (targetCat - currentCat) * .075;
      currentButterfly += (targetButterfly - currentButterfly) * .16;
      currentY += (butterflyY - currentY) * .12;
      catWalker.style.transform = `translate3d(${currentCat}px,0,0)`;
      butterfly.style.transform = `translate3d(${currentButterfly}px,${currentY}px,0)`;
      frameId = requestAnimationFrame(render);
    };

    offDuty.addEventListener("pointermove", move);
    frameId = requestAnimationFrame(render);
    cleanups.push(() => { offDuty.removeEventListener("pointermove", move); cancelAnimationFrame(frameId); });
  }

  const book = root.querySelector(".book-toggle");
  if (book) {
    const toggleBook = () => {
      const open = book.getAttribute("aria-pressed") !== "true";
      book.setAttribute("aria-pressed", String(open));
      book.closest(".book-study")?.classList.toggle("is-open", open);
      book.setAttribute("aria-label", open ? "合上原创艺术书籍《人间草木》" : "打开原创艺术书籍《人间草木》");
    };
    book.addEventListener("click", toggleBook);
    cleanups.push(() => book.removeEventListener("click", toggleBook));
  }

  const preview = root.querySelector(".experience-preview img");
  const rows = Array.from(root.querySelectorAll(".experience-row"));
  if (preview && rows.length) {
    const activate = (row) => {
      rows.forEach((item) => item.classList.toggle("is-active", item === row));
      preview.classList.remove("is-swapping"); void preview.offsetWidth;
      preview.src = row.dataset.preview; preview.alt = row.dataset.previewAlt; preview.classList.add("is-swapping");
    };
    rows.forEach((row) => {
      const onEnter = () => activate(row);
      row.addEventListener("pointerenter", onEnter); row.addEventListener("focus", onEnter);
      cleanups.push(() => { row.removeEventListener("pointerenter", onEnter); row.removeEventListener("focus", onEnter); });
    });
  }
  root._resumeCleanup = () => cleanups.forEach((cleanup) => cleanup());
}

export function unmountResume(root) { root?._resumeCleanup?.(); }
