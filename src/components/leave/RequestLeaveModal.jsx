import { useState } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';

const LEAVE_BALANCES = {
  'Annual leave': { remaining: 14, total: 21, workingDays: 6 },
  'Sick leave': { remaining: 8, total: 10, workingDays: 2 },
  'Emergency': { remaining: 2, total: 3, workingDays: 1 },
};

const RequestLeaveModal = ({ isOpen, onClose, onSubmitRequest, currentUser }) => {
  const [leaveType, setLeaveType] = useState('Annual leave');
  const [datesRange, setDatesRange] = useState('Nov 22 - Nov 29');
  const [reason, setReason] = useState('');
  const [attachmentName, setAttachmentName] = useState('');

  if (!isOpen) return null;

  const currentBalance = LEAVE_BALANCES[leaveType] || LEAVE_BALANCES['Annual leave'];
  const remainingAfter = Math.max(0, currentBalance.remaining - currentBalance.workingDays);

  const [startDate = 'Nov 22', endDate = 'Nov 29'] = datesRange
    .split('-')
    .map((part) => part.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    onSubmitRequest({
      id: Date.now(),
      employee: currentUser?.name || 'Sara Mostafa',
      avatar: currentUser?.avatar || { initials: 'SM', bgColor: 'bg-indigo-600' },
      leaveType,
      startDate,
      endDate,
      submitted: 'Nov 18',
      status: 'Pending',
      reason: reason.trim(),
      attachment: attachmentName,
    });

    setReason('');
    setAttachmentName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Request leave
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Your manager will review the request.
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
          {/* Leave Type */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
              Leave type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
            >
              <option value="Annual leave">Annual leave</option>
              <option value="Sick leave">Sick leave</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          {/* Dates */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
              Dates
            </label>
            <input
              type="text"
              value={datesRange}
              onChange={(e) => setDatesRange(e.target.value)}
              placeholder="Nov 22 - Nov 29"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
              <span>
                Total: <strong className="text-slate-900 dark:text-white">{currentBalance.workingDays} working days</strong>
              </span>
              <span>
                Remaining after request:{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {remainingAfter} days
                </strong>
              </span>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
              Reason
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Family event in Alexandria."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
            />
          </div>

          {/* Attachment */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
              Attach a document (optional)
            </label>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-600 transition hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
              <span className="truncate">
                {attachmentName || 'No file selected'}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
                <FiUpload className="h-3.5 w-3.5" />
                browse
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachmentName(e.target.files?.[0]?.name || '')}
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
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
              Submit request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestLeaveModal;