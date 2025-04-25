
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
  employeePhone: string;
}

export const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  open,
  onOpenChange,
  employeeName,
  employeePhone
}) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate SMS sending
    setTimeout(() => {
      setSending(false);
      setMessage("");
      onOpenChange(false);
      toast.success(`تم إرسال الرسالة SMS إلى ${employeeName}`);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rtl text-right">
        <DialogHeader>
          <DialogTitle>إرسال رسالة SMS إلى {employeeName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-sm">رقم جوال الموظف</label>
            <Input value={employeePhone} readOnly className="bg-gray-100 cursor-not-allowed" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">نص الرسالة</label>
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="اكتب نص الرسالة هنا"
              rows={4}
              required
            />
          </div>
          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="w-full bg-[#1A1F2C] hover:bg-black text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              disabled={sending}
            >
              {sending ? "جاري الإرسال..." : (
                <>
                  <Send className="w-4 h-4" /> <span>إرسال رسالة SMS</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
