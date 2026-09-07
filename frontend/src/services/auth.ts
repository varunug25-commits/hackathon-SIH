import apiClient from './api';

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'CUSTOMER' | 'WORKER';
}) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_name');
};

export const getMe = async () => {
  const response = await apiClient.get('/protected');
  return response.data;
};
