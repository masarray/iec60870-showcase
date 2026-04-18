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
    defaults: {
      ease: "power2.out"
    }
  });

  if (title) {
    tl.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.62 });
  }

  if (copy) {
    tl.fromTo(copy, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.52 }, "-=0.34");
  }

  if (actions) {
    tl.fromTo(actions, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.42 }, "-=0.28");
  }

  if (visual) {
    tl.fromTo(
      visual,
      { opacity: 0, x: 18, scale: 0.992 },
      { opacity: 1, x: 0, scale: 1, duration: 0.72 },
      "-=0.46"
    );
  }
}