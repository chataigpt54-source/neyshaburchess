import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "خطایی رخ داد. لطفاً صفحه را دوباره بارگذاری کنید.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center text-white chess-board-bg">
      <div className="navy-veil geo-lattice absolute inset-0" />
      <div className="relative">
        <h1 className="text-2xl font-semibold">اختلال در اجرای صفحه</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/70 break-words">
          {errorMessage(error)}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-5 text-sm font-medium text-white"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}
