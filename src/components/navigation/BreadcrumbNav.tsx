import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return { path, label };
  });
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={crumb.path}
            className="hover:text-foreground"
          >
            {crumb.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
