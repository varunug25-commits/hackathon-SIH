import { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AuthenticatedRequest } from '../types/auth';

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authorization token is missing or malformed',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    // Retrieve user using Supabase getUser API
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication token',
      });
      return;
    }

    // Attach user information to the request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
