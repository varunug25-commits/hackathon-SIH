import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { BookingCard } from '../../components/BookingCard';
import { getCustomerBookings } from '../../services';
import type { BookingStatus, Booking } from '../../types';

export const CustomerBookings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getCustomerBookings();
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
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="customer" userName="Rahul Sharma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        
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
          <p className="text-gray-600">Loading bookings...</p>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                workerName={booking.workerId || 'Unknown'}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              {activeTab === 'all' 
                ? 'No bookings yet' 
                : `No ${activeTab.replace('_', ' ')} bookings`}
            </p>
            <button
              onClick={() => navigate('/customer/services')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Book a Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
