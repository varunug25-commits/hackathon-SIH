import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { getWorkerBookings, getMyWorkerProfile } from '../../services';
import type { Booking } from '../../types';
import {
  Calendar,
  Clock,
  IndianRupee,
  Star,
  CheckCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [workerRating, setWorkerRating] = useState(4.8);
  const [workerReviewCount, setWorkerReviewCount] = useState(127);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsData, workerData] = await Promise.all([
          getWorkerBookings(),
          getMyWorkerProfile()
        ]);
        setBookings(bookingsData.data || []);
        if (workerData.data) {
          setWorkerRating(workerData.data.rating || 4.8);
          setWorkerReviewCount(workerData.data.review_count || 127);
          setIsAvailable(workerData.data.is_available ?? true);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const todayJobs = bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress');
  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const completedJobs = bookings.filter(b => b.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, b) => sum + (b.estimated_price || b.estimatedPrice || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="worker" userName="Rajesh Kumar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, Rajesh!
          </h1>
          <p className="text-gray-600">Manage your jobs and earnings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-500">Today</span>
            </div>
            <p className="text-3xl font-bold">{todayJobs.length}</p>
            <p className="text-gray-600">Active Jobs</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <p className="text-3xl font-bold">{pendingRequests.length}</p>
            <p className="text-gray-600">New Requests</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="w-8 h-8 text-green-600" />
              <span className="text-sm text-gray-500">Earnings</span>
            </div>
            <p className="text-3xl font-bold">₹{totalEarnings}</p>
            <p className="text-gray-600">Total Earned</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-gray-500">Rating</span>
            </div>
            <p className="text-3xl font-bold">{workerRating}</p>
            <p className="text-gray-600">{workerReviewCount} Reviews</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Availability</h2>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className="flex items-center gap-2"
              >
                {isAvailable ? (
                  <ToggleRight className="w-6 h-6 text-green-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
                <span className={`font-medium ${isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                  {isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </button>
            </div>
            <p className="text-gray-600">
              {isAvailable 
                ? 'You are currently visible to customers and can receive new job requests.'
                : 'You are not receiving new job requests. Toggle to become available.'}
            </p>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                className="w-full"
                onClick={() => navigate('/worker/jobs')}
              >
                View All Jobs
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate('/worker/earnings')}
              >
                View Earnings
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate('/worker/profile')}
              >
                Update Profile
              </Button>
            </div>
          </Card>
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
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                      <p className="text-gray-600">{booking.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">₹{booking.estimatedPrice}</p>
                      <p className="text-sm text-gray-500">{booking.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                    >
                      Accept
                    </Button>
                  </div>
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
        
        {todayJobs.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Today's Jobs</h2>
              <Button variant="outline" onClick={() => navigate('/worker/jobs')}>
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {todayJobs.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                      <p className="text-gray-600">{booking.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">₹{booking.estimatedPrice}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.scheduled_date || booking.scheduledAt || '').toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
