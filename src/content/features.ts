import type { FeatureItem } from "@/types/content";

export const featureItems: FeatureItem[] = [
  {
    id: "timeline-analyzer",
    eyebrow: "Timeline Analysis",
    title: "See traffic flow, not just raw frames",
    description:
      "Follow communication over time, correlate bursts across links, and inspect behavior in a sequence that is easier to read and troubleshoot.",
    imageSrc: "assets/screenshots/NUC_Dual_Link_Trace.gif",
    imageAlt: "IEC 60870 dual link trace timeline analyzer",
    bullets: [
      "Timeline-based traffic inspection",
      "Burst correlation across links",
      "Readable event-to-frame context",
    ],
  },
  {
    id: "redundancy-analysis",
    eyebrow: "Redundancy Analysis",
    title: "Understand active and standby behavior clearly",
    description:
      "Inspect dual-link communication with clear visibility into active paths, standby readiness, and switchover conditions.",
    imageSrc: "assets/screenshots/dual-link-analyzer.png",
    imageAlt: "IEC 60870 dual-link redundancy analyzer",
    bullets: [
      "Single-link and dual-link mode",
      "Link state awareness",
      "Switchover visibility",
    ],
  },
  {
    id: "availability-dashboard",
    eyebrow: "Availability Monitoring",
    title: "Measure communication health in real time",
    description:
      "Track reliability, availability, and anomalies across long-running IEC 60870 sessions without losing operating context.",
    imageSrc: "assets/screenshots/availability-dashboard.png",
    imageAlt: "IEC 60870 availability dashboard",
    bullets: ["Reliability score", "Availability metrics", "Findings overview"],
  },
  {
    id: "soe-audit",
    eyebrow: "SOE Audit",
    title: "Validate event timing with confidence",
    description:
      "Audit sequence of events with timestamp comparison, delay analysis, and delivery context for evidence-focused investigation.",
    imageSrc: "assets/screenshots/soe-audit.png",
    imageAlt: "IEC 60870 sequence of events audit",
    bullets: [
      "Timestamp comparison",
      "Delay and context review",
      "Evidence-oriented analysis",
    ],
  },
  {
    id: "command-lifecycle",
    eyebrow: "Command Verification",
    title: "Verify execution, not just transmission",
    description:
      "Track the full command lifecycle from issue to response, delay, and execution feedback in one readable flow.",
    imageSrc: "assets/screenshots/IEC_SingleLinkConnect.gif",
    imageAlt: "IEC 60870 command lifecycle monitor",
    bullets: [
      "Command feedback visibility",
      "Response timing insight",
      "Execution tracking",
    ],
  },
];
