
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Session } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { FiCalendar, FiClock, FiMapPin, FiFileText, FiUser } from 'react-icons/fi';

interface SessionDetailsProps {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SessionDetails = ({ session, open, onOpenChange }: SessionDetailsProps) => {
  if (!session) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, d MMMM yyyy', { locale: ar });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{session.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <Badge className="text-white" variant={session.status === "قادمة" ? "default" : session.status === "منتهية" ? "secondary" : "destructive"}>
              {session.status}
            </Badge>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex items-center gap-3">
              <FiCalendar className="text-slate-400" />
              <span>{formatDate(session.date)}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <FiClock className="text-slate-400" />
              <span>{session.time}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <FiMapPin className="text-slate-400" />
              <span>{session.location}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <FiUser className="text-slate-400" />
              <span>{session.clientName}</span>
            </div>
            
            {session.caseNumber && (
              <div className="flex items-center gap-3">
                <FiFileText className="text-slate-400" />
                <span>قضية رقم: {session.caseNumber}</span>
              </div>
            )}
            
            {session.notes && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">ملاحظات:</h4>
                <p className="text-slate-600 whitespace-pre-wrap">{session.notes}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
