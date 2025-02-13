import { cn } from "../../lib/utils"
import { type ReactNode } from "react"

interface ServiceCardProps {
  title: string
  description?: string
  icon?: ReactNode
  className?: string
  variant?: 'dark' | 'light'
}

export function ServiceCard({
  title,
  description,
  icon,
  className,
  variant = 'dark'
}: ServiceCardProps) {
  return (
    <div className={cn(
      "p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      variant === 'dark' 
        ? "bg-[#0A2647] text-white" 
        : "bg-gray-100 text-[#0A2647]",
      className
    )}>
      {icon && (
        <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-white/10">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-sm opacity-90">{description}</p>}
    </div>
  )
}
