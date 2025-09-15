import {
  Calendar,
  Globe,
  Share2,
  Smile,
  Users,
  Building2,
  ClipboardList,
  Settings,
  TrendingUp,
  AlertTriangle,
  Flag,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { triageItems } from "../data/triage";

type SentimentTrendPoint = {
  label: string;
  positive: number;
  neutral: number;
  negative: number;
  totalPosts: number;
};

const sentimentTrendData: SentimentTrendPoint[] = [
  { label: "Mon", positive: 64, neutral: 26, negative: 10, totalPosts: 3200 },
  { label: "Tue", positive: 61, neutral: 28, negative: 11, totalPosts: 3350 },
  { label: "Wed", positive: 66, neutral: 24, negative: 10, totalPosts: 3420 },
  { label: "Thu", positive: 69, neutral: 21, negative: 10, totalPosts: 3580 },
  { label: "Fri", positive: 71, neutral: 20, negative: 9, totalPosts: 3760 },
  { label: "Sat", positive: 73, neutral: 17, negative: 10, totalPosts: 3620 },
  { label: "Sun", positive: 75, neutral: 16, negative: 9, totalPosts: 3480 },
];

const sentimentPalette = {
  positive: {
    line: "#22c55e",
    gradient: ["rgba(34, 197, 94, 0.18)", "rgba(34, 197, 94, 0.02)"],
    dot: "#16a34a",
  },
  neutral: {
    line: "#facc15",
    gradient: ["rgba(250, 204, 21, 0.16)", "rgba(250, 204, 21, 0.02)"],
    dot: "#ca8a04",
  },
  negative: {
    line: "#f87171",
    gradient: ["rgba(248, 113, 113, 0.22)", "rgba(248, 113, 113, 0.03)"],
    dot: "#ef4444",
  },
} as const;

const severityAccent = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-emerald-500",
} as const;

const severitySurface = {
  Critical: "bg-red-50",
  High: "bg-orange-50",
  Medium: "bg-yellow-50",
  Low: "bg-emerald-50",
} as const;

