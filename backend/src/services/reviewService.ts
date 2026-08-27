import { supabase } from '../config/supabase';

export interface CreateReviewInput {
  booking_id: string;
  rating: number;
  comment?: string;
}

export const createReview = async (customerId: string, input: CreateReviewInput) => {
  // 1. Fetch the booking to verify ownership, status, and extract worker_id
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('id, customer_id, worker_id, status')
    .eq('id', input.booking_id)
    .single();

  if (bookingError || !booking) {
    throw new Error('Booking not found');
  }

  // 2. Security validation: user must be the booking customer
  if (booking.customer_id !== customerId) {
    throw new Error('Unauthorized: You cannot review a booking that you did not request');
  }

  // 3. Validation: Booking must be completed
  if (booking.status !== 'completed') {
    throw new Error('Invalid action: You can only review completed bookings');
  }

  // 4. Insert the review (unique constraint on booking_id prevents duplicate reviews)
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .insert({
      booking_id: input.booking_id,
      customer_id: customerId,
      worker_id: booking.worker_id,
      rating: input.rating,
      comment: input.comment || null,
    })
    .select()
    .single();

  if (reviewError) {
    if (reviewError.code === '23505') {
      throw new Error('Conflict: A review already exists for this booking');
    }
    throw new Error(`Failed to create review: ${reviewError.message}`);
  }

  // 5. Update worker aggregate rating
  await updateWorkerAggregateRating(booking.worker_id);

  return review;
};

export const updateWorkerAggregateRating = async (workerId: string) => {
  // Query all reviews for the worker to calculate average and total count
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('worker_id', workerId);

  if (error || !reviews) {
    return;
  }

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2))
    : 0.00;

  // Update workers table
  await supabase
    .from('workers')
    .update({
      rating: avgRating,
      total_reviews: totalReviews,
    })
    .eq('id', workerId);
};

export const getWorkerReviews = async (workerId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      id,
      rating,
      comment,
      created_at,
      profiles!reviews_customer_id_fkey (
        full_name,
        avatar_url
      )
    `)
    .eq('worker_id', workerId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch reviews: ${error.message}`);
  }

  // Map to clean customer display name representation
  return (data || []).map((r: any) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    created_at: r.created_at,
    customer_name: r.profiles?.full_name || 'Anonymous User',
    customer_avatar: r.profiles?.avatar_url || null,
  }));
};

export const getBookingReview = async (bookingId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('booking_id', bookingId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch booking review: ${error.message}`);
  }

  return data;
};
