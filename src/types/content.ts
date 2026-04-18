export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  tagline: string;
  subtext: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type FeatureItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
};
