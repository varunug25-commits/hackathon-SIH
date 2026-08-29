export type UserRole = 'customer' | 'worker';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface WorkerService {
  service_id: string;
  name: string;
  icon_name: string;
  hourly_rate: number;
  base_rate: number | null;
}

export interface Worker extends User {
  role: 'worker';
  // Backend API fields
  full_name?: string;
  bio?: string;
  experience_years?: number; // years
  verification_status?: 'verified' | 'pending' | 'rejected';
  rating?: number;
  total_reviews?: number;
  completed_jobs?: number;
  is_available?: boolean;
  services?: WorkerService[];
  // Legacy fields for compatibility with mock data
  skills?: string[];
  experience?: number;
  location?: string;
  reviewCount?: number;
  hourlyRate?: number;
  verified?: boolean;
  available?: boolean;
  completedJobs?: number;
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
