import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  Landmark,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

import heroAsset from "@/assets/bvcits-campus.jpg";
import { PageShell, Section } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BRAND,
  DEPARTMENTS,
  NOTICES,
  PLACEMENT_FACTS,
  PORTALS,
  AUTHORITY_BODIES,
} from "@/lib/campus-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BVCITS | Integrated Digital Campus" },
      {
        name: "description",
        content:
          "BVCITS Integrated Digital Campus connects students, parents, faculty, management, recruiters, trainers and authorities through one secure digital platform.",
      },
      { property: "og:title", content: "BVCITS Integrated Digital Campus" },
      {
        property: "og:description",
        content: "One Campus. Every Stakeholder. One Digital Platform. A unified digital campus portal for BVCITS.",
      },
    ],
  }),
  component: HomePage,
});

const MODULES = [
  { icon: ScrollText, title: "Examination", text: "Notifications, timetable, hall ticket, results, internal marks, revaluation." },
  { icon: BookOpen, title: "Digital Library", text: "Book search, availability, issued books, due dates and e-resources." },
  { icon: ShieldCheck, title: "Grievances", text: "Category-wise submission with grievance ID and resolution tracking." },
  { icon: BadgeCheck, title: "Certificates", text: "Bonafide, study and completion certificates with verification workflow." },
  { icon: CalendarDays, title: "Timetable", text: "Class, lab and exam schedules for students and faculty." },
  { icon: FileText, title: "Document Center", text: "Academic, AICTE, UGC, JNTUK, accreditation and government documents." },
];

const HIGHLIGHTS = [
  { label: "Green Campus", value: "40 Acre" },
  { label: "Experienced Faculty", value: "195+" },
  { label: "Graduates Produced", value: "12K+" },
  { label: "Students Placed Annually", value: "1000+" },
];

function HomePage() {
  return (
    <PageShell>
      <section className="surface-navy relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <Badge className="border-gold/40 bg-gold/15 text-gold">
              <Sparkles className="size-3.5" aria-hidden />
              {BRAND.concept}
            </Badge>
            <p className="mt-6 font-display text-5xl leading-none font-extrabold tracking-tight text-navy-foreground sm:text-6xl lg:text-7xl">
              BVCITS
            </p>
            <p className="mt-2 text-[11px] font-semibold tracking-[0.34em] uppercase text-gold sm:text-sm sm:tracking-[0.4em]">
              Integrated Digital Campus
            </p>
            <h1 className="mt-6 text-2xl leading-[1.15] font-bold sm:text-3xl md:text-4xl">
              A Smarter <span className="text-gradient-gold">Digital Campus</span> for Everyone
            </h1>
            <p className="mt-4 max-w-xl text-sm opacity-80 md:text-base">
              A unified digital platform connecting students, parents, faculty, management, recruiters,
              trainers and institutional authorities through one secure ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/about">
                  Explore BVCITS
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/portal">Access Portal</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="glass-card rounded-xl px-4 py-3">
                  <dd className="font-display text-xl font-bold">{item.value}</dd>
                  <dt className="mt-1 text-[10px] tracking-[0.14em] uppercase opacity-65">{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute inset-0 -rotate-2 rounded-3xl bg-gold/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-gold/40 shadow-elevated ring-1 ring-navy-foreground/10">
              <img
                src={heroAsset}
                alt="BVCITS campus, Amalapuram"
                width={750}
                height={465}
                loading="eager"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section
        title="Quick access for every stakeholder"
        description="Six role-based portals, one identity layer. Each portal shows only the information that role is authorised to see."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTALS.map((portal) => (
            <Card key={portal.id} className="group shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <CardHeader>
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl transition-colors group-hover:bg-gold/20">
                  {portal.emoji}
                </span>
                <CardTitle className="mt-4 text-lg">{portal.title}</CardTitle>
                <CardDescription>{portal.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {portal.capabilities.slice(0, 3).map((capability) => (
                    <li key={capability} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {capability}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" search={{ role: portal.id }}>
                    Login / Access
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Core digital modules"
        description="Every academic and student service runs as a module with a clear workflow, status tracking and audit-ready records."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module) => (
            <div key={module.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <module.icon className="size-6 text-gold" aria-hidden />
              <h3 className="mt-4 text-base font-semibold">{module.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{module.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="secondary">
            <Link to="/services">
              View all student services
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="size-5 text-gold" aria-hidden />
                Placement highlights
              </CardTitle>
              <CardDescription>Published by the Training &amp; Placement Cell.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {PLACEMENT_FACTS.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-border p-4">
                  <p className="font-display text-2xl font-bold">{fact.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{fact.label}</p>
                </div>
              ))}
              <div className="sm:col-span-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/placements">View placements</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ScrollText className="size-5 text-gold" aria-hidden />
                Latest notices
              </CardTitle>
              <CardDescription>Searchable notification centre across every category.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {NOTICES.slice(0, 4).map((notice) => (
                <Link
                  key={notice.id}
                  to="/notices"
                  className="block rounded-xl border border-border p-3 transition-colors hover:border-gold hover:bg-secondary"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{notice.category}</Badge>
                    <span className="text-xs text-muted-foreground">{notice.date}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{notice.title}</p>
                </Link>
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link to="/notices">Open notification centre</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Section
        title="Departments at a glance"
        description="Department pages carry programs, faculty, curriculum, labs and outcomes. "
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((department) => (
            <Link
              key={department.code}
              to="/academics"
              className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold tracking-wide text-gold">{department.code}</span>
                <GraduationCap className="size-4 text-muted-foreground" aria-hidden />
              </div>
              <h3 className="mt-3 text-sm font-semibold">{department.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {department.students} students · {department.faculty} faculty
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <section className="container-page pb-8">
        <div className="surface-navy relative overflow-hidden rounded-3xl px-8 py-12 md:px-14">
          <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-20 size-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Landmark className="size-7 text-gold" aria-hidden />
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">Built for institutional authorities too</h2>
              <p className="mt-3 max-w-xl text-sm opacity-80">
                Authorised users from {AUTHORITY_BODIES.join(", ")} can access institutional information,
                statistics, academic and examination data, accreditation documents and compliance reports.
                The platform is integration-ready — no external system is simulated.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/login" search={{ role: "authority" }}>Authority access</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to="/portal">See all portals</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Building2, title: "Institution data", text: "Profile, infrastructure, approvals." },
                { icon: BarChart3, title: "Statistics", text: "Students, faculty, programs, outcomes." },
                { icon: FileText, title: "Compliance", text: "Reports and accreditation documents." },
                { icon: Trophy, title: "Outcomes", text: "Placements, research, achievements." },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-2xl p-5">
                  <item.icon className="size-5 text-gold" aria-hidden />
                  <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs opacity-75">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
