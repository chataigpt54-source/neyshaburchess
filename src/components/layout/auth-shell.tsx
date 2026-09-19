import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/constants";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 py-12 chess-board-bg">
      <div className="navy-veil geo-lattice absolute inset-0" />
      <div className="relative w-full max-w-md rounded-[var(--radius-xl)] glass-card px-6 py-8 md:px-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src="/logo.png" alt="" className="size-20 rounded-full object-cover" />
          <p className="mt-3 text-sm text-white/70">{SITE_NAME}</p>
        </div>
        {children}
      </div>
    </main>
  );
}
