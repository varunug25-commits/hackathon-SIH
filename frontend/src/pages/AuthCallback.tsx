import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../config/supabase';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          // Store the session
          localStorage.setItem('auth_token', data.session.access_token);

          // Get the role from URL params
          const role = searchParams.get('role') || 'customer';
          localStorage.setItem('user_role', role);

          // Redirect to appropriate dashboard
          if (role === 'customer') {
            navigate('/customer');
          } else {
            navigate('/worker');
          }
        } else {
          // No session, check if there's an error in URL
          const errorParam = searchParams.get('error');
          const errorDescription = searchParams.get('error_description');
          if (errorParam) {
            setError(errorDescription || errorParam);
            setTimeout(() => navigate('/login'), 3000);
          } else {
            // Try to get session from URL hash (for OAuth)
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = hashParams.get('access_token');

            if (accessToken) {
              localStorage.setItem('auth_token', accessToken);
              const role = searchParams.get('role') || 'customer';
              localStorage.setItem('user_role', role);

              if (role === 'customer') {
                navigate('/customer');
              } else {
                navigate('/worker');
              }
            } else {
              setError('Authentication failed. No session found.');
              setTimeout(() => navigate('/login'), 3000);
            }
          }
        }
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
        setTimeout(() => navigate('/login'), 3000);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {loading ? (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Completing authentication...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 font-medium mb-2">Authentication Error</p>
            <p className="text-red-600 text-sm">{error}</p>
            <p className="text-red-600 text-sm mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-800 font-medium">Authentication Successful</p>
            <p className="text-green-600 text-sm mt-2">Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};
