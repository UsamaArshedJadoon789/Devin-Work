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
      "flex items-center gap-5 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300",
      className
    )}>
      <div className="p-3 rounded-xl bg-white/10">
        {icon}
      </div>
      <span className="text-lg font-medium text-gray-100">{text}</span>
    </div>
  )
}
