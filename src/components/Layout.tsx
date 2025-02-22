import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from "./ui/navigation-menu"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, MessageCircle } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"


export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[#003344]">
      {/* Navigation */}
      <nav className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">The Skyline Strategies</Link>
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-8">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                    Why Skale?
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] bg-primary">
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/about">About Us</Link>
                      </li>
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/case-studies">Case Studies</Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] bg-primary">
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/services/seo">SEO Services</Link>
                      </li>
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/services/content">Content Marketing</Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                    Stories &amp; Opinions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] bg-primary">
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/resources">Resources</Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                    Learn
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] bg-primary">
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/guides">Guides</Link>
                      </li>
                      <li className="text-white hover:text-accent transition-colors">
                        <Link to="/tutorials">Tutorials</Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button className="bg-accent text-primary hover:bg-accent/90">Book a Strategy Call</Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-900 text-white">
              <nav className="flex flex-col gap-6">
                <div>
                  <h3 className="text-accent mb-2">Why Skale?</h3>
                  <div className="flex flex-col gap-2">
                    <Link to="/about" className="text-white hover:text-accent transition-colors">About Us</Link>
                    <Link to="/case-studies" className="text-white hover:text-accent transition-colors">Case Studies</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-accent mb-2">Services</h3>
                  <div className="flex flex-col gap-2">
                    <Link to="/services/seo" className="text-white hover:text-accent transition-colors">SEO Services</Link>
                    <Link to="/services/content" className="text-white hover:text-accent transition-colors">Content Marketing</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-accent mb-2">Stories &amp; Opinions</h3>
                  <div className="flex flex-col gap-2">
                    <Link to="/blog" className="text-white hover:text-accent transition-colors">Blog</Link>
                    <Link to="/resources" className="text-white hover:text-accent transition-colors">Resources</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-accent mb-2">Learn</h3>
                  <div className="flex flex-col gap-2">
                    <Link to="/guides" className="text-white hover:text-accent transition-colors">Guides</Link>
                    <Link to="/tutorials" className="text-white hover:text-accent transition-colors">Tutorials</Link>
                  </div>
                </div>
                <Button className="bg-accent text-primary hover:bg-accent/90 w-full">Book a Strategy Call</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {children}

      {/* Footer */}
      <footer className="container mx-auto py-12 text-white">
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
          href="https://wa.me/447920748314"
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
