import { Routes, Route, Link } from 'react-router-dom'
import { FaHome, FaInfoCircle } from 'react-icons/fa'

function Home() {
  return <h1 className="text-4xl font-bold text-blue-500">Home</h1>
}

function About() {
  return <h1 className="text-4xl font-bold text-green-500">About</h1>
}

function App() {
  return (
    <div className="p-8">
      <nav className="flex gap-4 mb-6">
        <Link to="/" className="btn btn-primary"><FaHome /> Home</Link>
        <Link to="/about" className="btn btn-secondary"><FaInfoCircle /> About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App