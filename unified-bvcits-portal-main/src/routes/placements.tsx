import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, GaugeCircle, Search, Sparkles, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { CategoryBars } from "@/components/dashboard/charts";
import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COMPANIES, PLACEMENT_FACTS, SKILL_ANALYTICS } from "@/lib/campus-data";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements & Training | BVCITS Digital Campus" },
      {
        name: "description",
        content:
          "BVCITS placements: recruiting companies, placement drives, training, internships, placement statistics and placement readiness tracking.",
      },
      { property: "og:title", content: "Placements at BVCITS" },
      {
        property: "og:description",
        content: "Companies, drives, training, internships, statistics and placement readiness.",
      },
    ],
  }),
  component: PlacementsPage,
});

const READINESS = [
  { label: "Aptitude & reasoning", value: 76 },
  { label: "Programming & DSA", value: 68 },
  { label: "Communication", value: 62 },
  { label: "Projects & portfolio", value: 71 },
  { label: "Mock interviews", value: 55 },
];

function PlacementsPage() {
  const [query, setQuery] = useState("");
  const filteredCompanies = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return COMPANIES;
    return COMPANIES.filter(
      (company) =>
        company.name.toLowerCase().includes(term) || company.sector.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Placements"
        title="Placements, Training & Internships"
        description="Company engagement, placement drives, training programs, internships and readiness analytics — connected to the recruiter and trainer portals."
      />

      <Section title="Placement highlights" description="Placement outcomes published by the Training & Placement Cell.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEMENT_FACTS.map((fact) => (
            <Card key={fact.label} className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl">{fact.value}</CardTitle>
                <CardDescription>{fact.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Recruiting companies & drives" description="Explore placement opportunities and recruiter information associated with BVCITS.">
        <div className="mb-4 max-w-sm">
          <label htmlFor="company-search" className="sr-only">
            Search companies
          </label>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              id="company-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search company or sector"
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Package</TableHead>
                <TableHead className="text-right">Drive status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.name}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.sector}</TableCell>
                  <TableCell>{company.offers}</TableCell>
                  <TableCell>{company.ctc}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        company.status === "Completed"
                          ? "border-gold/40 bg-gold/15 text-foreground"
                          : company.status === "Recruiter / Details Not Published"
                            ? "border-border bg-secondary text-muted-foreground"
                            : ""
                      }
                      variant={company.status === "Completed" || company.status === "Recruiter / Details Not Published" ? "outline" : "default"}
                    >
                      {company.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                    No companies match your search.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <InfoNote>
            Placement figures and packages are based on published BVCITS placement information. Current
            drive schedules and eligibility are subject to official Placement Cell announcements.
          </InfoNote>
        </div>
      </Section>

      <Section title="Training, internships & readiness">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader>
              <GaugeCircle className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Placement readiness</CardTitle>
              <CardDescription>Composite score shown on the student dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {READINESS.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="mt-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <Sparkles className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Skill analytics</CardTitle>
              <CardDescription>Average cohort score by skill area.</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryBars data={SKILL_ANALYTICS} xKey="skill" yKey="score" horizontal height={240} />
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="shadow-card">
              <CardHeader>
                <Briefcase className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">Internships</CardTitle>
                <CardDescription>
                  Summer and semester internships with industry partners, tracked in the student portal
                  with certificates and mentor feedback.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Users className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">Training programs</CardTitle>
                <CardDescription>
                  Full stack, DSA and aptitude, cloud foundations, and communication &amp; interview skills —
                  delivered in batches by the trainer team.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
