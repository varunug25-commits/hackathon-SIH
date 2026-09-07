import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { StatusBadge } from './StatusBadge';
import { Calendar, Clock, MapPin, IndianRupee, User } from 'lucide-react';
import type { Booking } from '../types';

interface JobCardProps {
  booking: Booking;
  onViewDetails: () => void;
  onAccept?: () => void;
  showActions?: boolean;
  distance?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  booking,
  onViewDetails,
  onAccept,
  showActions = true,
  distance
}) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-gray-700 mb-3">{booking.description}</p>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Customer: {booking.customer_id || booking.customerId || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {(() => {
                  try {
                    const date = new Date(booking.scheduled_date || booking.scheduledAt || '');
                    return date.toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    });
                  } catch {
                    return 'Date not available';
                  }
                })()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {(() => {
                  try {
                    const date = new Date(booking.scheduled_date || booking.scheduledAt || '');
                    return date.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  } catch {
                    return 'Time not available';
                  }
                })()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{booking.location}</span>
              {distance && <span className="text-blue-600 font-medium">({distance})</span>}
            </div>
          </div>
        </div>
        
        <div className="text-right ml-4">
          <div className="flex items-center gap-1 text-blue-600 font-bold text-xl mb-2">
            <IndianRupee className="w-5 h-5" />
            <span>{booking.estimatedPrice || booking.estimated_price}</span>
          </div>
          <span className="text-sm text-gray-500">ID: {booking.id}</span>
        </div>
      </div>
      
      {showActions && (
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            onClick={onViewDetails}
          >
            View Details
          </Button>
          {booking.status === 'pending' && onAccept && (
            <Button 
              variant="outline"
              onClick={onAccept}
            >
              Accept Job
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};