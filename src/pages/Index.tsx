import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { streamChat } from "@/utils/chatStream";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (input: string) => {
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
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
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
        onError: (error) => {
          console.error("Chat error:", error);
          setIsLoading(false);
          toast({
            title: "Error",
            description: error.message || "Failed to get response from AI",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            <MessageSquare className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI ChatBot</h1>
            <p className="text-xs text-muted-foreground">Powered by Lovable AI</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 animate-in fade-in-50 duration-700">
              <div className="inline-flex h-20 w-20 rounded-2xl bg-gradient-primary items-center justify-center shadow-glow">
                <Sparkles className="h-10 w-10 text-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Welcome to AI ChatBot</h2>
              <p className="text-muted-foreground max-w-md">
                Start a conversation with our AI assistant. Ask anything, get instant responses!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-1 pb-4">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} role={msg.role} content={msg.content} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-background via-background to-transparent">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
