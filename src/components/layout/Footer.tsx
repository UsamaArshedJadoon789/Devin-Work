import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0A2647] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">The Skyline Strategies</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">CONTACT</h4>
            <p>Email: contact@theskylinestrategies.com</p>
            <p>Work Hour: Mon - Sat: 9:00 - 18:00</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">SERVICES</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-200 transition-colors">Website Development</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">App Development</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Game Development</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Amazon Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-200 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Our Portfolio</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Terms of Services</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>© 2024 The Skyline Strategies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
