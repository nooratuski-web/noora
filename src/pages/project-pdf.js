import { withBase } from "../paths.js";

const projects = {
  moro: {
    index: "01",
    title: "MORO",
    type: "PERSONAL PROJECT",
    summary: "原创角色 IP / AIGC 辅助探索",
    pages: 15,
    previous: "kaat",
    next: "night-reading",
  },
  "night-reading": {
    index: "02",
    title: "NIGHT READING",
    type: "PERSONAL PROJECT",
    summary: "阅读产品 / UI・UX / 传播视觉",
    pages: 10,
    previous: "moro",
    next: "miste",
  },
  miste: {
    index: "02",
    title: "MISTÉ",
    type: "PERSONAL PROJECT",
    summary: "概念香氛品牌 / 品牌识别 / 包装",
    pages: 8,
    previous: "night-reading",
    next: "kaat",
  },
  kaat: {
    index: "04",
    title: "KAAT",
    type: "TEAM PROJECT",
    summary: "剧场视觉 / 摄影实验 / 传单设计",
    pages: 5,
    previous: "miste",
    next: "moro",
  },
};

const pageImage = (slug, index) => withBase(`/projects/${slug}/page-${String(index).padStart(2, "0")}.webp`);
const route = (slug) => withBase(`/project/${slug}`);

export function projectPdf(slug) {
  const project = projects[slug];
  const fullSite = slug === "miste" ? `
    <a class="miste-full-site" href="${withBase("/3")}" data-link>
      <img src="${withBase("/images/miste/cover-wide.png")}" alt="MISTÉ 完整品牌网站预览">
      <span><b>进入 MISTÉ 完整品牌网站</b>继续查看香氛系列、瓶身结构、品牌视觉与传播应用。<em>ENTER FULL WEBSITE →</em></span>
    </a>` : "";
  return () => `
    <section data-page="project-pdf" class="page pdf-project">
      <header class="pdf-project-header">
        <span class="pdf-project-kicker">PROJECT ARCHIVE</span>
        <div class="pdf-project-title">
          <span>${project.index} / ${project.type}</span>
          <h1>${project.title}</h1>
          <p>${project.summary}</p>
        </div>
        <span class="pdf-project-count">${project.pages} PAGES</span>
      </header>
      ${fullSite}
      <main class="pdf-project-pages" aria-label="${project.title} 作品集">
        ${Array.from({ length: project.pages }, (_, index) => `
          <figure class="pdf-project-sheet">
            <img src="${pageImage(slug, index + 1)}" alt="${project.title} 作品集第 ${index + 1} 页" ${index > 1 ? 'loading="lazy"' : ""} decoding="async">
            <figcaption>${String(index + 1).padStart(2, "0")} / ${String(project.pages).padStart(2, "0")}</figcaption>
          </figure>`).join("")}
      </main>
      <nav class="pdf-project-nav" aria-label="其他项目">
        <a href="${route(project.previous)}" data-link><span>PREVIOUS</span>${projects[project.previous].title}</a>
        <a href="${route(project.next)}" data-link><span>NEXT</span>${projects[project.next].title}</a>
      </nav>
    </section>`;
}
