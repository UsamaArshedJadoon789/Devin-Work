import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"
import type { ReactNode } from "react"

export function ContactForm(): ReactNode {
  return (
    <section className="py-32 bg-gradient-to-br from-[#0A2647] to-[#0A3157]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157]">
            YOU HAVE REQUEST?
          </h2>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                placeholder="Name" 
                className="focus:ring-2 focus:ring-[#0A2647] transition-shadow text-lg py-6 bg-gray-50"
              />
              <Input 
                type="email" 
                placeholder="Email" 
                className="focus:ring-2 focus:ring-[#0A2647] transition-shadow text-lg py-6 bg-gray-50"
              />
            </div>
            <Input 
              placeholder="Your Inquiry about" 
              className="focus:ring-2 focus:ring-[#0A2647] transition-shadow text-lg py-6 bg-gray-50"
            />
            <Textarea 
              placeholder="Message" 
              className="h-48 focus:ring-2 focus:ring-[#0A2647] transition-shadow resize-none text-lg py-6 bg-gray-50"
            />
            <div className="flex items-center gap-4">
              <Checkbox id="terms" className="w-6 h-6 rounded-md border-gray-300 text-[#0A2647] focus:ring-2 focus:ring-[#0A2647]" />
              <label htmlFor="terms" className="text-lg text-gray-600">
                By submitting, I agree to the Terms & Conditions
              </label>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#0A2647] to-[#0A3157] hover:from-[#0A3157] hover:to-[#0A2647] text-white text-lg py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              GET STARTED
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
