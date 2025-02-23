import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, MessageCircle } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "./Navigation"


const navigationItems = [
  {
    label: 'Why Skale?',
    items: [
      { title: 'Overview', href: '/overview' },
      { title: 'Case Studies', href: '/case-studies' },
      { title: 'Testimonials', href: '/testimonials' }
    ]
  },
  {
    label: 'Services',
    items: [
      { title: 'SEO Strategy', href: '/services/seo-strategy' },
      { title: 'Content Marketing', href: '/services/content-marketing' },
      { title: 'Technical SEO', href: '/services/technical-seo' }
    ]
  },
  { label: 'Stories & Opinions', href: '/blog' },
  { label: 'Learn', href: '/learn' }
];
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[#003344]">
      {/* Navigation */}
      <Navigation navigationItems={navigationItems} />
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-900 text-white">
              <nav className="flex flex-col gap-6">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    <h3 className="text-accent mb-2">{item.label}</h3>
                    {item.items ? (
                      <div className="flex flex-col gap-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.href}
                            className="text-white hover:text-accent transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link
                          to={item.href}
                          className="text-white hover:text-accent transition-colors"
                        >
                          {item.label}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
                <Button className="bg-accent text-primary hover:bg-accent/90 w-full">Book a Strategy Call</Button>
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
