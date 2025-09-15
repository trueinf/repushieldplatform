import type { MouseEvent } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  ExternalLink,
  EyeOff,
  Flag,
  ShieldAlert,
} from "lucide-react";
import Navigation from "../components/Navigation";
import { cn } from "@/lib/utils";
import { getFeedPostById, sentimentBadgeClasses } from "../data/feed";

const FeedDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const post = useMemo(() => (id ? getFeedPostById(id) : undefined), [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (post?.sourceUrl) {
      window.open(post.sourceUrl, "_blank", "noreferrer");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-dashboard-bg">
        <Navigation />
        <div className="mx-auto max-w-4xl px-6 py-16">
          <button
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to feed
          </button>
          <div className="rounded-2xl border border-dashboard-border bg-white p-12 text-center shadow-sm">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-amber-500" />
            <h1 className="text-2xl font-semibold text-gray-900">Post not found</h1>
            <p className="mt-2 text-sm text-gray-600">
              This feed item may have been removed or is no longer available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation />
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </button>

        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-dashboard-border bg-white p-8 shadow-sm",
            post.severity && "urgent-alert border-red-200"
          )}
        >
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                    post.platformClasses
                  )}
                >
                  {post.platformInitials}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-900">{post.author}</span>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">{post.platform}</p>
                </div>
                {post.severity && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Severe security threat
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpen}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" /> Open source
                </button>
                <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-300">
                  <Bookmark className="h-4 w-4" /> Save
                </button>
                <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-300">
                  <EyeOff className="h-4 w-4" /> Dismiss
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-gray-900">{post.message}</p>
              {post.media?.type === "image" && (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <img src={post.media.src} alt={post.media.alt} className="h-72 w-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  sentimentBadgeClasses[post.sentiment]
                )}
              >
                {post.sentiment}
              </span>
              {post.badges.map((badge) => (
                <span
                  key={`${post.id}-badge-${badge.label}`}
                  className={cn("rounded-full px-3 py-1 text-xs font-medium", badge.className)}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            {post.severity && (
              <div className="rounded-xl border border-red-200 bg-red-50/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-red-700">
                    <Flag className="h-4 w-4" />
                    <span>Escalate this threat to the triage team immediately.</span>
                  </div>
                  <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700">
                    Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
