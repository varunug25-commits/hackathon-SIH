import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { requireWorker } from '../middleware/requireWorker';
import {
  postBooking,
  listCustomerBookings,
  getCustomerBooking,
  cancelBooking,
  listWorkerBookings,
  getWorkerBooking,
  acceptBooking,
  startBooking,
  completeBooking,
} from '../controllers/bookings';

const router = Router();

// ── CUSTOMER ROUTING ──
router.post('/', requireAuth, postBooking);
router.get('/', requireAuth, listCustomerBookings);
router.get('/:id', requireAuth, getCustomerBooking);
router.patch('/:id/cancel', requireAuth, cancelBooking);

// ── WORKER ROUTING ──
router.get('/worker/bookings', requireAuth, requireWorker, listWorkerBookings);
router.get('/worker/bookings/:id', requireAuth, requireWorker, getWorkerBooking);
router.patch('/worker/bookings/:id/accept', requireAuth, requireWorker, acceptBooking);
router.patch('/worker/bookings/:id/start', requireAuth, requireWorker, startBooking);
router.patch('/worker/bookings/:id/complete', requireAuth, requireWorker, completeBooking);

export default router;
