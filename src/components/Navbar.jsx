import { Link, matchPath, useLocation } from "react-router-dom";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { FiSearch, FiMenu } from "react-icons/fi";
import logo from "../assets/Logo.jpeg";

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

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const currentPage = pageTitles.find(({ path }) => matchPath(path, pathname));

  return (
    <nav className="relative flex h-16 items-center justify-between bg-white px-5 lg:px-6">
      <div className="flex items-center lg:gap-26">
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={onMenuClick}
          className="cursor-pointer text-2xl text-gray-800 lg:hidden"
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
        <div className="hidden h-8 w-72 items-center gap-2 rounded-lg border border-[#ededf0] bg-[#f7f7fa] px-3 text-[#9ca3af] lg:flex">
          <FiSearch strokeWidth={2} size={14} />
          <input
            type="text"
            placeholder="Search anything..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
          />
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
