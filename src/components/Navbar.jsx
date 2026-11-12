import { Link, matchPath, useLocation } from "react-router-dom";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const pageTitles = [
  { path: "/dashboard", title: "Dashboard" },
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

function Navbar() {
  const { pathname } = useLocation();
  const currentPage = pageTitles.find(({ path }) => matchPath(path, pathname));

  return (
    <nav className="flex h-16 items-center justify-between bg-white px-6">
      <div className="flex items-center gap-26">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-brand" />
          <span className="text-xl font-bold">
            <span className="text-black">Work</span>
            <span className="text-brand">Flow</span>
          </span>
        </div>
        <h1 className="text-lg font-semibold">{currentPage?.title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-8 w-72 items-center gap-2 rounded-lg border border-[#ededf0] bg-[#f7f7fa] px-3 text-[#9ca3af]">
          <FiSearch strokeWidth={2} size={14} />
          <input
            type="text"
            placeholder="Search anything..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
          />
          <kbd className="rounded border border-[#e8eaee] px-1.5 py-0 font-['Inter'] text-[10px]">
            Ctrl K
          </kbd>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="text-xl text-[#9ca3af]"
        >
          <FaRegBell />
        </button>

        <Link
          to="/profile"
          aria-label="Profile"
          className="text-3xl text-[#9ca3af]"
        >
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
