import { supabase } from '../config/supabase';

interface WorkerFilters {
  service?: string;
  available?: boolean;
  min_rating?: number;
}

/**
 * Fetch marketplace worker listing with optional filters.
 * Joins profiles, worker_services→services, and locations for marketplace display.
 */
export const getWorkers = async (filters: WorkerFilters) => {
  let query = supabase
    .from('workers')
    .select(`
      id,
      profile_id,
      bio,
      experience_years,
      verification_status,
      rating,
      total_reviews,
      completed_jobs,
      is_available,
      profiles!inner (
        full_name,
        avatar_url
      ),
      worker_services (
        service_id,
        hourly_rate,
        base_rate,
        services (
          id,
          name,
          icon_name
        )
      )
    `);

  // Filter by availability
  if (filters.available !== undefined) {
    query = query.eq('is_available', filters.available);
  }

  // Filter by minimum rating
  if (filters.min_rating !== undefined) {
    query = query.gte('rating', filters.min_rating);
  }

  query = query.order('rating', { ascending: false });

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch workers: ${error.message}`);
  }

  let workers = data || [];

  // Filter by service name (post-query since it's in a nested join)
  if (filters.service) {
    const serviceNameLower = filters.service.toLowerCase();
    workers = workers.filter((w: any) =>
      w.worker_services?.some((ws: any) =>
        ws.services?.name?.toLowerCase() === serviceNameLower
      )
    );
  }

  // Transform to a clean marketplace-safe response shape
  return workers.map((w: any) => ({
    id: w.id,
    profile_id: w.profile_id,
    full_name: w.profiles?.full_name || null,
    avatar_url: w.profiles?.avatar_url || null,
    bio: w.bio,
    experience_years: w.experience_years,
    verification_status: w.verification_status,
    rating: w.rating,
    total_reviews: w.total_reviews,
    completed_jobs: w.completed_jobs,
    is_available: w.is_available,
    services: (w.worker_services || []).map((ws: any) => ({
      service_id: ws.services?.id || ws.service_id,
      name: ws.services?.name || null,
      icon_name: ws.services?.icon_name || null,
      hourly_rate: ws.hourly_rate,
      base_rate: ws.base_rate,
    })),
  }));
};

/**
 * Fetch a single worker by ID with full marketplace detail.
 */
export const getWorkerById = async (workerId: string) => {
  const { data, error } = await supabase
    .from('workers')
    .select(`
      id,
      profile_id,
      bio,
      experience_years,
      verification_status,
      rating,
      total_reviews,
      completed_jobs,
      is_available,
      created_at,
      profiles!inner (
        full_name,
        avatar_url
      ),
      worker_services (
        service_id,
        hourly_rate,
        base_rate,
        services (
          id,
          name,
          icon_name
        )
      ),
      worker_availability (
        id,
        day_of_week,
        start_time,
        end_time,
        is_available
      )
    `)
    .eq('id', workerId)
    .single();

  if (error) {
    return null;
  }

  const w: any = data;
  return {
    id: w.id,
    profile_id: w.profile_id,
    full_name: w.profiles?.full_name || null,
    avatar_url: w.profiles?.avatar_url || null,
    bio: w.bio,
    experience_years: w.experience_years,
    verification_status: w.verification_status,
    rating: w.rating,
    total_reviews: w.total_reviews,
    completed_jobs: w.completed_jobs,
    is_available: w.is_available,
    created_at: w.created_at,
    services: (w.worker_services || []).map((ws: any) => ({
      service_id: ws.services?.id || ws.service_id,
      name: ws.services?.name || null,
      icon_name: ws.services?.icon_name || null,
      hourly_rate: ws.hourly_rate,
      base_rate: ws.base_rate,
    })),
    availability: (w.worker_availability || []).map((a: any) => ({
      id: a.id,
      day_of_week: a.day_of_week,
      start_time: a.start_time,
      end_time: a.end_time,
      is_available: a.is_available,
    })),
  };
};

/**
 * Get the worker record for the currently authenticated user.
 */
export const getWorkerByProfileId = async (profileId: string) => {
  const { data, error } = await supabase
    .from('workers')
    .select(`
      id,
      profile_id,
      bio,
      experience_years,
      verification_status,
      rating,
      total_reviews,
      completed_jobs,
      is_available,
      created_at,
      profiles!inner (
        full_name,
        avatar_url,
        email,
        phone,
        role
      ),
      worker_services (
        service_id,
        hourly_rate,
        base_rate,
        services (
          id,
          name,
          icon_name
        )
      ),
      worker_availability (
        id,
        day_of_week,
        start_time,
        end_time,
        is_available
      )
    `)
    .eq('profile_id', profileId)
    .single();

  if (error) {
    return null;
  }

  return data;
};

/**
 * Update allowed worker profile fields.
 */
export const updateWorkerProfile = async (
  workerId: string,
  updates: {
    bio?: string;
    experience_years?: number;
    avatar_url?: string;
    is_available?: boolean;
  }
) => {
  const { data, error } = await supabase
    .from('workers')
    .update(updates)
    .eq('id', workerId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update worker profile: ${error.message}`);
  }

  return data;
};

/**
 * Add a service association for a worker.
 */
export const addWorkerService = async (
  workerId: string,
  serviceId: string,
  hourlyRate?: number,
  baseRate?: number
) => {
  const { data, error } = await supabase
    .from('worker_services')
    .insert({
      worker_id: workerId,
      service_id: serviceId,
      hourly_rate: hourlyRate ?? null,
      base_rate: baseRate ?? null,
    })
    .select()
    .single();

  if (error) {
    // Duplicate key means the worker already has this service
    if (error.code === '23505') {
      throw new Error('Worker already has this service');
    }
    throw new Error(`Failed to add worker service: ${error.message}`);
  }

  return data;
};

/**
 * Remove a service association for a worker.
 */
export const removeWorkerService = async (workerId: string, serviceId: string) => {
  const { data, error } = await supabase
    .from('worker_services')
    .delete()
    .eq('worker_id', workerId)
    .eq('service_id', serviceId)
    .select();

  if (error) {
    throw new Error(`Failed to remove worker service: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0];
};

/**
 * Set/replace availability slots for a worker.
 */
export const updateWorkerAvailability = async (
  workerId: string,
  availability: Array<{
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_available: boolean;
  }>
) => {
  // Delete existing availability for this worker
  const { error: deleteError } = await supabase
    .from('worker_availability')
    .delete()
    .eq('worker_id', workerId);

  if (deleteError) {
    throw new Error(`Failed to clear availability: ${deleteError.message}`);
  }

  if (availability.length === 0) {
    return [];
  }

  // Insert new availability slots
  const rows = availability.map((slot) => ({
    worker_id: workerId,
    day_of_week: slot.day_of_week,
    start_time: slot.start_time,
    end_time: slot.end_time,
    is_available: slot.is_available,
  }));

  const { data, error } = await supabase
    .from('worker_availability')
    .insert(rows)
    .select();

  if (error) {
    throw new Error(`Failed to update availability: ${error.message}`);
  }

  return data;
};
