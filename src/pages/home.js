import { projects } from "../projects.js";
import { withBase } from "../paths.js";

export function aboutHome() {
  return `
    <section data-page="about" class="page page-about">
      <div class="about-copy">
        <p class="about-role">VISUAL DESIGNER · TOKYO</p>
        <h1>Hi, I’m<br><em>Noora.</em></h1>
        <p class="about-summary">视觉设计师，关注品牌叙事、角色 IP 与数字体验。<br>在概念、排版与图像之间，寻找有情绪也有逻辑的表达。</p>
        <div class="about-actions">
          <a href="${withBase("/work")}" data-link>查看作品</a>
          <a href="${withBase("/resume")}" data-link>个人简历</a>
        </div>
      </div>
      <figure class="about-portrait">
        <img src="${withBase("/images/noora-portrait.jpg")}" alt="Noora 的个人照片">
        <figcaption>A little curious,<br>always creating.</figcaption>
        <svg class="about-arrow" viewBox="0 0 120 88" aria-hidden="true">
          <path d="M8 14c34 2 63 16 81 43"/>
          <path d="m76 54 16 5-4-17"/>
        </svg>
      </figure>
      <a class="about-folder-tab" href="${withBase("/work")}" data-link>SELECTED WORK</a>
    </section>
  `;
}

export function home() {
  const slots = [
    { project: projects[0], route: "/1", className: "slot-0" },
    { project: projects[1], route: "/3", className: "slot-2" },
  ].map(({ project, route, className }) =>
    `<a href="${withBase(route)}" data-link class="slot ${className}"><figure></figure><div class="slot-caption">${project.title} <span class="project-category">${project.category}</span></div></a>`
  ).join("");

  return `
    <section data-page="main" class="page page-main">
      <h1 class="page-title">精选作品 / 2026</h1>
      <div class="carousel">${slots}</div>
    </section>
  `;
}

export function getMainTargets(rootEl) {
  const slots = rootEl.querySelectorAll(".slot");
  const rects = [];
  for (let i = 0; i < slots.length; i++) {
    const r = slots[i].getBoundingClientRect();
    rects.push({ x: r.left, y: r.top, w: r.width, h: r.height });
  }
  return rects;
}
