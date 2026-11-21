import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Avatar from "../Avatar";
import useDismiss from "../../../hooks/useDismiss";
import { focusRing } from "../../../styles/ui";
import { formatDate, isOverdue, priorityStyles } from "../../../data/tasks";

const menuItem =
  "flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium transition-colors";

function KanbanCard({ task, canManage, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useDismiss(menuRef, menuOpen, () => setMenuOpen(false));

  return (
    <li className="group relative rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm transition-shadow hover:border-gray-300 hover:shadow-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand">
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/tasks/${task.code}`}
          className="min-w-0 wrap-break-words text-[15px] font-bold leading-snug text-gray-900 outline-none transition-colors after:absolute after:inset-0 after:rounded-xl group-hover:text-brand"
        >
          {task.title}
        </Link>

        {canManage && (
          <div
            ref={menuRef}
            className={`relative -mr-1 -mt-0.5 shrink-0 ${menuOpen ? "z-30" : "z-10"}`}
          >
            <button
              type="button"
              aria-label={`Actions for ${task.title}`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 ${
                menuOpen ? "bg-gray-100 text-gray-900" : "text-gray-500"
              } ${focusRing}`}
            >
              <FiMoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit(task);
                  }}
                  className={`${menuItem} text-gray-800 hover:bg-[#eef2ff] hover:text-brand active:bg-[#e0e7ff]`}
                >
                  <FiEdit2 size={15} />
                  Edit
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(task);
                  }}
                  className={`${menuItem} text-red-600 hover:bg-red-50 active:bg-red-100`}
                >
                  <FiTrash2 size={15} />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-0.5 text-sm text-slate-500">{task.project}</p>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
        <Avatar name={task.assignee} />
      </div>

      <p
        className={`mt-2.5 text-sm ${
          isOverdue(task) ? "font-medium text-red-600" : "text-gray-500"
        }`}
      >
        Due {formatDate(task.dueDate)}
      </p>
    </li>
  );
}

export default KanbanCard;
