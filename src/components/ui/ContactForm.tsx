import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"
import type { ReactNode } from "react"

export function ContactForm(): ReactNode {
  return (
    <form className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          placeholder="Name" 
          className="focus:ring-2 focus:ring-[#0A2647] transition-shadow text-lg py-6 bg-[#0A2647] text-white placeholder:text-white/70 border-white/10"
        />
        <Input 
          type="email" 
          placeholder="Email" 
          className="focus:ring-2 focus:ring-[#0A2647] transition-shadow text-lg py-6 bg-[#0A2647] text-white placeholder:text-white/70 border-white/10"
        />
      </div>
      <Input 
        placeholder="Your Inquiry about" 
        className="focus:ring-2 focus:ring-[#0A2647] transition-shadow text-lg py-6 bg-[#0A2647] text-white placeholder:text-white/70 border-white/10"
      />
      <Textarea 
        placeholder="Message" 
        className="h-48 focus:ring-2 focus:ring-[#0A2647] transition-shadow resize-none text-lg py-6 bg-[#0A2647] text-white placeholder:text-white/70 border-white/10"
      />
      <div className="flex items-center gap-4">
        <Checkbox id="terms" className="w-6 h-6 rounded-md border-white/10 text-[#0A2647] focus:ring-2 focus:ring-[#0A2647]" />
        <label htmlFor="terms" className="text-lg text-white/70">
          By submitting, I agree to the Terms & Conditions
        </label>
      </div>
      <Button type="submit" className="w-full bg-white hover:bg-gray-50 text-[#0A2647] text-lg py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        GET STARTED
      </Button>
    </form>
  )
}
