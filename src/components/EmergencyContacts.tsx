
import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Phone, MessageSquare, Bell, Shield, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type Contact = {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isEmergency: boolean;
};

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Emma Johnson', relation: 'Sister', phone: '(555) 123-4567', isEmergency: true },
    { id: '2', name: 'Michael Chen', relation: 'Friend', phone: '(555) 987-6543', isEmergency: true },
    { id: '3', name: 'Dr. Sarah Williams', relation: 'Doctor', phone: '(555) 456-7890', isEmergency: false },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    relation: '',
    phone: '',
    isEmergency: false,
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          ...newContact,
        },
      ]);
      setNewContact({
        name: '',
        relation: '',
        phone: '',
        isEmergency: false,
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const toggleEmergency = (id: string) => {
    setContacts(
      contacts.map(contact => 
        contact.id === id 
          ? { ...contact, isEmergency: !contact.isEmergency } 
          : contact
      )
    );
  };

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Emergency Contacts</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Add Contact Form */}
      {showAddForm && (
        <div className="glass rounded-xl p-5 mb-6 animate-scale-in">
          <h3 className="text-lg font-medium mb-4">Add New Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Name</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Relationship</label>
              <input
                type="text"
                value={newContact.relation}
                onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Friend, Family, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Phone Number</label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer mt-6">
                <input
                  type="checkbox"
                  checked={newContact.isEmergency}
                  onChange={() => setNewContact({ ...newContact, isEmergency: !newContact.isEmergency })}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ms-3 text-sm font-medium">Emergency Contact</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg border border-muted hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddContact}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Add Contact
            </button>
          </div>
        </div>
      )}

      {/* Contact List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div 
            key={contact.id}
            className={cn(
              "rounded-xl p-4 transition-all duration-300 hover:shadow-lg",
              contact.isEmergency ? "glass border-l-4 border-l-primary" : "bg-white border"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white",
                  contact.isEmergency ? "bg-primary" : "bg-muted"
                )}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-sm text-muted-foreground">{contact.relation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => toggleEmergency(contact.id)}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    contact.isEmergency ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                  title={contact.isEmergency ? "Remove from emergency contacts" : "Add to emergency contacts"}
                >
                  <Shield className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-muted text-foreground hover:bg-muted/80 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 rounded-full bg-muted text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <a 
                href={`tel:${contact.phone}`}
                className="flex-1 flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg py-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
              <a 
                href={`sms:${contact.phone}`}
                className="flex-1 flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg py-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </a>
              <button className="flex-1 flex items-center justify-center space-x-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg py-2 transition-colors">
                <Bell className="w-4 h-4" />
                <span>Alert</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {contacts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No contacts added yet.</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;
