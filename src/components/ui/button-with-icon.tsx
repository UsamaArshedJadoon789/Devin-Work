import { type FC } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "./button"

export const ButtonWithIcon: FC<{ text: string }> = ({ text }) => (
  <Button 
    variant="ghost"
    className="w-full text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full border border-white/20 transition-colors duration-300 inline-flex items-center gap-2"
  >
    {text}
    <ArrowRight size={20} />
  </Button>
)
