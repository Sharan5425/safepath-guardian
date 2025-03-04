
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Header from '@/components/Header';
import SafetyProfile from '@/components/SafetyProfile';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // Redirect to login if not authenticated
    if (!authStatus) {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account.',
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth or redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 px-6 pb-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Safety Profile</h1>
            <p className="text-muted-foreground max-w-2xl">
              Manage your personal information that will be shared with emergency 
              services and contacts during an alert.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        <SafetyProfile />
      </div>
    </div>
  );
};

export default Profile;
