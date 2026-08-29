import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import { getWorkerBookingById } from '../../services';
import type { Booking } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  User,
  Phone
} from 'lucide-react';

export const WorkerJobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      try {
        const data = await getWorkerBookingById(id);
        setBooking(data.data || null);
      } catch (error) {
        console.error('Failed to fetch booking:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="worker" userName="Rajesh Kumar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="worker" userName="Rajesh Kumar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Job not found</p>
        </div>
      </div>
    );
  }

  const handleAction = () => {
    if (booking.status === 'pending') {
      alert('Job accepted!');
    } else if (booking.status === 'accepted') {
      alert('Job started!');
    } else if (booking.status === 'in_progress') {
      alert('Job completed!');
    }
    navigate('/worker/jobs');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/worker/jobs')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Jobs
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Job Details</h1>
            <StatusBadge status={booking.status} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Service Information</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service</p>
                  <p className="font-semibold text-lg">{booking.serviceName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Problem Description</p>
                  <p className="text-gray-700">{booking.description}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Urgency</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    booking.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {booking.urgency.charAt(0).toUpperCase() + booking.urgency.slice(1)}
                  </span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Schedule</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{new Date(booking.scheduledAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium">{new Date(booking.scheduledAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{booking.location}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Customer ID</p>
                    <p className="font-medium">{booking.customerId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium">Available after accepting job</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estimated Price</span>
                <div className="flex items-center gap-1 text-blue-600 font-bold text-2xl">
                  <IndianRupee className="w-6 h-6" />
                  <span>{booking.estimatedPrice}</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Final price may vary based on actual work required
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Booking ID</span>
                <span className="font-medium">{booking.id}</span>
              </div>
              
              <div className="space-y-3">
                {booking.status === 'pending' && (
                  <>
                    <Button className="w-full" onClick={handleAction}>
                      Accept Job
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => navigate('/worker/jobs')}
                    >
                      Decline Job
                    </Button>
                  </>
                )}
                {booking.status === 'accepted' && (
                  <Button className="w-full" onClick={handleAction}>
                    Start Job
                  </Button>
                )}
                {booking.status === 'in_progress' && (
                  <Button className="w-full" onClick={handleAction}>
                    Complete Job
                  </Button>
                )}
                {booking.status === 'completed' && (
                  <Button variant="outline" className="w-full" disabled>
                    Job Completed
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
