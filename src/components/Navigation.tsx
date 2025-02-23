import * as React from "react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from "./ui/navigation-menu"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"

interface NavigationProps {
  navigationItems: {
    label: string;
    items?: Array<{
      title: string;
      href: string;
    }>;
    href?: string;
  }[];
}

export const Navigation = ({ navigationItems }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-200",
      isScrolled ? "bg-dark-900/80 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white hover:text-white/90 transition-colors">
            The Skyline Strategies
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-8">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger 
                          className="text-white/80 bg-transparent hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 w-[400px] bg-dark-800 rounded-lg border border-white/10">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <Link 
                                  to={subItem.href}
                                  className="block text-white/80 hover:text-white hover:bg-forest/10 rounded-md px-4 py-2 transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        to={item.href!}
                        className="text-white/80 hover:text-white transition-colors px-4 py-2"
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button 
              className="bg-forest hover:bg-forest-600 text-white transition-colors"
            >
              Book a Strategy Call
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
