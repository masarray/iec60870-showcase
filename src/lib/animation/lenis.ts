import Lenis from "@studio-freight/lenis";

export function setupSmoothScroll() {
  if (typeof window === "undefined") return;

  const lenis = new Lenis({
    duration: 0.9,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.9
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}