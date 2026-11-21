import { NavLink } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  btnPrimary,
  focusRing,
  pillActive,
  pillBase,
  pillIdle,
} from "../../../styles/ui";
import { people, priorities, statuses } from "../../../data/tasks";

const statusNames = statuses.map((s) => s.name);
const assignees = Object.keys(people);

const views = [
  { to: "/tasks", label: "List" },
  { to: "/kanban", label: "Board" },
];

function FilterSelect({ label, value, options, onChange }) {
  const active = value !== "";

  return (
    <div className="relative">
      <select
        aria-label={`Filter by ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
}

function KanbanToolbar({
  filters,
  onFilterChange,
  onReset,
  canManage,
  onCreate,
}) {
  const hasFilters = Object.values(filters).some(Boolean);

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
          placeholder="Search tasks…"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="h-9 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 transition-colors placeholder:text-gray-500 hover:border-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-[#c7c9f9]"
        />
      </div>

      <button
        type="button"
        aria-pressed={!hasFilters}
        onClick={onReset}
        className={`${pillBase} h-9 ${hasFilters ? pillIdle : pillActive}`}
      >
        All
      </button>

      <FilterSelect
        label="Status"
        value={filters.status}
        options={statusNames}
        onChange={(value) => onFilterChange("status", value)}
      />
      <FilterSelect
        label="Priority"
        value={filters.priority}
        options={priorities}
        onChange={(value) => onFilterChange("priority", value)}
      />
      {canManage && (
        <FilterSelect
          label="Assignee"
          value={filters.assignee}
          options={assignees}
          onChange={(value) => onFilterChange("assignee", value)}
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
            onClick={onCreate}
            className={`${btnPrimary} h-9 px-4`}
          >
            <FiPlus size={16} strokeWidth={3} />
            Create Task
          </button>
        )}
      </div>
    </div>
  );
}

export default KanbanToolbar;
