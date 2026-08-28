import apiClient from './api';

export const getWorkers = async (filters?: {
  service?: string;
  available?: boolean;
  min_rating?: number;
}) => {
  const response = await apiClient.get('/workers', { params: filters });
  return response.data;
};

export const getWorkerById = async (id: string) => {
  const response = await apiClient.get(`/workers/${id}`);
  return response.data;
};

export const getNearbyWorkers = async (params: {
  latitude: number;
  longitude: number;
  radius_km?: number;
  service_id?: string;
  available?: boolean;
}) => {
  const response = await apiClient.get('/workers/nearby', { params });
  return response.data;
};

// Worker self-management (requires auth)
export const getMyWorkerProfile = async () => {
  const response = await apiClient.get('/workers/me');
  return response.data;
};

export const updateMyWorkerProfile = async (data: {
  bio?: string;
  experience_years?: number;
  avatar_url?: string;
  is_available?: boolean;
}) => {
  const response = await apiClient.patch('/workers/me', data);
  return response.data;
};

export const addMyService = async (data: {
  service_id: string;
  hourly_rate?: number;
  base_rate?: number;
}) => {
  const response = await apiClient.post('/workers/me/services', data);
  return response.data;
};

export const removeMyService = async (serviceId: string) => {
  const response = await apiClient.delete(`/workers/me/services/${serviceId}`);
  return response.data;
};

export const updateMyAvailability = async (availability: Array<{
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available?: boolean;
}>) => {
  const response = await apiClient.patch('/workers/me/availability', { availability });
  return response.data;
};
