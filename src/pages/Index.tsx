
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Users, UserCircle, ArrowRight, Bell, ShieldAlert, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import ThreatAssessment from '@/components/ThreatAssessment';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className={cn(
              "w-full md:w-1/2 opacity-0 transition-all duration-700",
              isLoaded && "opacity-100 translate-y-0"
            )}>
              <div className="inline-block px-3 py-1 bg-accent rounded-full text-sm font-medium text-primary mb-4 animate-fade-in">
                <span className="mr-2">•</span>Advanced Women's Safety System
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                Proactive Protection for Your Peace of Mind
              </h1>
              <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                SafePath Guardian uses cutting-edge AI and real-time data to anticipate threats before they occur, keeping you one step ahead with preventive safety measures.
              </p>
              <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
                {isAuthenticated ? (
                  <Button asChild className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
                    <Link to="/profile">
                      <span>Go to Profile</span>
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
                    <Link to="/login">
                      <LogIn className="mr-2 w-5 h-5" />
                      <span>Sign In</span>
                    </Link>
                  </Button>
                )}
                <Button variant="outline" className="px-6 py-3">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className={cn(
              "w-full md:w-1/2 opacity-0 transition-all duration-700 delay-200",
              isLoaded && "opacity-100 translate-y-0"
            )}>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-accent rounded-2xl p-8 shadow-glass">
                  <ThreatAssessment />
                </div>
                <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 -top-6 -left-6 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 md:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              Our comprehensive safety system combines innovative technology with intuitive design to provide unmatched protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldAlert className="w-10 h-10 text-primary" />,
                title: 'Threat Assessment',
                description: 'AI-powered risk analysis that predicts and prevents potential threats',
                link: '/'
              },
              {
                icon: <MapPin className="w-10 h-10 text-primary" />,
                title: 'Safety Map',
                description: 'Real-time mapping with safe route recommendations and geo-fencing',
                link: '/map'
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: 'Emergency Contacts',
                description: 'Quick access to trusted contacts with one-touch emergency alerts',
                link: '/contacts'
              },
              {
                icon: <UserCircle className="w-10 h-10 text-primary" />,
                title: 'Safety Profile',
                description: 'Secure storage of critical information for emergency situations',
                link: '/profile'
              }
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={cn(
                  "glass rounded-xl p-6 transition-all hover:shadow-glass-hover animate-fade-in",
                  "hover:translate-y-[-4px] hover:border-primary/30"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="flex items-center text-primary font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Emergency Alert Section */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-primary/90 to-primary p-8 md:p-12 text-white shadow-lg animate-scale-in">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center">
                  <Bell className="w-6 h-6 mr-2" />
                  Emergency Alert System
                </h2>
                <p className="text-white/80 max-w-xl">
                  Instantly notify your emergency contacts and local authorities with your precise location and safety profile information.
                </p>
              </div>
              <Button 
                variant="secondary" 
                className="px-6 py-3 bg-white text-primary hover:bg-white/90"
              >
                <Shield className="mr-2 w-5 h-5" />
                <span>Activate Emergency Mode</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 md:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shield className="w-6 h-6 text-primary mr-2" />
              <span className="text-lg font-medium">SafePath Guardian</span>
            </div>
            
            <div className="flex flex-wrap gap-6 mb-6 md:mb-0">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/map" className="text-muted-foreground hover:text-primary transition-colors">Safety Map</Link>
              <Link to="/contacts" className="text-muted-foreground hover:text-primary transition-colors">Emergency Contacts</Link>
              <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">Safety Profile</Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2023 SafePath Guardian. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
