export function TallyEmbed({ url, title }: { url: string; title: string }) {
  const src = toEmbed(url);
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white">
      <iframe
        src={src}
        title={title}
        className="min-h-[28rem] w-full"
        loading="lazy"
      />
    </div>
  );
}

function toEmbed(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("tally.so") && !u.pathname.includes("/embed/")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://tally.so/embed/${id}?alignLeft=1&hideTitle=1&transparentBackground=1`;
    }
    return url;
  } catch {
    return url;
  }
}
