import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Select } from '../../components/Select';
import { getWorkerById, getServices } from '../../services';
import type { Worker, Service } from '../../types';
import { Calendar, Clock, MapPin, IndianRupee } from 'lucide-react';

export const CustomerBooking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workerId = searchParams.get('workerId');

  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Andheri East, Mumbai');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [worker, setWorker] = useState<Worker | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData] = await Promise.all([
          getServices()
        ]);
        setServices(servicesData.data || []);

        if (workerId) {
          const workerData = await getWorkerById(workerId);
          setWorker(workerData.data || null);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [workerId]);

  const service = services.find(s => s.id === selectedService);
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);
  
  const estimatedPrice = worker ? (worker.hourlyRate || worker.services?.[0]?.hourly_rate || 0) * 2 : 0;
  
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/customer/booking-confirmation');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="customer" userName="Rahul Sharma" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="customer" userName="Rahul Sharma" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/customer/workers')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Workers
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Service</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Service Details</h2>
                
                <Select
                  label="Select Service"
                  options={services.map(s => ({ value: s.id, label: s.name }))}
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                />
                
                <Textarea
                  label="Describe Your Problem"
                  placeholder="Please describe the issue you're facing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
                
                <Select
                  label="Urgency"
                  options={[
                    { value: 'low', label: 'Low - Can wait a few days' },
                    { value: 'medium', label: 'Medium - Need within 24-48 hours' },
                    { value: 'high', label: 'High - Urgent, need ASAP' }
                  ]}
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  required
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Schedule</h2>
                
                <Input
                  type="date"
                  label="Preferred Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                
                <Input
                  type="time"
                  label="Preferred Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                
                <Input
                  type="text"
                  label="Address"
                  placeholder="Your full address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full">
                Confirm Booking
              </Button>
            </form>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              {worker && (
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Worker</p>
                  <p className="font-semibold">{worker.name}</p>
                </div>
              )}
              
              {service && (
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Service</p>
                  <p className="font-semibold">{service.name}</p>
                </div>
              )}
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{date ? new Date(date).toLocaleDateString() : 'Not selected'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{time || 'Not selected'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Estimated Price</span>
                <div className="flex items-center gap-1 text-blue-600 font-bold text-xl">
                  <IndianRupee className="w-5 h-5" />
                  <span>{estimatedPrice}</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Final price may vary based on actual work required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
