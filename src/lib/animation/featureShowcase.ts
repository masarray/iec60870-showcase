import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

function typeText(element: HTMLElement, delaySeconds = 0) {
  if (element.dataset.typed === "true") return;

  const source = element.dataset.typeSource ?? element.textContent ?? "";
  element.dataset.typeSource = source;
  element.dataset.typed = "true";
  element.textContent = "";

  gsap.to(
    { count: 0 },
    {
      count: source.length,
      duration: Math.min(2.1, Math.max(0.75, source.length * 0.018)),
      delay: delaySeconds,
      ease: "none",
      roundProps: "count",
      onUpdate() {
        const value = this.targets()[0] as { count: number };
        element.textContent = source.slice(0, value.count);
      }
    }
  );
}

function typeElements(elements: HTMLElement[], startDelay = 0, stepDelay = 0.22) {
  elements.forEach((element, index) => {
    typeText(element, startDelay + index * stepDelay);
  });
}

export function setupFeatureShowcaseAnimations() {
  if (typeof window === "undefined") return;
  ensureGsap();

  const rows = gsap.utils.toArray<HTMLElement>("[data-feature-row]");
  if (!rows.length) return;

  rows.forEach((row, index) => {
    const visual = row.querySelector<HTMLElement>("[data-feature-visual]");
    const visualShell = row.querySelector<HTMLElement>("[data-feature-visual-shell]");
    const copy = row.querySelector<HTMLElement>("[data-feature-copy]");
    const eyebrow = row.querySelector<HTMLElement>("[data-feature-eyebrow]");
    const title = row.querySelector<HTMLElement>("[data-feature-title]");
    const description = row.querySelector<HTMLElement>("[data-feature-description]");
    const bullets = row.querySelectorAll<HTMLElement>("[data-feature-bullets] > *");

    if (!visual || !visualShell || !copy || !title || !description) return;

    const fromRight = row.dataset.featureDirection !== "left";
    const visualX = fromRight ? 88 : -88;

    gsap.set(visualShell, { transformPerspective: 1200 });
    gsap.set(visual, {
      opacity: 0,
      x: visualX,
      y: 26,
      scale: 1.08,
      rotateY: fromRight ? -8 : 8,
      rotateX: 2,
      transformOrigin: "center center",
      filter: "blur(8px)"
    });

    gsap.set(copy, { opacity: 0, y: 18 });
    gsap.set([eyebrow, ...bullets], { opacity: 0, y: 18 });

    const trigger = ScrollTrigger.create({
      trigger: row,
      start: "top 72%",
      once: true,
      onEnter: () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" }
        });

        timeline
          .to(
            visual,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 1.05
            },
            0
          )
          .fromTo(
            visualShell,
            {
              y: 16
            },
            {
              y: 0,
              duration: 0.95,
              ease: "power2.out"
            },
            0.04
          )
          .to(
            copy,
            {
              opacity: 1,
              y: 0,
              duration: 0.54
            },
            0.34
          )
          .to(
            eyebrow,
            {
              opacity: 1,
              y: 0,
              duration: 0.34
            },
            0.44
          )
          .to(
            bullets,
            {
              opacity: 1,
              y: 0,
              duration: 0.28,
              stagger: 0.06
            },
            0.92
          );

        typeText(title, 0.44);
        typeText(description, 1.02);
        typeElements(Array.from(bullets), 1.42, 0.16);

        gsap.to(visual, {
          scale: 1.018,
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          delay: 1.12 + index * 0.02
        });

        trigger.kill();
      }
    });
  });

  const intro = document.querySelector<HTMLElement>("[data-product-intro]");
  if (intro) {
    const introVisual = intro.querySelector<HTMLElement>("[data-product-intro-visual]");
    const introCopy = intro.querySelector<HTMLElement>("[data-product-intro-copy]");
    const introHeading = intro.querySelector<HTMLElement>("[data-product-intro-heading]");
    const introPoints = intro.querySelectorAll<HTMLElement>("[data-product-intro-point]");

    if (introVisual && introCopy && introHeading) {
      gsap.set(introVisual, {
        opacity: 0,
        x: 68,
        y: 18,
        scale: 1.06,
        rotateY: -7,
        filter: "blur(8px)"
      });

      gsap.set(introCopy, { opacity: 0, y: 16 });
      gsap.set([introHeading, ...introPoints], { opacity: 0, y: 18 });

      const introTrigger = ScrollTrigger.create({
        trigger: intro,
        start: "top 74%",
        once: true,
        onEnter: () => {
          const introTl = gsap.timeline({
            defaults: { ease: "power3.out" }
          });

          introTl
            .to(
              introVisual,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
                filter: "blur(0px)",
                duration: 1
              },
              0
            )
            .to(
              introCopy,
              {
                opacity: 1,
                y: 0,
                duration: 0.52
              },
              0.28
            )
            .to(
              introHeading,
              {
                opacity: 1,
                y: 0,
                duration: 0.36
              },
              0.42
            )
            .to(
              introPoints,
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1
              },
              0.8
            );

          gsap.to(introVisual, {
            scale: 1.016,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            delay: 1.02
          });

          introTrigger.kill();
        }
      });
    }
  }

  ScrollTrigger.refresh();
}
