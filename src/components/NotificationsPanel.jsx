import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { focusRing, pillActive, pillBase, pillIdle } from "../styles/ui";

function NotificationsPanel({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClose,
}) {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const visible =
    tab === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const openNotification = (notification) => {
    onMarkRead(notification.id);
    onClose();
    if (notification.to) navigate(notification.to);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="notifications-title"
      className="my-0 ml-auto mr-0 h-dvh max-h-none w-full max-w-sm bg-white p-0 text-gray-900 shadow-2xl transition-transform duration-200 backdrop:bg-black/40 starting:translate-x-full open:flex open:flex-col"
    >
      <div className="flex items-start justify-between px-5 pb-3 pt-5">
        <h2
          id="notifications-title"
          className="text-xl font-bold text-gray-900"
        >
          Notifications
        </h2>
        <button
          type="button"
          aria-label="Close notifications"
          onClick={onClose}
          className={`-mr-1.5 -mt-1 flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 ${focusRing}`}
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-5 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={tab === "all"}
            onClick={() => setTab("all")}
            className={`${pillBase} ${tab === "all" ? pillActive : pillIdle}`}
          >
            All
          </button>
          <button
            type="button"
            aria-pressed={tab === "unread"}
            onClick={() => setTab("unread")}
            className={`${pillBase} ${tab === "unread" ? pillActive : pillIdle}`}
          >
            Unread · {unreadCount}
          </button>
        </div>

        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className={`rounded-md px-1.5 py-1 text-sm font-semibold text-brand transition-colors hover:bg-[#eef2ff] hover:text-[#3730b8] active:bg-[#e0e7ff] disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent ${focusRing}`}
        >
          Mark all as read
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {visible.length === 0 && (
          <li className="px-5 py-10 text-center text-sm text-gray-500">
            You’re all caught up.
          </li>
        )}

        {visible.map((n) => (
          <li key={n.id} className="border-b border-gray-100">
            <button
              type="button"
              onClick={() => openNotification(n)}
              className={`flex w-full cursor-pointer items-start gap-3 px-5 py-3 text-left transition-colors hover:bg-gray-50 active:bg-gray-100 ${focusRing} focus-visible:-outline-offset-2`}
            >
              <span
                aria-hidden="true"
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  n.read ? "bg-transparent" : "bg-brand"
                }`}
              />
              <span className="min-w-0">
                <span
                  className={`block text-[15px] leading-snug ${
                    n.read
                      ? "font-medium text-gray-600"
                      : "font-semibold text-gray-900"
                  }`}
                >
                  {!n.read && <span className="sr-only">Unread: </span>}
                  {n.title}
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  {n.time}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}

export default NotificationsPanel;
