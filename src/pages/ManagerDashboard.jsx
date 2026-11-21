import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import { focusRing, btnPrimary } from "../styles/ui";

const stats = [
  {
    label: "Active Projects",
    value: "8",
    valueColor: "text-gray-900",
    note: "2 due this month",
    noteColor: "text-gray-500",
  },
  {
    label: "Open Tasks",
    value: "46",
    valueColor: "text-gray-900",
    note: "12 due this week",
    noteColor: "text-gray-500",
  },
  {
    label: "Completed This Week",
    value: "19",
    valueColor: "text-green-600",
    note: "+24% vs last week",
    noteColor: "text-gray-500",
  },
  {
    label: "Overdue",
    value: "4",
    valueColor: "text-red-600",
    note: "Needs attention",
    noteColor: "text-gray-500",
  },
];

const people = {
  Sara: { initials: "SM", color: "bg-indigo-500" },
  Omar: { initials: "OK", color: "bg-sky-500" },
  Ahmed: { initials: "AY", color: "bg-emerald-500" },
  Mona: { initials: "MA", color: "bg-pink-500" },
  Laila: { initials: "LT", color: "bg-violet-500" },
  Khaled: { initials: "KH", color: "bg-indigo-600" },
};

const tasks = [
  {
    id: "WF-142",
    title: "Product page layout",
    project: "Docan Shop",
    assignee: "Sara",
    priority: "High",
    status: "In Progress",
    due: "Nov 18",
  },
  {
    id: "WF-143",
    title: "Cart & checkout flow",
    project: "Docan Shop",
    assignee: "Ahmed",
    priority: "Urgent",
    status: "Review",
    due: "Nov 12",
  },
  {
    id: "WF-151",
    title: "Payment API review",
    project: "Nile Pay",
    assignee: "Mona",
    priority: "High",
    status: "In Progress",
    due: "Nov 13",
  },
  {
    id: "WF-157",
    title: "Leave form validation",
    project: "HR Portal",
    assignee: "Sara",
    priority: "Medium",
    status: "To Do",
    due: "Nov 20",
  },
  {
    id: "WF-160",
    title: "Responsive navbar",
    project: "Docan Shop",
    assignee: "Omar",
    priority: "Medium",
    status: "Completed",
    due: "Nov 6",
  },
  {
    id: "WF-164",
    title: "Style guide document",
    project: "Brand Refresh",
    assignee: "Khaled",
    priority: "Low",
    status: "Completed",
    due: "Nov 4",
  },
];

const employees = [
  {
    name: "Sara Mostafa",
    job: "Frontend Developer",
    role: "Employee",
    key: "Sara",
  },
  { name: "Omar Khaled", job: "Project Manager", role: "Manager", key: "Omar" },
  { name: "Ahmed Youssef", job: "UI Designer", role: "Employee", key: "Ahmed" },
  {
    name: "Mona Adel",
    job: "Backend Developer",
    role: "Employee",
    key: "Mona",
  },
  { name: "Laila Tarek", job: "QA Engineer", role: "Employee", key: "Laila" },
  {
    name: "Khaled Hany",
    job: "Business Analyst",
    role: "Employee",
    key: "Khaled",
  },
];

const priorityStyles = {
  Urgent: "bg-red-100 text-red-600",
  High: "bg-orange-100 text-amber-700",
  Medium: "bg-blue-100 text-blue-700",
  Low: "bg-gray-100 text-gray-600",
};

const statusStyles = {
  "In Progress": "bg-orange-100 text-orange-700",
  Review: "bg-blue-100 text-blue-700",
  "To Do": "bg-gray-100 text-gray-700",
  Completed: "bg-green-100 text-green-700",
};

const roleStyles = {
  Employee: "bg-green-100 text-green-700",
  Manager: "bg-blue-100 text-blue-700",
};

const cardClass = "rounded-xl border border-gray-200 bg-white shadow-sm";

const linkClass = `text-sm font-semibold text-brand transition-colors hover:text-[#3730b8] hover:underline active:text-[#2e2894] ${focusRing}`;

const iconBtn = `flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors ${focusRing}`;
const iconView = `${iconBtn} border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-100 active:bg-gray-200`;
const iconEdit = `${iconBtn} border-[#c7c9f9] bg-white text-brand hover:border-brand hover:bg-[#eef2ff] active:bg-[#e0e7ff]`;
const iconDelete = `${iconBtn} border-red-200 bg-red-50 text-red-500 hover:border-red-300 hover:bg-red-100 active:bg-red-200`;

function Avatar({ person }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${person.color}`}
    >
      {person.initials}
    </span>
  );
}

function PriorityBadge({ value }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[value]}`}
    >
      {value}
    </span>
  );
}

