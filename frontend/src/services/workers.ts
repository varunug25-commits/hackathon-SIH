import apiClient from './api';

export const createWorkerProfile = async (data: {
  userId: string;
  skills: string;
  experience?: number;
  location?: string;
}) => {
  const response = await apiClient.post('/workers', data);
  return response.data;
};

export const getWorkers = async () => {
  const response = await apiClient.get('/workers');
  return response.data;
};

export const getWorkerById = async (id: string) => {
  const response = await apiClient.get(`/workers/${id}`);
  return response.data;
};

export const updateWorkerAvailability = async (id: string, isAvailable: boolean) => {
  const response = await apiClient.patch(`/workers/${id}/availability`, { isAvailable });
  return response.data;
};