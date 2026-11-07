import { FiSearch, FiPlus } from 'react-icons/fi'

const filters = ['All', 'Active', 'On Hold', 'Completed']

const ProjectsToolbar = ({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onCreateClick,
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* خانة البحث */}
      <div className="relative w-96">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects…"
          className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      {/* أزرار الفلتر */}
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`rounded-full border px-5 py-2 text-sm font-medium ${
            activeFilter === filter
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          {filter}
        </button>
      ))}

      {/* زرار Create Project */}
      <button
        onClick={onCreateClick}
        className="ml-auto flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        <FiPlus />
        Create Project
      </button>
    </div>
  )
}

export default ProjectsToolbar