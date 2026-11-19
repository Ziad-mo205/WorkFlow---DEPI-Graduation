import Swal from 'sweetalert2';
import { FiArrowLeft, FiEdit2, FiTrash2, FiPaperclip } from 'react-icons/fi';

const AnnouncementDetails = ({ announcement, userRole, onBack, onEdit, onDelete }) => {
  if (!announcement) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Select an announcement to view its full details.
        </p>
      </div>
    );
  }

  const canManage = userRole === 'Admin' || userRole === 'Manager';

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Delete announcement?',
      text: `"${announcement.title}" will be permanently removed.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(announcement.id);
        Swal.fire({
          title: 'Deleted!',
          icon: 'success',
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <FiArrowLeft className="h-3.5 w-3.5" />
          Back to announcements
        </button>

        {announcement.isImportant && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-950/80 dark:text-red-400">
            Important
          </span>
        )}
      </div>

      {/* Title & Author Meta */}
      <div className="mt-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {announcement.title}
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          By{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {announcement.author}
          </span>{' '}
          · {announcement.fullDate}
        </p>
      </div>

      {/* Body */}
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {announcement.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Optional Attachment */}
      {announcement.attachment && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
          <FiPaperclip className="h-4 w-4 text-slate-400" />
          <span>{announcement.attachment}</span>
        </div>
      )}

      {/* Manager / Admin Actions */}
      {canManage && (
        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => onEdit(announcement)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <FiEdit2 className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70"
          >
            <FiTrash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementDetails;