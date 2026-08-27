import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { supabase } from '../config/supabase';

/**
 * Middleware that ensures the authenticated user has role = 'worker'.
 * Must be used after requireAuth.
 */
export const requireWorker = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      res.status(403).json({ success: false, message: 'Profile not found' });
      return;
    }

    if (profile.role !== 'worker') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Only workers can access this endpoint.',
      });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};
