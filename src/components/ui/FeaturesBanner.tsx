import { type ReactNode } from "react"

interface FeaturesBannerProps {
  features: Array<{
    text: string
    icon: ReactNode
  }>
}

export function FeaturesBanner({ features }: FeaturesBannerProps) {
  return (
    <div className="bg-[#0A2647] text-white py-6 overflow-hidden whitespace-nowrap">
      <div className="animate-scroll inline-flex items-center space-x-16">
        {features.map((feature, index) => (
          <div key={index} className="inline-flex items-center space-x-3">
            <div className="text-blue-400">
              {feature.icon}
            </div>
            <span className="text-lg font-medium">{feature.text}</span>
          </div>
        ))}
        {/* Duplicate features for seamless loop */}
        {features.map((feature, index) => (
          <div key={`duplicate-${index}`} className="inline-flex items-center space-x-3">
            <div className="text-blue-400">
              {feature.icon}
            </div>
            <span className="text-lg font-medium">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
