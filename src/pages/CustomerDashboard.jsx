import { useState } from 'react'
import { Link } from 'react-router-dom'

function CustomerDashboard({ user }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Wedding', 'Birthday', 'Corporate', 'Garba', 'Concert']

  const events = [
    {
      id: 1,
      title: 'Grand Wedding Celebration',
      organizer: 'Elite Events',
      date: '2025-03-15',
      venue: 'Grand Celebration Hall',
      price: 500000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=400&fit=crop',
      category: 'Wedding'
    },
    {
      id: 2,
      title: 'Birthday Bash',
      organizer: 'Party Masters',
      date: '2025-03-20',
      venue: 'Royal Garden Venue',
      price: 150000,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop',
      category: 'Birthday'
    },
    {
      id: 3,
      title: 'Corporate Annual Meet',
      organizer: 'Corporate Events Pro',
      date: '2025-03-25',
      venue: 'Grand Celebration Hall',
      price: 300000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      category: 'Corporate'
    },
  ]

  const myBookings = [
    { id: 1, event: 'Wedding Celebration', date: '2025-04-10', organizer: 'Elite Events', status: 'confirmed' },
    { id: 2, event: 'Birthday Party', date: '2025-04-20', organizer: 'Party Masters', status: 'pending' },
  ]

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-slideInRight">Browse Events</h1>
        <p className="text-gray-600 animate-slideInRight" style={{ animationDelay: '0.1s' }}>Find and book your perfect event</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events or organizers..."
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
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* My Bookings Section */}
      {myBookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h2>
          <div className="space-y-4">
            {myBookings.map(booking => (
              <div key={booking.id} className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{booking.event}</h3>
                    <p className="text-sm text-gray-600 mt-1">Organizer: {booking.organizer}</p>
                    <p className="text-sm text-gray-600">Date: {booking.date}</p>
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
      )}

      {/* Events Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-slideInRight">Available Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <div key={event.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-scaleIn">
              <EventCard event={event} />
            </div>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scaleIn hover-lift">
      <div className="relative h-48 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
            {event.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">{event.organizer}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-sm">{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-semibold">{event.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-gray-900">₹{event.price.toLocaleString()}</p>
          <Link
            to="/addons"
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
          >
            View Add-ons →
          </Link>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all">
            Book Now
          </button>
          <button className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-500 transition-all">
            Compare
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard

