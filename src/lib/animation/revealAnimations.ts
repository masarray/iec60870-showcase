import { gsap } from "./gsap";

function animateIn(element: Element): void {
  gsap.fromTo(
    element,
    { opacity: 0, y: 26 },
    {
      opacity: 1,
      y: 0,
      duration: 0.72,
      ease: "power2.out",
      overwrite: "auto"
    }
  );
}

export function setupRevealAnimations(): void {
  if (typeof window === "undefined") return;

  const items = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!items.length) return;

  const observed = new WeakSet<Element>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (observed.has(entry.target)) continue;

        observed.add(entry.target);
        animateIn(entry.target);
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  items.forEach((item) => observer.observe(item));
}