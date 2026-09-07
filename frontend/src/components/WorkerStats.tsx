import React from 'react';
import { Card } from './Card';
import { Calendar, Clock, IndianRupee, Star } from 'lucide-react';

interface WorkerStatsProps {
  todayJobs: number;
  pendingRequests: number;
  totalEarnings: number;
  rating: number;
  reviewCount: number;
}

export const WorkerStats: React.FC<WorkerStatsProps> = ({
  todayJobs,
  pendingRequests,
  totalEarnings,
  rating,
  reviewCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
          <span className="text-sm text-gray-500">Today</span>
        </div>
        <p className="text-3xl font-bold">{todayJobs}</p>
        <p className="text-gray-600">Active Jobs</p>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Clock className="w-8 h-8 text-yellow-600" />
          <span className="text-sm text-gray-500">Pending</span>
        </div>
        <p className="text-3xl font-bold">{pendingRequests}</p>
        <p className="text-gray-600">New Requests</p>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <IndianRupee className="w-8 h-8 text-green-600" />
          <span className="text-sm text-gray-500">Earnings</span>
        </div>
        <p className="text-3xl font-bold">₹{totalEarnings}</p>
        <p className="text-gray-600">Total Earned</p>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Star className="w-8 h-8 text-yellow-500" />
          <span className="text-sm text-gray-500">Rating</span>
        </div>
        <p className="text-3xl font-bold">{rating}</p>
        <p className="text-gray-600">{reviewCount} Reviews</p>
      </Card>
    </div>
  );
};