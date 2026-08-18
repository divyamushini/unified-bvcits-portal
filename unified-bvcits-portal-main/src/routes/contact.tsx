import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BVCITS | Cells, Departments & Enquiries" },
      {
        name: "description",
        content:
          "Contact the BVCITS office, examination cell, admissions cell, placement cell and departments, or send an enquiry through the digital campus portal.",
      },
      { property: "og:title", content: "Contact BVCITS" },
      {
        property: "og:description",
        content: "Office, examination cell, admissions, placements and department contacts.",
      },
    ],
  }),
  component: ContactPage,
});

const CELLS = [
  { name: "College office", detail: "General enquiries, certificates and records" },
  { name: "Admissions cell", detail: "Program eligibility, counselling and reporting" },
  { name: "Examination cell", detail: "Hall tickets, results, revaluation and grievances" },
  { name: "Training & placement cell", detail: "Drives, internships and recruiter relations" },
  { name: "Scholarship section", detail: "Government and institutional scholarships" },
  { name: "Hostel & transport", detail: "Accommodation and bus routes" },
];

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        description="Reach the right cell directly, or send an enquiry through the portal."
      />

      <Section title="Reach the right desk">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CELLS.map((cell) => (
            <Card key={cell.name} className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">{cell.name}</CardTitle>
                <CardDescription>{cell.detail}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-gold" aria-hidden /> +91 00000 00000
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-4 text-gold" aria-hidden /> cell@example.edu
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Campus & enquiry">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Campus address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                BVC Institute of Technology &amp; Science, Amalapuram, Dr. B. R. Ambedkar Konaseema District,
                Andhra Pradesh .
              </p>
              <p className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                Office hours: Monday – Saturday, 9:30 AM – 5:00 PM.
              </p>
              <InfoNote>Verify address, phone numbers and email IDs with the official BVCITS office.</InfoNote>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Send an enquiry</CardTitle>
              <CardDescription>form — submissions are not stored yet.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  toast.success("Enquiry submitted");
                  event.currentTarget.reset();
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" required placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" required placeholder="you@example.com" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input id="contact-subject" required placeholder="What is this about?" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" rows={5} required placeholder="Write your message" />
                </div>
                <Button type="submit" className="sm:col-span-2">
                  <Send className="size-4" aria-hidden />
                  Send enquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </PageShell>
  );
}
