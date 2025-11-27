import { Link } from 'react-router-dom'

function HomePage({ user, setUser }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fadeIn">
          Venue Buddy Marketplace
        </h1>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
          Connect Party Plots, Event Organizers, and Customers in One Platform
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Manage bookings, revenue sharing, reputation, and more with complete transparency
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Plot Owner Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-scaleIn" style={{ animationDelay: '0.1s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Plot Owner</h3>
          <p className="text-gray-600 mb-6">
            Manage your party plots, approve organizers, track revenue, and handle bookings with complete control.
          </p>
          <ul className="text-sm text-gray-500 space-y-2 mb-6">
            <li>✓ Real-time calendar management</li>
            <li>✓ Organizer approval system</li>
            <li>✓ Revenue tracking & contracts</li>
            <li>✓ Damage management</li>
          </ul>
          <button
            onClick={() => setUser({ role: 'plot_owner', id: '1', name: 'Plot Owner' })}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Access Dashboard
          </button>
        </div>

        {/* Organizer Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Event Organizer</h3>
          <p className="text-gray-600 mb-6">
            Create your profile, book venues, manage events, and grow your reputation to get more leads.
          </p>
          <ul className="text-sm text-gray-500 space-y-2 mb-6">
            <li>✓ Profile & portfolio showcase</li>
            <li>✓ Venue booking system</li>
            <li>✓ Revenue & expense tracking</li>
            <li>✓ Reputation & lead routing</li>
          </ul>
          <button
            onClick={() => setUser({ role: 'organizer', id: '1', name: 'Organizer' })}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Access Dashboard
          </button>
        </div>

        {/* Customer Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-scaleIn" style={{ animationDelay: '0.3s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2v1m0 13V6a2 2 0 10-4 0v1m4 13H6m6-13H6m6 13v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer</h3>
          <p className="text-gray-600 mb-6">
            Browse events, compare prices, book through organizers, and add services for your perfect event.
          </p>
          <ul className="text-sm text-gray-500 space-y-2 mb-6">
            <li>✓ Browse & search events</li>
            <li>✓ Compare organizers & prices</li>
            <li>✓ Book events easily</li>
            <li>✓ Add-on marketplace</li>
          </ul>
          <button
            onClick={() => setUser({ role: 'customer', id: '1', name: 'Customer' })}
            className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Browse Events
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon="📅" 
            title="Real-Time Calendar" 
            description="Multi-organizer booking with real-time availability"
          />
          <FeatureCard 
            icon="💰" 
            title="Dynamic Revenue Sharing" 
            description="Fixed, percentage, or hybrid contract models"
          />
          <FeatureCard 
            icon="⭐" 
            title="Reputation System" 
            description="Performance-based lead routing"
          />
          <FeatureCard 
            icon="📊" 
            title="Transparent Dashboards" 
            description="Track expenses, profits, and revenue"
          />
          <FeatureCard 
            icon="🛡️" 
            title="Damage Management" 
            description="Photo-based damage tracking & charges"
          />
          <FeatureCard 
            icon="🛒" 
            title="Add-ons Marketplace" 
            description="Decor, catering, photography & more"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="text-center">
        <Link 
          to="/marketplace/organizers"
          className="inline-block bg-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all text-gray-700 font-semibold mr-4"
        >
          View Organizer Marketplace
        </Link>
        <Link 
          to="/addons"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
        >
          Explore Add-ons
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 border-2 border-gray-100 rounded-xl hover:border-blue-300 transition-all transform hover:scale-105 hover:shadow-lg animate-scaleIn">
      <div className="text-4xl mb-3 transform hover:scale-125 transition-transform duration-300">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default HomePage

