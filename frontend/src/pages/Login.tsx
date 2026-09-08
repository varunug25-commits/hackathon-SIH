import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { User, Lock, ArrowRight, Home, CheckCircle } from 'lucide-react';

export const Login: React.FC = () => {
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
      // Simulate login - mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store mock auth data
      localStorage.setItem('auth_token', 'mock_customer_token');
      localStorage.setItem('user_role', 'customer');
      localStorage.setItem('user_email', email);

      navigate('/customer');
    } catch (err: any) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-10 h-10" />
              <span className="text-2xl font-bold">CoopServices</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Find Trusted Workers</h2>
            <p className="text-blue-100 mb-6">
              Connect with skilled professionals for all your household needs. Electricians, plumbers, carpenters, and more - all verified and ready to help.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Verified Workers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Fair Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to find workers for your needs</p>
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
                    Login as Customer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Are you a worker?{' '}
                <button
                  onClick={() => navigate('/worker-login')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Login as Worker
                </button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Register
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
