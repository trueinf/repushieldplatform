import Navigation from "../components/Navigation";
import { Plus, Download, ChevronRight, Search, Edit2, Copy, Play, Power, AlertTriangle, Bell, Users, ClipboardList } from "lucide-react";
import { useMemo, useState } from "react";

function StatusBadge({ label, tone }: { label: string; tone: "active" | "inactive" }) {
  const classes =
    tone === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-800";
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes}`}>{label}</span>;
}

function SeverityDot({ color }: { color: string }) {
  return <span className={`inline-block w-3 h-3 rounded-full ${color}`} />;
}

export default function AdminPage() {
  const [samplePost, setSamplePost] = useState("");
  const jsonOutput = useMemo(
    () =>
      JSON.stringify(
        {
          sentiment: samplePost ? "negative" : "neutral",
          threat_level: samplePost ? "high" : "low",
          confidence: samplePost ? 0.94 : 0.12,
          entities: samplePost ? ["Marcus Johnson"] : [],
        },
        null,
        2
      ),
    [samplePost]
  );

  const rows = [
    {
      name: "Threat Detection v2.1",
      description: "Primary threat classification prompt",
      version: "2.1.4",
      status: "Active" as const,
      createdBy: "Sarah Chen",
      lastModified: "2 hours ago",
      actions: ["Edit", "Test", "Duplicate", "Deactivate"],
    },
    {
      name: "Sentiment Analysis",
      description: "Post sentiment classification",
      version: "1.8.2",
      status: "Active" as const,
      createdBy: "Mike Johnson",
      lastModified: "1 day ago",
      actions: ["Edit", "Test", "Duplicate", "Deactivate"],
    },
    {
      name: "Entity Recognition",
      description: "Player and club identification",
      version: "1.5.1",
      status: "Inactive" as const,
      createdBy: "Alex Rodriguez",
      lastModified: "3 days ago",
      actions: ["Edit", "Test", "Duplicate", "Activate"],
    },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex gap-6">
          {/* Left admin sidebar */}
          <aside className="w-64 bg-white border border-dashboard-border rounded-lg h-fit shrink-0">
            <div className="px-6 py-4 border-b border-gray-200 text-gray-900 font-semibold">Admin Console</div>
            <nav className="p-4 space-y-2">
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-500 text-white" href="#">
                <ClipboardList className="w-5 h-5" />
                <span>Prompt Manager</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700" href="#">
                <Bell className="w-4 h-4" />
                <span>Source Manager</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700" href="#">
                <Users className="w-5 h-5" />
                <span>Entity Manager</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700" href="#">
                <Play className="w-4 h-4" />
                <span>Workflow Manager</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700" href="#">
                <Users className="w-4 h-4" />
                <span>User & Roles</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700" href="#">
                <ClipboardList className="w-4 h-4" />
                <span>Audit Logs</span>
              </a>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-6">
            {/* Header */}
            <div className="bg-white border border-dashboard-border rounded-lg">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Prompt Manager</h1>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>Admin Console</span>
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-gray-900">Prompt Manager</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4" /> Add Prompt
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Export
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-6 flex items-center gap-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Search prompts..." />
                </div>
              </div>

              {/* Table */}
              <div className="px-6 pb-6">
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Prompt Name</th>
                        <th className="px-6 py-3">Version</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Created By</th>
                        <th className="px-6 py-3">Last Modified</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {rows.map((r, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 align-top">
                            <div className="font-medium text-gray-900">{r.name}</div>
                            <div className="text-sm text-gray-500">{r.description}</div>
                          </td>
                          <td className="px-6 py-4 align-top text-gray-900">{r.version}</td>
                          <td className="px-6 py-4 align-top">
                            <StatusBadge label={r.status} tone={r.status === "Active" ? "active" : "inactive"} />
                          </td>
                          <td className="px-6 py-4 align-top text-gray-900">{r.createdBy}</td>
                          <td className="px-6 py-4 align-top text-gray-500">{r.lastModified}</td>
                          <td className="px-6 py-4 align-top">
                            <div className="flex flex-wrap gap-3 text-sm">
                              <button className="text-blue-600 hover:underline inline-flex items-center gap-1"><Edit2 className="w-4 h-4" /> Edit</button>
                              <button className="text-green-600 hover:underline inline-flex items-center gap-1"><Play className="w-4 h-4" /> Test</button>
                              <button className="text-gray-600 hover:underline inline-flex items-center gap-1"><Copy className="w-4 h-4" /> Duplicate</button>
                              {r.actions.includes("Deactivate") ? (
                                <button className="text-red-600 hover:underline inline-flex items-center gap-1"><Power className="w-4 h-4" /> Deactivate</button>
                              ) : (
                                <button className="text-green-600 hover:underline inline-flex items-center gap-1"><Power className="w-4 h-4" /> Activate</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Test Console */}
            <div className="bg-white border border-dashboard-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Console</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sample Post</label>
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Paste a sample post here to test the prompt..."
                    value={samplePost}
                    onChange={(e) => setSamplePost(e.target.value)}
                  />
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Run Test</button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">JSON Output</label>
                  <pre className="w-full h-32 p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm overflow-auto">{jsonOutput}</pre>
                </div>
              </div>
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="w-80 bg-white border border-dashboard-border rounded-lg p-6 space-y-8">
            {/* System Health */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><SeverityDot color="bg-green-500" /><span>Twitter API</span></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><SeverityDot color="bg-orange-500" /><span>Instagram API</span></div>
                  <span className="text-xs text-gray-500">Rate Limited</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><SeverityDot color="bg-green-500" /><span>AI Model</span></div>
                  <span className="text-xs text-gray-500">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><SeverityDot color="bg-red-500" /><span>Reddit API</span></div>
                  <span className="text-xs text-gray-500">Disconnected</span>
                </div>
              </div>
            </div>

            {/* Recent Changes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Changes</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Prompt updated</div>
                      <div className="text-xs text-gray-500">Threat Detection v2.1.4 activated</div>
                      <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">User added</div>
                      <div className="text-xs text-gray-500">New analyst: Emma Wilson</div>
                      <div className="text-xs text-gray-400 mt-1">4 hours ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Player added</div>
                      <div className="text-xs text-gray-500">David Silva - Manchester City</div>
                      <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Issues */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Issues</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-red-200 bg-red-50">
                  <div className="flex items-center gap-2 text-red-800 font-medium text-sm">
                    <AlertTriangle className="w-4 h-4" /> Reddit API Down
                  </div>
                  <div className="mt-1 text-xs text-red-600">Authentication failed - requires token</div>
                  <div className="text-xs text-red-600">refresh</div>
                </div>
                <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                  <div className="flex items-center gap-2 text-yellow-800 font-medium text-sm">
                    <AlertTriangle className="w-4 h-4" /> Rate Limit Warning
                  </div>
                  <div className="mt-1 text-xs text-yellow-700">Instagram API approaching daily limit</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
