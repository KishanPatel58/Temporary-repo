import { useState } from 'react'
import { Link } from 'react-router-dom'

function PlotOwnerDashboard({ user }) {
  const [selectedPlot, setSelectedPlot] = useState('plot1')
  const [view, setView] = useState('calendar') // calendar, organizers, revenue

  // Sample data
  const plots = [
    { id: 'plot1', name: 'Grand Celebration Hall', location: 'Mumbai', capacity: 500 },
    { id: 'plot2', name: 'Royal Garden Venue', location: 'Delhi', capacity: 300 },
  ]

  const bookings = [
    { id: 1, date: '2025-03-15', organizer: 'Wedding Planners Inc', event: 'Wedding', status: 'confirmed', revenue: 50000 },
    { id: 2, date: '2025-03-20', organizer: 'Party Masters', event: 'Birthday', status: 'pending', revenue: 30000 },
    { id: 3, date: '2025-03-25', organizer: 'Corporate Events Pro', event: 'Corporate', status: 'confirmed', revenue: 75000 },
  ]

  const organizerRequests = [
    { id: 1, name: 'Elite Events', rating: 4.8, events: 45, status: 'pending' },
    { id: 2, name: 'Dream Celebrations', rating: 4.9, events: 120, status: 'pending' },
  ]

  const stats = {
    totalRevenue: 155000,
    upcomingEvents: 3,
    activeOrganizers: 12,
    pendingRequests: 2,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-slideInRight">Plot Owner Dashboard</h1>
        <p className="text-gray-600 animate-slideInRight" style={{ animationDelay: '0.1s' }}>Manage your party plots and organizers</p>
      </div>

      {/* Plot Selector */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Plot:</label>
        <select
          value={selectedPlot}
          onChange={(e) => setSelectedPlot(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          {plots.map(plot => (
            <option key={plot.id} value={plot.id}>
              {plot.name} - {plot.location} ({plot.capacity} capacity)
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon="💰" color="blue" delay="0.1s" />
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} icon="📅" color="green" delay="0.2s" />
        <StatCard title="Active Organizers" value={stats.activeOrganizers} icon="👥" color="purple" delay="0.3s" />
        <StatCard title="Pending Requests" value={stats.pendingRequests} icon="⏳" color="orange" delay="0.4s" />
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'calendar' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Calendar & Bookings
          </button>
          <button
            onClick={() => setView('organizers')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'organizers' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Organizer Requests
          </button>
          <button
            onClick={() => setView('revenue')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'revenue' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Revenue Overview
          </button>
        </div>

        <div className="p-6">
          {view === 'calendar' && <CalendarView bookings={bookings} />}
          {view === 'organizers' && <OrganizerRequestsView requests={organizerRequests} />}
          {view === 'revenue' && <RevenueView bookings={bookings} />}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/marketplace/organizers"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center"
        >
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-bold text-gray-900 mb-1">Browse Organizers</h3>
          <p className="text-sm text-gray-600">Find new organizers</p>
        </Link>
        <Link
          to="/revenue"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center"
        >
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-bold text-gray-900 mb-1">Revenue Dashboard</h3>
          <p className="text-sm text-gray-600">View detailed analytics</p>
        </Link>
        <Link
          to="/damage"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center"
        >
          <div className="text-3xl mb-2">🛡️</div>
          <h3 className="font-bold text-gray-900 mb-1">Damage Management</h3>
          <p className="text-sm text-gray-600">Track damages & charges</p>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color, delay = '0s' }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all animate-scaleIn" style={{ animationDelay: delay }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl transform hover:scale-125 transition-transform duration-300">{icon}</span>
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center`}>
        </div>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function CalendarView({ bookings }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Bookings</h3>
      <div className="space-y-4">
        {bookings.map(booking => (
          <div key={booking.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900">{booking.event} - {booking.organizer}</h4>
                <p className="text-sm text-gray-600 mt-1">Date: {booking.date}</p>
                <p className="text-sm text-gray-600">Revenue: ₹{booking.revenue.toLocaleString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrganizerRequestsView({ requests }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Pending Organizer Requests</h3>
      <div className="space-y-4">
        {requests.map(request => (
          <div key={request.id} className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">{request.name}</h4>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-gray-600">⭐ {request.rating}</span>
                  <span className="text-sm text-gray-600">📅 {request.events} events</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                {request.status}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                Approve
              </button>
              <button className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-200 transition">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RevenueView({ bookings }) {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.revenue, 0)
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Overview</h3>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-600 mb-1">Total Expected Revenue</p>
        <p className="text-4xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
      </div>
      <div className="space-y-3">
        {bookings.map(booking => (
          <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">{booking.event}</p>
              <p className="text-sm text-gray-600">{booking.date}</p>
            </div>
            <p className="text-lg font-bold text-gray-900">₹{booking.revenue.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlotOwnerDashboard

