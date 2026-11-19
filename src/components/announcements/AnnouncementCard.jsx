const AnnouncementCard = ({ announcement, isSelected, onSelect }) => {
  const { title, category, author, date, excerpt, isImportant, avatar } = announcement;

  return (
    <div
      onClick={() => onSelect(announcement)}
      className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50/40 shadow-xs dark:border-indigo-500 dark:bg-indigo-950/30'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/60'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Avatar */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatar.bgColor}`}
        >
          {avatar.initials}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            {isImportant && (
              <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-medium text-red-700 dark:bg-red-950/80 dark:text-red-400">
                Important
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {category} · {author} · {date}
          </p>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {excerpt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;