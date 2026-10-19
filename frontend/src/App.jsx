import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AIHealthHub from './pages/AIHealthHub'
import FindDoctors from './pages/FindDoctors'
import DoctorPortal from './pages/DoctorPortal'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-health-hub" element={<AIHealthHub />} />
        <Route path="/doctors" element={<FindDoctors />} />
        <Route path="/doctor-portal" element={<DoctorPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App