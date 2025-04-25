
import { apiClient, ApiResponse, handleApiError } from './config';

// Define Agency interface
export interface Agency {
  id: string | number;
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  notes?: string;
  status: 'active' | 'inactive';
  clients?: any[];
  createdAt?: string;
  updatedAt?: string;
}

// Get all agencies
export const getAgencies = async (): Promise<ApiResponse<Agency[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Agency[]>>('/agencies');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific agency by ID
export const getAgency = async (id: string | number): Promise<ApiResponse<Agency>> => {
  try {
    const response = await apiClient.get<ApiResponse<Agency>>(`/agencies/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new agency
export const createAgency = async (data: Partial<Agency>): Promise<ApiResponse<Agency>> => {
  try {
    const response = await apiClient.post<ApiResponse<Agency>>('/agencies', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing agency
export const updateAgency = async (id: string | number, data: Partial<Agency>): Promise<ApiResponse<Agency>> => {
  try {
    const response = await apiClient.put<ApiResponse<Agency>>(`/agencies/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete an agency
export const deleteAgency = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/agencies/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Add client to agency
export const addClientToAgency = async (
  agencyId: string | number, 
  clientId: string | number
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(
      `/agencies/${agencyId}/clients`, 
      { client_id: clientId }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Remove client from agency
export const removeClientFromAgency = async (
  agencyId: string | number, 
  clientId: string | number
): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/agencies/${agencyId}/clients/${clientId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
