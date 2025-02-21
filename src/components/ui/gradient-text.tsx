import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText = ({ children, className }: GradientTextProps) => (
  <span className={cn(
    "bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent animate-fade-in",
    className
  )}>
    {children}
  </span>
)
