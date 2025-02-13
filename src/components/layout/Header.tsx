import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"


export function Header() {
  return (
    <header className="bg-[#0A2647] text-white">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">The Skyline Strategies</Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-blue-200 transition-colors text-lg">Home</Link>
          <Link to="/services" className="text-white hover:text-blue-200 transition-colors text-lg">Services</Link>
          <Link to="/pricing" className="text-white hover:text-blue-200 transition-colors text-lg">Pricing</Link>
          <Link to="/about" className="text-white hover:text-blue-200 transition-colors text-lg">About Us</Link>
          <Link to="/portfolio" className="text-white hover:text-blue-200 transition-colors text-lg">Our Portfolio</Link>
          <Link to="/contact" className="text-white hover:text-blue-200 transition-colors text-lg">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0A2647] text-lg py-2.5 px-6 hidden md:flex transition-all duration-300">
            Get Started
          </Button>
          <Button variant="outline" className="text-white border-white md:hidden p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
