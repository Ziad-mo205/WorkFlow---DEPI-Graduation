import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const ROLE_OPTIONS = [
  {
    value: 'Admin',
    title: 'Admin',
    description: 'Full access, including employees, roles, and settings.',
  },
  {
    value: 'Manager',
    title: 'Manager',
    description: 'Manages projects, tasks, and leave requests. Views employees.',
  },
  {
    value: 'Employee',
    title: 'Employee',
    description: 'Works on assigned tasks and requests leave.',
  },
];

const ChangeRoleModal = ({ employee, onClose, onSaveRole }) => {
  const [selectedRole, setSelectedRole] = useState(employee?.role || 'Employee');

  if (!employee) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRole(employee.id, selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Change role
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {employee.name} · {employee.jobTitle} · currently{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {employee.role}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {ROLE_OPTIONS.map((opt) => {
            const active = selectedRole === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                  active
                    ? 'border-indigo-600 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-950/40'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={opt.value}
                  checked={active}
                  onChange={() => setSelectedRole(opt.value)}
                  className="mt-1 h-4 w-4 cursor-pointer accent-indigo-600"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {opt.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {opt.description}
                  </p>
                </div>
              </label>
            );
          })}

          <p className="rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
            The user will see a different sidebar and different permissions.
          </p>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              Save role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeRoleModal;