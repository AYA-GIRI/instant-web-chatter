import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// Тип сообщения чата
type Message = {
  role: "user" | "assistant";
  content: string;
};

// Тип контекста чата
type ChatContextType = {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  pendingMessage: string | null;
  openChat: () => void;
  closeChat: () => void;
  toggleMinimize: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  // Открыть чат и вставить сообщение для отправки
  openChatWithMessage: (message: string) => void;
  // Сбросить pending сообщение после отправки
  clearPendingMessage: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Открыть чат
  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  // Закрыть чат
  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Переключить свёрнутость
  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  // Открыть чат с предзаполненным сообщением
  const openChatWithMessage = useCallback((message: string) => {
    setPendingMessage(message);
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  // Сбросить pending сообщение
  const clearPendingMessage = useCallback(() => {
    setPendingMessage(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        isMinimized,
        messages,
        pendingMessage,
        openChat,
        closeChat,
        toggleMinimize,
        setMessages,
        openChatWithMessage,
        clearPendingMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Хук для использования контекста чата
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

