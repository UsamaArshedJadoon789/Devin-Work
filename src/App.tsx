import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./components/layout/RootLayout"
import { HomePage } from "./pages/HomePage"
import { WebsiteDevelopmentPage } from "./pages/services/WebsiteDevelopment"
import { AppDevelopmentPage } from "./pages/services/AppDevelopment"
import { GameDevelopmentPage } from "./pages/services/GameDevelopment"
import { DigitalMarketingPage } from "./pages/services/DigitalMarketing"
import { VideoEditingPage } from "./pages/services/VideoEditing"
import { AmazonServicesPage } from "./pages/services/AmazonServices"
import { SearchEnginePlatformPage } from "./pages/services/SearchEnginePlatform"
import { BrandingCreativePage } from "./pages/services/BrandingCreative"


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "services/website-development",
        element: <WebsiteDevelopmentPage />
      },
      {
        path: "services/app-development",
        element: <AppDevelopmentPage />
      },
      {
        path: "services/game-development",
        element: <GameDevelopmentPage />
      },
      {
        path: "services/digital-marketing",
        element: <DigitalMarketingPage />
      },
      {
        path: "services/video-editing",
        element: <VideoEditingPage />
      },
      {
        path: "services/amazon-services",
        element: <AmazonServicesPage />
      },
      {
        path: "services/search-engine-platform",
        element: <SearchEnginePlatformPage />
      },
      {
        path: "services/branding-creative",
        element: <BrandingCreativePage />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
            </div>
          </div>

          {/* Game Development */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">GAME DEVELOPMENT</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Create engaging and immersive gaming experiences across platforms.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Unity Development",
                "Unreal Engine",
                "Mobile Game Development",
                "3D Game Development",
                "Game Design",
                "Character Design",
                "Level Design",
                "Game Testing",
                "Multiplayer Integration",
                "Game Analytics",
                "Monetization Strategy",
                "Game Optimization"
              ].map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <p className="font-medium text-gray-700 text-lg">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Editing */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">VIDEO EDITING</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Professional video editing services to enhance your visual content.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Video Post-Production",
                "Color Correction",
                "Sound Design",
                "Motion Graphics",
                "Visual Effects",
                "Video Transitions",
                "Subtitle Integration",
                "Video Optimization",
                "Format Conversion",
                "Content Repurposing",
                "Video Restoration",
                "Custom Effects"
              ].map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <p className="font-medium text-gray-700 text-lg">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amazon Account Creation */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">AMAZON ACCOUNT CREATION</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Setting up Amazon accounts globally, ensuring compliance, smooth approvals, and market-aligned customization.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Brand Registry Assistance",
                "Marketplace Selection Guidance",
                "Tax Compliance Support",
                "Storefront Design",
                "Listing Optimization",
                "Product Category Selection",
                "Fulfillment Setup",
                "Pricing Strategy Development",
                "Image Compliance Checks",
                "Keyword Research for Listings",
                "Policy Compliance Training",
                "Competitor Analysis"
              ].map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <p className="font-medium text-gray-700 text-lg">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amazon Private Label Services */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">AMAZON PRIVATE LABEL SERVICES</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Create and grow your own brand on Amazon with our comprehensive private label solutions.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Market Research",
                "Product Sourcing",
                "Brand Development",
                "Supplier Negotiation",
                "Prototyping",
                "Custom Packaging Design",
                "Listing Optimization",
                "Keyword Research",
                "Amazon Brand Registry",
                "Fulfillment Setup",
                "Advertising Campaigns",
                "Inventory Management"
              ].map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <p className="font-medium text-gray-700 text-lg">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PPC Campaign Management */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">PPC (PAY-PER-CLICK) CAMPAIGN MANAGEMENT</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Maximize your ROI with data-driven PPC campaigns and strategic ad management.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Campaign Setup",
                "Keyword Research",
                "Bid Optimization",
                "Ad Group Structuring",
                "Negative Keyword Management",
                "A/B Testing",
                "Competitor Analysis",
                "Budget Management",
                "Product Targeting Ads",
                "Reporting and Insights",
                "Retargeting Campaigns",
                "Enhanced Brand Content Ads"
              ].map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <p className="font-medium text-gray-700 text-lg">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32 bg-gradient-to-br from-blue-900 to-blue-950">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-xl">
            <h3 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">YOU HAVE REQUEST?</h3>
            <form className="space-y-8">
              <Input 
                placeholder="Name" 
                className="focus:ring-2 focus:ring-blue-500 transition-shadow text-lg py-6 bg-gray-50"
              />
              <Input 
                type="email" 
                placeholder="Email" 
                className="focus:ring-2 focus:ring-blue-500 transition-shadow text-lg py-6 bg-gray-50"
              />
              <Input 
                placeholder="Your Inquiry about" 
                className="focus:ring-2 focus:ring-blue-500 transition-shadow text-lg py-6 bg-gray-50"
              />
              <Textarea 
                placeholder="Message" 
                className="h-48 focus:ring-2 focus:ring-blue-500 transition-shadow resize-none text-lg py-6 bg-gray-50"
              />
              <div className="flex items-center gap-4">
                <input type="checkbox" id="terms" className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                <label htmlFor="terms" className="text-lg text-gray-600">
                  By submitting, I agree to the Terms &amp; Conditions
                </label>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                GET STARTED
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-xl font-bold mb-6">The Skyline Strategies</h4>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Facebook className="h-7 w-7" />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <Instagram className="h-7 w-7" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">CONTACT</h4>
              <p className="text-lg mb-2">Email: contact@theskylinestrategies.com</p>
              <p className="text-lg">Work Hour: Mon - Sat: 9:00 - 18:00</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">SERVICES</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Website Development</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">App Development</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Game Development</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Amazon Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">QUICK LINKS</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">About Us</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Our Portfolio</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Contact</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-lg hover:text-blue-300 transition-colors">Terms of Services</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-10 border-t border-white/10 text-center text-lg text-white/60">
            <p>© 2024 The Skyline Strategies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
