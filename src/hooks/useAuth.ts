
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  login as apiLogin, 
  logout as apiLogout, 
  getCurrentUser, 
  User, 
  LoginCredentials 
} from '@/api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        const response = await getCurrentUser();
        
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // If getting current user fails, clear token
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiLogin(credentials);
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        navigate('/');
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await apiLogout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout
  };
};
