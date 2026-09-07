import apiClient from './api';

// Booking operations matching backend API
export const createBooking = async (data: {
  workerId: string;
  serviceId: string;
  bookingDate: string;
}) => {
  const response = await apiClient.post('/bookings', data);
  return response.data;
};

export const getBookings = async () => {
  const response = await apiClient.get('/bookings');
  return response.data;
};

export const getBookingById = async (id: string) => {
  const response = await apiClient.get(`/bookings/${id}`);
  return response.data;
};

export const updateBookingStatus = async (id: string, status: string) => {
  const response = await apiClient.patch(`/bookings/${id}/status`, { status });
  return response.data;
};

// Convenience methods for worker operations
export const getWorkerBookings = async () => {
  return getBookings();
};

export const acceptBooking = async (id: string) => {
  return updateBookingStatus(id, 'ACCEPTED');
};

export const startBooking = async (id: string) => {
  return updateBookingStatus(id, 'IN_PROGRESS');
};

export const completeBooking = async (id: string) => {
  return updateBookingStatus(id, 'COMPLETED');
};

export const cancelBooking = async (id: string) => {
  return updateBookingStatus(id, 'CANCELLED');
};
