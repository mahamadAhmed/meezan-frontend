
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import ChatBot from "@/features/chat/components/ChatBot";
import { Gavel } from "lucide-react";

export default function LegalAssistant() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 mb-4 shadow-lg">
              <Gavel className="w-8 h-8 text-purple-600 dark:text-purple-300" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gradient-primary">المساعد القانوني</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              مرحباً بك في المساعد القانوني الذكي. يمكنك طرح استفساراتك القانونية وسأقوم بمساعدتك بأفضل طريقة ممكنة.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-card to-purple-50/50 dark:from-card dark:to-purple-900/10 border rounded-xl shadow-lg p-6 backdrop-blur-sm">
            <div className="mb-6 p-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
              <h2 className="font-semibold text-lg mb-3 text-purple-700 dark:text-purple-300">كيف يمكنني مساعدتك؟</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center space-x-2 space-x-reverse text-muted-foreground bg-white/50 dark:bg-purple-950/50 p-3 rounded-lg border border-purple-100/50 dark:border-purple-800/50">
                  <Gavel className="w-5 h-5 text-purple-500" />
                  <span>استشارات قانونية عامة</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse text-muted-foreground bg-white/50 dark:bg-purple-950/50 p-3 rounded-lg border border-purple-100/50 dark:border-purple-800/50">
                  <Gavel className="w-5 h-5 text-purple-500" />
                  <span>معلومات عن الإجراءات القانونية</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse text-muted-foreground bg-white/50 dark:bg-purple-950/50 p-3 rounded-lg border border-purple-100/50 dark:border-purple-800/50">
                  <Gavel className="w-5 h-5 text-purple-500" />
                  <span>توضيح المصطلحات القانونية</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse text-muted-foreground bg-white/50 dark:bg-purple-950/50 p-3 rounded-lg border border-purple-100/50 dark:border-purple-800/50">
                  <Gavel className="w-5 h-5 text-purple-500" />
                  <span>الإرشاد في القضايا المدنية والجنائية</span>
                </li>
              </ul>
            </div>
            <ChatBot fullWidth />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
