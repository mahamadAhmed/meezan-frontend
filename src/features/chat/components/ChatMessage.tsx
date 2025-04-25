
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm transition-colors ${
          message.isBot
            ? "bg-muted text-foreground dark:text-slate-100"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p
          className={`text-xs mt-1 ${
            message.isBot ? "text-muted-foreground" : "text-primary-foreground/70"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
