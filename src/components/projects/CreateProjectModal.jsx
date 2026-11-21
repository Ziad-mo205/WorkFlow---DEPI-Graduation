import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { btnPrimary, btnOutline } from "../../styles/ui";

const teamMembers = [
  { name: "Sara Mostafa", initials: "SM", color: "bg-indigo-500" },
  { name: "Omar Khaled", initials: "OK", color: "bg-sky-500" },
  { name: "Ahmed Youssef", initials: "AY", color: "bg-emerald-500" },
  { name: "Mona Adel", initials: "MA", color: "bg-pink-500" },
  { name: "Laila Tarek", initials: "LT", color: "bg-violet-500" },
  { name: "Khaled Hany", initials: "KH", color: "bg-indigo-600" },
];

const statusOptions = ["Active", "On Hold", "Completed"];
const priorityOptions = ["Low", "Medium", "High", "Urgent"];

const emptyForm = {
  name: "",
  manager: "Omar Khaled",
  startDate: "",
  dueDate: "",
  status: "Active",
  priority: "Medium",
  description: "",
};

const formatDate = (value) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      })
    : "";

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

function SelectField({ id, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${fieldClass} cursor-pointer appearance-none pr-9`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-700">
        ▾
      </span>
    </div>
  );
}

function MemberAvatar({ member }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${member.color}`}
    >
      {member.initials}
    </span>
  );
}

function CreateProjectModal({ onClose, onSave }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [members, setMembers] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const update = (field) => (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const selected = teamMembers.filter((m) => members.includes(m.name));
  const available = teamMembers.filter((m) => !members.includes(m.name));

  const addMember = (name) => {
    setMembers((prev) => [...prev, name]);
    setShowPicker(false);
  };

  const removeMember = (name) => {
    setMembers((prev) => prev.filter((n) => n !== name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.startDate && form.dueDate < form.startDate) {
      setError("Due date can't be before the start date.");
      return;
    }

    onSave?.({
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      manager: form.manager,
      progress: 0,
      startDate: formatDate(form.startDate),
      dueDate: formatDate(form.dueDate),
      members: [...new Set([form.manager, ...members])],
    });

    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="create-project-title"
      className="modal"
    >
      <div className="modal-box max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-6">
        <form onSubmit={handleSubmit}>
          <h2
            id="create-project-title"
            className="text-xl font-bold text-gray-900"
          >
            Create new project
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below. You can edit them later.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Project name" htmlFor="project-name">
              <input
                id="project-name"
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="e.g. Mobile App v2"
                className={fieldClass}
              />
            </Field>

            <Field label="Project manager" htmlFor="project-manager">
              <SelectField
                id="project-manager"
                value={form.manager}
                onChange={update("manager")}
                options={teamMembers.map((m) => m.name)}
              />
            </Field>

            <Field label="Start date" htmlFor="project-start">
              <input
                id="project-start"
                type="date"
                value={form.startDate}
                onChange={update("startDate")}
                className={fieldClass}
              />
            </Field>

            <Field label="Due date" htmlFor="project-due">
              <input
                id="project-due"
                type="date"
                required
                min={form.startDate || undefined}
                value={form.dueDate}
                onChange={update("dueDate")}
                className={fieldClass}
              />
            </Field>

            <Field label="Status" htmlFor="project-status">
              <SelectField
                id="project-status"
                value={form.status}
                onChange={update("status")}
                options={statusOptions}
              />
            </Field>

            <Field label="Priority" htmlFor="project-priority">
              <SelectField
                id="project-priority"
                value={form.priority}
                onChange={update("priority")}
                options={priorityOptions}
              />
            </Field>

            <Field
              label="Description"
              htmlFor="project-description"
              className="sm:col-span-2"
            >
              <textarea
                id="project-description"
                rows={3}
                value={form.description}
                onChange={update("description")}
                placeholder="What is this project about?"
                className={`${fieldClass} resize-none`}
              />
            </Field>

            <div className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-gray-900">
                Team members
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {selected.map((member) => (
                  <span
                    key={member.name}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1.5 pr-2.5 text-sm text-gray-800"
                  >
                    <MemberAvatar member={member} />
                    {member.name}
                    <button
                      type="button"
                      aria-label={`Remove ${member.name}`}
                      onClick={() => removeMember(member.name)}
                      className="cursor-pointer text-gray-500 transition-colors hover:text-red-500"
                    >
                      <FiX size={14} strokeWidth={3} />
                    </button>
                  </span>
                ))}

                {available.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={showPicker}
                    onClick={() => setShowPicker((prev) => !prev)}
                    className="cursor-pointer rounded-full border border-[#c7c9f9] bg-[#eef2ff] px-3 py-1 text-sm font-medium text-brand transition-colors hover:border-brand hover:bg-[#e0e7ff] active:bg-[#d4dbff]"
                  >
                    + Add member
                  </button>
                )}
              </div>

              {showPicker && available.length > 0 && (
                <ul className="mt-2 max-h-44 overflow-y-auto rounded-lg border border-gray-200 bg-white p-1">
                  {available.map((member) => (
                    <li key={member.name}>
                      <button
                        type="button"
                        onClick={() => addMember(member.name)}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-900 transition-colors hover:bg-[#eef2ff] hover:text-brand"
                      >
                        <MemberAvatar member={member} />
                        {member.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
              Create Project
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

export default CreateProjectModal;
