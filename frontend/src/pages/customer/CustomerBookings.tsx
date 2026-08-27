import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { BookingCard } from '../../components/BookingCard';
import { mockBookings, mockWorkers } from '../../data/mockData';
import type { BookingStatus } from '../../types';

export const CustomerBookings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');
  
  const tabs: { value: BookingStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
  
  const filteredBookings = activeTab === 'all' 
    ? mockBookings 
    : mockBookings.filter(b => b.status === activeTab);
  
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
        
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const worker = mockWorkers.find(w => w.id === booking.workerId);
              return (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  workerName={worker?.name}
                />
              );
            })}
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
