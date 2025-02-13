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
                  <div className="text-5xl font-bold text-blue-400 mb-3">5+</div>
                  <div className="text-lg">Years of Experience</div>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                  <div className="text-5xl font-bold text-blue-400 mb-3">500+</div>
                  <div className="text-lg">Projects Completed</div>
                </div>
              </div>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900 text-lg py-6 px-12">
                Read More
              </Button>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for about illustration */}
              <div className="aspect-square bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">OUR SERVICES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Website Development",
                description: "Create stunning and functional websites",
                icon: <Database className="h-6 w-6 text-blue-600" />
              },
              {
                title: "App Development",
                description: "Build powerful mobile applications",
                icon: <Database className="h-6 w-6 text-blue-600" />
              },
              {
                title: "Game Development",
                description: "Create engaging gaming experiences",
                icon: <Database className="h-6 w-6 text-blue-600" />
              },
              {
                title: "Digital Marketing",
                description: "Boost your online presence",
                icon: <LineChart className="h-6 w-6 text-blue-600" />
              },
              {
                title: "Amazon Services",
                description: "Grow your Amazon business",
                icon: <Database className="h-6 w-6 text-blue-600" />
              },
              {
                title: "Video Editing",
                description: "Professional video production",
                icon: <Database className="h-6 w-6 text-blue-600" />
              }
            ].map((service, index) => (
              <div key={index} className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                BOOST YOUR BUSINESS TO HIGH LEVEL
              </h2>
              <ul className="space-y-6 mb-12">
                <li className="flex items-center gap-4 bg-white/10 p-5 rounded-lg hover:bg-white/15 transition-colors">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-lg">Expert Team with Years of Experience</span>
                </li>
                <li className="flex items-center gap-4 bg-white/10 p-5 rounded-lg hover:bg-white/15 transition-colors">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-lg">Cutting-edge Technology Solutions</span>
                </li>
                <li className="flex items-center gap-4 bg-white/10 p-5 rounded-lg hover:bg-white/15 transition-colors">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-lg">24/7 Customer Support</span>
                </li>
                <li className="flex items-center gap-4 bg-white/10 p-5 rounded-lg hover:bg-white/15 transition-colors">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-lg">Customized Solutions for Your Business</span>
                </li>
              </ul>
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 text-lg py-6 px-12 shadow-lg hover:shadow-xl transition-all duration-300">
                GET STARTED
              </Button>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for illustration */}
              <div className="aspect-square bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What services do you offer?",
                  answer: "We offer a comprehensive range of IT solutions including Digital Marketing, Website Development, App Development, and more."
                },
                {
                  question: "How long does it take to complete a project?",
                  answer: "Project timelines vary based on complexity and requirements. We provide detailed timelines during consultation."
                },
                {
                  question: "Do you provide ongoing support?",
                  answer: "Yes, we offer 24/7 support and maintenance services for all our solutions."
                },
                {
                  question: "What is your pricing model?",
                  answer: "We offer flexible pricing models tailored to your needs. Contact us for a custom quote."
                },
                {
                  question: "How do I get started?",
                  answer: "Simply click the 'Get Started' button or contact us through our form. We'll schedule a consultation."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-100">
                  <AccordionTrigger className="text-lg font-bold px-6 py-4 hover:bg-gray-50 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Website Development */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">WEBSITE DEVELOPMENT</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Create stunning and functional websites tailored to your business needs.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Custom Web Development",
                "E-commerce Solutions",
                "Responsive Design",
                "UI/UX Design",
                "CMS Integration",
                "Performance Optimization",
                "SEO Integration",
                "Security Implementation",
                "API Development",
                "Database Design",
                "Payment Gateway Integration",
                "Maintenance & Support"
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

          {/* App Development */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">APP DEVELOPMENT</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Build powerful mobile and web applications that drive business growth.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "iOS Development",
                "Android Development",
                "Cross-Platform Apps",
                "React Native Development",
                "Flutter Development",
                "App UI/UX Design",
                "App Testing & QA",
                "App Store Optimization",
                "Push Notifications",
                "Analytics Integration",
                "App Maintenance",
                "Performance Monitoring"
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

          {/* Digital Marketing */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">DIGITAL MARKETING</h3>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Boost your online presence with data-driven digital marketing strategies.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Social Media Marketing",
                "Content Marketing",
                "Email Marketing",
                "SEO Services",
                "PPC Advertising",
                "Analytics & Reporting",
                "Brand Strategy",
                "Influencer Marketing",
                "Marketing Automation",
                "Lead Generation",
                "Conversion Optimization",
                "Market Research"
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
