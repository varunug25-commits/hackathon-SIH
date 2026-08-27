import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import { CheckCircle, Calendar, Clock, MapPin, IndianRupee } from 'lucide-react';

export const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  
  const mockBooking = {
    id: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    workerName: 'Rajesh Kumar',
    serviceName: 'Electrician',
    date: '2024-08-28',
    time: '10:00',
    location: 'Andheri East, Mumbai',
    price: 700,
    status: 'pending' as const
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="customer" userName="Rahul Sharma" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">Your booking has been successfully submitted</p>
        </div>
        
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Booking ID</p>
              <p className="text-xl font-bold">{mockBooking.id}</p>
            </div>
            <StatusBadge status={mockBooking.status} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Worker</p>
              <p className="font-semibold">{mockBooking.workerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Service</p>
              <p className="font-semibold">{mockBooking.serviceName}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-6 pb-6 border-b">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{new Date(mockBooking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium">{mockBooking.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{mockBooking.location}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Estimated Price</span>
            <div className="flex items-center gap-1 text-blue-600 font-bold text-2xl">
              <IndianRupee className="w-6 h-6" />
              <span>{mockBooking.price}</span>
            </div>
          </div>
        </Card>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• The worker will review your booking request</li>
            <li>• You'll receive a notification when the booking is accepted</li>
            <li>• You can track your booking status in My Bookings</li>
            <li>• Contact support if you need to make changes</li>
          </ul>
        </div>
        
        <div className="flex gap-4">
          <Button 
            className="flex-1"
            onClick={() => navigate('/customer/bookings')}
          >
            View My Bookings
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/customer')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
