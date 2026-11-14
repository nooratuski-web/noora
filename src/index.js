import Lenis from "lenis";
import { GPU } from "./gpu.js";
import { Controller } from "./controller.js";
import { Cursor } from "./cursor.js";
import { Preloader } from "./preloader.js";
import { withBase } from "./paths.js";
import "./resume.css";
import "./project-pdf.css";

async function start() {
  const lenis = new Lenis({
    smoothWheel: true,
    syncTouch: true,
    lerp: 0.09,
  });

  // Count up while textures load and the page is built behind the overlay.
  const preloader = new Preloader();
  const counting = preloader.count();

  const gpu = new GPU();
  await gpu.init();

  const controller = new Controller({
    app: document.getElementById("app"),
    gpu,
    lenis,
  });
  await controller.start();

  function raf(time) {
    lenis.raf(time);
    controller.tick();
    gpu.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Hold until the counter reaches 100%, then lift the overlay and, in the same
  // tick, play the page intro so its hidden start states are applied before the
  // overlay clears (no flash of resting content).
  await counting;
  controller.playIntro();
  preloader.reveal();

  const cursor = new Cursor();
  cursor.start();
}

const dialog = document.getElementById("about-dialog");
document.getElementById("about-link")?.addEventListener("click", e => { e.preventDefault(); dialog.showModal(); });
document.getElementById("close-about")?.addEventListener("click", () => dialog.close());
start().catch(error => {
  console.error(error);
  document.getElementById("preloader").remove();
  document.getElementById("gpu-canvas")?.remove();
  document.documentElement.classList.add("graphics-fallback");
  import("./projects.js").then(({ projects }) => {
    const fallbackImages = ["/images/project-0.svg", "/images/miste/cover.png"];
    document.getElementById("app").innerHTML = `<section class="fallback-gallery"><h1>精选设计作品</h1>${projects.map((p, i) => `<article><img src="${withBase(fallbackImages[i])}" alt="${p.title} 项目封面"><h2>${p.title}</h2><p>${p.category}</p><p>${p.description}</p></article>`).join("")}</section>`;
  });
});
