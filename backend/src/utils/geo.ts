/**
 * Geo utility functions for location-based calculations
 */

/**
 * Calculate the distance between two coordinates using the Haversine formula.
 * Returns distance in kilometers.
 *
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Validate latitude value
 * @param lat - Latitude to validate
 * @returns true if valid, false otherwise
 */
export const isValidLatitude = (lat: number): boolean => {
  return lat >= -90 && lat <= 90;
};

/**
 * Validate longitude value
 * @param lon - Longitude to validate
 * @returns true if valid, false otherwise
 */
export const isValidLongitude = (lon: number): boolean => {
  return lon >= -180 && lon <= 180;
};

/**
 * Validate radius value
 * @param radius - Radius in kilometers to validate
 * @returns true if valid, false otherwise
 */
export const isValidRadius = (radius: number): boolean => {
  return radius > 0 && radius <= 500; // Max 500km for practical use
};
