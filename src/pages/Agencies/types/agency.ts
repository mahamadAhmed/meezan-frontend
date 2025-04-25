
export interface Agency {
  id: number;
  title: string;
  clientName: string;
  description: string;
  attachments: string[];
  createdAt: string;
  status: "سارية" | "منتهية";
  agencyNumber?: string;
  agentName?: string;
  clientId?: number;
  issueDate?: string;
  expiryDate?: string;
  details?: string;
  notes?: string;
}

export interface AgencyFormValues {
  title: string;
  clientName: string;
  agentName: string;
  description: string;
  status: "سارية" | "منتهية";
  agencyNumber?: string;
  issueDate?: Date;
  expiryDate?: Date;
  details?: string;
  notes?: string;
  attachments?: File[];
}
