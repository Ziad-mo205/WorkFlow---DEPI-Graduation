import { useEffect, useState } from "react";

function TaskDetails({ task, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    assignee: "",
    dueDate: "",
    status: "",
    priority: "",
    description: "",
    checklist: [],
  });

  useEffect(() => {
    if (task) {
      setTimeout(() => {
        setFormData({
          assignee: task.assignee || "",
          dueDate: task.dueDate?.slice(0, 10) || "",
          status: task.status || "Pending",
          priority: task.priority || "Medium",
          description: task.description || "",
          checklist: task.checklist || [],
        });
      });
    }
  }, [task.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChecklistChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    }));
  };

  const handleSubmit = () => {
    onSave({
      ...task,
      ...formData,
    });
  };

  const inputStyle =
    "w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 bg-white dark:bg-[#191c23] text-gray-800 dark:text-gray-200";

  const labelStyle =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      {/* Details Panel */}
      <div className="bg-white dark:bg-[#111318] w-full max-w-lg h-full overflow-y-auto shadow-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="text-sm text-gray-500 font-mono mb-1">
              {task.code || `WF-${task.id}`} · {task.project}
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {task.title}
            </h2>

            <div className="flex gap-2 mt-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                {formData.status}
              </span>

              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                {formData.priority}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Assignee & Due Date */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className={labelStyle}>Assignee</label>
              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Due date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className={labelStyle}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Description
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">
              {formData.description || "No description available."}
            </p>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
              Checklist
            </h3>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {formData.checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 py-3 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleChecklistChange(item.id)}
                    className="w-4 h-4 accent-indigo-600"
                  />

                  <span
                    className={
                      item.completed ? "line-through text-gray-400" : ""
                    }
                  >
                    {item.title}
                  </span>
                </label>
              ))}

              {formData.checklist.length === 0 && (
                <p className="text-sm text-gray-400 py-2">
                  No checklist items.
                </p>
              )}
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
              Comments
            </h3>

            <div className="space-y-3">
              {(task.comments || []).map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <div className="w-7 h-7 shrink-0 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold">
                    {comment.author?.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      <span className="font-semibold">{comment.author}</span>{" "}
                      {comment.text}
                    </p>

                    <p className="text-xs text-gray-400">{comment.time}</p>
                  </div>
                </div>
              ))}

              {(task.comments || []).length === 0 && (
                <p className="text-sm text-gray-400">No comments yet.</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
            >
              Delete
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
