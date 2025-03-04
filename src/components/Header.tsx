
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, MapPin, Users, UserCircle, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home', icon: <Shield className="w-5 h-5" /> },
    { path: '/map', label: 'Safety Map', icon: <MapPin className="w-5 h-5" /> },
    { path: '/contacts', label: 'Emergency Contacts', icon: <Users className="w-5 h-5" /> },
    { path: '/profile', label: 'My Profile', icon: <UserCircle className="w-5 h-5" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
        isScrolled ? 'glass shadow-glass' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center space-x-2 text-primary font-medium transition-opacity hover:opacity-80"
        >
          <Shield className="w-7 h-7" />
          <span className="text-xl tracking-tight font-semibold">SafePath</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center space-x-2 py-2 transition-all duration-200',
                'hover:text-primary relative group',
                location.pathname === item.path ? 'text-primary' : 'text-foreground/80'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              <span 
                className={cn(
                  'absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out',
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-1 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 animate-fade-in" />
          ) : (
            <Menu className="w-6 h-6 animate-fade-in" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] z-40 glass animate-fade-in">
          <nav className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center space-x-3 py-3 px-4 rounded-lg animate-slide-up',
                  location.pathname === item.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-secondary'
                )}
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
