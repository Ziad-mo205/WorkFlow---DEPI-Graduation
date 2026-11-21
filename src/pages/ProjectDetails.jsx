import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectHeader from '../components/projectDetails/ProjectHeader'
import ProjectTabs from '../components/projectDetails/ProjectTabs'
import ProjectTasksTable from '../components/projectDetails/ProjectTasksTable'
import TeamMembersList from '../components/projectDetails/TeamMembersList'
import AddTaskModal from '../components/projectDetails/AddTaskModal'
import EditProjectModal from '../components/projectDetails/EditProjectModal'

// ===== داتا تجريبية مؤقتة (شخص واحد بس)، هتتشال لما الـ Backend يجهز =====
const testProject = {
  name: 'Docan Shop',
  description: 'E-commerce storefront with product catalog, cart and checkout.',
  status: 'Active',
  manager: 'Sara Mostafa',
  dueDate: '2026-11-30',
}

const testTasks = [
  {
    id: 1,
    code: 'WF-142',
    title: 'Product page layout',
    assignee: 'Sara Mostafa',
    priority: 'High',
    dueDate: '2026-11-25',
    status: 'In Progress',
  },
]

const testMembers = [
  { id: 1, name: 'Sara Mostafa', role: 'Frontend developer' },
]
// =====================================================================

const ProjectDetails = () => {
  const [project, setProject] = useState(testProject)
  const [activeTab, setActiveTab] = useState('Overview')
  const [tasks, setTasks] = useState(testTasks)
  const [members] = useState(testMembers)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // الأرقام بتتحسب من المهام والفريق بدل ما تتكتب بإيدنا
  const tasksTotal = tasks.length
  const tasksDone = tasks.filter((task) => task.status === 'Completed').length
  const progress = tasksTotal ? Math.round((tasksDone / tasksTotal) * 100) : 0

  const handleAddTask = (newTask) => {
    // الكود مؤقت، الـ Backend هو اللي هيولده بعدين
    const lastNumber = Math.max(
      0,
      ...tasks.map((task) => Number(task.code.split('-')[1]))
    )
    const code = `WF-${lastNumber + 1}`

    setTasks([...tasks, { ...newTask, code }])
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleEditProject = (updatedFields) => {
    setProject({ ...project, ...updatedFields })
  }

  return (
    <div>
      {/* المسار: Projects / اسم المشروع */}
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link to="/projects" className="hover:text-indigo-600">
          Projects
        </Link>
        <span>/</span>
        <span className="break-words text-slate-700">{project.name || '—'}</span>
      </nav>

      <ProjectHeader
        project={{
          ...project,
          progress,
          tasksDone,
          tasksTotal,
          membersCount: members.length,
        }}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
            <div className="min-w-0 2xl:col-span-2">
              <ProjectTasksTable
                tasks={tasks}
                onAddClick={() => setIsTaskModalOpen(true)}
                onDelete={handleDeleteTask}
              />
            </div>

            <TeamMembersList members={members} />
          </div>
        )}
        {activeTab === 'Tasks' && <p>Tasks content</p>}
        {activeTab === 'Team' && <p>Team content</p>}
        {activeTab === 'Activity' && <p>Activity content</p>}
      </div>

      {isTaskModalOpen && (
        <AddTaskModal
          members={members}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleAddTask}
        />
      )}

      {isEditModalOpen && (
        <EditProjectModal
          project={project}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditProject}
        />
      )}
    </div>
  )
}

export default ProjectDetails