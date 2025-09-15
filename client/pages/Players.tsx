import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Building2,
  Check,
  MapPin,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Navigation from "../components/Navigation";

const metricIconMap = {
  trend: TrendingUp,
  shield: ShieldAlert,
  sentiment: BarChart3,
  audience: Users,
} as const;

type MetricIconName = keyof typeof metricIconMap;

type PlayerMetric = {
  label: string;
  value: string;
  helper: string;
  icon: MetricIconName;
  tone: string;
};

type PlayerAlert = {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  time: string;
  platform: string;
  excerpt: string;
  triageId?: string;
};

type PlayerMention = {
  id: string;
  time: string;
  platform: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  category: string;
  message: string;
};

type PlayerProfile = {
  id: string;
  name: string;
  jersey: number;
  avatar: string;
  verified: boolean;
  position: string;
  club: string;
  location: string;
  nationality: string;
  reputationScore: number;
  reputationDelta: string;
  reputationDeltaTone: string;
  riskLevel: string;
  riskTone: string;
  watchers: number;
  upcomingFixture: string;
  summary: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    trend: string;
    trendTone: string;
  };
  metrics: PlayerMetric[];
  topics: string[];
  alerts: PlayerAlert[];
  mentions: PlayerMention[];
  supportTeam: string[];
};

