
import { FiLogOut } from "react-icons/fi";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/ui/dialog";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function LogoutDialog({ isOpen, onClose, onLogout }: LogoutDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تسجيل الخروج</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من رغبتك في تسجيل الخروج من النظام؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-4">
          <Button type="button" variant="destructive" onClick={onLogout}>
            <FiLogOut className="ml-2" />
            تسجيل الخروج
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
