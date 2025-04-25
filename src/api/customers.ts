
import { Customer } from '@/types/customer';
import { apiClient, ApiResponse, handleApiError } from './config';

// Get all customers
export const getCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Customer[]>>('/customers');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a specific customer by ID
export const getCustomer = async (id: string | number): Promise<ApiResponse<Customer>> => {
  try {
    const response = await apiClient.get<ApiResponse<Customer>>(`/customers/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new customer
export const createCustomer = async (data: Partial<Customer>): Promise<ApiResponse<Customer>> => {
  try {
    const response = await apiClient.post<ApiResponse<Customer>>('/customers', data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new customer with file upload
export const createCustomerWithFiles = async (data: Partial<Customer>, files: File[]): Promise<ApiResponse<Customer>> => {
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
    
    const response = await apiClient.post<ApiResponse<Customer>>('/customers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing customer
export const updateCustomer = async (id: string | number, data: Partial<Customer>): Promise<ApiResponse<Customer>> => {
  try {
    const response = await apiClient.put<ApiResponse<Customer>>(`/customers/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update a customer with file upload
export const updateCustomerWithFiles = async (
  id: string | number, 
  data: Partial<Customer>, 
  files: File[]
): Promise<ApiResponse<Customer>> => {
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
    
    const response = await apiClient.post<ApiResponse<Customer>>(`/customers/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a customer
export const deleteCustomer = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(`/customers/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get customer financial records
export const getCustomerFinancialRecords = async (id: string | number): Promise<ApiResponse<any[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<any[]>>(`/customers/${id}/financial`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Send SMS to customer
export const sendSmsToCustomer = async (id: string | number, message: string): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.post<ApiResponse<null>>(`/customers/${id}/send-sms`, { message });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
