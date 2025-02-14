import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  FileText, 
  BarChart, 
  Users,
  Settings 
} from 'lucide-react';

const teamMembers = [
  'Hamza Sohail',
  'Farah Al-Haj Ahmad',
  'Moath Abusall'
];

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Daily Tasks', icon: ClipboardList, path: '/daily-tasks' },
  { name: 'Weekly Reports', icon: FileText, path: '/reports' },
  { name: 'Analytics', icon: BarChart, path: '/analytics' },
  { name: 'Team', icon: Users, path: '/team' },
  { name: 'Settings', icon: Settings, path: '/settings' }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <nav className="px-4 py-6">
        <div className="space-y-6">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="px-3 text-sm font-medium text-gray-500">Team Members</h3>
            <div className="mt-3 space-y-1">
              {teamMembers.map((member) => (
                <Link
                  key={member}
                  to={`/team/${member.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                >
                  <Users className="h-5 w-5" />
                  {member}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
