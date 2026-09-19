import { o as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as formatFaDate, g as Route$21 } from "./_ssr/router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./_ssr/utils-Bj1GyghM.mjs";
import { n as PublicLayout, t as PageBand } from "./_ssr/public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./_ssr/empty-state-x6VxJp7W.mjs";
import { t as Lightbox } from "./_ssr/lightbox-CWttBcRz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BhGuLwcX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AlbumPage() {
	const { settings, album } = Route$21.useLoaderData();
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, {
				title: album.title,
				subtitle: formatFaDate(album.albumDate) || album.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
				children: album.images.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "هنوز تصویری در این گالری نیست." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-3",
					children: album.images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(i),
						className: "overflow-hidden rounded-[var(--radius-md)] bg-navy/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: mediaUrl(img.mediaId) ?? "",
							alt: img.caption || album.title,
							className: "aspect-square w-full object-cover",
							loading: "lazy"
						})
					}, img.id))
				})
			}),
			open != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
				images: album.images,
				index: open,
				onClose: () => setOpen(null),
				onIndex: setOpen
			}) : null
		]
	});
}
//#endregion
export { AlbumPage as component };
