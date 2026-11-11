import { withBase } from "../paths.js";

const ASSET = withBase("/images/miste");

const editorialFigure = ({ src, alt, label, width, height, className = "" }) => `
  <figure class="miste-editorial ${className}">
    <img src="${ASSET}/${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" />
    <figcaption>${label}</figcaption>
  </figure>`;

const collectionItems = [
  { key: "kilig", name: "KILIG", cn: "悸动", line: "想念，是靠近之前的悸动。", notes: "BERGAMOT · IRIS · WHITE MUSK", width: 350, height: 370 },
  { key: "serotinal", name: "SEROTINAL", cn: "夏末", line: "夏末，是告别与期待交叠的时刻。", notes: "FIG LEAF · AMBER · CEDAR", width: 330, height: 390 },
  { key: "reverie", name: "REVERIE", cn: "遐想", line: "未发生的片段，也能被气味收藏。", notes: "OSMANTHUS · TEA · CASHMERE WOOD", width: 350, height: 385 },
  { key: "oblivion", name: "OBLIVION", cn: "忘却", line: "有些轮廓远去，气味仍记得。", notes: "ALDEHYDE · INCENSE · VETIVER", width: 340, height: 370 },
];

const collection = () => `
  <section class="miste-collection">
    <p class="miste-section-index">02 / COLLECTION</p>
    <header class="miste-collection-title">
      <span class="miste-mini-wordmark">MISTÉ</span>
      <h3>The Memory<br>Collection</h3>
      <p>记忆系列</p>
    </header>
    <div class="miste-products">
      ${collectionItems.map((item) => `
        <article class="miste-product">
          <div class="miste-product-visual">
            <img src="${ASSET}/collection/${item.key}.png" alt="MISTÉ ${item.name} 香水" width="${item.width}" height="${item.height}" loading="lazy" />
          </div>
          <div class="miste-product-copy">
            <h4>${item.name}</h4>
            <p class="cn">${item.cn}</p>
            <p>${item.line}</p>
            <p class="notes">${item.notes}</p>
          </div>
        </article>`).join("")}
    </div>
  </section>`;

const coreConcept = () => `
  <section class="miste-core-concept" aria-labelledby="miste-core-title">
    <div class="miste-core-meta">
      <span>01 / CORE CONCEPT</span>
      <span>MISTÉ</span>
    </div>
    <div class="miste-core-heading">
      <p class="miste-core-wordmark">MISTÉ</p>
      <h3 id="miste-core-title">记忆沉淀，留下气味</h3>
      <p class="miste-core-en">Memory, held in scent.</p>
    </div>
    <div class="miste-core-copy">
      <p>气味总能唤起某段记忆。</p>
      <p>MISTÉ 将可替换的照片置于瓶身正面的独立夹层中，</p>
      <p>透过面板呈现若隐若现的轮廓。</p>
      <p>当影像逐渐模糊，香气仍保存着与它相连的情绪。</p>
    </div>
  </section>`;

const projectOverview = () => `
  <section class="miste-overview" aria-labelledby="miste-overview-title">
    <header class="miste-overview-heading">
      <p class="miste-section-index">PROJECT OVERVIEW / CONCEPT DEVELOPMENT</p>
      <h3 id="miste-overview-title">From a photograph<br>to a scent.</h3>
      <p class="miste-overview-cn">从一张照片，到一段气味记忆</p>
    </header>

    <div class="miste-overview-question">
      <p class="miste-overview-label">THE QUESTION</p>
      <p>当记忆无法被完整保存，<br>气味能否成为再次抵达它的方式？</p>
    </div>

    <dl class="miste-overview-meta">
      <div><dt>PROJECT</dt><dd>个人概念项目</dd></div>
      <div><dt>ROLE</dt><dd>概念策略、品牌识别、包装结构与视觉设计</dd></div>
      <div><dt>YEAR</dt><dd>2026</dd></div>
    </dl>

    <div class="miste-concept-path" aria-label="MISTÉ 概念形成过程">
      <article>
        <p class="miste-concept-no">01</p>
        <h4>Photograph</h4>
        <p class="cn">照片</p>
        <p>指向一段具体关系，保存记忆发生过的证据。</p>
      </article>
      <article>
        <p class="miste-concept-no">02</p>
        <h4>Frosted Glass</h4>
        <p class="cn">磨砂</p>
        <p>让图像介于清晰与模糊之间，如同回望时逐渐失焦的细节。</p>
      </article>
      <article>
        <p class="miste-concept-no">03</p>
        <h4>Scent</h4>
        <p class="cn">气味</p>
        <p>不复述画面，而是在偶然闻见时重新唤起与它相连的情绪。</p>
      </article>
    </div>

    <p class="miste-overview-result"><span>看见</span><i>→</i><span>模糊</span><i>→</i><span>闻见</span></p>
  </section>`;

