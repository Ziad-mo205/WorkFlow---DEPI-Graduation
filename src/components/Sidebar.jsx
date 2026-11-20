import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineFolder,
  HiOutlineCheck,
  HiOutlineCalendar,
  HiOutlineMegaphone,
} from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/Logo.jpeg";

const user = { name: "Mohamed Mostafa", role: "Manager" };

const links = [
  {
    label: "Dashboard",
    icon: HiOutlineHome,
    to: {
      Admin: "/admin-dashboard",
      Manager: "/manager-dashboard",
      Employee: "/employee-dashboard",
    },
  },
  { label: "Projects", icon: HiOutlineFolder, to: "/projects" },
  { label: "Tasks", icon: HiOutlineCheck, to: "/tasks" },
  { label: "Leave Requests", icon: HiOutlineCalendar, to: "/leave-requests" },
  { label: "Announcements", icon: HiOutlineMegaphone, to: "/announcements" },
];

const getPath = (to) =>
  typeof to === "string" ? to : (to[user.role] ?? "/manager-dashboard");

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-x-0 bottom-0 top-16 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 flex w-56 shrink-0 flex-col bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-6 pb-2 pt-6 lg:hidden">
          <img src={logo} alt="WorkFlow logo" className="h-8 w-auto" />
          <span className="text-xl font-bold">
            <span className="text-black">Work</span>
            <span className="text-brand">Flow</span>
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-3 pb-4 pt-2 lg:py-4">
          {links.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={getPath(to)}
              onClick={onClose}
              className={({ isActive }) =>
                `flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#eef2ff] text-[#6c63e0]"
                    : "text-[#6b7080] hover:bg-gray-100"
                }`
              }
            >
              <Icon className="text-lg" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-3 pb-3">
          <div className="border-t border-[#ececf0] pt-3">
            <NavLink
              to="/profile"
              onClick={onClose}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100"
            >
              <FaUserCircle className="shrink-0 text-3xl text-[#9ca3af]" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold leading-tight text-gray-900">
                  {user.name}
                </p>
                <p className="text-[11px] font-bold leading-tight text-emerald-600">
                  {user.role}
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
