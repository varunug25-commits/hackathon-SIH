import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { User, Lock, ArrowRight, CheckCircle, Wrench } from 'lucide-react';
import { login } from '../services/auth';

export const WorkerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      
      // Store auth data from backend
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_role', response.user.role.toLowerCase());
      localStorage.setItem('user_id', response.user.id);
      localStorage.setItem('user_name', response.user.name);

      // Navigate based on role
      if (response.user.role === 'WORKER') {
        navigate('/worker');
      } else {
        navigate('/customer');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-10 h-10" />
              <span className="text-2xl font-bold">CoopServices</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Grow Your Business</h2>
            <p className="text-purple-100 mb-6">
              Join our cooperative platform and connect with customers who need your skills. Get job recommendations, manage your earnings, and build your reputation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Job Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Flexible Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Weekly Payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Worker Login</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your jobs and earnings</p>
          </div>
          
          <Card className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : (
                  <>
                    Login as Worker
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Are you a customer?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Login as Customer
                </button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-600">
                New worker?{' '}
                <button
                  onClick={() => navigate('/worker-register')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Register as Worker
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};