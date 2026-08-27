import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import type { UserRole } from '../types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('customer');
  
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  
  const [workerData, setWorkerData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    location: '',
    password: ''
  });
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'customer') {
      navigate('/customer');
    } else {
      navigate('/worker');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our cooperative services platform</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            <Select
              label="Register as"
              options={[
                { value: 'customer', label: 'Customer' },
                { value: 'worker', label: 'Worker' }
              ]}
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            />
            
            <Input
              type="text"
              label="Full Name"
              placeholder="Your name"
              value={role === 'customer' ? customerData.name : workerData.name}
              onChange={(e) => {
                if (role === 'customer') {
                  setCustomerData({ ...customerData, name: e.target.value });
                } else {
                  setWorkerData({ ...workerData, name: e.target.value });
                }
              }}
              required
            />
            
            <Input
              type="email"
              label="Email"
              placeholder="your@email.com"
              value={role === 'customer' ? customerData.email : workerData.email}
              onChange={(e) => {
                if (role === 'customer') {
                  setCustomerData({ ...customerData, email: e.target.value });
                } else {
                  setWorkerData({ ...workerData, email: e.target.value });
                }
              }}
              required
            />
            
            <Input
              type="tel"
              label="Phone"
              placeholder="+91 98765 43210"
              value={role === 'customer' ? customerData.phone : workerData.phone}
              onChange={(e) => {
                if (role === 'customer') {
                  setCustomerData({ ...customerData, phone: e.target.value });
                } else {
                  setWorkerData({ ...workerData, phone: e.target.value });
                }
              }}
              required
            />
            
            {role === 'worker' && (
              <>
                <Input
                  type="text"
                  label="Skills"
                  placeholder="e.g., electrical, plumbing, carpentry"
                  value={workerData.skills}
                  onChange={(e) => setWorkerData({ ...workerData, skills: e.target.value })}
                  required
                />
                
                <Input
                  type="number"
                  label="Experience (years)"
                  placeholder="5"
                  value={workerData.experience}
                  onChange={(e) => setWorkerData({ ...workerData, experience: e.target.value })}
                  required
                />
                
                <Input
                  type="text"
                  label="Location"
                  placeholder="Your city"
                  value={workerData.location}
                  onChange={(e) => setWorkerData({ ...workerData, location: e.target.value })}
                  required
                />
              </>
            )}
            
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={role === 'customer' ? customerData.password : workerData.password}
              onChange={(e) => {
                if (role === 'customer') {
                  setCustomerData({ ...customerData, password: e.target.value });
                } else {
                  setWorkerData({ ...workerData, password: e.target.value });
                }
              }}
              required
            />
            
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
