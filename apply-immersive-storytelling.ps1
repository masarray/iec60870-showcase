$ErrorActionPreference = "Stop"

Set-Content -Path "src/components/layout/ClientInit.astro" -Value @'
<script>
  import { setupHeroAnimations } from "@/lib/animation/heroAnimations";
  import { setupRevealAnimations } from "@/lib/animation/revealAnimations";
  import { setupHoverAnimations } from "@/lib/animation/hoverAnimations";
  import { setupSmoothScroll } from "@/lib/animation/lenis";
  import { setupHeroParallax } from "@/lib/animation/parallax";
  import { setupFocusHighlight } from "@/lib/animation/focusHighlight";
  import { setupFeatureShowcaseAnimations } from "@/lib/animation/featureShowcase";

  const init = () => {
    setupHeroAnimations();
    setupRevealAnimations();
    setupHoverAnimations();
    setupSmoothScroll();
    setupHeroParallax();
    setupFocusHighlight();
    setupFeatureShowcaseAnimations();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
</script>
'@

Set-Content -Path "src/components/features/FeatureSection.astro" -Value @'
---
import Eyebrow from "@/components/ui/Eyebrow.astro";
import SectionTitle from "@/components/ui/SectionTitle.astro";
import DeviceFrame from "@/components/ui/DeviceFrame.astro";
import FeatureBullets from "@/components/features/FeatureBullets.astro";

export interface Props {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
  reverse?: boolean;
}

const {
  id,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  bullets,
  reverse = false
} = Astro.props;

const assetBase = import.meta.env.BASE_URL;
const resolvedImageSrc = `${assetBase}${imageSrc}`;
const layoutClass = reverse ? "feature-row--panel" : "feature-row--split";
const featureDirection = reverse ? "left" : "right";

const isStoryFeature =
  id === "timeline-analyzer" ||
  id === "soe-audit" ||
  id === "command-lifecycle";
---

<section id={id} class="section feature-section">
  <div class="container">
    <div
      class:list={[
        "feature-row",
        layoutClass,
        reverse && "feature-row--reverse",
        isStoryFeature && "feature-row--story"
      ]}
      data-feature-row
      data-feature-direction={featureDirection}
      data-feature-mode={isStoryFeature ? "immersive" : "standard"}
    >
      <div class="feature-copy" data-feature-copy>
        <div data-feature-eyebrow>
          <Eyebrow text={eyebrow} />
        </div>

        <div data-feature-title-wrap>
          <SectionTitle title={title} text={description} />
        </div>

        <div data-feature-bullets-wrap>
          <FeatureBullets items={bullets} />
        </div>
      </div>

      <div class="feature-visual-stage" data-feature-stage>
        <div class="feature-visual" data-feature-visual>
          <DeviceFrame src={resolvedImageSrc} alt={imageAlt} />
        </div>
      </div>
    </div>
  </div>
</section>
'@

Set-Content -Path "src/lib/animation/featureShowcase.ts" -Value @'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function setupFeatureShowcaseAnimations() {
  if (typeof window === "undefined") return;
  ensureGsap();

  const rows = gsap.utils.toArray<HTMLElement>("[data-feature-row]");
  if (!rows.length) return;

  const desktop = window.matchMedia("(min-width: 901px)").matches;

  rows.forEach((row) => {
    const visual = row.querySelector<HTMLElement>("[data-feature-visual]");
    const copy = row.querySelector<HTMLElement>("[data-feature-copy]");
    const stage = row.querySelector<HTMLElement>("[data-feature-stage]");
    const eyebrow = row.querySelector<HTMLElement>("[data-feature-eyebrow]");
    const titleWrap = row.querySelector<HTMLElement>("[data-feature-title-wrap]");
    const bulletsWrap = row.querySelector<HTMLElement>("[data-feature-bullets-wrap]");
    const bullets = row.querySelectorAll<HTMLElement>("[data-feature-bullets] > *");

    if (!visual || !copy) return;

    const fromRight = row.dataset.featureDirection !== "left";
    const visualX = fromRight ? 72 : -72;
    const immersive = row.dataset.featureMode === "immersive";

    if (immersive && desktop) {
      gsap.set([eyebrow, titleWrap, bulletsWrap].filter(Boolean), {
        opacity: 0,
        y: 22
      });

      gsap.set(bullets, {
        opacity: 0,
        y: 18
      });

      gsap.set(visual, {
        opacity: 1,
        scale: 1.62,
        xPercent: 0,
        yPercent: 0,
        y: 0,
        x: 0,
        rotate: 0,
        transformOrigin: "center center",
        zIndex: 30
      });

      if (stage) {
        gsap.set(stage, {
          position: "relative",
          zIndex: 20
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top top",
          end: "+=140%",
          scrub: 0.85,
          pin: row,
          anticipatePin: 1
        }
      });

      tl
        .to(
          visual,
          {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.46,
            ease: "power2.out"
          },
          0
        )
        .fromTo(
          eyebrow,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.12 },
          0.38
        )
        .fromTo(
          titleWrap,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.16 },
          0.5
        )
        .fromTo(
          bulletsWrap,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.12 },
          0.64
        );

      if (bullets.length) {
        tl.to(
          bullets,
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.12
          },
          0.72
        );
      }

      return;
    }

    gsap.fromTo(
      visual,
      {
        x: visualX,
        opacity: 0,
        scale: 0.965,
        rotate: fromRight ? 0.6 : -0.6,
        y: 10,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      copy,
      {
        y: 24,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.68,
        delay: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    if (bullets.length) {
      gsap.fromTo(
        bullets,
        {
          y: 12,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.16,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  });

  ScrollTrigger.refresh();
}
'@

Add-Content -Path "src/styles/hero.css" -Value @'

.feature-row--story {
  min-height: 145vh;
  align-items: center;
}

.feature-row--story .feature-copy {
  max-width: 540px;
}

.feature-row--story .feature-visual-stage {
  position: relative;
  min-height: min(72vh, 760px);
  display: grid;
  place-items: center;
}

.feature-row--story .feature-visual {
  width: min(96vw, 1280px);
  max-width: none;
  margin-inline: auto;
  will-change: transform, opacity;
  transform-origin: center center;
  filter: drop-shadow(0 32px 90px rgba(14, 39, 74, 0.18));
}

.feature-row--story .feature-visual img {
  border-radius: 18px;
}

.feature-row--story .feature-copy [data-feature-eyebrow],
.feature-row--story .feature-copy [data-feature-title-wrap],
.feature-row--story .feature-copy [data-feature-bullets-wrap] {
  will-change: transform, opacity;
}

@media (max-width: 900px) {
  .feature-row--story {
    min-height: auto;
  }

  .feature-row--story .feature-visual-stage {
    min-height: auto;
  }

  .feature-row--story .feature-visual {
    width: 100%;
    max-width: 100%;
    filter: drop-shadow(0 20px 44px rgba(14, 39, 74, 0.14));
  }
}
'@

Write-Host "Immersive storytelling patch applied."