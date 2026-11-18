import { useNavigate } from 'react-router-dom'
import { FiSearch, FiPlus } from 'react-icons/fi'

const selectStyle =
  'rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 outline-none hover:bg-slate-50 focus:border-indigo-500'

const FilterSelect = ({ label, value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label={label}
    className={selectStyle}
  >
    <option value="">{label}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

const statuses = ['To Do', 'In Progress', 'Review', 'Completed']
const priorities = ['Urgent', 'High', 'Medium', 'Low']

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
}) => {
  const navigate = useNavigate()
  const noFilters = !status && !priority && !assignee

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* البحث */}
      <div className="relative w-full sm:w-72">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      {/* الفلاتر */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onClearFilters}
          className={`rounded-full border px-4 py-2 text-sm font-medium ${
            noFilters
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          All
        </button>

        <FilterSelect
          label="Status"
          value={status}
          onChange={onStatusChange}
          options={statuses}
        />
        <FilterSelect
          label="Priority"
          value={priority}
          onChange={onPriorityChange}
          options={priorities}
        />
        <FilterSelect
          label="Assignee"
          value={assignee}
          onChange={onAssigneeChange}
          options={assignees}
        />
      </div>

      {/* List / Board + Create Task */}
      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:ml-auto">
        <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-sm font-medium">
          <button className="rounded-md bg-white px-4 py-1.5 text-slate-900 shadow-sm">
            List
          </button>
          <button
            onClick={() => navigate('/kanban')}
            className="rounded-md px-4 py-1.5 text-slate-500 hover:text-slate-800"
          >
            Board
          </button>
        </div>

        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <FiPlus />
          Create Task
        </button>
      </div>
    </div>
  )
}

export default TasksToolbar