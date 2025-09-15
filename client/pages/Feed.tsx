import type { KeyboardEvent, MouseEvent } from "react";
import {
  Calendar,
  Users,
  Building2,
  Share2,
  Smile,
  MoreHorizontal,
  ExternalLink,
  Bookmark,
  Flag,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Navigation from "../components/Navigation";
import { feedPosts, sentimentBadgeClasses, type FeedPost } from "../data/feed";

export default function Feed() {
  const navigate = useNavigate();

  const handleCardClick = (postId: string) => {
    navigate(`/feed/${postId}`);
  };

  const stopPropagation = (event: MouseEvent | KeyboardEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation />

      {/* Filters Section */}
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-dashboard-border shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>

            {/* Player Search */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search players..."
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full"
              />
            </div>

            {/* Club Filter */}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full">
                <option>All Clubs</option>
                <option>Manchester United</option>
                <option>Arsenal</option>
                <option>Chelsea</option>
              </select>
            </div>

            {/* Platform Filters */}
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7665 4.05584C10.7741 4.16244 10.7741 4.26906 10.7741 4.37565C10.7741 7.6269 8.2995 11.3731 3.77665 11.3731C2.38324 11.3731 1.08884 10.9695 0 10.2691C0.197977 10.2919 0.388312 10.2995 0.593906 10.2995C1.74363 10.2995 2.80202 9.91119 3.6472 9.24875C2.56598 9.2259 1.65989 8.51778 1.3477 7.54316C1.5 7.56598 1.65227 7.58122 1.81219 7.58122C2.03299 7.58122 2.25382 7.55075 2.45939 7.49748C1.33249 7.26903 0.487289 6.2792 0.487289 5.08377V5.05332C0.814687 5.23606 1.19543 5.35027 1.59895 5.36548C0.936516 4.92385 0.502523 4.17006 0.502523 3.31726C0.502523 2.86041 0.624328 2.44163 0.837539 2.07615C2.0482 3.56853 3.86801 4.54313 5.90859 4.64975C5.87053 4.46701 5.84768 4.27667 5.84768 4.08631C5.84768 2.73097 6.94413 1.62692 8.30707 1.62692C9.01519 1.62692 9.65477 1.92388 10.104 2.40357C10.6598 2.29698 11.1928 2.09138 11.6649 1.80966C11.4822 2.38074 11.0939 2.86044 10.5837 3.16499C11.0786 3.11171 11.5583 2.97463 12 2.78429C11.665 3.27158 11.2462 3.70557 10.7665 4.05584Z" fill="#1E40AF"/>
                  </svg>
                  Twitter
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.59608 3.80468C4.10546 3.80468 2.90311 5.00703 2.90311 6.49765C2.90311 7.98828 4.10546 9.19062 5.59608 9.19062C7.08671 9.19062 8.28905 7.98828 8.28905 6.49765C8.28905 5.00703 7.08671 3.80468 5.59608 3.80468ZM5.59608 8.24843C4.6328 8.24843 3.8453 7.46328 3.8453 6.49765C3.8453 5.53203 4.63046 4.74687 5.59608 4.74687C6.56171 4.74687 7.34686 5.53203 7.34686 6.49765C7.34686 7.46328 6.55936 8.24843 5.59608 8.24843ZM9.02733 3.69453C9.02733 4.04375 8.74608 4.32265 8.39921 4.32265C8.04999 4.32265 7.77108 4.0414 7.77108 3.69453C7.77108 3.34765 8.05233 3.0664 8.39921 3.0664C8.74608 3.0664 9.02733 3.34765 9.02733 3.69453ZM10.8109 4.33203C10.7711 3.49062 10.5789 2.74531 9.96249 2.13125C9.34843 1.51718 8.60311 1.325 7.76171 1.28281C6.89452 1.23359 4.2953 1.23359 3.42811 1.28281C2.58905 1.32265 1.84374 1.51484 1.22733 2.1289C0.610925 2.74297 0.421082 3.48828 0.378894 4.32968C0.329675 5.19687 0.329675 7.79609 0.378894 8.66328C0.418738 9.50468 0.610925 10.25 1.22733 10.8641C1.84374 11.4781 2.58671 11.6703 3.42811 11.7125C4.2953 11.7617 6.89452 11.7617 7.76171 11.7125C8.60311 11.6727 9.34843 11.4805 9.96249 10.8641C10.5766 10.25 10.7687 9.50468 10.8109 8.66328C10.8601 7.79609 10.8601 5.19922 10.8109 4.33203ZM9.69061 9.59375C9.5078 10.0531 9.15389 10.407 8.69218 10.5922C8.00077 10.8664 6.36014 10.8031 5.59608 10.8031C4.83202 10.8031 3.18905 10.8641 2.49999 10.5922C2.04061 10.4094 1.68671 10.0555 1.50155 9.59375C1.22733 8.90234 1.29061 7.26172 1.29061 6.49765C1.29061 5.73359 1.22968 4.09062 1.50155 3.40156C1.68436 2.94218 2.03827 2.58828 2.49999 2.40312C3.19139 2.1289 4.83202 2.19218 5.59608 2.19218C6.36014 2.19218 8.00311 2.13125 8.69218 2.40312C9.15155 2.58593 9.50546 2.93984 9.69061 3.40156C9.96483 4.09297 9.90155 5.73359 9.90155 6.49765C9.90155 7.26172 9.96483 8.90468 9.69061 9.59375Z" fill="#374151"/>
                  </svg>
                  Instagram
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0156 6.5C12.0156 3.28906 9.41406 0.6875 6.20312 0.6875C2.99219 0.6875 0.390625 3.28906 0.390625 6.5C0.390625 9.40109 2.51617 11.8058 5.29492 12.2422V8.18023H3.81836V6.5H5.29492V5.21938C5.29492 3.76273 6.16211 2.95812 7.49031 2.95812C8.12641 2.95812 8.79156 3.07156 8.79156 3.07156V4.50125H8.05844C7.33656 4.50125 7.11133 4.94937 7.11133 5.40898V6.5H8.72336L8.46555 8.18023H7.11133V12.2422C9.89008 11.8058 12.0156 9.40109 12.0156 6.5Z" fill="#374151"/>
                  </svg>
                  Facebook
                </span>
              </div>
            </div>
          </div>

          {/* Sentiment Filters */}
          <div className="flex items-center gap-2 mb-4">
            <Smile className="w-4 h-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Positive</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Neutral</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Negative</span>
            </div>
          </div>

          {/* Reset Filters */}
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.32617 6.875H1.09375C0.730078 6.875 0.4375 6.58242 0.4375 6.21875V2.71875C0.4375 2.45351 0.596094 2.21289 0.842187 2.11172C1.08828 2.01054 1.36992 2.06523 1.55859 2.2539L2.69609 3.3914C5.09141 1.02617 8.94961 1.03437 11.3312 3.41875C13.7238 5.81133 13.7238 9.68867 11.3312 12.0812C8.93867 14.4738 5.06133 14.4738 2.66875 12.0812C2.32695 11.7395 2.32695 11.1844 2.66875 10.8426C3.01055 10.5008 3.56562 10.5008 3.90742 10.8426C5.61641 12.5516 8.38633 12.5516 10.0953 10.8426C11.8043 9.13359 11.8043 6.36367 10.0953 4.65469C8.39453 2.9539 5.64648 2.9457 3.93477 4.62734L5.05859 5.7539C5.24727 5.94258 5.30195 6.22422 5.20078 6.47031C5.09961 6.7164 4.85898 6.875 4.59375 6.875H1.32617Z" fill="#6B7280"/>
            </svg>
            Reset Filters
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-5">
          {feedPosts.map((post) => (
            <div
              key={post.id}
              className={cn(
                "relative overflow-hidden rounded-xl border border-dashboard-border bg-white p-6 shadow-sm",
                post.severity && "urgent-alert border-red-200"
              )}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(post.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCardClick(post.id);
                }
              }}
            >
              <div className="relative z-10 flex items-start gap-4">
                <input
                  type="checkbox"
                  className="mt-2 h-4 w-4 rounded border border-gray-300"
                  onClick={stopPropagation}
                  onKeyDown={stopPropagation}
                />
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                          post.platformClasses
                        )}
                      >
                        {post.platformInitials}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{post.author}</span>
                          <span className="text-sm text-gray-500">{post.time}</span>
                        </div>
                        <p className="text-xs text-gray-400">{post.platform}</p>
                      </div>
                      {post.severity && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-600/10 px-2 py-1 text-xs font-semibold text-red-700">
                          <Flag className="h-3 w-3" /> Severe security threat
                        </span>
                      )}
                    </div>
                    <button className="text-gray-400 transition hover:text-gray-600" onClick={stopPropagation}>
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="leading-relaxed text-gray-900">{post.message}</p>

                  {post.media && post.media.type === "image" && (
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <img
                        src={post.media.src}
                        alt={post.media.alt}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        sentimentBadgeClasses[post.sentiment]
                      )}
                    >
                      {post.sentiment}
                    </span>
                    {post.badges.map((badge) => (
                      <span
                        key={`${post.id}-${badge.label}`}
                        className={cn("rounded-full px-2 py-1 text-xs font-medium", badge.className)}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-sm text-gray-600 transition hover:text-gray-900"
                      onClick={(event) => {
                        stopPropagation(event);
                        if (post.sourceUrl) {
                          window.open(post.sourceUrl, "_blank", "noreferrer");
                        }
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </button>
                    <button
                      className="flex items-center gap-1 text-sm text-gray-600 transition hover:text-gray-900"
                      onClick={stopPropagation}
                    >
                      <Bookmark className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      className="flex items-center gap-1 text-sm text-gray-600 transition hover:text-gray-900"
                      onClick={stopPropagation}
                    >
                      <EyeOff className="h-4 w-4" />
                      Dismiss
                    </button>
                    <button
                      className="ml-auto flex items-center gap-1 text-sm text-gray-400 transition hover:text-gray-600"
                      onClick={stopPropagation}
                    >
                      Details
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
