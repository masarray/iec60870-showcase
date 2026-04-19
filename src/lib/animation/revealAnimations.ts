import { gsap } from "./gsap";

function animateIn(element: Element): void {
  element.classList.add("is-visible");

  gsap.fromTo(
    element,
    { opacity: 0, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration: 0.56,
      ease: "power2.out",
      overwrite: "auto",
      clearProps: "transform",
    },
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
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  items.forEach((item) => observer.observe(item));
}
