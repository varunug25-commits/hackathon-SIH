import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  IndianRupee, 
  Star, 
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  BarChart3,
  User,
  LogOut,
  Clock,
  Camera
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

// Mock data for demonstration
const mockBookings = [
  {
    id: '1',
    serviceName: 'Electrical Wiring Repair',
    description: 'Fix faulty wiring in living room and kitchen',
    customer_id: 'cust_001',
    customerName: 'Rahul Sharma',
    location: 'Mumbai, Andheri West',
    distance: '2.5 km',
    scheduled_date: '2026-09-03T10:00:00',
    estimated_price: 850,
    estimatedPrice: 850,
    status: 'pending' as const,
    urgency: 'high'
  },
  {
    id: '2',
    serviceName: 'Fan Installation',
    description: 'Install 3 ceiling fans in bedrooms',
    customer_id: 'cust_002',
    customerName: 'Priya Patel',
    location: 'Mumbai, Bandra East',
    distance: '4.2 km',
    scheduled_date: '2026-09-03T14:00:00',
    estimated_price: 600,
    estimatedPrice: 600,
    status: 'accepted' as const,
    urgency: 'medium'
  },
  {
    id: '3',
    serviceName: 'Switchboard Replacement',
    description: 'Replace old switchboard with new one',
    customer_id: 'cust_003',
    customerName: 'Amit Kumar',
    location: 'Mumbai, Dadar',
    distance: '3.8 km',
    scheduled_date: '2026-09-03T16:00:00',
    estimated_price: 450,
    estimatedPrice: 450,
    status: 'in_progress' as const,
    urgency: 'low'
  },
  {
    id: '4',
    serviceName: 'Meter Box Repair',
    description: 'Fix damaged meter box and connections',
    customer_id: 'cust_004',
    customerName: 'Sneha Reddy',
    location: 'Mumbai, Thane',
    distance: '12.3 km',
    scheduled_date: '2026-09-02T09:00:00',
    estimated_price: 700,
    estimatedPrice: 700,
    status: 'completed' as const,
    urgency: 'medium'
  }
];

const mockRecommendedJobs = [
  {
    id: '5',
    serviceName: 'AC Repair',
    description: 'Air conditioner not cooling properly',
    customer_id: 'cust_005',
    customerName: 'Vikram Singh',
    location: 'Mumbai, Goregaon',
    distance: '6.1 km',
    scheduled_date: '2026-09-04T11:00:00',
    estimated_price: 1200,
    estimatedPrice: 1200,
    status: 'pending' as const,
    urgency: 'high',
    matchScore: 95
  },
  {
    id: '6',
    serviceName: 'Geyser Installation',
    description: 'Install new electric geyser in bathroom',
    customer_id: 'cust_006',
    customerName: 'Anjali Mehta',
    location: 'Mumbai, Malad',
    distance: '7.5 km',
    scheduled_date: '2026-09-04T15:00:00',
    estimated_price: 950,
    estimatedPrice: 950,
    status: 'pending' as const,
    urgency: 'medium',
    matchScore: 88
  }
];

export const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
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
  const [bookings] = useState(mockBookings);
  const [recommendedJobs] = useState(mockRecommendedJobs);
  const workerRating = 4.8;
  const workerReviewCount = 127;

  const todayJobs = bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress');
  const completedJobs = bookings.filter(b => b.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, b) => sum + (b.estimated_price || 0), 0);
  const thisMonthEarnings = Math.round(totalEarnings * 0.7);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'jobs', label: 'Available Jobs', icon: Briefcase },
    { id: 'my-jobs', label: 'My Jobs', icon: Briefcase },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const metrics = [
    {
      title: 'This Month Earnings',
      value: `₹${thisMonthEarnings.toLocaleString()}`,
      change: '+16.4%',
      isPositive: true,
      icon: IndianRupee,
      color: 'blue'
    },
    {
      title: 'Active Jobs',
      value: todayJobs.length.toString(),
      change: '+12% vs last week',
      isPositive: true,
      icon: Briefcase,
      color: 'green'
    },
    {
      title: 'Your Rating',
      value: workerRating.toFixed(1),
      subtitle: `${workerReviewCount} reviews`,
      isPositive: true,
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'Completed Jobs',
      value: completedJobs.length.toString(),
      change: '+3 this week',
      isPositive: true,
      icon: CheckCircle,
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-500'
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-600 hover:bg-gray-50"
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
            <h2 className="text-2xl font-bold text-gray-800">Worker Overview</h2>
            <p className="text-gray-500">Welcome back, Rajesh!</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isAvailable 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isAvailable ? (
                <>
                  <ToggleRight className="w-5 h-5" />
                  Available
                </>
              ) : (
                <>
                  <ToggleLeft className="w-5 h-5" />
                  Unavailable
                </>
              )}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                {metric.change && (
                  <div className={`flex items-center gap-1 text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="font-medium">{metric.change}</span>
                  </div>
                )}
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              {metric.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{metric.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/worker/jobs')}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Available Jobs</h3>
                <p className="text-sm text-gray-500">{recommendedJobs.length} new jobs</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/worker/my-jobs')}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">My Jobs</h3>
                <p className="text-sm text-gray-500">{todayJobs.length} active jobs</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/worker/earnings')}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Earnings</h3>
                <p className="text-sm text-gray-500">View payment history</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};