import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { streamChat } from "@/utils/chatStream";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const Chat = () => {
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
      <Navigation />

      {/* Chat Area */}
      <main className="flex-1 container mx-auto px-4 pt-24 pb-6 flex flex-col max-w-4xl">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 animate-in fade-in-50 duration-700">
              <div className="inline-flex h-20 w-20 rounded-2xl bg-gradient-primary items-center justify-center shadow-glow">
                <Sparkles className="h-10 w-10 text-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Start a Conversation</h2>
              <p className="text-muted-foreground max-w-md">
                Ask me anything! I'm here to help with questions, ideas, writing, and more.
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

export default Chat;
