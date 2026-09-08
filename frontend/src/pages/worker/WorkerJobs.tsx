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
  Search,
  Camera
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

const mockJobs = [
  {
    id: '1',
    serviceName: 'Electrical Wiring Repair',
    description: 'Fix faulty wiring in living room and kitchen',
    customerName: 'Rahul Sharma',
    location: 'Mumbai, Andheri West',
    distance: '2.5 km',
    scheduled_date: '2026-09-03T10:00:00',
    estimated_price: 850,
    urgency: 'high',
    matchScore: 95
  },
  {
    id: '2',
    serviceName: 'Fan Installation',
    description: 'Install 3 ceiling fans in bedrooms',
    customerName: 'Priya Patel',
    location: 'Mumbai, Bandra East',
    distance: '4.2 km',
    scheduled_date: '2026-09-03T14:00:00',
    estimated_price: 600,
    urgency: 'medium',
    matchScore: 88
  },
  {
    id: '3',
    serviceName: 'Switchboard Replacement',
    description: 'Replace old switchboard with new one',
    customerName: 'Amit Kumar',
    location: 'Mumbai, Dadar',
    distance: '3.8 km',
    scheduled_date: '2026-09-03T16:00:00',
    estimated_price: 450,
    urgency: 'low',
    matchScore: 92
  },
  {
    id: '4',
    serviceName: 'AC Repair',
    description: 'Air conditioner not cooling properly',
    customerName: 'Vikram Singh',
    location: 'Mumbai, Goregaon',
    distance: '6.1 km',
    scheduled_date: '2026-09-04T11:00:00',
    estimated_price: 1200,
    urgency: 'high',
    matchScore: 85
  },
  {
    id: '5',
    serviceName: 'Geyser Installation',
    description: 'Install new electric geyser in bathroom',
    customerName: 'Anjali Mehta',
    location: 'Mumbai, Malad',
    distance: '7.5 km',
    scheduled_date: '2026-09-04T15:00:00',
    estimated_price: 950,
    urgency: 'medium',
    matchScore: 90
  }
];

export const WorkerJobs: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const urgencyColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700'
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
                item.id === 'jobs' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
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
            <h2 className="text-2xl font-bold text-gray-800">Available Jobs</h2>
            <p className="text-gray-500">Find jobs that match your skills</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[job.urgency as keyof typeof urgencyColors]}`}>
                      {job.urgency.toUpperCase()}
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{job.matchScore}%</div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{job.serviceName}</h3>
                  <p className="text-sm text-gray-600 mb-3">{job.description}</p>
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
                  <MapPin className="w-4 h-4" />
                  <span>{job.distance}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Accept Job
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No jobs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};