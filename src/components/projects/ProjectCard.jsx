import { FiTrash2 } from 'react-icons/fi'

const statusStyles = {
  'Active': 'bg-blue-100 text-blue-700',
  'On Hold': 'bg-orange-100 text-orange-700',
  'Completed': 'bg-green-100 text-green-700',
}

const avatarColors = [
  'bg-indigo-500',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-pink-500',
  'bg-violet-500',
]

const getInitials = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const Avatar = ({ name }) => {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const color = avatarColors[hash % avatarColors.length]

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-white ${color}`}
    >
      {getInitials(name)}
    </div>
  )
}

const ProjectCard = ({ project, onDelete }) => {
  const { id, name, description, status, manager, progress, dueDate, members } = project

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* العنوان + الحالة + حذف */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 break-words text-lg font-bold text-slate-900">{name}</h3>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
          >
            {status}
          </span>

          <button
            onClick={() => {
              if (window.confirm(`Delete "${name}"?`)) onDelete(id)
            }}
            className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
            aria-label="Delete project"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* الوصف */}
      <p className="mt-4 break-words text-slate-500">{description}</p>

      {/* المدير */}
      <div className="mt-3 flex items-center gap-2">
        <Avatar name={manager} />
        <span className="text-sm text-slate-500">{manager} · Manager</span>
      </div>

      {/* الجزء السفلي: ثابت في آخر الكارت */}
      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{progress}% complete</span>
          <span>Due {dueDate}</span>
        </div>

        <div className="mt-2 flex -space-x-2">
          {members.map((member) => (
            <Avatar key={member} name={member} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard