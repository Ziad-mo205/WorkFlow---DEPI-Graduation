import Swal from 'sweetalert2';

const STATUS_STYLES = {
  Pending:
    'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400',
  Approved:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400',
  Rejected:
    'bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-400',
};

const LeaveRequestsTable = ({
  requests,
  isReviewer,
  onApprove,
  onOpenReject,
  onCancelRequest,
}) => {
  const handleCancelClick = (item) => {
    Swal.fire({
      title: 'Cancel leave request?',
      text: `Cancel your ${item.leaveType} (${item.startDate} - ${item.endDate})?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, cancel',
      cancelButtonText: 'Keep it',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onCancelRequest(item.id);
        Swal.fire({
          title: 'Cancelled',
          icon: 'success',
          timer: 1100,
          showConfirmButton: false,
        });
      }
    });
  };

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          No leave requests found in this view.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs md:block dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
              {isReviewer && <th className="px-5 py-3.5">Employee</th>}
              <th className="px-5 py-3.5">Leave Type</th>
              <th className="px-5 py-3.5">Start Date</th>
              <th className="px-5 py-3.5">End Date</th>
              <th className="px-5 py-3.5">Submitted</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {requests.map((item) => (
              <tr
                key={item.id}
                className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
              >
                {isReviewer && (
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${item.avatar.bgColor}`}
                      >
                        {item.avatar.initials}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {item.employee}
                      </span>
                    </div>
                  </td>
                )}

                <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">
                  {item.leaveType}
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                  {item.startDate}
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                  {item.endDate}
                </td>
                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                  {item.submitted}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      STATUS_STYLES[item.status] || ''
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  {isReviewer ? (
                    item.status === 'Pending' ? (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onApprove(item.id)}
                          className="cursor-pointer rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenReject(item)}
                          className="cursor-pointer rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )
                  ) : item.status === 'Pending' ? (
                    <button
                      type="button"
                      onClick={() => handleCancelClick(item)}
                      className="cursor-pointer text-xs font-medium text-red-600 transition hover:text-red-700 dark:text-red-400"
                    >
                      Cancel request
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {requests.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                {isReviewer && (
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {item.employee}
                  </p>
                )}
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.leaveType}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {item.startDate} – {item.endDate} · Submitted {item.submitted}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  STATUS_STYLES[item.status] || ''
                }`}
              >
                {item.status}
              </span>
            </div>

            {isReviewer && item.status === 'Pending' && (
              <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onApprove(item.id)}
                  className="flex-1 cursor-pointer rounded-lg bg-emerald-600 py-1.5 text-xs font-medium text-white"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => onOpenReject(item)}
                  className="flex-1 cursor-pointer rounded-lg border border-red-200 bg-red-50 py-1.5 text-xs font-medium text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400"
                >
                  Reject
                </button>
              </div>
            )}

            {!isReviewer && item.status === 'Pending' && (
              <div className="mt-3 border-t border-slate-100 pt-2.5 text-right dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleCancelClick(item)}
                  className="cursor-pointer text-xs font-medium text-red-600 dark:text-red-400"
                >
                  Cancel request
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default LeaveRequestsTable;