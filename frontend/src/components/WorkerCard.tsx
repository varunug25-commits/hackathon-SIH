import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Worker } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { Star, MapPin, ShieldCheck, Clock } from 'lucide-react';

interface WorkerCardProps {
  worker: Worker;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const navigate = useNavigate();

  // Map backend fields to component fields with fallbacks
  const name = worker.full_name || worker.name || 'Unknown';
  const skills = worker.skills || (worker.services?.map(s => s.name) || []);
  const experience = worker.experience_years || worker.experience || 0;
  const location = worker.location || 'Location not specified';
  const rating = worker.rating || 0;
  const reviewCount = worker.total_reviews || worker.reviewCount || 0;
  const hourlyRate = worker.services?.[0]?.hourly_rate || worker.hourlyRate || 0;
  const verified = worker.verification_status === 'verified' || worker.verified || false;
  const available = worker.is_available !== undefined ? worker.is_available : (worker.available !== undefined ? worker.available : true);

  const calculateDistance = (lat1?: number, lon1?: number, lat2?: number, lon2?: number): number => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  const distance = calculateDistance(19.1156, 72.8746, worker.latitude, worker.longitude);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            {verified && (
              <ShieldCheck className="w-4 h-4 text-green-600" />
            )}
          </div>
          <p className="text-sm text-gray-600 capitalize">{skills.join(', ')}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-600">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{distance} km away • {location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{experience} years experience</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-blue-600">₹{hourlyRate}</span>
          <span className="text-sm text-gray-500">/hour</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/customer/workers/${worker.id}`)}
          >
            View Profile
          </Button>
          <Button
            size="sm"
            disabled={!available}
            onClick={() => navigate(`/customer/booking?workerId=${worker.id}`)}
          >
            {available ? 'Book' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
