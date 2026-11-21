import KanbanCard from "./KanbanCard";

function KanbanColumn({ status, tasks, canManage, onEdit, onDelete }) {
  const headingId = `column-${status.name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 rounded-xl bg-[#ecedf3] p-2.5"
    >
      <header className="flex items-center justify-between px-1.5 pb-2.5 pt-1">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`h-2.5 w-2.5 rounded-full ${status.dot}`}
          />
          <h2 id={headingId} className="text-[15px] font-bold text-gray-900">
            {status.name}
          </h2>
        </div>
        <span className="min-w-6 rounded-full bg-white px-2 py-0.5 text-center text-xs font-bold text-gray-700">
          {tasks.length}
        </span>
      </header>

      {tasks.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              canManage={canManage}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 px-3 py-6 text-center text-sm text-gray-500">
          No tasks
        </p>
      )}
    </section>
  );
}

export default KanbanColumn;
