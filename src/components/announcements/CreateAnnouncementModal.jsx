import { useState } from 'react';
import {
  FiX,
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiUploadCloud,
} from 'react-icons/fi';

const CreateAnnouncementModal = ({ isOpen, onClose, onSave, initialData, currentUser }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [audience, setAudience] = useState(initialData?.audience || 'All employees');
  const [content, setContent] = useState(initialData?.content || '');
  const [isImportant, setIsImportant] = useState(Boolean(initialData?.isImportant));
  const [fileName, setFileName] = useState(initialData?.attachment || '');

  if (!isOpen) return null;

  const handleSubmit = (status = 'published') => {
    if (!title.trim() || !content.trim()) return;

    onSave({
      id: initialData?.id || Date.now(),
      title: title.trim(),
      audience,
      category: audience === 'All employees' ? 'HR' : audience,
      author: currentUser?.name || 'Nour Hassan',
      avatar: currentUser?.avatar || { initials: 'NH', bgColor: 'bg-indigo-600' },
      date: 'Today',
      fullDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      excerpt: content.trim().slice(0, 110) + (content.length > 110 ? '...' : ''),
      content: content.trim(),
      isImportant,
      attachment: fileName,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
              Announcements / {initialData ? 'Edit' : 'New'}
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">
              {initialData ? 'Edit announcement' : 'New announcement'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Form + Live Preview Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Form (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Office closed for National Day"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
              >
                <option value="All employees">All employees</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Management">Management</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Message
              </label>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                {/* Editor Toolbar */}
                <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-3 py-2 text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
                  <button
                    type="button"
                    className="cursor-pointer rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiBold className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiItalic className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiUnderline className="h-3.5 w-3.5" />
                  </button>
                  <span className="mx-1 h-4 w-px bg-slate-300 dark:bg-slate-600" />
                  <button
                    type="button"
                    className="cursor-pointer rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiList className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <FiLink className="h-3.5 w-3.5" />
                  </button>
                </div>

                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your announcement message here..."
                  className="w-full resize-none bg-white p-3.5 text-sm text-slate-900 outline-none dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Mark as important toggle */}
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Mark as important
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Shown at the top with a red tag
                </p>
              </div>
              <input
                type="checkbox"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded accent-indigo-600"
              />
            </label>

            {/* File Dropzone */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center transition hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-800/40">
              <FiUploadCloud className="h-5 w-5 text-slate-400" />
              <span className="mt-1.5 text-xs text-slate-600 dark:text-slate-300">
                {fileName ? fileName : 'Drag files here or browse'}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              />
            </label>
          </div>

          {/* Right Live Preview (5 cols) */}
          <div className="lg:col-span-5">
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              Preview
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {currentUser?.avatar?.initials || 'NH'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {title || 'Announcement title'}
                      </h4>
                      {isImportant && (
                        <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700 dark:bg-red-950/80 dark:text-red-400">
                          Important
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      By {currentUser?.name || 'Nour Hassan'} · Today
                    </p>
                    <p className="mt-2.5 line-clamp-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {content ||
                        'Your announcement preview will appear here as you type...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            className="cursor-pointer rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700"
          >
            {initialData ? 'Save Changes' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;