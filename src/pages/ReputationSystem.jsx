import { useState } from 'react'

function ReputationSystem({ user }) {
  const [selectedOrganizer, setSelectedOrganizer] = useState(null)

  const organizers = [
    {
      id: 1,
      name: 'Elite Events',
      score: 4.8,
      breakdown: {
        customerFeedback: 4.9,
        onTimePayment: 5.0,
        cleanliness: 4.7,
        compliance: 4.8,
        damageHistory: 5.0,
      },
      metrics: {
        totalEvents: 120,
        onTimePayments: 118,
        positiveReviews: 115,
        violations: 0,
      },
      leadPriority: 'High',
    },
    {
      id: 2,
      name: 'Party Masters',
      score: 4.6,
      breakdown: {
        customerFeedback: 4.5,
        onTimePayment: 4.8,
        cleanliness: 4.6,
        compliance: 4.7,
        damageHistory: 4.4,
      },
      metrics: {
        totalEvents: 85,
        onTimePayments: 82,
        positiveReviews: 78,
        violations: 2,
      },
      leadPriority: 'Medium',
    },
  ]

  const selected = selectedOrganizer ? organizers.find(o => o.id === selectedOrganizer) : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Reputation System</h1>
        <p className="text-gray-600">Track organizer performance and lead routing</p>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border-2 border-yellow-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">How Reputation Works</h3>
        <p className="text-sm text-gray-700">
          Organizers are scored based on customer feedback, on-time payments, event cleanliness, compliance, and damage history.
          Higher scores receive priority in lead routing and more booking opportunities.
        </p>
      </div>

      {/* Organizers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {organizers.map(organizer => (
          <div
            key={organizer.id}
            onClick={() => setSelectedOrganizer(organizer.id)}
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition hover:shadow-lg ${
              selectedOrganizer === organizer.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{organizer.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{organizer.metrics.totalEvents} total events</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900">{organizer.score}</div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(organizer.score) ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                organizer.leadPriority === 'High' ? 'bg-green-100 text-green-800' :
                organizer.leadPriority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Lead Priority: {organizer.leadPriority}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">On-time Payments</p>
                <p className="font-semibold text-gray-900">{organizer.metrics.onTimePayments}/{organizer.metrics.totalEvents}</p>
              </div>
              <div>
                <p className="text-gray-600">Positive Reviews</p>
                <p className="font-semibold text-gray-900">{organizer.metrics.positiveReviews}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Breakdown */}
      {selected && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown: {selected.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {Object.entries(selected.breakdown).map(([key, value]) => (
              <div key={key} className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="text-2xl font-bold text-gray-900">{value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${(value / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{selected.metrics.totalEvents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">On-time Payments</p>
                <p className="text-2xl font-bold text-green-600">{selected.metrics.onTimePayments}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Positive Reviews</p>
                <p className="text-2xl font-bold text-blue-600">{selected.metrics.positiveReviews}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Violations</p>
                <p className="text-2xl font-bold text-red-600">{selected.metrics.violations}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Lead Routing:</strong> This organizer has a {selected.leadPriority.toLowerCase()} priority rating.
              {selected.leadPriority === 'High' && ' They will receive leads first when new customer inquiries come in.'}
              {selected.leadPriority === 'Medium' && ' They will receive leads after high-priority organizers.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReputationSystem

