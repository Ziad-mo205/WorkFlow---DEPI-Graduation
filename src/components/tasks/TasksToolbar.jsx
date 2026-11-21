import { NavLink } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  btnPrimary,
  focusRing,
  pillActive,
  pillBase,
  pillIdle,
} from "../../styles/ui";
import { priorities, statuses } from "../../data/tasks";

const statusNames = statuses.map((s) => s.name);

const views = [
  { to: "/tasks", label: "List" },
  { to: "/kanban", label: "Board" },
];

const FilterSelect = ({ label, value, onChange, options }) => {
  const active = value !== "";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={`${pillBase} h-9 appearance-none pr-8 ${active ? pillActive : pillIdle}`}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
          active ? "text-brand" : "text-gray-600"
        }`}
      >
        ▾
      </span>
    </div>
  );
};

const TasksToolbar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  assignee,
  onAssigneeChange,
  assignees,
  onClearFilters,
  onCreateClick,
  canManage = true,
}) => {
  const noFilters = !status && !priority && !assignee;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-full sm:w-64">
        <FiSearch
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          aria-label="Search tasks"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          className="h-9 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 transition-colors placeholder:text-gray-500 hover:border-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-[#c7c9f9]"
        />
      </div>

      <button
        type="button"
        aria-pressed={noFilters}
        onClick={onClearFilters}
        className={`${pillBase} h-9 ${noFilters ? pillActive : pillIdle}`}
      >
        All
      </button>

      <FilterSelect
        label="Status"
        value={status}
        onChange={onStatusChange}
        options={statusNames}
      />
      <FilterSelect
        label="Priority"
        value={priority}
        onChange={onPriorityChange}
        options={priorities}
      />
      {canManage && (
        <FilterSelect
          label="Assignee"
          value={assignee}
          onChange={onAssigneeChange}
          options={assignees}
        />
      )}

      <div className="ml-auto flex items-center gap-2">
        <nav
          aria-label="Tasks view"
          className="flex rounded-lg bg-gray-200 p-1"
        >
          {views.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `rounded-md px-4 py-1 text-sm font-semibold transition-colors ${focusRing} ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-white/60 hover:text-gray-900 active:bg-white/80"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {canManage && (
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={onCreateClick}
            className={`${btnPrimary} h-9 px-4`}
          >
            <FiPlus size={16} strokeWidth={3} />
            Create Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TasksToolbar;
