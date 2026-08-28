import apiClient from './api';

export const createReview = async (data: {
  booking_id: string;
  rating: number;
  comment?: string;
}) => {
  const response = await apiClient.post('/reviews', data);
  return response.data;
};

export const getWorkerReviews = async (workerId: string) => {
  const response = await apiClient.get(`/reviews/worker/${workerId}`);
  return response.data;
};

export const getBookingReview = async (bookingId: string) => {
  const response = await apiClient.get(`/reviews/booking/${bookingId}`);
  return response.data;
};
