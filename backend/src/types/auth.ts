import { Request } from 'express';
import { User } from '@supabase/supabase-js';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export interface RegisterInput {
  full_name: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'customer' | 'worker';
}

export interface LoginInput {
  email: string;
  password?: string;
}
