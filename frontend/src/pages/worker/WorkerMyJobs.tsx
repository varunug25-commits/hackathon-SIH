import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  IndianRupee, 
  User,
  BarChart3,
  LogOut,
  CheckCircle,
  Clock as ClockIcon,
  XCircle,
  Camera
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

const mockMyJobs = [
  {
    id: '1',
    serviceName: 'Electrical Wiring Repair',
    description: 'Fix faulty wiring in living room and kitchen',
    customerName: 'Rahul Sharma',
    location: 'Mumbai, Andheri West',
    scheduled_date: '2026-09-03T10:00:00',
    estimated_price: 850,
    status: 'in_progress'
  },
  {
    id: '2',
    serviceName: 'Fan Installation',
    description: 'Install 3 ceiling fans in bedrooms',
    customerName: 'Priya Patel',
    location: 'Mumbai, Bandra East',
    scheduled_date: '2026-09-03T14:00:00',
    estimated_price: 600,
    status: 'accepted'
  },
  {
    id: '3',
    serviceName: 'Switchboard Replacement',
    description: 'Replace old switchboard with new one',
    customerName: 'Amit Kumar',
    location: 'Mumbai, Dadar',
    scheduled_date: '2026-09-02T09:00:00',
    estimated_price: 450,
    status: 'completed'
  },
  {
    id: '4',
    serviceName: 'Meter Box Repair',
    description: 'Fix damaged meter box and connections',
    customerName: 'Sneha Reddy',
    location: 'Mumbai, Thane',
    scheduled_date: '2026-09-01T16:00:00',
    estimated_price: 700,
    status: 'completed'
  }
];

export const WorkerMyJobs: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
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

  const filteredJobs = mockMyJobs.filter(job => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return job.status === 'in_progress' || job.status === 'accepted';
    if (activeTab === 'completed') return job.status === 'completed';
    return true;
  });

  const statusConfig = {
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: ClockIcon },
    accepted: { label: 'Accepted', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    completed: { label: 'Completed', color: 'bg-purple-100 text-purple-700', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: XCircle }
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
                item.id === 'my-jobs' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  'RK'
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="w-3 h-3 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </label>
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
            <h2 className="text-2xl font-bold text-gray-800">My Jobs</h2>
            <p className="text-gray-500">Manage your active and completed jobs</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Jobs ({mockMyJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Active ({mockMyJobs.filter(j => j.status === 'in_progress' || j.status === 'accepted').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Completed ({mockMyJobs.filter(j => j.status === 'completed').length})
          </button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const config = statusConfig[job.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            
            return (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{job.serviceName}</h3>
                    <p className="text-sm text-gray-600">{job.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{job.customerName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(job.scheduled_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(job.scheduled_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold text-gray-900">₹{job.estimated_price}</div>
                  {job.status === 'in_progress' && (
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Mark Complete
                    </button>
                  )}
                  {job.status === 'accepted' && (
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Start Job
                    </button>
                  )}
                  {job.status === 'completed' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No jobs found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};