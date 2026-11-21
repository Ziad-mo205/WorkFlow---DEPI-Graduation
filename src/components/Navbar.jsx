import { useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { FiSearch, FiMenu } from "react-icons/fi";
import logo from "../assets/Logo.jpeg";
import NotificationsPanel from "./NotificationsPanel";
import { initialNotifications } from "../data/notifications";
import { focusRing } from "../styles/ui";

const pageTitles = [
  { path: "/manager-dashboard", title: "Dashboard" },
  { path: "/admin-dashboard", title: "Dashboard" },
  { path: "/employee-dashboard", title: "Dashboard" },
  { path: "/projects", title: "Projects List" },
  { path: "/projects/:projectId", title: "Project Details" },
  { path: "/tasks", title: "Tasks List" },
  { path: "/tasks/:taskId", title: "Task Details" },
  { path: "/kanban", title: "Kanban Board" },
  { path: "/employees", title: "Employees Management" },
  { path: "/leave-requests", title: "Leave Requests" },
  { path: "/announcements", title: "Announcements" },
  { path: "/profile", title: "Profile" },
  { path: "/settings", title: "Settings" },
];

const navIconBtn = `-m-1.5 flex cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors hover:bg-gray-100 active:bg-gray-200 ${focusRing}`;

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const currentPage = pageTitles.find(({ path }) => matchPath(path, pathname));

  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <nav className="relative flex h-16 items-center justify-between bg-white px-5 lg:px-6">
      <div className="flex items-center lg:gap-26">
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={onMenuClick}
          className={`${navIconBtn} -ml-1.5 text-2xl text-gray-800 hover:text-black lg:hidden`}
        >
          <FiMenu />
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          <img src={logo} alt="WorkFlow logo" className="h-8 w-auto" />
          <span className="text-xl font-bold">
            <span className="text-black">Work</span>
            <span className="text-brand">Flow</span>
          </span>
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-gray-900 lg:static lg:mt-0.5 lg:translate-x-0 lg:text-xl">
          {currentPage?.title}
        </h1>
      </div>

      <div className="flex items-center gap-5 lg:gap-4">
        <div className="hidden h-8 w-72 items-center gap-2 rounded-lg border border-[#ededf0] bg-[#f7f7fa] px-3 text-gray-500 transition-colors focus-within:border-brand focus-within:ring-2 focus-within:ring-[#c7c9f9] hover:border-gray-300 lg:flex">
          <FiSearch strokeWidth={2} size={14} className="shrink-0" />
          <input
            type="text"
            aria-label="Search"
            placeholder="Search anything..."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
          />
        </div>

        <button
          type="button"
          aria-label={
            unreadCount > 0
              ? `Notifications, ${unreadCount} unread`
              : "Notifications"
          }
          aria-haspopup="dialog"
          onClick={() => setIsNotificationsOpen(true)}
          className={`${navIconBtn} relative text-xl text-gray-500 hover:text-gray-900`}
        >
          <FaRegBell />
          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"
            />
          )}
        </button>

        <Link
          to="/profile"
          aria-label="Profile"
          className={`${navIconBtn} text-3xl text-gray-500 hover:text-gray-900`}
        >
          <FaUserCircle />
        </Link>
      </div>

      {isNotificationsOpen && (
        <NotificationsPanel
          notifications={notifications}
          onMarkRead={markRead}
          onMarkAllRead={markAllRead}
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
