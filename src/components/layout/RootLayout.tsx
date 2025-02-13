import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0A2647] text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">The Skyline Strategies</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-white hover:text-blue-200 transition-colors">Home</a>
            <a href="/services" className="text-white hover:text-blue-200 transition-colors">Services</a>
            <a href="/pricing" className="text-white hover:text-blue-200 transition-colors">Pricing</a>
            <a href="/about" className="text-white hover:text-blue-200 transition-colors">About Us</a>
            <a href="/portfolio" className="text-white hover:text-blue-200 transition-colors">Our Portfolio</a>
            <a href="/contact" className="text-white hover:text-blue-200 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0A2647]">
              Get Started
            </Button>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
