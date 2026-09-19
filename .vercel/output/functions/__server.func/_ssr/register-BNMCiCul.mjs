import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as memberRegisterSchema } from "./validation-BS2fXfa3.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { n as Input, r as Label, t as FieldError } from "./input-Crt41rXZ.mjs";
import { t as authClient } from "./client-DVkGLiL8.mjs";
import { n as completeMemberProfile } from "./members-CAFPfs50.mjs";
import { t as AuthShell } from "./auth-shell-DkXiGNms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BNMCiCul.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterPage() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: u(memberRegisterSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
			fideId: ""
		}
	});
	async function onSubmit(values) {
		setError(null);
		setBusy(true);
		try {
			const { error: err } = await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: `${values.firstName} ${values.lastName}`
			});
			if (err) {
				setError(err.message === "User already exists" ? "این ایمیل قبلاً ثبت شده است." : "ثبت‌نام ناموفق بود.");
				return;
			}
			await completeMemberProfile({ data: {
				firstName: values.firstName,
				lastName: values.lastName,
				phone: values.phone,
				fideId: values.fideId
			} });
			await navigate({ to: "/account" });
		} catch (e) {
			setError(e instanceof Error ? e.message : "ثبت‌نام ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold text-white",
			children: "ثبت‌نام"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-6 grid gap-4",
			onSubmit: form.handleSubmit(onSubmit),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-white/80",
							children: "نام"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("firstName") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.firstName?.message })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-white/80",
							children: "نام خانوادگی"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("lastName") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.lastName?.message })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-white/80",
						children: "ایمیل"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						...form.register("email")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.email?.message })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-white/80",
						children: "شماره تلفن"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						inputMode: "numeric",
						...form.register("phone"),
						placeholder: "09xxxxxxxxx"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.phone?.message })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-white/80",
					children: "آیدی فیده (در صورت داشتن)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...form.register("fideId") })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-white/80",
						children: "رمز عبور"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						...form.register("password")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.password?.message })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-white/80",
						children: "تکرار رمز عبور"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						...form.register("confirmPassword")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: form.formState.errors.confirmPassword?.message })
				] }),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-red-300",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					disabled: busy,
					children: busy ? "در حال ثبت‌نام…" : "ایجاد حساب"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-sm text-white/60",
			children: [
				"قبلاً ثبت‌نام کرده‌اید؟",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "text-turquoise",
					children: "ورود"
				})
			]
		})
	] });
}
//#endregion
export { RegisterPage as component };
