import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { ServiceCard } from '../../components/ServiceCard';
import { WorkerCard } from '../../components/WorkerCard';
import { BookingCard } from '../../components/BookingCard';
import { getServices, getWorkers, getCustomerBookings } from '../../services';
import type { Service, Worker, Booking } from '../../types';
import { Search, Plus } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, workersData, bookingsData] = await Promise.all([
          getServices(),
          getWorkers(),
          getCustomerBookings()
        ]);
        setServices(servicesData.data || []);
        setWorkers(workersData.data || []);
        setBookings(bookingsData.data || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const recentBookings = bookings.slice(0, 3);
  const nearbyWorkers = workers.slice(0, 4);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="customer" userName="Rahul Sharma" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="customer" userName="Rahul Sharma" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, Rahul!
          </h1>
          <p className="text-gray-600">Find trusted workers for your household needs</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services or describe your problem..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button onClick={() => navigate('/customer/services')}>
              Search
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
            <Button variant="outline" onClick={() => navigate('/customer/services')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Nearby Workers</h2>
            <Button variant="outline" onClick={() => navigate('/customer/workers')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Recent Bookings</h2>
            <Button variant="outline" onClick={() => navigate('/customer/bookings')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => {
              const worker = workers.find(w => w.id === booking.workerId);
              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  workerName={worker?.name}
                />
              );
            })}
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need a service quickly?
            </h3>
            <p className="text-gray-600">Book a worker in just a few clicks</p>
          </div>
          <Button onClick={() => navigate('/customer/services')}>
            <Plus className="w-5 h-5 mr-2" />
            Quick Booking
          </Button>
        </div>
      </div>
    </div>
  );
};
