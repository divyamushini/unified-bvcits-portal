import { createFileRoute } from "@tanstack/react-router";
import { Award, Building, Compass, FileCheck2, Quote, Target, Users2 } from "lucide-react";

import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BVCITS | Vision, Leadership & Accreditation" },
      {
        name: "description",
        content:
          "About the BVCITS Integrated Digital Campus: institution profile, vision and mission, leadership, accreditation, affiliation and infrastructure.",
      },
      { property: "og:title", content: "About BVCITS" },
      {
        property: "og:description",
        content: "Institution profile, vision and mission, leadership, accreditation, affiliation and infrastructure.",
      },
    ],
  }),
  component: AboutPage,
});

const LEADERSHIP = [
  { role: "Chairman", name: "Will be updated", note: "Management board" },
  { role: "Secretary & Correspondent", name: "Will be updated", note: "Governing body" },
  { role: "Principal", name: "Will be updated", note: "Academic head" },
  { role: "Dean — Academics", name: "Will be updated", note: "Curriculum & regulations" },
  { role: "Dean — Placements", name: "Will be updated", note: "Training & placements" },
  { role: "Controller of Examinations", name: "Will be updated", note: "Examination cell" },
];

const INFRASTRUCTURE = [
  { title: "Academic blocks", text: "Smart classrooms, seminar halls and tutorial rooms." },
  { title: "Laboratories", text: "Department labs, computing centre and research labs." },
  { title: "Library", text: "Central library with digital resources and e-journals." },
  { title: "Sports & hostels", text: "Playgrounds, indoor courts and separate hostel blocks." },
  { title: "Training centre", text: "Dedicated skill development and placement training block." },
  { title: "Digital campus", text: "Campus-wide network, ERP-ready systems and this portal." },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="About BVCITS"
        description="BVC Institute of Technology & Science operates as an engineering institution offering undergraduate and postgraduate programs. This portal presents its digital campus layer. Official institutional details must be confirmed with the college office."
      />

      <Section title="Institution profile" description="A modern engineering campus organised around academics, skilling and outcomes.">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-card lg:col-span-2">
            <CardContent className="space-y-4 p-6 text-sm text-muted-foreground">
              <p>
                The institution offers B.Tech, B.Tech (lateral entry), M.Tech and MBA programs across
                engineering and management disciplines, supported by department laboratories, a central
                library, training facilities and student support cells.
              </p>
              <p>
                The Integrated Digital Campus unifies academics, examinations, student services,
                placements, training, research records and institutional reporting so every stakeholder
                works from a single trusted source of information.
              </p>
              <InfoNote>
                Enrolment counts, approval numbers, ranking and accreditation grades are updated from
                official BVCITS records.
              </InfoNote>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="shadow-card">
              <CardHeader>
                <Target className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">Vision</CardTitle>
                <CardDescription>
                  To be recognised as a centre of quality technical education that develops competent,
                  ethical and industry-ready engineers. ()
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Compass className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">Mission</CardTitle>
                <CardDescription>
                  Deliver outcome-based education, strengthen industry collaboration, promote research and
                  innovation, and support holistic student development. ()
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Section>

      <Section title="Leadership" description="Governance and academic leadership structure of the institution.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((person) => (
            <Card key={person.role} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary">
                    <Users2 className="size-5 text-gold" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{person.role}</p>
                    <p className="text-xs text-muted-foreground">{person.name}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{person.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Principal's message">
        <Card className="shadow-card">
          <CardContent className="p-8">
            <Quote className="size-8 text-gold" aria-hidden />
            <blockquote className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              “Our focus is to prepare students who are technically strong, socially responsible and ready
              for the workplace. The Integrated Digital Campus makes academic progress visible to students,
              parents and faculty, so support reaches learners at the right time.”
            </blockquote>
            <p className="mt-4 text-sm font-medium">Message from the Principal</p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Accreditation & affiliation" description="Approval and affiliation information as published by the institution.">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <Award className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Accreditation</CardTitle>
              <CardDescription>Programme and institutional accreditation records.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["NAAC — Will be updated", "NBA — Will be updated", "ISO — Will be updated"].map((item) => (
                <Badge key={item} variant="secondary">{item}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <FileCheck2 className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Affiliation & approval</CardTitle>
              <CardDescription>University affiliation and statutory approvals.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["JNTUK affiliated", "AICTE approved — Will be updated", "Govt. of A.P. — Will be updated"].map((item) => (
                <Badge key={item} variant="secondary">{item}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Infrastructure">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INFRASTRUCTURE.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <Building className="size-5 text-gold" aria-hidden />
              <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
