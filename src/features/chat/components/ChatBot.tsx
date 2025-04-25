
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FiMessageSquare, FiSend, FiUpload, FiX } from "react-icons/fi";
import { ChatMessage } from "./ChatMessage";
import { useChat } from "../hooks/useChat";

interface ChatBotProps {
  fullWidth?: boolean;
  onClose?: () => void;
}

const ChatBot = ({ fullWidth = false, onClose }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(fullWidth); // يبدأ مفتوح إذا fullWidth true
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    inputValue,
    setInputValue,
    file,
    setFile,
    handleSendMessage,
  } = useChat();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeFile = () => setFile(null);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // 🧠 إذا fullWidth نعرضه كمكوّن مباشر
  if (fullWidth) {
    return (
      <div className="h-[600px] flex flex-col bg-background border rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b bg-muted">
          <h3 className="font-medium text-lg">المساعد القانوني</h3>
          <p className="text-sm text-muted-foreground">
            كيف يمكنني مساعدتك اليوم؟
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-background">
          {file && (
            <div className="flex items-center gap-2 bg-muted p-2 rounded-lg mb-2">
              <span className="text-sm truncate flex-1">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="h-6 w-6 p-0"
              >
                <FiX size={16} />
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => document.getElementById("file-upload")?.click()}
              type="button"
            >
              <FiUpload size={18} />
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
            </Button>

            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب رسالتك هنا..."
              className="min-h-10 resize-none"
            />

            <Button
              onClick={handleSendMessage}
              className="shrink-0"
              disabled={!inputValue.trim() && !file}
              type="button"
            >
              <FiSend size={18} />
            </Button>
          </div>

          <div className="flex justify-end mt-2">
            <Button variant="outline" onClick={handleClose}>إغلاق</Button>
          </div>
        </div>
      </div>
    );
  }

  // 💬 زر وإظهار بـ Drawer (الوضع العادي)
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
        aria-label="فتح المساعد"
      >
        <FiMessageSquare size={24} />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        {isOpen && (
          <DrawerContent className="h-[80vh] max-w-[500px] mx-auto">
            <DrawerHeader className="border-b">
              <DrawerTitle>المساعد القانوني</DrawerTitle>
              <DrawerDescription>
                يمكنك طرح أي استفسار قانوني وسنساعدك
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(80vh-14rem)]">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              {file && (
                <div className="flex items-center gap-2 bg-muted p-2 rounded-lg mb-2">
                  <span className="text-sm truncate flex-1">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-6 w-6 p-0"
                  >
                    <FiX size={16} />
                  </Button>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  type="button"
                >
                  <FiUpload size={18} />
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </Button>

                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب رسالتك هنا..."
                  className="min-h-10 resize-none"
                />

                <Button
                  onClick={handleSendMessage}
                  className="shrink-0"
                  disabled={!inputValue.trim() && !file}
                  type="button"
                >
                  <FiSend size={18} />
                </Button>
              </div>
            </div>

            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline" onClick={handleClose}>
                  إغلاق
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
};

export default ChatBot;
