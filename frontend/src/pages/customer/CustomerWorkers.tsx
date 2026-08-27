import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { WorkerCard } from '../../components/WorkerCard';
import { Select } from '../../components/Select';
import { mockWorkers } from '../../data/mockData';
import { Filter } from 'lucide-react';

export const CustomerWorkers: React.FC = () => {
  const [sortBy, setSortBy] = useState('rating');
  
  const sortedWorkers = [...mockWorkers].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.hourlyRate - b.hourlyRate;
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="customer" userName="Rahul Sharma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Workers
          </h1>
          <p className="text-gray-600">Find verified workers near you</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <Select
            label="Sort by"
            options={[
              { value: 'rating', label: 'Highest Rated' },
              { value: 'price', label: 'Lowest Price' },
              { value: 'experience', label: 'Most Experience' }
            ]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="min-w-[200px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
  );
};
