import { useEffect, useState, type ReactNode } from "react";
import { Outlet, createFileRoute, useRouterState, Navigate } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { checkIsAdmin } from "@/lib/data/members";
import { AdminShell } from "@/components/layout/admin-shell";
import { PageLoader } from "@/components/chess/loading";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/admin/login") return <Outlet />;
  return (
    <RequireAdmin>
      <AdminShell>
        <Outlet />
      </AdminShell>
    </RequireAdmin>
  );
}

function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setAdmin(false);
      return;
    }
    void checkIsAdmin()
      .then((r) => setAdmin(r.admin))
      .catch(() => setAdmin(false));
  }, [user, isPending]);

  if (isPending || (user && admin === null)) return <PageLoader label="در حال بررسی دسترسی…" />;
  if (!user || !admin) return <Navigate to="/admin/login" />;
  return <>{children}</>;
}
