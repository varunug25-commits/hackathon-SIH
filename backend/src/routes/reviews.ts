import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  postReview,
  listWorkerReviews,
  fetchBookingReview,
} from '../controllers/reviews';

const router = Router();

router.post('/', requireAuth, postReview);
router.get('/worker/:workerId', listWorkerReviews);
router.get('/booking/:bookingId', fetchBookingReview);

export default router;
