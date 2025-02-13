import React from "react"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">The Skyline Strategies</h4>
            <div className="flex space-x-4 md:space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6 md:h-7 md:w-7" />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                <Twitter className="h-6 w-6 md:h-7 md:w-7" />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram className="h-6 w-6 md:h-7 md:w-7" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="h-6 w-6 md:h-7 md:w-7" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">CONTACT</h4>
            <p className="text-base md:text-lg mb-4">Email: contact@theskylinestrategies.com</p>
            <p className="text-base md:text-lg">Work Hours: Mon - Sat: 9:00 - 18:00</p>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">SERVICES</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/services/website-development" className="text-base md:text-lg hover:text-blue-300 transition-colors">Website Development</Link></li>
              <li><Link to="/services/app-development" className="text-base md:text-lg hover:text-blue-300 transition-colors">App Development</Link></li>
              <li><Link to="/services/game-development" className="text-base md:text-lg hover:text-blue-300 transition-colors">Game Development</Link></li>
              <li><Link to="/services/digital-marketing" className="text-base md:text-lg hover:text-blue-300 transition-colors">Digital Marketing</Link></li>
              <li><Link to="/services/amazon-services" className="text-base md:text-lg hover:text-blue-300 transition-colors">Amazon Services</Link></li>
              <li><Link to="/services/video-editing" className="text-base md:text-lg hover:text-blue-300 transition-colors">Video Editing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">QUICK LINKS</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/about" className="text-base md:text-lg hover:text-blue-300 transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="text-base md:text-lg hover:text-blue-300 transition-colors">Our Portfolio</Link></li>
              <li><Link to="/contact" className="text-base md:text-lg hover:text-blue-300 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-base md:text-lg hover:text-blue-300 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-base md:text-lg hover:text-blue-300 transition-colors">Terms of Services</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-12 border-t border-white/10 text-center">
          <p className="text-base md:text-lg text-white/70">© 2024 The Skyline Strategies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
