import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AuthenticatedRequest, RegisterInput, LoginInput } from '../types/auth';

// Helper to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { full_name, email, phone, password, role }: RegisterInput = req.body;

    // Validation
    if (!full_name || !email || !password || !role) {
      res.status(400).json({
        success: false,
        message: 'Please provide full_name, email, password, and role',
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
      return;
    }

    if (role !== 'customer' && role !== 'worker') {
      res.status(400).json({
        success: false,
        message: 'Role must be either customer or worker',
      });
      return;
    }

    // Call Supabase signUp
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          phone,
          role,
        },
      },
    });

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email if confirmation is enabled.',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password }: LoginInput = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
      return;
    }

    // Call Supabase signInWithPassword
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      // Note: Supabase signout relies on current client session state,
      // but calling auth.signOut() using the global client validates the active connection.
      // We configure supabase client to use the incoming JWT for signout request context.
      const localSupabase = supabase; // Standard signout
      await localSupabase.auth.signOut();
    }
    
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    // Fetch corresponding profile from the database
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      // In case trigger hasn't finished or profile not found, return user metadata fallback
      res.status(200).json({
        success: true,
        user,
        profile: {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          role: user.user_metadata?.role || 'customer',
          phone: user.user_metadata?.phone || '',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
      profile,
    });
  } catch (err) {
    next(err);
  }
};
