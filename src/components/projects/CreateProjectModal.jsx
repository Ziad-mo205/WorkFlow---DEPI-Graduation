import { useState } from 'react'

const emptyForm = {
  name: '',
  description: '',
  status: 'Active',
  manager: '',
  dueDate: '',
}

const inputStyle =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500'

const CreateProjectModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // "2026-11-20" -> "Nov 20"
    const formattedDate = new Date(form.dueDate + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    })

    onSave({
      id: Date.now(),
      name: form.name,
      description: form.description,
      status: form.status,
      manager: form.manager,
      progress: 0,
      dueDate: formattedDate,
      members: [form.manager],
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-slate-900">Create Project</h2>

        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Project Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={inputStyle}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputStyle}
            >
              <option>Active</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Manager
            <input
              name="manager"
              value={form.manager}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </label>

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

        <div className="mt-6 flex justify-end gap-3">
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

export default CreateProjectModal