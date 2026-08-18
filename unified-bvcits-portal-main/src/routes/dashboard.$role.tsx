import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  Bot,
  CalendarDays,
  ClipboardList,
  FileText,
  Search,
  GraduationCap,
  Landmark,
  ScrollText,
  ShieldAlert,
  Users,
} from "lucide-react";

import { CategoryBars, DonutChart, TrendArea, TrendLine } from "@/components/dashboard/charts";
import { DashboardShell, Panel, StageFlow, StatCard } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "@/lib/auth";
import {
  ACADEMIC_FACTS,
  ATTENDANCE_TREND,
  AUTHORITY_BODIES,
  DOCUMENT_CENTER,
  INSTITUTION,
  JNTUK_ACADEMIC_ITEMS,
  JNTUK_EXAM_ITEMS,
  JNTUK_REPORTS,
  LINKED_STUDENTS,
  PLACEMENT_FACTS,
  RESEARCH_FACTS,
  RESTRICTED_NOTE,
  type LinkedStudent,
  CERTIFICATE_STAGES,
  COMPANIES,
  DEPARTMENTS,
  NOTICES,
  PERFORMANCE_TREND,
  PLACEMENT_TREND,
  RECRUITER_PIPELINE,
  ROLE_LABEL,
  SKILL_ANALYTICS,
  SUBJECT_MARKS,
  TIMETABLE_TODAY,
  TRAINING_BATCHES,
  UPCOMING_EVENTS,
  type RoleId,
} from "@/lib/campus-data";

const ROLES: RoleId[] = [
  "student",
  "parent",
  "faculty",
  "management",
  "recruiter",
  "trainer",
  "government",
  "jntuk",
  "authority",
  "admin",
];


