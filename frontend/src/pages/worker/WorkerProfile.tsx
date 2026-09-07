import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Card } from '../../components/Card';
import { User, ShieldCheck, Star, MapPin, Phone, Mail, Briefcase, Clock, Edit, Award } from 'lucide-react';

const mockWorkerProfile = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@email.com',
  phone: '+91 98765 43210',
  skills: ['Electrical Wiring', 'Fan Installation', 'Switchboard Repair', 'AC Maintenance', 'Geyser Installation'],
  experience: 8,
  location: 'Mumbai, Maharashtra',
  hourlyRate: 350,
  rating: 4.8,
  reviewCount: 127,
  completedJobs: 245,
  verificationStatus: 'verified' as const,
  joinedDate: '2020-03-15',
  bio: 'Experienced electrician with 8+ years of expertise in residential and commercial electrical work. Specialized in wiring, repairs, and installations. Committed to safety and quality service.'
};

export const WorkerProfile: React.FC = () => {
  const [profile, setProfile] = useState(mockWorkerProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    hourlyRate: profile.hourlyRate.toString(),
    bio: profile.bio
  });
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      ...editForm,
      hourlyRate: parseInt(editForm.hourlyRate)
    });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      hourlyRate: profile.hourlyRate.toString(),
      bio: profile.bio
    });
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          {!isEditing && (
            <Button 
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>
        
        {/* Profile Header Card */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                {profile.verificationStatus === 'verified' && (
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                )}
              </div>
              <p className="text-gray-600 mb-2">Professional Electrician</p>
              <div className="flex items-center gap-1 text-yellow-600 mb-3">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{profile.rating}</span>
                <span className="text-gray-500">({profile.reviewCount} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{profile.completedJobs} jobs completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{profile.experience} years experience</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">₹{profile.hourlyRate}</div>
              <div className="text-sm text-gray-500">per hour</div>
            </div>
          </div>
        </Card>
        
        {isEditing ? (
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
            <form onSubmit={handleSave} className="space-y-6">
              <Input
                type="text"
                label="Full Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
              
              <Input
                type="email"
                label="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
              
              <Input
                type="tel"
                label="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
              
              <Input
                type="text"
                label="Location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              />
              
              <Input
                type="number"
                label="Hourly Rate (₹)"
                value={editForm.hourlyRate}
                onChange={(e) => setEditForm({ ...editForm, hourlyRate: e.target.value })}
              />
              
              <Textarea
                label="Bio"
                placeholder="Tell customers about yourself and your expertise..."
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                rows={4}
              />
              
              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <>
            {/* Contact Information */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Skills */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
            
            {/* Bio */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </Card>
            
            {/* Achievements */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-bold text-lg">{profile.completedJobs}</p>
                    <p className="text-sm text-gray-600">Jobs Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Star className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-bold text-lg">{profile.rating}</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-bold text-lg capitalize">{profile.verificationStatus}</p>
                    <p className="text-sm text-gray-600">Verification</p>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
        
        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
              <span>Change Password</span>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
              <span>Notification Preferences</span>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
              <span>Verification Documents</span>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-between">
              <span>Delete Account</span>
              <span className="text-red-400">→</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
