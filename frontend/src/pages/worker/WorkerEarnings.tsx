import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { getWorkerBookings } from '../../services';
import type { Booking } from '../../types';
import { IndianRupee, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

export const WorkerEarnings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getWorkerBookings();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalEarnings = completedBookings.reduce((sum, b) => sum + b.estimatedPrice, 0);
  const thisMonthEarnings = totalEarnings * 0.7;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="worker" userName="Rajesh Kumar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading earnings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Earnings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="w-8 h-8 text-green-600" />
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold">₹{totalEarnings}</p>
            <p className="text-gray-600">Total Earnings</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <p className="text-3xl font-bold">₹{Math.round(thisMonthEarnings)}</p>
            <p className="text-gray-600">Monthly Earnings</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <p className="text-3xl font-bold">{completedBookings.length}</p>
            <p className="text-gray-600">Jobs Completed</p>
          </Card>
        </div>
        
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
          <div className="flex items-center gap-4">
            <TrendingUp className="w-12 h-12 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">+15%</p>
              <p className="text-gray-600">vs last month</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Earnings</h2>
          {completedBookings.length > 0 ? (
            <div className="space-y-4">
              {completedBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{booking.serviceName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.scheduledAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    <span>{booking.estimatedPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No earnings yet</p>
          )}
        </Card>
      </div>
    </div>
  );
};
