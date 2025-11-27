import { useState } from 'react'

function BookingSystem({ user }) {
  const [selectedVenue, setSelectedVenue] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [contractType, setContractType] = useState('fixed') // fixed, percentage, hybrid

  const venues = [
    { id: 'venue1', name: 'Grand Celebration Hall', location: 'Mumbai', capacity: 500, basePrice: 50000 },
    { id: 'venue2', name: 'Royal Garden Venue', location: 'Delhi', capacity: 300, basePrice: 40000 },
  ]

  const availableDates = [
    '2025-03-15', '2025-03-20', '2025-03-25', '2025-04-01', '2025-04-05', '2025-04-10'
  ]

  const contractOptions = {
    fixed: { type: 'Fixed Rent', description: 'Pay a fixed amount regardless of event revenue' },
    percentage: { type: 'Percentage Share', description: 'Share a percentage of event revenue' },
    hybrid: { type: 'Hybrid Model', description: 'Fixed base + percentage of revenue above threshold' },
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Book a Venue</h1>
        <p className="text-gray-600">Select venue, date, and contract type</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Venue Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Venue</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venues.map(venue => (
              <button
                key={venue.id}
                onClick={() => setSelectedVenue(venue.id)}
                className={`p-4 border-2 rounded-lg text-left transition ${
                  selectedVenue === venue.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-bold text-gray-900">{venue.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{venue.location}</p>
                <p className="text-sm text-gray-600">Capacity: {venue.capacity}</p>
                <p className="text-sm font-semibold text-gray-900 mt-2">Base: ₹{venue.basePrice.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        {selectedVenue && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableDates.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 border-2 rounded-lg text-center transition ${
                    selectedDate === date
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  <p className="text-xs text-gray-600 mt-1">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contract Type Selection */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Contract Type</label>
            <div className="space-y-3">
              {Object.entries(contractOptions).map(([key, option]) => (
                <button
                  key={key}
                  onClick={() => setContractType(key)}
                  className={`w-full p-4 border-2 rounded-lg text-left transition ${
                    contractType === key
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{option.type}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                    {contractType === key && (
                      <span className="text-purple-600">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contract Details */}
        {selectedVenue && selectedDate && contractType && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contract Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Venue:</span>
                <span className="font-semibold text-gray-900">
                  {venues.find(v => v.id === selectedVenue)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Date:</span>
                <span className="font-semibold text-gray-900">
                  {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Contract Type:</span>
                <span className="font-semibold text-gray-900">{contractOptions[contractType].type}</span>
              </div>
              {contractType === 'fixed' && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Amount:</span>
                  <span className="font-semibold text-gray-900">
                    ₹{venues.find(v => v.id === selectedVenue)?.basePrice.toLocaleString()}
                  </span>
                </div>
              )}
              {contractType === 'percentage' && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Revenue Share:</span>
                  <span className="font-semibold text-gray-900">20% of event revenue</span>
                </div>
              )}
              {contractType === 'hybrid' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Base Amount:</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(venues.find(v => v.id === selectedVenue)?.basePrice * 0.5).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">+ Revenue Share:</span>
                    <span className="font-semibold text-gray-900">15% above ₹2L</span>
                  </div>
                </>
              )}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-300">
              <p className="text-sm text-gray-600 mb-2">
                💡 Payment will be held in escrow and released after event completion
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Confirm Booking & Generate Contract
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingSystem

