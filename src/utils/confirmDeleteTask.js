import Swal from "sweetalert2";

export default function confirmDeleteTask(task) {
  return Swal.fire({
    title: `Delete "${task.title}"?`,
    text: "This task will be removed and you won't be able to undo it.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  }).then((result) => result.isConfirmed);
}