const players: PlayerProfile[] = [
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    jersey: 9,
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/e43ecf031115aba828b06086ceacedde292f02f6?width=192",
    verified: true,
    position: "Forward",
    club: "Manchester Rovers",
    location: "Manchester, United Kingdom",
    nationality: "England",
    reputationScore: 78,
    reputationDelta: "+4.2% vs last week",
    reputationDeltaTone: "text-emerald-600",
    riskLevel: "High",
    riskTone: "text-red-600",
    watchers: 28,
    upcomingFixture: "vs London City • Sat 7:30pm BST",
    summary:
      "Explosive forward coming back from a headline-making derby performance. Monitoring targeted abuse around missed penalty and renewed transfer rumours.",
    sentiment: {
      positive: 62,
      neutral: 24,
      negative: 14,
      trend: "+3.1% positive lift",
      trendTone: "text-emerald-600",
    },
    metrics: [
      {
        label: "Reputation score",
        value: "78",
        helper: "Improved after weekend brace",
        icon: "trend",
        tone: "text-emerald-600",
      },
      {
        label: "Active incidents",
        value: "3",
        helper: "2 threats, 1 harassment",
        icon: "shield",
        tone: "text-rose-600",
      },
      {
        label: "Positive share",
        value: "62%",
        helper: "Negative volume down 6%",
        icon: "sentiment",
        tone: "text-emerald-600",
      },
      {
        label: "Audience reach",
        value: "4.8M",
        helper: "Across 5 monitored platforms",
        icon: "audience",
        tone: "text-sky-600",
      },
    ],
    topics: ["Derby heroics", "Transfer saga", "Penalty debate"],
    alerts: [
      {
        id: "mj-1",
        title: "Coordinated harassment targeting family",
        severity: "Critical",
        time: "12 mins ago",
        platform: "Twitter",
        excerpt: "Cluster of burner accounts referencing private school location.",
        triageId: "1",
      },
      {
        id: "mj-2",
        title: "Negative campaign from rival fan forum",
        severity: "High",
        time: "36 mins ago",
        platform: "Supporter forum",
        excerpt: "Thread promoting stadium harassment during warm-up.",
      },
      {
        id: "mj-3",
        title: "Media speculation spike",
        severity: "Medium",
        time: "1 hour ago",
        platform: "News & blogs",
        excerpt: "Transfer rumour story trending in local press.",
      },
    ],
    mentions: [
      {
        id: "mj-m1",
        time: "7 mins ago",
        platform: "Twitter",
        sentiment: "Negative",
        category: "Threat",
        message: "If Marcus bottles it again we make sure he knows about it after the match.",
      },
      {
        id: "mj-m2",
        time: "18 mins ago",
        platform: "Instagram",
        sentiment: "Positive",
        category: "Support",
        message: "Captain fantastic! Marcus silenced everyone with that brace!",
      },
      {
        id: "mj-m3",
        time: "55 mins ago",
        platform: "TikTok",
        sentiment: "Neutral",
        category: "Discussion",
        message: "Interesting tactical breakdown on Marcus' pressing numbers tonight.",
      },
    ],
    supportTeam: ["Club security liaison", "Player agent", "Club PR lead"],
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    jersey: 14,
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/cf4d74f0b8a40e5ea803077f93fd19b1b1b845ad?width=192",
    verified: true,
    position: "Midfielder",
    club: "Northbridge United",
    location: "Liverpool, United Kingdom",
    nationality: "England",
    reputationScore: 84,
    reputationDelta: "+1.8% vs last week",
    reputationDeltaTone: "text-emerald-600",
    riskLevel: "Elevated",
    riskTone: "text-orange-600",
    watchers: 19,
    upcomingFixture: "vs Midlands FC • Sun 4:00pm BST",
    summary:
      "Creative midfielder leading the league in assists. Past 72 hours dominated by viral clip of late tackle and subsequent disciplinary debate.",
    sentiment: {
      positive: 68,
      neutral: 18,
      negative: 14,
      trend: "+1.4% positive",
      trendTone: "text-emerald-600",
    },
    metrics: [
      {
        label: "Reputation score",
        value: "84",
        helper: "League-wide fan poll boost",
        icon: "trend",
        tone: "text-emerald-600",
      },
      {
        label: "Active incidents",
        value: "2",
        helper: "Focus on disciplinary clip",
        icon: "shield",
        tone: "text-orange-600",
      },
      {
        label: "Positive share",
        value: "68%",
        helper: "Viral assist montage trending",
        icon: "sentiment",
        tone: "text-emerald-600",
      },
      {
        label: "Audience reach",
        value: "3.2M",
        helper: "Broadcast + player channels",
        icon: "audience",
        tone: "text-sky-600",
      },
    ],
    topics: ["Assist record", "Disciplinary review", "Captaincy talk"],
    alerts: [
      {
        id: "sw-1",
        title: "Hateful DMs towards player inbox",
        severity: "High",
        time: "22 mins ago",
        platform: "Instagram",
        excerpt: "Derogatory language regarding disciplinary incident.",
        triageId: "2",
      },
      {
        id: "sw-2",
        title: "Opinion piece gaining traction",
        severity: "Medium",
        time: "48 mins ago",
        platform: "News & blogs",
        excerpt: "Column questioning leadership suitability ranking #3 on NewsNow.",
      },
    ],
    mentions: [
      {
        id: "sw-m1",
        time: "11 mins ago",
        platform: "Instagram",
        sentiment: "Negative",
        category: "Harassment",
        message: "Report Sarah! Players like her shouldn’t wear the armband again.",
      },
      {
        id: "sw-m2",
        time: "33 mins ago",
        platform: "Twitter",
        sentiment: "Positive",
        category: "Support",
        message: "Captain Sarah is class. That assist number speaks for itself.",
      },
      {
        id: "sw-m3",
        time: "1 hour ago",
        platform: "YouTube",
        sentiment: "Neutral",
        category: "Analysis",
        message:
          "Tactical review showing Sarah’s work rate covering the entire midfield triangle.",
      },
    ],
    supportTeam: ["Club psychologist", "Player liaison", "Commercial manager"],
  },
  {
    id: "alex-thompson",
    name: "Alex Thompson",
    jersey: 4,
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/83d1f0b2085e491b6e5a80dcb4c38d8a810892af?width=192",
    verified: false,
    position: "Center Back",
    club: "Coastline FC",
    location: "Brighton, United Kingdom",
    nationality: "Scotland",
    reputationScore: 72,
    reputationDelta: "-0.6% vs last week",
    reputationDeltaTone: "text-rose-600",
    riskLevel: "Moderate",
    riskTone: "text-amber-600",
    watchers: 14,
    upcomingFixture: "vs Seaside Albion • Fri 8:00pm BST",
    summary:
      "Defensive leader returning from injury. Sentiment driven by comeback storyline and a controversial interview on club ambition.",
    sentiment: {
      positive: 54,
      neutral: 31,
      negative: 15,
      trend: "-0.9% positive",
      trendTone: "text-rose-600",
    },
    metrics: [
      {
        label: "Reputation score",
        value: "72",
        helper: "Steady climb post-injury",
        icon: "trend",
        tone: "text-slate-600",
      },
      {
        label: "Active incidents",
        value: "1",
        helper: "Post-match interview backlash",
        icon: "shield",
        tone: "text-amber-600",
      },
      {
        label: "Positive share",
        value: "54%",
        helper: "Fan podcasts debating leadership",
        icon: "sentiment",
        tone: "text-slate-600",
      },
      {
        label: "Audience reach",
        value: "2.1M",
        helper: "Regional + club community",
        icon: "audience",
        tone: "text-sky-600",
      },
    ],
    topics: ["Comeback tour", "Leadership claims", "Injury recovery"],
    alerts: [
      {
        id: "at-1",
        title: "Escalated physical threat comment",
        severity: "Critical",
        time: "42 mins ago",
        platform: "Facebook",
        excerpt: "User threatened to confront Alex post-training.",
        triageId: "3",
      },
      {
        id: "at-2",
        title: "Podcast criticism trending",
        severity: "Medium",
        time: "1 hour ago",
        platform: "Podcast clip",
        excerpt: "Hosts calling for benching gaining 28k listens.",
      },
    ],
    mentions: [
      {
        id: "at-m1",
        time: "16 mins ago",
        platform: "Facebook",
        sentiment: "Negative",
        category: "Threat",
        message: "Thompson won’t want to see us outside the training ground. Enough is enough.",
      },
      {
        id: "at-m2",
        time: "24 mins ago",
        platform: "Twitter",
        sentiment: "Neutral",
        category: "Discussion",
        message: "Debate on whether Alex should captain when the skipper is out.",
      },
      {
        id: "at-m3",
        time: "58 mins ago",
        platform: "Fan forum",
        sentiment: "Positive",
        category: "Support",
        message: "Loved Alex’s return. Brought calmness we were missing all season.",
      },
    ],
    supportTeam: ["Security officer", "Club media lead", "Performance coach"],
  },
  {
    id: "david-smith",
    name: "David Smith",
    jersey: 1,
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/3f7a0c31c4969006cc77d635d1dfc7766d0d2a73?width=192",
    verified: false,
    position: "Goalkeeper",
    club: "Riverside Athletic",
    location: "London, United Kingdom",
    nationality: "Wales",
    reputationScore: 69,
    reputationDelta: "+0.5% vs last week",
    reputationDeltaTone: "text-emerald-600",
    riskLevel: "High",
    riskTone: "text-red-600",
    watchers: 21,
    upcomingFixture: "vs Southport United • Mon 8:15pm BST",
    summary:
      "Shot-stopper under scrutiny after conceding late equaliser. Defensive unit rallying, but doxxing attempt detected overnight.",
    sentiment: {
      positive: 48,
      neutral: 27,
      negative: 25,
      trend: "-2.4% positive",
      trendTone: "text-rose-600",
    },
    metrics: [
      {
        label: "Reputation score",
        value: "69",
        helper: "Holding steady post-draw",
        icon: "trend",
        tone: "text-slate-600",
      },
      {
        label: "Active incidents",
        value: "4",
        helper: "Doxxing + abuse reports",
        icon: "shield",
        tone: "text-rose-600",
      },
      {
        label: "Positive share",
        value: "48%",
        helper: "Club statement balancing narrative",
        icon: "sentiment",
        tone: "text-slate-600",
      },
      {
        label: "Audience reach",
        value: "5.6M",
        helper: "Keeper union & pundit chatter",
        icon: "audience",
        tone: "text-sky-600",
      },
    ],
    topics: ["Late equaliser fallout", "Doxxing attempt", "Keeper union support"],
    alerts: [
      {
        id: "ds-1",
        title: "Sensitive address shared on forum",
        severity: "Critical",
        time: "9 mins ago",
        platform: "Fan forum",
        excerpt: "Anonymous post sharing partial home details—content removed, monitoring replicas.",
        triageId: "5",
      },
      {
        id: "ds-2",
        title: "Radio debate questioning commitment",
        severity: "Medium",
        time: "47 mins ago",
        platform: "Talk radio",
        excerpt: "Call-in segment trending locally with #BenchSmith.",
      },
    ],
    mentions: [
      {
        id: "ds-m1",
        time: "5 mins ago",
        platform: "Fan forum",
        sentiment: "Negative",
        category: "Doxxing",
        message: "Pretty sure Smith still lives near Riverside school. Anyone got the exact number?",
      },
      {
        id: "ds-m2",
        time: "28 mins ago",
        platform: "Twitter",
        sentiment: "Positive",
        category: "Support",
        message: "Goalkeepers union behind David Smith. Mistakes happen—still our #1.",
      },
      {
        id: "ds-m3",
        time: "1 hour ago",
        platform: "Podcast",
        sentiment: "Neutral",
        category: "Analysis",
        message: "Breaking down Smith’s distribution numbers vs league average this season.",
      },
    ],
    supportTeam: ["Home security detail", "Club welfare officer", "Social media manager"],
  },
];

