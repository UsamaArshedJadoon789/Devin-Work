import { Button } from "../ui/button"

export function AboutSection() {
  return (
    <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              EMPOWERING BUSINESSES WITH INNOVATIVE IT SOLUTIONS
            </h2>
            <p className="text-xl text-gray-200 mb-12">
              We deliver cutting-edge technology solutions that drive growth and efficiency for businesses of all sizes.
            </p>
            <div className="grid grid-cols-2 gap-10 mb-12">
              <div className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <div className="text-5xl font-bold text-blue-400 mb-3">5+</div>
                <div className="text-lg">Years of Experience</div>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <div className="text-5xl font-bold text-blue-400 mb-3">500+</div>
                <div className="text-lg">Projects Completed</div>
              </div>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0A2647] text-lg py-6 px-12">
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
  )
}
