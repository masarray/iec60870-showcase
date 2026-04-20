import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

function estimateTypeDuration(source: string) {
  return Math.min(2.1, Math.max(0.75, source.length * 0.018));
}

function typeText(element: HTMLElement, delaySeconds = 0) {
  if (element.dataset.typed === "true") return;

  const source = element.dataset.typeSource ?? element.textContent ?? "";
  element.dataset.typeSource = source;
  element.dataset.typed = "true";
  element.textContent = "";
  const duration = estimateTypeDuration(source);

  gsap.to(
    { count: 0 },
    {
      count: source.length,
      duration,
      delay: delaySeconds,
      ease: "none",
      roundProps: "count",
      onUpdate() {
        const value = this.targets()[0] as { count: number };
        element.textContent = source.slice(0, value.count);
      }
    }
  );

  return duration;
}

function typeElementsSequentially(elements: HTMLElement[], startDelay = 0, gapDelay = 0.12) {
  let cursor = startDelay;

  elements.forEach((element) => {
    const duration = estimateTypeDuration(element.textContent ?? "");

    gsap.delayedCall(cursor, () => {
      element.dataset.bulletState = "visible";
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.24,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    typeText(element, cursor);
    cursor += duration + gapDelay;
  });

  return cursor;
}

function replayFeatureRow(row: HTMLElement) {
  const visual = row.querySelector<HTMLElement>("[data-feature-visual]");
  const copy = row.querySelector<HTMLElement>("[data-feature-copy]");
  const title = row.querySelector<HTMLElement>("[data-feature-title]");
  const description = row.querySelector<HTMLElement>("[data-feature-description]");
  const bullets = row.querySelectorAll<HTMLElement>("[data-feature-bullets] > *");

  if (!visual || !copy || !title || !description) return;

  const titleSource = title.dataset.typeSource ?? title.textContent ?? "";
  const descriptionSource = description.dataset.typeSource ?? description.textContent ?? "";

  title.dataset.typed = "false";
  title.textContent = titleSource;
  description.dataset.typed = "false";
  description.textContent = descriptionSource;

  bullets.forEach((bullet) => {
    const bulletSource = bullet.dataset.typeSource ?? bullet.textContent ?? "";
    bullet.dataset.typed = "false";
    bullet.dataset.bulletState = "hidden";
    bullet.textContent = bulletSource;
  });

  gsap.killTweensOf([visual, copy, title, description, ...bullets]);

  gsap.fromTo(
    visual,
    {
      scale: 1.035,
      y: 10,
      filter: "blur(3px)"
    },
    {
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.72,
      ease: "power3.out"
    }
  );

  gsap.fromTo(
    copy,
    {
      opacity: 0.72,
      y: 10
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.42,
      ease: "power2.out"
    }
  );

  const titleDelay = 0.08;
  const titleDuration = estimateTypeDuration(titleSource);
  const descriptionDelay = titleDelay + titleDuration + 0.1;
  const descriptionDuration = estimateTypeDuration(descriptionSource);
  const bulletStartDelay = descriptionDelay + descriptionDuration + 0.12;

  typeText(title, titleDelay);
  typeText(description, descriptionDelay);
  typeElementsSequentially(Array.from(bullets), bulletStartDelay, 0.1);
}

function replayProductIntro(root: HTMLElement) {
  const visual = root.querySelector<HTMLElement>("[data-product-intro-visual]");
  const copy = root.querySelector<HTMLElement>("[data-product-intro-copy]");
  const heading = root.querySelector<HTMLElement>("[data-product-intro-heading]");
  const points = root.querySelectorAll<HTMLElement>("[data-product-intro-point]");

  if (!visual || !copy || !heading) return;

  gsap.killTweensOf([visual, copy, heading, ...points]);

  gsap.set(visual, {
    opacity: 0,
    x: 44,
    y: 12,
    scale: 1.04,
    rotateY: -5,
    filter: "blur(5px)"
  });
  gsap.set(copy, { opacity: 0, y: 12 });
  gsap.set([heading, ...points], { opacity: 0, y: 16 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  tl.to(visual, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    duration: 0.82
  })
    .to(
      copy,
      {
        opacity: 1,
        y: 0,
        duration: 0.42
      },
      0.2
    )
    .to(
      heading,
      {
        opacity: 1,
        y: 0,
        duration: 0.3
      },
      0.32
    )
    .to(
      points,
      {
        opacity: 1,
        y: 0,
        duration: 0.36,
        stagger: 0.1
      },
      0.54
    );
}

function replayCapabilities(root: HTMLElement) {
  const highlight = root.querySelector<HTMLElement>("[data-capability-highlight]");
  const visual = root.querySelector<HTMLElement>("[data-capability-visual]");
  const copy = root.querySelector<HTMLElement>("[data-capability-copy]");
  const eyebrow = root.querySelector<HTMLElement>("[data-capability-eyebrow]");
  const kicker = root.querySelector<HTMLElement>("[data-capability-kicker]");
  const title = root.querySelector<HTMLElement>("[data-capability-title]");
  const text = root.querySelector<HTMLElement>("[data-capability-text]");
  const cards = root.querySelectorAll<HTMLElement>("[data-capability-card]");

  if (!highlight || !visual || !copy || !eyebrow || !kicker || !title || !text) return;

  const titleSource = title.dataset.typeSource ?? title.textContent ?? "";
  const textSource = text.dataset.typeSource ?? text.textContent ?? "";
  title.dataset.typed = "false";
  title.textContent = titleSource;
  text.dataset.typed = "false";
  text.textContent = textSource;

  gsap.killTweensOf([highlight, visual, copy, eyebrow, kicker, title, text, ...cards]);

  gsap.set(visual, {
    opacity: 0,
    scale: 1.08,
    y: 26,
    rotateX: 4,
    rotateY: -6,
    filter: "blur(5px)"
  });
  gsap.set(copy, { opacity: 0, x: -18, y: 8 });
  gsap.set([eyebrow, kicker], { opacity: 0, y: 12 });
  gsap.set(cards, {
    opacity: 0,
    y: 18,
    rotateX: -6
  });

  const titleDelay = 0.22;
  const titleDuration = estimateTypeDuration(titleSource);
  const textDelay = titleDelay + titleDuration + 0.1;

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  tl.to(visual, {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
    duration: 0.9
  })
    .to(
      copy,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.42
      },
      0.18
    )
    .to(
      [eyebrow, kicker],
      {
        opacity: 1,
        y: 0,
        duration: 0.28,
        stagger: 0.06
      },
      0.28
    )
    .to(
      cards,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.42,
        stagger: 0.1,
        ease: "back.out(1.12)"
      },
      textDelay + 0.46
    );

  typeText(title, titleDelay);
  typeText(text, textDelay);
}

export function setupFeatureShowcaseAnimations() {
  if (typeof window === "undefined") return;
  ensureGsap();

  document.addEventListener("site-nav-retrigger", ((event: Event) => {
    const customEvent = event as CustomEvent<{ targetId?: string }>;
    const targetId = customEvent.detail?.targetId;
    if (!targetId) return;

    const section = document.querySelector<HTMLElement>(targetId);
    const introRoot = section?.querySelector<HTMLElement>("[data-product-intro]");
    if (introRoot) {
      replayProductIntro(introRoot);
      return;
    }

    const capabilitiesRoot = section?.querySelector<HTMLElement>("[data-capabilities-root]");
    if (capabilitiesRoot) {
      replayCapabilities(capabilitiesRoot);
      return;
    }

    const featureRow = section?.querySelector<HTMLElement>("[data-feature-row]");
    if (featureRow) {
      replayFeatureRow(featureRow);
      return;
    }
  }) as EventListener);

  const credibilityBand = document.querySelector<HTMLElement>("[data-credibility-band]");
  if (credibilityBand) {
    const credibilityItems = credibilityBand.querySelectorAll<HTMLElement>("[data-credibility-item]");

    if (credibilityItems.length) {
      gsap.set(credibilityItems, {
        opacity: 0,
        y: 18,
        scale: 0.985
      });

      ScrollTrigger.create({
        trigger: credibilityBand,
        start: "top 82%",
        once: true,
        onEnter: () => {
          const bandTl = gsap.timeline({
            defaults: { ease: "power3.out" }
          });

          bandTl.to(credibilityItems, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.42,
            stagger: 0.12
          });

          credibilityItems.forEach((item, index) => {
            gsap.delayedCall(0.18 + index * 0.22, () => {
              item.dataset.spotlight = "on";
              gsap.delayedCall(0.7, () => {
                item.dataset.spotlight = "off";
              });
            });
          });
        }
      });
    }
  }

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
    bullets.forEach((bullet) => {
      bullet.dataset.bulletState = "hidden";
    });

    const trigger = ScrollTrigger.create({
      trigger: row,
      start: "top 72%",
      once: true,
      onEnter: () => {
        const titleDelay = 0.46;
        const titleDuration = estimateTypeDuration(title.textContent ?? "");
        const descriptionDelay = titleDelay + titleDuration + 0.12;
        const descriptionDuration = estimateTypeDuration(description.textContent ?? "");
        const bulletStartDelay = descriptionDelay + descriptionDuration + 0.16;

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
          );

        typeText(title, titleDelay);
        typeText(description, descriptionDelay);
        typeElementsSequentially(Array.from(bullets), bulletStartDelay, 0.12);

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

    if (window.matchMedia("(min-width: 901px)").matches) {
      gsap.to(visual, {
        scale: 0.992,
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      });

      gsap.to(visualShell, {
        y: -12,
        ease: "none",
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      });
    }
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

      if (window.matchMedia("(min-width: 901px)").matches) {
        gsap.to(introVisual, {
          scale: 0.994,
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: intro,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      }
    }
  }

  const capabilitiesRoot = document.querySelector<HTMLElement>("[data-capabilities-root]");
  if (capabilitiesRoot) {
    const highlight = capabilitiesRoot.querySelector<HTMLElement>("[data-capability-highlight]");
    const visual = capabilitiesRoot.querySelector<HTMLElement>("[data-capability-visual]");
    const copy = capabilitiesRoot.querySelector<HTMLElement>("[data-capability-copy]");
    const eyebrow = capabilitiesRoot.querySelector<HTMLElement>("[data-capability-eyebrow]");
    const kicker = capabilitiesRoot.querySelector<HTMLElement>("[data-capability-kicker]");
    const title = capabilitiesRoot.querySelector<HTMLElement>("[data-capability-title]");
    const text = capabilitiesRoot.querySelector<HTMLElement>("[data-capability-text]");
    const cards = capabilitiesRoot.querySelectorAll<HTMLElement>("[data-capability-card]");

    if (highlight && visual && copy && eyebrow && kicker && title && text) {
      gsap.set(highlight, {
        transformPerspective: 1600
      });
      gsap.set(visual, {
        opacity: 0,
        scale: 1.18,
        y: 48,
        rotateX: 6,
        rotateY: -10,
        filter: "blur(10px)"
      });
      gsap.set(copy, { opacity: 0, x: -26, y: 12 });
      gsap.set([eyebrow, kicker], { opacity: 0, y: 20 });
      gsap.set(cards, {
        opacity: 0,
        y: 24,
        rotateX: -8,
        transformOrigin: "center top"
      });

      const highlightTrigger = ScrollTrigger.create({
        trigger: highlight,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const titleDelay = 0.54;
          const titleDuration = estimateTypeDuration(title.textContent ?? "");
          const textDelay = titleDelay + titleDuration + 0.12;

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
          });

          tl.to(
            visual,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              filter: "blur(0px)",
              duration: 1.22
            },
            0
          )
            .to(
              copy,
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.58
              },
              0.26
            )
            .to(
              [eyebrow, kicker],
              {
                opacity: 1,
                y: 0,
                duration: 0.36,
                stagger: 0.08
              },
              0.42
            )
            .to(
              cards,
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.52,
                stagger: 0.12,
                ease: "back.out(1.18)"
              },
              textDelay + 0.54
            );

          typeText(title, titleDelay);
          typeText(text, textDelay);

          gsap.fromTo(
            visual,
            {
              boxShadow: "0 0 0 rgba(33, 119, 214, 0)"
            },
            {
              boxShadow: "0 24px 72px rgba(33, 119, 214, 0.14)",
              duration: 0.9,
              yoyo: true,
              repeat: 1,
              delay: 0.18
            }
          );

          gsap.to(visual, {
            scale: 1.022,
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            delay: 1.18
          });

          highlightTrigger.kill();
        }
      });

      if (window.matchMedia("(min-width: 901px)").matches) {
        gsap.to(visual, {
          scale: 0.994,
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: highlight,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      }
    }
  }

  ScrollTrigger.refresh();
}
