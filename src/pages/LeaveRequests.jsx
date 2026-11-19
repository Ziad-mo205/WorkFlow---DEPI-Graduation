import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import LeaveRequestsTable from '../components/leave/LeaveRequestsTable';
import RequestLeaveModal from '../components/leave/RequestLeaveModal';
import RejectLeaveModal from '../components/leave/RejectLeaveModal';

const EMPLOYEE_INITIAL_REQUESTS = [
  {
    id: 1,
    employee: 'Sara Mostafa',
    avatar: { initials: 'SM', bgColor: 'bg-indigo-600' },
    leaveType: 'Annual leave',
    startDate: 'Nov 22',
    endDate: 'Nov 29',
    submitted: 'Nov 9',
    status: 'Pending',
  },
  {
    id: 2,
    employee: 'Sara Mostafa',
    avatar: { initials: 'SM', bgColor: 'bg-indigo-600' },
    leaveType: 'Sick leave',
    startDate: 'Jun 12',
    endDate: 'Jun 12',
    submitted: 'Jun 11',
    status: 'Approved',
  },
  {
    id: 3,
    employee: 'Sara Mostafa',
    avatar: { initials: 'SM', bgColor: 'bg-indigo-600' },
    leaveType: 'Annual leave',
    startDate: 'Aug 4',
    endDate: 'Aug 8',
    submitted: 'Jul 20',
    status: 'Approved',
  },
  {
    id: 4,
    employee: 'Sara Mostafa',
    avatar: { initials: 'SM', bgColor: 'bg-indigo-600' },
    leaveType: 'Emergency',
    startDate: 'Mar 2',
    endDate: 'Mar 2',
    submitted: 'Mar 2',
    status: 'Rejected',
  },
];

const TEAM_INITIAL_REQUESTS = [
  {
    id: 101,
    employee: 'Mona Adel',
    avatar: { initials: 'MA', bgColor: 'bg-pink-500' },
    leaveType: 'Sick leave',
    startDate: 'Nov 3',
    endDate: 'Nov 5',
    submitted: 'Nov 2',
    status: 'Approved',
  },
  {
    id: 102,
    employee: 'Laila Tarek',
    avatar: { initials: 'LT', bgColor: 'bg-amber-500' },
    leaveType: 'Annual leave',
    startDate: 'Nov 22',
    endDate: 'Nov 29',
    submitted: 'Nov 9',
    status: 'Pending',
  },
  {
    id: 103,
    employee: 'Sara Mostafa',
    avatar: { initials: 'SM', bgColor: 'bg-indigo-600' },
    leaveType: 'Emergency',
    startDate: 'Nov 16',
    endDate: 'Nov 16',
    submitted: 'Nov 10',
    status: 'Pending',
  },
  {
    id: 104,
    employee: 'Ahmed Youssef',
    avatar: { initials: 'AY', bgColor: 'bg-emerald-500' },
    leaveType: 'Annual leave',
    startDate: 'Dec 1',
    endDate: 'Dec 5',
    submitted: 'Nov 7',
    status: 'Rejected',
  },
  {
    id: 105,
    employee: 'Rana Fathy',
    avatar: { initials: 'RF', bgColor: 'bg-sky-500' },
    leaveType: 'Sick leave',
    startDate: 'Nov 12',
    endDate: 'Nov 13',
    submitted: 'Nov 11',
    status: 'Pending',
  },
];

const LeaveRequests = ({
  currentUser = {
    name: 'Omar Khaled',
    role: 'Manager',
    avatar: { initials: 'OK', bgColor: 'bg-indigo-600' },
  },
}) => {
  const isReviewer = currentUser.role === 'Manager' || currentUser.role === 'Admin';

  const [requests, setRequests] = useState(
    isReviewer ? TEAM_INITIAL_REQUESTS : EMPLOYEE_INITIAL_REQUESTS
  );
  const [activeTab, setActiveTab] = useState(isReviewer ? 'Pending' : 'All');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [rejectingItem, setRejectingItem] = useState(null);

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const approvedCount =
    (isReviewer ? 14 : 2) +
    requests.filter(
      (r) => r.status === 'Approved' && ![2, 3, 101].includes(r.id)
    ).length;
  const rejectedCount =
    (isReviewer ? 3 : 1) +
    requests.filter(
      (r) => r.status === 'Rejected' && ![4, 104].includes(r.id)
    ).length;

  const filteredRequests = requests.filter((item) => {
    if (!isReviewer) return true;
    if (activeTab === 'Pending') return item.status === 'Pending';
    if (activeTab === 'History') return item.status !== 'Pending';
    return true;
  });

  const handleAddRequest = (newReq) => {
    setRequests((prev) => [newReq, ...prev]);
    Swal.fire({
      title: 'Request submitted!',
      text: 'Your leave request has been sent for review.',
      icon: 'success',
      timer: 1400,
      showConfirmButton: false,
    });
  };

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Approved' } : item
      )
    );
    Swal.fire({
      title: 'Approved',
      icon: 'success',
      timer: 1100,
      showConfirmButton: false,
    });
  };

  const handleConfirmReject = (id, reason) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Rejected', rejectionReason: reason } : item
      )
    );
    Swal.fire({
      title: 'Request rejected',
      icon: 'info',
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleCancelRequest = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isReviewer ? 'Leave Requests' : 'My Leave Requests'}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isReviewer
                ? 'Review and manage team leave requests'
                : 'Your balance and request history'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-700"
          >
            <FiPlus className="h-4 w-4" />
            Request Leave
          </button>
        </div>

        {/* Summary Cards */}
        {isReviewer ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Pending
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
                {pendingCount}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Awaiting your review
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Approved
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {approvedCount}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                This year
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Rejected
              </p>
              <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                {rejectedCount}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                This year
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Annual Leave
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                14 days
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                of 21 remaining
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Sick Leave
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                8 days
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                of 10 remaining
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Pending Requests
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
                {pendingCount}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Waiting for approval
              </p>
            </div>
          </div>
        )}

        {/* Filter Tabs (Reviewer) */}
        {isReviewer && (
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
            {['Pending', 'All', 'History'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Table / Mobile Cards */}
        <LeaveRequestsTable
          requests={filteredRequests}
          isReviewer={isReviewer}
          onApprove={handleApprove}
          onOpenReject={(item) => setRejectingItem(item)}
          onCancelRequest={handleCancelRequest}
        />

        {/* Request Leave Modal */}
        <RequestLeaveModal
          key={isRequestModalOpen ? 'req-open' : 'req-closed'}
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          onSubmitRequest={handleAddRequest}
          currentUser={currentUser}
        />

        {/* Reject Reason Modal */}
        <RejectLeaveModal
          key={rejectingItem ? `reject-${rejectingItem.id}` : 'reject-closed'}
          request={rejectingItem}
          onClose={() => setRejectingItem(null)}
          onConfirmReject={handleConfirmReject}
        />
      </div>
    </div>
  );
};

export default LeaveRequests;