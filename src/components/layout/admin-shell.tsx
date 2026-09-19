import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardList,
  FileText,
  FolderOpen,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { ADMIN_NAV, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth/client";

const icons = {
  layout: LayoutDashboard,
  news: Newspaper,
  users: Users,
  trophy: Trophy,
  clipboard: ClipboardList,
  image: Images,
  file: FileText,
  folder: FolderOpen,
  settings: Settings,
};

export function AdminShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper md:flex">
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 bg-navy text-white transition-transform duration-300 md:static md:translate-x-0",
          open ? "translate-x-0" : "translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
          <img src="/logo.png" alt="" className="size-10 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{SITE_NAME}</p>
            <p className="text-[11px] text-gold/80">پنل مدیریت</p>
          </div>
          <button
            type="button"
            className="mr-auto grid size-10 place-items-center md:hidden"
            onClick={() => setOpen(false)}
            aria-label="بستن"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3" aria-label="منوی مدیریت">
          {ADMIN_NAV.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? LayoutDashboard;
            const active =
              item.to === "/admin"
                ? pathname === "/admin"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-colors",
                  active ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-3">
          <Link to="/" className="mb-2 block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/70 hover:text-white">
            مشاهده سایت
          </Link>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/70 hover:text-white"
            onClick={() => void signOut("/")}
          >
            <LogOut className="size-4" />
            خروج
          </button>
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy-deep/50 md:hidden"
          aria-label="بستن منو"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur-md">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-[var(--radius-sm)] border border-line md:hidden"
            onClick={() => setOpen(true)}
            aria-label="منو"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="text-base font-semibold text-navy">{title ?? "داشبورد"}</h1>
        </header>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}

export function AdminGuard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
