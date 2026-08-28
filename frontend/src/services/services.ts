import apiClient from './api';

export const getServices = async () => {
  const response = await apiClient.get('/services');
  return response.data;
};
