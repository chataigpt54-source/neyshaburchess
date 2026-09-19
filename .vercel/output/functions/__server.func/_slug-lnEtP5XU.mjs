import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { O as playerFullName, f as Route$17 } from "./_ssr/router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./_ssr/utils-Bj1GyghM.mjs";
import { n as PublicLayout } from "./_ssr/public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./_ssr/empty-state-x6VxJp7W.mjs";
import { t as renderRichText } from "./_ssr/sanitize-D7X0UZXw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-lnEtP5XU.js
var import_jsx_runtime = require_jsx_runtime();
function PlayerDetail() {
	const { settings, player } = Route$17.useLoaderData();
	const name = playerFullName(player.firstName, player.lastName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bg-navy chess-board-bg text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "navy-veil geo-lattice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[280px_1fr] md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/5",
					children: player.photoMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mediaUrl(player.photoMediaId) ?? "",
						alt: name,
						className: "w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid aspect-square place-items-center text-6xl text-white/20",
						children: player.firstName[0]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.2em] text-gold",
						children: "بازیکن"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-4xl font-semibold",
						children: name
					}),
					player.fideId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-white/70",
						children: ["آیدی فیده: ", player.fideId]
					}) : null
				] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-xl font-semibold",
					children: "بیوگرافی"
				}), player.bio.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose-fa",
					dangerouslySetInnerHTML: { __html: renderRichText(player.bio) }
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "بیوگرافی هنوز ثبت نشده است."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-xl font-semibold",
				children: "افتخارات"
			}), player.achievements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "افتخاری ثبت نشده است.",
				className: "py-10"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: player.achievements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[var(--radius-md)] border border-line bg-white p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: a.title
						}),
						a.year ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: a.year
						}) : null,
						a.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: a.description
						}) : null
					]
				}, a.id))
			})] })]
		})]
	});
}
//#endregion
export { PlayerDetail as component };
