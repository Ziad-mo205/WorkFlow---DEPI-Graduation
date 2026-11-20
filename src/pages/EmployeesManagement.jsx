import { useState } from 'react';
import { FiPlus, FiSearch, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import EmployeesTable from '../components/EmployeesManagement/EmployeesTable';
import EmployeeFormModal from '../components/EmployeesManagement/EmployeeFormModal';
import ChangeRoleModal from '../components/EmployeesManagement/ChangeRoleModal';

const INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: 'Sara Mostafa',
    avatar: { initials: 'SM', bgColor: 'bg-indigo-600' },
    jobTitle: 'Frontend Developer',
    department: 'Engineering',
    email: 'sara.mostafa@nilesoft.com',
    role: 'Employee',
    status: 'Active',
    phone: '+20 100 555 0142',
    startDate: 'Mar 3, 2025',
  },
  {
    id: 2,
    name: 'Omar Khaled',
    avatar: { initials: 'OK', bgColor: 'bg-sky-600' },
    jobTitle: 'Project Manager',
    department: 'Delivery',
    email: 'omar.khaled@nilesoft.com',
    role: 'Manager',
    status: 'Active',
    phone: '+20 100 555 0190',
    startDate: 'Jan 12, 2025',
  },
  {
    id: 3,
    name: 'Ahmed Youssef',
    avatar: { initials: 'AY', bgColor: 'bg-emerald-600' },
    jobTitle: 'UI Designer',
    department: 'Design',
    email: 'ahmed.youssef@nilesoft.com',
    role: 'Employee',
    status: 'Active',
    phone: '+20 100 555 0177',
    startDate: 'Apr 1, 2025',
  },
  {
    id: 4,
    name: 'Mona Adel',
    avatar: { initials: 'MA', bgColor: 'bg-pink-600' },
    jobTitle: 'Backend Developer',
    department: 'Engineering',
    email: 'mona.adel@nilesoft.com',
    role: 'Employee',
    status: 'On Leave',
    phone: '+20 100 555 0125',
    startDate: 'Feb 18, 2025',
  },
  {
    id: 5,
    name: 'Laila Tarek',
    avatar: { initials: 'LT', bgColor: 'bg-amber-600' },
    jobTitle: 'QA Engineer',
    department: 'Quality',
    email: 'laila.tarek@nilesoft.com',
    role: 'Employee',
    status: 'Active',
    phone: '+20 100 555 0161',
    startDate: 'May 10, 2025',
  },
  {
    id: 6,
    name: 'Khaled Hany',
    avatar: { initials: 'KH', bgColor: 'bg-slate-600' },
    jobTitle: 'Business Analyst',
    department: 'Delivery',
    email: 'khaled.hany@nilesoft.com',
    role: 'Employee',
    status: 'Inactive',
    phone: '+20 100 555 0133',
    startDate: 'Dec 5, 2024',
  },
  {
    id: 7,
    name: 'Nour Hassan',
    avatar: { initials: 'NH', bgColor: 'bg-violet-600' },
    jobTitle: 'System Administrator',
    department: 'IT',
    email: 'nour.hassan@nilesoft.com',
    role: 'Admin',
    status: 'Active',
    phone: '+20 100 555 0101',
    startDate: 'Nov 1, 2024',
  },
];

const EmployeesMangement = ({
  currentUser = {
    name: 'Nour Hassan',
    role: 'Admin',
    avatar: { initials: 'NH', bgColor: 'bg-violet-600' },
  },
}) => {
  const isAdmin = currentUser.role === 'Admin';

  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [formModalState, setFormModalState] = useState({
    isOpen: false,
    mode: 'add',
    employee: null,
  });
  const [roleModalEmployee, setRoleModalEmployee] = useState(null);

  const filteredEmployees = employees.filter((emp) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.jobTitle.toLowerCase().includes(q);

    const matchesDept =
      departmentFilter === 'All' || emp.department === departmentFilter;
    const matchesRole = roleFilter === 'All' || emp.role === roleFilter;
    const matchesStatus =
      statusFilter === 'All' || emp.status === statusFilter;

    return matchesSearch && matchesDept && matchesRole && matchesStatus;
  });

  const handleSaveEmployee = (savedEmp) => {
    setEmployees((prev) => {
      const exists = prev.some((e) => e.id === savedEmp.id);
      if (exists) {
        return prev.map((e) => (e.id === savedEmp.id ? savedEmp : e));
      }
      return [savedEmp, ...prev];
    });

    Swal.fire({
      title: formModalState.mode === 'edit' ? 'Employee updated' : 'Employee added',
      icon: 'success',
      timer: 1300,
      showConfirmButton: false,
    });
  };

  const handleSaveRole = (employeeId, newRole) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, role: newRole } : emp
      )
    );

    Swal.fire({
      title: 'Role updated',
      text: `Role changed to ${newRole}.`,
      icon: 'success',
      timer: 1300,
      showConfirmButton: false,
    });
  };

  const handleDeactivateEmployee = (emp) => {
    Swal.fire({
      title: 'Deactivate employee?',
      text: `${emp.name} will be marked as Inactive.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, deactivate',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees((prev) =>
          prev.map((item) =>
            item.id === emp.id ? { ...item, status: 'Inactive' } : item
          )
        );
        Swal.fire({
          title: 'Deactivated',
          icon: 'success',
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('All');
    setRoleFilter('All');
    setStatusFilter('All');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Employees
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isAdmin
                ? 'Manage team members, roles, and account status'
                : 'View company employee directory'}
            </p>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() =>
                setFormModalState({ isOpen: true, mode: 'add', employee: null })
              }
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-700"
            >
              <FiPlus className="h-4 w-4" />
              Add Employee
            </button>
          )}
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-slate-900">
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pr-9 pl-10 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded p-1 text-slate-400 hover:text-slate-600"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Delivery">Delivery</option>
              <option value="Design">Design</option>
              <option value="Quality">Quality</option>
              <option value="IT">IT</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table or Empty Search Results */}
        {filteredEmployees.length > 0 ? (
          <EmployeesTable
            employees={filteredEmployees}
            isAdmin={isAdmin}
            onEdit={(emp) =>
              setFormModalState({ isOpen: true, mode: 'edit', employee: emp })
            }
            onOpenChangeRole={(emp) => setRoleModalEmployee(emp)}
            onDeactivate={handleDeactivateEmployee}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : 'No employees match the selected filters'}
            </h3>
            <p className="mx-auto mt-1.5 max-w-md text-xs text-slate-500 dark:text-slate-400">
              We couldn&apos;t find any employees matching your search and
              filters. Try a different keyword or clear the filters.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                >
                  Clear search
                </button>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}

        {/* Add / Edit Modal */}
        <EmployeeFormModal
          key={`${formModalState.mode}-${formModalState.employee?.id || 'new'}-${formModalState.isOpen}`}
          isOpen={formModalState.isOpen}
          mode={formModalState.mode}
          initialEmployee={formModalState.employee}
          onClose={() =>
            setFormModalState({ isOpen: false, mode: 'add', employee: null })
          }
          onSave={handleSaveEmployee}
          onDeactivate={handleDeactivateEmployee}
        />

        {/* Change Role Modal */}
        <ChangeRoleModal
          key={roleModalEmployee ? `role-${roleModalEmployee.id}` : 'role-closed'}
          employee={roleModalEmployee}
          onClose={() => setRoleModalEmployee(null)}
          onSaveRole={handleSaveRole}
        />
      </div>
    </div>
  );
};

export default EmployeesMangement;