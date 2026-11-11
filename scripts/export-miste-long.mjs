import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const url = process.env.MISTE_URL || "http://127.0.0.1:5173/3";
const output = path.resolve(
  process.env.MISTE_OUTPUT || path.join(root, "output", "MISTE-高清长图-1440@2x.png"),
);
const tempDir = path.join(root, "tmp", "miste-playwright-export");
const sourceDir = path.join(root, "public", "images", "miste");
const enhancedPublicDir = path.join(root, "public", "__miste_export_enhanced");
const viewportWidth = 1440;
const segmentHeight = Number(process.env.MISTE_SEGMENT_HEIGHT || 1200);
const dpr = Number(process.env.MISTE_DPR || 2);
const enhanceSources = process.env.MISTE_ENHANCE_SOURCES === "1";

await fs.rm(tempDir, { recursive: true, force: true });
await fs.mkdir(tempDir, { recursive: true });
await fs.mkdir(path.dirname(output), { recursive: true });

if (enhanceSources) {
  await fs.rm(enhancedPublicDir, { recursive: true, force: true });
  const files = await fs.readdir(sourceDir, { recursive: true });
  for (const relativePath of files) {
    if (!/\.(png|jpe?g|webp)$/i.test(relativePath)) continue;
    const inputPath = path.join(sourceDir, relativePath);
    const outputPath = path.join(enhancedPublicDir, relativePath.replace(/\.(jpe?g|webp)$/i, ".png"));
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    const metadata = await sharp(inputPath).metadata();
    const scale = Math.max(1, Math.min(4, Math.ceil(5760 / Math.max(1, metadata.width || 1))));
    await sharp(inputPath)
      .resize({ width: (metadata.width || 1) * scale, kernel: sharp.kernel.lanczos3 })
      .sharpen({ sigma: 0.65, m1: 0.7, m2: 1.6 })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPath);
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: viewportWidth, height: segmentHeight },
  deviceScaleFactor: dpr,
  colorScheme: "light",
  reducedMotion: "reduce",
});
const page = await context.newPage();
const failedRequests = [];
page.on("requestfailed", (request) => {
  failedRequests.push(`${request.resourceType()}: ${request.url()} (${request.failure()?.errorText})`);
});

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.emulateMedia({ media: "screen", colorScheme: "light", reducedMotion: "reduce" });

  // Export-only stabilization. This does not change the site's source or design.
  await page.addStyleTag({
    content: `
      html { scroll-behavior: auto !important; }
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
      html, body, body * { cursor: none !important; }
      #cursor { display: none !important; visibility: hidden !important; opacity: 0 !important; }
      #preloader { display: none !important; }
      #nav, .page-title, #gpu-canvas { position: absolute !important; }
      #gpu-canvas { top: 0 !important; }
      #footer { position: absolute !important; bottom: 0 !important; }
    `,
  });

  if (enhanceSources) {
    await page.evaluate(() => {
      for (const image of document.images) {
        const source = new URL(image.currentSrc || image.src, location.href);
        const marker = "/images/miste/";
        if (!source.pathname.startsWith(marker)) continue;
        const relative = source.pathname.slice(marker.length).replace(/\.(jpe?g|webp)$/i, ".png");
        image.src = `/__miste_export_enhanced/${relative}`;
        image.removeAttribute("srcset");
      }
    });
  }

  await page.evaluate(async ({ step }) => {
    const root = document.documentElement;
    for (let y = 0; y < root.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    window.scrollTo(0, root.scrollHeight);
  }, { step: Math.floor(segmentHeight * 0.65) });

  await page.waitForTimeout(500);
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.images];
    for (const image of images) {
      image.loading = "eager";
      if (!image.complete) {
        await new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }
      if (image.complete && image.naturalWidth > 0) {
        await image.decode().catch(() => {});
      }
    }
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  const audit = await page.evaluate(() => ({
    width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
    fonts: document.fonts.status,
    images: [...document.images].map((image) => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    })),
  }));

  const badImages = audit.images.filter((image) => !image.complete || image.naturalWidth === 0);
  if (audit.fonts !== "loaded") throw new Error(`Fonts are not loaded: ${audit.fonts}`);
  if (badImages.length) throw new Error(`Missing images:\n${badImages.map((image) => image.src).join("\n")}`);
  if (audit.width > viewportWidth) throw new Error(`Unexpected horizontal overflow: ${audit.width}px`);

  const captures = [];
  const positions = [];
  for (let y = 0; y < audit.height; y += segmentHeight) {
    positions.push(Math.min(y, Math.max(0, audit.height - segmentHeight)));
  }
  for (const y of [...new Set(positions)]) {
    const index = captures.length;
    const segmentPath = path.join(tempDir, `segment-${String(index).padStart(3, "0")}.png`);
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(50);
    const actualY = await page.evaluate(() => Math.round(window.scrollY));
    await page.screenshot({
      path: segmentPath,
      type: "png",
      animations: "disabled",
      caret: "hide",
      scale: "device",
      timeout: 120_000,
    });
    const metadata = await sharp(segmentPath).metadata();
    const expected = { width: viewportWidth * dpr, height: segmentHeight * dpr };
    if (metadata.width !== expected.width || metadata.height !== expected.height) {
      throw new Error(`Segment ${index} is ${metadata.width}x${metadata.height}; expected ${expected.width}x${expected.height}`);
    }
    captures.push({ path: segmentPath, actualY });
  }

  const segments = [];
  let coveredUntil = 0;
  for (const capture of captures) {
    const sourceTopCss = Math.max(0, coveredUntil - capture.actualY);
    const usableBottomCss = Math.min(segmentHeight, audit.height - capture.actualY);
    if (usableBottomCss <= sourceTopCss) continue;
    const bandPath = path.join(tempDir, `band-${String(segments.length).padStart(3, "0")}.png`);
    const sourceTop = sourceTopCss * dpr;
    const bandHeight = (usableBottomCss - sourceTopCss) * dpr;
    await sharp(capture.path)
      .extract({ left: 0, top: sourceTop, width: viewportWidth * dpr, height: bandHeight })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(bandPath);
    const destinationTop = (capture.actualY + sourceTopCss) * dpr;
    segments.push({ path: bandPath, top: destinationTop });
    coveredUntil = capture.actualY + usableBottomCss;
  }
  if (coveredUntil < audit.height) {
    throw new Error(`Capture is incomplete: covered ${coveredUntil}px of ${audit.height}px`);
  }

  const finalWidth = viewportWidth * dpr;
  const finalHeight = audit.height * dpr;
  await sharp({
    create: { width: finalWidth, height: finalHeight, channels: 4, background: "#ffffff" },
    limitInputPixels: false,
  })
    .composite(segments.map((segment) => ({ input: segment.path, left: 0, top: segment.top })))
    .png({ compressionLevel: dpr >= 3 ? 6 : 9, adaptiveFiltering: true })
    .toFile(output);

  const final = sharp(output, { limitInputPixels: false });
  const metadata = await final.metadata();
  if (metadata.width !== finalWidth || metadata.height !== finalHeight) {
    throw new Error(`Final image is ${metadata.width}x${metadata.height}; expected ${finalWidth}x${finalHeight}`);
  }

  // Look for fully blank horizontal bands, a common symptom of failed tall captures.
  const sampleWidth = Math.min(256, finalWidth);
  const sample = await final.resize({ width: sampleWidth }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const blankBands = [];
  for (let y = 0; y < sample.info.height; y += 200) {
    const end = Math.min(y + 12, sample.info.height);
    let min = 255;
    let max = 0;
    for (let row = y; row < end; row += 1) {
      const start = row * sample.info.width * sample.info.channels;
      const stop = start + sample.info.width * sample.info.channels;
      for (const value of sample.data.subarray(start, stop)) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
    if (max - min < 2 && min > 248) blankBands.push(y);
  }
  if (blankBands.length > Math.ceil(sample.info.height / 200) * 0.25) {
    throw new Error(`Too many blank sampled bands (${blankBands.length}); capture may be incomplete.`);
  }

  const report = {
    url,
    viewport: `${viewportWidth}px @ ${dpr}x`,
    documentCssPixels: `${audit.width}x${audit.height}`,
    pngPixels: `${metadata.width}x${metadata.height}`,
    segmentCount: captures.length,
    imageCount: audit.images.length,
    failedRequests,
    blankBandSamples: blankBands.length,
    enhancedSources: enhanceSources,
    output,
  };
  await fs.writeFile(path.join(tempDir, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
  if (enhanceSources) await fs.rm(enhancedPublicDir, { recursive: true, force: true });
}
