import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import {
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Briefcase,
  Users,
  IndianRupee,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  Zap,
  Wrench,
  Flame,
  Award,
  Bell
} from 'lucide-react';
import { getWorkerBookings } from '../../services/bookings';
import { updateWorkerAvailability } from '../../services/workers';

// Worker types with icons
const workerTypes = [
  { id: 'electrician', name: 'Electrician', icon: Zap, color: 'yellow' },
  { id: 'plumber', name: 'Plumber', icon: Wrench, color: 'blue' },
  { id: 'carpenter', name: 'Carpenter', icon: Flame, color: 'orange' },
  { id: 'cleaner', name: 'Cleaner', icon: Star, color: 'green' }
];

export const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const workerRating = 4.8;
  const workerReviewCount = 127;
  const workerType = workerTypes[0]; // Electrician
  const userId = localStorage.getItem('user_id');

  const WorkerIcon = workerType.icon;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const bookingsData = await getWorkerBookings();
        const bookingsList = Array.isArray(bookingsData) ? bookingsData : (bookingsData.data || []);
        setBookings(bookingsList);
        
        // Filter bookings for recommended jobs (pending and nearby)
        const pendingJobs = bookingsList.filter((b: any) => b.status === 'PENDING');
        setRecommendedJobs(pendingJobs.slice(0, 2));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setBookings([]);
        setRecommendedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAvailabilityToggle = async () => {
    try {
      const newAvailability = !isAvailable;
      await updateWorkerAvailability(userId || '', newAvailability);
      setIsAvailable(newAvailability);
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  };

  const todayJobs = bookings.filter(b => b.status === 'ACCEPTED' || b.status === 'IN_PROGRESS');
  const pendingRequests = bookings.filter(b => b.status === 'PENDING');
  const completedJobs = bookings.filter(b => b.status === 'COMPLETED');
  const totalEarnings = completedJobs.reduce((sum, b) => sum + (b.estimated_price || 0), 0);
  const thisMonthEarnings = Math.round(totalEarnings * 0.7);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar userRole="worker" userName={localStorage.getItem('user_name') || 'Worker'} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <WorkerIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, Rajesh!
                  </h1>
                  <p className="text-gray-600">Professional {workerType.name}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleAvailabilityToggle}
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
              <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-8 h-8 text-blue-100" />
              <span className="text-sm text-blue-100">Today</span>
            </div>
            <p className="text-4xl font-bold">{todayJobs.length}</p>
            <p className="text-blue-100">Active Jobs</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-100" />
              <span className="text-sm text-yellow-100">Pending</span>
            </div>
            <p className="text-4xl font-bold">{pendingRequests.length}</p>
            <p className="text-yellow-100">New Requests</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="w-8 h-8 text-green-100" />
              <span className="text-sm text-green-100">This Month</span>
            </div>
            <p className="text-4xl font-bold">₹{thisMonthEarnings.toLocaleString()}</p>
            <p className="text-green-100">Monthly Earnings</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-purple-100" />
              <span className="text-sm text-purple-100">Rating</span>
            </div>
            <p className="text-4xl font-bold">{workerRating}</p>
            <p className="text-purple-100">{workerReviewCount} Reviews</p>
          </Card>
        </div>
        
        {/* Recommended Jobs Section */}
        {recommendedJobs.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Recommended for You</h2>
              </div>
              <Button variant="outline" onClick={() => navigate('/worker/jobs')}>
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedJobs.map((job) => (
                <Card key={job.id} className="p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{job.serviceName}</h3>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {job.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{job.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{job.customerName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-1 text-green-600 font-bold text-xl mb-1">
                        <IndianRupee className="w-5 h-5" />
                        <span>{job.estimated_price}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        job.urgency === 'high' ? 'bg-red-100 text-red-700' :
                        job.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {job.urgency.charAt(0).toUpperCase() + job.urgency.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/worker/jobs/${job.id}`)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/worker/jobs/${job.id}`)}
                      className="flex-1"
                    >
                      Accept
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Pending Requests */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Pending Requests</h2>
            </div>
            <Button variant="outline" onClick={() => navigate('/worker/jobs')}>
              View All
            </Button>
          </div>
          
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.slice(0, 2).map((booking) => (
                <Card key={booking.id} className="p-6 border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{booking.serviceName}</h3>
                      <p className="text-gray-600 text-sm mb-2">{booking.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{booking.customerName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-1 text-blue-600 font-bold text-xl mb-1">
                        <IndianRupee className="w-5 h-5" />
                        <span>{booking.estimated_price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                      className="flex-1"
                    >
                      Accept
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-gray-50">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending requests</p>
            </Card>
          )}
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Pending Requests</h2>
            <Button variant="outline" onClick={() => navigate('/worker/jobs')}>
              View All
            </Button>
          </div>
          
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.slice(0, 2).map((booking) => (
                <Card key={booking.id} className="p-6">
                  <h3 className="font-semibold">{booking.serviceName}</h3>
                  <p className="text-gray-600">{booking.description}</p>
                  <p className="text-blue-600 font-bold">₹{booking.estimated_price}</p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending requests</p>
            </Card>
          )}
        </div>
        
        {/* Today's Jobs */}
        {todayJobs.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Today's Schedule</h2>
              </div>
              <Button variant="outline" onClick={() => navigate('/worker/my-jobs')}>
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {todayJobs.map((booking) => (
                <Card key={booking.id} className="p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'in_progress' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {booking.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{booking.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{booking.customerName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(booking.scheduled_date).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-1 text-blue-600 font-bold text-xl mb-1">
                        <IndianRupee className="w-5 h-5" />
                        <span>{booking.estimated_price}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                    className="w-full"
                  >
                    {booking.status === 'in_progress' ? 'Complete Job' : 'Start Job'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Performance</h3>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">On-Time Rate</span>
                  <span className="font-semibold">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="flex items-center justify-center gap-2"
                onClick={() => navigate('/worker/jobs')}
              >
                <Briefcase className="w-4 h-4" />
                Available Jobs
              </Button>
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => navigate('/worker/my-jobs')}
              >
                <Briefcase className="w-4 h-4" />
                My Jobs
              </Button>
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => navigate('/worker/earnings')}
              >
                <IndianRupee className="w-4 h-4" />
                Earnings
              </Button>
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => navigate('/worker/profile')}
              >
                <Users className="w-4 h-4" />
                Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
