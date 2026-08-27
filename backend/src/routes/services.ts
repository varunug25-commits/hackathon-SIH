import { Router } from 'express';
import { listServices } from '../controllers/services';

const router = Router();

router.get('/', listServices);

export default router;
