import { GradientText } from "../ui/gradient-text"
import { FloatingImage } from "../ui/floating-image"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import type { FC } from "react"

export const Hero: FC = () => (
  <section className="relative overflow-hidden">
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl">
        <h1 className="text-7xl font-bold mb-6">
          <GradientText>We Build SEO Revenue Engines For SaaS Brands</GradientText>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          The SaaS SEO Agency that fully manages your SEO channel and drives month-on-month PQL/SQL growth and drives MRR
        </p>
        <div className="flex gap-4">
          <Button className="bg-accent text-primary hover:bg-accent/90 text-lg px-6 py-6">
            Book a Strategy Call
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10 text-lg px-6 py-6">
            Read stories &amp; opinions
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Floating Images */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] -z-10">
        <FloatingImage
          src="/images/team-meeting.jpg"
          alt="Team meeting"
          className="top-20 right-20"
          delay={200}
        />
        <FloatingImage
          src="/images/growth-chart.png"
          alt="Growth chart"
          className="bottom-20 right-40"
          delay={400}
        />
        <FloatingImage
          src="/images/skale-logo.png"
          alt="Skale logo"
          className="top-40 right-40"
          delay={600}
        />
      </div>
    </div>

    {/* Client Logos */}
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center opacity-50">
        <img src="/images/clients/hubspot.svg" alt="HubSpot" className="h-8" />
        <img src="/images/clients/attest.svg" alt="Attest" className="h-8" />
        <img src="/images/clients/flodesk.svg" alt="Flodesk" className="h-8" />
        <img src="/images/clients/recruitee.svg" alt="Recruitee" className="h-8" />
        <img src="/images/clients/testgorilla.svg" alt="TestGorilla" className="h-8" />
        <img src="/images/clients/travelperk.svg" alt="TravelPerk" className="h-8" />
      </div>
    </div>
  </section>
)
