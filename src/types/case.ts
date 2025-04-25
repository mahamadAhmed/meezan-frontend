
export type CaseStatus = "نشطة" | "معلقة" | "مغلقة" | "قيد المعالجة";

export const statusColors: Record<CaseStatus, string> = {
  "نشطة": "bg-green-500",
  "معلقة": "bg-amber-500",
  "مغلقة": "bg-slate-500",
  "قيد المعالجة": "bg-blue-500"
};

export interface Lawyer {
  id: number;
  name: string;
}

export interface CaseNote {
  id: number;
  content: string;
  date: string;
  author: string;
}

export interface CaseDocument {
  id: number;
  name: string;
  url: string;
  date: string;
  type: string;
  size?: string;
  uploadDate?: string;
  uploadedBy?: string;
}

export type FeeType = "fixed" | "percentage" | "hourly";

export interface CaseFee {
  type: FeeType;
  amount?: number;
  percentage?: number;
  caseValue?: number;
  status: "pending" | "paid" | "partial";
}

export interface Case {
  id: number;
  title: string;
  caseNumber: string;
  status: CaseStatus;
  clientName: string;
  clientId: number;
  createdAt: string;
  court: string;
  nextSession: string | null;
  lawyers: Lawyer[];
  type: string;
  description: string;
  feeType?: "fixed" | "percentage" | "hourly";
  feeAmount?: number;
  feePercentage?: number;
  caseValue?: number;
  notes?: CaseNote[];
  attachments?: CaseDocument[];
  updateDate?: string;
  closedDate?: string;
  fees?: CaseFee;
}

export interface CaseFormData {
  title: string;
  caseNumber: string;
  status: CaseStatus;
  clientName: string;
  clientId?: number;
  court: string;
  nextSession?: string;
  lawyers: number[];
  type: string;
  description: string;
  feeType?: "fixed" | "percentage" | "hourly";
  feeAmount?: number;
  feePercentage?: number;
  caseValue?: number;
}

export type SessionStatus = "قادمة" | "قيد التنفيذ" | "منتهية";

export const sessionStatusColors: Record<SessionStatus, string> = {
  "قادمة": "bg-blue-500",
  "قيد التنفيذ": "bg-amber-500",
  "منتهية": "bg-emerald-500"
};

export interface CaseSession {
  id: number;
  caseId: number;
  date: string;
  time: string;
  location: string;
  status: SessionStatus;
  notes: string;
  title?: string;
}

export interface Session {
  id: number;
  title: string;
  date: string;
  time: string;
  caseNumber?: string;
  clientName: string;
  location: string;
  status: SessionStatus;
  notes?: string;
}
