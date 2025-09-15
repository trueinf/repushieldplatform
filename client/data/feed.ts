export type SentimentType = "Positive" | "Negative" | "Neutral" | "Severe Threat";

export type FeedBadge = {
  label: string;
  className: string;
};

export type FeedPost = {
  id: string;
  platform: string;
  platformInitials: string;
  platformClasses: string;
  author: string;
  time: string;
  message: string;
  sentiment: SentimentType;
  badges: FeedBadge[];
  media?: {
    type: "image";
    src: string;
    alt: string;
  };
  severity?: boolean;
  sourceUrl?: string;
};

export const sentimentBadgeClasses: Record<SentimentType, string> = {
  Positive: "bg-green-100 text-green-800",
  Negative: "bg-rose-100 text-rose-700",
  Neutral: "bg-amber-100 text-amber-700",
  "Severe Threat": "bg-red-100 text-red-800 font-semibold",
};

export const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    platform: "Twitter",
    platformInitials: "TW",
    platformClasses: "bg-blue-100 text-blue-700",
    author: "@ultrafan88",
    time: "6 mins ago",
    message:
      "We know where Marcus stays when he’s in London. If he shows up for Saturday’s match, he won’t walk out. Enough is enough.",
    sentiment: "Severe Threat",
    severity: true,
    badges: [
      { label: "Threat", className: "bg-red-100 text-red-700" },
      { label: "Confidence: 97%", className: "bg-gray-100 text-gray-700" },
      { label: "Marcus Johnson", className: "bg-blue-100 text-blue-800" },
    ],
    sourceUrl: "https://example.com/posts/ultrafan88",
  },
  {
    id: "post-2",
    platform: "Instagram",
    platformInitials: "IG",
    platformClasses: "bg-pink-100 text-pink-700",
    author: "@sarah_supporters",
    time: "12 mins ago",
    message:
      "Sarah Williams with another assist and a post-match selfie for the fans. Pure class on and off the pitch!",
    sentiment: "Positive",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
      alt: "Sarah Williams celebrating with fans",
    },
    badges: [
      { label: "Confidence: 94%", className: "bg-gray-100 text-gray-700" },
      { label: "Sarah Williams", className: "bg-purple-100 text-purple-700" },
      { label: "Inspiration", className: "bg-blue-100 text-blue-800" },
    ],
    sourceUrl: "https://example.com/posts/sarah_supporters",
  },
  {
    id: "post-3",
    platform: "Fan Forum",
    platformInitials: "FF",
    platformClasses: "bg-orange-100 text-orange-700",
    author: "SupportersHive",
    time: "25 mins ago",
    message:
      "Thread: Breaking down Marcus’ pressing numbers — interesting to see his heat map vs the derby match. Worth a read for tactical nerds.",
    sentiment: "Neutral",
    badges: [
      { label: "Analysis", className: "bg-blue-100 text-blue-800" },
      { label: "Marcus Johnson", className: "bg-blue-100 text-blue-800" },
      { label: "Confidence: 72%", className: "bg-gray-100 text-gray-700" },
    ],
    sourceUrl: "https://example.com/posts/supportershive",
  },
  {
    id: "post-4",
    platform: "TikTok",
    platformInitials: "TT",
    platformClasses: "bg-emerald-100 text-emerald-700",
    author: "@goalreactionstv",
    time: "33 mins ago",
    message:
      "Fan reactions when Alex Thompson cleared that last-minute header. Stadium went absolutely wild!",
    sentiment: "Positive",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
      alt: "Fans celebrating in stadium",
    },
    badges: [
      { label: "Confidence: 88%", className: "bg-gray-100 text-gray-700" },
      { label: "Alex Thompson", className: "bg-blue-100 text-blue-800" },
      { label: "Viral clip", className: "bg-indigo-100 text-indigo-700" },
    ],
    sourceUrl: "https://example.com/posts/goalreactionstv",
  },
  {
    id: "post-5",
    platform: "Twitter",
    platformInitials: "TW",
    platformClasses: "bg-blue-100 text-blue-700",
    author: "@northbridge_blog",
    time: "41 mins ago",
    message:
      "Column: Should Sarah Williams take the armband permanently? Leadership metrics and teammate testimonials suggest yes.",
    sentiment: "Neutral",
    badges: [
      { label: "Opinion", className: "bg-blue-100 text-blue-800" },
      { label: "Confidence: 68%", className: "bg-gray-100 text-gray-700" },
      { label: "Sarah Williams", className: "bg-purple-100 text-purple-700" },
    ],
    sourceUrl: "https://example.com/posts/northbridge_blog",
  },
  {
    id: "post-6",
    platform: "Facebook",
    platformInitials: "FB",
    platformClasses: "bg-sky-100 text-sky-700",
    author: "Rival Rant Hub",
    time: "58 mins ago",
    message:
      "Can we talk about David Smith spilling ANOTHER cross? Riverside deserve a keeper who can command the box.",
    sentiment: "Negative",
    badges: [
      { label: "Confidence: 86%", className: "bg-gray-100 text-gray-700" },
      { label: "David Smith", className: "bg-blue-100 text-blue-800" },
      { label: "Critique", className: "bg-amber-100 text-amber-700" },
    ],
    sourceUrl: "https://example.com/posts/rival_rant",
  },
  {
    id: "post-7",
    platform: "Reddit",
    platformInitials: "RD",
    platformClasses: "bg-slate-200 text-slate-700",
    author: "u/analyticsnerd",
    time: "1 hour ago",
    message:
      "Data dive: Alex Thompson’s defensive duel win rate post-injury. Numbers steady but distribution shows heavier left-side coverage.",
    sentiment: "Neutral",
    badges: [
      { label: "Analysis", className: "bg-blue-100 text-blue-800" },
      { label: "Confidence: 75%", className: "bg-gray-100 text-gray-700" },
      { label: "Alex Thompson", className: "bg-blue-100 text-blue-800" },
    ],
    sourceUrl: "https://example.com/posts/analyticsnerd",
  },
  {
    id: "post-8",
    platform: "WhatsApp",
    platformInitials: "WA",
    platformClasses: "bg-lime-100 text-lime-700",
    author: "Team Staff Thread",
    time: "1 hour ago",
    message:
      "Heads up: anonymous caller left a voicemail targeting David Smith’s family. Local authorities looped in and monitoring.",
    sentiment: "Severe Threat",
    severity: true,
    badges: [
      { label: "Threat", className: "bg-red-100 text-red-700" },
      { label: "Escalated", className: "bg-red-50 text-red-600" },
      { label: "David Smith", className: "bg-blue-100 text-blue-800" },
    ],
    sourceUrl: "https://example.com/posts/team_staff_thread",
  },
  {
    id: "post-9",
    platform: "YouTube",
    platformInitials: "YT",
    platformClasses: "bg-red-100 text-red-700",
    author: "MatchDayBreakdown",
    time: "2 hours ago",
    message:
      "Full tactical review: How Northbridge United built overloads around Sarah Williams. Coaches should bookmark this.",
    sentiment: "Positive",
    badges: [
      { label: "Confidence: 81%", className: "bg-gray-100 text-gray-700" },
      { label: "Sarah Williams", className: "bg-purple-100 text-purple-700" },
      { label: "Tactical", className: "bg-indigo-100 text-indigo-700" },
    ],
    sourceUrl: "https://example.com/posts/matchdaybreakdown",
  },
  {
    id: "post-10",
    platform: "Podcast",
    platformInitials: "PC",
    platformClasses: "bg-violet-100 text-violet-700",
    author: "GoalLineRadio",
    time: "3 hours ago",
    message:
      "Panel debate: Is Marcus Johnson ready for the captaincy if the armband changes hands? Split opinions but respectful tone this week.",
    sentiment: "Negative",
    badges: [
      { label: "Confidence: 63%", className: "bg-gray-100 text-gray-700" },
      { label: "Marcus Johnson", className: "bg-blue-100 text-blue-800" },
      { label: "Debate", className: "bg-amber-100 text-amber-700" },
    ],
    sourceUrl: "https://example.com/posts/goallineradio",
  },
];

export const getFeedPostById = (id: string) => feedPosts.find((post) => post.id === id);
