
import { apiClient, ApiResponse, handleApiError } from './config';

// Define Financial Transaction interface
export interface FinancialTransaction {
  id: string | number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
  relatedCustomer?: string | number;
  relatedCase?: string | number;
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Get all financial transactions
export const getFinancialTransactions = async (): Promise<ApiResponse<FinancialTransaction[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<FinancialTransaction[]>>('/financial');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get financial transactions with filters
export const getFilteredFinancialTransactions = async (
  filters: {
    startDate?: string;
    endDate?: string;
    type?: 'income' | 'expense';
    category?: string;
    customerId?: string | number;
    caseId?: string | number;
  }
): Promise<ApiResponse<FinancialTransaction[]>> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.startDate) queryParams.append('start_date', filters.startDate);
    if (filters.endDate) queryParams.append('end_date', filters.endDate);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.customerId) queryParams.append('customer_id', filters.customerId.toString());
    if (filters.caseId) queryParams.append('case_id', filters.caseId.toString());
    
    const response = await apiClient.get<ApiResponse<FinancialTransaction[]>>(
      `/financial?${queryParams.toString()}`
    );
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific transaction by ID
export const getFinancialTransaction = async (id: string | number): Promise<ApiResponse<FinancialTransaction>> => {
  try {
    const response = await apiClient.get<ApiResponse<FinancialTransaction>>(`/financial/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new financial transaction
export const createFinancialTransaction = async (
  data: Partial<FinancialTransaction>
): Promise<ApiResponse<FinancialTransaction>> => {
  try {
    const response = await apiClient.post<ApiResponse<FinancialTransaction>>('/financial', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a financial transaction with attachments
export const createFinancialTransactionWithFiles = async (
  data: Partial<FinancialTransaction>, 
  files: File[]
): Promise<ApiResponse<FinancialTransaction>> => {
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
    
    const response = await apiClient.post<ApiResponse<FinancialTransaction>>('/financial', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing financial transaction
export const updateFinancialTransaction = async (
  id: string | number, 
  data: Partial<FinancialTransaction>
): Promise<ApiResponse<FinancialTransaction>> => {
  try {
    const response = await apiClient.put<ApiResponse<FinancialTransaction>>(`/financial/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a financial transaction
export const deleteFinancialTransaction = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/financial/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get financial summary
export const getFinancialSummary = async (
  period: 'day' | 'week' | 'month' | 'year' = 'month'
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(`/financial/summary?period=${period}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get customer financial transactions
export const getCustomerFinancialTransactions = async (
  customerId: string | number
): Promise<ApiResponse<FinancialTransaction[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<FinancialTransaction[]>>(
      `/financial/customer/${customerId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get case financial transactions
export const getCaseFinancialTransactions = async (
  caseId: string | number
): Promise<ApiResponse<FinancialTransaction[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<FinancialTransaction[]>>(
      `/financial/case/${caseId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
