import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { User, Mail, Phone, Wrench, MapPin, Lock, CheckCircle, ArrowRight, ArrowLeft, Building2, Star } from 'lucide-react';

const workerTypes = [
  { id: 'electrician', name: 'Electrician', icon: '⚡', description: 'Electrical repairs, wiring, installations' },
  { id: 'plumber', name: 'Plumber', icon: '🔧', description: 'Pipe repairs, installations, maintenance' },
  { id: 'carpenter', name: 'Carpenter', icon: '🔨', description: 'Woodwork, furniture, repairs' },
  { id: 'cleaner', name: 'Cleaner', icon: '🧹', description: 'House cleaning, deep cleaning' },
  { id: 'painter', name: 'Painter', icon: '🎨', description: 'Painting, wall treatments' },
  { id: 'mechanic', name: 'Mechanic', icon: '🔩', description: 'Appliance repairs, maintenance' },
  { id: 'gardener', name: 'Gardener', icon: '🌱', description: 'Garden maintenance, landscaping' },
  { id: 'ac_technician', name: 'AC Technician', icon: '❄️', description: 'AC repair, installation, servicing' }
];

type Step = 1 | 2 | 3 | 4;

export const WorkerRegister: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedWorkerType, setSelectedWorkerType] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    location: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setError('');
    if (currentStep === 1 && !selectedWorkerType) {
      setError('Please select a worker type');
      return;
    }
    if (currentStep === 2) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setError('Please fill all required fields');
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.skills || !formData.experience || !formData.location) {
        setError('Please fill all required fields');
        return;
      }
    }
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill all password fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Simulate registration - mock authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store mock registration data
      localStorage.setItem('worker_registration_data', JSON.stringify({
        ...formData,
        workerType: selectedWorkerType
      }));

      navigate('/worker-login');
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Profession</h2>
            <p className="text-gray-600 mb-6">Choose the type of work you specialize in</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {workerTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedWorkerType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedWorkerType === type.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-semibold text-sm">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
            <p className="text-gray-600 mb-6">Tell us about yourself</p>
            
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Details</h2>
            <p className="text-gray-600 mb-6">Your skills and experience</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Skills (e.g., electrical, wiring, repairs)"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="number"
                  placeholder="Experience (years)"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Location (City, Area)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Password</h2>
            <p className="text-gray-600 mb-6">Create a secure password for your account</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Summary</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Type:</strong> {workerTypes.find(t => t.id === selectedWorkerType)?.name}</p>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Location:</strong> {formData.location}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our cooperative services platform</p>
        </div>
        
        <Card className="p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : currentStep > step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{step}</span>
                  )}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep === 4 ? (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? 'Creating Account...' : 'Register'}
                <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/worker-login')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};