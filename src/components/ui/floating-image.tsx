import { cn } from "@/lib/utils"

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export const FloatingImage = ({ src, alt, className, delay = 0 }: FloatingImageProps) => (
  <div 
    className={cn(
      "absolute animate-slide-up opacity-0",
      className
    )}
    style={{ 
      animationDelay: `${delay}ms`,
      animationFillMode: 'forwards'
    }}
  >
    <img src={src} alt={alt} className="rounded-lg shadow-xl" />
  </div>
)
