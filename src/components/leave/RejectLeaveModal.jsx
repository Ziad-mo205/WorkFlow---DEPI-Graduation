import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const RejectLeaveModal = ({ request, onClose, onConfirmReject }) => {
  const [reason, setReason] = useState('');

  if (!request) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirmReject(request.id, reason.trim());
    setReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Reject leave request?
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {request.employee} · {request.leaveType} · {request.startDate} – {request.endDate}
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
              Reason (required)
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please write a reason for the employee."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-red-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

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
              className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
            >
              Reject request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectLeaveModal;