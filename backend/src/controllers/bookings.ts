import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import {
  createBooking,
  getCustomerBookings,
  getCustomerBookingById,
  cancelCustomerBooking,
  getWorkerBookings,
  getWorkerBookingById,
  updateBookingStatusByWorker,
} from '../services/bookingService';
import { getWorkerByProfileId } from '../services/workerService';

// ── CUSTOMER CONTROLLERS ──

export const postBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customerId = req.user!.id;
    const {
      worker_id,
      service_id,
      location_id,
      problem_description,
      urgency,
      scheduled_date,
      scheduled_time,
      estimated_price,
    } = req.body;

    // Field existence validation
    if (
      !worker_id ||
      !service_id ||
      !location_id ||
      !problem_description ||
      !urgency ||
      !scheduled_date ||
      !scheduled_time ||
      estimated_price === undefined
    ) {
      res.status(400).json({
        success: false,
        message: 'All fields (worker_id, service_id, location_id, problem_description, urgency, scheduled_date, scheduled_time, estimated_price) are required',
      });
      return;
    }

    if (estimated_price < 0) {
      res.status(400).json({
        success: false,
        message: 'estimated_price must be a non-negative number',
      });
      return;
    }

    const validUrgencies = ['low', 'medium', 'high', 'critical'];
    if (!validUrgencies.includes(urgency)) {
      res.status(400).json({
        success: false,
        message: 'urgency must be one of: low, medium, high, critical',
      });
      return;
    }

    const booking = await createBooking(customerId, {
      worker_id,
      service_id,
      location_id,
      problem_description,
      urgency,
      scheduled_date,
      scheduled_time,
      estimated_price,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (err: any) {
    if (err.message?.includes('Invalid location') || err.message?.includes('Invalid service')) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    next(err);
  }
};

export const listCustomerBookings = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customerId = req.user!.id;
    const bookings = await getCustomerBookings(customerId);
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

export const getCustomerBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customerId = req.user!.id;
    const { id } = req.params;
    const booking = await getCustomerBookingById(id, customerId);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found or access denied',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customerId = req.user!.id;
    const { id } = req.params;
    const booking = await cancelCustomerBooking(id, customerId);

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to cancel booking',
    });
  }
};

// ── WORKER CONTROLLERS ──

export const listWorkerBookings = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profileId = req.user!.id;
    const worker = await getWorkerByProfileId(profileId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const bookings = await getWorkerBookings(worker.id);
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

export const getWorkerBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profileId = req.user!.id;
    const worker = await getWorkerByProfileId(profileId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const { id } = req.params;
    const booking = await getWorkerBookingById(id, worker.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found or access denied',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const acceptBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profileId = req.user!.id;
    const worker = await getWorkerByProfileId(profileId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const { id } = req.params;
    const booking = await updateBookingStatusByWorker(id, worker.id, 'pending', 'accepted');

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to accept booking',
    });
  }
};

export const startBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profileId = req.user!.id;
    const worker = await getWorkerByProfileId(profileId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const { id } = req.params;
    const booking = await updateBookingStatusByWorker(id, worker.id, 'accepted', 'in_progress');

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to start booking',
    });
  }
};

export const completeBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profileId = req.user!.id;
    const worker = await getWorkerByProfileId(profileId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const { id } = req.params;
    const booking = await updateBookingStatusByWorker(id, worker.id, 'in_progress', 'completed');

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to complete booking',
    });
  }
};
