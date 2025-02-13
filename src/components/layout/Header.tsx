import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-[#0A2647] to-[#0A3157] py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          The Skyline Strategies
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-blue-200 transition-colors">Home</Link>
          <Link to="/about" className="text-white hover:text-blue-200 transition-colors">About</Link>
          <Link to="/services" className="text-white hover:text-blue-200 transition-colors">Services</Link>
          <Link to="/contact" className="text-white hover:text-blue-200 transition-colors">Contact</Link>
        </nav>
        <div className="md:hidden relative">
          <button 
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl animate-fadeInUp">
              <Link to="/" className="block px-4 py-2 text-[#0A2647] hover:bg-gray-100">Home</Link>
              <Link to="/about" className="block px-4 py-2 text-[#0A2647] hover:bg-gray-100">About</Link>
              <Link to="/services" className="block px-4 py-2 text-[#0A2647] hover:bg-gray-100">Services</Link>
              <Link to="/contact" className="block px-4 py-2 text-[#0A2647] hover:bg-gray-100">Contact</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
