// Simplified navbar - just for branding on top
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="lg:hidden bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Venue Buddy
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
