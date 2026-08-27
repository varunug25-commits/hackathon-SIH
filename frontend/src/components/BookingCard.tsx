import React from 'react';
import type { Booking } from '../types';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { Calendar, Clock, MapPin, IndianRupee } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  workerName?: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, workerName }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
          {workerName && <p className="text-sm text-gray-600">{workerName}</p>}
        </div>
        <StatusBadge status={booking.status} />
      </div>
      
      <p className="text-gray-700 mb-4">{booking.description}</p>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(booking.scheduledAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{formatTime(booking.scheduledAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{booking.location}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-1 text-blue-600 font-semibold">
          <IndianRupee className="w-4 h-4" />
          <span>₹{booking.estimatedPrice}</span>
        </div>
        <span className="text-sm text-gray-500">ID: {booking.id}</span>
      </div>
    </Card>
  );
};
