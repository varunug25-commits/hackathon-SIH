import apiClient from './api';

export const register = async (data: {
  email: string;
  password: string;
  full_name: string;
  role: 'customer' | 'worker';
}) => {
  // Mock registration - returns mock token and user data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    access_token: 'mock_token_' + Date.now(),
    user: {
      id: 'mock_user_' + Date.now(),
      email: data.email,
      role: data.role,
      name: data.full_name
    }
  };
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  // Mock login - returns mock token and user data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    access_token: 'mock_token_' + Date.now(),
    user: {
      id: 'mock_user_' + Date.now(),
      email: data.email,
      role: 'customer', // Default to customer for demo
      name: 'Demo User'
    }
  };
};

export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
