import { projects } from "../projects.js";
export const INNER_X_OFFSETS_VW = [0, -14, 10, -6, 16];

export function inner(image) {
  return function innerView() {
    const slots = [0, 1, 2, 3, 4]
      .map(
        (i) =>
          `<div class="slot" style="transform: translateX(${INNER_X_OFFSETS_VW[i] ?? 0}vw);"><figure></figure></div>`,
      )
      .join('');
    return `
      <section data-page="inner" data-image="${image}" class="page page-inner">
        <h1 class="page-title">${projects[image].title}</h1>
        <p class="inner-fact">${projects[image].category}<br><br>${projects[image].description}<br><br>职责：概念构思 / 视觉设计<br>年份：2026<br><br>此项目及配图为占位示例。</p>
        <div class="stack">${slots}</div>
      </section>
    `;
  };
}

export function getInnerTargets(rootEl) {
  const slots = rootEl.querySelectorAll('.stack .slot');
  const rects = [];
  for (let i = 0; i < slots.length; i++) {
    const r = slots[i].getBoundingClientRect();
    rects.push({ x: r.left, y: r.top, w: r.width, h: r.height });
  }
  return rects;
}
