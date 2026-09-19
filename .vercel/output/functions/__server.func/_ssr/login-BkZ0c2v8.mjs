import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as adminLoginSchema } from "./validation-BS2fXfa3.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { n as Input, r as Label, t as FieldError } from "./input-Crt41rXZ.mjs";
import { i as signOut, t as authClient } from "./client-DVkGLiL8.mjs";
import { i as noteAdminLoginResult, o as prepareAdminLogin, t as checkIsAdmin } from "./members-CAFPfs50.mjs";
import { t as AuthShell } from "./auth-shell-DkXiGNms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BkZ0c2v8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: u(adminLoginSchema),
		defaultValues: {
			username: "",
			password: ""
		}
	});
	async function onSubmit(values) {
		setError(null);
		setBusy(true);
		try {
			const { email } = await prepareAdminLogin({ data: { username: values.username } });
			const { error: err } = await authClient.signIn.email({
				email,
				password: values.password
			});
			if (err) {
				await noteAdminLoginResult({ data: {
					username: values.username,
					ok: false
				} });
				setError("نام کاربری یا رمز عبور صحیح نیست.");
				return;
			}
			const { admin } = await checkIsAdmin();
			if (!admin) {
				await signOut("/admin/login").catch(() => void 0);
				setError("نام کاربری یا رمز عبور صحیح نیست.");
				return;
			}
			await noteAdminLoginResult({ data: {
				username: values.username,
				ok: true
			} });
			await navigate({ to: "/admin" });
		} catch (e) {
			setError(e instanceof Error ? e.message : "نام کاربری یا رمز عبور صحیح نیست.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold text-white",
			children: "ورود مدیران"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-white/55",
			children: "دسترسی به پنل مدیریت هیأت"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 space-y-4",
			onSubmit: form.handleSubmit(onSubmit),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-white/80",
						children: "نام کاربری"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "username",
						...form.register("username")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.username?.message })
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
		})
	] });
}
//#endregion
export { AdminLogin as component };
