import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Landmark, Lock, ShieldCheck, Wrench } from "lucide-react";

import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTHORITY_BODIES, ENTITIES, PORTALS } from "@/lib/campus-data";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Access Portal | BVCITS Stakeholder Logins" },
      {
        name: "description",
        content:
          "Access the BVCITS digital campus as a student, parent, faculty member, management user, recruiter, trainer, institutional authority or administrator.",
      },
      { property: "og:title", content: "BVCITS Access Portal" },
      {
        property: "og:description",
        content: "Role-based access for students, parents, faculty, management, recruiters, trainers and authorities.",
      },
    ],
  }),
  component: PortalPage,
});

const AUTHORITY_ACCESS = [
  "Institutional information",
  "Student statistics",
  "Faculty statistics",
  "Academic data",
  "Examination data",
  "Placement data",
  "Accreditation documents",
  "Compliance reports",
];

function PortalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Access Portal"
        title="One platform, role-based access"
        description="Every stakeholder signs in through the same secure gateway and lands on a dashboard scoped to what their role is authorised to see."
      >
        <div className="flex flex-wrap gap-2">
          <Badge className="border-gold/40 bg-gold/15 text-gold">Role-based permissions</Badge>
          <Badge className="border-gold/40 bg-gold/15 text-gold">Row-level security ready</Badge>
          <Badge className="border-gold/40 bg-gold/15 text-gold">Audit logs ready</Badge>
        </div>
      </PageHero>

      <Section title="Choose your portal">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTALS.map((portal) => (
            <Card key={portal.id} className="flex flex-col shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <CardHeader>
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl">{portal.emoji}</span>
                <CardTitle className="mt-4 text-lg">{portal.title}</CardTitle>
                <CardDescription>{portal.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {portal.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {capability}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link to="/register" search={{ role: portal.id }}>
                      Register
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/login" search={{ role: portal.id }}>
                      Login
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Institutional authorities" description={`Authorised access for ${AUTHORITY_BODIES.join(", ")} users.`}>
        <Card className="shadow-card">
          <CardHeader>
            <Landmark className="size-6 text-gold" aria-hidden />
            <CardTitle className="text-base">Authority access</CardTitle>
            <CardDescription>
              Read-only institutional reporting views. No external system is simulated — the platform exposes
              integration-ready interfaces only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {AUTHORITY_ACCESS.map((item) => (
                <div key={item} className="rounded-xl border border-border px-3 py-2 text-xs">{item}</div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/register" search={{ role: "government" }}>Register as authority</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login" search={{ role: "government" }}>Authority login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login" search={{ role: "admin" }}>Administrator login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Security & architecture" description="The platform is structured with role-scoped access and audit-ready records.">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader>
              <ShieldCheck className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Security model</CardTitle>
              <CardDescription>
                Role-based authentication, protected routes, row-level data scoping, audit logging and secure
                file uploads. Students see only their own records; parents see only their linked student.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <Lock className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Roles</CardTitle>
              <CardDescription>
                Admin, Student, Parent, Faculty, Staff, Management, Recruiter, Trainer and Institutional
                Authority — each mapped to its own dashboard after sign-in.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <Wrench className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Planned data entities</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {ENTITIES.map((entity) => (
                <Badge key={entity} variant="secondary" className="text-[10px]">{entity}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <InfoNote>
            Registration comes first: register with your role, sign in, and you are taken to the dashboard scoped
            to that role.
          </InfoNote>
        </div>
      </Section>
    </PageShell>
  );
}
