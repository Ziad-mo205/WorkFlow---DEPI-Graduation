import { useState } from 'react'
import TasksToolbar from '../components/tasks/TasksToolbar'
import TasksTable from '../components/tasks/TasksTable'
import CreateTaskModal from '../components/tasks/CreateTaskModal'
import EditTaskModal from '../components/tasks/EditTaskModal'

const TasksList = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [assignee, setAssignee] = useState('')
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // أسماء الـ Assignee بتتجمع من المهام نفسها من غير تكرار
  const assignees = [...new Set(tasks.map((task) => task.assignee))]

  const handleClearFilters = () => {
    setStatus('')
    setPriority('')
    setAssignee('')
  }

  const handleAddTask = (newTask) => {
    // الكود مؤقت، الـ Backend هو اللي هيولده بعدين
    const lastNumber = Math.max(
      0,
      ...tasks.map((task) => Number(task.code.split('-')[1]))
    )
    const code = `WF-${lastNumber + 1}`

    setTasks([...tasks, { ...newTask, code }])
  }

  const handleEditTask = (updatedFields) => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...updatedFields } : task
      )
    )
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase()

    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      task.code.toLowerCase().includes(query) ||
      task.project.toLowerCase().includes(query)

    const matchesStatus = !status || task.status === status
    const matchesPriority = !priority || task.priority === priority
    const matchesAssignee = !assignee || task.assignee === assignee

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  return (
    <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
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
        onCreateClick={() => setIsModalOpen(true)}
      />

      <div className="mt-6">
        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No tasks yet</h3>
            <p className="mt-2 text-slate-500">
              Click "Create Task" to add your first task.
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No matching tasks</h3>
            <p className="mt-2 text-slate-500">Try a different search or filter.</p>
          </div>
        ) : (
          <TasksTable
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>

      {isModalOpen && (
        <CreateTaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddTask}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleEditTask}
        />
      )}
    </div>
  )
}

export default TasksList