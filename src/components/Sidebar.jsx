import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Satellite, Newspaper, BarChart3, Rocket } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'ISS Tracker', path: '/iss-tracker', icon: Satellite },
    { name: 'News Feed', path: '/news', icon: Newspaper },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-full bg-card border-r border-border shadow-sm z-20">
      <div className="flex items-center gap-3 h-16 px-6 border-b border-border text-primary font-bold text-xl tracking-tight">
        <Rocket className="w-6 h-6 text-primary" />
        SpacePulse AI
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-card-foreground/70 hover:bg-secondary hover:text-card-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border text-xs text-center text-card-foreground/50">
        &copy; {new Date().getFullYear()} SpacePulse
      </div>
    </aside>
  );
};

export default Sidebar;
