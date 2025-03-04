
import React from 'react';
import Header from '@/components/Header';
import SafetyProfile from '@/components/SafetyProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 px-6 pb-12 max-w-7xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Safety Profile</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your personal information that will be shared with emergency 
            services and contacts during an alert.
          </p>
        </div>
        <SafetyProfile />
      </div>
    </div>
  );
};

export default Profile;
