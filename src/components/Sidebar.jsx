import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Sidebar({ user, setUser }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    setUser(null)
    navigate('/')
    setIsMobileOpen(false)
  }

  const isActive = (path) => location.pathname === path

  // Navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      return [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/marketplace/organizers', label: 'Organizers', icon: '👥' },
        { path: '/addons', label: 'Add-ons', icon: '🛒' },
      ]
    }

    if (user.role === 'plot_owner') {
      return [
        { path: '/plot-owner', label: 'Dashboard', icon: '📊' },
        { path: '/marketplace/organizers', label: 'Organizers', icon: '👥' },
        { path: '/bookings', label: 'Bookings', icon: '📅' },
        { path: '/revenue', label: 'Revenue', icon: '💰' },
        { path: '/reputation', label: 'Reputation', icon: '⭐' },
        { path: '/damage', label: 'Damage Mgmt', icon: '🛡️' },
        { path: '/addons', label: 'Add-ons', icon: '🛒' },
      ]
    }

    if (user.role === 'organizer') {
      return [
        { path: '/organizer', label: 'Dashboard', icon: '📊' },
        { path: '/bookings', label: 'Book Venue', icon: '📅' },
        { path: '/revenue', label: 'Revenue', icon: '💰' },
        { path: '/reputation', label: 'Reputation', icon: '⭐' },
        { path: '/damage', label: 'Damage Mgmt', icon: '🛡️' },
        { path: '/addons', label: 'Add-ons', icon: '🛒' },
      ]
    }

    if (user.role === 'customer') {
      return [
        { path: '/customer', label: 'Browse Events', icon: '🎉' },
        { path: '/addons', label: 'Add-ons', icon: '🛒' },
      ]
    }

    return []
  }

  const navItems = getNavItems()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" onClick={() => setIsMobileOpen(false)} className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Venue Buddy
              </span>
              <p className="text-xs text-gray-500">Marketplace Platform</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                animation: `slideInLeft 0.3s ease-out ${index * 0.1}s both`
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          {user ? (
            <>
              <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-700 rounded-xl font-semibold hover:bg-red-100 transition-all duration-300 transform hover:scale-105"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="text-center text-sm text-gray-600">
              <p>Sign in to access all features</p>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Sidebar

