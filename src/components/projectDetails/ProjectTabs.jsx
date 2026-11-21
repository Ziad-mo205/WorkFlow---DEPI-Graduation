const tabs = ['Overview', 'Tasks', 'Team', 'Activity']

const ProjectTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`-mb-px shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeTab === tab
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default ProjectTabs