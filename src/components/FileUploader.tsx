
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  acceptedFileTypes?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileChange,
  acceptedFileTypes = "*"
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={acceptedFileTypes}
      />
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        className="w-full"
      >
        <FiUpload className="mr-2 h-4 w-4" />
        {selectedFile ? selectedFile.name : "اختر ملفًا"}
      </Button>
      {selectedFile && (
        <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
      )}
    </div>
  );
};