function StatusBadge({ value }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[value]}`}
    >
      {value}
    </span>
  );
}

function TaskActions({ task }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Link
        to={`/tasks/${task.id}`}
        aria-label={`View ${task.title}`}
        className={iconView}
      >
        <FiEye size={15} />
      </Link>
      <button
        type="button"
        aria-label={`Edit ${task.title}`}
        className={iconEdit}
      >
        <FiEdit2 size={15} />
      </button>
      <button
        type="button"
        aria-label={`Delete ${task.title}`}
        className={iconDelete}
      >
        <FiTrash2 size={15} />
      </button>
    </div>
  );
}

function ManagerDashboard() {
  const [filter, setFilter] = useState("all");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const pillClass = (name) =>
    `cursor-pointer rounded-full border px-3.5 py-1 text-sm font-medium transition-colors ${focusRing} ${
      filter === name
        ? "border-[#c7c9f9] bg-[#eef2ff] text-brand"
        : "border-gray-300 bg-white text-gray-600 hover:border-[#c7c9f9] hover:bg-[#eef2ff] hover:text-brand active:bg-[#e0e7ff]"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            Good morning, Omar
          </h1>
          <p className="text-sm text-gray-500">
            Wednesday, 11 November 2026 · 3 leave requests to review
          </p>
        </div>
        <div>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setIsProjectModalOpen(true)}
            className={`${btnPrimary} px-4 py-2`}
          >
            <FiPlus size={16} strokeWidth={3} />
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, valueColor, note, noteColor }) => (
          <div key={label} className={`${cardClass} px-3 py-3.5 sm:px-4`}>
            <p className="text-[13px] leading-5 text-gray-500">{label}</p>
            <p className={`text-2xl font-bold leading-8 ${valueColor}`}>
              {value}
            </p>
            <p className={`text-sm leading-5 ${noteColor}`}>{note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className={`${cardClass} min-w-0 p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="mr-1 text-lg font-bold text-gray-900">Tasks</h2>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={pillClass("all")}
              >
                All 46
              </button>
              <button
                type="button"
                onClick={() => setFilter("overdue")}
                className={pillClass("overdue")}
              >
                Overdue 4
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/tasks" className={linkClass}>
                View all →
              </Link>
              <button type="button" className={`${btnPrimary} px-4 py-2.5`}>
                <FiPlus size={16} strokeWidth={3} />
                Add new task
              </button>
            </div>
          </div>

          <div className="mt-3 hidden overflow-x-auto md:block">
            <table className="w-full min-w-150 text-left">
              <thead>
                <tr className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  <th className="pb-2 pr-2 font-semibold">Task</th>
                  <th className="px-2 pb-2 font-semibold">Assignee</th>
                  <th className="px-2 pb-2 text-center font-semibold">
                    Priority
                  </th>
                  <th className="px-2 pb-2 text-center font-semibold">
                    Status
                  </th>
                  <th className="px-2 pb-2 font-semibold">Due</th>
                  <th className="pb-2 pl-2 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-t border-gray-100">
                    <td className="py-2.5 pr-2">
                      <p className="text-[15px] font-semibold leading-tight text-gray-900">
                        {task.title}
                      </p>
                      <p className="font-mono text-xs leading-tight text-gray-500">
                        {task.id} · {task.project}
                      </p>
                    </td>
                    <td className="px-2 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar person={people[task.assignee]} />
                        <span className="text-[15px] font-semibold text-gray-900">
                          {task.assignee}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <PriorityBadge value={task.priority} />
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <StatusBadge value={task.status} />
                    </td>
                    <td className="whitespace-nowrap px-2 py-2.5 text-sm text-gray-500">
                      {task.due}
                    </td>
                    <td className="py-2.5 pl-2">
                      <div className="flex justify-end">
                        <TaskActions task={task} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-3 divide-y divide-gray-100 md:hidden">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-col gap-3 py-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-snug text-gray-900">
                    {task.title}
                  </p>
                  <p className="font-mono text-xs text-gray-500">
                    {task.id} · {task.project}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <PriorityBadge value={task.priority} />
                    <StatusBadge value={task.status} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                    <Avatar person={people[task.assignee]} />
                    <span className="font-semibold text-gray-900">
                      {task.assignee}
                    </span>
                    <span>· Due {task.due}</span>
                  </div>
                </div>
                <TaskActions task={task} />
              </li>
            ))}
          </ul>
        </section>

        <section className={`${cardClass} min-w-0 p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="mr-1 text-lg font-bold text-gray-900">
                Employees
              </h2>
              <span className="rounded-full border border-[#c7c9f9] bg-[#eef2ff] px-3 py-1 text-sm font-medium text-brand">
                42 total
              </span>
            </div>
            <Link to="/employees" className={`shrink-0 ${linkClass}`}>
              View all →
            </Link>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              <span className="flex-1">Employee</span>
              <span className="hidden w-24 text-center min-[400px]:block">
                Role
              </span>
              <span className="w-8 text-center">View</span>
            </div>

            {employees.map(({ name, job, role, key }) => (
              <div
                key={name}
                className="flex items-center gap-2 border-t border-gray-100 py-2.5"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <Avatar person={people[key]} />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold leading-tight text-gray-900">
                      {name}
                    </p>
                    <p className="truncate text-xs leading-tight text-gray-500">
                      {job}
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold min-[400px]:hidden ${roleStyles[role]}`}
                    >
                      {role}
                    </span>
                  </div>
                </div>
                <span className="hidden w-24 text-center min-[400px]:block">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[role]}`}
                  >
                    {role}
                  </span>
                </span>
                <Link
                  to="/employees"
                  aria-label={`View ${name}`}
                  className={iconView}
                >
                  <FiEye size={15} />
                </Link>
              </div>
            ))}

            <p className="mt-3 text-sm text-gray-500">
              View only. Role changes are done by an Admin.
            </p>
          </div>
        </section>
      </div>

      {isProjectModalOpen && (
        <CreateProjectModal onClose={() => setIsProjectModalOpen(false)} />
      )}
    </div>
  );
}

export default ManagerDashboard;
