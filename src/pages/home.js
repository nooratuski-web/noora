import { projects } from "../projects.js";
import { withBase } from "../paths.js";

export function home() {
  const slots = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<a href="${withBase(`/${i + 1}`)}" data-link class="slot slot-${i}"><figure></figure><div class="slot-caption">${projects[i].title} <span class="project-category">${projects[i].category}</span></div></a>`,
    )
    .join("");

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
