import { Request, Response, NextFunction } from 'express';
import { getActiveServices } from '../services/serviceService';

export const listServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const services = await getActiveServices();
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (err) {
    next(err);
  }
};
