
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SafetyMap from '@/components/SafetyMap';

const Map = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 px-6 pb-6 max-w-7xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Safety Map</h1>
          <p className="text-muted-foreground">
            View real-time safety assessments and plan your routes with confidence.
          </p>
        </div>
        <SafetyMap />
      </div>
    </div>
  );
};

export default Map;
