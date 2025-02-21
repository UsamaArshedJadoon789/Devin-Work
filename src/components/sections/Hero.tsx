import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import type { FC } from "react"

export const Hero: FC = () => {
  const buttonText = "Read stories & opinions";

  return (
    <section className="flex-1 relative w-full bg-primary overflow-hidden flex flex-col min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5"></div>
      
      <div className="container mx-auto px-4 min-h-[calc(100vh-5rem)] flex items-center relative z-10">
        <div className="max-w-2xl lg:max-w-4xl relative">
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <div className="grid grid-cols-2 gap-4 p-8">
              <div className="space-y-4">
                <div className="bg-[#1A2730] rounded-lg overflow-hidden">
                  <img src="/images/hero-grid/meeting-1.jpg" alt="Team Meeting" className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-[#1A2730] rounded-lg overflow-hidden">
                  <img src="/images/hero-grid/analytics.jpg" alt="Analytics Dashboard" className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="space-y-4 mt-12">
                <div className="bg-[#1A2730] rounded-lg overflow-hidden">
                  <img src="/images/hero-grid/team-2.jpg" alt="Team Collaboration" className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-[#1A2730] rounded-lg overflow-hidden">
                  <img src="/images/hero-grid/growth.jpg" alt="Growth Chart" className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#003344] via-transparent to-transparent"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 lg:mb-8 text-white leading-[1.1] animate-fade-in">
            We Build SEO Revenue Engines For SaaS Brands
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 lg:mb-10 max-w-2xl animate-slide-up delay-100">
            Turn your SEO channel into a growth machine and significantly increase your pipeline and ARR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-slide-up delay-200">
            <Button 
              className="bg-accent hover:bg-accent-hover text-black font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              Book a Strategy Call
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full border border-white/20 transition-all duration-300"
            >
              {buttonText}
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="absolute top-1/3 -right-[5%] w-[400px] rounded-2xl bg-[#0F1923] p-6 shadow-xl transform rotate-6 animate-float hover:rotate-3 transition-transform">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#C6F135] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Turn your SEO into a</h3>
              <p className="text-[#C6F135] font-bold text-xl">Revenue Engine</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-[#1A2730]/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Monthly Revenue</span>
                <span className="text-[#C6F135]">+147%</span>
              </div>
              <div className="h-12 bg-[#1A2730] rounded relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#C6F135] to-[#D4F55C]"></div>
              </div>
            </div>
            <div className="bg-[#1A2730]/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Organic Traffic</span>
                <span className="text-[#C6F135]">+312%</span>
              </div>
              <div className="h-12 bg-[#1A2730] rounded relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-4/5 bg-gradient-to-r from-[#C6F135] to-[#D4F55C]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-40">
          <img src="/images/clients/hubspot.svg" alt="HubSpot" className="h-6" />
          <img src="/images/clients/attest.svg" alt="Attest" className="h-6" />
          <img src="/images/clients/flodesk.svg" alt="Flodesk" className="h-6" />
          <img src="/images/clients/recruitee.svg" alt="Recruitee" className="h-6" />
          <img src="/images/clients/testgorilla.svg" alt="TestGorilla" className="h-6" />
          <img src="/images/clients/travelperk.svg" alt="TravelPerk" className="h-6" />
        </div>
      </div>
    </section>
  );
}
