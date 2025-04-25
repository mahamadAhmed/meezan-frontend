
import React from 'react';
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Session, sessionStatusColors } from '@/types/case';
import { FiCalendar, FiClock, FiMapPin, FiFileText, FiUser, FiChevronLeft } from 'react-icons/fi';

interface SessionCardProps {
  session: Session;
  onViewDetails: (id: number) => void;
}

const SessionCard = ({ session, onViewDetails }: SessionCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, d MMMM yyyy', { locale: ar });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-slate-800 leading-tight">{session.title}</h3>
          <Badge className={`${sessionStatusColors[session.status]} text-white`}>
            {session.status}
          </Badge>
        </div>
        
        <div className="space-y-3 text-slate-700">
          <div className="flex items-center">
            <FiCalendar className="ml-2 text-slate-400" />
            <span className="text-sm">{formatDate(session.date)}</span>
          </div>
          
          <div className="flex items-center">
            <FiClock className="ml-2 text-slate-400" />
            <span className="text-sm">{session.time}</span>
          </div>
          
          <div className="flex items-center">
            <FiMapPin className="ml-2 text-slate-400" />
            <span className="text-sm">{session.location}</span>
          </div>
          
          <div className="flex items-center">
            <FiUser className="ml-2 text-slate-400" />
            <span className="text-sm">{session.clientName}</span>
          </div>
          
          {session.caseNumber && (
            <div className="flex items-center">
              <FiFileText className="ml-2 text-slate-400" />
              <span className="text-sm">قضية رقم: {session.caseNumber}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button 
          variant="ghost" 
          onClick={() => onViewDetails(session.id)} 
          className="text-primary hover:text-primary/80 w-full justify-between"
        >
          <span>عرض التفاصيل</span>
          <FiChevronLeft />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SessionCard;
