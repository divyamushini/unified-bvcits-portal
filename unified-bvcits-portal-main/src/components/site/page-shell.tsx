import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-navy relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gold/20 blur-3xl"
      />
      <div className="container-page relative py-16 md:py-20">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm opacity-80 md:text-base">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="container-page py-12 md:py-16">
      <div className="max-w-2xl">
        <div className="hairline-gold" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold md:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function InfoNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-gold/60 bg-gold/8 px-4 py-3 text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">Note:</span> {children}
    </p>
  );
}