const brandFoundation = () => `
  <section class="miste-foundation" aria-labelledby="miste-foundation-title">
    <header>
      <p class="miste-section-index">BRAND FOUNDATION</p>
      <h3 id="miste-foundation-title">A personal archive,<br>carried in scent.</h3>
      <p>MISTÉ 是一个以私人照片与气味共同保存记忆的概念香水品牌。它将香水、相册与纪念物结合，让每一瓶香气对应一段只属于使用者的关系。</p>
    </header>
    <dl>
      <div><dt>POSITIONING</dt><dd>介于香水、私人相册与纪念物之间的个性化气味载体。</dd></div>
      <div><dt>AUDIENCE</dt><dd>重视情绪表达、审美体验与个性化收藏的年轻消费者。</dd></div>
      <div><dt>DESIGN CHALLENGE</dt><dd>把无形且会淡去的记忆，转化为可替换、可触碰、可持续使用的产品系统。</dd></div>
      <div><dt>CORE DEVICE</dt><dd>独立照片夹层与磨砂面板，让私人影像保持可辨认但不被完整展示。</dd></div>
    </dl>
  </section>`;

const visualGuideline = () => `
  <section class="miste-visual-guideline" aria-label="MISTÉ 品牌视觉规范">
    <img src="${ASSET}/visual-guideline.png" alt="MISTÉ 品牌视觉规范" width="1600" height="1000" loading="lazy" />
    <div class="miste-guideline-label-mask" aria-hidden="true"></div>
    <p class="miste-guideline-label">BRAND GUIDELINE</p>
  </section>`;

const productDetails = () => `
  <section class="miste-image-copy-section miste-product-details" aria-labelledby="miste-details-title">
    <p class="miste-floating-index">03 / PRODUCT DETAILS</p>
    <div class="miste-artwork">
      <img src="${ASSET}/product-details.png" alt="MISTÉ 香水产品细节" width="1586" height="992" loading="lazy" />
      <div class="miste-image-copy-mask" aria-hidden="true"></div>
      <div class="miste-detail-callout">
        <span>FROSTED PANEL</span>
        <span>磨砂面板 / 半圆缺口</span>
      </div>
    </div>
    <div class="miste-image-copy">
      <h3 id="miste-details-title">记忆，记录着每一次相遇。</h3>
      <p>回望时，一切缓慢而清晰，又隔着一层磨砂，若隐若现。</p>
    </div>
  </section>`;

const interactionStudy = () => `
  <section class="miste-image-copy-section miste-interaction-study" aria-label="MISTÉ 可替换照片互动结构">
    <p class="miste-floating-index">05 / PHOTO INSERT SYSTEM</p>
    <div class="miste-artwork">
      <img src="${ASSET}/interaction.png" alt="MISTÉ 可替换照片互动结构" width="1600" height="1000" loading="lazy" />
      <div class="miste-image-copy-mask" aria-hidden="true"></div>
    </div>
    <div class="miste-image-copy">
      <p class="miste-interaction-kicker">PHOTO INSERT SYSTEM</p>
      <h3>How to hold<br>a memory</h3>
      <p class="miste-interaction-cn">将一段记忆，放进气味里</p>
      <div class="miste-interaction-body">
        <p>从顶部缺口轻启磨砂面板，放入相片，再将它合上。</p>
        <p>图像隔着面板留下若隐若现的轮廓，气味则成为唤起记忆的线索。</p>
      </div>
    </div>
  </section>`;

const formStudy = () => `
  <section class="miste-form-study">
    <header class="miste-form-copy">
      <p class="miste-section-index">04 / FORM STUDY</p>
      <h3>The bottle<br>as an<br>archive</h3>
      <p class="cn-title">瓶体结构</p>
      <p class="intro">扁平矩形瓶体以透明玻璃包裹独立照片夹层。正面磨砂面板使照片呈现柔化的轮廓，侧面展示夹层与储液腔之间的结构关系。</p>
      <p class="miste-layer-note">磨砂面板 → 独立照片夹层 → 香水储液腔</p>
    </header>
    <div class="miste-views" aria-label="香水瓶三视图">
      <article class="miste-view front">
        <img src="${ASSET}/form-study/front.png" alt="MISTÉ 香水瓶正面" width="565" height="930" loading="lazy" />
        <p class="index">01 / FRONT</p>
      </article>
      <article class="miste-view side">
        <img src="${ASSET}/form-study/side.png" alt="MISTÉ 香水瓶侧面" width="270" height="520" loading="lazy" />
        <p class="index">02 / SIDE</p>
        <div class="detail"><h4>Frosted panel</h4><p>通过顶部半圆缺口轻启磨砂面板，让照片停留在清晰与模糊之间。</p></div>
      </article>
      <article class="miste-view back">
        <img src="${ASSET}/form-study/back.png" alt="MISTÉ 香水瓶背面" width="320" height="650" loading="lazy" />
        <p class="index">03 / BACK</p>
        <div class="detail"><h4>Photo sleeve</h4><p>独立照片夹层与香水储液腔分开，用于放置并更换私人照片。</p></div>
      </article>
    </div>
  </section>`;

