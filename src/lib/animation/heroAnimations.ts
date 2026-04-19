import { gsap } from "./gsap";

export function setupHeroAnimations(): void {
  if (typeof window === "undefined") return;

  const hero = document.querySelector("[data-hero-root]");
  if (!hero) return;

  const title = hero.querySelector("[data-hero-title]");
  const copy = hero.querySelector("[data-hero-copy]");
  const actions = hero.querySelector("[data-hero-actions]");
  const visual = hero.querySelector("[data-hero-visual]");

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
    );
  }

  if (copy) {
    tl.fromTo(
      copy,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.44 },
      "-=0.24",
    );
  }

  if (actions) {
    tl.fromTo(
      actions,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2",
    );
  }

  if (visual) {
    tl.fromTo(
      visual,
      { opacity: 0, y: 10, scale: 0.995 },
      { opacity: 1, y: 0, scale: 1, duration: 0.58 },
      "-=0.28",
    );
  }
}
