import { useEffect, useState } from "react";

function CreateTask({ createTask, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    project: "",
    assignee: "",
    priority: "",
    dueDate: "",
    description: "",
  });

  const [projects, setProjects] = useState([]);

  function getProjects() {
    useEffect(() => {
      setProjects(() => {}, []);
    });
  }

  const [employees, setEmployees] = useState([]);
  function getEmployees() {
    useEffect(() => {
      setEmployees(() => {});
    }, []);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(formData);
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-125 rounded-xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-gray-900">Create task</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Add a task and assign it to a team member.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className={labelStyle}>Task title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className={inputStyle}
              required
            />
          </div>

          {/* Project & Assignee */}
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
            <div>
              <label className={labelStyle}>Project</label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                {employees.map((employee) => {
                  return (
                    <option value={`${employee.name}`}>{employee.name}</option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className={labelStyle}>Assignee</label>
              <select
                name="assignee"
                value={formData.project}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                {projects.map((project) => {
                  return (
                    <option value={`${project.name}`}>{project.name}</option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-2 gap-3  max-md:grid-cols-1">
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
              </select>
            </div>

            <div>
              <label className={labelStyle}>Due date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description..."
              rows="3"
              className={`${inputStyle} resize-none`}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
