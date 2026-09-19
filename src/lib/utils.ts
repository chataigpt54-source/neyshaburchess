import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mediaUrl(id: number | null | undefined): string | null {
  if (!id) return null;
  return `/api/media/${id}`;
}

export function externalRel(): { target: "_blank"; rel: "noopener noreferrer" } {
  return { target: "_blank", rel: "noopener noreferrer" };
}

export function clampFileName(name: string, max = 120): string {
  const trimmed = name.trim() || "file";
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `tel:+98${digits.slice(1)}`;
  if (digits.startsWith("98")) return `tel:+${digits}`;
  return `tel:${digits}`;
}
