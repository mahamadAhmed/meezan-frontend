
import { apiClient, ApiResponse, handleApiError } from './config';

// Define User interface
export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Define Login credentials interface
export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

// Login user
export const login = async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/login', 
      credentials
    );
    
    if (response.data.success && response.data.data?.token) {
      // Store token in localStorage
      localStorage.setItem('auth_token', response.data.data.token);
    }
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Register user
export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<ApiResponse<{ user: User; token: string }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/register', 
      userData
    );
    
    if (response.data.success && response.data.data?.token) {
      // Store token in localStorage
      localStorage.setItem('auth_token', response.data.data.token);
    }
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Logout user
export const logout = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.post<ApiResponse<null>>('/auth/logout');
    
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    return response.data;
  } catch (error) {
    // Always remove token on logout, even if the API call fails
    localStorage.removeItem('auth_token');
    return handleApiError(error);
  }
};

// Get current user
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.get<ApiResponse<User>>('/auth/user');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update user profile
export const updateProfile = async (data: Partial<User>): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update profile with image
export const updateProfileWithImage = async (
  data: Partial<User>, 
  profileImage: File
): Promise<ApiResponse<User>> => {
  try {
    const formData = new FormData();
    
    // Add all data fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    formData.append('profile_image', profileImage);
    
    // Use PUT for update with form data
    formData.append('_method', 'PUT');
    
    const response = await apiClient.post<ApiResponse<User>>('/auth/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Change password
export const changePassword = async (
  data: { current_password: string; password: string; password_confirmation: string; }
): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.put<ApiResponse<null>>('/auth/password', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Reset password
export const resetPassword = async (
  data: { token: string; email: string; password: string; password_confirmation: string; }
): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.post<ApiResponse<null>>('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
