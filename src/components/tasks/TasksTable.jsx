import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import Avatar from "./Avatar";

const priorityStyles = {
  Urgent: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-blue-100 text-blue-700",
  Low: "bg-slate-100 text-slate-600",
};

const statusStyles = {
  "To Do": "bg-slate-100 text-slate-600",
  "In Progress": "bg-orange-100 text-orange-700",
  Review: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

// "2026-11-18" -> "Nov 18"
const formatDate = (isoDate) =>
  new Date(isoDate + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

// المهمة متأخرة لو تاريخها عدّى ولسه مخلصتش
const isOverdue = (task) => {
  if (task.status === "Completed") return false;
  const due = new Date(task.dueDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
};

const iconButton =
  "rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100";

const TaskActions = ({ task, onEdit, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: `Delete "${task.title}"?`,
      text: "This task will be removed and you won't be able to undo it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(task.id);
      }
    });
  };

  return (
    <div className="flex gap-2">
      <button className={iconButton} aria-label="View task">
        <FiEye />
      </button>
      <button
        onClick={() => onEdit(task)}
        className={iconButton}
        aria-label="Edit task"
      >
        <FiEdit2 />
      </button>
      <button
        onClick={handleDelete}
        className="rounded-lg border border-red-100 bg-red-50 p-2 text-red-600 hover:bg-red-100"
        aria-label="Delete task"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

const TasksTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <>
      {/* جدول: من md وأكبر */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase text-slate-500">
              <th className="px-5 py-4 font-medium">Task</th>
              <th className="px-5 py-4 font-medium">Project</th>
              <th className="px-5 py-4 font-medium">Assignee</th>
              <th className="px-5 py-4 font-medium">Priority</th>
              <th className="px-5 py-4 font-medium">Due Date</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="whitespace-nowrap px-5 py-4">
                  <span className="font-mono text-slate-400">{task.code}</span>{" "}
                  <span className="font-medium text-slate-900">
                    {task.title}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-slate-900">
                  {task.project}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Avatar name={task.assignee} />
                    <span className="font-semibold text-slate-900">
                      {task.assignee}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td
                  className={`whitespace-nowrap px-5 py-4 ${
                    isOverdue(task)
                      ? "font-medium text-red-600"
                      : "text-slate-700"
                  }`}
                >
                  {formatDate(task.dueDate)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <TaskActions
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* كروت: أصغر من md */}
      <div className="space-y-3 md:hidden">
        {tasks.map((task) => (
          <article
            key={task.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 wrap-break-word">
                <span className="font-mono text-sm text-slate-400">
                  {task.code}
                </span>{" "}
                <span className="font-semibold text-slate-900">
                  {task.title}
                </span>
              </p>
              <span
                className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
              >
                {task.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">{task.project}</p>

            <div className="mt-3 flex items-center gap-2">
              <Avatar name={task.assignee} />
              <span className="min-w-0 wrap-break-word text-sm font-semibold text-slate-900">
                {task.assignee}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`text-sm ${
                    isOverdue(task)
                      ? "font-medium text-red-600"
                      : "text-slate-600"
                  }`}
                >
                  {formatDate(task.dueDate)}
                </span>
              </div>

              <TaskActions task={task} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default TasksTable;
