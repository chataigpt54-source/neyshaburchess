//#region node_modules/.nitro/vite/services/ssr/assets/sanitize-D7X0UZXw.js
function escapeHtml(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
/** Minimal, safe markdown → HTML for admin-authored pages. */
function renderRichText(source) {
	return escapeHtml(source ?? "").replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h2>$1</h2>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/_(.+?)_/g, "<em>$1</em>").replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noopener noreferrer\">$1</a>").replace(/^• (.+)$/gm, "<li>$1</li>").replace(/^- (.+)$/gm, "<li>$1</li>").replace(/(?:<li>.*<\/li>\n?)+/g, (block) => `<ul>${block}</ul>`).split(/\n{2,}/).map((part) => {
		const t = part.trim();
		if (!t) return "";
		if (t.startsWith("<h") || t.startsWith("<ul")) return t;
		return `<p>${t.replace(/\n/g, "<br />")}</p>`;
	}).join("");
}
//#endregion
export { renderRichText as t };
