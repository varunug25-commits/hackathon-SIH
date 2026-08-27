import { supabase } from '../config/supabase';

export interface CreateBookingInput {
  worker_id: string;
  service_id: string;
  location_id: string;
  problem_description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  scheduled_date: string;
  scheduled_time: string;
  estimated_price: number;
}

export const createBooking = async (customerId: string, input: CreateBookingInput) => {
  // 1. Verify location belongs to the customer
  const { data: location, error: locError } = await supabase
    .from('locations')
    .select('id')
    .eq('id', input.location_id)
    .eq('profile_id', customerId)
    .single();

  if (locError || !location) {
    throw new Error('Invalid location: Location does not exist or does not belong to you');
  }

  // 2. Verify worker offers the selected service
  const { data: workerService, error: wsError } = await supabase
    .from('worker_services')
    .select('worker_id')
    .eq('worker_id', input.worker_id)
    .eq('service_id', input.service_id)
    .single();

  if (wsError || !workerService) {
    throw new Error('Invalid service: The selected worker does not offer this service');
  }

  // 3. Insert booking
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      customer_id: customerId,
      worker_id: input.worker_id,
      service_id: input.service_id,
      location_id: input.location_id,
      problem_description: input.problem_description,
      urgency: input.urgency,
      scheduled_date: input.scheduled_date,
      scheduled_time: input.scheduled_time,
      estimated_price: input.estimated_price,
      status: 'pending',
    })
    .select(`
      *,
      services (name, icon_name),
      locations (address, city, state, pincode)
    `)
    .single();

  if (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }

  return data;
};

export const getCustomerBookings = async (customerId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (name, icon_name),
      locations (address, city, state, pincode),
      workers (
        id,
        profiles (full_name, avatar_url)
      )
    `)
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch bookings: ${error.message}`);
  }

  return data;
};

export const getCustomerBookingById = async (bookingId: string, customerId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (name, icon_name),
      locations (address, city, state, pincode),
      workers (
        id,
        profiles (full_name, avatar_url, phone)
      )
    `)
    .eq('id', bookingId)
    .eq('customer_id', customerId)
    .single();

  if (error) {
    return null;
  }

  return data;
};

export const cancelCustomerBooking = async (bookingId: string, customerId: string) => {
  // Only allow cancelling if pending or accepted
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('status')
    .eq('id', bookingId)
    .eq('customer_id', customerId)
    .single();

  if (fetchError || !booking) {
    throw new Error('Booking not found');
  }

  if (booking.status !== 'pending' && booking.status !== 'accepted') {
    throw new Error(`Cannot cancel a booking that is currently ${booking.status}`);
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)
    .eq('customer_id', customerId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to cancel booking: ${error.message}`);
  }

  return data;
};

export const getWorkerBookings = async (workerId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (name, icon_name),
      locations (address, city, state, pincode),
      profiles!bookings_customer_id_fkey (full_name, avatar_url, phone)
    `)
    .eq('worker_id', workerId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch worker bookings: ${error.message}`);
  }

  return data;
};

export const getWorkerBookingById = async (bookingId: string, workerId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (name, icon_name),
      locations (address, city, state, pincode),
      profiles!bookings_customer_id_fkey (full_name, avatar_url, phone)
    `)
    .eq('id', bookingId)
    .eq('worker_id', workerId)
    .single();

  if (error) {
    return null;
  }

  return data;
};

export const updateBookingStatusByWorker = async (
  bookingId: string,
  workerId: string,
  fromStatus: string,
  toStatus: string
) => {
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('status')
    .eq('id', bookingId)
    .eq('worker_id', workerId)
    .single();

  if (fetchError || !booking) {
    throw new Error('Booking not found');
  }

  if (booking.status !== fromStatus) {
    throw new Error(`Invalid transition: Booking status is ${booking.status}, expected ${fromStatus}`);
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ status: toStatus })
    .eq('id', bookingId)
    .eq('worker_id', workerId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update booking status: ${error.message}`);
  }

  return data;
};
