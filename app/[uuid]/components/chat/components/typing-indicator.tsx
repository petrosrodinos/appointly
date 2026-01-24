export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: "0.15s" }} />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: "0.3s" }} />
    </div>
  );
};
