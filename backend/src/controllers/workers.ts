import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import {
  getWorkers,
  getWorkerById,
  getWorkerByProfileId,
  updateWorkerProfile,
  addWorkerService,
  removeWorkerService,
  updateWorkerAvailability,
} from '../services/workerService';
import { getNearbyWorkers } from '../services/nearbyWorkerService';
import { supabase } from '../config/supabase';

// ── Public endpoints ──

export const listWorkers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filters = {
      service: req.query.service as string | undefined,
      available: req.query.available !== undefined
        ? req.query.available === 'true'
        : undefined,
      min_rating: req.query.min_rating !== undefined
        ? parseFloat(req.query.min_rating as string)
        : undefined,
    };

    if (filters.min_rating !== undefined && isNaN(filters.min_rating)) {
      res.status(400).json({ success: false, message: 'min_rating must be a number' });
      return;
    }

    const workers = await getWorkers(filters);
    res.status(200).json({ success: true, data: workers });
  } catch (err) {
    next(err);
  }
};

export const getWorkerDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const worker = await getWorkerById(id);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker not found' });
      return;
    }

    res.status(200).json({ success: true, data: worker });
  } catch (err) {
    next(err);
  }
};

export const getNearbyWorkersList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { latitude, longitude, radius_km, service_id, available } = req.query;

    // Validate required parameters
    if (!latitude || !longitude) {
      res.status(400).json({
        success: false,
        message: 'latitude and longitude are required',
      });
      return;
    }

    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);

    if (isNaN(lat) || isNaN(lon)) {
      res.status(400).json({
        success: false,
        message: 'latitude and longitude must be valid numbers',
      });
      return;
    }

    const filters: any = {
      latitude: lat,
      longitude: lon,
    };

    if (radius_km !== undefined) {
      const radius = parseFloat(radius_km as string);
      if (isNaN(radius)) {
        res.status(400).json({
          success: false,
          message: 'radius_km must be a valid number',
        });
        return;
      }
      filters.radius_km = radius;
    }

    if (service_id !== undefined) {
      filters.service_id = service_id as string;
    }

    if (available !== undefined) {
      filters.available = available === 'true';
    }

    const workers = await getNearbyWorkers(filters);
    res.status(200).json({ success: true, data: workers });
  } catch (err: any) {
    if (err.message?.includes('Invalid latitude') || 
        err.message?.includes('Invalid longitude') || 
        err.message?.includes('Invalid radius')) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    next(err);
  }
};

// ── Authenticated worker-self endpoints ──

export const getMyWorkerProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const worker = await getWorkerByProfileId(userId);

    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Worker profile not found. You may not be registered as a worker.',
      });
      return;
    }

    res.status(200).json({ success: true, data: worker });
  } catch (err) {
    next(err);
  }
};

export const updateMyWorkerProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const worker = await getWorkerByProfileId(userId);

    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Worker profile not found.',
      });
      return;
    }

    const { bio, experience_years, avatar_url, is_available } = req.body;

    // Build only the allowed updates
    const updates: Record<string, any> = {};
    if (bio !== undefined) updates.bio = bio;
    if (experience_years !== undefined) {
      if (typeof experience_years !== 'number' || experience_years < 0) {
        res.status(400).json({ success: false, message: 'experience_years must be a non-negative number' });
        return;
      }
      updates.experience_years = experience_years;
    }
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (is_available !== undefined) {
      if (typeof is_available !== 'boolean') {
        res.status(400).json({ success: false, message: 'is_available must be a boolean' });
        return;
      }
      updates.is_available = is_available;
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ success: false, message: 'No valid fields provided for update' });
      return;
    }

    const updated = await updateWorkerProfile(worker.id, updates);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const addMyService = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const worker = await getWorkerByProfileId(userId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found.' });
      return;
    }

    const { service_id, hourly_rate, base_rate } = req.body;

    if (!service_id) {
      res.status(400).json({ success: false, message: 'service_id is required' });
      return;
    }

    // Verify the service exists
    const { data: service, error: svcErr } = await supabase
      .from('services')
      .select('id')
      .eq('id', service_id)
      .eq('is_active', true)
      .single();

    if (svcErr || !service) {
      res.status(404).json({ success: false, message: 'Service not found or inactive' });
      return;
    }

    const result = await addWorkerService(worker.id, service_id, hourly_rate, base_rate);
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    if (err.message?.includes('already has this service')) {
      res.status(409).json({ success: false, message: err.message });
      return;
    }
    next(err);
  }
};

export const removeMyService = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const worker = await getWorkerByProfileId(userId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found.' });
      return;
    }

    const { serviceId } = req.params;
    const removed = await removeWorkerService(worker.id, serviceId);

    if (!removed) {
      res.status(404).json({ success: false, message: 'Service association not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Service removed successfully' });
  } catch (err) {
    next(err);
  }
};

export const updateMyAvailability = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const worker = await getWorkerByProfileId(userId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found.' });
      return;
    }

    const { availability } = req.body;

    if (!Array.isArray(availability)) {
      res.status(400).json({ success: false, message: 'availability must be an array' });
      return;
    }

    // Validate each slot
    for (const slot of availability) {
      if (slot.day_of_week === undefined || slot.day_of_week < 0 || slot.day_of_week > 6) {
        res.status(400).json({ success: false, message: 'day_of_week must be 0–6 (Sunday–Saturday)' });
        return;
      }
      if (!slot.start_time || !slot.end_time) {
        res.status(400).json({ success: false, message: 'start_time and end_time are required for each slot' });
        return;
      }
      if (slot.start_time >= slot.end_time) {
        res.status(400).json({ success: false, message: 'start_time must be before end_time' });
        return;
      }
      if (slot.is_available === undefined) {
        slot.is_available = true;
      }
    }

    const result = await updateWorkerAvailability(worker.id, availability);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
