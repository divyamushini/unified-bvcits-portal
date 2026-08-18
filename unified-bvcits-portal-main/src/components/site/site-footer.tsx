import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { BRAND, NAV_LINKS, PORTALS, AUTHORITY_BODIES } from "@/lib/campus-data";

export function SiteFooter() {
  return (
    <footer className="surface-navy mt-24">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-gold font-display text-base font-bold text-gold-foreground">
              BV
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold">{BRAND.name}</span>
              <span className="block text-[11px] tracking-[0.16em] uppercase opacity-70">
                {BRAND.subtitle}
              </span>
            </span>
          </div>
          <p className="max-w-xs text-sm opacity-75">{BRAND.tagline}</p>
          <p className="text-xs opacity-60">
            BVCITS Integrated Digital Campus. Official reference: bvcits.edu.in
          </p>
        </div>

        <nav aria-label="Footer navigation" className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wide">Explore</h3>
          <ul className="grid gap-2 text-sm opacity-80">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wide">Portals</h3>
          <ul className="grid gap-2 text-sm opacity-80">
            {PORTALS.map((portal) => (
              <li key={portal.id}>
                <Link
                  to="/login"
                  search={{ role: portal.id }}
                  className="transition-colors hover:text-gold"
                >
                  {portal.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" search={{ role: "authority" }} className="transition-colors hover:text-gold">
                Institutional Authority
              </Link>
            </li>
            <li>
              <Link to="/login" search={{ role: "admin" }} className="transition-colors hover:text-gold">
                Administration
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wide">Reach us</h3>
          <ul className="grid gap-3 text-sm opacity-80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>BVC Institute of Technology &amp; Science, Amalapuram, Andhra Pradesh </span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>+91 00000 00000</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>info@example.edu</span>
            </li>
          </ul>
          <p className="pt-2 text-xs opacity-60">
            Integration-ready for {AUTHORITY_BODIES.join(", ")} reporting workflows.
          </p>
        </div>
      </div>

      <div className="border-t border-navy-foreground/15">
        <div className="container-page flex flex-col gap-2 py-5 text-xs opacity-65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BVCITS Integrated Digital Campus.</p>
          <p>{BRAND.concept}</p>
        </div>
      </div>
    </footer>
  );
}
