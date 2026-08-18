import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, FileText, GraduationCap, ScrollText, Users } from "lucide-react";

import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ACADEMIC_FACTS, DEPARTMENTS, PROGRAMS, TIMETABLE_TODAY } from "@/lib/campus-data";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics at BVCITS | Programs, Departments & Curriculum" },
      {
        name: "description",
        content:
          "Programs, departments, faculty, curriculum, syllabus, academic calendar, regulations and timetable in the BVCITS digital campus.",
      },
      { property: "og:title", content: "Academics at BVCITS" },
      {
        property: "og:description",
        content: "Programs, departments, faculty, curriculum, syllabus, calendar, regulations and timetable.",
      },
    ],
  }),
  component: AcademicsPage,
});

const FACULTY = [
  { name: "Dr. A. Rao", dept: "CSE", role: "Professor", area: "Algorithms, Distributed Systems" },
  { name: "Prof. S. Iyer", dept: "CSE", role: "Associate Professor", area: "Operating Systems" },
  { name: "Dr. N. Sharma", dept: "AI&ML", role: "Professor", area: "Machine Learning" },
  { name: "Mr. K. Varma", dept: "ECE", role: "Assistant Professor", area: "Embedded Systems" },
  { name: "Dr. P. Latha", dept: "EEE", role: "Professor", area: "Power Systems" },
  { name: "Mr. R. Naidu", dept: "MECH", role: "Assistant Professor", area: "Thermal Engineering" },
];

const CALENDAR = [
  { item: "Commencement of classes", period: "Will be updated" },
  { item: "Mid-term assessment I", period: "Will be updated" },
  { item: "Mid-term assessment II", period: "Will be updated" },
  { item: "Practical examinations", period: "Will be updated" },
  { item: "Semester-end examinations", period: "Will be updated" },
  { item: "Semester break", period: "Will be updated" },
];

const STRUCTURE_SECTIONS = [
  {
    heading: "Course overview",
    body: "A four-year undergraduate programme structured across eight semesters, combining foundational sciences, core engineering courses, professional electives, laboratory practice, internships and a final-year project.",
  },
  {
    heading: "Core subjects",
    body: "Department core courses are offered progressively from the second year, covering the discipline's fundamental theory and design papers as approved by the affiliating university.",
  },
  {
    heading: "Elective subjects",
    body: "Professional electives and open electives allow specialisation in emerging areas. The elective basket for each semester is announced by the department.",
  },
  {
    heading: "Laboratory courses",
    body: "Each semester includes laboratory and skill-oriented courses conducted in department laboratories, along with practical records and internal assessment.",
  },
  {
    heading: "Credits",
    body: "Credits are assigned per course as per the applicable regulation, with programme totals prescribed by the affiliating university.",
  },
  {
    heading: "Semester-wise structure",
    body: "Semester-wise course lists, credit distribution and evaluation pattern are published by the department. Curriculum details will be updated by the respective department.",
  },
];

function AcademicsPage() {
  const [structureFor, setStructureFor] = useState<{ code: string; name: string } | null>(null);

  return (
    <PageShell>
      <PageHero
        eyebrow="Academics"
        title="Academics"
        description="Programs, departments, faculty, curriculum, syllabus, academic calendar, regulations and timetable — all connected to the student and faculty dashboards."
      />

      <Section title="Academics at a glance" description="Programme strength and academic resources at BVCITS.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACADEMIC_FACTS.map((fact) => (
            <Card key={fact.label} className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl">{fact.value}</CardTitle>
                <CardDescription>{fact.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">09 UG + 05 PG programmes offered across engineering and management disciplines.</p>
      </Section>

      <Section title="Programs offered" description="Undergraduate and postgraduate programs with entry pathways.">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Entry route</TableHead>
                <TableHead className="text-right">Sanctioned intake</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROGRAMS.map((program) => (
                <TableRow key={program.name}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>{program.mode}</TableCell>
                  <TableCell>{program.entry}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{program.intake}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <InfoNote>Sanctioned intake per programme is as per the approval of the affiliating university and AICTE; details will be announced through the official BVCITS portal.</InfoNote>
        </div>
      </Section>

      <Section title="Departments" description="Each department maintains programs, faculty, labs, curriculum and outcomes.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((department) => (
            <Card key={department.code} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="border-gold/40 bg-gold/15 text-foreground">{department.code}</Badge>
                  <GraduationCap className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <CardTitle className="mt-3 text-base">{department.name}</CardTitle>
                <CardDescription>
                  {department.students} students · {department.faculty} faculty · avg CGPA {department.avgCgpa}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Curriculum, syllabus & regulations">
        <Tabs defaultValue="curriculum">
          <TabsList className="flex-wrap">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="calendar">Academic calendar</TabsTrigger>
            <TabsTrigger value="regulations">Regulations</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.slice(0, 6).map((department) => (
              <Card key={department.code} className="shadow-card">
                <CardHeader>
                  <FileText className="size-5 text-gold" aria-hidden />
                  <CardTitle className="text-sm">{department.code} — Course structure</CardTitle>
                  <CardDescription>Explore the course structure, subjects, electives and laboratory curriculum.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setStructureFor({ code: department.code, name: department.name })}
                  >
                    View structure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="syllabus" className="mt-6 grid gap-4 sm:grid-cols-2">
            {["R23 Regulation syllabus", "R20 Regulation syllabus", "M.Tech syllabus", "MBA syllabus"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-card">
                <div>
                  <p className="text-sm font-semibold">{item}</p>
                  <p className="text-xs text-muted-foreground">Information will be updated by the respective department.</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead className="text-right">Period</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CALENDAR.map((entry) => (
                    <TableRow key={entry.item}>
                      <TableCell className="font-medium">
                        <CalendarDays className="mr-2 inline size-4 text-gold" aria-hidden />
                        {entry.item}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{entry.period}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="regulations" className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Attendance & condonation rules",
              "Internal assessment weightage",
              "Promotion & detention criteria",
              "Revaluation and re-examination",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <ScrollText className="size-5 text-gold" aria-hidden />
                <p className="mt-3 text-sm font-semibold">{item}</p>
                <p className="mt-1 text-xs text-muted-foreground">As per university regulations.</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="timetable" className="mt-6">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Faculty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TIMETABLE_TODAY.map((slot) => (
                    <TableRow key={slot.time}>
                      <TableCell className="font-medium">{slot.time}</TableCell>
                      <TableCell>{slot.subject}</TableCell>
                      <TableCell>{slot.room}</TableCell>
                      <TableCell className="text-muted-foreground">{slot.faculty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Faculty directory" description="Faculty members across departments. Profiles are maintained by the respective departments.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACULTY.map((member) => (
            <Card key={member.name} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary">
                    <Users className="size-5 text-gold" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role} · {member.dept}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{member.area}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
      <Dialog open={structureFor !== null} onOpenChange={(open) => !open && setStructureFor(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{structureFor?.code} Course Structure</DialogTitle>
            <DialogDescription>{structureFor?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            {STRUCTURE_SECTIONS.map((section) => (
              <div key={section.heading}>
                <h3 className="text-sm font-semibold">{section.heading}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
