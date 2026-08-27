import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Card } from '../../components/Card';
import { User, ShieldCheck, Star } from 'lucide-react';

export const WorkerProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    skills: 'electrical, wiring, appliance repair',
    experience: '8',
    location: 'Mumbai',
    hourlyRate: '350'
  });
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-gray-600">Electrician</p>
              <div className="flex items-center gap-1 mt-1 text-yellow-600">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">(127 reviews)</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSave} className="space-y-6">
            <Input
              type="text"
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            
            <Input
              type="email"
              label="Email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            
            <Input
              type="tel"
              label="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            
            <Textarea
              label="Skills"
              placeholder="e.g., electrical, wiring, appliance repair"
              value={profile.skills}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
              rows={3}
            />
            
            <Input
              type="number"
              label="Experience (years)"
              value={profile.experience}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            />
            
            <Input
              type="text"
              label="Location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
            
            <Input
              type="number"
              label="Hourly Rate (₹)"
              value={profile.hourlyRate}
              onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
            />
            
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Notification Preferences
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Verification Status
            </button>
            <button className="w-full text-left px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
              Delete Account
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
