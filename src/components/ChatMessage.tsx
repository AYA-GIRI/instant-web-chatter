import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in-50 slide-in-from-bottom-2",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-subtle",
          role === "user"
            ? "bg-gradient-primary text-foreground"
            : "bg-secondary text-foreground border border-border"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  );
};
