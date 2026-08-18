import { Link } from "@tanstack/react-router";
import { MapPin, Menu } from "lucide-react";
import { useState } from "react";

import { GlobalSearch } from "@/components/site/global-search";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BRAND, NAV_LINKS } from "@/lib/campus-data";

export function BrandMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={`${BRAND.name} home`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold font-display text-base font-bold text-gold-foreground">
        BV
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold tracking-tight">{BRAND.name}</span>
        <span
          className={
            tone === "light"
              ? "block text-[11px] font-medium tracking-[0.16em] uppercase text-navy-foreground/70"
              : "block text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground"
          }
        >
          {BRAND.subtitle}
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
      <div className="border-b border-border/70 bg-secondary/70">
        <div className="container-page flex min-h-8 items-center gap-2 py-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
          <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden />
          <span>
            BVC Institute of Technology &amp; Science, Amalapuram, Dr. B. R. Ambedkar Konaseema District, Andhra Pradesh
          </span>
        </div>
      </div>

      <div className="container-page flex h-16 items-center gap-4">
        <BrandMark />

        <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-foreground after:scale-x-100" }}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform hover:text-foreground hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <div className="hidden md:block">
            <GlobalSearch />
          </div>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/portal">Access Portal</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,90vw)] overflow-y-auto">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="space-y-6 p-6">
                <BrandMark />
                <GlobalSearch />
                <nav aria-label="Mobile" className="grid gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: link.to === "/" }}
                      activeProps={{ className: "bg-secondary text-foreground" }}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="w-full">
                  <Link to="/portal" onClick={() => setOpen(false)}>
                    Access Portal
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
