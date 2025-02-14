import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  FileText, 
  BarChart, 
  Users 
} from 'lucide-react';

const teamMembers = [
  'Hamza Sohail',
  'Farah Al-Haj Ahmad',
  'Moath Abusall'
];

const routes = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/daily-tasks', label: 'Daily Tasks', icon: ClipboardList },
  { path: '/reports', label: 'Weekly Reports', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: BarChart },
  { path: '/team', label: 'Team', icon: Users }
];

export const NavigationMenu: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="space-y-6">
      <div className="space-y-1">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = location.pathname === route.path;
          
          return (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              {route.label}
            </Link>
          );
        })}
      </div>
      
      <div className="border-t border-border pt-4">
        <h3 className="px-4 text-sm font-medium text-muted-foreground mb-3">Team Members</h3>
        <div className="space-y-1">
          {teamMembers.map((member) => (
            <Link
              key={member}
              to={`/team/${member.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                location.pathname === `/team/${member.toLowerCase().replace(/\s+/g, '-')}` 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Users className="h-5 w-5" />
              {member}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
