import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="bg-[#0A2647] text-white py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">The Skyline Strategies</Link>
        <nav className="hidden lg:flex items-center space-x-10">
          <Link to="/" className="text-white hover:text-blue-200 transition-colors text-lg font-medium">Home</Link>
          <Link to="/services" className="text-white hover:text-blue-200 transition-colors text-lg font-medium">Services</Link>
          <Link to="/pricing" className="text-white hover:text-blue-200 transition-colors text-lg font-medium">Pricing</Link>
          <Link to="/about" className="text-white hover:text-blue-200 transition-colors text-lg font-medium">About Us</Link>
          <Link to="/portfolio" className="text-white hover:text-blue-200 transition-colors text-lg font-medium">Our Portfolio</Link>
          <Link to="/contact" className="text-white hover:text-blue-200 transition-colors text-lg font-medium">Contact</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0A2647] text-lg py-3 px-8 hidden lg:flex transition-all duration-300 font-medium">
            Get Started
          </Button>
          <Button variant="outline" className="text-white border-white lg:hidden p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
