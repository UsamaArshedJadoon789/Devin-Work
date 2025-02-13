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
      "p-4 sm:p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer",
      variant === 'dark' 
        ? "bg-[#0A2647] text-white" 
        : "bg-gray-100 text-[#0A2647]",
      className
    )}>
      {icon && (
        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center rounded-lg bg-white/10 transform group-hover:rotate-6 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[#0A3157]">{title}</h3>
      {description && <p className="text-sm sm:text-base opacity-90 transition-opacity duration-300 group-hover:opacity-100">{description}</p>}
    </div>
  )
}
