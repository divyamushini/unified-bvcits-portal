import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SEARCH_INDEX } from "@/lib/campus-data";

const CATEGORY_ORDER = [
  "Departments",
  "Faculty",
  "Courses",
  "Notices",
  "Events",
  "Companies",
  "Services",
  "Documents",
];

export function GlobalSearch({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const grouped = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: SEARCH_INDEX.filter((item) => item.category === category),
    })).filter((group) => group.items.length > 0);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open global search"
        className={
          variant === "dark"
            ? "flex h-10 w-full items-center gap-2 rounded-full border border-navy-foreground/20 bg-navy-foreground/10 px-4 text-sm text-navy-foreground/70 transition-colors hover:border-gold/50 hover:text-navy-foreground md:w-64"
            : "flex h-10 w-full items-center gap-2 rounded-full border border-border bg-secondary px-4 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-foreground md:w-64"
        }
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="truncate">Search campus…</span>
        <kbd className="ml-auto hidden rounded border border-current/30 px-1.5 py-0.5 text-[10px] font-medium tracking-wide md:inline">
          /
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search departments, faculty, courses, notices, companies, documents…" />
        <CommandList>
          <CommandEmpty>No matches found. Try a department, notice or company name.</CommandEmpty>
          {grouped.map((group) => (
            <CommandGroup key={group.category} heading={group.category}>
              {group.items.map((item) => (
                <CommandItem
                  key={`${group.category}-${item.title}`}
                  value={`${item.title} ${item.hint ?? ""} ${group.category}`}
                  onSelect={() => {
                    setOpen(false);
                    navigate({ to: item.to });
                  }}
                >
                  <span className="truncate">{item.title}</span>
                  {item.hint ? (
                    <span className="ml-auto text-xs text-muted-foreground">{item.hint}</span>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
