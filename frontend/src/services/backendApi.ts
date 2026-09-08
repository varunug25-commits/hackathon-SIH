const API_BASE_URL = 'http://localhost:5001';

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: any;
  session?: any;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: any;
  session?: any;
}

export const backendApi = {
  // Worker Authentication
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  logout: async (token: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getMe: async (token: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};