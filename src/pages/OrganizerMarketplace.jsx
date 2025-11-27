import { useState } from 'react'

function OrganizerMarketplace({ user }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected

  const organizers = [
    {
      id: 1,
      name: 'Elite Events',
      rating: 4.8,
      events: 120,
      services: ['Wedding Planning', 'Catering', 'Decoration'],
      portfolio: 45,
      status: 'approved',
      location: 'Mumbai',
      specialties: ['Wedding', 'Corporate'],
    },
    {
      id: 2,
      name: 'Dream Celebrations',
      rating: 4.9,
      events: 200,
      services: ['Event Planning', 'DJ', 'Photography'],
      portfolio: 80,
      status: 'pending',
      location: 'Delhi',
      specialties: ['Birthday', 'Garba'],
    },
    {
      id: 3,
      name: 'Party Masters',
      rating: 4.6,
      events: 85,
      services: ['Catering', 'Decoration', 'Lighting'],
      portfolio: 30,
      status: 'approved',
      location: 'Bangalore',
      specialties: ['Corporate', 'Concert'],
    },
  ]

  const filteredOrganizers = organizers.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || org.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Organizer Marketplace</h1>
        <p className="text-gray-600">Browse and approve event organizers for your plots</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search organizers by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            />
            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                filter === status
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Organizers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrganizers.map(organizer => (
          <OrganizerCard key={organizer.id} organizer={organizer} user={user} />
        ))}
      </div>

      {filteredOrganizers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 text-lg">No organizers found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

function OrganizerCard({ organizer, user }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{organizer.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{organizer.location}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            organizer.status === 'approved' ? 'bg-green-100 text-green-800' :
            organizer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {organizer.status}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="ml-2 font-semibold text-gray-900">{organizer.rating}</span>
            <span className="ml-2 text-sm text-gray-600">({organizer.events} events)</span>
          </div>
          <p className="text-sm text-gray-600">Portfolio: {organizer.portfolio} events</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Services:</p>
          <div className="flex flex-wrap gap-2">
            {organizer.services.map((service, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {organizer.specialties.map((spec, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {user?.role === 'plot_owner' && organizer.status === 'pending' && (
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
              Approve
            </button>
            <button className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-200 transition">
              Reject
            </button>
          </div>
        )}

        {organizer.status === 'approved' && (
          <button className="w-full mt-4 bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 transition">
            View Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default OrganizerMarketplace

