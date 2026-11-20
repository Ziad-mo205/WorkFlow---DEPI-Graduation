import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const DEPARTMENTS = ['Engineering', 'Delivery', 'Design', 'Quality', 'IT'];
const ROLES = ['Employee', 'Manager', 'Admin'];
const STATUSES = ['Active', 'On Leave', 'Inactive'];

const AVATAR_COLORS = [
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-pink-600',
  'bg-amber-600',
  'bg-sky-600',
];

const getInitials = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'EM';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const EmployeeFormModal = ({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  initialEmployee = null,
  onClose,
  onSave,
  onDeactivate,
}) => {
  const [fullName, setFullName] = useState(initialEmployee?.name || '');
  const [email, setEmail] = useState(initialEmployee?.email || '');
  const [jobTitle, setJobTitle] = useState(initialEmployee?.jobTitle || '');
  const [department, setDepartment] = useState(
    initialEmployee?.department || 'Delivery'
  );
  const [role, setRole] = useState(initialEmployee?.role || 'Employee');
  const [status, setStatus] = useState(initialEmployee?.status || 'Active');
  const [phone, setPhone] = useState(initialEmployee?.phone || '+20 100 555 0142');
  const [startDate, setStartDate] = useState(
    initialEmployee?.startDate || 'Nov 15, 2026'
  );

  if (!isOpen) return null;

  const isEdit = mode === 'edit' && initialEmployee;
  const initials = getInitials(fullName || initialEmployee?.name || 'Rana Fathy');
  const bgColor =
    initialEmployee?.avatar?.bgColor ||
    AVATAR_COLORS[initials.charCodeAt(0) % AVATAR_COLORS.length];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    onSave({
      id: initialEmployee?.id || Date.now(),
      name: fullName.trim(),
      email: email.trim(),
      jobTitle: jobTitle.trim() || 'Team Member',
      department,
      role,
      status,
      phone: phone.trim(),
      startDate: startDate.trim(),
      avatar: {
        initials,
        bgColor,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isEdit ? 'Edit employee' : 'Add employee'}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {isEdit
                ? initialEmployee.name
                : 'The employee will receive an email to set up their password.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {isEdit && (
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${bgColor}`}
              >
                {initials}
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Change photo
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Full name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Rana Fathy"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rana.fathy@nilesoft.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Job title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Product Owner"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {isEdit ? (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Start date
                </label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Nov 15, 2026"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
                />
              </div>
            )}

            {isEdit && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 100 555 0142"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Start date
                  </label>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Mar 3, 2025"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div>
              {isEdit && status !== 'Inactive' && onDeactivate && (
                <button
                  type="button"
                  onClick={() => {
                    onDeactivate(initialEmployee);
                    onClose();
                  }}
                  className="cursor-pointer rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400"
                >
                  Deactivate employee
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700"
              >
                {isEdit ? 'Save changes' : 'Add Employee'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;