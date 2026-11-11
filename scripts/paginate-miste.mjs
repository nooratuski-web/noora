import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const url = process.env.MISTE_URL || "http://127.0.0.1:5173/3";
const input = process.env.MISTE_INPUT;
const outputDir = process.env.MISTE_PAGES_DIR;
const dpr = Number(process.env.MISTE_DPR || 3);
if (!input || !outputDir) throw new Error("MISTE_INPUT and MISTE_PAGES_DIR are required");

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1600 }, deviceScaleFactor: dpr });

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.addStyleTag({ content: `*,*::before,*::after{animation:none!important;transition:none!important}#preloader,#cursor{display:none!important}` });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 1000) {
      scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
    scrollTo(0, 0);
  });

  const geometry = await page.evaluate(() => {
    const box = (selector, index = 0) => {
      const element = document.querySelectorAll(selector)[index];
      if (!element) throw new Error(`Missing selector: ${selector}[${index}]`);
      const rect = element.getBoundingClientRect();
      return { top: rect.top + scrollY, bottom: rect.bottom + scrollY };
    };
    const middle = (a, b) => Math.round((a + b) / 2);
    const products = [...document.querySelectorAll(".miste-product")].map((element) => {
      const rect = element.getBoundingClientRect();
      return { top: rect.top + scrollY, bottom: rect.bottom + scrollY };
    });
    const docHeight = document.documentElement.scrollHeight;
    const boundaries = [
      0,
      middle(box(".miste-cover-wide").bottom, box(".miste-overview").top),
      middle(box(".miste-foundation").bottom, box(".miste-core-concept").top),
      middle(box(".miste-visual-guideline").bottom, box(".miste-collection").top),
      Math.ceil(products[1].bottom),
      middle(box(".miste-product-details").bottom, box(".miste-form-study").top),
      middle(box(".miste-interaction-study").bottom, box(".miste-collateral-hero").top),
      middle(box(".miste-namecards").bottom, box(".miste-campaign").top),
      middle(box(".miste-social").bottom, box(".miste-end").top),
      docHeight,
    ];
    return { boundaries, products, docHeight };
  });

  const metadata = await sharp(input, { limitInputPixels: false }).metadata();
  const expectedHeight = geometry.docHeight * dpr;
  if (metadata.width !== 1440 * dpr || metadata.height !== expectedHeight) {
    throw new Error(`Input dimensions ${metadata.width}x${metadata.height} do not match expected ${1440 * dpr}x${expectedHeight}`);
  }

  const names = [
    "01-项目封面",
    "02-概念与品牌定位",
    "03-核心概念与视觉规范",
    "04-记忆系列-KILIG-SEROTINAL",
    "05-记忆系列-REVERIE-OBLIVION-产品细节",
    "06-瓶体与互动结构",
    "07-品牌物料",
    "08-宣传与社交应用",
    "09-项目结尾",
  ];
  const pages = [];
  for (let index = 0; index < names.length; index += 1) {
    const top = geometry.boundaries[index] * dpr;
    const bottom = geometry.boundaries[index + 1] * dpr;
    const output = path.join(outputDir, `${names[index]}.png`);
    await sharp(input, { limitInputPixels: false })
      .extract({ left: 0, top, width: metadata.width, height: bottom - top })
      .png({ compressionLevel: 6, adaptiveFiltering: true })
      .toFile(output);
    pages.push({ name: names[index], top, bottom, height: bottom - top, output });
  }

  // Verify every collection item is fully contained within exactly one page.
  const collectionPages = [3, 4];
  for (const [index, product] of geometry.products.entries()) {
    const top = Math.floor(product.top * dpr);
    const bottom = Math.ceil(product.bottom * dpr);
    const containing = collectionPages.filter((pageIndex) => {
      const pageTop = geometry.boundaries[pageIndex] * dpr;
      const pageBottom = geometry.boundaries[pageIndex + 1] * dpr;
      return top >= pageTop - 3 && bottom <= pageBottom + 3;
    });
    if (containing.length !== 1) throw new Error(`Collection product ${index + 1} crosses a page boundary: ${JSON.stringify({ top, bottom, boundaries: geometry.boundaries.map((value) => value * dpr) })}`);
  }

  await fs.writeFile(path.join(outputDir, "分页检查报告.json"), JSON.stringify({ pages, collectionProducts: geometry.products }, null, 2));
  console.log(JSON.stringify({ pageCount: pages.length, pages }, null, 2));
} finally {
  await browser.close();
}
