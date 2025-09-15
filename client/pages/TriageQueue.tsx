import { useState } from "react";
import type { SVGProps } from "react";
import { RefreshCw, Twitter, Instagram, Facebook } from "lucide-react";
import Navigation from "../components/Navigation";
import { triageItems } from "../data/triage";

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
      <path
        d="M7 7h10v6H7v6l-4-6V7h4Zm15-4H9v4h11l4 6V3Z"
        fill="currentColor"
      />
    </svg>
  ),
};

export default function TriageQueue() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(triageItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-dashboard-border mr-6">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">Triage Queue</h1>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    24 Critical
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Auto-refresh
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Export All
                  </button>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex items-center gap-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>Last 24h</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All Severity</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Escalated</option>
                  <option>Closed</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All Platforms</option>
                  <option>Twitter</option>
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>TikTok</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All Players</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search posts..." 
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-12 px-4 py-6 text-left">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        checked={selectedItems.length === triageItems.length}
                      />
                    </th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">Severity</th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">Platform</th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">Content</th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">Player/Club</th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">
                      <div>Abuse</div>
                      <div>Type</div>
                    </th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">Confidence</th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-6 text-left text-sm font-medium text-gray-500">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {triageItems.map((item) => {
                    const IconComponent = platformIconComponents[item.platformIcon];
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-6">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                          />
                        </td>
                        <td className="px-4 py-6">
                          <span className={`px-2 py-1 text-xs font-bold text-white rounded ${item.severityBg}`}>
                            {item.severity}
                          </span>
                        </td>
                        <td className="px-4 py-6">
                          <div className="flex items-center gap-2">
                            {IconComponent && (
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            )}
                            <span className="text-sm text-gray-600">{item.platformHandle}</span>
                          </div>
                        </td>
                        <td className="px-4 py-6 max-w-xs">
                          <p className="text-sm text-gray-900 truncate">{item.content}</p>
                        </td>
                        <td className="px-4 py-6">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {item.player}
                          </span>
                        </td>
                        <td className="px-4 py-6">
                          <span className={`px-2 py-1 text-xs rounded-full ${item.abuseTypeBg}`}>
                            {item.abuseType}
                          </span>
                        </td>
                        <td className="px-4 py-6">
                          <span className="text-sm font-medium text-gray-900">{item.confidence}</span>
                        </td>
                        <td className="px-4 py-6">
                          <span className={`px-2 py-1 text-xs rounded-full ${item.statusBg}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-6">
                          <div className="text-sm text-gray-600">{item.time}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm border border-dashboard-border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Queue Statistics</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">47</div>
                <div className="text-sm text-gray-600">Open Posts</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-sm text-gray-600">Critical</div>
              </div>
            </div>

            {/* By Severity */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-3">By Severity</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Critical</span>
                  </div>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">High</span>
                  </div>
                  <span className="text-sm font-medium">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Medium</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
            </div>

            {/* By Platform */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-3">By Platform</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Twitter</span>
                  </div>
                  <span className="text-sm font-medium">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span className="text-sm text-gray-700">Instagram</span>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Facebook</span>
                  </div>
                  <span className="text-sm font-medium">10</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="w-4 h-4">
                      <path d="M14 6.55969C12.6242 6.56298 11.2821 6.13392 10.1634 5.33313V10.9181C10.163 11.9525 9.84686 12.9622 9.25718 13.812C8.6675 14.6619 7.83242 15.3115 6.86359 15.6739C5.89476 16.0364 4.83838 16.0944 3.83568 15.8402C2.83298 15.5861 1.93177 15.0319 1.25255 14.2517C0.573333 13.4716 0.148479 12.5026 0.0348009 11.4745C-0.0788776 10.4464 0.124037 9.40803 0.616413 8.49833C1.10879 7.58863 1.86716 6.85093 2.79011 6.38387C3.71307 5.91681 4.75661 5.74265 5.78122 5.88469V8.69375C5.31236 8.54627 4.80889 8.55071 4.3427 8.70644C3.87651 8.86217 3.47146 9.16123 3.18537 9.56089C2.89929 9.96056 2.7468 10.4404 2.7497 10.9319C2.75259 11.4234 2.91072 11.9014 3.20149 12.2977C3.49227 12.694 3.90082 12.9882 4.36881 13.1385C4.83679 13.2887 5.34028 13.2872 5.80737 13.1342C6.27447 12.9812 6.68127 12.6845 6.9697 12.2866C7.25812 11.8886 7.41342 11.4096 7.41341 10.9181V0H10.1634C10.1615 0.232231 10.181 0.464146 10.2215 0.692813C10.3171 1.20328 10.5158 1.68888 10.8055 2.11992C11.0951 2.55096 11.4697 2.91837 11.9062 3.19969C12.5273 3.61034 13.2554 3.82922 14 3.82906V6.55969Z" fill="black"/>
                    </svg>
                    <span className="text-sm text-gray-700">TikTok</span>
                  </div>
                  <span className="text-sm font-medium">7</span>
                </div>
              </div>
            </div>

            {/* Most Flagged Players */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Most Flagged Players</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Marcus Johnson</span>
                  <span className="text-sm font-medium text-red-600">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Alex Rodriguez</span>
                  <span className="text-sm font-medium text-red-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">David Smith</span>
                  <span className="text-sm font-medium text-red-600">9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
