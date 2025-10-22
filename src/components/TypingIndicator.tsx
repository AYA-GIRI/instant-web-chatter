export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-secondary border border-border rounded-2xl px-4 py-3 shadow-subtle">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
