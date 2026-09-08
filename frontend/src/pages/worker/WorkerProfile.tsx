import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  Edit,
  BarChart3,
  Briefcase,
  IndianRupee,
  LogOut,
  Award,
  CheckCircle,
  Camera
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

export const WorkerProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'jobs', label: 'Available Jobs', icon: Briefcase },
    { id: 'my-jobs', label: 'My Jobs', icon: Briefcase },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const workerData = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    specialization: 'Electrician',
    experience: 8,
    rating: 4.8,
    reviews: 127,
    completedJobs: 156,
    totalEarnings: 245000,
    skills: ['Electrical Wiring', 'Fan Installation', 'Switchboard Repair', 'AC Installation', 'Lighting Systems'],
    certifications: ['Electrician License', 'Safety Certification', 'Energy Audit Certified'],
    languages: ['Hindi', 'English', 'Marathi'],
    joinedDate: '2024-01-15'
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">🔧</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">FixMate</h1>
              <p className="text-sm text-gray-500">Worker Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'overview') navigate('/worker');
                else if (item.id === 'jobs') navigate('/worker/jobs');
                else if (item.id === 'my-jobs') navigate('/worker/my-jobs');
                else if (item.id === 'earnings') navigate('/worker/earnings');
                else if (item.id === 'profile') navigate('/worker/profile');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.id === 'profile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              RK
            </div>
            <div>
              <p className="font-medium text-gray-800">Rajesh Kumar</p>
              <p className="text-xs text-gray-500">Electrician</p>
            </div>
          </div>
          <button
            onClick={async () => {
              const token = localStorage.getItem('auth_token');
              if (token) {
                await backendApi.logout(token);
              }
              localStorage.clear();
              navigate('/worker-login');
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            <p className="text-gray-500">Manage your profile and settings</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-800">Personal Information</h3>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-blue-600" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{workerData.name}</h2>
                <p className="text-gray-600 mb-2">{workerData.specialization}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{workerData.rating}</span>
                    <span>({workerData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{workerData.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{workerData.email}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{workerData.phone}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{workerData.location}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{workerData.experience} years</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h3 className="font-semibold text-gray-800">Skills</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {workerData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h3 className="font-semibold text-gray-800">Certifications</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {workerData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-800">Performance</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{workerData.completedJobs}</p>
                <p className="text-sm text-gray-500">Completed Jobs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{workerData.rating}</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <IndianRupee className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{(workerData.totalEarnings / 1000).toFixed(1)}k</p>
                <p className="text-sm text-gray-500">Total Earnings</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{workerData.experience}</p>
                <p className="text-sm text-gray-500">Years Exp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};