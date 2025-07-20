import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, type User } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    username: string;
    dob: string;
    password: string;
    api: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      try {
        const isAuth = apiService.isAuthenticated();
        if (isAuth) {
          // Fetch user data if authenticated
          const userData = await apiService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
        // Clear invalid token
        apiService.clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const response = await apiService.login({ identifier, password });
      
      // If the response includes user data, use it
      if (response.user) {
        setUser(response.user);
      } else {
        // Otherwise fetch user data
        const userData = await apiService.getCurrentUser();
        setUser(userData);
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const signup = async (data: {
    name: string;
    email: string;
    username: string;
    dob: string;
    password: string;
    api: string;
  }) => {
    try {
      const response = await apiService.signup(data);
      
      // If the response includes user data, use it
      if (response.user) {
        setUser(response.user);
      } else {
        // Otherwise fetch user data
        const userData = await apiService.getCurrentUser();
        setUser(userData);
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};