import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import {
  createReview,
  getWorkerReviews,
  getBookingReview,
} from '../services/reviewService';

export const postReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customerId = req.user!.id;
    const { booking_id, rating, comment } = req.body;

    if (!booking_id || rating === undefined) {
      res.status(400).json({
        success: false,
        message: 'booking_id and rating are required',
      });
      return;
    }

    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      res.status(400).json({
        success: false,
        message: 'rating must be an integer between 1 and 5',
      });
      return;
    }

    const review = await createReview(customerId, {
      booking_id,
      rating: ratingNum,
      comment,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err: any) {
    if (
      err.message?.includes('Booking not found') ||
      err.message?.includes('Unauthorized') ||
      err.message?.includes('Invalid action') ||
      err.message?.includes('Conflict')
    ) {
      const statusCode = err.message.includes('Unauthorized') ? 403 : err.message.includes('Conflict') ? 409 : 400;
      res.status(statusCode).json({ success: false, message: err.message });
      return;
    }
    next(err);
  }
};

export const listWorkerReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { workerId } = req.params;
    if (!workerId) {
      res.status(400).json({ success: false, message: 'workerId parameter is required' });
      return;
    }

    const reviews = await getWorkerReviews(workerId);
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

export const fetchBookingReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { bookingId } = req.params;
    if (!bookingId) {
      res.status(400).json({ success: false, message: 'bookingId parameter is required' });
      return;
    }

    const review = await getBookingReview(bookingId);

    if (!review) {
      res.status(404).json({
        success: false,
        message: 'No review found for this booking',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};
