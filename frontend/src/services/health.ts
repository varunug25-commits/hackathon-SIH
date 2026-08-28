import apiClient from './api';

export const healthCheck = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};
