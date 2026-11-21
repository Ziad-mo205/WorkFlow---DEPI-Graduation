export const statuses = [
  { name: "To Do", dot: "bg-gray-400" },
  { name: "In Progress", dot: "bg-orange-600" },
  { name: "Review", dot: "bg-blue-600" },
  { name: "Completed", dot: "bg-green-600" },
];

export const priorities = ["Urgent", "High", "Medium", "Low"];

export const priorityStyles = {
  Urgent: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-blue-100 text-blue-700",
  Low: "bg-slate-100 text-slate-600",
};

export const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export const isOverdue = (task) => {
  if (task.status === "Completed") return false;
  const due = new Date(`${task.dueDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
};
