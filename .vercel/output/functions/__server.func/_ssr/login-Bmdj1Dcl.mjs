import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GROK_PROVIDERS } from "./server-lj9U9pTH.mjs";
import { r as memberLoginSchema } from "./validation-BS2fXfa3.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { n as Input, r as Label, t as FieldError } from "./input-Crt41rXZ.mjs";
import { r as signIn, t as authClient } from "./client-DVkGLiL8.mjs";
import { a as noteMemberLoginResult, s as prepareMemberLogin } from "./members-CAFPfs50.mjs";
import { t as AuthShell } from "./auth-shell-DkXiGNms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Bmdj1Dcl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: u(memberLoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});
	async function onSubmit(values) {
		setError(null);
		setBusy(true);
		try {
			await prepareMemberLogin({ data: { email: values.email } });
			const { error: err } = await authClient.signIn.email({
				email: values.email,
				password: values.password
			});
			await noteMemberLoginResult({ data: {
				email: values.email,
				ok: !err
			} });
			if (err) {
				setError("نام کاربری یا رمز عبور صحیح نیست.");
				return;
			}
			await navigate({ to: "/account" });
		} catch (e) {
			setError(e instanceof Error ? e.message : "ورود ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold text-white",
			children: "ورود به حساب"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-white/60",
			children: "ورود اعضای هیأت شطرنج نیشابور"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 space-y-4",
			onSubmit: form.handleSubmit(onSubmit),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-white/80",
						children: "ایمیل"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						autoComplete: "email",
						...form.register("email")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.email?.message })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-white/80",
						children: "رمز عبور"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "current-password",
						...form.register("password")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.password?.message })
				] }),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-red-300",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					disabled: busy,
					children: busy ? "در حال ورود…" : "ورود به حساب"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-white/40",
				children: "یا ورود با"
			}), GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void signIn(p.providerId, { callbackURL: "/account" }),
				className: "w-full rounded-[var(--radius-sm)] border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:bg-white/8",
				children: ["ورود با ", p.label === "Google" ? "گوگل" : "X"]
			}, p.providerId))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-sm text-white/60",
			children: [
				"حساب ندارید؟",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					className: "text-turquoise",
					children: "ثبت‌نام"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-center text-xs text-white/40",
			children: [
				"ورود مدیران:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/login",
					className: "text-gold",
					children: "پنل مدیریت"
				})
			]
		})
	] });
}
//#endregion
export { LoginPage as component };
