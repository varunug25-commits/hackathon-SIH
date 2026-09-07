import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import type { Booking } from '../../types';
import { Search } from 'lucide-react';

// Mock data for available jobs
const mockAvailableJobs: Booking[] = [
  {
    id: '7',
    serviceName: 'Electrical Wiring Repair',
    description: 'Fix faulty wiring in living room and kitchen',
    customer_id: 'cust_007',
    location: 'Mumbai, Andheri West',
    scheduled_date: '2026-09-04T10:00:00',
    estimated_price: 850,
    estimatedPrice: 850,
    status: 'pending'
  },
  {
    id: '8',
    serviceName: 'Fan Installation',
    description: 'Install 3 ceiling fans in bedrooms',
    customer_id: 'cust_008',
    location: 'Mumbai, Bandra East',
    scheduled_date: '2026-09-04T14:00:00',
    estimated_price: 600,
    estimatedPrice: 600,
    status: 'pending'
  },
  {
    id: '9',
    serviceName: 'Switchboard Replacement',
    description: 'Replace old switchboard with new one',
    customer_id: 'cust_009',
    location: 'Mumbai, Dadar',
    scheduled_date: '2026-09-05T09:00:00',
    estimated_price: 450,
    estimatedPrice: 450,
    status: 'pending'
  },
  {
    id: '10',
    serviceName: 'AC Repair',
    description: 'Air conditioner not cooling properly',
    customer_id: 'cust_010',
    location: 'Mumbai, Goregaon',
    scheduled_date: '2026-09-05T11:00:00',
    estimated_price: 1200,
    estimatedPrice: 1200,
    status: 'pending'
  },
  {
    id: '11',
    serviceName: 'Geyser Installation',
    description: 'Install new electric geyser in bathroom',
    customer_id: 'cust_011',
    location: 'Mumbai, Malad',
    scheduled_date: '2026-09-05T15:00:00',
    estimated_price: 950,
    estimatedPrice: 950,
    status: 'pending'
  },
  {
    id: '12',
    serviceName: 'Meter Box Repair',
    description: 'Fix damaged meter box and connections',
    customer_id: 'cust_012',
    location: 'Mumbai, Thane',
    scheduled_date: '2026-09-06T10:00:00',
    estimated_price: 700,
    estimatedPrice: 700,
    status: 'pending'
  }
];

export const WorkerJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings] = useState<Booking[]>(mockAvailableJobs);

  const tabs: { value: string; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  const searchedBookings = searchTerm
    ? filteredBookings.filter(b =>
        b.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredBookings;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Jobs</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
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
        
        {searchedBookings.length > 0 ? (
          <div className="space-y-4">
            {searchedBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <h3 className="font-semibold">{booking.serviceName}</h3>
                <p className="text-gray-600">{booking.description}</p>
                <p className="text-gray-500">{booking.location}</p>
                <p className="text-blue-600 font-bold">₹{booking.estimated_price}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              {searchTerm 
                ? 'No jobs match your search' 
                : activeTab === 'all' 
                  ? 'No jobs available' 
                  : `No ${activeTab.replace('_', ' ')} jobs`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
