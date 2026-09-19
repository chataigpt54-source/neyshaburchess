import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as SITE_TAGLINE, s as SITE_NAME, u as STATUS_LABELS } from "./constants-B4oS1R5Q.mjs";
import { D as formatFaDate, T as Route$37 } from "./router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { C as ArrowLeft, d as Newspaper, o as Trophy } from "../_libs/lucide-react.mjs";
import { n as PublicLayout } from "./public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as Badge } from "./card-D-fweHyk.mjs";
import { t as TallyEmbed } from "./embed-DSnNLhEt.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BcMBi4AV.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const data = Route$37.useLoaderData();
	const settings = data.settings;
	const featured = data.tournaments;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		darkHero: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-paper py-16 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						kicker: "مسابقات",
						title: "مسابقات مهم",
						to: "/tournaments",
						link: "همه مسابقات"
					}), featured.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "در حال حاضر مسابقه‌ای برای نمایش وجود ندارد." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: featured.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TournamentCard, {
							tournament: t,
							index: i
						}, t.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-white py-16 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						kicker: "رسانه",
						title: "آخرین اخبار",
						to: "/news",
						link: "آرشیو اخبار"
					}), data.news.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "هنوز خبری منتشر نشده است." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 md:grid-cols-3",
						children: data.news.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/news/$slug",
							params: { slug: n.slug },
							className: "group overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lift",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[16/10] bg-navy/5",
								children: n.coverMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: mediaUrl(n.coverMediaId) ?? "",
									alt: "",
									className: "size-full object-cover",
									loading: "lazy"
								}) : null
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: formatFaDate(n.publishedAt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-semibold text-navy group-hover:text-turquoise-dark",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 line-clamp-2 text-sm text-muted",
										children: n.summary
									})
								]
							})]
						}, n.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative overflow-hidden bg-navy py-16 text-white md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.2em] text-gold",
							children: "هیأت"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-semibold",
							children: "معرفی هیأت"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-8 text-white/70",
							children: settings?.description || "مرجع رسمی اخبار، مسابقات و فعالیت‌های شطرنج شهرستان نیشابور"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/about",
							className: "mt-6 inline-flex items-center gap-2 text-sm text-turquoise hover:text-white",
							children: ["درباره هیأت", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "gold-hairline rounded-[var(--radius-xl)] bg-white/5 p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo.png",
							alt: "",
							className: "mx-auto size-40 rounded-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-center text-sm text-white/60",
							children: SITE_NAME
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-paper py-16 md:py-20",
				id: "suggestions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-4 text-center md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.2em] text-gold-dim",
							children: "ارتباط"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-semibold",
							children: "پیشنهادات و انتقادات"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-7 text-muted",
							children: "نظرات، پیشنهادات و انتقادات خود را با ما در میان بگذارید."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 text-right",
							children: settings?.tallySuggestionsUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TallyEmbed, {
								url: settings.tallySuggestionsUrl,
								title: "فرم پیشنهادات و انتقادات"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: "فرم به‌زودی فعال می‌شود.",
								description: "تا راه‌اندازی فرم، می‌توانید از طریق ایمیل با هیأت در ارتباط باشید.",
								action: settings?.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${settings.email}`,
									className: "text-sm text-turquoise-dark underline-offset-4 hover:underline",
									children: settings.email
								}) : null
							})
						})
					]
				})
			})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[88vh] overflow-hidden chess-board-bg text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "navy-veil geo-lattice absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-24 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .5 },
					className: "text-xs tracking-[0.28em] text-gold",
					children: "CHESS · NEYSHABUR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .05
					},
					className: "mt-4 max-w-3xl text-4xl font-semibold leading-[1.25] md:text-6xl",
					children: "هیأت شطرنج شهرستان نیشابور"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .12
					},
					className: "mt-5 max-w-xl text-base leading-8 text-white/70 md:text-lg",
					children: SITE_TAGLINE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						delay: .2
					},
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tournaments",
						className: "inline-flex h-12 items-center gap-2 rounded-[var(--radius-sm)] bg-turquoise px-6 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }), "مشاهده مسابقات"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/news",
						className: "inline-flex h-12 items-center gap-2 rounded-[var(--radius-sm)] border border-white/20 bg-white/5 px-6 text-sm font-medium hover:bg-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "size-4" }), "آخرین اخبار"]
					})]
				})
			]
		})]
	});
}
function SectionHead({ kicker, title, to, link }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.18em] text-gold-dim",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 text-2xl font-semibold md:text-3xl",
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: "hidden items-center gap-1 text-sm text-turquoise-dark sm:inline-flex",
			children: [link, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })]
		})]
	});
}
function TournamentCard({ tournament, index = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
		initial: {
			opacity: 0,
			y: 10
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			delay: Math.min(index, 8) * .04,
			duration: .4
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/tournaments/$slug",
			params: { slug: tournament.slug },
			className: "block h-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lift",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[16/10] bg-navy",
				children: [tournament.coverMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: mediaUrl(tournament.coverMediaId) ?? "",
					alt: "",
					className: "size-full object-cover",
					loading: "lazy"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "geo-lattice size-full opacity-80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "absolute right-3 top-3",
					tone: "gold",
					children: STATUS_LABELS[tournament.status]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold leading-6",
					children: tournament.title
				}), tournament.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: tournament.location
				}) : null]
			})]
		})
	});
}
//#endregion
export { Home as component };
