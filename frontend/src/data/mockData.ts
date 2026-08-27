import type { Worker, Service, Booking, Review } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Electrician',
    type: 'electrician',
    icon: 'Zap',
    description: 'Electrical repairs, installations, and wiring'
  },
  {
    id: '2',
    name: 'Plumber',
    type: 'plumber',
    icon: 'Droplets',
    description: 'Pipe repairs, installations, and drainage'
  },
  {
    id: '3',
    name: 'Carpenter',
    type: 'carpenter',
    icon: 'Hammer',
    description: 'Furniture repair, woodworking, and fittings'
  },
  {
    id: '4',
    name: 'Cleaner',
    type: 'cleaner',
    icon: 'Sparkles',
    description: 'Home cleaning, deep cleaning, and sanitization'
  },
  {
    id: '5',
    name: 'Painter',
    type: 'painter',
    icon: 'Palette',
    description: 'Wall painting, waterproofing, and decoration'
  },
  {
    id: '6',
    name: 'Mechanic',
    type: 'mechanic',
    icon: 'Wrench',
    description: 'Vehicle repairs and maintenance'
  },
  {
    id: '7',
    name: 'Other Services',
    type: 'other',
    icon: 'MoreHorizontal',
    description: 'Other household and community services'
  }
];

export const mockWorkers: Worker[] = [
  {
    id: 'w1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    role: 'worker',
    skills: ['electrical', 'wiring', 'appliance repair'],
    experience: 8,
    location: 'Mumbai',
    rating: 4.8,
    reviewCount: 127,
    hourlyRate: 350,
    verified: true,
    available: true,
    completedJobs: 127,
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: 'w2',
    name: 'Suresh Patel',
    email: 'suresh.patel@email.com',
    phone: '+91 98765 43211',
    role: 'worker',
    skills: ['plumbing', 'pipe fitting', 'drainage'],
    experience: 12,
    location: 'Mumbai',
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 400,
    verified: true,
    available: true,
    completedJobs: 203,
    latitude: 19.0875,
    longitude: 72.8780
  },
  {
    id: 'w3',
    name: 'Amit Singh',
    email: 'amit.singh@email.com',
    phone: '+91 98765 43212',
    role: 'worker',
    skills: ['carpentry', 'furniture repair', 'woodworking'],
    experience: 6,
    location: 'Delhi',
    rating: 4.6,
    reviewCount: 89,
    hourlyRate: 300,
    verified: true,
    available: true,
    completedJobs: 89,
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    id: 'w4',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43213',
    role: 'worker',
    skills: ['cleaning', 'deep cleaning', 'sanitization'],
    experience: 4,
    location: 'Mumbai',
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 250,
    verified: true,
    available: true,
    completedJobs: 156,
    latitude: 19.0900,
    longitude: 72.8700
  },
  {
    id: 'w5',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@email.com',
    phone: '+91 98765 43214',
    role: 'worker',
    skills: ['painting', 'wall finishing', 'waterproofing'],
    experience: 10,
    location: 'Bangalore',
    rating: 4.8,
    reviewCount: 178,
    hourlyRate: 380,
    verified: true,
    available: false,
    completedJobs: 178,
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    id: 'w6',
    name: 'Deepak Yadav',
    email: 'deepak.yadav@email.com',
    phone: '+91 98765 43215',
    role: 'worker',
    skills: ['mechanic', 'auto repair', 'maintenance'],
    experience: 15,
    location: 'Delhi',
    rating: 4.9,
    reviewCount: 245,
    hourlyRate: 450,
    verified: true,
    available: true,
    completedJobs: 245,
    latitude: 28.6200,
    longitude: 77.2100
  },
  {
    id: 'w7',
    name: 'Sanjay Verma',
    email: 'sanjay.verma@email.com',
    phone: '+91 98765 43216',
    role: 'worker',
    skills: ['electrical', 'AC repair', 'appliance installation'],
    experience: 7,
    location: 'Mumbai',
    rating: 4.5,
    reviewCount: 67,
    hourlyRate: 320,
    verified: true,
    available: true,
    completedJobs: 67,
    latitude: 19.0800,
    longitude: 72.8750
  },
  {
    id: 'w8',
    name: 'Ramesh Gupta',
    email: 'ramesh.gupta@email.com',
    phone: '+91 98765 43217',
    role: 'worker',
    skills: ['plumbing', 'bathroom fitting', 'geyser installation'],
    experience: 9,
    location: 'Bangalore',
    rating: 4.7,
    reviewCount: 134,
    hourlyRate: 380,
    verified: true,
    available: true,
    completedJobs: 134,
    latitude: 12.9800,
    longitude: 77.6000
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    customerId: 'c1',
    workerId: 'w1',
    serviceId: '1',
    serviceName: 'Electrician',
    description: 'Fan not working, needs repair',
    location: 'Andheri East, Mumbai',
    latitude: 19.1156,
    longitude: 72.8746,
    scheduledAt: '2024-08-28T10:00:00',
    estimatedPrice: 350,
    status: 'accepted',
    urgency: 'medium',
    createdAt: '2024-08-27T08:00:00'
  },
  {
    id: 'b2',
    customerId: 'c1',
    workerId: 'w2',
    serviceId: '2',
    serviceName: 'Plumber',
    description: 'Kitchen sink leaking',
    location: 'Andheri East, Mumbai',
    latitude: 19.1156,
    longitude: 72.8746,
    scheduledAt: '2024-08-29T14:00:00',
    estimatedPrice: 400,
    status: 'pending',
    urgency: 'high',
    createdAt: '2024-08-27T09:00:00'
  },
  {
    id: 'b3',
    customerId: 'c1',
    serviceId: '4',
    serviceName: 'Cleaner',
    description: 'Full house deep cleaning',
    location: 'Andheri East, Mumbai',
    latitude: 19.1156,
    longitude: 72.8746,
    scheduledAt: '2024-08-30T09:00:00',
    estimatedPrice: 1500,
    status: 'pending',
    urgency: 'low',
    createdAt: '2024-08-27T10:00:00'
  },
  {
    id: 'b4',
    customerId: 'c1',
    workerId: 'w3',
    serviceId: '3',
    serviceName: 'Carpenter',
    description: 'Door hinge repair',
    location: 'Andheri East, Mumbai',
    latitude: 19.1156,
    longitude: 72.8746,
    scheduledAt: '2024-08-25T11:00:00',
    estimatedPrice: 300,
    status: 'completed',
    urgency: 'medium',
    createdAt: '2024-08-24T15:00:00'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    bookingId: 'b4',
    customerId: 'c1',
    workerId: 'w3',
    rating: 5,
    comment: 'Excellent work! Very professional and completed the job quickly.',
    createdAt: '2024-08-25T14:00:00'
  },
  {
    id: 'r2',
    bookingId: 'b1',
    customerId: 'c1',
    workerId: 'w1',
    rating: 4,
    comment: 'Good service, fan is working perfectly now.',
    createdAt: '2024-08-28T12:00:00'
  }
];
