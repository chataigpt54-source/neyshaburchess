import { SITE_NAME, SITE_TAGLINE, THEME_COLOR } from "@/lib/constants";

export function seo(title?: string, description?: string) {
  const full = !title || title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description || SITE_TAGLINE },
      { name: "theme-color", content: THEME_COLOR },
    ],
  };
}
