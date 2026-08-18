import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, GraduationCap, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { InfoNote, PageHero, PageShell, Section } from "@/components/site/page-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Textarea } from "@/components/ui/textarea";
import { FAQS, PROGRAMS, SCHOLARSHIPS } from "@/lib/campus-data";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions | BVCITS Integrated Digital Campus" },
      {
        name: "description",
        content:
          "BVCITS admissions: programs, eligibility, admission process, scholarships, important dates, FAQs and an online admission enquiry form.",
      },
      { property: "og:title", content: "Admissions at BVCITS" },
      {
        property: "og:description",
        content: "Programs, eligibility, admission process, scholarships, important dates and admission enquiry.",
      },
    ],
  }),
  component: AdmissionsPage,
});

const PROCESS = [
  { step: "1", title: "Qualify entrance exam", text: "AP EAPCET / ECET / PGECET / ICET as applicable to the program." },
  { step: "2", title: "Attend counselling", text: "Participate in the state counselling process and select BVCITS." },
  { step: "3", title: "Document verification", text: "Report with original certificates for verification." },
  { step: "4", title: "Fee payment & reporting", text: "Complete fee formalities and confirm admission at the college." },
  { step: "5", title: "Portal onboarding", text: "Receive digital campus credentials for the Student Portal." },
];

const DATES = [
  { label: "Application window", value: "Will be updated" },
  { label: "Counselling schedule", value: "Will be updated" },
  { label: "Document verification", value: "Will be updated" },
  { label: "Class commencement", value: "Will be updated" },
];

function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell>
      <PageHero
        eyebrow="Admissions"
        title="Admissions"
        description="Program-wise eligibility, the admission process, scholarships and key dates. Submit an enquiry and the admissions office will follow up with the official procedure."
      />

      <Section title="Programs & eligibility">
        <div className="grid gap-4 sm:grid-cols-2">
          {PROGRAMS.map((program) => (
            <Card key={program.name} className="shadow-card">
              <CardHeader>
                <GraduationCap className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">{program.name}</CardTitle>
                <CardDescription>
                  {program.duration} · {program.mode} · Entry via {program.entry}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Eligibility as per university and state admission norms. Sanctioned intake:{" "}
                {program.intake}.
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <InfoNote>Eligibility criteria and intake are indicative; confirm with the admissions office.</InfoNote>
        </div>
      </Section>

      <Section title="Admission process">
        <ol className="grid gap-4 md:grid-cols-5">
          {PROCESS.map((item) => (
            <li key={item.step} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="grid size-9 place-items-center rounded-xl bg-gold/20 font-display text-sm font-bold">
                {item.step}
              </span>
              <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Scholarships">
        <div className="grid gap-4 lg:grid-cols-3">
          {SCHOLARSHIPS.map((scholarship) => (
            <Card key={scholarship.name} className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">{scholarship.name}</CardTitle>
                <CardDescription>{scholarship.eligibility}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Deadline: {scholarship.deadline}</p>
                <ul className="space-y-1">
                  {scholarship.documents.map((document) => (
                    <li key={document} className="flex gap-2 text-xs">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden />
                      {document}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Important dates">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATES.map((date) => (
            <div key={date.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <CalendarClock className="size-5 text-gold" aria-hidden />
              <p className="mt-3 text-sm font-semibold">{date.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{date.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="apply" title="Apply now / admission enquiry" description="Submit an admission enquiry and the admissions office will get in touch.">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card className="shadow-card">
            <CardContent className="p-6">
              {submitted ? (
                <div className="space-y-3 text-center">
                  <CheckCircle2 className="mx-auto size-10 text-gold" aria-hidden />
                  <h3 className="text-lg font-semibold">Enquiry recorded</h3>
                  <p className="text-sm text-muted-foreground">
                    Reference ID: ENQ-{Math.floor(100000 + Math.random() * 899999)}. The admissions office will
                    contact you with the official process.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Submit another enquiry
                  </Button>
                </div>
              ) : (
                <form
                  className="grid gap-4 sm:grid-cols-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                    toast.success("Admission enquiry submitted");
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="applicant-name">Applicant name</Label>
                    <Input id="applicant-name" required placeholder="Full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="applicant-phone">Phone</Label>
                    <Input id="applicant-phone" required type="tel" placeholder="10-digit mobile" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="applicant-email">Email</Label>
                    <Input id="applicant-email" required type="email" placeholder="you@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="applicant-program">Program of interest</Label>
                    <Select required>
                      <SelectTrigger id="applicant-program">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROGRAMS.map((program) => (
                          <SelectItem key={program.name} value={program.name}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="applicant-entrance">Entrance exam</Label>
                    <Input id="applicant-entrance" placeholder="e.g. AP EAPCET" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="applicant-message">Message</Label>
                    <Textarea id="applicant-message" rows={4} placeholder="Your question for the admissions office" />
                  </div>
                  <Button type="submit" className="sm:col-span-2">
                    <Send className="size-4" aria-hidden />
                    Submit enquiry
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Frequently asked questions</CardTitle>
              <CardDescription>Common questions from applicants and parents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {FAQS.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-sm">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </Section>
    </PageShell>
  );
}
