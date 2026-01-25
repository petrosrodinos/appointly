import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AiSentimentProps {
  sentiment_text: string;
  class_name?: string;
}

const AiSentiment = ({ sentiment_text, class_name }: AiSentimentProps) => {
  if (!sentiment_text) {
    return null;
  }

  return (
    <Card className={cn("relative overflow-hidden border-0 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-yellow-500/10 dark:from-amber-600/15 dark:via-orange-600/10 dark:to-yellow-600/10 shadow-2xl ring-1 ring-amber-500/25 backdrop-blur-xl", class_name)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 opacity-90 shadow-[0_15px_35px_-15px_rgba(245,158,11,0.8)] dark:opacity-70" />
              <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-sm dark:text-amber-100 animate-pulse" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base sm:text-lg font-semibold text-foreground">What Customers Say</CardTitle>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">Insights drawn from real customer feedback</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm leading-relaxed space-y-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          <p>{sentiment_text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiSentiment;
