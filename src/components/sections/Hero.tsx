import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import type { FC } from "react"

export const Hero: FC = () => {
  return (
    <section className="relative min-h-[100vh] w-screen bg-[#0A0A0A] flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/20 via-[#0A0A0A] to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-[url('/images/noise/noise.png')] opacity-[0.08] mix-blend-overlay pointer-events-none" />
      
      <div className="w-full flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 relative">
          <div className="relative z-10 mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 lg:mb-8 text-white leading-[1.1] opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
              We Build SEO Revenue Engines For SaaS Brands
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 lg:mb-10 max-w-2xl opacity-0 animate-[slideUp_0.8s_ease-out_0.6s_forwards]">
              Turn your SEO channel into a growth machine and significantly increase your pipeline and ARR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 opacity-0 animate-[scaleIn_0.8s_ease-out_1s_forwards]">
              <Button 
                className="w-full sm:w-auto bg-[#C6F135] hover:bg-[#D4F55C] hover:scale-105 text-black font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full transition-all duration-500"
              >
                Book a Strategy Call
              </Button>
              <Button 
                variant="ghost" 
                className="w-full sm:w-auto text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full border border-white/20 transition-all duration-300"
              >
                Read stories &amp; opinions
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <div className="grid grid-cols-2 gap-6 p-8">
              <div className="space-y-6">
                <div className="bg-[#1A2730] rounded-2xl overflow-hidden transform hover:scale-105 hover:-translate-y-1 transition-all duration-700 hover:shadow-2xl group">
                  <img src="/images/hero-grid/team-collaboration.jpg" alt="Team Collaboration" className="w-full h-36 object-cover opacity-85 group-hover:opacity-100 transition-all duration-700" />
                </div>
                <div className="bg-[#1A2730] rounded-xl overflow-hidden transform hover:scale-105 hover:-translate-y-1 transition-all duration-700 hover:shadow-2xl group">
                  <img src="/images/hero-grid/data-analytics.jpg" alt="Data Analytics" className="w-full h-36 object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                </div>
              </div>
              <div className="space-y-6 mt-24">
                <div className="bg-[#1A2730] rounded-2xl overflow-hidden transform hover:scale-105 hover:-translate-y-1 transition-all duration-700 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] group">
                  <img src="/images/hero-grid/seo-strategy.jpg" alt="SEO Strategy" className="w-full h-36 object-cover opacity-85 group-hover:opacity-100 transition-all duration-700" />
                </div>
                <div className="bg-[#1A2730] rounded-xl overflow-hidden transform hover:scale-105 hover:-translate-y-1 transition-all duration-700 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] group">
                  <img src="/images/hero-grid/growth-chart.jpg" alt="Growth Chart" className="w-full h-36 object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="absolute top-[40%] -right-[15%] w-[420px] rounded-2xl bg-[#0F1923] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] transform rotate-6 animate-[float_6s_ease-in-out_infinite] hover:rotate-3 hover:-translate-y-2 transition-all duration-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C6F135] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl">Turn your SEO into a</h3>
              <p className="text-[#C6F135] font-bold text-2xl">Revenue Engine</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#1A2730]/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 text-lg">Monthly Revenue</span>
                <span className="text-[#C6F135] text-lg font-semibold">+147%</span>
              </div>
              <div className="h-14 bg-[#1A2730] rounded-lg relative overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#C6F135] to-[#D4F55C] transition-all duration-700 group-hover:w-[85%] group-hover:shadow-lg"></div>
              </div>
            </div>
            <div className="bg-[#1A2730]/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 text-lg">Organic Traffic</span>
                <span className="text-[#C6F135] text-lg font-semibold">+312%</span>
              </div>
              <div className="h-14 bg-[#1A2730] rounded-lg relative overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-4/5 bg-gradient-to-r from-[#C6F135] to-[#D4F55C] transition-all duration-700 group-hover:w-[90%] group-hover:shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-auto">
        <div className="w-full max-w-[1400px] mx-auto px-8 py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-30 hover:opacity-40 transition-all duration-700 group">
            <img src="/images/clients/hubspot.svg" alt="HubSpot" className="h-8 w-auto grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" />
            <img src="/images/clients/attest.svg" alt="Attest" className="h-8 w-auto grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" />
            <img src="/images/clients/flodesk.svg" alt="Flodesk" className="h-8 w-auto grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" />
            <img src="/images/clients/recruitee.svg" alt="Recruitee" className="h-8 w-auto grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" />
            <img src="/images/clients/testgorilla.svg" alt="TestGorilla" className="h-8 w-auto grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" />
            <img src="/images/clients/travelperk.svg" alt="TravelPerk" className="h-8 w-auto grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
