
import { useState } from 'react';
import { Message } from '@/types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "مرحباً بك! كيف يمكنني مساعدتك اليوم؟",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim() && !file) return;
    
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    if (file) {
      const fileMessage: Message = {
        id: `file-${userMessageId}`,
        text: `تم إرفاق ملف: ${file.name}`,
        isBot: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fileMessage]);
      setFile(null);
    }
    
    setTimeout(() => {
      const botResponses = [
        "شكراً لتواصلك. كيف يمكنني مساعدتك بخصوص هذا الموضوع؟",
        "أنا هنا للمساعدة في أي استفسارات قانونية تحتاجها.",
        "هل تحتاج إلى معلومات إضافية عن خدماتنا القانونية؟",
        "يمكنني مساعدتك في جدولة مواعيد أو إدارة القضايا الخاصة بك.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: `response-${userMessageId}`,
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    file,
    setFile,
    handleSendMessage,
  };
};
