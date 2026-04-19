import { gsap } from "./gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureGsap(): void {
  if (typeof window === "undefined") return;
  if (registered) return;

  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function setupHeroAnimations(): void {
  if (typeof window === "undefined") return;
  ensureGsap();

  const hero = document.querySelector<HTMLElement>("[data-hero-root]");
  if (!hero) return;

  const eyebrow = hero.querySelector<HTMLElement>("[data-hero-eyebrow]");
  const title = hero.querySelector<HTMLElement>("[data-hero-title]");
  const copy = hero.querySelector<HTMLElement>("[data-hero-copy]");
  const description = hero.querySelector<HTMLElement>("[data-hero-description]");
  const proof = hero.querySelector<HTMLElement>("[data-hero-proof]");
  const actions = hero.querySelector<HTMLElement>("[data-hero-actions]");
  const visual = hero.querySelector<HTMLElement>("[data-hero-visual]");
  const visualShell = hero.querySelector<HTMLElement>("[data-hero-visual-shell]");

  const introTargets = [eyebrow, title, copy, description, proof, actions, visual].filter(Boolean) as HTMLElement[];
  gsap.set(introTargets, { opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" }
  });

  if (visual) {
    tl.fromTo(
      visual,
      {
        opacity: 0,
        scale: 1.18,
        y: 18,
        x: 36,
        rotate: 0.45,
        transformOrigin: "center center"
      },
      {
        opacity: 1,
        scale: 1.06,
        y: 0,
        x: 0,
        rotate: 0,
        duration: 1.0,
        ease: "power3.out"
      }
    );
  }

  if (eyebrow) {
    tl.fromTo(
      eyebrow,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.52"
    );
  }

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.56 },
      "-=0.2"
    );
  }

  if (copy) {
    tl.fromTo(
      copy,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.46 },
      "-=0.26"
    );
  }

  if (description) {
    tl.fromTo(
      description,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.42 },
      "-=0.24"
    );
  }

  if (proof) {
    tl.fromTo(
      proof,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.38 },
      "-=0.2"
    );
  }

  if (actions) {
    tl.fromTo(
      actions,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.18"
    );
  }

  if (visual && visualShell && window.matchMedia("(min-width: 901px)").matches) {
    gsap.to(visual, {
      scale: 1,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top+=12%",
        scrub: 0.75
      }
    });

    gsap.to(visualShell, {
      y: -18,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top+=12%",
        scrub: 0.75
      }
    });
  }

  ScrollTrigger.refresh();
}
