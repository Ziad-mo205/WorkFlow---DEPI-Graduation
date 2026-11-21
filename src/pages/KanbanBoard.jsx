import { useState } from "react";
import TasksToolbar from "../components/tasks/TasksToolbar";
import KanbanColumn from "../components/tasks/kanban/KanbanColumn";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import EditTaskModal from "../components/tasks/EditTaskModal";
import confirmDeleteTask from "../utils/confirmDeleteTask";
import { useTasks } from "../context/TasksContext";
import { currentUser } from "../data/currentUser";
import { statuses } from "../data/tasks";

const emptyBox =
  "rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center";

function KanbanBoard() {
  const { tasks, addTask, editTask, deleteTask } = useTasks();

  const canManage =
    currentUser.role === "Manager" || currentUser.role === "Admin";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const myTasks = canManage
    ? tasks
    : tasks.filter((task) => task.assignee === currentUser.name);

  const assignees = [...new Set(tasks.map((task) => task.assignee))];

  const handleClearFilters = () => {
    setStatus("");
    setPriority("");
    setAssignee("");
  };

  const handleDelete = async (task) => {
    if (await confirmDeleteTask(task)) deleteTask(task.id);
  };

  const query = search.toLowerCase();
  const filteredTasks = myTasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(query) ||
        task.code.toLowerCase().includes(query) ||
        task.project.toLowerCase().includes(query)) &&
      (!status || task.status === status) &&
      (!priority || task.priority === priority) &&
      (!assignee || task.assignee === assignee),
  );

  return (
    <div className="flex flex-col gap-4">
      <TasksToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        assignee={assignee}
        onAssigneeChange={setAssignee}
        assignees={assignees}
        onClearFilters={handleClearFilters}
        onCreateClick={() => setIsCreateOpen(true)}
        canManage={canManage}
      />

      {myTasks.length === 0 ? (
        <div className={emptyBox}>
          <h3 className="text-lg font-semibold text-gray-900">No tasks yet</h3>
          <p className="mt-2 text-gray-500">
            {canManage
              ? 'Click "Create Task" to add your first task.'
              : "No tasks are assigned to you yet."}
          </p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className={emptyBox}>
          <h3 className="text-lg font-semibold text-gray-900">
            No matching tasks
          </h3>
          <p className="mt-2 text-gray-500">
            Try a different search or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statuses.map((s) => (
            <KanbanColumn
              key={s.name}
              status={s}
              tasks={filteredTasks.filter((task) => task.status === s.name)}
              canManage={canManage}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isCreateOpen && (
        <CreateTaskModal
          onClose={() => setIsCreateOpen(false)}
          onSave={addTask}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(fields) => editTask(editingTask.id, fields)}
        />
      )}
    </div>
  );
}

export default KanbanBoard;
