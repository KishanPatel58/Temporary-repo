import { useState } from 'react'

function RevenueDashboard({ user }) {
  const [view, setView] = useState('overview') // overview, expenses, profits

  // Sample data based on role
  const plotOwnerData = {
    totalRevenue: 500000,
    upcomingRevenue: 300000,
    pendingDues: 75000,
    events: [
      { id: 1, date: '2025-03-15', organizer: 'Elite Events', revenue: 50000, status: 'confirmed' },
      { id: 2, date: '2025-03-20', organizer: 'Party Masters', revenue: 30000, status: 'pending' },
      { id: 3, date: '2025-03-25', organizer: 'Corporate Events Pro', revenue: 75000, status: 'confirmed' },
    ]
  }

  const organizerData = {
    totalRevenue: 1250000,
    totalExpenses: 850000,
    netProfit: 400000,
    expenses: [
      { category: 'Venue Rent', amount: 50000, event: 'Wedding - March 15' },
      { category: 'Decoration', amount: 75000, event: 'Wedding - March 15' },
      { category: 'Catering', amount: 120000, event: 'Wedding - March 15' },
      { category: 'Photography', amount: 30000, event: 'Wedding - March 15' },
      { category: 'DJ & Sound', amount: 25000, event: 'Wedding - March 15' },
    ],
    revenue: [
      { source: 'Customer Payments', amount: 500000, event: 'Wedding - March 15' },
      { source: 'Add-ons Commission', amount: 15000, event: 'Wedding - March 15' },
    ]
  }

  const data = user?.role === 'plot_owner' ? plotOwnerData : organizerData

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Revenue Dashboard</h1>
        <p className="text-gray-600">
          {user?.role === 'plot_owner' ? 'Track your plot revenue and bookings' : 'Track expenses, revenue, and profits'}
        </p>
      </div>

      {/* Stats Cards */}
      {user?.role === 'plot_owner' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Revenue" value={`₹${data.totalRevenue.toLocaleString()}`} icon="💰" color="green" />
          <StatCard title="Upcoming Revenue" value={`₹${data.upcomingRevenue.toLocaleString()}`} icon="📅" color="blue" />
          <StatCard title="Pending Dues" value={`₹${data.pendingDues.toLocaleString()}`} icon="⏳" color="orange" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Revenue" value={`₹${data.totalRevenue.toLocaleString()}`} icon="💰" color="green" />
          <StatCard title="Total Expenses" value={`₹${data.totalExpenses.toLocaleString()}`} icon="📊" color="red" />
          <StatCard title="Net Profit" value={`₹${data.netProfit.toLocaleString()}`} icon="✨" color="purple" />
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setView('overview')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              view === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Overview
          </button>
          {user?.role === 'organizer' && (
            <>
              <button
                onClick={() => setView('expenses')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  view === 'expenses' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Expenses
              </button>
              <button
                onClick={() => setView('profits')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  view === 'profits' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Profit Analysis
              </button>
            </>
          )}
        </div>

        <div className="p-6">
          {view === 'overview' && <OverviewView data={data} user={user} />}
          {view === 'expenses' && user?.role === 'organizer' && <ExpensesView expenses={data.expenses} />}
          {view === 'profits' && user?.role === 'organizer' && <ProfitView data={data} />}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg opacity-20`}></div>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function OverviewView({ data, user }) {
  if (user?.role === 'plot_owner') {
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue by Event</h3>
        <div className="space-y-4">
          {data.events.map(event => (
            <div key={event.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{event.organizer}</p>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{event.revenue.toLocaleString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
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

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue & Expense Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Revenue Sources</h4>
          <div className="space-y-3">
            {data.revenue.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{item.source}</p>
                  <p className="text-xs text-gray-600">{item.event}</p>
                </div>
                <p className="text-lg font-bold text-green-700">+₹{item.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Expenses</h4>
          <div className="space-y-3">
            {data.expenses.slice(0, 3).map((expense, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{expense.category}</p>
                  <p className="text-xs text-gray-600">{expense.event}</p>
                </div>
                <p className="text-lg font-bold text-red-700">-₹{expense.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpensesView({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Expenses</h3>
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
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

function ProfitView({ data }) {
  const profitMargin = ((data.netProfit / data.totalRevenue) * 100).toFixed(1)
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Profit Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Net Profit</p>
          <p className="text-4xl font-bold text-gray-900">₹{data.netProfit.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
          <p className="text-4xl font-bold text-gray-900">{profitMargin}%</p>
        </div>
      </div>
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Total Revenue</span>
            <span className="font-semibold text-gray-900">₹{data.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Total Expenses</span>
            <span className="font-semibold text-red-600">-₹{data.totalExpenses.toLocaleString()}</span>
          </div>
          <div className="pt-3 border-t border-gray-200 flex justify-between">
            <span className="font-bold text-gray-900">Net Profit</span>
            <span className="font-bold text-green-600">₹{data.netProfit.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueDashboard

