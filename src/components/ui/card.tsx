import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-line/80 bg-white shadow-card",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  tone = "navy",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "navy" | "turquoise" | "gold" | "muted" | "ok";
}) {
  const tones = {
    navy: "bg-navy text-white",
    turquoise: "bg-turquoise/12 text-turquoise-dark",
    gold: "bg-gold/15 text-navy",
    muted: "bg-paper text-muted",
    ok: "bg-ok/10 text-ok",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-[var(--radius-sm)] bg-line/70", className)}
      aria-hidden
    />
  );
}

export function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} role="separator" />;
}
