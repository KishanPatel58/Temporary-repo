import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import PlotOwnerDashboard from './pages/PlotOwnerDashboard'
import OrganizerDashboard from './pages/OrganizerDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import OrganizerMarketplace from './pages/OrganizerMarketplace'
import BookingSystem from './pages/BookingSystem'
import RevenueDashboard from './pages/RevenueDashboard'
import ReputationSystem from './pages/ReputationSystem'
import DamageManagement from './pages/DamageManagement'
import AddonsMarketplace from './pages/AddonsMarketplace'

function App() {
  const [user, setUser] = useState(null) // { role: 'plot_owner' | 'organizer' | 'customer', id: string, name: string }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar user={user} setUser={setUser} />
        <Navbar />
        <main className="lg:ml-64 transition-all duration-300 min-h-screen">
          <div className="animate-fadeIn">
            <Routes>
              <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
              <Route path="/plot-owner" element={user?.role === 'plot_owner' ? <PlotOwnerDashboard user={user} /> : <Navigate to="/" />} />
              <Route path="/organizer" element={user?.role === 'organizer' ? <OrganizerDashboard user={user} /> : <Navigate to="/" />} />
              <Route path="/customer" element={user?.role === 'customer' ? <CustomerDashboard user={user} /> : <Navigate to="/" />} />
              <Route path="/marketplace/organizers" element={<OrganizerMarketplace user={user} />} />
              <Route path="/bookings" element={<BookingSystem user={user} />} />
              <Route path="/revenue" element={<RevenueDashboard user={user} />} />
              <Route path="/reputation" element={<ReputationSystem user={user} />} />
              <Route path="/damage" element={<DamageManagement user={user} />} />
              <Route path="/addons" element={<AddonsMarketplace user={user} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
