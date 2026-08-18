import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, LogOut } from "lucide-react";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/site/site-header";
import { GlobalSearch } from "@/components/site/global-search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RoleId } from "@/lib/campus-data";
import { ROLE_LABEL } from "@/lib/campus-data";

export function DashboardShell({
  role,
  user,
  meta,
  children,
}: {
  role: RoleId;
  user: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="surface-navy sticky top-0 z-40">
        <div className="container-page flex h-16 items-center gap-3">
          <BrandMark tone="light" />
          <Badge className="ml-2 hidden border-gold/40 bg-gold/15 text-gold sm:inline-flex">
            {ROLE_LABEL[role]}
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:block">
              <GlobalSearch variant="dark" />
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="text-navy-foreground hover:bg-navy-foreground/10">
              <Bell className="size-5" aria-hidden />
            </Button>
            <Button asChild variant="outline" size="sm" className="border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10">
              <Link to="/portal">
                <LogOut className="size-4" aria-hidden />
                <span className="hidden sm:inline">Sign out</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              {ROLE_LABEL[role]} Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">{user}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/portal">
              <ArrowLeft className="size-4" aria-hidden />
              All portals
            </Link>
          </Button>
        </div>

        <div className="mt-8 space-y-8">{children}</div>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "gold" | "navy";
}) {
  return (
    <Card
      className={cn(
        "shadow-card transition-transform hover:-translate-y-0.5",
        tone === "navy" && "surface-navy border-transparent",
        tone === "gold" && "border-gold/40 bg-gold/10",
      )}
    >
      <CardContent className="p-5">
        <p className={cn("text-xs font-medium tracking-wide uppercase", tone === "navy" ? "opacity-70" : "text-muted-foreground")}>
          {label}
        </p>
        <p className="mt-2 font-display text-2xl font-bold">{value}</p>
        {hint ? (
          <p className={cn("mt-1 text-xs", tone === "navy" ? "opacity-70" : "text-muted-foreground")}>{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function StageFlow({ stages, current }: { stages: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs">
      {stages.map((stage, index) => (
        <li key={stage} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 font-medium",
              index <= current
                ? "border-gold bg-gold/15 text-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            {stage}
          </span>
          {index < stages.length - 1 ? <span className="text-muted-foreground">→</span> : null}
        </li>
      ))}
    </ol>
  );
}
