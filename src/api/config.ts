
import axios from 'axios';

// Get the base URL from environment variables or use a default for development
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Common API response type
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

// Function to handle API errors in a consistent way
export const handleApiError = (error: any): ApiResponse<null> => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      success: false,
      message: error.response.data.message || 'An error occurred',
      errors: error.response.data.errors,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      success: false,
      message: 'No response from server. Please check your internet connection.',
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      success: false,
      message: error.message || 'An unknown error occurred',
    };
  }
};
