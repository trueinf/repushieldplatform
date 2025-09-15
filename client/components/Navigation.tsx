import { Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const getNavItemClasses = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "text-white bg-gradient-to-r from-repushield-primary to-repushield-secondary px-4 py-2 rounded-lg text-sm font-medium"
      : "text-gray-600 hover:text-gray-900 cursor-pointer text-sm font-medium";
  };

  return (
    <nav className="w-full h-16 bg-white border-b border-dashboard-border shadow-lg flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-repushield-primary to-repushield-secondary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 0.25C9.16172 0.25 9.32344 0.285156 9.47109 0.351953L16.091 3.16094C16.8645 3.48789 17.441 4.25078 17.4375 5.17188C17.4199 8.65938 15.9855 15.0402 9.92813 17.9406C9.34102 18.2219 8.65899 18.2219 8.07188 17.9406C2.01445 15.0402 0.580079 8.65938 0.562501 5.17188C0.558985 4.25078 1.13555 3.48789 1.90899 3.16094L8.53242 0.351953C8.67656 0.285156 8.83828 0.25 9 0.25ZM9 2.59844V15.8875C13.8516 13.5391 15.1559 8.33945 15.1875 5.22109L9 2.59844Z" fill="white"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">RepuShield</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8">
            <Link to="/" className={getNavItemClasses("/")}>
              Dashboard
            </Link>
            <Link to="/feed" className={getNavItemClasses("/feed")}>
              Feed
            </Link>
            <Link to="/players" className={getNavItemClasses("/players")}>
              Players
            </Link>
            <Link to="/triage-queue" className={getNavItemClasses("/triage-queue")}>
              Triage Queue
            </Link>
            <Link to="/notifications" className={getNavItemClasses("/notifications")}>
              Notifications
            </Link>
            <Link to="/admin" className={getNavItemClasses("/admin")}>
              Admin
            </Link>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-4 h-4 text-gray-400" />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 overflow-hidden">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/2b267a5240df6d14e43e58b6ccf5f97f9a97c1db?width=64" alt="User avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  );
}
