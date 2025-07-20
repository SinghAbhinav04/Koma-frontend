const API_BASE_URL = 'https://koma-ai.app/';

interface SignupData {
  name: string;
  email: string;
  username: string;
  dob: string;
  password: string;
  api: string;
}

interface LoginData {
  identifier: string; // username or email
  password: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  // Add other user properties as needed
}

interface ApiResponse<T = any> {
  message?: string;
  token?: string;
  error?: string;
  data?: T;
  user?: User;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async signup(data: SignupData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }

      // Store token if signup successful
      if (result.token) {
        localStorage.setItem('auth_token', result.token);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // Store token if login successful
      if (result.token) {
        localStorage.setItem('auth_token', result.token);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      // Clear token regardless of response
      localStorage.removeItem('auth_token');

      return result;
    } catch (error) {
      // Clear token even if request fails
      localStorage.removeItem('auth_token');
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        // If token is invalid, clear it
        if (response.status === 401) {
          localStorage.removeItem('auth_token');
        }
        throw new Error(result.error || 'Failed to fetch user data');
      }

      return result.user || result.data || result;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(): Promise<ApiResponse> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/delete`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete account');
      }

      // Clear token after successful deletion
      localStorage.removeItem('auth_token');

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Clear authentication
  clearAuth(): void {
    localStorage.removeItem('auth_token');
  }
}

export const apiService = new ApiService();
export type { SignupData, LoginData, ApiResponse, User };
