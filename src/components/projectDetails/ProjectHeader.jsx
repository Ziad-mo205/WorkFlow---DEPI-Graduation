import { FiEdit2 } from 'react-icons/fi'

const statusStyles = {
  'Active': 'bg-blue-100 text-blue-700',
  'On Hold': 'bg-orange-100 text-orange-700',
  'Completed': 'bg-green-100 text-green-700',
}

// "2026-11-20" -> "Nov 20, 2026"
const formatDate = (isoDate) =>
  new Date(isoDate + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

// بتحسب الأيام المتبقية من النهارده لحد التسليم
const getDaysLeft = (isoDate) => {
  const due = new Date(isoDate + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((due - today) / (1000 * 60 * 60 * 24))
}

const StatCard = ({ label, value, hint }) => (
  <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
      {value}
    </p>
    {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
  </div>
)

const ProjectHeader = ({ project, onEditClick }) => {
  const {
    name,
    description,
    status,
    manager,
    progress,
    dueDate,
    tasksDone,
    tasksTotal,
    membersCount,
  } = project

  const daysLeft = dueDate ? getDaysLeft(dueDate) : null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {/* الاسم + الوصف + الحالة + Edit */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
            {name || '—'}
          </h2>
          <p className="mt-1 break-words text-slate-500">{description || '—'}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {status && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
            >
              {status}
            </span>
          )}

          <button
            onClick={onEditClick}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <FiEdit2 />
            Edit
          </button>
        </div>
      </div>

      {/* الـ 4 كروت */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Manager" value={manager || '—'} />
        <StatCard
          label="Deadline"
          value={dueDate ? formatDate(dueDate) : '—'}
          hint={
            daysLeft === null
              ? null
              : daysLeft >= 0
                ? `${daysLeft} days left`
                : 'Overdue'
          }
        />
        <StatCard
          label="Progress"
          value={`${progress}%`}
          hint={`${tasksDone} of ${tasksTotal} tasks`}
        />
        <StatCard label="Team" value={`${membersCount} members`} />
      </div>
    </div>
  )
}

export default ProjectHeader