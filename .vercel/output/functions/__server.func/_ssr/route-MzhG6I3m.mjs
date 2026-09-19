import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, b as Navigate, f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as SITE_NAME, t as ADMIN_NAV } from "./constants-B4oS1R5Q.mjs";
import { n as cn } from "./utils-Bj1GyghM.mjs";
import { _ as Images, b as ClipboardList, c as Settings, d as Newspaper, f as Menu, g as LayoutDashboard, h as LogOut, n as Users, o as Trophy, t as X, v as FolderOpen, y as FileText } from "../_libs/lucide-react.mjs";
import { i as signOut } from "./client-DVkGLiL8.mjs";
import { t as useCurrentUserState } from "./use-current-user-CrBp7vhQ.mjs";
import { t as checkIsAdmin } from "./members-CAFPfs50.mjs";
import { t as PageLoader } from "./loading-DMY5oTQq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-MzhG6I3m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	layout: LayoutDashboard,
	news: Newspaper,
	users: Users,
	trophy: Trophy,
	clipboard: ClipboardList,
	image: Images,
	file: FileText,
	folder: FolderOpen,
	settings: Settings
};
function AdminShell({ children, title }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper md:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("fixed inset-y-0 right-0 z-50 w-72 bg-navy text-white transition-transform duration-300 md:static md:translate-x-0", open ? "translate-x-0" : "translate-x-full md:translate-x-0"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-16 items-center gap-3 border-b border-white/10 px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo.png",
								alt: "",
								className: "size-10 rounded-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold",
									children: SITE_NAME
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-gold/80",
									children: "پنل مدیریت"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mr-auto grid size-10 place-items-center md:hidden",
								onClick: () => setOpen(false),
								"aria-label": "بستن",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1 p-3",
						"aria-label": "منوی مدیریت",
						children: ADMIN_NAV.map((item) => {
							const Icon = icons[item.icon] ?? LayoutDashboard;
							const active = item.to === "/admin" ? pathname === "/admin" : pathname === item.to || pathname.startsWith(`${item.to}/`);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setOpen(false),
								className: cn("flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-colors", active ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 border-t border-white/10 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "mb-2 block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/70 hover:text-white",
							children: "مشاهده سایت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/70 hover:text-white",
							onClick: () => void signOut("/"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "خروج"]
						})]
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "fixed inset-0 z-40 bg-navy-deep/50 md:hidden",
				"aria-label": "بستن منو",
				onClick: () => setOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-[var(--radius-sm)] border border-line md:hidden",
						onClick: () => setOpen(true),
						"aria-label": "منو",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-base font-semibold text-navy",
						children: title ?? "داشبورد"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 p-4 md:p-6",
					children
				})]
			})
		]
	});
}
function AdminLayout() {
	if (useRouterState({ select: (s) => s.location.pathname }) === "/admin/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAdmin, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) });
}
function RequireAdmin({ children }) {
	const { user, isPending } = useCurrentUserState();
	const [admin, setAdmin] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setAdmin(false);
			return;
		}
		checkIsAdmin().then((r) => setAdmin(r.admin)).catch(() => setAdmin(false));
	}, [user, isPending]);
	if (isPending || user && admin === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, { label: "در حال بررسی دسترسی…" });
	if (!user || !admin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { AdminLayout as component };
