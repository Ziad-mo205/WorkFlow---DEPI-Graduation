import { useEffect, useRef } from "react";
import { btnDanger, btnOutline } from "../styles/ui";

function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      className="modal"
    >
      <div className="modal-box max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-6">
        <h2 id="confirm-title" className="text-lg font-bold text-gray-900">
          {title}
        </h2>
        <p id="confirm-message" className="mt-2 text-sm text-gray-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className={`${btnOutline} px-4 py-2.5`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`${btnDanger} px-4 py-2.5`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Close">
          close
        </button>
      </form>
    </dialog>
  );
}

export default ConfirmDialog;
