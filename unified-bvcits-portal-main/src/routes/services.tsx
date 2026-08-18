import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Download, FileText, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { StageFlow } from "@/components/dashboard/dashboard-shell";
import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CERTIFICATE_STAGES,
  CERTIFICATE_TYPES,
  DOCUMENT_CATEGORIES,
  DOCUMENT_CENTER,
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_STAGES,
  LIBRARY_BOOKS,
  SCHOLARSHIPS,
} from "@/lib/campus-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Student Services | BVCITS Digital Campus Modules" },
      {
        name: "description",
        content:
          "BVCITS student services: examination, digital library, grievance management, certificate services, scholarships and the institutional document centre.",
      },
      { property: "og:title", content: "Student Services at BVCITS" },
      {
        property: "og:description",
        content: "Examination, library, grievances, certificates, scholarships and document centre modules.",
      },
    ],
  }),
  component: ServicesPage,
});

const EXAM_ITEMS = [
  "Examination notifications",
  "Examination timetable",
  "Hall ticket download",
  "Results & marks memo",
  "Internal marks",
  "Previous question papers",
  "Model papers",
  "Revaluation application",
  "Regulations",
];

function ServicesPage() {
  const [bookQuery, setBookQuery] = useState("");
  const [bookCategory, setBookCategory] = useState("All");
  const [docQuery, setDocQuery] = useState("");
  const [docCategory, setDocCategory] = useState("All");
  const [grievanceId, setGrievanceId] = useState<string | null>(null);

  const bookCategories = useMemo(
    () => ["All", ...Array.from(new Set(LIBRARY_BOOKS.map((book) => book.category)))],
    [],
  );

  const books = LIBRARY_BOOKS.filter((book) => {
    const q = bookQuery.trim().toLowerCase();
    return (
      (bookCategory === "All" || book.category === bookCategory) &&
      (!q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q))
    );
  });

  const documents = DOCUMENT_CENTER.filter((document) => {
    const q = docQuery.trim().toLowerCase();
    return (
      (docCategory === "All" || document.category === docCategory) &&
      (!q || document.name.toLowerCase().includes(q))
    );
  });

  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title="Student Services"
        description="Examination, library, grievances, certificates, scholarships and documents — each service is a workflow with a clear status, not a static page."
      />

      <section className="container-page py-12">
        <Tabs defaultValue="examination">
          <TabsList className="flex-wrap">
            <TabsTrigger value="examination">Examination</TabsTrigger>
            <TabsTrigger value="library">Digital Library</TabsTrigger>
            <TabsTrigger value="grievance">Grievances</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="documents">Document Centre</TabsTrigger>
          </TabsList>

          <TabsContent value="examination" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {EXAM_ITEMS.map((item) => (
                <Card key={item} className="shadow-card">
                  <CardHeader>
                    <FileText className="size-5 text-gold" aria-hidden />
                    <CardTitle className="text-sm">{item}</CardTitle>
                    <CardDescription>Available to signed-in students in the Student Portal.</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <InfoNote>Examination schedules and results are published by the Examination Cell.</InfoNote>
            </div>
          </TabsContent>

          <TabsContent value="library" className="mt-8 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  value={bookQuery}
                  onChange={(event) => setBookQuery(event.target.value)}
                  placeholder="Search by title or author"
                  className="pl-9"
                  aria-label="Search books"
                />
              </div>
              <Select value={bookCategory} onValueChange={setBookCategory}>
                <SelectTrigger className="sm:w-56" aria-label="Filter by category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bookCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Availability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                        No books match your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    books.map((book) => (
                      <TableRow key={book.title}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell className="text-right">
                          {book.available > 0 ? (
                            <Badge variant="secondary">{book.available} of {book.total} available</Badge>
                          ) : (
                            <Badge variant="destructive">All issued</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {["Issued books & due dates", "Digital resources & e-journals", "Previous papers & project reports"].map(
                (item) => (
                  <Card key={item} className="shadow-card">
                    <CardHeader>
                      <BookOpen className="size-5 text-gold" aria-hidden />
                      <CardTitle className="text-sm">{item}</CardTitle>
                    </CardHeader>
                  </Card>
                ),
              )}
            </div>
          </TabsContent>

          <TabsContent value="grievance" className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Submit a grievance</CardTitle>
                <CardDescription>Submit a request and track its status through the portal.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const id = `GRV-${Math.floor(100000 + Math.random() * 899999)}`;
                    setGrievanceId(id);
                    toast.success(`Grievance submitted — ${id}`);
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="grievance-category">Category</Label>
                    <Select required>
                      <SelectTrigger id="grievance-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRIEVANCE_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="grievance-subject">Subject</Label>
                    <Input id="grievance-subject" required placeholder="Short summary" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="grievance-detail">Details</Label>
                    <Textarea id="grievance-detail" rows={4} required placeholder="Describe the issue" />
                  </div>
                  <Button type="submit">Submit grievance</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Resolution workflow</CardTitle>
                <CardDescription>Every grievance moves through four tracked stages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <StageFlow stages={GRIEVANCE_STAGES} current={grievanceId ? 0 : -1} />
                {grievanceId ? (
                  <div className="rounded-xl border border-gold/50 bg-gold/10 p-4 text-sm">
                    <p className="font-semibold">Grievance ID: {grievanceId}</p>
                    <p className="mt-1 text-muted-foreground">
                      Current status: Submitted. You will be notified as the status changes.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Submit a grievance to see the tracking ID and live status here.
                  </p>
                )}
                <div className="rounded-xl border border-border p-4 text-xs text-muted-foreground">
                  <ShieldCheck className="mb-2 size-4 text-gold" aria-hidden />
                  Grievances are visible only to the complainant and the authorised resolving cell.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Request a certificate</CardTitle>
                <CardDescription>Bonafide, study, course completion and custom requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    toast.success("Certificate request raised");
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="certificate-type">Certificate type</Label>
                    <Select required>
                      <SelectTrigger id="certificate-type">
                        <SelectValue placeholder="Select certificate" />
                      </SelectTrigger>
                      <SelectContent>
                        {CERTIFICATE_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="certificate-purpose">Purpose</Label>
                    <Input id="certificate-purpose" required placeholder="e.g. bank loan, passport" />
                  </div>
                  <Button type="submit">Raise request</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Approval workflow</CardTitle>
                <CardDescription>Requests are verified before generation.</CardDescription>
              </CardHeader>
              <CardContent>
                <StageFlow stages={CERTIFICATE_STAGES} current={1} />
                <p className="mt-4 text-sm text-muted-foreground">
                  Sample request CRT-104582 is currently at Department Verification.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships" className="mt-8 grid gap-4 lg:grid-cols-3">
            {SCHOLARSHIPS.map((scholarship) => (
              <Card key={scholarship.name} className="shadow-card">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">{scholarship.status}</Badge>
                  <CardTitle className="mt-2 text-base">{scholarship.name}</CardTitle>
                  <CardDescription>{scholarship.eligibility}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-muted-foreground">
                  <p>Deadline: {scholarship.deadline}</p>
                  <ul className="list-inside list-disc space-y-1">
                    {scholarship.documents.map((document) => (
                      <li key={document}>{document}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="documents" className="mt-8 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  value={docQuery}
                  onChange={(event) => setDocQuery(event.target.value)}
                  placeholder="Search documents"
                  className="pl-9"
                  aria-label="Search documents"
                />
              </div>
              <Select value={docCategory} onValueChange={setDocCategory}>
                <SelectTrigger className="sm:w-56" aria-label="Filter documents by category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["All", ...DOCUMENT_CATEGORIES].map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                        No documents match your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    documents.map((document) => (
                      <TableRow key={document.name}>
                        <TableCell className="font-medium">{document.name}</TableCell>
                        <TableCell>{document.category}</TableCell>
                        <TableCell>{document.type} · {document.size}</TableCell>
                        <TableCell className="text-muted-foreground">{document.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => toast.info("Document will be updated by the respective office")}>
                            <Download className="size-4" aria-hidden />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </PageShell>
  );
}
