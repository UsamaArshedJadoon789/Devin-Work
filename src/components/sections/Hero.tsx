import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import type { FC } from "react"

export const Hero: FC = () => {
  const buttonText = "Read stories & opinions";

  return (
    <section className="relative h-screen w-full bg-primary overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-4 flex-1 flex items-center relative z-10">
        <div className="max-w-4xl">
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

        <div className="absolute top-20 right-20 w-[400px] h-[250px] rounded-2xl bg-secondary p-6 shadow-xl transform rotate-6 animate-float">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 11.5V14.5L12 19L4 14.5V11.5L12 16L20 11.5Z" fill="currentColor"/>
                <path d="M20 8.5V11.5L12 16L4 11.5V8.5L12 13L20 8.5Z" fill="currentColor"/>
                <path d="M12 3L20 7.5L12 12L4 7.5L12 3Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Turn your SEO into a</h3>
              <p className="text-accent">Revenue Engine</p>
            </div>
          </div>
          <div className="h-32 bg-gradient-to-b from-[#1A2730] to-secondary rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-6 gap-8 items-center opacity-40">
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
