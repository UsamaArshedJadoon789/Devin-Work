import { useState } from "react"
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

interface MobileMenuProps {
  navigationItems: {
    label: string;
    items?: Array<{
      title: string;
      href: string;
    }>;
    href?: string;
  }[];
}

export const MobileMenu = ({ navigationItems }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-dark-900/95 backdrop-blur-sm border-l border-white/10 p-0">
        <nav className="flex flex-col gap-6 p-6">
          {navigationItems.map((item) => (
            <div key={item.label}>
              <h3 className="text-forest font-medium mb-3">{item.label}</h3>
              {item.items ? (
                <div className="flex flex-col gap-2 pl-4">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="pl-4">
                  <Link
                    to={item.href!}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </div>
              )}
            </div>
          ))}
          <Button 
            className="bg-forest hover:bg-forest-600 text-white transition-colors w-full mt-4"
          >
            Book a Strategy Call
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