const collateral = () => `
  <section class="miste-collateral-hero">
    <img src="${ASSET}/collateral.png" alt="MISTÉ 品牌包装与物料" width="1122" height="1402" loading="lazy" />
    <header>
      <p class="miste-section-index">06 / BRAND COLLATERAL</p>
      <h3>Objects of<br>Memory</h3>
      <p>品牌物料</p>
    </header>
  </section>
  <section class="miste-namecards">
    <div class="miste-namecards-label"><span>THE MEMORY COLLECTION</span><span>FOUR SCENTS</span></div>
    <div class="miste-namecards-grid">
      <img src="${ASSET}/namecards/kilig.png" alt="KILIG 香水名片" width="1800" height="1100" loading="lazy" />
      <img src="${ASSET}/namecards/serotinal.png" alt="SEROTINAL 香水名片" width="1800" height="1100" loading="lazy" />
      <img src="${ASSET}/namecards/reverie.png" alt="REVERIE 香水名片" width="1800" height="1100" loading="lazy" />
      <img src="${ASSET}/namecards/oblivion.png" alt="OBLIVION 香水名片" width="1800" height="1100" loading="lazy" />
    </div>
  </section>`;

const socialApplication = () => `
  <section class="miste-social" aria-labelledby="miste-social-title">
    <header>
      <p class="miste-section-index">08 / SOCIAL APPLICATION</p>
      <h3 id="miste-social-title">Memory in<br>circulation</h3>
      <p>将产品主视觉、系列合照与品牌物料延展为统一的 Instagram 内容，让概念从包装系统进入真实传播场景。</p>
    </header>
    <img src="${ASSET}/social-application.png" alt="MISTÉ Instagram 社交媒体应用样机" width="1800" height="1200" loading="lazy" />
  </section>`;

export function miste() {
  return `
    <section data-page="miste" class="page page-miste">
      <h1 class="page-title">MISTÉ / 03</h1>
      <header class="miste-intro">
        <p class="miste-index">03 / BRAND &amp; PACKAGING</p>
        <div class="miste-heading">
          <p class="miste-kicker">MEMORY FRAGRANCE</p>
          <h2 class="miste-wordmark">MISTÉ</h2>
          <p class="miste-lead">A fragrance archive for personal memories.</p>
        </div>
        <p class="inner-fact">项目目标 / 以可替换照片建立气味与记忆的联系<br><br>个人项目 / 概念策略、品牌识别、包装结构与视觉设计<br>2026</p>
      </header>

      <main class="miste-study">
        <figure class="miste-cover-wide">
          <img src="${ASSET}/cover-wide.png" alt="MISTÉ Memory Fragrance 品牌封面" width="1672" height="941" />
          <figcaption>00 / COVER</figcaption>
        </figure>
        ${projectOverview()}
        ${brandFoundation()}
        ${coreConcept()}
        ${visualGuideline()}
        ${collection()}
        ${productDetails()}
        ${formStudy()}
        ${interactionStudy()}
        ${collateral()}
        <section class="miste-campaign">
          <p class="miste-campaign-label">07 / CAMPAIGN</p>
          <img src="${ASSET}/campaign.png" alt="MISTÉ 四款香水宣传海报" width="1086" height="1448" loading="lazy" />
          <p class="miste-campaign-copy">The past finds meaning in remembrance.</p>
        </section>
        ${socialApplication()}
        <footer class="miste-end">
          <div class="miste-end-intro">
            <p class="miste-end-wordmark">MISTÉ</p>
            <span>Memory, held in scent.</span>
          </div>
          <dl class="miste-credits">
            <div><dt>SCOPE</dt><dd>Brand Concept / Visual Identity / Packaging / Art Direction</dd></div>
            <div><dt>ROLE</dt><dd>Concept Strategy / Design / Image Direction</dd></div>
            <div><dt>PROJECT</dt><dd>Personal Concept Project · 2026</dd></div>
          </dl>
        </footer>
      </main>
    </section>
  `;
}
