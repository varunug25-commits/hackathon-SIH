import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Select } from '../../components/Select';
import { getWorkerById, getServices, createBooking } from '../../services';
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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData] = await Promise.all([
          getServices()
        ]);
        setServices(servicesData.data || []);

        if (workerId) {
          const workerData = await getWorkerById(workerId);
          const worker = workerData.data || null;
          setWorker(worker);

          // Auto-select the worker's primary service
          if (worker?.services && worker.services.length > 0) {
            setSelectedService(worker.services[0].service_id);
          }
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

  // Map backend fields to component fields with fallbacks
  const workerName = worker ? (worker.full_name || worker.name || 'Unknown') : null;
  const workerHourlyRate = worker ? (worker.services?.[0]?.hourly_rate || worker.hourlyRate || 0) : 0;
  const estimatedPrice = workerHourlyRate * 2;
  
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workerId || !selectedService) {
      alert('Please select a service and worker');
      return;
    }

    setSubmitting(true);

    // For now, use a default location_id since we don't have location selection
    // In production, this should come from a location selector or geocoding
    const bookingData = {
      worker_id: workerId,
      service_id: selectedService,
      location_id: '4d419cbe-87d2-4699-8199-3dbcd1a70878', // Demo customer location from seed
      problem_description: description,
      urgency: urgency as 'low' | 'medium' | 'high',
      scheduled_date: date,
      scheduled_time: time,
      estimated_price: estimatedPrice
    };

    try {
      await createBooking(bookingData);
      navigate('/customer/booking-confirmation');
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Request payload:', bookingData);
      alert(`Failed to create booking: ${error.response?.data?.message || error.message || 'Please try again.'}`);
    } finally {
      setSubmitting(false);
    }
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
              
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? 'Creating Booking...' : 'Confirm Booking'}
              </Button>
            </form>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              {worker && (
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Worker</p>
                  <p className="font-semibold">{workerName}</p>
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
