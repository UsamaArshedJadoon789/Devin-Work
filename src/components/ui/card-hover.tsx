import { Card, CardContent } from "./card"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface CardHoverProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHover = ({ children, className, ...props }: CardHoverProps) => (
  <Card 
    className={cn(
      "group hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur border-none",
      className
    )}
    {...props}
  >
    <CardContent>
      {children}
    </CardContent>
  </Card>
)