const featuredAlertIds = ["1", "2", "3"];
const featuredAlertItems = featuredAlertIds
  .map((id) => triageItems.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

const SentimentTrendsChart = () => {
  const chartWidth = 620;
  const chartHeight = 260;
  const paddingX = 28;
  const paddingY = 22;
  const plotWidth = chartWidth - paddingX * 2;
  const plotHeight = chartHeight - paddingY * 2;
  const maxValue = 100;

  const getCoordinates = (value: number, index: number, total: number) => {
    const x = total <= 1 ? plotWidth / 2 : (index / (total - 1)) * plotWidth;
    const y = plotHeight - (value / maxValue) * plotHeight;
    return { x, y };
  };

  const createLinePath = (values: number[]) =>
    values
      .map((value, index) => {
        const { x, y } = getCoordinates(value, index, values.length);
        const command = index === 0 ? "M" : "L";
        return `${command}${(x + paddingX).toFixed(2)},${(y + paddingY).toFixed(2)}`;
      })
      .join(" ");

  const createAreaPath = (values: number[]) => {
    if (!values.length) {
      return "";
    }

    const line = values
      .map((value, index) => {
        const { x, y } = getCoordinates(value, index, values.length);
        const command = index === 0 ? "M" : "L";
        return `${command}${(x + paddingX).toFixed(2)},${(y + paddingY).toFixed(2)}`;
      })
      .join(" ");

    const last = getCoordinates(values[values.length - 1], values.length - 1, values.length);
    const first = getCoordinates(values[0], 0, values.length);

    return `${line} L${(last.x + paddingX).toFixed(2)},${(plotHeight + paddingY).toFixed(2)} L${(first.x + paddingX).toFixed(2)},${(plotHeight + paddingY).toFixed(2)} Z`;
  };

  const horizontalGuides = [25, 50, 75];

  const positiveValues = sentimentTrendData.map((point) => point.positive);
  const neutralValues = sentimentTrendData.map((point) => point.neutral);
  const negativeValues = sentimentTrendData.map((point) => point.negative);

  const stats = [
    {
      label: "Positive",
      value: "+9.4%",
      helper: "Week-over-week lift",
      tone: "text-emerald-600",
      background: "bg-emerald-50",
    },
    {
      label: "Neutral",
      value: "-1.2%",
      helper: "Stable conversations",
      tone: "text-amber-600",
      background: "bg-amber-50",
    },
    {
      label: "Negative",
      value: "-3.8%",
      helper: "Improving sentiment",
      tone: "text-rose-600",
      background: "bg-rose-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-64"
          role="img"
          aria-label="Sentiment trend line chart for the last 7 days"
        >
          <defs>
            <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sentimentPalette.positive.gradient[0]} />
              <stop offset="100%" stopColor={sentimentPalette.positive.gradient[1]} />
            </linearGradient>
            <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sentimentPalette.neutral.gradient[0]} />
              <stop offset="100%" stopColor={sentimentPalette.neutral.gradient[1]} />
            </linearGradient>
            <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sentimentPalette.negative.gradient[0]} />
              <stop offset="100%" stopColor={sentimentPalette.negative.gradient[1]} />
            </linearGradient>
            <filter id="cardGlow" x="-30%" y="-50%" width="160%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#cardGlow)">
            <path
              d={createAreaPath(positiveValues)}
              fill="url(#positiveGradient)"
              stroke="none"
            />
            <path d={createAreaPath(neutralValues)} fill="url(#neutralGradient)" stroke="none" />
            <path d={createAreaPath(negativeValues)} fill="url(#negativeGradient)" stroke="none" />
          </g>

          <g>
            {horizontalGuides.map((value) => {
              const y = paddingY + plotHeight - (value / maxValue) * plotHeight;
              return (
                <line
                  key={value}
                  x1={paddingX}
                  x2={chartWidth - paddingX}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 6"
                  strokeWidth={1}
                />
              );
            })}
          </g>

          <path
            d={createLinePath(positiveValues)}
            fill="none"
            stroke={sentimentPalette.positive.line}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d={createLinePath(neutralValues)}
            fill="none"
            stroke={sentimentPalette.neutral.line}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d={createLinePath(negativeValues)}
            fill="none"
            stroke={sentimentPalette.negative.line}
            strokeWidth={3}
            strokeLinecap="round"
          />

          {sentimentTrendData.map((point, index) => {
            const { x: xPositive, y: yPositive } = getCoordinates(point.positive, index, sentimentTrendData.length);
            const { x: xNeutral, y: yNeutral } = getCoordinates(point.neutral, index, sentimentTrendData.length);
            const { x: xNegative, y: yNegative } = getCoordinates(point.negative, index, sentimentTrendData.length);

            return (
              <g key={point.label}>
                <circle
                  cx={xPositive + paddingX}
                  cy={yPositive + paddingY}
                  r={4.5}
                  fill="#ffffff"
                  stroke={sentimentPalette.positive.dot}
                  strokeWidth={2.2}
                />
                <circle
                  cx={xNeutral + paddingX}
                  cy={yNeutral + paddingY}
                  r={4.5}
                  fill="#ffffff"
                  stroke={sentimentPalette.neutral.dot}
                  strokeWidth={2.2}
                />
                <circle
                  cx={xNegative + paddingX}
                  cy={yNegative + paddingY}
                  r={4.5}
                  fill="#ffffff"
                  stroke={sentimentPalette.negative.dot}
                  strokeWidth={2.2}
                />

                <text
                  x={xPositive + paddingX}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                  fontWeight={500}
                >
                  {point.label}
                </text>
              </g>
            );
          })}

          <g>
            <text x={paddingX} y={paddingY - 6} fontSize="12" fill="#94a3b8" fontWeight={500}>
              Conversation Volume
            </text>
            <text
              x={chartWidth - paddingX}
              y={paddingY - 6}
              fontSize="12"
              fill="#0f172a"
              fontWeight={600}
              textAnchor="end"
            >
              {sentimentTrendData.reduce((acc, point) => acc + point.totalPosts, 0).toLocaleString()} posts
            </text>
          </g>
        </svg>

        <div className="absolute inset-x-10 -bottom-8 grid grid-cols-3 gap-4">
          {sentimentTrendData.slice(-3).map((point) => (
            <div
              key={point.label}
              className="rounded-xl border border-white/70 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {point.label}
              </p>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {point.positive}%
                    <span className="ml-1 text-xs font-medium text-emerald-500">positive</span>
                  </p>
                  <p className="text-xs text-slate-500">{point.totalPosts.toLocaleString()} mentions</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>Neutral {point.neutral}%</p>
                  <p>Negative {point.negative}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
        {stats.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border border-dashboard-border ${item.background} px-4 py-3`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</p>
            <p className={`mt-2 text-xl font-semibold ${item.tone}`}>{item.value}</p>
            <p className="text-xs text-gray-500">{item.helper}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation />

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor reputation threats and manage player safety across all platforms</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>Last 7 days</option>
                <option>Last 14 days</option>
                <option>Last 30 days</option>
                <option>Quarter to date</option>
                <option>Year to date</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>All Sentiment</option>
                <option>Positive only</option>
                <option>Neutral only</option>
                <option>Negative only</option>
                <option>Mixed sentiment</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>All Platforms</option>
                <option>Social media</option>
                <option>Sports forums</option>
                <option>News & blogs</option>
                <option>Streaming chat</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>All Countries</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Spain</option>
                <option>Brazil</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Posts */}
          <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">24,592</h3>
            <p className="text-sm text-gray-600">Total Posts Ingested</p>
          </div>

          {/* Abusive Content */}
          <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-600">+3%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">8.4%</h3>
            <p className="text-sm text-gray-600">Abusive Content</p>
          </div>

          {/* Violent Threats */}
          <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flag className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-orange-600">+7</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">127</h3>
            <p className="text-sm text-gray-600">Violent Threats Flagged</p>
          </div>

          {/* Top Platforms */}
          <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Top Platforms</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">1. Twitter (45%)</p>
              <p className="text-sm text-gray-600">2. Instagram (32%)</p>
              <p className="text-sm text-gray-600">3. Facebook (23%)</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Sentiment Trends */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-dashboard-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sentiment Trends</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Positive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-600">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Negative</span>
                </div>
              </div>
            </div>
            <SentimentTrendsChart />
          </div>

          {/* High-Severity Alerts */}
          <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">High-Severity Alerts</h3>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">5 Pending</span>
            </div>
            <div className="space-y-4 mb-6">
              {featuredAlertItems.map((alert) => (
                <Link
                  key={alert.id}
                  to={`/triage-queue/${alert.id}`}
                  className={`block rounded-lg border border-transparent ${severitySurface[alert.severity]} p-3 transition hover:border-blue-200 hover:bg-blue-50`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${severityAccent[alert.severity]}`}
                      aria-hidden
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                      <p className="text-xs text-gray-600">Player: {alert.player}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to="/triage-queue"
              className="block w-full bg-gradient-to-r from-repushield-primary to-repushield-secondary text-white py-2 px-4 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity"
            >
              View All Alerts
            </Link>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* View All Players */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </div>
            <h3 className="text-lg font-semibold mb-2">View All Players</h3>
            <p className="text-blue-100 text-sm">Manage player profiles and reputation data</p>
          </div>

          {/* View All Clubs */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </div>
            <h3 className="text-lg font-semibold mb-2">View All Clubs</h3>
            <p className="text-green-100 text-sm">Access club-wide reputation insights</p>
          </div>

          {/* Triage Queue */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Triage Queue</h3>
            <p className="text-orange-100 text-sm">Review and prioritize safety incidents</p>
          </div>

          {/* Admin Console */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Admin Console</h3>
            <p className="text-purple-100 text-sm">System configuration and user management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
