import { useEffect, useRef, useState } from "react";
import { btnOutline, btnPrimary } from "../../../styles/ui";
import { people, priorities, projects, statuses } from "../../../data/tasks";

const assignees = Object.keys(people);
const statusNames = statuses.map((s) => s.name);

const emptyForm = {
  title: "",
  project: "",
  assignee: "",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
  description: "",
};

const fieldClass =
  "block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors hover:border-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-[#c7c9f9]";

function Field({ label, htmlFor, className = "", children }) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-gray-900"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectField({ id, value, onChange, options, placeholder, required }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`${fieldClass} cursor-pointer appearance-none pr-9 invalid:text-gray-500`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option} className="text-gray-900">
            {option}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-700"
      >
        ▾
      </span>
    </div>
  );
}

function TaskFormModal({ task, onClose, onSave }) {
  const isEdit = Boolean(task);
  const dialogRef = useRef(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() =>
    task
      ? {
          title: task.title,
          project: task.project,
          assignee: task.assignee,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          description: task.description ?? "",
        }
      : emptyForm,
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const update = (field) => (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = form.title.trim();
    if (!title) {
      setError("Task title can’t be empty.");
      return;
    }

    onSave({ ...form, title, description: form.description.trim() });
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="task-form-title"
      className="modal"
    >
      <div className="modal-box max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-6">
        <form onSubmit={handleSubmit}>
          <h2 id="task-form-title" className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit task" : "Create new task"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {isEdit
              ? "Update the details below."
              : "Fill in the details below. You can edit them later."}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Task title"
              htmlFor="task-title"
              className="sm:col-span-2"
            >
              <input
                id="task-title"
                type="text"
                required
                value={form.title}
                onChange={update("title")}
                placeholder="e.g. Checkout page layout"
                className={fieldClass}
              />
            </Field>

            <Field label="Project" htmlFor="task-project">
              <SelectField
                id="task-project"
                required
                value={form.project}
                onChange={update("project")}
                options={projects}
                placeholder="Select project"
              />
            </Field>

            <Field label="Assignee" htmlFor="task-assignee">
              <SelectField
                id="task-assignee"
                required
                value={form.assignee}
                onChange={update("assignee")}
                options={assignees}
                placeholder="Select assignee"
              />
            </Field>

            <Field label="Status" htmlFor="task-status">
              <SelectField
                id="task-status"
                value={form.status}
                onChange={update("status")}
                options={statusNames}
              />
            </Field>

            <Field label="Priority" htmlFor="task-priority">
              <SelectField
                id="task-priority"
                value={form.priority}
                onChange={update("priority")}
                options={priorities}
              />
            </Field>

            <Field
              label="Due date"
              htmlFor="task-due"
              className="sm:col-span-2"
            >
              <input
                id="task-due"
                type="date"
                required
                value={form.dueDate}
                onChange={update("dueDate")}
                className={fieldClass}
              />
            </Field>

            <Field
              label="Description"
              htmlFor="task-description"
              className="sm:col-span-2"
            >
              <textarea
                id="task-description"
                rows={3}
                value={form.description}
                onChange={update("description")}
                placeholder="What needs to be done?"
                className={`${fieldClass} resize-none`}
              />
            </Field>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`${btnOutline} px-4 py-2.5`}
            >
              Cancel
            </button>
            <button type="submit" className={`${btnPrimary} px-4 py-2.5`}>
              {isEdit ? "Save changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Close">
          close
        </button>
      </form>
    </dialog>
  );
}

export default TaskFormModal;
