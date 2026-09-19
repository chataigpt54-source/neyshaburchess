import { Link } from "@tanstack/react-router";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Logo({
  compact = false,
  light = false,
  to = "/",
}: {
  compact?: boolean;
  light?: boolean;
  to?: string;
}) {
  return (
    <Link to={to} className="flex items-center gap-3 no-underline">
      <span
        className={cn(
          "grid shrink-0 place-items-center overflow-hidden rounded-full bg-navy-deep",
          compact ? "size-10" : "size-12 md:size-14",
        )}
      >
        <img
          src="/logo.png"
          alt=""
          width={112}
          height={112}
          className="size-full object-cover"
        />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block font-semibold leading-tight",
            compact ? "text-sm" : "text-sm md:text-base",
            light ? "text-white" : "text-navy",
          )}
        >
          {SITE_NAME}
        </span>
        {compact ? null : (
          <span
            className={cn(
              "mt-0.5 hidden text-[11px] tracking-wide md:block",
              light ? "text-white/55" : "text-muted",
            )}
          >
            Neyshabur Chess Association
          </span>
        )}
      </span>
    </Link>
  );
}
