import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as Route$10 } from "./_ssr/router-Cg9l_e87.mjs";
import { t as NewsEditor } from "./_ssr/news-editor-BwHunfw3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-Cxbc5pi5.js
var import_jsx_runtime = require_jsx_runtime();
function EditNews() {
	const item = Route$10.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsEditor, { initial: item });
}
//#endregion
export { EditNews as component };
