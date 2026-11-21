import { useState } from 'react'

const inputStyle =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500'

const emptyForm = {
  title: '',
  project: '',
  assignee: '',
  priority: 'Medium',
  status: 'To Do',
  dueDate: '',
}

const CreateTaskModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSave({
      id: Date.now(),
      title: form.title,
      project: form.project,
      assignee: form.assignee,
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-5 shadow-xl sm:p-6"
      >
        <h2 className="text-xl font-bold text-slate-900">Create Task</h2>

        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Task Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Project
            <input
              name="project"
              value={form.project}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Assignee
            <input
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Priority
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className={inputStyle}
              >
                <option>Urgent</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputStyle}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Completed</option>
              </select>
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Due Date
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTaskModal
