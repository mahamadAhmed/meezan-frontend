
export interface Customer {
  id: string | number;
  name: string;
  email?: string;
  phone: string;
  address: string;
  type: 'فرد' | 'شركة' | 'مؤسسة';
  status: 'نشط' | 'غير نشط' | 'معلق';
  notes?: string;
  joinDate: string;
  createdAt?: string;
  updatedAt?: string;
  attachments?: string[];
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  status: 'نشط' | 'في إجازة' | 'منتهي';
  joinDate: string;
  department: string;
  address: string;
  jobTitle: string;
}

export interface FinancialRecord {
  id: number | string;
  customerId: number | string;
  amount: number;
  date: string;
  type: 'دفعة' | 'فاتورة' | 'استرداد' | 'مطالبة';
  description: string;
  status: 'مدفوعة' | 'معلقة' | 'ملغية';
  isPercentage?: boolean;
  percentageAmount?: number;
  caseId?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  attachments?: string[];
  sourceType?: 'case' | 'employee';
  employeeId?: number;
  employeeName?: string;
  claimType?: string;
  caseTitle?: string;
}

export interface FinancialRecordFormValues {
  amount: number;
  isPercentage?: boolean;
  percentageAmount?: number;
  caseId?: number;
  date: string | Date;
  type: 'دفعة' | 'فاتورة' | 'استرداد' | 'مطالبة';
  description: string;
  status: 'مدفوعة' | 'معلقة' | 'ملغية';
  notes?: string;
  attachments?: (File | string)[];  // Modified to accept both File and string
  existingAttachments?: string[];
  // Adding additional properties needed by FinancialTransactions.tsx
  customerId?: number | string;
  sourceType?: 'case' | 'employee';
  employeeId?: number;
  claimType?: string;
}
