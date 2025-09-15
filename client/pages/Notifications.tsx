import { useState } from "react";
import { AlertTriangle, Bell, TrendingUp, Settings, FileText, Check } from "lucide-react";
import Navigation from "../components/Navigation";

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const notifications = [
    {
      id: "1",
      type: "Threat Alert",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      title: "Violent threat flagged against Marcus Johnson",
      content: 'Post content: "I\'m going to find Marcus Johnson and make him pay..." - Confidence: 94%',
      badge: { text: "Threat Alert", bg: "bg-red-100 text-red-800" },
      meta: ["Marcus Johnson", "Twitter", "2 minutes ago"],
      priority: "high",
      isUnread: true,
      actions: ["Mark Read", "Archive"]
    },
    {
      id: "2",
      type: "Source Issue",
      icon: Bell,
      iconColor: "text-orange-500",
      title: "Instagram data source disconnected",
      content: "API rate limit exceeded. Data collection paused since 15:30. Requires immediate attention.",
      badge: { text: "Source Issue", bg: "bg-orange-100 text-orange-800" },
      meta: ["Instagram API", "15 minutes ago"],
      priority: "high",
      isUnread: true,
      actions: ["Mark Read", "Archive"]
    },
    {
      id: "3",
      type: "Pattern Alert",
      icon: TrendingUp,
      iconColor: "text-yellow-500",
      title: "New abusive pattern detected",
      content: "Spike in identity attacks targeting Alex Rodriguez. 15 posts in last 2 hours.",
      badge: { text: "Pattern Alert", bg: "bg-yellow-100 text-yellow-800" },
      meta: ["Alex Rodriguez", "Multiple platforms", "1 hour ago"],
      priority: "medium",
      isUnread: true,
      actions: ["Mark Read", "Archive"]
    },
    {
      id: "4",
      type: "System Update",
      icon: Settings,
      iconColor: "text-gray-500",
      title: "AI model updated to version 2.1.4",
      content: "Improved threat detection accuracy. New model deployed successfully across all platforms.",
      badge: { text: "System Update", bg: "bg-gray-100 text-gray-800" },
      meta: ["System", "2 hours ago"],
      priority: "low",
      isUnread: false,
      actions: ["Mark Read", "Archive"]
    },
    {
      id: "5",
      type: "Report",
      icon: FileText,
      iconColor: "text-gray-500",
      title: "Weekly threat report generated",
      content: "Weekly summary: 247 posts analyzed, 18 threats flagged, 5 escalated to authorities.",
      badge: { text: "Report", bg: "bg-gray-100 text-gray-800" },
      meta: ["Automated Report", "3 hours ago"],
      priority: "low",
      isUnread: false,
      actions: ["Download", "Archive"]
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(notifications.map(item => item.id));
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-yellow-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
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
                  <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    12 Unread
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Check className="w-3.5 h-3.5" />
                    Mark All Read
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Export
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
                  <option>All Types</option>
                  <option>Threat Alerts</option>
                  <option>Source Issues</option>
                  <option>Pattern Alerts</option>
                  <option>System Updates</option>
                  <option>Reports</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All Status</option>
                  <option>Unread</option>
                  <option>Read</option>
                  <option>Archived</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search notifications..." 
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
            </div>

            {/* Notifications List */}
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${notification.isUnread ? 'font-medium' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <input 
                        type="checkbox" 
                        className="mt-1 rounded border-gray-300"
                        checked={selectedItems.includes(notification.id)}
                        onChange={(e) => handleSelectItem(notification.id, e.target.checked)}
                      />
                      
                      {/* Priority dot */}
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${getPriorityDot(notification.priority)}`}></div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <IconComponent className={`w-4 h-4 ${notification.iconColor}`} />
                              <h3 className="text-base font-semibold text-gray-900">{notification.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${notification.badge.bg}`}>
                                {notification.badge.text}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{notification.content}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              {notification.meta.map((item, index) => (
                                <span key={index}>{item}</span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            {notification.actions.map((action, index) => (
                              <button 
                                key={index}
                                className={`px-3 py-1 text-sm rounded transition-colors ${
                                  index === 0 ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm border border-dashboard-border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Summary</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">32</div>
                <div className="text-sm text-gray-600">Total Today</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">12</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
            </div>

            {/* By Severity */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-3">By Severity</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Critical</span>
                  </div>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">High</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Medium</span>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Low</span>
                  </div>
                  <span className="text-sm font-medium">9</span>
                </div>
              </div>
            </div>

            {/* By Type */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">By Type</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-sm text-gray-700">Threat Alerts</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-sm text-gray-700">Source Issues</span>
                  </div>
                  <span className="text-sm font-medium">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-sm text-gray-700">System Updates</span>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-sm text-gray-700">Reports</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
