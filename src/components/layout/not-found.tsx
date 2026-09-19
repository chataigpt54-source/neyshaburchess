import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center text-white chess-board-bg">
      <div className="navy-veil absolute inset-0" />
      <div className="relative">
        <p className="text-sm tracking-[0.2em] text-gold">۴۰۴</p>
        <h1 className="mt-3 text-3xl font-semibold">این صفحه در صفحه شطرنج پیدا نشد!</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/65">
          نشانی واردشده وجود ندارد یا منتقل شده است.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-5 text-sm font-medium"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}
