import { useState } from 'react'
import ProjectsToolbar from '../components/projects/ProjectsToolbar'
import ProjectCard from '../components/projects/ProjectCard'
import CreateProjectModal from '../components/projects/CreateProjectModal'

const ProjectsList = () => {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject])
  }

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      activeFilter === 'All' || project.status === activeFilter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-full bg-slate-50 p-8">
      <ProjectsToolbar
        search={search}
        onSearchChange={setSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onCreateClick={() => setIsModalOpen(true)}
      />

      {projects.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <h3 className="text-lg font-semibold text-slate-800">No projects yet</h3>
          <p className="mt-2 text-slate-500">
            Click "Create Project" to add your first project.
          </p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <h3 className="text-lg font-semibold text-slate-800">No matching projects</h3>
          <p className="mt-2 text-slate-500">Try a different search or filter.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <CreateProjectModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddProject}
        />
      )}
    </div>
  )
}

export default ProjectsList