import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"
import type { ReactNode } from "react"

export function ContactForm(): ReactNode {
  return (
    <form className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">YOU HAVE REQUEST?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          placeholder="Name" 
          className="bg-[#0A2647] text-white border-white/10 placeholder:text-white/60"
        />
        <Input 
          type="email" 
          placeholder="Email" 
          className="bg-[#0A2647] text-white border-white/10 placeholder:text-white/60"
        />
      </div>
      <Input 
        placeholder="Your Inquiry about" 
        className="bg-[#0A2647] text-white border-white/10 placeholder:text-white/60"
      />
      <Textarea 
        placeholder="Message" 
        className="h-32 bg-[#0A2647] text-white border-white/10 placeholder:text-white/60 resize-none"
      />
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm text-white">
          I agree to the Terms & Conditions
        </label>
      </div>
      <Button type="submit" className="w-full bg-white text-[#0A2647] hover:bg-gray-50">
        GET STARTED
      </Button>
    </form>
  )
}
