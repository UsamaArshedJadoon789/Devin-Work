import { Fragment, ReactNode } from "react"

interface HeroFeatureCardProps {
  icon: ReactNode
  text: string
}

export function HeroFeatureCard({ icon, text }: HeroFeatureCardProps) {
  return (
    <div className="flex items-center gap-4 bg-white/10 p-5 rounded-lg hover:bg-white/15 transition-colors">
      <div className="text-blue-400">
        {icon}
      </div>
      <span className="text-lg">{text}</span>
    </div>
  )
}
