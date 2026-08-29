import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { getWorkerById, getWorkerReviews } from '../../services';
import type { Worker, Review } from '../../types';
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  IndianRupee
} from 'lucide-react';

export const WorkerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [worker, setWorker] = useState<Worker | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [workerData, reviewsData] = await Promise.all([
          getWorkerById(id),
          getWorkerReviews(id)
        ]);
        setWorker(workerData.data || null);
        setReviews(reviewsData.data || []);
      } catch (error) {
        console.error('Failed to fetch worker data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="customer" userName="Rahul Sharma" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Loading worker profile...</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="customer" userName="Rahul Sharma" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">Worker not found</p>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">{worker.name}</h1>
                    {worker.verified && (
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-600 capitalize">{worker.skills.join(', ')}</p>
                  <div className="flex items-center gap-1 mt-2 text-yellow-600">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{worker.rating}</span>
                    <span className="text-gray-500">({worker.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Experience</span>
                  </div>
                  <p className="font-semibold">{worker.experience} years</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Jobs Done</span>
                  </div>
                  <p className="font-semibold">{worker.completedJobs}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="font-semibold">{worker.location}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-sm">Rate</span>
                  </div>
                  <p className="font-semibold">₹{worker.hourlyRate}/hr</p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ₹{worker.hourlyRate}
                </div>
                <p className="text-gray-600">per hour</p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{worker.available ? 'Available Now' : 'Currently Busy'}</span>
                </div>
              </div>
              
              <Button
                className="w-full mb-3"
                disabled={!worker.available}
                onClick={() => navigate(`/customer/booking?workerId=${worker.id}`)}
              >
                {worker.available ? 'Book Now' : 'Currently Unavailable'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/customer/workers')}
              >
                View Other Workers
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
