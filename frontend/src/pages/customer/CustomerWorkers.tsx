import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { WorkerCard } from '../../components/WorkerCard';
import { Select } from '../../components/Select';
import { getWorkers } from '../../services';
import type { Worker } from '../../types';
import { Filter } from 'lucide-react';

export const CustomerWorkers: React.FC = () => {
  const [sortBy, setSortBy] = useState('rating');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkers();
        setWorkers(data.data || []);
      } catch (error) {
        console.error('Failed to fetch workers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const sortedWorkers = [...workers].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'price') return (a.hourlyRate || a.services?.[0]?.hourly_rate || 0) - (b.hourlyRate || b.services?.[0]?.hourly_rate || 0);
    if (sortBy === 'experience') return (b.experience || b.experience_years || 0) - (a.experience || a.experience_years || 0);
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
        
        {loading ? (
          <p className="text-gray-600">Loading workers...</p>
        ) : sortedWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No workers available</p>
        )}
      </div>
    </div>
  );
};
