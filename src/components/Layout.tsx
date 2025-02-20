import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[#003344]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">The Skyline Strategies</Link>
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-8">
                <NavigationMenuItem>
                  <Link to="/" className="text-white hover:text-blue-200">Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/services" className="text-white hover:text-blue-200">Services</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/pricing" className="text-white hover:text-blue-200">Pricing</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="text-white hover:text-blue-200">About Us</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/portfolio" className="text-white hover:text-blue-200">Our Portfolio</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/blog" className="text-white hover:text-blue-200">Our Blogs</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="text-white hover:text-blue-200">Contact</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button className="bg-white text-blue-900 hover:bg-blue-50">Get started</Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-900 text-white">
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-lg hover:text-blue-200">Home</Link>
                <Link to="/services" className="text-lg hover:text-blue-200">Services</Link>
                <Link to="/pricing" className="text-lg hover:text-blue-200">Pricing</Link>
                <Link to="/about" className="text-lg hover:text-blue-200">About Us</Link>
                <Link to="/portfolio" className="text-lg hover:text-blue-200">Our Portfolio</Link>
                <Link to="/blog" className="text-lg hover:text-blue-200">Our Blogs</Link>
                <Link to="/contact" className="text-lg hover:text-blue-200">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {children}

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-white">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">The Skyline Strategies</h3>
            <p className="text-gray-300">Empowering businesses with innovative IT solutions</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-300">Mon - Sat: 9:00 - 18:00</p>
            <p className="text-gray-300">contact@theskylinestrategies.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      {isWhatsAppVisible && (
        <a
          href="https://wa.me/923142742025"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
          onClick={() => setIsWhatsAppVisible(false)}
        >
          <MessageCircle size={24} />
        </a>
      )}
    </div>
  )
}
