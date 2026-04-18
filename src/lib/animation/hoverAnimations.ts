import { gsap } from "./gsap";

export function setupHoverAnimations(): void {
  if (typeof window === "undefined") return;

  const cards = document.querySelectorAll<HTMLElement>("[data-hover-lift]");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -5,
        scale: 1.005,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });
}