import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjectsList from './pages/ProjectsList'
import ProjectDetails from './pages/ProjectDetails'
import TasksList from './pages/TasksList'
import KanbanBoard from './pages/KanbanBoard'
import EmployeesManagement from './pages/EmployeesManagement'
import LeaveRequests from './pages/LeaveRequests'
import Announcements from './pages/Announcements'
import UserProfile from './pages/UserProfile'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectsList />} />
      <Route path="/projects/:projectId" element={<ProjectDetails />} />
      <Route path="/tasks" element={<TasksList />} />
      <Route path="/kanban" element={<KanbanBoard />} />
      <Route path="/employees" element={<EmployeesManagement />} />
      <Route path="/leave-requests" element={<LeaveRequests />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App