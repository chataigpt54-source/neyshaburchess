import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as SOCIAL, n as CONTACT_PHONES } from "./constants-B4oS1R5Q.mjs";
import { C as Route$33 } from "./router-Cg9l_e87.mjs";
import { a as telHref, r as externalRel } from "./utils-Bj1GyghM.mjs";
import { m as Mail, p as MapPin, s as Share2, u as Phone } from "../_libs/lucide-react.mjs";
import { n as PublicLayout, t as PageBand } from "./public-layout-CHys6LrO.mjs";
import { t as renderRichText } from "./sanitize-D7X0UZXw.mjs";
import { t as TallyEmbed } from "./embed-DSnNLhEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-n0G_yDEA.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { settings, page } = Route$33.useLoaderData();
	const instagram = settings?.instagramUrl || SOCIAL.instagram;
	const eitaa = settings?.eitaaUrl || SOCIAL.eitaa;
	const telegram = settings?.telegramUrl || SOCIAL.telegram;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, {
				title: "تماس با ما",
				subtitle: "راه‌های ارتباط با هیأت شطرنج شهرستان نیشابور"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5" }),
						title: "نشانی",
						body: settings?.address
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5" }),
						title: "ایمیل",
						body: settings?.email,
						href: settings?.email ? `mailto:${settings.email}` : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-5" }),
						title: "تلفن",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-3 text-sm leading-7 text-muted",
							children: CONTACT_PHONES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-navy",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: telHref(c.phone),
								className: "hover:text-turquoise-dark",
								dir: "ltr",
								children: c.phone
							})] }, c.phone))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-5" }),
						title: "شبکه‌های اجتماعی",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: instagram,
									...externalRel(),
									children: "اینستاگرام"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: eitaa,
									...externalRel(),
									children: "ایتا"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: telegram,
									...externalRel(),
									children: "تلگرام"
								})
							]
						})
					})
				]
			}),
			settings?.mapEmbedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-4 pb-8 md:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "نقشه",
					src: settings.mapEmbedUrl,
					className: "h-80 w-full rounded-[var(--radius-lg)] border border-line",
					loading: "lazy"
				})
			}) : null,
			page?.content?.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-3xl px-4 pb-8 md:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose-fa",
					dangerouslySetInnerHTML: { __html: renderRichText(page.content) }
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-3xl px-4 pb-16 md:px-6",
				id: "suggestions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-2xl font-semibold",
						children: "پیشنهادات و انتقادات"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 text-sm text-muted",
						children: "نظرات، پیشنهادات و انتقادات خود را با ما در میان بگذارید."
					}),
					settings?.tallySuggestionsUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TallyEmbed, {
						url: settings.tallySuggestionsUrl,
						title: "فرم پیشنهادات"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-[var(--radius-lg)] border border-dashed border-line bg-white p-8 text-sm text-muted",
						children: [
							"فرم هنوز تنظیم نشده است. از ایمیل ",
							settings?.email,
							" استفاده کنید."
						]
					})
				]
			})
		]
	});
}
function Info({ icon, title, body, href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-turquoise",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: title
			}),
			children ?? (href && body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				className: "mt-2 block text-sm leading-7 text-muted",
				children: body
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: body || "—"
			}))
		]
	});
}
//#endregion
export { ContactPage as component };
