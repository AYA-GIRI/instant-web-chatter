import { useRef, useEffect, useState } from "react";
import { Sparkles, X, Send, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { streamChat, type MentorContext } from "@/utils/chatStream";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@/contexts/ChatContext";

export const FloatingChat = () => {
  // Используем глобальный контекст чата
  const {
    isOpen,
    isMinimized,
    messages,
    pendingMessage,
    openChat,
    closeChat,
    toggleMinimize,
    setMessages,
    clearPendingMessage,
  } = useChat();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Прокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Обработка pending сообщения из контекста
  useEffect(() => {
    if (pendingMessage && isOpen && !isMinimized) {
      setInput(pendingMessage);
      clearPendingMessage();
      // Небольшая задержка для анимации открытия чата
      setTimeout(() => {
        handleSendWithMessage(pendingMessage);
      }, 300);
    }
  }, [pendingMessage, isOpen, isMinimized]);

  // Отправка сообщения
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    await handleSendWithMessage(input);
  };

  // Отправка конкретного сообщения
  const handleSendWithMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = messageText;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    let assistantContent = "";
    const upsertAssistant = (nextChunk: string) => {
      assistantContent += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      // Общий режим для плавающего чата - AI Mentor без специфического контекста задания
      const generalContext: MentorContext = {
        mode: "general",
      };

      await streamChat({
        messages: [...messages, { role: "user", content: userMessage }],
        context: generalContext,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
        onError: (error) => {
          console.error("Chat error:", error);
          setIsLoading(false);
          toast({
            title: "Ошибка",
            description: error.message || "Не удалось получить ответ от AI-ассистента",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Обработка Enter для отправки
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent shadow-lg hover:bg-accent/90 transition-all hover:scale-110 flex items-center justify-center z-50 animate-pulse-glow"
          aria-label="Открыть AI-ассистента"
        >
          <Sparkles className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="shadow-2xl border-white/20 glass-panel">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    AI Mentor
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Наставник по AI и промпт-инжинирингу
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleMinimize}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isMinimized ? "Развернуть" : "Свернуть"}
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={closeChat}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <>
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-transparent">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-3 px-4">
                        <p className="text-sm font-medium text-foreground">
                          Привет! Я AI Mentor
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Помогу разобраться с концепциями AI и промпт-инжиниринга.
                          Задавай вопросы - я направлю тебя к решению!
                        </p>
                        <div className="text-xs text-muted-foreground/70 pt-2 border-t border-border">
                          Я не даю готовых ответов, но помогу найти их самостоятельно
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${msg.role === "user"
                              ? "bg-accent text-white"
                              : "bg-secondary text-foreground"
                              }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-secondary rounded-lg p-3">
                            <div className="flex gap-1">
                              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-white/50 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Задайте вопрос..."
                      className="min-h-[60px] resize-none"
                      rows={2}
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      className="bg-accent hover:bg-accent/90 text-white h-12 w-12 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};
