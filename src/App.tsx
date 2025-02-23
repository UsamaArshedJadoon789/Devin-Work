import './App.css'
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, MessageCircle } from "lucide-react"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GradientText } from "./components/ui/gradient-text"
import { Toaster, toast } from "sonner"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
export default function App() {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      form.reset();
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#003344] flex flex-col">
      {/* Navigation */}
      <nav className="container mx-auto py-4 sticky top-0 z-50 bg-[#003344]/80 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">The Skyline Strategies</div>
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-12">
                <NavigationMenuItem>
                  <button onClick={() => setCurrentPage('home')} className="text-white hover:text-blue-200">Home</button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => setCurrentPage('services')} className="text-white hover:text-blue-200">Services</button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => setCurrentPage('pricing')} className="text-white hover:text-blue-200">Pricing</button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => setCurrentPage('about')} className="text-white hover:text-blue-200">About Us</button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => setCurrentPage('portfolio')} className="text-white hover:text-blue-200">Our Portfolio</button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => setCurrentPage('blog')} className="text-white hover:text-blue-200">Our Blogs</button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => setCurrentPage('contact')} className="text-white hover:text-blue-200">Contact</button>
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
                <button onClick={() => setCurrentPage('home')} className="text-lg hover:text-blue-200">Home</button>
                <button onClick={() => setCurrentPage('services')} className="text-lg hover:text-blue-200">Services</button>
                <button onClick={() => setCurrentPage('pricing')} className="text-lg hover:text-blue-200">Pricing</button>
                <button onClick={() => setCurrentPage('about')} className="text-lg hover:text-blue-200">About Us</button>
                <button onClick={() => setCurrentPage('portfolio')} className="text-lg hover:text-blue-200">Our Portfolio</button>
                <button onClick={() => setCurrentPage('blog')} className="text-lg hover:text-blue-200">Our Blogs</button>
                <button onClick={() => setCurrentPage('contact')} className="text-lg hover:text-blue-200">Contact</button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Main Content */}
      {currentPage === 'home' && (
        <>
          <Hero />
          <Services />
          <Testimonials />
          <FAQ />
          {/* Contact Form */}
          <section className="container mx-auto py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <GradientText>Get in Touch</GradientText>
              </h2>
              <p className="text-xl text-gray-300">Ready to grow your business? Let's talk.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="Enter your name"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                type="email"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="Enter your email"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Message</FormLabel>
                            <FormControl>
                              <textarea
                                {...field}
                                rows={5}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                                placeholder="Tell us about your project"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-accent text-primary hover:bg-accent/90 py-6 text-lg">
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}

      {currentPage === 'services' && (
        <>
          <section className="container mx-auto py-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
              <p className="text-lg text-gray-300">Explore our comprehensive range of digital solutions</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">🌐</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Website Development</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Custom website design and development</li>
                        <li>• E-commerce solutions</li>
                        <li>• Content Management Systems (CMS)</li>
                        <li>• Website maintenance and support</li>
                        <li>• Performance optimization</li>
                        <li>• SEO-friendly architecture</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">📱</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">App Development</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• iOS and Android app development</li>
                        <li>• Cross-platform solutions</li>
                        <li>• Progressive Web Apps (PWA)</li>
                        <li>• App maintenance and updates</li>
                        <li>• UI/UX design</li>
                        <li>• App Store optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">📈</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Digital Marketing</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Search Engine Optimization (SEO)</li>
                        <li>• Social Media Marketing</li>
                        <li>• Pay-Per-Click (PPC) Advertising</li>
                        <li>• Content Marketing</li>
                        <li>• Email Marketing</li>
                        <li>• Analytics and Reporting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">🎮</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Game Development</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Unity and Unreal Engine development</li>
                        <li>• Mobile game development</li>
                        <li>• 2D and 3D game design</li>
                        <li>• Multiplayer integration</li>
                        <li>• Game testing and QA</li>
                        <li>• Monetization strategies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="container mx-auto py-20 bg-gradient-to-r from-blue-900 to-blue-800">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
              <p className="text-lg text-gray-300">How we deliver exceptional results</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">Discovery</h3>
                <p className="text-gray-300">Understanding your needs and objectives</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">Planning</h3>
                <p className="text-gray-300">Creating a detailed roadmap for success</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">Execution</h3>
                <p className="text-gray-300">Implementing solutions with precision</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">4️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">Support</h3>
                <p className="text-gray-300">Ongoing maintenance and optimization</p>
              </div>
            </div>
          </section>

          <section className="container mx-auto py-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-gray-300 mb-8">Contact us today to discuss your project</p>
              <Button className="bg-white text-blue-900 hover:bg-blue-50 flex items-center gap-2 text-lg px-8 py-6">
                Schedule Free Consultation
              </Button>
            </div>
          </section>
        </>
      )}

      {currentPage === 'pricing' && (
        <>
          <section className="container mx-auto py-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white mb-4 motion-safe:animate-fade-in-down animate-duration-700">Pricing Plans</h1>
              <p className="text-lg text-gray-300 motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200">Choose the perfect plan for your business needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card 
                className="group bg-white/10 backdrop-blur border-none text-white transform-gpu hover:scale-105 transition-all duration-500 motion-safe:animate-fade-in"
                style={{ animationDelay: '0ms' }}
              >
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">Starter</h3>
                    <div className="text-4xl font-bold mb-4 motion-safe:animate-slide-in">$999</div>
                    <p className="text-gray-300 mb-6">Perfect for small businesses</p>
                    <ul className="space-y-3 text-gray-300 text-left mb-8">
                      {['Basic website development', '5 pages', 'Mobile responsive', 'Basic SEO setup', 'Contact form', '1 month support'].map((feature, i) => (
                        <li 
                          key={i} 
                          className="group/item flex items-center gap-2 hover:translate-y-1 transition-transform"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          <span className="text-accent group-hover/item:animate-bounce">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 transform-gpu hover:scale-105 transition-all duration-300">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card 
                className="group bg-gradient-to-r from-blue-900 to-blue-800 border-2 border-white text-white relative transform-gpu hover:scale-105 transition-all duration-500 motion-safe:animate-fade-in"
                style={{ animationDelay: '150ms' }}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-900 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                  Most Popular
                </div>
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">Professional</h3>
                    <div className="text-4xl font-bold mb-4 motion-safe:animate-slide-in">$2,499</div>
                    <p className="text-gray-300 mb-6">For growing businesses</p>
                    <ul className="space-y-3 text-gray-300 text-left mb-8">
                      {[
                        'Advanced website development',
                        '10 pages',
                        'Mobile responsive',
                        'Advanced SEO setup',
                        'Custom forms',
                        '3 months support',
                        'Social media integration',
                        'Analytics setup'
                      ].map((feature, i) => (
                        <li 
                          key={i}
                          className="group/item flex items-center gap-2 hover:translate-y-1 transition-transform"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          <span className="text-accent group-hover/item:animate-bounce">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 transform-gpu hover:scale-105 transition-all duration-300">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card 
                className="group bg-white/10 backdrop-blur border-none text-white transform-gpu hover:scale-105 transition-all duration-500 motion-safe:animate-fade-in"
                style={{ animationDelay: '300ms' }}
              >
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">Enterprise</h3>
                    <div className="text-4xl font-bold mb-4 motion-safe:animate-slide-in">Custom</div>
                    <p className="text-gray-300 mb-6">For large organizations</p>
                    <ul className="space-y-3 text-gray-300 text-left mb-8">
                      {[
                        'Custom website development',
                        'Unlimited pages',
                        'Advanced features',
                        'Full SEO package',
                        'Custom integrations',
                        '12 months support',
                        'Priority support',
                        'Custom solutions'
                      ].map((feature, i) => (
                        <li 
                          key={i}
                          className="group/item flex items-center gap-2 hover:translate-y-1 transition-transform"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          <span className="text-accent group-hover/item:animate-bounce">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 transform-gpu hover:scale-105 transition-all duration-300">Contact Us</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="container mx-auto py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-300">Find answers to common questions</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">What's included in the support?</h3>
                  <p className="text-gray-300">Our support includes bug fixes, content updates, and technical assistance during the specified period.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Can I upgrade my plan later?</h3>
                  <p className="text-gray-300">Yes, you can upgrade to a higher plan at any time. We'll help you transition smoothly.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Do you offer custom solutions?</h3>
                  <p className="text-gray-300">Yes, our Enterprise plan is fully customizable to meet your specific requirements.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">What's your turnaround time?</h3>
                  <p className="text-gray-300">Typical projects take 4-8 weeks, depending on complexity and requirements.</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}

      {currentPage === 'about' && (
        <>
          <section className="container mx-auto py-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
              <p className="text-lg text-gray-300">Learn more about our journey and mission</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <p className="text-gray-300 mb-4">
                  Founded in 2022, The Skyline Strategies has grown from a small team of passionate developers
                  into a full-service digital agency. Our journey began with a simple mission: to help businesses
                  thrive in the digital age.
                </p>
                <p className="text-gray-300 mb-4">
                  Today, we're proud to have served over 130 clients worldwide, delivering innovative solutions
                  that drive real business growth. Our team of experts combines technical excellence with
                  creative innovation to produce outstanding results.
                </p>
                <p className="text-gray-300">
                  We believe in building long-term partnerships with our clients, understanding their unique
                  challenges, and delivering solutions that exceed expectations.
                </p>
              </div>
              <Card className="bg-white/10 backdrop-blur border-none text-white h-fit">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Our Values</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Excellence</h4>
                        <p className="text-gray-300">We strive for excellence in everything we do, ensuring the highest quality in our deliverables.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🤝</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Partnership</h4>
                        <p className="text-gray-300">We build strong, lasting relationships with our clients, becoming true partners in their success.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Innovation</h4>
                        <p className="text-gray-300">We embrace new technologies and creative solutions to solve complex challenges.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="container mx-auto py-20 bg-gradient-to-r from-blue-900 to-blue-800">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Team</h2>
              <p className="text-lg text-gray-300">Meet the experts behind our success</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-6xl mb-4">👨</div>
                <h3 className="text-xl font-bold text-white mb-2">John Smith</h3>
                <p className="text-gray-300">CEO &amp; Founder</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">👩</div>
                <h3 className="text-xl font-bold text-white mb-2">Sarah Johnson</h3>
                <p className="text-gray-300">Technical Director</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">💻</div>
                <h3 className="text-xl font-bold text-white mb-2">Michael Chen</h3>
                <p className="text-gray-300">Lead Developer</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Emily Brown</h3>
                <p className="text-gray-300">Creative Director</p>
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === 'portfolio' && (
        <section className="container mx-auto py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4 motion-safe:animate-fade-in-down animate-duration-700">Our Portfolio</h1>
            <p className="text-lg text-gray-300 motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200">Explore our successful projects</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "E-commerce Platform Redesign",
                description: "Complete redesign and development of an e-commerce platform, resulting in 150% increase in conversion rates",
                image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3",
                tags: ["E-commerce", "UI/UX", "Web Development"]
              },
              {
                id: 2,
                title: "Mobile App Development",
                description: "Native iOS and Android app development for a fitness tracking platform with 50,000+ downloads",
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3",
                tags: ["Mobile", "iOS", "Android"]
              },
              {
                id: 3,
                title: "Digital Marketing Campaign",
                description: "Comprehensive digital marketing strategy that increased organic traffic by 200%",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
                tags: ["Marketing", "SEO", "Analytics"]
              },
              {
                id: 4,
                title: "Custom CRM Development",
                description: "Built a custom CRM system that improved customer service efficiency by 75%",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3",
                tags: ["CRM", "Software", "Automation"]
              },
              {
                id: 5,
                title: "Social Media Management",
                description: "Increased social media engagement by 300% through strategic content planning",
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3",
                tags: ["Social Media", "Content", "Strategy"]
              },
              {
                id: 6,
                title: "Website Performance Optimization",
                description: "Improved website loading speed by 70% and enhanced user experience",
                image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3",
                tags: ["Performance", "Web Development", "SEO"]
              }
            ].map((item, index) => (
              <Card 
                key={item.id} 
                className="group bg-white/10 backdrop-blur border-none text-white transform-gpu hover:scale-110 hover:rotate-6 transition-all duration-500 motion-safe:animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <h3 className="text-xl font-bold mt-4 group-hover:translate-y-1 transition-transform">{item.title}</h3>
                  <p className="text-gray-300 mb-4 motion-safe:animate-slide-in" style={{ animationDelay: `${index * 150 + 100}ms` }}>{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="bg-white/20 px-2 py-1 rounded text-sm hover:skew-x-6 transition-transform"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {currentPage === 'blog' && (
        <section className="container mx-auto py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
            <p className="text-lg text-gray-300">Latest insights and updates</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "The Future of Digital Marketing in 2025",
                excerpt: "Explore emerging trends and technologies shaping the digital marketing landscape in 2025 and beyond.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
                categories: ["Digital Marketing", "Trends"]
              },
              {
                id: 2,
                title: "10 Essential SEO Strategies for Business Growth",
                excerpt: "Learn the most effective SEO strategies that can help your business achieve sustainable organic growth.",
                image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3",
                categories: ["SEO", "Business Growth"]
              },
              {
                id: 3,
                title: "Mobile App Development Best Practices",
                excerpt: "Discover the key principles and practices for building successful mobile applications.",
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3",
                categories: ["Development", "Mobile"]
              },
              {
                id: 4,
                title: "Maximizing ROI with Social Media Marketing",
                excerpt: "Learn how to create effective social media campaigns that deliver measurable results.",
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3",
                categories: ["Social Media", "Marketing"]
              },
              {
                id: 5,
                title: "Web Design Trends That Convert",
                excerpt: "Explore the latest web design trends that help improve conversion rates and user engagement.",
                image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3",
                categories: ["Web Design", "Conversion"]
              },
              {
                id: 6,
                title: "The Impact of AI in Modern Business",
                excerpt: "Understanding how artificial intelligence is transforming business operations and customer experiences.",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3",
                categories: ["AI", "Technology"]
              }
            ].map((post) => (
              <Card key={post.id} className="bg-white/10 backdrop-blur border-none text-white">
                <CardContent className="p-6">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded mb-4" />
                  <div className="flex gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span key={category} className="bg-white/20 px-2 py-1 rounded text-sm">{category}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-300">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {currentPage === 'contact' && (
        <section className="container mx-auto py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-lg text-gray-300">Get in touch with our team</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-none text-white">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400"
                              placeholder="Enter your name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              type="email"
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400"
                              placeholder="Enter your email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <textarea
                              {...field}
                              rows={5}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400 resize-none"
                              placeholder="Enter your message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-blue-50">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="container mx-auto py-12 text-white">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">The Skyline Strategies</h3>
            <p className="text-gray-300">Empowering businesses with innovative IT solutions</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">Mon - Sat: 9:00 - 18:00</p>
            <p className="text-gray-300"><a href="mailto:contact@theskylinestrategies.com" className="hover:text-blue-200">contact@theskylinestrategies.com</a></p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-blue-200">About Us</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="hover:text-blue-200">Services</button></li>
              <li><button onClick={() => setCurrentPage('portfolio')} className="hover:text-blue-200">Portfolio</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-blue-200">Contact</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Terms &amp; Conditions</li>
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
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
          className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center gap-2"
          onClick={() => setIsWhatsAppVisible(false)}
        >
          <MessageCircle size={24} />
        </a>
      )}
      <Toaster position="top-right" />
    </div>
  )
}
