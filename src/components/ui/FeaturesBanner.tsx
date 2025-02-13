import { type ReactNode } from "react"

interface FeaturesBannerProps {
  features: Array<{
    text: string
    icon: React.ReactNode
  }>
}

export function FeaturesBanner({ features }: FeaturesBannerProps) {
  return (
    <div className="bg-[#0A2647] text-white py-4 overflow-hidden whitespace-nowrap">
      <div className="animate-[scroll_20s_linear_infinite] inline-flex items-center space-x-8">
        {features.map((feature, index) => (
          <div key={index} className="inline-flex items-center space-x-2">
            {feature.icon}
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
