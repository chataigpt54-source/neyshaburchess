import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, U as notFound, _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { r as getSql } from "./db-B81SbFjo.mjs";
import { F as object, M as literal, P as number, R as string, z as union } from "../_libs/@better-auth/core+[...].mjs";
import { i as auth } from "./server-lj9U9pTH.mjs";
import { c as SITE_TAGLINE, d as THEME_COLOR, s as SITE_NAME } from "./constants-B4oS1R5Q.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as authMiddleware } from "./middleware-BO4Pigeq.mjs";
import { c as settingsSchema, o as pageSchema } from "./validation-BS2fXfa3.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-Bz485CqS.js
var getSiteSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("df010008139345bbbf3a642bca453995b66a7131470b17d62583d04c404cdf3a"));
var getStaticPage = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("533008cb7a07ff6fe6dc32725c0bf3f86d79699570ad0d482cdc41904805429a"));
var listPublishedNews = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(createSsrRpc("0af27399689db4f09d0670e822fb5d7f5e0e5330717c704ca5d37e36b66c7b8e"));
var getNewsBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("c6839250d04321e17a8d9677bac26f79318c2d98046776f3e5077870263f5ba7"));
var listPlayers = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(createSsrRpc("ab0d81aab5538a51dd8cbe79382f1e2369270897d868c472be80735c9db85849"));
var getPlayerBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("3583408a7df54fcc0917acf1958922b5d2120f1093f3a9a04c0a0a6fcc903445"));
var listTournaments = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(createSsrRpc("7b82ab4766298bac9056352a9a402328744fd6e6ba43ccffd50089c748bce2cf"));
var getTournamentBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("945079eebc00bd5c4ae95f4daa0f8eb39771d6e8fe9021e66424e9ad6c6d82d7"));
var listGalleryAlbums = createServerFn({ method: "GET" }).handler(createSsrRpc("457bb8ae33e2361330b6b6217b7d219ecf1fce1c084e7c7175d900c8d9af38cc"));
var getGalleryAlbum = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("d763f68a1393b4fa4534cb3de7a867e0a607a3edf5f8d242d4f4898cfedddc5c"));
var getGalleryAlbumById = createServerFn({ method: "GET" }).validator((id) => id).handler(createSsrRpc("bc8f1f66dbe1a6f41347f220cb714331c975a7acf0038a29bcd7dae6046c266a"));
var getHomePayload = createServerFn({ method: "GET" }).handler(createSsrRpc("af9418ca9547c5d680a7e25a7246c265a2f3c4e027a105a9e73d5cff7dc9a681"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-y3mOHYgT.js
function seo(title, description) {
	return { meta: [
		{ title: !title || title === "هیأت شطرنج شهرستان نیشابور" ? SITE_NAME : `${title} | ${SITE_NAME}` },
		{
			name: "description",
			content: description || "مرجع رسمی اخبار، مسابقات و فعالیت‌های شطرنج شهرستان نیشابور"
		},
		{
			name: "theme-color",
			content: THEME_COLOR
		}
	] };
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C62riz4W.js
var getDashboardStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("193b6cc8d867206ce49c2eda627a292499c960fb8559ee2b2e83b338f59b93b7"));
var adminListNews = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((q) => q ?? "").handler(createSsrRpc("c7739256af8a48e9a0feceb53cd61e23635b3553dc5aaf9d25940223e97c462c"));
var adminGetNews = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("ac8a8283dfdbf86482b7f3f5e5f9a27d4e447e628891381f24a4ced8f73dd3a6"));
var adminSaveNews = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("448ab8245d9c794d493c6c654a64d780da4f9d4b4007227a056f52e422748e8b"));
var adminDeleteNews = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("30aaeaf9fec2ddb08a6d26e67cd9844623f9eac24f91d5f6cca55901cc3fbc81"));
var adminListPlayers = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((q) => q ?? "").handler(createSsrRpc("bc4c4971a54a0db85dd354f7a6d68eaace06cd4bd57a15381d1ad2067d5f2805"));
var adminGetPlayer = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("bddc67b8c37636a2cc4dd073203f9ba2e1198469e2234afb931e546fe20520d6"));
var adminSavePlayer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("408a8bebf88440e5eabba874518ea718c9d5adf5f986dfdd115d90465bf6af49"));
var adminDeletePlayer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("c1e65311aca1cf5dcdb22d65f55e0ff7b7f96363043a479558d22306676bed30"));
var adminListTournaments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8557f0f4ee9135b8442d2028d2146c387d28b8013bb8b8a5d617151b9969f4c5"));
var adminGetTournament = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("4e39e05dabe665a847edce610e0ef988a13e1d8d652c143abdc80f5c63409552"));
var adminSaveTournament = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("370e7cd5faf72dbcbf184fc92ef8a608f847598d48346ce227925ff84b7dd87f"));
var adminDeleteTournament = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("2ed0d976a4390483a8ab7f30ea21a74d6f1e58cc12044a55124c8e01a0053b94"));
var adminClearRulesPdf = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((tournamentId) => tournamentId).handler(createSsrRpc("8dd74e496f3ba8bbd1556dd65d27af70918136b74c7f2c2b9c33b553c139912c"));
var adminListAlbums = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d61ea2ba5233fd220dac180cdf4aa7952a9f37e0dfea78adad3e9c52023a77f1"));
var adminGetAlbum = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("1f4393c13155898dcae888a31d84372fb9f91e31e5a27afd7bf072689b9c817b"));
var adminSaveAlbum = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("d0e1d09040c45140dfa0ee0f3d454803081aa9250652731cb9706aa0f98d026f"));
var adminDeleteAlbum = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("f05dddf08f64ce6e4182c9765459f8e3970e7039dae626ae67ea153b52413c1c"));
var adminSavePage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => pageSchema.parse(input)).handler(createSsrRpc("d9401d5b8750aa12569f4d598b9fc3b9ddf66f332b20846e5e1961d74aa9b687"));
var adminSaveSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => settingsSchema.parse(input)).handler(createSsrRpc("90aaad9fad309c9fd012bfd7725612526582efce5576364230e9b4b4a83a37bd"));
var adminListRegistrations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("da08a48629628460cb11c513d47fa102436eb15713c7f2939af4c8aadd32c35c"));
var adminDeleteRegistration = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("ebddda2755a91cfc184df989e50eee01cb2387d0c8ea4e6ebb59c6d193a4659b"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("e255b120da1692002e244962a570423296a6712ffcb14a37dfc205f3dea73586"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/media-MH63f_AJ.js
var uploadMedia = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("7cf17c7d332408878ac256f53f198defbe4e981c8fba6c81cf3e98f14a9c68d3"));
var listMedia = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(createSsrRpc("e72c77b259a266ea88116a9b63fbfc1fd68676ec0f303f0519abb57f95eb4436"));
var deleteMedia = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("91dd3b62835eeb5ed114d32c1443d3320a27210476d6151c2e611a2aba04b71b"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/format-BEHafP7e.js
var persianDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
	year: "numeric",
	month: "long",
	day: "numeric"
});
new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
	year: "numeric",
	month: "short",
	day: "numeric"
});
function formatFaDate(value) {
	if (!value) return "";
	const d = typeof value === "string" ? new Date(value) : value;
	if (Number.isNaN(d.getTime())) return "";
	return persianDate.format(d);
}
function toFaDigits(input) {
	const map = "۰۱۲۳۴۵۶۷۸۹";
	return String(input).replace(/\d/g, (d) => map[Number(d)] ?? d);
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${toFaDigits(bytes)} بایت`;
	if (bytes < 1048576) return `${toFaDigits((bytes / 1024).toFixed(1))} کیلوبایت`;
	return `${toFaDigits((bytes / 1048576).toFixed(1))} مگابایت`;
}
function playerFullName(first, last) {
	return `${first} ${last}`.trim();
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cg9l_e87.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "خطایی رخ داد. لطفاً صفحه را دوباره بارگذاری کنید.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center text-white chess-board-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "navy-veil geo-lattice absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold",
					children: "اختلال در اجرای صفحه"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-md text-sm leading-7 text-white/70 break-words",
					children: errorMessage(error)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-8 inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-5 text-sm font-medium text-white",
					children: "بازگشت به صفحه اصلی"
				})
			]
		})]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-CZQTJdPl.css";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$38 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE_NAME },
			{
				name: "description",
				content: SITE_TAGLINE
			},
			{
				name: "theme-color",
				content: THEME_COLOR
			},
			{
				name: "apple-mobile-web-app-title",
				content: SITE_NAME
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
			},
			{
				rel: "canonical",
				href: "/"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa-IR",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-paper font-sans text-navy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-center",
					richColors: true,
					dir: "rtl",
					toastOptions: { className: "font-sans" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$32 = () => import("./routes-BcMBi4AV.mjs");
var Route$37 = createFileRoute("/")({
	loader: () => getHomePayload(),
	head: () => seo(SITE_NAME, SITE_TAGLINE),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./about-DlXumTEL.mjs");
var Route$36 = createFileRoute("/about")({
	loader: async () => {
		const [settings, page] = await Promise.all([getSiteSettings(), getStaticPage({ data: "about" })]);
		return {
			settings,
			page
		};
	},
	head: () => seo("درباره هیأت"),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./account-BP0uJOwR.mjs");
var Route$35 = createFileRoute("/account")({
	head: () => seo("پنل کاربری"),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./route-MzhG6I3m.mjs");
var Route$34 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
var $$splitComponentImporter$28 = () => import("./contact-n0G_yDEA.mjs");
var Route$33 = createFileRoute("/contact")({
	loader: async () => {
		const [settings, page] = await Promise.all([getSiteSettings(), getStaticPage({ data: "contact" })]);
		return {
			settings,
			page
		};
	},
	head: () => seo("تماس با ما"),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./login-Bmdj1Dcl.mjs");
var Route$32 = createFileRoute("/login")({
	head: () => seo("ورود"),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./register-BNMCiCul.mjs");
var Route$31 = createFileRoute("/register")({
	head: () => seo("ثبت‌نام"),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var Route$30 = createFileRoute("/robots.txt")({ server: { handlers: { GET: ({ request }) => {
	const body = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${new URL(request.url).origin}/sitemap.xml\n`;
	return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
} } } });
var Route$29 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	const origin = new URL(request.url).origin;
	const sql = await getSql();
	const [news, players, tournaments, albums] = await Promise.all([
		sql`select slug from news where status = 'published'`,
		sql`select slug from players`,
		sql`select slug from tournaments`,
		sql`select slug from gallery_albums`
	]);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
		"/",
		"/news",
		"/players",
		"/tournaments",
		"/gallery",
		"/about",
		"/contact",
		...news.map((r) => `/news/${r.slug}`),
		...players.map((r) => `/players/${r.slug}`),
		...tournaments.map((r) => `/tournaments/${r.slug}`),
		...albums.map((r) => `/gallery/${r.slug}`)
	].map((p) => `  <url><loc>${origin}${p}</loc></url>`).join("\n")}
