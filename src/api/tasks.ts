
import { apiClient, ApiResponse, handleApiError } from './config';

// Define Task interface
export interface Task {
  id: string | number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string | number;
  relatedCase?: string | number;
  relatedCustomer?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// Get all tasks
export const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get today's tasks
export const getTodayTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks/today');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get upcoming tasks
export const getUpcomingTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks/upcoming');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific task by ID
export const getTask = async (id: string | number): Promise<ApiResponse<Task>> => {
  try {
    const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new task
export const createTask = async (data: Partial<Task>): Promise<ApiResponse<Task>> => {
  try {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing task
export const updateTask = async (id: string | number, data: Partial<Task>): Promise<ApiResponse<Task>> => {
  try {
    const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a task
export const deleteTask = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update task status
export const updateTaskStatus = async (
  id: string | number, 
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
): Promise<ApiResponse<Task>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Task>>(`/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Assign task to employee
export const assignTask = async (
  id: string | number, 
  employeeId: string | number
): Promise<ApiResponse<Task>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Task>>(
      `/tasks/${id}/assign`, 
      { assigned_to: employeeId }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
