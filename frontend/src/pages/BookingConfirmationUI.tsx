import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  IndianRupee,
  Phone,
  Home,
  FileText
} from 'lucide-react';

export const BookingConfirmationUI: React.FC = () => {
  const navigate = useNavigate();

  const bookingDetails = {
    serviceName: 'Electrical Wiring Repair',
    description: 'Fix faulty wiring in living room and kitchen',
    workerName: 'Rajesh Kumar',
    workerType: 'Electrician',
    workerRating: 4.8,
    date: '2026-09-03',
    time: '10:00 AM',
    location: 'Mumbai, Andheri West',
    price: 850,
    bookingId: 'BK-2024-0001'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
            <p className="text-green-100">Your service has been successfully booked</p>
          </div>

          {/* Booking Details */}
          <div className="p-8">
            {/* Booking ID */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="font-mono font-semibold text-gray-900">{bookingDetails.bookingId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Service Details
              </h2>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{bookingDetails.serviceName}</h3>
                <p className="text-gray-600">{bookingDetails.description}</p>
              </div>
            </div>

            {/* Worker Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Worker Details
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{bookingDetails.workerName}</p>
                    <p className="text-sm text-gray-600">{bookingDetails.workerType}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="font-semibold">{bookingDetails.workerRating}</span>
                    <span className="text-sm text-gray-500">★</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Schedule Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Schedule Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Date</span>
                  </div>
                  <p className="font-semibold text-gray-900">{bookingDetails.date}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Time</span>
                  </div>
                  <p className="font-semibold text-gray-900">{bookingDetails.time}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Location</span>
                </div>
                <p className="font-semibold text-gray-900">{bookingDetails.location}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-blue-600" />
                Payment Summary
              </h2>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-semibold text-gray-900">₹{bookingDetails.price}</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-green-200">
                  <span className="font-semibold text-gray-900">Total Amount</span>
                  <span className="font-bold text-xl text-green-600">₹{bookingDetails.price}</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please be available at the scheduled time</li>
                <li>• Keep your phone nearby for coordination</li>
                <li>• Payment will be collected after service completion</li>
                <li>• You can cancel or reschedule up to 2 hours before the appointment</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/customer/bookings')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FileText className="w-5 h-5" />
                View My Bookings
              </button>
              <button
                onClick={() => navigate('/customer')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact us at{' '}
            <a href="mailto:support@fixmate.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@fixmate.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};