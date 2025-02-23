import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { microInteraction } from "../animations/PageTransitions"

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <motion.button
        variants={microInteraction}
        whileHover="whileHover"
        whileTap="whileTap"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-accent"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-primary/95 backdrop-blur border-b border-white/10 py-4"
          >
            <nav className="container mx-auto px-4">
              <ul className="space-y-2">
                <li>
                  <a href="/" className="block py-2 text-white hover:text-accent">Home</a>
                </li>
                <li>
                  <a href="/services" className="block py-2 text-white hover:text-accent">Services</a>
                </li>
                <li>
                  <a href="/pricing" className="block py-2 text-white hover:text-accent">Pricing</a>
                </li>
                <li>
                  <a href="/about" className="block py-2 text-white hover:text-accent">About Us</a>
                </li>
                <li>
                  <a href="/portfolio" className="block py-2 text-white hover:text-accent">Portfolio</a>
                </li>
                <li>
                  <a href="/blog" className="block py-2 text-white hover:text-accent">Blog</a>
                </li>
                <li>
                  <a href="/contact" className="block py-2 text-white hover:text-accent">Contact</a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