</urlset>`;
	return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
} } } });
var $$splitComponentImporter$25 = () => import("./admin-DPP3FAYp.mjs");
var Route$28 = createFileRoute("/admin/")({
	loader: () => getDashboardStats(),
	head: () => seo("داشبورد مدیریت"),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./login-BkZ0c2v8.mjs");
var Route$27 = createFileRoute("/admin/login")({
	head: () => seo("ورود مدیریت"),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./media-Bid5IEOt.mjs");
var Route$26 = createFileRoute("/admin/media")({
	loader: () => listMedia({ data: { page: 1 } }),
	head: () => seo("رسانه‌ها"),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./pages-BR9MLb1A.mjs");
var Route$25 = createFileRoute("/admin/pages")({
	loader: async () => {
		const [about, contact] = await Promise.all([getStaticPage({ data: "about" }), getStaticPage({ data: "contact" })]);
		return {
			about,
			contact
		};
	},
	head: () => seo("صفحات"),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./registrations-BN12mAJv.mjs");
var Route$24 = createFileRoute("/admin/registrations")({
	loader: () => adminListRegistrations(),
	head: () => seo("ثبت‌نام‌ها"),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./settings-BmBwTJ0O.mjs");
var Route$23 = createFileRoute("/admin/settings")({
	loader: () => getSiteSettings(),
	head: () => seo("تنظیمات سایت"),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./gallery-_r_F7fhr.mjs");
var Route$22 = createFileRoute("/gallery/")({
	loader: async () => {
		const [settings, albums] = await Promise.all([getSiteSettings(), listGalleryAlbums()]);
		return {
			settings,
			albums
		};
	},
	head: () => seo("گالری"),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("../_slug-BhGuLwcX.mjs");
var Route$21 = createFileRoute("/gallery/$slug")({
	loader: async ({ params }) => {
		const [settings, album] = await Promise.all([getSiteSettings(), getGalleryAlbum({ data: params.slug })]);
		if (!album) throw notFound();
		return {
			settings,
			album
		};
	},
	head: ({ loaderData }) => seo(loaderData?.album.title),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./news-Dbt0D4ss.mjs");
var Route$20 = createFileRoute("/news/")({
	loader: async () => {
		const [settings, news] = await Promise.all([getSiteSettings(), listPublishedNews({ data: { page: 1 } })]);
		return {
			settings,
			news
		};
	},
	head: () => seo("اخبار"),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("../_slug-CCkEK9LL.mjs");
var Route$19 = createFileRoute("/news/$slug")({
	loader: async ({ params }) => {
		const [settings, item] = await Promise.all([getSiteSettings(), getNewsBySlug({ data: params.slug })]);
		if (!item) throw notFound();
		return {
			settings,
			item
		};
	},
	head: ({ loaderData }) => seo(loaderData?.item.title, loaderData?.item.summary),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./players-vCAxJZbP.mjs");
var Route$18 = createFileRoute("/players/")({
	loader: async () => {
		const [settings, players] = await Promise.all([getSiteSettings(), listPlayers({ data: { page: 1 } })]);
		return {
			settings,
			players
		};
	},
	head: () => seo("بازیکنان"),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("../_slug-lnEtP5XU.mjs");
var Route$17 = createFileRoute("/players/$slug")({
	loader: async ({ params }) => {
		const [settings, player] = await Promise.all([getSiteSettings(), getPlayerBySlug({ data: params.slug })]);
		if (!player) throw notFound();
		return {
			settings,
			player
		};
	},
	head: ({ loaderData }) => seo(playerFullName(loaderData?.player.firstName ?? "", loaderData?.player.lastName ?? "")),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./tournaments-DjHVv1O4.mjs");
var Route$16 = createFileRoute("/tournaments/")({
	loader: async () => {
		const [settings, tournaments] = await Promise.all([getSiteSettings(), listTournaments({ data: {} })]);
		return {
			settings,
			tournaments
		};
	},
	head: () => seo("مسابقات"),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("../_slug-DRUSvpoC.mjs");
var Route$15 = createFileRoute("/tournaments/$slug")({
	loader: async ({ params }) => {
		const [settings, tournament] = await Promise.all([getSiteSettings(), getTournamentBySlug({ data: params.slug })]);
		if (!tournament) throw notFound();
		return {
			settings,
			tournament,
			album: tournament.galleryId ? await getGalleryAlbumById({ data: tournament.galleryId }) : null
		};
	},
	head: ({ loaderData }) => seo(loaderData?.tournament.title),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./gallery-DFxGg4oY.mjs");
var Route$14 = createFileRoute("/admin/gallery/")({
	loader: () => adminListAlbums(),
	head: () => seo("مدیریت گالری"),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_id-B4yU6Iok.mjs");
var Route$13 = createFileRoute("/admin/gallery/$id")({
	loader: async ({ params }) => {
		const item = await adminGetAlbum({ data: Number(params.id) });
		if (!item) throw notFound();
		return item;
	},
	head: () => seo("ویرایش گالری"),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./new-DlNrUz-B.mjs");
var Route$12 = createFileRoute("/admin/gallery/new")({
	head: () => seo("افزودن گالری"),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./news-BA2U4sPI.mjs");
var Route$11 = createFileRoute("/admin/news/")({
	loader: () => adminListNews({ data: "" }),
	head: () => seo("مدیریت اخبار"),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_id-Cxbc5pi5.mjs");
var Route$10 = createFileRoute("/admin/news/$id")({
	loader: async ({ params }) => {
		const item = await adminGetNews({ data: Number(params.id) });
		if (!item) throw notFound();
		return item;
	},
	head: () => seo("ویرایش خبر"),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./new-CtqqHRMR.mjs");
var Route$9 = createFileRoute("/admin/news/new")({
	head: () => seo("افزودن خبر"),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./players-CYjMjLzb.mjs");
var Route$8 = createFileRoute("/admin/players/")({
	loader: () => adminListPlayers({ data: "" }),
	head: () => seo("مدیریت بازیکنان"),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_id-C6pGdAWK.mjs");
var Route$7 = createFileRoute("/admin/players/$id")({
	loader: async ({ params }) => {
		const item = await adminGetPlayer({ data: Number(params.id) });
		if (!item) throw notFound();
		return item;
	},
	head: () => seo("ویرایش بازیکن"),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./new-BXHjXad_.mjs");
var Route$6 = createFileRoute("/admin/players/new")({
	head: () => seo("افزودن بازیکن"),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./tournaments-DM0wpfgr.mjs");
var Route$5 = createFileRoute("/admin/tournaments/")({
	loader: () => adminListTournaments(),
	head: () => seo("مدیریت مسابقات"),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_id-YooEfxUY.mjs");
var Route$4 = createFileRoute("/admin/tournaments/$id")({
	loader: async ({ params }) => {
		const item = await adminGetTournament({ data: Number(params.id) });
		if (!item) throw notFound();
		return item;
	},
	head: () => seo("ویرایش مسابقه"),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./new-DerGPboH.mjs");
var Route$3 = createFileRoute("/admin/tournaments/new")({
	head: () => seo("افزودن مسابقه"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$2 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var Route$1 = createFileRoute("/api/media/$id")({ server: { handlers: { GET: async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isFinite(id)) return new Response("Not found", { status: 404 });
	const row = (await (await getSql())`
          select mime_type, data, filename, kind from media where id = ${id} limit 1
        `)[0];
	if (!row) return new Response("Not found", { status: 404 });
	const buf = Buffer.from(row.data, "base64");
	const headers = new Headers({
		"content-type": row.mime_type,
		"content-length": String(buf.byteLength),
		"cache-control": "public, max-age=31536000, immutable",
		"content-disposition": row.kind === "pdf" ? `inline; filename*=UTF-8''${encodeURIComponent(row.filename)}` : "inline"
	});
	return new Response(buf, {
		status: 200,
		headers
	});
} } } });
var Route = createFileRoute("/api/tally/webhook")({ server: { handlers: { POST: async ({ request }) => {
	const url = new URL(request.url);
	const tournamentId = Number(url.searchParams.get("tournamentId") || "");
	let body = {};
	try {
		body = await request.json();
	} catch {
		body = {};
	}
	if (!Number.isFinite(tournamentId)) return Response.json({
		ok: false,
		error: "tournamentId required"
	}, { status: 400 });
	const fields = body.data ?? body;
	await (await getSql())`
          insert into tournament_registrations (tournament_id, full_name, email, phone, fide_id, payload, source)
          values (
            ${tournamentId},
            ${String(fields.fullName ?? fields.name ?? "") || null},
            ${String(fields.email ?? "") || null},
            ${String(fields.phone ?? "") || null},
            ${String(fields.fideId ?? fields.fide_id ?? "") || null},
            ${JSON.stringify(body)}::jsonb,
            'tally'
          )
        `;
	return Response.json({ ok: true });
} } } });
var IndexRoute = Route$37.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$38
});
var AboutRoute = Route$36.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$38
});
var AccountRoute = Route$35.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$38
});
var AdminRouteRoute = Route$34.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$38
});
var ContactRoute = Route$33.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$38
});
var LoginRoute = Route$32.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$38
});
var RegisterRoute = Route$31.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$38
});
var RobotsDottxtRoute = Route$30.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$38
});
var SitemapDotxmlRoute = Route$29.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$38
});
var AdminIndexRoute = Route$28.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRouteRoute
});
var AdminLoginRoute = Route$27.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRouteRoute
});
var AdminMediaRoute = Route$26.update({
	id: "/media",
	path: "/media",
	getParentRoute: () => AdminRouteRoute
});
var AdminPagesRoute = Route$25.update({
	id: "/pages",
	path: "/pages",
	getParentRoute: () => AdminRouteRoute
});
var AdminRegistrationsRoute = Route$24.update({
	id: "/registrations",
	path: "/registrations",
	getParentRoute: () => AdminRouteRoute
});
var AdminSettingsRoute = Route$23.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRouteRoute
});
var GalleryIndexRoute = Route$22.update({
	id: "/gallery/",
	path: "/gallery/",
	getParentRoute: () => Route$38
});
var GallerySlugRoute = Route$21.update({
	id: "/gallery/$slug",
	path: "/gallery/$slug",
	getParentRoute: () => Route$38
});
var NewsIndexRoute = Route$20.update({
	id: "/news/",
	path: "/news/",
	getParentRoute: () => Route$38
});
var NewsSlugRoute = Route$19.update({
	id: "/news/$slug",
	path: "/news/$slug",
	getParentRoute: () => Route$38
});
var PlayersIndexRoute = Route$18.update({
	id: "/players/",
	path: "/players/",
	getParentRoute: () => Route$38
});
var PlayersSlugRoute = Route$17.update({
	id: "/players/$slug",
	path: "/players/$slug",
	getParentRoute: () => Route$38
});
var TournamentsIndexRoute = Route$16.update({
	id: "/tournaments/",
	path: "/tournaments/",
	getParentRoute: () => Route$38
});
var TournamentsSlugRoute = Route$15.update({
	id: "/tournaments/$slug",
	path: "/tournaments/$slug",
	getParentRoute: () => Route$38
});
var AdminGalleryIndexRoute = Route$14.update({
	id: "/gallery/",
	path: "/gallery/",
	getParentRoute: () => AdminRouteRoute
});
var AdminGalleryIdRoute = Route$13.update({
	id: "/gallery/$id",
	path: "/gallery/$id",
	getParentRoute: () => AdminRouteRoute
});
var AdminGalleryNewRoute = Route$12.update({
	id: "/gallery/new",
	path: "/gallery/new",
	getParentRoute: () => AdminRouteRoute
});
var AdminNewsIndexRoute = Route$11.update({
	id: "/news/",
	path: "/news/",
	getParentRoute: () => AdminRouteRoute
});
var AdminNewsIdRoute = Route$10.update({
	id: "/news/$id",
	path: "/news/$id",
	getParentRoute: () => AdminRouteRoute
});
var AdminNewsNewRoute = Route$9.update({
	id: "/news/new",
	path: "/news/new",
	getParentRoute: () => AdminRouteRoute
});
var AdminPlayersIndexRoute = Route$8.update({
	id: "/players/",
	path: "/players/",
	getParentRoute: () => AdminRouteRoute
});
var AdminPlayersIdRoute = Route$7.update({
	id: "/players/$id",
	path: "/players/$id",
	getParentRoute: () => AdminRouteRoute
});
var AdminPlayersNewRoute = Route$6.update({
	id: "/players/new",
	path: "/players/new",
	getParentRoute: () => AdminRouteRoute
});
var AdminTournamentsIndexRoute = Route$5.update({
	id: "/tournaments/",
	path: "/tournaments/",
	getParentRoute: () => AdminRouteRoute
});
var AdminTournamentsIdRoute = Route$4.update({
	id: "/tournaments/$id",
	path: "/tournaments/$id",
	getParentRoute: () => AdminRouteRoute
});
var AdminTournamentsNewRoute = Route$3.update({
	id: "/tournaments/new",
	path: "/tournaments/new",
	getParentRoute: () => AdminRouteRoute
});
var ApiAuthSplatRoute = Route$2.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$38
});
var ApiMediaIdRoute = Route$1.update({
	id: "/api/media/$id",
	path: "/api/media/$id",
	getParentRoute: () => Route$38
});
var ApiTallyWebhookRoute = Route.update({
	id: "/api/tally/webhook",
	path: "/api/tally/webhook",
	getParentRoute: () => Route$38
});
var AdminRouteRouteChildren = {
	AdminLoginRoute,
	AdminMediaRoute,
	AdminPagesRoute,
	AdminRegistrationsRoute,
	AdminSettingsRoute,
	AdminIndexRoute,
	AdminGalleryIdRoute,
	AdminGalleryNewRoute,
	AdminNewsIdRoute,
	AdminNewsNewRoute,
	AdminPlayersIdRoute,
	AdminPlayersNewRoute,
	AdminTournamentsIdRoute,
	AdminTournamentsNewRoute,
	AdminGalleryIndexRoute,
	AdminNewsIndexRoute,
	AdminPlayersIndexRoute,
	AdminTournamentsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRouteRoute: AdminRouteRoute._addFileChildren(AdminRouteRouteChildren),
	AboutRoute,
	AccountRoute,
	ContactRoute,
	LoginRoute,
	RegisterRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	GallerySlugRoute,
	NewsSlugRoute,
	PlayersSlugRoute,
	TournamentsSlugRoute,
	GalleryIndexRoute,
	NewsIndexRoute,
	PlayersIndexRoute,
	TournamentsIndexRoute,
	ApiAuthSplatRoute,
	ApiMediaIdRoute,
	ApiTallyWebhookRoute
};
var routeTree = Route$38._addFileChildren(rootRouteChildren)._addFileTypes();
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center text-white chess-board-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "navy-veil absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-[0.2em] text-gold",
					children: "۴۰۴"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl font-semibold",
					children: "این صفحه در صفحه شطرنج پیدا نشد!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-md text-sm leading-7 text-white/65",
					children: "نشانی واردشده وجود ندارد یا منتقل شده است."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-8 inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-5 text-sm font-medium",
					children: "بازگشت به صفحه اصلی"
				})
			]
		})]
	});
}
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFoundPage
	});
}
//#endregion
export { deleteMedia as A, adminListNews as B, Route$33 as C, formatFaDate as D, formatBytes as E, adminDeleteNews as F, adminSaveNews as G, adminListRegistrations as H, adminDeletePlayer as I, adminSaveSettings as J, adminSavePage as K, adminDeleteRegistration as L, uploadMedia as M, adminClearRulesPdf as N, playerFullName as O, adminDeleteAlbum as P, listPublishedNews as Q, adminDeleteTournament as R, Route$28 as S, Route$37 as T, adminListTournaments as U, adminListPlayers as V, adminSaveAlbum as W, getSiteSettings as X, adminSaveTournament as Y, listPlayers as Z, Route$22 as _, Route$8 as a, Route$25 as b, Route$13 as c, Route$16 as d, Route$17 as f, Route$21 as g, Route$20 as h, Route$7 as i, listMedia as j, toFaDigits as k, Route$14 as l, Route$19 as m, Route$4 as n, Route$10 as o, Route$18 as p, adminSavePlayer as q, Route$5 as r, Route$11 as s, router_exports as t, Route$15 as u, Route$23 as v, Route$36 as w, Route$26 as x, Route$24 as y, adminListAlbums as z };
