export type TriageItem = {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  severityBg: string;
  platform: string;
  platformIcon: "twitter" | "instagram" | "facebook" | "tiktok" | "forums";
  platformHandle: string;
  content: string;
  player: string;
  abuseType: string;
  abuseTypeBg: string;
  confidence: string;
  status: "Open" | "In Progress" | "Escalated" | "Closed";
  statusBg: string;
  time: string;
  attachments?: Array<{ type: "screenshot" | "link"; label: string; url: string }>;
  notes?: string[];
};

export const triageItems: TriageItem[] = [
  {
    id: "1",
    title: "Death threat detected",
    severity: "Critical",
    severityBg: "bg-red-600",
    platform: "Twitter",
    platformIcon: "twitter",
    platformHandle: "@hater123",
    content: "I'm going to find Marcus Johnson and make him pay for ruining our season...",
    player: "Marcus Johnson",
    abuseType: "Threat",
    abuseTypeBg: "bg-red-100 text-red-800",
    confidence: "94%",
    status: "Open",
    statusBg: "bg-yellow-100 text-yellow-800",
    time: "2 mins ago",
    attachments: [{ type: "screenshot", label: "Original post", url: "https://example.com/post/1" }],
    notes: [
      "Analyst flagged for immediate review",
      "Club security notified via automated alert",
    ],
  },
  {
    id: "2",
    title: "Harassment campaign",
    severity: "High",
    severityBg: "bg-orange-600",
    platform: "Instagram",
    platformIcon: "instagram",
    platformHandle: "@angry_fan",
    content: "Coordinated DMs harassing Sarah Williams with hateful language",
    player: "Sarah Williams",
    abuseType: "Harassment",
    abuseTypeBg: "bg-orange-100 text-orange-800",
    confidence: "91%",
    status: "Open",
    statusBg: "bg-yellow-100 text-yellow-800",
    time: "15 mins ago",
    attachments: [{ type: "link", label: "Abuse thread", url: "https://example.com/thread/21" }],
    notes: ["Escalated to club PR for response template"],
  },
  {
    id: "3",
    title: "Physical threat",
    severity: "Critical",
    severityBg: "bg-red-600",
    platform: "Facebook",
    platformIcon: "facebook",
    platformHandle: "@critic_fan",
    content: "Alex Thompson won't make it to next week's match if we run into him.",
    player: "Alex Thompson",
    abuseType: "Threat",
    abuseTypeBg: "bg-red-100 text-red-800",
    confidence: "88%",
    status: "Escalated",
    statusBg: "bg-red-100 text-red-800",
    time: "1 hour ago",
  },
  {
    id: "4",
    title: "Identity attack",
    severity: "High",
    severityBg: "bg-orange-600",
    platform: "Twitter",
    platformIcon: "twitter",
    platformHandle: "@angry_supporter",
    content: "These black players don't belong in our team. Send them back where they came from.",
    player: "Alex Rodriguez",
    abuseType: "Identity Attack",
    abuseTypeBg: "bg-red-100 text-red-800",
    confidence: "89%",
    status: "Open",
    statusBg: "bg-yellow-100 text-yellow-800",
    time: "42 mins ago",
  },
  {
    id: "5",
    title: "Doxxing attempt",
    severity: "Critical",
    severityBg: "bg-red-600",
    platform: "TikTok",
    platformIcon: "tiktok",
    platformHandle: "@toxic_user",
    content: "Someone should teach David Smith a lesson. I know where he lives...",
    player: "David Smith",
    abuseType: "Threat",
    abuseTypeBg: "bg-red-100 text-red-800",
    confidence: "91%",
    status: "Open",
    statusBg: "bg-yellow-100 text-yellow-800",
    time: "2 hours ago",
  },
];

export const getTriageItemById = (id: string) => triageItems.find((item) => item.id === id);
