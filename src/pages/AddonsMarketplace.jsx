import { useState } from 'react'

function AddonsMarketplace({ user }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])

  const categories = ['All', 'Decoration', 'Catering', 'Photography', 'DJ & Sound', 'Makeup', 'Security', 'Lighting']

  const addons = [
    {
      id: 1,
      name: 'Premium Floral Decoration',
      category: 'Decoration',
      price: 25000,
      provider: 'Flora Designs',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
      description: 'Elegant floral arrangements for your event',
      commission: 10,
    },
    {
      id: 2,
      name: 'Gourmet Catering Service',
      category: 'Catering',
      price: 150000,
      provider: 'Taste of India',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
      description: 'Multi-cuisine buffet for 200 guests',
      commission: 15,
    },
    {
      id: 3,
      name: 'Professional Photography',
      category: 'Photography',
      price: 35000,
      provider: 'Capture Moments',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      description: 'Full day coverage with edited photos',
      commission: 12,
    },
    {
      id: 4,
      name: 'DJ & Sound System',
      category: 'DJ & Sound',
      price: 20000,
      provider: 'Sound Waves',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      description: 'Professional DJ with premium sound system',
      commission: 10,
    },
    {
      id: 5,
      name: 'Bridal Makeup Package',
      category: 'Makeup',
      price: 15000,
      provider: 'Glamour Studio',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
      description: 'Complete bridal makeup and hairstyling',
      commission: 8,
    },
    {
      id: 6,
      name: 'Event Security Services',
      category: 'Security',
      price: 30000,
      provider: 'Secure Events',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
      description: 'Professional security team for event',
      commission: 12,
    },
  ]

  const filteredAddons = addons.filter(addon => 
    selectedCategory === 'All' || addon.category === selectedCategory
  )

  const addToCart = (addon) => {
    setCart([...cart, addon])
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Add-ons Marketplace</h1>
        <p className="text-gray-600">Enhance your event with premium services</p>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Commission Benefits</h3>
        <p className="text-sm text-gray-700">
          Both plot owners and organizers earn commission on add-on sales. Customers get access to verified service providers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Category Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAddons.map(addon => (
              <AddonCard
                key={addon.id}
                addon={addon}
                onAddToCart={addToCart}
                inCart={cart.some(item => item.id === addon.id)}
              />
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cart ({cart.length})</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-600">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function AddonCard({ addon, onAddToCart, inCart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative h-48 overflow-hidden">
        <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
            {addon.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{addon.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Provider: {addon.provider}</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1 text-sm font-semibold text-gray-900">{addon.rating}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">₹{addon.price.toLocaleString()}</p>
            <p className="text-xs text-gray-600">Commission: {addon.commission}%</p>
          </div>
        </div>
        <button
          onClick={() => onAddToCart(addon)}
          disabled={inCart}
          className={`w-full py-2.5 rounded-lg font-semibold transition ${
            inCart
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
          }`}
        >
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default AddonsMarketplace

