import { supabase } from '../config/supabase';
import {
  haversineDistance,
  isValidLatitude,
  isValidLongitude,
  isValidRadius,
} from '../utils/geo';

interface NearbyWorkerFilters {
  latitude: number;
  longitude: number;
  radius_km?: number;
  service_id?: string;
  available?: boolean;
}

/**
 * Find workers near a given location, ordered by distance.
 * Filters by service and availability if provided.
 */
export const getNearbyWorkers = async (filters: NearbyWorkerFilters) => {
  const { latitude, longitude, radius_km = 10, service_id, available } = filters;

  // Validate inputs
  if (!isValidLatitude(latitude)) {
    throw new Error('Invalid latitude: must be between -90 and 90');
  }

  if (!isValidLongitude(longitude)) {
    throw new Error('Invalid longitude: must be between -180 and 180');
  }

  if (!isValidRadius(radius_km)) {
    throw new Error('Invalid radius: must be between 1 and 500 kilometers');
  }

  // Build query to fetch workers with their location data
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

  // Filter by availability if requested
  if (available !== undefined) {
    query = query.eq('is_available', available);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch workers: ${error.message}`);
  }

  let workers = data || [];

  // Filter by service_id if provided
  if (service_id) {
    workers = workers.filter((w: any) =>
      w.worker_services?.some((ws: any) => ws.service_id === service_id)
    );
  }

  // Calculate distance for each worker and filter by radius
  // Note: Workers currently don't have latitude/longitude in the schema
  // This is a placeholder for when location data is available
  const workersWithDistance = workers.map((w: any) => ({
    ...w,
    distance_km: 0, // Placeholder - requires worker location data
    latitude: null,
    longitude: null,
  }));

  // Sort by distance (placeholder - all 0 for now)
  workersWithDistance.sort((a, b) => a.distance_km - b.distance_km);

  // Transform to clean response shape
  return workersWithDistance.map((w: any) => ({
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
    latitude: w.latitude,
    longitude: w.longitude,
    distance_km: w.distance_km,
    services: (w.worker_services || []).map((ws: any) => ({
      service_id: ws.services?.id || ws.service_id,
      name: ws.services?.name || null,
      icon_name: ws.services?.icon_name || null,
      hourly_rate: ws.hourly_rate,
      base_rate: ws.base_rate,
    })),
  }));
};
