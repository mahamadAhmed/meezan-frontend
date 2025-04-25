
import { SessionStatus } from "@/types/case";

export interface Session {
  id: number;
  title: string;
  date: string;
  time: string;
  client: string;
  location: string;
  caseNumber: string;
  status: SessionStatus;
  notes?: string;
}
