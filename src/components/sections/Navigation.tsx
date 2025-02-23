import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { GradientText } from "../ui/gradient-text"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { Menu, X } from "lucide-react"

const navItems = [
  { title: "About", path: "#about" },
  { title: "Services", path: "#services" },
  { title: "Portfolio", path: "#portfolio" },
  { title: "FAQs", path: "#faqs" }
]

export const Navigation = (): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ScrollFadeIn>
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur">
        <nav className="container flex items-center justify-between py-6" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <motion.a 
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white text-2xl font-bold"
            aria-label="Home"
          >
            <GradientText>Gen</GradientText>
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center space-x-1"
          >
            <div className="bg-secondary/50 backdrop-blur border border-white/5 rounded-full px-6 py-2 flex items-center space-x-1" role="menubar">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.path}
                  className="px-4 py-2 text-gray-300 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  role="menuitem"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <Button 
              variant="outline"
              className="border-white/20 text-gray-300 hover:bg-accent hover:text-black hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Contact us"
            >
              Contact Us
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <motion.div
            id="mobile-menu"
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              height: isOpen ? "auto" : 0
            }}
            className={`absolute top-full left-0 right-0 bg-secondary/95 backdrop-blur md:hidden ${isOpen ? 'block' : 'hidden'}`}
          >
            <div className="container py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.path}
                  className="text-gray-300 hover:text-accent transition-colors duration-200 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.title}
                </a>
              ))}
              <Button 
                variant="outline"
                className="border-white/20 text-gray-300 hover:bg-accent hover:text-black hover:border-accent w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Contact us"
                tabIndex={isOpen ? 0 : -1}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </nav>
      </header>
    </ScrollFadeIn>
  )
}
