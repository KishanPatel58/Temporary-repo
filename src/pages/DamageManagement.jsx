import { useState } from 'react'

function DamageManagement({ user }) {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const events = [
    {
      id: 1,
      eventName: 'Wedding Celebration',
      organizer: 'Elite Events',
      date: '2025-03-10',
      status: 'completed',
      damageStatus: 'pending_review',
      photos: [
        { id: 1, url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', description: 'Wall damage' },
        { id: 2, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', description: 'Floor scratches' },
      ],
      damages: [
        { item: 'Wall Paint', cost: 5000, acknowledged: false },
        { item: 'Floor Polish', cost: 3000, acknowledged: false },
      ],
      securityDeposit: 50000,
    },
    {
      id: 2,
      eventName: 'Birthday Party',
      organizer: 'Party Masters',
      date: '2025-03-15',
      status: 'completed',
      damageStatus: 'acknowledged',
      photos: [],
      damages: [],
      securityDeposit: 30000,
    },
  ]

  const selected = selectedEvent ? events.find(e => e.id === selectedEvent) : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Damage Management</h1>
        <p className="text-gray-600">Track damages, upload photos, and manage charges</p>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">How It Works</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>After event completion, plot owner uploads damage photos</li>
          <li>Organizer reviews and acknowledges damages</li>
          <li>Charges are calculated and deducted from security deposit</li>
          <li>Remaining deposit is refunded to organizer</li>
        </ol>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {events.map(event => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event.id)}
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition hover:shadow-lg ${
              selectedEvent === event.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{event.eventName}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.organizer}</p>
                <p className="text-sm text-gray-600">Date: {event.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.damageStatus === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
                event.damageStatus === 'acknowledged' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.damageStatus.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Security Deposit:</span>
              <span className="font-semibold text-gray-900">₹{event.securityDeposit.toLocaleString()}</span>
            </div>
            {event.damages.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className="text-sm text-red-600 font-semibold">
                  {event.damages.length} damage(s) reported
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selected && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selected.eventName}</h3>
            <p className="text-gray-600">{selected.organizer} • {selected.date}</p>
          </div>

          {/* Photos Section */}
          {selected.photos.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Damage Photos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selected.photos.map(photo => (
                  <div key={photo.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img src={photo.url} alt={photo.description} className="w-full h-48 object-cover" />
                    <div className="p-3 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900">{photo.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Damages List */}
          {selected.damages.length > 0 ? (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Reported Damages</h4>
              <div className="space-y-3">
                {selected.damages.map((damage, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <div>
                      <p className="font-semibold text-gray-900">{damage.item}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Status: {damage.acknowledged ? 'Acknowledged' : 'Pending Acknowledgment'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">₹{damage.cost.toLocaleString()}</p>
                      {!damage.acknowledged && user?.role === 'organizer' && (
                        <button className="mt-2 text-sm bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition">
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center">
              <p className="text-green-800 font-semibold">No damages reported for this event</p>
            </div>
          )}

          {/* Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Security Deposit</span>
                <span className="font-semibold text-gray-900">₹{selected.securityDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Damage Charges</span>
                <span className="font-semibold text-red-600">
                  -₹{selected.damages.reduce((sum, d) => sum + d.cost, 0).toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-300 flex justify-between">
                <span className="font-bold text-gray-900">Refund Amount</span>
                <span className="font-bold text-green-600">
                  ₹{(selected.securityDeposit - selected.damages.reduce((sum, d) => sum + d.cost, 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {user?.role === 'plot_owner' && selected.damageStatus === 'pending_review' && (
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Upload More Photos
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Submit for Review
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DamageManagement

