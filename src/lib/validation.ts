import { z } from "zod";

const phoneRe = /^0\d{10}$/;

export const memberRegisterSchema = z
  .object({
    firstName: z.string().trim().min(2, "نام را وارد کنید."),
    lastName: z.string().trim().min(2, "نام خانوادگی را وارد کنید."),
    email: z.string().trim().email("ایمیل معتبر نیست."),
    phone: z
      .string()
      .trim()
      .min(1, "شماره تلفن را وارد کنید.")
      .regex(phoneRe, "شماره تلفن باید ۱۱ رقم و با صفر شروع شود."),
    password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر باشد."),
    confirmPassword: z.string().min(8, "تکرار رمز عبور را وارد کنید."),
    fideId: z.string().trim().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیست.",
    path: ["confirmPassword"],
  });

export const memberLoginSchema = z.object({
  email: z.string().trim().email("ایمیل معتبر نیست."),
  password: z.string().min(1, "رمز عبور را وارد کنید."),
});

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "نام کاربری را وارد کنید."),
  password: z.string().min(1, "رمز عبور را وارد کنید."),
});

export const newsSchema = z.object({
  title: z.string().trim().min(2, "عنوان را وارد کنید."),
  slug: z.string().trim().optional(),
  summary: z.string().trim().max(500, "خلاصه حداکثر ۵۰۰ کاراکتر است.").optional(),
  content: z.string().optional(),
  coverMediaId: z.number().int().nullable().optional(),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().optional(),
});

export const playerSchema = z.object({
  firstName: z.string().trim().min(1, "نام را وارد کنید."),
  lastName: z.string().trim().min(1, "نام خانوادگی را وارد کنید."),
  slug: z.string().trim().optional(),
  fideId: z.string().trim().optional(),
  bio: z.string().optional(),
  photoMediaId: z.number().int().nullable().optional(),
  achievements: z
    .array(
      z.object({
        title: z.string().trim().min(1, "عنوان افتخار را وارد کنید."),
        year: z.string().trim().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
});

export const tournamentSchema = z.object({
  title: z.string().trim().min(2, "عنوان را وارد کنید."),
  slug: z.string().trim().optional(),
  description: z.string().optional(),
  coverMediaId: z.number().int().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  location: z.string().optional(),
  status: z.enum(["upcoming", "ongoing", "finished"]),
  tallyUrl: z.string().trim().url("نشانی فرم معتبر نیست.").optional().or(z.literal("")),
  chessResultsUrl: z.string().trim().url("نشانی نتایج معتبر نیست.").optional().or(z.literal("")),
  rulesMediaId: z.number().int().nullable().optional(),
  galleryId: z.number().int().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

export const albumSchema = z.object({
  title: z.string().trim().min(2, "عنوان گالری را وارد کنید."),
  description: z.string().optional(),
  albumDate: z.string().nullable().optional(),
  coverMediaId: z.number().int().nullable().optional(),
});

export const settingsSchema = z.object({
  siteTitle: z.string().trim().min(2),
  description: z.string().optional(),
  email: z.string().trim().email("ایمیل معتبر نیست."),
  phone: z.string().optional(),
  address: z.string().trim().min(2, "آدرس را وارد کنید."),
  instagramUrl: z.string().optional(),
  eitaaUrl: z.string().optional(),
  telegramUrl: z.string().optional(),
  tallySuggestionsUrl: z.string().optional(),
  mapEmbedUrl: z.string().optional(),
});

export const pageSchema = z.object({
  slug: z.enum(["about", "contact"]),
  title: z.string().trim().min(1),
  content: z.string().optional(),
});

export type MemberRegisterInput = z.infer<typeof memberRegisterSchema>;
