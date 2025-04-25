
import { apiClient, ApiResponse, handleApiError } from './config';

// Define Template interface
export interface Template {
  id: string | number;
  title: string;
  content: string;
  type: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Get all templates
export const getTemplates = async (): Promise<ApiResponse<Template[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Template[]>>('/templates');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get templates by type
export const getTemplatesByType = async (type: string): Promise<ApiResponse<Template[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Template[]>>(`/templates/type/${type}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific template by ID
export const getTemplate = async (id: string | number): Promise<ApiResponse<Template>> => {
  try {
    const response = await apiClient.get<ApiResponse<Template>>(`/templates/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new template
export const createTemplate = async (data: Partial<Template>): Promise<ApiResponse<Template>> => {
  try {
    const response = await apiClient.post<ApiResponse<Template>>('/templates', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing template
export const updateTemplate = async (
  id: string | number, 
  data: Partial<Template>
): Promise<ApiResponse<Template>> => {
  try {
    const response = await apiClient.put<ApiResponse<Template>>(`/templates/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a template
export const deleteTemplate = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/templates/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Generate document from template
export const generateDocumentFromTemplate = async (
  templateId: string | number,
  data: Record<string, any>
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(
      `/templates/${templateId}/generate`, 
      { data }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
