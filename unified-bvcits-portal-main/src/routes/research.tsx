import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Lightbulb, Rocket, ScrollText, Stamp } from "lucide-react";

import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RESEARCH, RESEARCH_FACTS } from "@/lib/campus-data";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Innovation | BVCITS Digital Campus" },
      {
        name: "description",
        content:
          "BVCITS research and innovation: publications, funded projects, patents, innovation cell, startups and student projects.",
      },
      { property: "og:title", content: "Research & Innovation at BVCITS" },
      {
        property: "og:description",
        content: "Publications, projects, patents, innovation, startups and student projects.",
      },
    ],
  }),
  component: ResearchPage,
});

const STUDENT_PROJECTS = [
  { title: "Campus navigation assistant", team: "CSE", stack: "React, Maps API" },
  { title: "Smart attendance with face recognition", team: "AI&ML", stack: "Python, OpenCV" },
  { title: "Solar-assisted water pump controller", team: "EEE", stack: "Embedded C" },
  { title: "Low-cost air quality monitor", team: "ECE", stack: "IoT sensors" },
];

function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Research"
        title="Research & Innovation"
        description="Publications, funded projects, patents, the innovation cell, incubated startups and student project records — all managed as structured records for accreditation reporting."
      />

      <Section title="Research at a glance" description="Institutional research output published by BVCITS.">
        <div className="grid gap-4 sm:grid-cols-3">
          {RESEARCH_FACTS.map((fact) => (
            <Card key={fact.label} className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl">{fact.value}</CardTitle>
                <CardDescription>{fact.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Publications">
        <div className="grid gap-4 lg:grid-cols-3">
          {RESEARCH.publications.map((item) => (
            <Card key={item.title} className="shadow-card">
              <CardHeader>
                <ScrollText className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.venue}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">{item.authors}</CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <InfoNote>Detailed publication, patent and funding records are maintained by the Research & Development cell.</InfoNote>
        </div>
      </Section>

      <Section title="Projects & patents">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <FlaskConical className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Funded / internal projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {RESEARCH.projects.map((project) => (
                <div key={project.title} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{project.title}</p>
                    <p className="text-xs text-muted-foreground">Funding: {project.funding}</p>
                  </div>
                  <Badge variant="secondary">{project.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <Stamp className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Patents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {RESEARCH.patents.map((patent) => (
                <div key={patent.title} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-medium">{patent.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Application no: {patent.number} · {patent.year}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Innovation & startups">
        <div className="grid gap-4 lg:grid-cols-2">
          {RESEARCH.startups.map((startup) => (
            <Card key={startup.name} className="shadow-card">
              <CardHeader>
                <Rocket className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">{startup.name}</CardTitle>
                <CardDescription>{startup.focus}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{startup.stage}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Student projects">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STUDENT_PROJECTS.map((project) => (
            <div key={project.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <Lightbulb className="size-5 text-gold" aria-hidden />
              <p className="mt-3 text-sm font-semibold">{project.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{project.team}</p>
              <p className="mt-1 text-xs text-muted-foreground">{project.stack}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
