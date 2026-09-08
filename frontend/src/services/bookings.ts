import apiClient from './api';

// Customer booking operations
export const createBooking = async (data: {
  worker_id: string;
  service_id: string;
  location_id: string;
  problem_description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  scheduled_date: string;
  scheduled_time: string;
  estimated_price: number;
}) => {
  const response = await apiClient.post('/bookings', data);
  return response.data;
};

export const getCustomerBookings = async () => {
  const response = await apiClient.get('/bookings');
  return response.data;
};

export const getCustomerBookingById = async (id: string) => {
  const response = await apiClient.get(`/bookings/${id}`);
  return response.data;
};

export const cancelBooking = async (id: string) => {
  const response = await apiClient.patch(`/bookings/${id}/cancel`);
  return response.data;
};

// Worker booking operations
export const getWorkerBookings = async () => {
  const response = await apiClient.get('/bookings/worker/bookings');
  return response.data;
};

export const getWorkerBookingById = async (id: string) => {
  const response = await apiClient.get(`/bookings/worker/bookings/${id}`);
  return response.data;
};

export const acceptBooking = async (id: string) => {
  const response = await apiClient.patch(`/bookings/worker/bookings/${id}/accept`);
  return response.data;
};

export const startBooking = async (id: string) => {
  const response = await apiClient.patch(`/bookings/worker/bookings/${id}/start`);
  return response.data;
};

export const completeBooking = async (id: string) => {
  const response = await apiClient.patch(`/bookings/worker/bookings/${id}/complete`);
  return response.data;
};
