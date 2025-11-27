import { useState } from 'react'
import { Link } from 'react-router-dom'

function OrganizerDashboard({ user }) {
  const [view, setView] = useState('overview')

  const stats = {
    reputation: 4.8,
    totalEvents: 45,
    upcomingBookings: 5,
    totalRevenue: 1250000,
    pendingLeads: 8,
  }

  const upcomingEvents = [
    { id: 1, date: '2025-03-15', venue: 'Grand Celebration Hall', event: 'Wedding', status: 'confirmed', customers: 200 },
    { id: 2, date: '2025-03-22', venue: 'Royal Garden Venue', event: 'Birthday', status: 'confirmed', customers: 150 },
    { id: 3, date: '2025-04-01', venue: 'Grand Celebration Hall', event: 'Corporate', status: 'pending', customers: 300 },
  ]

  const leads = [
    { id: 1, name: 'John & Sarah', event: 'Wedding', date: '2025-04-10', budget: 500000, source: 'Platform' },
    { id: 2, name: 'ABC Corp', event: 'Corporate', date: '2025-04-15', budget: 300000, source: 'Platform' },
  ]

  const expenses = [
    { category: 'Venue Rent', amount: 50000, event: 'Wedding - March 15' },
    { category: 'Decoration', amount: 75000, event: 'Wedding - March 15' },
    { category: 'Catering', amount: 120000, event: 'Wedding - March 15' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-slideInRight">Organizer Dashboard</h1>
        <p className="text-gray-600 animate-slideInRight" style={{ animationDelay: '0.1s' }}>Manage your events, bookings, and revenue</p>
      </div>

      {/* Reputation Badge */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Your Reputation Score</p>
            <p className="text-5xl font-bold">{stats.reputation}</p>
            <p className="text-sm opacity-90 mt-2">Higher score = More leads assigned</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Total Events</p>
            <p className="text-3xl font-bold">{stats.totalEvents}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Upcoming Bookings" value={stats.upcomingBookings} icon="📅" />
        <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`} icon="💰" />
        <StatCard title="Pending Leads" value={stats.pendingLeads} icon="🔔" />
        <StatCard title="Active Events" value={3} icon="🎉" />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setView('overview')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'overview' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setView('events')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'events' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            My Events
          </button>
          <button
            onClick={() => setView('leads')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'leads' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setView('expenses')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'expenses' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Expenses
          </button>
        </div>

        <div className="p-6">
          {view === 'overview' && <OverviewView stats={stats} />}
          {view === 'events' && <EventsView events={upcomingEvents} />}
          {view === 'leads' && <LeadsView leads={leads} />}
          {view === 'expenses' && <ExpensesView expenses={expenses} />}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/bookings"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center"
        >
          <div className="text-3xl mb-2">📅</div>
          <h3 className="font-bold text-gray-900 mb-1">Book Venue</h3>
          <p className="text-sm text-gray-600">Find available dates</p>
        </Link>
        <Link
          to="/revenue"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center"
        >
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-bold text-gray-900 mb-1">Revenue Dashboard</h3>
          <p className="text-sm text-gray-600">Track profits</p>
        </Link>
        <Link
          to="/reputation"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-center"
        >
          <div className="text-3xl mb-2">⭐</div>
          <h3 className="font-bold text-gray-900 mb-1">Reputation</h3>
          <p className="text-sm text-gray-600">View your score</p>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function OverviewView({ stats }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Performance Metrics</p>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Reputation Score</span>
              <span className="font-bold text-gray-900">{stats.reputation}/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Total Events</span>
              <span className="font-bold text-gray-900">{stats.totalEvents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Success Rate</span>
              <span className="font-bold text-gray-900">98%</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Revenue Summary</p>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">This Month</span>
              <span className="font-bold text-gray-900">₹2.5L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Total Revenue</span>
              <span className="font-bold text-gray-900">₹12.5L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Avg per Event</span>
              <span className="font-bold text-gray-900">₹27.8K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventsView({ events }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900">{event.event} - {event.venue}</h4>
                <p className="text-sm text-gray-600 mt-1">Date: {event.date}</p>
                <p className="text-sm text-gray-600">Expected Guests: {event.customers}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                event.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LeadsView({ leads }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">New Leads</h3>
      <div className="space-y-4">
        {leads.map(lead => (
          <div key={lead.id} className="border-2 border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">{lead.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{lead.event} on {lead.date}</p>
                <p className="text-sm font-semibold text-gray-900 mt-2">Budget: ₹{lead.budget.toLocaleString()}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {lead.source}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                Accept Lead
              </button>
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExpensesView({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Expense Tracking</h3>
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-600 mb-1">Total Expenses (Current Event)</p>
        <p className="text-4xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
      </div>
      <div className="space-y-3">
        {expenses.map((expense, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">{expense.category}</p>
              <p className="text-sm text-gray-600">{expense.event}</p>
            </div>
            <p className="text-lg font-bold text-gray-900">₹{expense.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrganizerDashboard

