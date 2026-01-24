import { Skeleton } from "@/components/ui/skeleton";

interface ChatLoadingProps {}

export const ChatLoading = ({}: ChatLoadingProps) => {
  const rows = Array.from({ length: 10 }).map((_, index: number) => ({
    id: index,
    isSent: index % 2 !== 0,
  }));

  return (
    <div className="flex-1 overflow-y-auto space-y-4 py-4 px-6">
      {rows.map((row) => (
        <div key={row.id} className={`flex w-full ${row.isSent ? "justify-end" : "justify-start"} items-end gap-2`}>
          {!row.isSent && <Skeleton className="h-8 w-8 rounded-full" />}
          <Skeleton className={`h-12 ${row.isSent ? "w-56 bg-primary/20" : "w-52"}`} />
        </div>
      ))}
    </div>
  );
};
