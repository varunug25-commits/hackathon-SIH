import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { requireWorker } from '../middleware/requireWorker';
import {
  listWorkers,
  getWorkerDetail,
  getNearbyWorkersList,
  getMyWorkerProfile,
  updateMyWorkerProfile,
  addMyService,
  removeMyService,
  updateMyAvailability,
} from '../controllers/workers';

const router = Router();

// ── Authenticated worker-self routes (must be registered BEFORE /:id) ──
router.get('/me', requireAuth, requireWorker, getMyWorkerProfile);
router.patch('/me', requireAuth, requireWorker, updateMyWorkerProfile);
router.post('/me/services', requireAuth, requireWorker, addMyService);
router.delete('/me/services/:serviceId', requireAuth, requireWorker, removeMyService);
router.patch('/me/availability', requireAuth, requireWorker, updateMyAvailability);

// ── Public routes ──
router.get('/', listWorkers);
router.get('/nearby', getNearbyWorkersList);
router.get('/:id', getWorkerDetail);

export default router;
