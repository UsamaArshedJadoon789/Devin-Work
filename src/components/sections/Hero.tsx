import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import type { FC } from "react"

export const Hero: FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('/images/noise/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-2xl lg:max-w-4xl relative">
          <div className="relative z-10 mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 lg:mb-8 text-white leading-[1.1] animate-fade-in animate-duration-700">
              We Build SEO Revenue Engines For SaaS Brands
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 lg:mb-10 max-w-2xl animate-fade-in animate-slide-up animate-delay-200 animate-duration-500">
              Turn your SEO channel into a growth machine and significantly increase your pipeline and ARR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in animate-slide-up animate-delay-300 animate-duration-500">
              <Button 
                className="w-full sm:w-auto bg-[#C6F135] hover:bg-[#D4F55C] hover:scale-105 text-black font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full transition-all duration-500"
              >
                Book a Strategy Call
              </Button>
              <Button 
                variant="ghost" 
                className="group/arrow inline-flex items-center gap-2 w-full sm:w-auto text-white hover:bg-white/10 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full border border-white/20 transition-all duration-500"
              >
                <>Read stories & opinions</>
                <ArrowRight className="group-hover/arrow:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="space-y-4">
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/team-collaboration.jpg" alt="Team Collaboration" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/data-analytics.jpg" alt="Data Analytics" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="space-y-4 mt-20">
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/seo-strategy.jpg" alt="SEO Strategy" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-[#1A2730] rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/hero-grid/growth-chart.jpg" alt="Growth Chart" className="w-full h-32 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="absolute top-[45%] -right-[15%] w-[420px] rounded-2xl bg-[#0F1923] p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 hover:shadow-2xl hover:scale-105 transform-gpu">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C6F135] flex items-center justify-center transition-transform duration-500 hover:scale-110 transform-gpu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 hover:rotate-12">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl transition-colors duration-300">Turn your SEO into a</h3>
              <p className="text-[#C6F135] font-bold text-2xl transition-colors duration-300">Revenue Engine</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#1A2730]/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 text-lg">Monthly Revenue</span>
                <span className="text-[#C6F135] text-lg font-semibold">+147%</span>
              </div>
              <div className="h-14 bg-[#1A2730] rounded-lg relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#C6F135] to-[#D4F55C] transition-all duration-300"></div>
              </div>
            </div>
            <div className="bg-[#1A2730]/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 text-lg">Organic Traffic</span>
                <span className="text-[#C6F135] text-lg font-semibold">+312%</span>
              </div>
              <div className="h-14 bg-[#1A2730] rounded-lg relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-4/5 bg-gradient-to-r from-[#C6F135] to-[#D4F55C] transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 mt-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
          <img src="/images/clients/hubspot.svg" alt="HubSpot" className="h-8 w-auto grayscale opacity-25 hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-110 transform-gpu" />
          <img src="/images/clients/attest.svg" alt="Attest" className="h-8 w-auto grayscale opacity-25 hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-110 transform-gpu" />
          <img src="/images/clients/flodesk.svg" alt="Flodesk" className="h-8 w-auto grayscale opacity-25 hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-110 transform-gpu" />
          <img src="/images/clients/recruitee.svg" alt="Recruitee" className="h-8 w-auto grayscale opacity-25 hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-110 transform-gpu" />
          <img src="/images/clients/testgorilla.svg" alt="TestGorilla" className="h-8 w-auto grayscale opacity-25 hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-110 transform-gpu" />
          <img src="/images/clients/travelperk.svg" alt="TravelPerk" className="h-8 w-auto grayscale opacity-25 hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-110 transform-gpu" />
        </div>
      </div>
    </section>
  );
}
