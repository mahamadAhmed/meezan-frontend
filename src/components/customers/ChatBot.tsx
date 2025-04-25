
import { useState, useEffect, useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Send, 
  X, 
  UserCircle, 
  Bot 
} from "lucide-react";

interface ChatMessage {
  text: string;
  isUser: boolean;
  time: string;
}

export function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      text: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
      isUser: false,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    
    const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    setChatMessages([
      ...chatMessages,
      {
        text: currentMessage,
        isUser: true,
        time: now
      }
    ]);
    
    setCurrentMessage("");
    
    // Add a small delay to simulate the AI thinking
    setTimeout(() => {
      const botResponses = [
        "شكراً لتواصلك معنا. سيتم الرد على استفسارك قريباً من قبل أحد المختصين.",
        "يسعدني مساعدتك! هل لديك أسئلة محددة حول الخدمات القانونية؟",
        "في الوقت الحالي، أنا بصدد استيعاب معلومات المشكلة الخاصة بك. سأقوم بمساعدتك في أقرب وقت.",
        "أود أن أفهم استفسارك بشكل أفضل. هل يمكنك تقديم مزيد من التفاصيل؟"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setChatMessages(prev => [
        ...prev,
        {
          text: randomResponse,
          isUser: false,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Bot Button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="rounded-full h-16 w-16 p-0 bg-purple-600 hover:bg-purple-700 flex items-center justify-center shadow-lg"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="sr-only">المساعد القانوني</span>
      </Button>

      {/* Chat Bot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 left-6 bg-white rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden z-50 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-medium">المساعد القانوني</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-white hover:bg-purple-700 rounded-full"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat Messages */}
          <div className="h-80 p-4 overflow-y-auto bg-slate-50" style={{ direction: 'rtl' }}>
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isUser ? 'justify-start' : 'justify-end'} mb-4`}
              >
                <div className={`flex ${msg.isUser ? 'flex-row' : 'flex-row-reverse'} max-w-[80%]`}>
                  <div className={`flex items-start ${msg.isUser ? 'mr-2' : 'ml-2'}`}>
                    {msg.isUser ? (
                      <div className="bg-purple-100 rounded-full p-2">
                        <UserCircle className="h-6 w-6 text-purple-600" />
                      </div>
                    ) : (
                      <div className="bg-purple-600 rounded-full p-2">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div 
                    className={`${
                      msg.isUser 
                        ? "bg-purple-600 text-white" 
                        : "bg-gray-100 text-slate-800"
                    } p-3 rounded-lg max-w-[calc(100%-40px)]`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <span className={`text-xs ${msg.isUser ? "text-purple-200" : "text-slate-500"} block mt-1`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t">
            <form onSubmit={handleSendChatMessage} className="flex gap-2">
              <Input 
                className="text-right flex-1" 
                dir="rtl"
                placeholder="اكتب رسالتك هنا..." 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendChatMessage(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="flex-shrink-0 bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
