import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import { getWorkerBookings } from '../../services';
import type { BookingStatus, Booking } from '../../types';
import { Calendar, Clock, MapPin, IndianRupee } from 'lucide-react';

export const WorkerJobs: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');
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

  const tabs: { value: BookingStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Jobs</h1>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {loading ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="text-gray-700 mb-3">{booking.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.scheduledAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(booking.scheduledAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 text-blue-600 font-bold text-xl mb-2">
                      <IndianRupee className="w-5 h-5" />
                      <span>{booking.estimatedPrice}</span>
                    </div>
                    <span className="text-sm text-gray-500">ID: {booking.id}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                  >
                    View Details
                  </Button>
                  {booking.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                      >
                        Accept
                      </Button>
                      <Button 
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {booking.status === 'accepted' && (
                    <Button 
                      onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                    >
                      Start Job
                    </Button>
                  )}
                  {booking.status === 'in_progress' && (
                    <Button 
                      onClick={() => navigate(`/worker/jobs/${booking.id}`)}
                    >
                      Complete Job
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              {activeTab === 'all' 
                ? 'No jobs available' 
                : `No ${activeTab.replace('_', ' ')} jobs`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
