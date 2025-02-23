import * as React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface DropdownMenuProps {
  children: React.ReactNode;
  items: Array<{
    title: string;
    href: string;
  }>;
}

export const DropdownMenu = ({ children, items }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <button 
        className="text-white/80 hover:text-white transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-xl border border-white/10 overflow-hidden"
        >
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="block px-4 py-2 text-sm text-white/80 hover:bg-forest hover:text-white transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
