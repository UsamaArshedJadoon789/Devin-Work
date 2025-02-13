import React from "react"
import { type ReactNode } from "react"
import { cn } from "../../lib/utils"

interface HeroFeatureCardProps {
  icon: ReactNode
  text: string
  className?: string
}

export function HeroFeatureCard({ icon, text, className }: HeroFeatureCardProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300",
      className
    )}>
      {icon}
      <span className="text-sm md:text-base font-medium">{text}</span>
    </div>
  )
}
