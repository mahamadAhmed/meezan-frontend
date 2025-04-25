
import * as React from "react"
import { cn } from "@/shared/utils/utils"
import { Button } from "./button"
import { Upload } from "lucide-react"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect: (files: FileList) => void;
  label?: string;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onFileSelect, label = "اختر الملفات", ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleClick = () => {
      inputRef.current?.click()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target
      if (files) {
        onFileSelect(files)
      }
    }

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
          multiple
          {...props}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"
