import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import type { Booking } from '../../types';

// Mock data for worker's own jobs
const mockMyJobs: Booking[] = [
  {
    id: '1',
    serviceName: 'Electrical Wiring Repair',
    description: 'Fix faulty wiring in living room and kitchen',
    customer_id: 'cust_001',
    location: 'Mumbai, Andheri West',
    scheduled_date: '2026-09-03T10:00:00',
    estimated_price: 850,
    estimatedPrice: 850,
    status: 'pending'
  },
  {
    id: '2',
    serviceName: 'Fan Installation',
    description: 'Install 3 ceiling fans in bedrooms',
    customer_id: 'cust_002',
    location: 'Mumbai, Bandra East',
    scheduled_date: '2026-09-03T14:00:00',
    estimated_price: 600,
    estimatedPrice: 600,
    status: 'accepted'
  },
  {
    id: '3',
    serviceName: 'Switchboard Replacement',
    description: 'Replace old switchboard with new one',
    customer_id: 'cust_003',
    location: 'Mumbai, Dadar',
    scheduled_date: '2026-09-03T16:00:00',
    estimated_price: 450,
    estimatedPrice: 450,
    status: 'in_progress'
  },
  {
    id: '4',
    serviceName: 'Meter Box Repair',
    description: 'Fix damaged meter box and connections',
    customer_id: 'cust_004',
    location: 'Mumbai, Thane',
    scheduled_date: '2026-09-02T09:00:00',
    estimated_price: 700,
    estimatedPrice: 700,
    status: 'completed'
  },
  {
    id: '5',
    serviceName: 'Light Fixture Installation',
    description: 'Install new LED light fixtures in hall',
    customer_id: 'cust_005',
    location: 'Mumbai, Powai',
    scheduled_date: '2026-09-04T11:00:00',
    estimated_price: 550,
    estimatedPrice: 550,
    status: 'accepted'
  },
  {
    id: '6',
    serviceName: 'Circuit Breaker Repair',
    description: 'Replace faulty circuit breaker',
    customer_id: 'cust_006',
    location: 'Mumbai, Kurla',
    scheduled_date: '2026-09-04T15:00:00',
    estimated_price: 800,
    estimatedPrice: 800,
    status: 'pending'
  }
];

type JobCategory = 'upcoming' | 'active' | 'completed';

export const WorkerMyJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<JobCategory>('upcoming');
  const [jobs] = useState<Booking[]>(mockMyJobs);

  const tabs: { value: JobCategory; label: string }[] = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const getFilteredJobs = (category: JobCategory): Booking[] => {
    switch (category) {
      case 'upcoming':
        return jobs.filter(j => j.status === 'pending' || j.status === 'accepted');
      case 'active':
        return jobs.filter(j => j.status === 'in_progress');
      case 'completed':
        return jobs.filter(j => j.status === 'completed');
      default:
        return jobs;
    }
  };

  const filteredJobs = getFilteredJobs(activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Jobs</h1>
        
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
        
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="p-6">
                <h3 className="font-semibold">{job.serviceName}</h3>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-gray-500">{job.location}</p>
                <p className="text-blue-600 font-bold">₹{job.estimated_price}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              No {activeTab} jobs found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};