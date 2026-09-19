import { Skeleton } from "@/components/ui/card";

export function PageLoader({ label = "در حال بارگذاری…" }: { label?: string }) {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-navy"
      role="status"
      aria-live="polite"
    >
      <span className="size-10 animate-spin rounded-full border-2 border-line border-t-turquoise" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export function CardSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
