
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMobile } from "@/shared/hooks/use-mobile";

interface ModalFormProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  includeCloseButton?: boolean;
  variant?: string;
}

export function ModalForm({
  title,
  description,
  children = null, 
  open,
  onOpenChange,
  onSubmit,
  submitLabel = "حفظ",
  isLoading = false,
  includeCloseButton = false,
  variant,
}: ModalFormProps) {
  const isMobile = useMobile();
  const maxWidthClass = variant === "large" 
    ? "max-w-2xl sm:max-w-2xl" 
    : isMobile 
      ? "max-w-[95vw] sm:max-w-lg" 
      : "max-w-lg sm:max-w-lg";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidthClass} max-h-[90vh] overflow-auto`}>
        <DialogHeader className="text-right sticky top-0 bg-background z-10 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            {includeCloseButton && (
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            )}
          </div>
          {description && (
            <DialogDescription className="text-right">{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="py-4 overflow-y-auto">{children}</div>
        {onSubmit && (
          <DialogFooter className="sm:justify-start sticky bottom-0 bg-background pt-2 z-10">
            <Button type="submit" onClick={onSubmit} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "جاري الحفظ..." : submitLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
