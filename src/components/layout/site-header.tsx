import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, LogOut, UserRound } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { checkIsAdmin } from "@/lib/data/members";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!user) {
      setAdmin(false);
      return;
    }
    void checkIsAdmin()
      .then((r) => setAdmin(r.admin))
      .catch(() => setAdmin(false));
  }, [user]);

  const onDarkHero = pathname === "/" && !scrolled;
  const gateSession = typeof window !== "undefined" && hasGateSessionMarker();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || !onDarkHero
          ? "border-b border-white/10 bg-navy/92 text-white shadow-[0_10px_30px_-20px_rgb(0_0_0_/_0.6)] backdrop-blur-xl"
          : "bg-transparent text-white",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[4.5rem] md:px-6">
        <Logo light compact={false} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
          {NAV_ITEMS.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors",
                  active ? "bg-white/12 text-white" : "text-white/75 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            {isPending ? (
              <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />
            ) : user ? (
              <div className="flex items-center gap-1">
                {admin ? (
                  <Link
                    to="/admin"
                    className="rounded-full px-3 py-2 text-sm text-gold hover:bg-white/10"
                  >
                    پنل مدیریت
                  </Link>
                ) : (
                  <Link
                    to="/account"
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                  >
                    <UserRound className="size-4" />
                    پنل کاربری
                  </Link>
                )}
                {!gateSession ? (
                  <button
                    type="button"
                    disabled={signingOut}
                    onClick={() => {
                      setSigningOut(true);
                      void signOut("/").catch(() => setSigningOut(false));
                    }}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/70 hover:text-white"
                  >
                    <LogOut className="size-4" />
                    {signingOut ? "خروج…" : "خروج"}
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  to="/login"
                  className="rounded-full px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                >
                  ورود
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-9 items-center rounded-full bg-turquoise px-3 text-xs font-medium text-white hover:bg-turquoise-dark"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-navy/96 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="منوی موبایل">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-white/90 hover:bg-white/8"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
            {user ? (
              <>
                <Link to={admin ? "/admin" : "/account"} className="px-3 py-2">
                  {admin ? "پنل مدیریت" : "پنل کاربری"}
                </Link>
                {!gateSession ? (
                  <button
                    type="button"
                    className="px-3 py-2 text-right text-white/70"
                    onClick={() => void signOut("/")}
                  >
                    خروج
                  </button>
                ) : null}
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2">
                  ورود
                </Link>
                <Link to="/register" className="px-3 py-2">
                  ثبت‌نام
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
