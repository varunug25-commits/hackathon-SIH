import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IndianRupee, 
  Download,
  BarChart3,
  User,
  LogOut,
  Briefcase,
  CheckCircle,
  Clock,
  Camera
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

const mockEarnings = [
  {
    id: '1',
    jobTitle: 'Electrical Wiring Repair',
    customerName: 'Rahul Sharma',
    amount: 850,
    date: '2026-09-02',
    status: 'paid'
  },
  {
    id: '2',
    jobTitle: 'Fan Installation',
    customerName: 'Priya Patel',
    amount: 600,
    date: '2026-09-01',
    status: 'paid'
  },
  {
    id: '3',
    jobTitle: 'Switchboard Replacement',
    customerName: 'Amit Kumar',
    amount: 450,
    date: '2026-08-31',
    status: 'pending'
  },
  {
    id: '4',
    jobTitle: 'Meter Box Repair',
    customerName: 'Sneha Reddy',
    amount: 700,
    date: '2026-08-30',
    status: 'paid'
  }
];

export const WorkerEarnings: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
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

  const totalEarnings = mockEarnings.reduce((sum, earning) => sum + earning.amount, 0);
  const paidEarnings = mockEarnings.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
  const pendingEarnings = mockEarnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

  const statusConfig = {
    paid: { label: 'Paid', color: 'bg-green-100 text-green-700' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' }
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
                item.id === 'earnings' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
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
            <h2 className="text-2xl font-bold text-gray-800">Earnings</h2>
            <p className="text-gray-500">Track your income and payment history</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="w-8 h-8 opacity-80" />
              <div className="text-sm bg-white/20 px-2 py-1 rounded">+24%</div>
            </div>
            <h3 className="text-blue-100 text-sm mb-1">Total Earnings</h3>
            <p className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</p>
            <p className="text-blue-100 text-sm mt-1">All time</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <div className="text-sm bg-white/20 px-2 py-1 rounded">₹{paidEarnings.toLocaleString()}</div>
            </div>
            <h3 className="text-green-100 text-sm mb-1">Paid</h3>
            <p className="text-3xl font-bold">₹{paidEarnings.toLocaleString()}</p>
            <p className="text-green-100 text-sm mt-1">This period</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 opacity-80" />
              <div className="text-sm bg-white/20 px-2 py-1 rounded">₹{pendingEarnings.toLocaleString()}</div>
            </div>
            <h3 className="text-yellow-100 text-sm mb-1">Pending</h3>
            <p className="text-3xl font-bold">₹{pendingEarnings.toLocaleString()}</p>
            <p className="text-yellow-100 text-sm mt-1">Awaiting payment</p>
          </div>
        </div>

        {/* Earnings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-800">Payment History</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockEarnings.map((earning) => {
                const config = statusConfig[earning.status as keyof typeof statusConfig];
                return (
                  <tr key={earning.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{earning.jobTitle}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{earning.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(earning.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">₹{earning.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Payment received from <span className="font-medium">Rahul Sharma</span></p>
                <p className="text-xs text-gray-500">₹850 for Electrical Wiring Repair</p>
              </div>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Completed job for <span className="font-medium">Priya Patel</span></p>
                <p className="text-xs text-gray-500">Fan Installation - ₹600</p>
              </div>
              <div className="text-sm text-gray-500">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};