const severityBadgeClasses: Record<PlayerAlert["severity"], string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-emerald-100 text-emerald-700",
};

const PlayerCards = ({ onSelect }: { onSelect: (id: string) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {players.map((player) => (
      <button
        key={player.id}
        onClick={() => onSelect(player.id)}
        className="group bg-white rounded-xl border border-dashboard-border shadow-sm p-6 text-left transition hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-16 h-16 rounded-full border-4 border-blue-50 object-cover"
            />
            {player.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-[3px] border-white flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                {player.name}
              </h3>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                #{player.jersey}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {player.position} • {player.club}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1"><Building2 className="w-3 h-3" />{player.club}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{player.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-blue-50/70 p-3">
            <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Reputation</p>
            <p className="mt-1 text-xl font-semibold text-blue-900">{player.reputationScore}</p>
            <p className={`text-xs font-medium ${player.reputationDeltaTone}`}>{player.reputationDelta}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Risk level</p>
            <p className={`mt-1 text-sm font-semibold ${player.riskTone}`}>{player.riskLevel}</p>
            <p className="text-xs text-slate-500">{player.watchers.toLocaleString()} watchers</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-500" /> Sentiment snapshot
          </p>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-700">
            <span className="font-semibold text-emerald-600">{player.sentiment.positive}%</span>
            <span className="text-slate-400">positive</span>
            <span className="font-semibold text-slate-500">{player.sentiment.neutral}%</span>
            <span className="text-slate-400">neutral</span>
            <span className="font-semibold text-rose-600">{player.sentiment.negative}%</span>
            <span className="text-slate-400">negative</span>
          </div>
        </div>
      </button>
    ))}
  </div>
);

const PlayerDetail = ({ player, onBack }: { player: PlayerProfile; onBack: () => void }) => {
  const sentimentSlices = useMemo(
    () => [
      { label: "Positive", value: player.sentiment.positive, color: "bg-emerald-500" },
      { label: "Neutral", value: player.sentiment.neutral, color: "bg-amber-400" },
      { label: "Negative", value: player.sentiment.negative, color: "bg-rose-500" },
    ],
    [player.sentiment.negative, player.sentiment.neutral, player.sentiment.positive],
  );

  const sentimentTotal = sentimentSlices.reduce((acc, slice) => acc + slice.value, 0);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" /> Back to players directory
      </button>

      <div className="bg-white rounded-2xl border border-dashboard-border shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={player.avatar}
                alt={player.name}
                className="w-24 h-24 rounded-full border-4 border-blue-50 object-cover"
              />
              {player.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{player.name}</h1>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full">
                  #{player.jersey}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {player.position} • {player.club} • {player.nationality}
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2"><Building2 className="w-4 h-4" />{player.club}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{player.location}</span>
              </div>
              <p className="mt-4 text-sm text-gray-700 leading-relaxed max-w-2xl">{player.summary}</p>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:ml-auto flex flex-col sm:flex-row lg:flex-col gap-4">
            <div className="rounded-xl bg-blue-50 px-5 py-4">
              <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Reputation score</p>
              <p className="mt-2 text-3xl font-semibold text-blue-900">{player.reputationScore}</p>
              <p className={`text-sm font-medium ${player.reputationDeltaTone}`}>{player.reputationDelta}</p>
            </div>
            <div className="rounded-xl bg-rose-50 px-5 py-4">
              <p className="text-xs uppercase tracking-wide text-rose-600 font-semibold">Risk level</p>
              <p className={`mt-2 text-lg font-semibold ${player.riskTone}`}>{player.riskLevel}</p>
              <p className="text-xs text-rose-500">
                {player.watchers.toLocaleString()} stakeholders watching
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Upcoming fixture</p>
            <p className="mt-2 text-sm font-medium text-slate-800">{player.upcomingFixture}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Sentiment trend</p>
            <p className="mt-2 text-sm font-medium text-slate-800">
              {player.sentiment.positive}% positive share
            </p>
            <p className={`text-xs font-medium ${player.sentiment.trendTone}`}>{player.sentiment.trend}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Support network</p>
            <p className="mt-2 text-sm font-medium text-slate-800">
              {player.supportTeam.join(" • ")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {player.metrics.map((metric) => {
            const Icon = metricIconMap[metric.icon];
            return (
              <div key={metric.label} className="bg-white rounded-xl border border-dashboard-border shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{metric.value}</p>
                    <p className={`text-xs font-medium ${metric.tone}`}>{metric.helper}</p>
                  </div>
                  <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Sentiment distribution</h2>
              <p className={`text-xs font-medium ${player.sentiment.trendTone}`}>
                {player.sentiment.trend}
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-5 space-y-4">
            {sentimentSlices.map((slice) => {
              const percentage = sentimentTotal ? Math.round((slice.value / sentimentTotal) * 100) : 0;
              return (
                <div key={slice.label}>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{slice.label}</span>
                    <span className="font-semibold text-slate-900">{slice.value}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`${slice.color} h-2`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" /> Active threat alerts
              </h2>
              <p className="text-xs text-gray-500">Latest high-severity escalations tracked for this player</p>
            </div>
            <Link
              to="/triage-queue"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View triage queue
            </Link>
          </div>

          <div className="space-y-4">
            {player.alerts.map((alert) => (
              <Link
                key={alert.id}
                to={alert.triageId ? `/triage-queue/${alert.triageId}` : "/triage-queue"}
                className="block rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${severityBadgeClasses[alert.severity]}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-slate-500">{alert.time}</span>
                      <span className="text-xs text-slate-400">{alert.platform}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{alert.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{alert.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> Focus topics
          </h2>
          <p className="text-xs text-gray-500 mb-4">Drivers behind current sentiment and monitoring priorities</p>
          <div className="flex flex-wrap gap-2">
            {player.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
              Support network
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {player.supportTeam.map((member) => (
                <li key={member} className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-dashboard-border shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500" /> Recent conversation intelligence
            </h2>
            <p className="text-xs text-gray-500">
              Prioritised public posts and analysis-ready transcripts for the last 2 hours
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Platform</th>
                <th className="px-6 py-3">Sentiment</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Message snippet</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {player.mentions.map((mention) => (
                <tr key={mention.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">{mention.time}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{mention.platform}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        mention.sentiment === "Positive"
                          ? "bg-emerald-50 text-emerald-600"
                          : mention.sentiment === "Negative"
                          ? "bg-rose-50 text-rose-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {mention.sentiment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                      {mention.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{mention.message}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3 text-xs font-semibold">
                      <Link to="/triage-queue" className="text-blue-600 hover:text-blue-700">
                        Review
                      </Link>
                      <button className="text-slate-500 hover:text-slate-700">Dismiss</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function Players() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const selectedPlayer = selectedPlayerId
    ? players.find((player) => player.id === selectedPlayerId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation />
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Player Safety Intelligence</h1>
            <p className="text-gray-600">
              Explore sentiment health, threat alerts, and oversight details for every player in your roster.
            </p>
          </div>
          {selectedPlayer && (
            <button
              onClick={() => setSelectedPlayerId(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" /> Back to player grid
            </button>
          )}
        </div>

        {!selectedPlayer ? (
          <PlayerCards onSelect={setSelectedPlayerId} />
        ) : (
          <PlayerDetail player={selectedPlayer} onBack={() => setSelectedPlayerId(null)} />
        )}
      </div>
    </div>
  );
}
