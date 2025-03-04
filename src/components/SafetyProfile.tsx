
import React, { useState } from 'react';
import { 
  UserCircle, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Heart, 
  Pill, 
  Lock, 
  Edit2,
  Save,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ProfileSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  isEditing: boolean;
};

const SafetyProfile = () => {
  const [profileSections, setProfileSections] = useState<ProfileSection[]>([
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <UserCircle className="w-5 h-5" />,
      content: 'Sarah Johnson, 28 years old',
      isEditing: false,
    },
    {
      id: 'contact',
      title: 'Emergency Contact',
      icon: <Phone className="w-5 h-5" />,
      content: 'Emma Johnson (Sister): (555) 123-4567',
      isEditing: false,
    },
    {
      id: 'address',
      title: 'Home Address',
      icon: <MapPin className="w-5 h-5" />,
      content: '1234 Maple Street, Apt 5B, San Francisco, CA 94101',
      isEditing: false,
    },
    {
      id: 'allergies',
      title: 'Allergies',
      icon: <AlertCircle className="w-5 h-5" />,
      content: 'Penicillin, Peanuts',
      isEditing: false,
    },
    {
      id: 'medical',
      title: 'Medical Conditions',
      icon: <Heart className="w-5 h-5" />,
      content: 'Asthma, requires inhaler during attacks',
      isEditing: false,
    },
    {
      id: 'medications',
      title: 'Current Medications',
      icon: <Pill className="w-5 h-5" />,
      content: 'Albuterol inhaler as needed',
      isEditing: false,
    },
  ]);

  const [editContent, setEditContent] = useState<string>('');

  const handleEditToggle = (id: string) => {
    setProfileSections(sections => 
      sections.map(section => {
        if (section.id === id) {
          if (!section.isEditing) {
            setEditContent(section.content);
          }
          return { ...section, isEditing: !section.isEditing };
        }
        return section;
      })
    );
  };

  const handleSave = (id: string) => {
    setProfileSections(sections => 
      sections.map(section => {
        if (section.id === id) {
          return { ...section, content: editContent, isEditing: false };
        }
        return section;
      })
    );
  };

  const handleCancel = (id: string) => {
    setProfileSections(sections => 
      sections.map(section => {
        if (section.id === id) {
          return { ...section, isEditing: false };
        }
        return section;
      })
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
            <UserCircle className="w-14 h-14 text-muted-foreground" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Sarah Johnson</h2>
        <p className="text-muted-foreground">SafePath Guardian User</p>
      </div>
      
      <div className="glass rounded-xl p-6 shadow-glass mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Lock className="w-5 h-5 mr-2 text-primary" />
            Safety Profile
          </h3>
          <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Complete
          </div>
        </div>
        
        <div className="space-y-4">
          {profileSections.map((section) => (
            <div 
              key={section.id}
              className="border border-border rounded-lg p-4 transition-all hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-secondary mr-3">
                    {section.icon}
                  </div>
                  <div>
                    <div className="font-medium">{section.title}</div>
                    {!section.isEditing && (
                      <div className="text-sm text-muted-foreground">{section.content}</div>
                    )}
                  </div>
                </div>
                
                {section.isEditing ? (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleSave(section.id)}
                      className="p-1.5 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleCancel(section.id)}
                      className="p-1.5 rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleEditToggle(section.id)}
                    className="p-1.5 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {section.isEditing && (
                <div className="mt-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 h-20"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Your safety profile information will only be shared with emergency services and your emergency contacts when you trigger an alert.
          </p>
          <button className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Download Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyProfile;
