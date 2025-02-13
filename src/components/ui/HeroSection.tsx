import { cn } from "../../lib/utils"
import { type ReactNode } from "react"

interface HeroSectionProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  illustration?: ReactNode
}

export function HeroSection({
  title,
  subtitle,
  children,
  className,
  illustration
}: HeroSectionProps) {
  return (
    <section className={cn(
      "bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white py-20",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
            {subtitle && <p className="text-lg text-white/90">{subtitle}</p>}
            {children}
          </div>
          {illustration && (
            <div className="flex-1 flex justify-center">
              {illustration}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
