export const SITE_NAME = "هیأت شطرنج شهرستان نیشابور";
export const SITE_NAME_EN = "Neyshabur Chess Association";
export const SITE_TAGLINE =
  "مرجع رسمی اخبار، مسابقات و فعالیت‌های شطرنج شهرستان نیشابور";
export const SITE_EMAIL = "chesskhayam@gmail.com";
export const SITE_ADDRESS =
  "خراسان رضوی، نیشابور، خیابان فلسطین، درب ورودی هیأت فوتبال، طبقه دوم";
export const CONTACT_PHONES = [
  { name: "مهدی بوژمهرانی", phone: "09153528177" },
  { name: "مسعود مشایخان", phone: "09155516167" },
] as const;
export const CREDIT = "Design & Development by Mehrab Boozhmehrani";

export const ADMIN_EMAIL = "admin@chessneyshabur.ir";
export const ADMIN_USERNAME_DEFAULT = "Admin";

export const SOCIAL = {
  instagram: "https://www.instagram.com/chessneyshabur.official",
  eitaa: "https://eitaa.com/CHESSABARSHAHR",
  telegram: "https://t.me/Chesskhayyam",
} as const;

export const NAV_ITEMS = [
  { to: "/", label: "خانه" },
  { to: "/news", label: "اخبار" },
  { to: "/players", label: "بازیکنان" },
  { to: "/tournaments", label: "مسابقات" },
  { to: "/gallery", label: "گالری" },
  { to: "/about", label: "درباره هیأت" },
  { to: "/contact", label: "تماس با ما" },
] as const;

export const ADMIN_NAV = [
  { to: "/admin", label: "داشبورد", icon: "layout" },
  { to: "/admin/news", label: "اخبار", icon: "news" },
  { to: "/admin/players", label: "بازیکنان", icon: "users" },
  { to: "/admin/tournaments", label: "مسابقات", icon: "trophy" },
  { to: "/admin/registrations", label: "ثبت‌نام‌ها", icon: "clipboard" },
  { to: "/admin/gallery", label: "گالری", icon: "image" },
  { to: "/admin/pages", label: "صفحات", icon: "file" },
  { to: "/admin/media", label: "رسانه‌ها", icon: "folder" },
  { to: "/admin/settings", label: "تنظیمات", icon: "settings" },
] as const;

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_PDF_BYTES = 10 * 1024 * 1024;
export const IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp"] as const;
export const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"] as const;
export const PDF_MIME = "application/pdf";
export const PAGE_SIZE = 12;

export const STATUS_LABELS = {
  upcoming: "آینده",
  ongoing: "در حال برگزاری",
  finished: "برگزارشده",
  draft: "پیش‌نویس",
  published: "منتشرشده",
} as const;

export const THEME_COLOR = "#0B1F3A";
