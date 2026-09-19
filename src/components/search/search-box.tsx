import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBox({
  value,
  onChange,
  placeholder = "جستجو…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="relative block max-w-md">
      <span className="sr-only">{placeholder}</span>
      <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
    </label>
  );
}
