const persianDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const persianDateShort = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatFaDate(value: string | Date | null | undefined): string {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "";
  return persianDate.format(d);
}

export function formatFaDateShort(value: string | Date | null | undefined): string {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "";
  return persianDateShort.format(d);
}

export function toFaDigits(input: string | number): string {
  const map = "۰۱۲۳۴۵۶۷۸۹";
  return String(input).replace(/\d/g, (d) => map[Number(d)] ?? d);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${toFaDigits(bytes)} بایت`;
  if (bytes < 1024 * 1024) return `${toFaDigits((bytes / 1024).toFixed(1))} کیلوبایت`;
  return `${toFaDigits((bytes / (1024 * 1024)).toFixed(1))} مگابایت`;
}

export function playerFullName(first: string, last: string): string {
  return `${first} ${last}`.trim();
}
