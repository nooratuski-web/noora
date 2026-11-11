import gsap from "gsap";
import { MAIN_COUNT, mainIdx } from "../gpu.js";
import { getMainTargets } from "../pages/home.js";
import { tweenBounds, tweenOpacity } from "./constants.js";

function fadePage(el, from, to) {
  return gsap.fromTo(el, { opacity: from }, { opacity: to, duration: 0.65, ease: "power2.inOut" });
}

function fadePlanes(gpu, opacity) {
  return Promise.all(gpu.planes.map((plane) => tweenOpacity(plane, opacity, { duration: 0.5 })));
}

export class ToMisteTransition {
  async out(_from, _to, { gpu }) {
    await fadePlanes(gpu, 0);
  }

  async in(_from, to) {
    await fadePage(to, 0, 1);
  }
}

export class MisteToMainTransition {
  async out(from) {
    await fadePage(from, 1, 0);
  }

  async in(_from, to, { gpu }) {
    const targets = getMainTargets(to);
    await Promise.all(
      Array.from({ length: MAIN_COUNT }, (_, i) =>
        Promise.all([
          tweenBounds(gpu.planes[mainIdx(i)], targets[i]),
          tweenOpacity(gpu.planes[mainIdx(i)], 1, { duration: 0.65, delay: 0.12 }),
        ]),
      ),
    );
  }
}

export class MisteToIndexTransition {
  async out(from) {
    await fadePage(from, 1, 0);
  }

  async in(_from, _to, { gpu, indexFloat }) {
    const targets = indexFloat.getTargets();
    await Promise.all(
      Array.from({ length: MAIN_COUNT }, (_, i) =>
        Promise.all([
          tweenBounds(gpu.planes[mainIdx(i)], targets[mainIdx(i)]),
          tweenOpacity(gpu.planes[mainIdx(i)], 1, { duration: 0.65, delay: 0.12 }),
        ]),
      ),
    );
  }
}
