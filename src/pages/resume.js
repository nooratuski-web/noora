import { withBase } from "../paths.js";

const pending = "待导入简历内容";

export function resume() {
  return `
    <section data-page="resume" class="page page-resume">
      <header class="resume-header">
        <p>PERSONAL ARCHIVE / 2026</p>
        <h1>NOORA<br><em>RESUME</em></h1>
        <p class="resume-lead">视觉设计师，关注品牌叙事、角色 IP 与数字体验。</p>
      </header>

      <div class="resume-sheet">
        <aside class="resume-profile">
          <img src="${withBase("/images/noora-portrait.jpg")}" alt="Noora 的个人照片">
          <p class="resume-note">A little curious,<br>always creating.</p>
          <dl>
            <div><dt>LOCATION</dt><dd>Tokyo, Japan</dd></div>
            <div><dt>CONTACT</dt><dd>${pending}</dd></div>
            <div><dt>LANGUAGES</dt><dd>${pending}</dd></div>
          </dl>
        </aside>

        <div class="resume-content">
          <section>
            <h2>关于我</h2>
            <p>完整个人简介将在导入正式简历后更新。目前保留版式与阅读层级，不展示未经确认的个人信息。</p>
          </section>
          <section>
            <h2>教育经历</h2>
            <p class="resume-pending">${pending}</p>
          </section>
          <section>
            <h2>项目与经历</h2>
            <p class="resume-pending">${pending}</p>
          </section>
          <section class="resume-columns">
            <div><h2>设计能力</h2><p class="resume-pending">${pending}</p></div>
            <div><h2>软件工具</h2><p class="resume-pending">${pending}</p></div>
          </section>
        </div>
      </div>
      <a class="resume-work-link" href="${withBase("/work")}" data-link>VIEW SELECTED WORK ↗</a>
    </section>
  `;
}
