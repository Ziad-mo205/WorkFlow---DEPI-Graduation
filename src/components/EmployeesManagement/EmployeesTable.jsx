import { FiEdit2, FiShield, FiUserX } from 'react-icons/fi';

const STATUS_BADGE = {
  Active:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400',
  'On Leave':
    'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400',
  Inactive:
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

const ROLE_BADGE = {
  Admin:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-400',
  Manager:
    'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-400',
  Employee:
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

const EmployeesTable = ({
  employees,
  isAdmin,
  onEdit,
  onOpenChangeRole,
  onDeactivate,
}) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs md:block dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
              <th className="px-5 py-3.5">Employee</th>
              <th className="px-5 py-3.5">Job Title</th>
              <th className="px-5 py-3.5">Department</th>
              <th className="px-5 py-3.5">Email</th>
              <th className="px-5 py-3.5">Role</th>
              <th className="px-5 py-3.5">Status</th>
              {isAdmin && <th className="px-5 py-3.5 text-right">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${emp.avatar.bgColor}`}
                    >
                      {emp.avatar.initials}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {emp.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                  {emp.jobTitle}
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                  {emp.department}
                </td>
                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                  {emp.email}
                </td>
                <td className="px-5 py-4">
                  {isAdmin ? (
                    <button
                      type="button"
                      onClick={() => onOpenChangeRole(emp)}
                      className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition hover:opacity-85 ${
                        ROLE_BADGE[emp.role] || ROLE_BADGE.Employee
                      }`}
                    >
                      {emp.role}
                    </button>
                  ) : (
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        ROLE_BADGE[emp.role] || ROLE_BADGE.Employee
                      }`}
                    >
                      {emp.role}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      STATUS_BADGE[emp.status] || STATUS_BADGE.Active
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                {isAdmin && (
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(emp)}
                        title="Edit employee"
                        className="cursor-pointer rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenChangeRole(emp)}
                        title="Change role"
                        className="cursor-pointer rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                      >
                        <FiShield className="h-4 w-4" />
                      </button>
                      {emp.status !== 'Inactive' && (
                        <button
                          type="button"
                          onClick={() => onDeactivate(emp)}
                          title="Deactivate employee"
                          className="cursor-pointer rounded-lg p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
                        >
                          <FiUserX className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${emp.avatar.bgColor}`}
                >
                  {emp.avatar.initials}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {emp.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {emp.jobTitle} · {emp.department}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  STATUS_BADGE[emp.status] || STATUS_BADGE.Active
                }`}
              >
                {emp.status}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
              <span className="truncate text-slate-500 dark:text-slate-400">
                {emp.email}
              </span>
              <span
                className={`ml-2 shrink-0 rounded-full px-2.5 py-0.5 font-medium ${
                  ROLE_BADGE[emp.role] || ROLE_BADGE.Employee
                }`}
              >
                {emp.role}
              </span>
            </div>

            {isAdmin && (
              <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onEdit(emp)}
                  className="flex-1 cursor-pointer rounded-lg border border-slate-200 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChangeRole(emp)}
                  className="flex-1 cursor-pointer rounded-lg bg-indigo-600 py-1.5 text-xs font-medium text-white"
                >
                  Change role
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeesTable;