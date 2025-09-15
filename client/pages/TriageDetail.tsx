import { useMemo } from "react";
import type { SVGProps } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ExternalLink, ShieldCheck, Twitter, Instagram, Facebook } from "lucide-react";
import Navigation from "../components/Navigation";
import { getTriageItemById, triageItems } from "../data/triage";

const platformIconComponents = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14 6.55969C12.6242 6.56298 11.2821 6.13392 10.1634 5.33313V10.9181C10.163 11.9525 9.84686 12.9622 9.25718 13.812C8.6675 14.6619 7.83242 15.3115 6.86359 15.6739C5.89476 16.0364 4.83838 16.0944 3.83568 15.8402C2.83298 15.5861 1.93177 15.0319 1.25255 14.2517C0.573333 13.4716 0.148479 12.5026 0.0348009 11.4745C-0.0788776 10.4464 0.124037 9.40803 0.616413 8.49833C1.10879 7.58863 1.86716 6.85093 2.79011 6.38387C3.71307 5.91681 4.75661 5.74265 5.78122 5.88469V8.69375C5.31236 8.54627 4.80889 8.55071 4.3427 8.70644C3.87651 8.86217 3.47146 9.16123 3.18537 9.56089C2.89929 9.96056 2.7468 10.4404 2.7497 10.9319C2.75259 11.4234 2.91072 11.9014 3.20149 12.2977C3.49227 12.694 3.90082 12.9882 4.36881 13.1385C4.83679 13.2887 5.34028 13.2872 5.80737 13.1342C6.27447 12.9812 6.68127 12.6845 6.9697 12.2866C7.25812 11.8886 7.41342 11.4096 7.41341 10.9181V0H10.1634C10.1615 0.232231 10.181 0.464146 10.2215 0.692813C10.3171 1.20328 10.5158 1.68888 10.8055 2.11992C11.0951 2.55096 11.4697 2.91837 11.9062 3.19969C12.5273 3.61034 13.2554 3.82922 14 3.82906V6.55969Z"
        fill="currentColor"
      />
    </svg>
  ),
  forums: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 7h10v6H7v6l-4-6V7h4Zm15-4H9v4h11l4 6V3Z" fill="currentColor" />
    </svg>
  ),
};

const getPlatformDetail = (item: typeof triageItems[number]) => {
  const IconComponent = platformIconComponents[item.platformIcon];
  return {
    IconComponent,
    label: item.platform,
  };
};

const TriageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const triageItem = useMemo(() => (id ? getTriageItemById(id) : undefined), [id]);

  if (!triageItem) {
    return (
      <div className="min-h-screen bg-dashboard-bg">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <button
            onClick={() => navigate("/triage-queue")}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-white border border-dashboard-border rounded-xl p-12 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-orange-500 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Alert not found</h1>
            <p className="text-gray-600">This high-severity alert may have been resolved or archived.</p>
          </div>
        </div>
      </div>
    );
  }

  const platform = getPlatformDetail(triageItem);

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation />
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <button
          onClick={() => navigate("/triage-queue")}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Triage queue
        </button>

        <div className="bg-white border border-dashboard-border rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${triageItem.severityBg}`}>
                  {triageItem.severity}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${triageItem.statusBg}`}>
                  {triageItem.status}
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">{triageItem.title}</h1>
              <p className="text-sm text-gray-500 mt-1">Detected {triageItem.time}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              {platform.IconComponent && (
                <platform.IconComponent className="w-5 h-5 text-blue-600" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{triageItem.platform}</p>
                <p className="text-xs text-gray-500">{triageItem.platformHandle}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-8 space-y-8">
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Flagged content</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-gray-900 leading-relaxed">{triageItem.content}</p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Impacted player</p>
                <p className="text-lg font-semibold text-blue-900 mt-1">{triageItem.player}</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Abuse type</p>
                <p className="text-lg font-semibold text-amber-900 mt-1">{triageItem.abuseType}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Model confidence</p>
                <p className="text-lg font-semibold text-emerald-900 mt-1">{triageItem.confidence}</p>
              </div>
            </section>

            {triageItem.attachments && triageItem.attachments.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Artifacts</h2>
                <div className="space-y-3">
                  {triageItem.attachments.map((attachment) => (
                    <a
                      key={attachment.url}
                      href={attachment.url}
                      className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-blue-200 hover:shadow-sm transition"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.label}</p>
                        <p className="text-xs text-gray-500 capitalize">{attachment.type}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </section>
            )}

            {triageItem.notes && triageItem.notes.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Investigation notes</h2>
                <div className="space-y-2">
                  {triageItem.notes.map((note, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 mt-1" />
                      <p className="text-sm text-gray-700">{note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriageDetail;
