import React, { useState } from 'react';
import { Menu, Moon, Sun, X, Rocket } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'ISS Tracker', path: '/iss-tracker' },
    { name: 'News Feed', path: '/news' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-card/80 backdrop-blur-md border-b border-border z-30 sticky top-0">
      <div className="flex items-center gap-3 lg:hidden">
        <Rocket className="w-6 h-6 text-primary" />
        <span className="font-bold text-lg tracking-tight text-primary">SpacePulse</span>
      </div>
      
      <div className="hidden lg:block">
        {/* Placeholder to balance the flex container on desktop */}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 lg:hidden rounded-lg bg-secondary text-secondary-foreground"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg p-4 flex flex-col gap-2 lg:hidden z-40">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-card-foreground/80 hover:bg-secondary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