export const Route = createFileRoute("/dashboard/$role")({
  ssr: false,
  beforeLoad: ({ params }) => {
    if (!ROLES.includes(params.role as RoleId)) throw notFound();
  },
  head: ({ params }) => {
    const label = ROLE_LABEL[(params.role as RoleId) ?? "student"] ?? "Portal";
    return {
      meta: [
        { title: `${label} Dashboard | BVCITS Digital Campus` },
        {
          name: "description",
          content: `${label} dashboard in the BVCITS Integrated Digital Campus portal with role-scoped analytics and quick actions.`,
        },
        { property: "og:title", content: `${label} Dashboard — BVCITS` },
        { property: "og:description", content: `Role-based ${label} dashboard in the BVCITS Integrated Digital Campus portal.` },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: DashboardPage,
});

const QUICK_ACTIONS = [
  { label: "Results", icon: ScrollText },
  { label: "Attendance", icon: ClipboardList },
  { label: "Examination", icon: FileText },
  { label: "Placements", icon: GraduationCap },
  { label: "Library", icon: BookOpen },
  { label: "Certificates", icon: BadgeCheck },
  { label: "Grievance", icon: ShieldAlert },
];

function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {QUICK_ACTIONS.map((action) => (
        <Link
          key={action.label}
          to="/services"
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center text-xs font-medium shadow-card transition-all hover:-translate-y-0.5 hover:border-gold"
        >
          <action.icon className="size-5 text-gold" aria-hidden />
          {action.label}
        </Link>
      ))}
    </div>
  );
}

function TimetablePanel() {
  return (
    <Panel title="Today's timetable" description="Published schedule">
      <div className="space-y-2">
        {TIMETABLE_TODAY.map((slot) => (
          <div key={slot.time} className="flex flex-wrap items-center gap-2 rounded-xl border border-border p-3 text-sm">
            <span className="font-medium">{slot.time}</span>
            <span className="text-muted-foreground">·</span>
            <span>{slot.subject}</span>
            <Badge variant="secondary" className="ml-auto">{slot.room}</Badge>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function NoticePanel({ limit = 4 }: { limit?: number }) {
  return (
    <Panel title="Notifications" description="Latest official communication" action={
      <Button asChild variant="outline" size="sm"><Link to="/notices">All</Link></Button>
    }>
      <div className="space-y-3">
        {NOTICES.slice(0, limit).map((notice) => (
          <div key={notice.id} className="rounded-xl border border-border p-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">{notice.category}</Badge>
              <span className="text-xs text-muted-foreground">{notice.date}</span>
            </div>
            <p className="mt-1.5 text-sm font-medium">{notice.title}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function MarksTable() {
  return (
    <Panel title="Subject performance" description="Internal marks and attendance">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Internal</TableHead>
              <TableHead className="text-right">Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUBJECT_MARKS.map((row) => (
              <TableRow key={row.subject}>
                <TableCell className="font-medium">{row.subject}</TableCell>
                <TableCell>{row.internal}/{row.max}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={row.attendance >= 85 ? "secondary" : "destructive"}>{row.attendance}%</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Panel>
  );
}

function StudentDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attendance" value="90%" hint="Above required minimum" tone="gold" />
        <StatCard label="CGPA" value="8.6" hint="Semester 6" />
        <StatCard label="Current semester" value="VI" hint="B.Tech CSE" />
        <StatCard label="Placement readiness" value="72%" hint="Training + assessments" tone="navy" />
      </div>
      <QuickActions />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Academic performance" description="CGPA by semester">
          <TrendLine data={PERFORMANCE_TREND} xKey="sem" yKey="cgpa" />
        </Panel>
        <Panel title="Attendance trend" description="Monthly attendance">
          <TrendArea data={ATTENDANCE_TREND} xKey="month" yKey="attendance" />
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TimetablePanel />
        <MarksTable />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <NoticePanel />
        <Panel title="Upcoming events">
          <div className="space-y-3">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.title} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <CalendarDays className="size-4 text-gold" aria-hidden />
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date} · {event.place}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function ParentDashboard() {
  const { session } = useSession();
  const linkedRoll = (session?.fields?.["studentRoll"] ?? "").trim().toUpperCase();
  const linked: LinkedStudent =
    LINKED_STUDENTS.find((student) => student.roll.toUpperCase() === linkedRoll) ?? LINKED_STUDENTS[0]!;

  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<LinkedStudent>(linked);

  const lookup = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) {
      setStudent(linked);
      setError(null);
      return;
    }
    const isLinked =
      linked.roll.toLowerCase() === q || linked.name.toLowerCase().includes(q);
    if (isLinked) {
      setStudent(linked);
      setError(null);
    } else {
      setError(
        "You can view only the student linked to your account. To link another student, contact the college office.",
      );
    }
  };

  const low = student.attendance < student.requiredAttendance;

  return (
    <>
      <Panel
        title="Student lookup"
        description="Search by roll number or name. Access is limited to the student linked to your account."
      >
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={lookup}>
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Roll number or student name"
              className="pl-9"
              aria-label="Search linked student"
            />
          </div>
          <Button type="submit">View records</Button>
        </form>
        {error ? (
          <p className="mt-3 flex gap-2 rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            <ShieldAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {error}
          </p>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            Linked student: {linked.name} · {linked.roll}
          </p>
        )}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Student" value={student.name} hint={`${student.roll} · ${student.department}`} tone="navy" />
        <StatCard
          label="Attendance"
          value={`${student.attendance}%`}
          hint={low ? `Below the required ${student.requiredAttendance}%` : `Above the required ${student.requiredAttendance}%`}
          tone={low ? "gold" : "default"}
        />
        <StatCard label="CGPA" value={student.cgpa.toFixed(1)} hint={`${student.program} · Semester ${student.semester}`} />
        <StatCard label="Year" value={`Year ${student.year}`} hint={student.department} />
      </div>

      {low ? (
        <div className="flex gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-4">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
          <div className="text-sm">
            <p className="font-semibold">Attendance alert</p>
            <p className="mt-1 text-muted-foreground">
              Current attendance is {student.attendance}%, below the required {student.requiredAttendance}%. Please
              contact the class mentor or the department office.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Academic performance" description="Semester-wise CGPA">
          <TrendLine data={student.semesterCgpa} xKey="sem" yKey="cgpa" />
        </Panel>
        <Panel title="Attendance trend" description="Month-wise attendance percentage">
          <TrendArea data={student.attendanceTrend} xKey="month" yKey="attendance" />
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Subject performance" description="Internal marks and subject attendance">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Internal</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.subjects.map((subject) => (
                  <TableRow key={subject.subject}>
                    <TableCell className="font-medium">{subject.subject}</TableCell>
                    <TableCell>
                      {subject.internal}/{subject.max}
                    </TableCell>
                    <TableCell>
                      <span className={subject.attendance < student.requiredAttendance ? "text-destructive" : ""}>
                        {subject.attendance}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
        <div className="grid gap-6">
          <Panel title="Today's timetable" description={`${student.department} · Semester ${student.semester}`}>
            <div className="space-y-2 text-sm">
              {student.timetable.map((slot) => (
                <div key={slot.time} className="flex flex-wrap items-center gap-2 rounded-xl border border-border p-3">
                  <span className="text-xs text-muted-foreground">{slot.time}</span>
                  <span className="font-medium">{slot.subject}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{slot.room}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Upcoming examinations">
            <div className="space-y-2 text-sm">
              {student.upcomingExams.map((item) => (
                <div key={item} className="rounded-xl border border-border p-3">{item}</div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Upcoming events" description="Institution calendar">
          <div className="space-y-2 text-sm">
            {UPCOMING_EVENTS.slice(0, 5).map((event) => (
              <div key={event.title} className="flex flex-wrap items-center gap-2 rounded-xl border border-border p-3">
                <CalendarDays className="size-4 text-gold" aria-hidden />
                <span className="font-medium">{event.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{event.date}</span>
              </div>
            ))}
          </div>
        </Panel>
        <NoticePanel limit={4} />
      </div>
    </>
  );
}

function FacultyDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned classes" value="5" hint="This semester" tone="navy" />
        <StatCard label="Total students" value="286" hint="Across sections" />
        <StatCard label="Attendance pending" value="3" hint="Sessions to post" tone="gold" />
        <StatCard label="Marks pending" value="2" hint="Internal assessments" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TimetablePanel />
        <Panel title="Attendance management" description="Mark attendance for today's sessions">
          <div className="space-y-3">
            {["CSE-A · DAA", "CSE-B · Operating Systems", "AI&ML-A · Machine Learning"].map((session) => (
              <div key={session} className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3">
                <span className="text-sm font-medium">{session}</span>
                <Button size="sm" className="ml-auto">Mark attendance</Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <MarksTable />
        <Panel title="Student performance" description="Section-wise average marks">
          <CategoryBars data={SUBJECT_MARKS} xKey="subject" yKey="internal" horizontal />
        </Panel>
      </div>
      <NoticePanel limit={3} />
    </>
  );
}

function ManagementDashboard() {
  const strength = DEPARTMENTS.map((d) => ({ code: d.code, students: d.students }));
  const performance = DEPARTMENTS.map((d) => ({ code: d.code, cgpa: d.avgCgpa }));

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Academic year", options: ["2026-27", "2025-26", "2024-25"] },
          { label: "Department", options: ["All departments", ...DEPARTMENTS.map((d) => d.code)] },
          { label: "Program", options: ["All programs", "B.Tech", "M.Tech", "MBA"] },
          { label: "Semester", options: ["All semesters", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"] },
        ].map((filter) => (
          <div key={filter.label} className="min-w-40">
            <label className="text-xs font-medium text-muted-foreground" htmlFor={`filter-${filter.label}`}>
              {filter.label}
            </label>
            <Select defaultValue={filter.options[0]!}>
              <SelectTrigger id={`filter-${filter.label}`} className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total students" value="2,400" tone="navy"  />
        <StatCard label="Faculty" value="155"  />
        <StatCard label="Departments" value="7" />
        <StatCard label="Programs" value="4" />
        <StatCard label="Placement rate" value="82%" tone="gold"  />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Department performance" description="Average CGPA by department">
          <CategoryBars data={performance} xKey="code" yKey="cgpa" />
        </Panel>
        <Panel title="Student strength" description="Students per department">
          <DonutChart data={strength} nameKey="code" valueKey="students" />
        </Panel>
        <Panel title="Attendance trends" description="Institution-wide">
          <TrendArea data={ATTENDANCE_TREND} xKey="month" yKey="attendance" />
        </Panel>
        <Panel title="Placement trends" description="Offers per year">
          <CategoryBars data={PLACEMENT_TREND} xKey="year" yKey="offers" />
        </Panel>
      </div>

      <Panel title="Department summary">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className="text-right">Avg CGPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEPARTMENTS.map((department) => (
                <TableRow key={department.code}>
                  <TableCell className="font-medium">{department.name}</TableCell>
                  <TableCell>{department.students}</TableCell>
                  <TableCell>{department.faculty}</TableCell>
                  <TableCell className="text-right">{department.avgCgpa}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </>
  );
}

function RecruiterDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Company" value="Northwind" hint="Profile verified" tone="navy" />
        <StatCard label="Active jobs" value="3" hint="Open postings" />
        <StatCard label="Eligible students" value="356" hint="Matching criteria" tone="gold" />
        <StatCard label="Selected" value="46" hint="Current drive" />
      </div>

      <Panel title="Placement drive pipeline" description="Registration → Eligibility → Shortlisting → Test → Interview → Selection">
        <StageFlow stages={RECRUITER_PIPELINE.map((s) => s.stage)} current={3} />
        <div className="mt-6">
          <CategoryBars data={RECRUITER_PIPELINE} xKey="stage" yKey="count" />
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Candidate shortlist" description="Candidates matching eligibility criteria">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "S-1041", branch: "CSE", cgpa: 8.9 },
                  { id: "S-1067", branch: "AI&ML", cgpa: 8.6 },
                  { id: "S-1108", branch: "ECE", cgpa: 8.1 },
                  { id: "S-1179", branch: "CSE", cgpa: 7.8 },
                ].map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">Candidate {candidate.id}</TableCell>
                    <TableCell>{candidate.branch}</TableCell>
                    <TableCell>{candidate.cgpa}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Shortlist</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Candidate identities are masked until shortlisting is confirmed. Recruiters access recruitment data only.
          </p>
        </Panel>

        <Panel title="Drives & interviews" description="Schedule and selection status">
          <div className="space-y-3">
            {COMPANIES.slice(0, 4).map((company) => (
              <div key={company.name} className="flex flex-wrap items-center gap-2 rounded-xl border border-border p-3 text-sm">
                <span className="font-medium">{company.name}</span>
                <Badge variant="secondary" className="ml-auto">{company.status}</Badge>
                <span className="text-xs text-muted-foreground">{company.offers} offers</span>
              </div>
            ))}
            <Button className="w-full">Create job posting</Button>
          </div>
        </Panel>
      </div>
    </>
  );
}

function TrainerDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Programs" value="4" tone="navy" />
        <StatCard label="Batches" value="8" hint="Across programs" />
        <StatCard label="Learners" value="315" tone="gold" />
        <StatCard label="Avg progress" value="60%" hint="Curriculum completion" />
      </div>

      <Panel title="Batches" description="Program progress and next session">
        <div className="grid gap-4 sm:grid-cols-2">
          {TRAINING_BATCHES.map((batch) => (
            <div key={batch.batch} className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{batch.program}</p>
                <Badge variant="secondary">{batch.batch}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{batch.learners} learners · next: {batch.next}</p>
              <Progress value={batch.progress} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">{batch.progress}% complete</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Skill analytics" description="Cohort average by skill">
          <CategoryBars data={SKILL_ANALYTICS} xKey="skill" yKey="score" horizontal />
        </Panel>
        <Panel title="Assessments & attendance">
          <div className="space-y-3 text-sm">
            {["Graphs assessment — 88 submissions", "Aptitude test 4 — scheduled", "Mock interview round 2 — in progress"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <ClipboardList className="size-4 text-gold" aria-hidden />
                  {item}
                </div>
              ),
            )}
            <Button variant="outline" className="w-full">Mark batch attendance</Button>
          </div>
        </Panel>
      </div>
    </>
  );
}

function AuthorityDashboard() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {AUTHORITY_BODIES.map((body) => (
          <Badge key={body} variant="secondary">{body}</Badge>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Students" value="2,400" tone="navy"  />
        <StatCard label="Faculty" value="155"  />
        <StatCard label="Programs" value="4" />
        <StatCard label="Placement rate" value="82%" tone="gold"  />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Academic performance" description="Average CGPA by department">
          <CategoryBars data={DEPARTMENTS.map((d) => ({ code: d.code, cgpa: d.avgCgpa }))} xKey="code" yKey="cgpa" />
        </Panel>
        <Panel title="Placement data" description="Offers per year">
          <TrendLine data={PLACEMENT_TREND} xKey="year" yKey="offers" />
        </Panel>
      </div>
      <Panel title="Accreditation & compliance documents" description="Read-only institutional records" action={
        <Button asChild variant="outline" size="sm"><Link to="/services">Document centre</Link></Button>
      }>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Accreditation self study report", "AICTE approval document", "UGC compliance report", "JNTUK affiliation letter"].map(
            (item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm">
                <Landmark className="size-4 text-gold" aria-hidden />
                {item}
              </div>
            ),
          )}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Integration-ready interface only — no external authority system is connected or simulated.
        </p>
      </Panel>
    </>
  );
}

function AdminDashboard() {
  const groups = [
    { title: "Users", items: ["Students", "Parents", "Faculty", "Staff", "Recruiters", "Trainers"], icon: Users },
    { title: "Academic", items: ["Departments", "Programs", "Courses", "Attendance", "Marks", "Results", "Timetable"], icon: GraduationCap },
    { title: "Content", items: ["Notices", "Events", "Documents", "Announcements"], icon: FileText },
    { title: "Placements", items: ["Companies", "Jobs", "Drives", "Applications"], icon: Bot },
    { title: "System", items: ["Roles", "Permissions", "Settings", "Audit logs"], icon: ShieldAlert },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value="2,714" tone="navy"  />
        <StatCard label="Pending approvals" value="12" tone="gold" />
        <StatCard label="Open grievances" value="7" />
        <StatCard label="Audit events today" value="184" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Panel key={group.title} title={group.title}>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="secondary">{item}</Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              <group.icon className="size-4" aria-hidden />
              Manage {group.title.toLowerCase()}
            </Button>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Certificate approvals" description="Requests awaiting action">
          <StageFlow stages={CERTIFICATE_STAGES} current={2} />
          <div className="mt-4 space-y-2 text-sm">
            {["CRT-104582 · Bonafide", "CRT-104588 · Study certificate", "CRT-104593 · Course completion"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <BadgeCheck className="size-4 text-gold" aria-hidden />
                {item}
                <Button size="sm" variant="outline" className="ml-auto">Approve</Button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Recent audit log" description="entries">
          <div className="space-y-2 text-xs text-muted-foreground">
            {[
              "09:12 — faculty.rao updated internal marks (CSE-A · DAA)",
              "09:04 — admin.desk published notice NTC-2401",
              "08:51 — recruiter.northwind shortlisted 12 candidates",
              "08:33 — trainer.team marked attendance for batch DSA-B",
            ].map((entry) => (
              <p key={entry} className="rounded-lg border border-border p-2.5">{entry}</p>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function GovernmentDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INSTITUTION.campus.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Institution profile" className="lg:col-span-2">
          <div className="space-y-3 text-sm">
            <p className="font-semibold">{INSTITUTION.name} ({INSTITUTION.shortName})</p>
            <p className="text-muted-foreground">{INSTITUTION.location}</p>
            <p className="text-muted-foreground">{INSTITUTION.about}</p>
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs tracking-wide uppercase text-muted-foreground">Affiliation & approval</p>
              <p className="mt-1">{INSTITUTION.affiliation}</p>
            </div>
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs tracking-wide uppercase text-muted-foreground">Principal</p>
              <p className="mt-1 font-medium">{INSTITUTION.principal.name}</p>
              <p className="text-muted-foreground">{INSTITUTION.principal.designation}</p>
            </div>
          </div>
        </Panel>
        <Panel title="Programmes offered">
          <div className="space-y-2 text-sm">
            {ACADEMIC_FACTS.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
                <span className="text-muted-foreground">{fact.label}</span>
                <span className="font-semibold">{fact.value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Placement trend" description="Year-wise placement performance">
          <TrendArea data={PLACEMENT_TREND} xKey="year" yKey="placed" />
        </Panel>
        <Panel title="Placement & research highlights">
          <div className="grid gap-2 sm:grid-cols-2">
            {[...PLACEMENT_FACTS, ...RESEARCH_FACTS].map((fact) => (
              <div key={fact.label} className="rounded-xl border border-border p-3">
                <p className="text-xs text-muted-foreground">{fact.label}</p>
                <p className="mt-1 font-display text-lg font-bold">{fact.value}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Departments" description="Department-wise academic structure">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Faculty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEPARTMENTS.map((department) => (
                  <TableRow key={department.code}>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell className="text-muted-foreground">{department.students}</TableCell>
                    <TableCell className="text-muted-foreground">{department.faculty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
        <div className="grid gap-6">
          <Panel title="Document centre" description="Institutional and compliance documents">
            <div className="space-y-2 text-sm">
              {DOCUMENT_CENTER.map((document) => (
                <div key={document.name} className="flex flex-wrap items-center gap-2 rounded-xl border border-border p-3">
                  <FileText className="size-4 text-gold" aria-hidden />
                  <span className="font-medium">{document.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{document.type} · {document.size}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Access scope">
            <p className="flex gap-2 text-sm text-muted-foreground">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              {RESTRICTED_NOTE}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {AUTHORITY_BODIES.map((body) => (
                <Badge key={body} variant="secondary" className="text-[10px]">{body}</Badge>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function JntukDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Affiliation" value="JNTUK" hint="Affiliated engineering institution" tone="navy" />
        <StatCard label="Departments" value={String(DEPARTMENTS.length)} hint="Academic departments" />
        {ACADEMIC_FACTS.slice(0, 2).map((fact) => (
          <StatCard key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Examination information" description="Notifications, schedules, timetables and results">
          <div className="space-y-2 text-sm">
            {JNTUK_EXAM_ITEMS.map((item) => (
              <div key={item.title} className="rounded-xl border border-border p-3">
                <p className="flex items-center gap-2 font-medium">
                  <ScrollText className="size-4 text-gold" aria-hidden />
                  {item.title}
                </p>
                <p className="mt-1 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </Panel>
        <div className="grid gap-6">
          <Panel title="Academic information" description="Curriculum, syllabus, regulations and calendar">
            <div className="space-y-2 text-sm">
              {JNTUK_ACADEMIC_ITEMS.map((item) => (
                <div key={item.title} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Reports">
            <div className="space-y-2 text-sm">
              {JNTUK_REPORTS.map((report) => (
                <div key={report} className="flex items-center gap-2 rounded-xl border border-border p-3">
                  <FileText className="size-4 text-gold" aria-hidden />
                  <span className="font-medium">{report}</span>
                  <Button variant="outline" size="sm" className="ml-auto">Open</Button>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="College information" className="lg:col-span-2">
          <div className="space-y-3 text-sm">
            <p className="font-semibold">{INSTITUTION.name}</p>
            <p className="text-muted-foreground">{INSTITUTION.location}</p>
            <p className="text-muted-foreground">{INSTITUTION.affiliation}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {INSTITUTION.campus.map((item) => (
                <div key={item.label} className="rounded-xl border border-border p-3">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Panel title="Access scope">
          <p className="flex gap-2 text-sm text-muted-foreground">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            {RESTRICTED_NOTE}
          </p>
        </Panel>
      </div>
    </>
  );
}

const META: Record<RoleId, { user: string; meta: string; render: () => ReactElement }> = {
  student: { user: "Welcome back", meta: "B.Tech CSE \u00b7 Semester VI", render: StudentDashboard },
  parent: { user: "Parent portal", meta: "Records of your linked student only", render: ParentDashboard },
  faculty: { user: "Welcome, Faculty", meta: "Department of CSE \u00b7 Professor", render: FacultyDashboard },
  management: { user: "Institution analytics", meta: "All departments \u00b7 A.Y. 2026-27", render: ManagementDashboard },
  recruiter: { user: "Recruiter Workspace", meta: "Recruitment workspace \u00b7 verified company", render: RecruiterDashboard },
  trainer: { user: "Trainer workspace", meta: "Skill development & placement training", render: TrainerDashboard },
  government: { user: "Government Authority", meta: "Authorised institutional information \u00b7 read-only", render: GovernmentDashboard },
  jntuk: { user: "JNTUK Authority", meta: "Examination & academic information \u00b7 read-only", render: JntukDashboard },
  authority: { user: "Institutional reporting", meta: "Authorised authority access \u00b7 read-only", render: AuthorityDashboard },
  admin: { user: "Administration", meta: "System administration & governance", render: AdminDashboard },
};

function DashboardPage() {
  const { role } = Route.useParams();
  const roleId = role as RoleId;
  const config = META[roleId] ?? META.student;
  const Body = config.render;
  const { session, ready } = useSession();

  if (!ready) return null;

  if (!session || session.role !== roleId) {
    return (
      <div className="container-page flex min-h-screen flex-col items-center justify-center gap-4 py-20 text-center">
        <ShieldAlert className="size-10 text-gold" aria-hidden />
        <h1 className="text-2xl font-bold">Sign in required</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The {ROLE_LABEL[roleId]} dashboard is available only to a signed-in {ROLE_LABEL[roleId].toLowerCase()}{" "}
          account. Register first if you do not have an account yet.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link to="/login" search={{ role: roleId }}>Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register" search={{ role: roleId }}>Register</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/portal">All portals</Link>
          </Button>
        </div>
      </div>
    );
  }

  const displayName = session.name ? session.name : config.user;

  return (
    <DashboardShell role={roleId} user={displayName} meta={config.meta}>
      <Body />
    </DashboardShell>
  );
}

