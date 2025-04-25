
import { Case } from '@/types/case';
import { apiClient, ApiResponse, handleApiError } from './config';

// Get all cases
export const getCases = async (): Promise<ApiResponse<Case[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Case[]>>('/cases');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific case by ID
export const getCase = async (id: string | number): Promise<ApiResponse<Case>> => {
  try {
    const response = await apiClient.get<ApiResponse<Case>>(`/cases/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new case
export const createCase = async (data: Partial<Case>): Promise<ApiResponse<Case>> => {
  try {
    const response = await apiClient.post<ApiResponse<Case>>('/cases', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new case with file upload
export const createCaseWithFiles = async (data: Partial<Case>, files: File[]): Promise<ApiResponse<Case>> => {
  try {
    const formData = new FormData();
    
    // Add all data fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    // Add all files to FormData
    files.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });
    
    const response = await apiClient.post<ApiResponse<Case>>('/cases', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing case
export const updateCase = async (id: string | number, data: Partial<Case>): Promise<ApiResponse<Case>> => {
  try {
    const response = await apiClient.put<ApiResponse<Case>>(`/cases/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update a case with file upload
export const updateCaseWithFiles = async (
  id: string | number, 
  data: Partial<Case>, 
  files: File[]
): Promise<ApiResponse<Case>> => {
  try {
    const formData = new FormData();
    
    // Add all data fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    // Add all files to FormData
    files.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });
    
    // Use PUT for update with form data
    formData.append('_method', 'PUT');
    
    const response = await apiClient.post<ApiResponse<Case>>(`/cases/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a case
export const deleteCase = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/cases/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update case status
export const updateCaseStatus = async (
  id: string | number, 
  status: string
): Promise<ApiResponse<Case>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Case>>(`/cases/${id}/status`, { status });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Add note to case
export const addCaseNote = async (
  id: string | number, 
  note: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(`/cases/${id}/notes`, { note });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Add attachment to case
export const addCaseAttachment = async (
  id: string | number, 
  file: File, 
  description?: string
): Promise<ApiResponse<any>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    if (description) {
      formData.append('description', description);
    }
    
    const response = await apiClient.post<ApiResponse<any>>(
      `/cases/${id}/attachments`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Assign lawyer to case
export const assignLawyerToCase = async (
  caseId: string | number, 
  lawyerId: string | number
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(
      `/cases/${caseId}/assign-lawyer`, 
      { lawyer_id: lawyerId }
    );
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
