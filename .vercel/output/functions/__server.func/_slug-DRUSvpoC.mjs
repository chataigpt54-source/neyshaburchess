import { o as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { u as STATUS_LABELS } from "./_ssr/constants-B4oS1R5Q.mjs";
import { D as formatFaDate, u as Route$15 } from "./_ssr/router-Cg9l_e87.mjs";
import { i as mediaUrl, r as externalRel } from "./_ssr/utils-Bj1GyghM.mjs";
import { o as Trophy, y as FileText } from "./_libs/lucide-react.mjs";
import { n as PublicLayout } from "./_ssr/public-layout-CHys6LrO.mjs";
import { t as Lightbox } from "./_ssr/lightbox-CWttBcRz.mjs";
import { t as renderRichText } from "./_ssr/sanitize-D7X0UZXw.mjs";
import { t as Badge } from "./_ssr/card-D-fweHyk.mjs";
import { t as TallyEmbed } from "./_ssr/embed-DSnNLhEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DRUSvpoC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TournamentDetail() {
	const { settings, tournament, album } = Route$15.useLoaderData();
	const [open, setOpen] = (0, import_react.useState)(null);
	const dates = [formatFaDate(tournament.startDate), formatFaDate(tournament.endDate)].filter(Boolean).join(" تا ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-navy chess-board-bg text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "navy-veil geo-lattice absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "gold",
						children: STATUS_LABELS[tournament.status]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-3xl font-semibold md:text-5xl",
						children: tournament.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70",
						children: [dates ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dates }) : null, tournament.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tournament.location }) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							tournament.tallyUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#register",
								className: "inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-5 text-sm font-medium",
								children: "ثبت‌نام در مسابقه"
							}) : null,
							tournament.chessResultsUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: tournament.chessResultsUrl,
								...externalRel(),
								className: "inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-white/20 px-5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }), "مشاهده نتایج"]
							}) : null,
							tournament.rulesMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: mediaUrl(tournament.rulesMediaId) ?? "#",
								...externalRel(),
								className: "inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-white/20 px-5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "مشاهده آیین‌نامه"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: mediaUrl(tournament.rulesMediaId) ?? "#",
								download: true,
								className: "inline-flex h-11 items-center rounded-[var(--radius-sm)] px-5 text-sm text-gold",
								children: "دانلود آیین‌نامه"
							})] }) : null
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 py-12 md:px-6",
			children: [
				tournament.coverMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: mediaUrl(tournament.coverMediaId) ?? "",
					alt: "",
					className: "mb-8 w-full rounded-[var(--radius-lg)] object-cover"
				}) : null,
				tournament.description.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose-fa",
					dangerouslySetInnerHTML: { __html: renderRichText(tournament.description) }
				}) : null,
				tournament.tallyUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "register",
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xl font-semibold",
						children: "ثبت‌نام مسابقه"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TallyEmbed, {
						url: tournament.tallyUrl,
						title: `ثبت‌نام ${tournament.title}`
					})]
				}) : null,
				album?.images?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-xl font-semibold",
							children: "گالری مسابقه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3",
							children: album.images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpen(i),
								className: "overflow-hidden rounded-[var(--radius-md)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: mediaUrl(img.mediaId) ?? "",
									alt: "",
									className: "aspect-square w-full object-cover"
								})
							}, img.id))
						}),
						open != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
							images: album.images,
							index: open,
							onIndex: setOpen,
							onClose: () => setOpen(null)
						}) : null
					]
				}) : null
			]
		})]
	});
}
//#endregion
export { TournamentDetail as component };
