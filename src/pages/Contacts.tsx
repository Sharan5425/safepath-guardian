
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import EmergencyContacts from '@/components/EmergencyContacts';

const Contacts = () => {
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
      <div className="pt-24 px-6 pb-12 max-w-7xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Emergency Contacts</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your trusted contacts who will be notified in case of emergency. 
            Add family members, friends, and other important contacts.
          </p>
        </div>
        <EmergencyContacts />
      </div>
    </div>
  );
};

export default Contacts;
