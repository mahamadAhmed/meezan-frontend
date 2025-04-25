
import { apiClient, ApiResponse, handleApiError } from './config';

// Define Employee interface
export interface Employee {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
  profileImage?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get all employees
export const getEmployees = async (): Promise<ApiResponse<Employee[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Employee[]>>('/employees');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific employee by ID
export const getEmployee = async (id: string | number): Promise<ApiResponse<Employee>> => {
  try {
    const response = await apiClient.get<ApiResponse<Employee>>(`/employees/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new employee
export const createEmployee = async (data: Partial<Employee>): Promise<ApiResponse<Employee>> => {
  try {
    const response = await apiClient.post<ApiResponse<Employee>>('/employees', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new employee with profile image
export const createEmployeeWithImage = async (
  data: Partial<Employee>, 
  profileImage: File
): Promise<ApiResponse<Employee>> => {
  try {
    const formData = new FormData();
    
    // Add all data fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    formData.append('profile_image', profileImage);
    
    const response = await apiClient.post<ApiResponse<Employee>>('/employees', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing employee
export const updateEmployee = async (
  id: string | number, 
  data: Partial<Employee>
): Promise<ApiResponse<Employee>> => {
  try {
    const response = await apiClient.put<ApiResponse<Employee>>(`/employees/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an employee with profile image
export const updateEmployeeWithImage = async (
  id: string | number, 
  data: Partial<Employee>, 
  profileImage?: File
): Promise<ApiResponse<Employee>> => {
  try {
    const formData = new FormData();
    
    // Add all data fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }
    
    // Use PUT for update with form data
    formData.append('_method', 'PUT');
    
    const response = await apiClient.post<ApiResponse<Employee>>(`/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete an employee
export const deleteEmployee = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/employees/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update employee status
export const updateEmployeeStatus = async (
  id: string | number, 
  status: 'active' | 'inactive' | 'on_leave'
): Promise<ApiResponse<Employee>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Employee>>(
      `/employees/${id}/status`, 
      { status }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Send message to employee
export const sendMessageToEmployee = async (
  id: string | number, 
  message: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(
      `/employees/${id}/send-message`, 
      { message }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
