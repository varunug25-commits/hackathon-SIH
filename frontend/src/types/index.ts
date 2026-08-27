export type UserRole = 'customer' | 'worker';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface Worker extends User {
  role: 'worker';
  skills: string[];
  experience: number; // years
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number; // INR
  verified: boolean;
  available: boolean;
  completedJobs: number;
  latitude?: number;
  longitude?: number;
}

export interface Customer extends User {
  role: 'customer';
  location?: string;
}

export type ServiceType = 'electrician' | 'plumber' | 'carpenter' | 'cleaner' | 'painter' | 'mechanic' | 'other';

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  icon: string;
  description: string;
}

export type BookingStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  workerId?: string;
  serviceId: string;
  serviceName: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  scheduledAt: string;
  estimatedPrice: number;
  status: BookingStatus;
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  workerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
