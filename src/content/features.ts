import type { FeatureItem } from "@/types/content";

export const featureItems: FeatureItem[] = [
  {
    id: "timeline-analyzer",
    eyebrow: "Timeline Analysis",
    title: "See communication over time, not just raw frames",
    description:
      "Visualize traffic patterns, correlate bursts, and inspect communication behavior across links with a timeline-based analyzer.",
    imageSrc: "/assets/screenshots/dual-link-trace.png",
    imageAlt: "IEC 60870 dual link trace timeline analyzer",
    bullets: [
      "Timeline-based traffic inspection",
      "Burst correlation across links",
      "Readable event-to-frame context"
    ]
  },
  {
    id: "redundancy-analysis",
    eyebrow: "Redundancy Analysis",
    title: "Understand active and standby link behavior",
    description:
      "Monitor dual-link communication with clear visibility of active paths, standby readiness, and switchover conditions.",
    imageSrc: "/assets/screenshots/dual-link-analyzer.png",
    imageAlt: "IEC 60870 dual-link redundancy analyzer",
    bullets: [
      "Single-link and dual-link mode",
      "Link state awareness",
      "Switchover visibility"
    ]
  },
  {
    id: "availability-dashboard",
    eyebrow: "Availability Monitoring",
    title: "Measure communication health in real time",
    description:
      "Track availability, reliability, and anomalies across long-running IEC 60870 sessions.",
    imageSrc: "/assets/screenshots/availability-dashboard.png",
    imageAlt: "IEC 60870 availability dashboard",
    bullets: [
      "Reliability score",
      "Availability metrics",
      "Findings overview"
    ]
  },
  {
    id: "soe-audit",
    eyebrow: "SOE Audit",
    title: "Validate events with confidence",
    description:
      "Audit sequence of events with timestamp comparison, delay analysis, and delivery context for evidence-focused investigation.",
    imageSrc: "/assets/screenshots/soe-audit.png",
    imageAlt: "IEC 60870 sequence of events audit",
    bullets: [
      "Timestamp comparison",
      "Delay and context review",
      "Evidence-oriented analysis"
    ]
  },
  {
    id: "command-lifecycle",
    eyebrow: "Command Verification",
    title: "Verify command execution, not just transmission",
    description:
      "Track full command lifecycle including issue, response, delay, and execution feedback.",
    imageSrc: "/assets/screenshots/command-lifecycle.png",
    imageAlt: "IEC 60870 command lifecycle monitor",
    bullets: [
      "Command feedback visibility",
      "Response timing insight",
      "Execution tracking"
    ]
  }
];
