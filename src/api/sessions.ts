
import { apiClient, ApiResponse, handleApiError } from './config';

// Define session type
export interface Session {
  id: string | number;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  caseId?: string | number;
  customerName?: string;
  customerId?: string | number;
  status: string;
  attendees?: string[];
  notes?: string;
}

// Get all sessions
export const getSessions = async (): Promise<ApiResponse<Session[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Session[]>>('/sessions');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get today's sessions
export const getTodaySessions = async (): Promise<ApiResponse<Session[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Session[]>>('/sessions/today');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get upcoming sessions
export const getUpcomingSessions = async (): Promise<ApiResponse<Session[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Session[]>>('/sessions/upcoming');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific session by ID
export const getSession = async (id: string | number): Promise<ApiResponse<Session>> => {
  try {
    const response = await apiClient.get<ApiResponse<Session>>(`/sessions/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new session
export const createSession = async (data: Partial<Session>): Promise<ApiResponse<Session>> => {
  try {
    const response = await apiClient.post<ApiResponse<Session>>('/sessions', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing session
export const updateSession = async (id: string | number, data: Partial<Session>): Promise<ApiResponse<Session>> => {
  try {
    const response = await apiClient.put<ApiResponse<Session>>(`/sessions/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a session
export const deleteSession = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/sessions/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update session status
export const updateSessionStatus = async (
  id: string | number, 
  status: string
): Promise<ApiResponse<Session>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Session>>(`/sessions/${id}/status`, { status });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Add note to session
export const addSessionNote = async (
  id: string | number, 
  note: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(`/sessions/${id}/notes`, { note });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
