import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, Medal, Music, Trophy, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { PageHero, PageShell, Section } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CLUBS, UPCOMING_EVENTS } from "@/lib/campus-data";
import bv1 from "@/assets/bv1.jpg";
import bv2 from "@/assets/bv2.jpg";
import bv3 from "@/assets/bv3.jpg";
import bv4 from "@/assets/bv4.jpg";
import bv5 from "@/assets/bv5.jpg";
import bv6 from "@/assets/bv6.jpg";
import bv7 from "@/assets/bv7.jpg";
import bv8 from "@/assets/bv8.jpg";

const GALLERY = [
  { src: bv1, title: "Main academic block", alt: "Aerial view of the BVCITS main academic block and campus greenery" },
  { src: bv2, title: "Institution emblem", alt: "B.V.C. Institute of Technology & Science, Amalapuram emblem" },
  { src: bv3, title: "Administrative atrium", alt: "Interior atrium of the BVCITS administrative block" },
  { src: bv4, title: "Campus entrance arch", alt: "Entrance arch of BVCITS, Amalapuram" },
  { src: bv5, title: "College transport fleet", alt: "BVC Engineering Colleges buses parked on campus" },
  { src: bv6, title: "Central library & EEE block", alt: "Central Library and Department of EEE building at BVCITS" },
  { src: bv7, title: "Mess block", alt: "Mess block surrounded by lawns at BVCITS" },
  { src: bv8, title: "IoT workshop participants", alt: "Faculty and students at an IoT workshop held at BVCITS" },
];

export const Route = createFileRoute("/campus-life")({
  head: () => ({
    meta: [
      { title: "Campus Life | Events, Clubs, Sports & Achievements" },
      {
        name: "description",
        content:
          "BVCITS campus life: events, student clubs, sports, cultural activities, achievements and campus gallery.",
      },
      { property: "og:title", content: "Campus Life at BVCITS" },
      {
        property: "og:description",
        content: "Events, clubs, sports, cultural activities, achievements and gallery.",
      },
    ],
  }),
  component: CampusLifePage,
});

const ACHIEVEMENTS = [
  { title: "Inter-college hackathon — runners up", year: "2026" },
  { title: "State-level volleyball championship", year: "2025" },
  { title: "Cultural fest best team award", year: "2025" },
  { title: "NSS district recognition", year: "2024" },
];

const SPORTS = ["Cricket", "Volleyball", "Basketball", "Kabaddi", "Athletics", "Chess", "Badminton", "Table tennis"];

function CampusLifePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Campus Life"
        title="Campus Life"
        description="Clubs, events, sports, cultural activities and student achievements — the part of campus that grows confidence alongside academics."
      />

      <Section title="Upcoming events">
        <div className="grid gap-4 sm:grid-cols-3">
          {UPCOMING_EVENTS.map((event) => (
            <Card key={event.title} className="shadow-card">
              <CardHeader>
                <CalendarDays className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">{event.title}</CardTitle>
                <CardDescription>
                  {event.date} · {event.place}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Student clubs">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLUBS.map((club) => (
            <Card key={club.name} className="shadow-card">
              <CardHeader>
                <Users className="size-5 text-gold" aria-hidden />
                <CardTitle className="text-base">{club.name}</CardTitle>
                <CardDescription>{club.focus}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{club.members} members</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Sports & cultural activities">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <Trophy className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Sports</CardTitle>
              <CardDescription>Inter-department and inter-college participation.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {SPORTS.map((sport) => (
                <Badge key={sport} variant="secondary">{sport}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <Music className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-base">Cultural activities</CardTitle>
              <CardDescription>
                Annual fest, music and dance, drama, literary events, photography and technical exhibitions
                organised by student clubs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Section>

      <Section title="Achievements">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((achievement) => (
            <div key={achievement.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <Medal className="size-5 text-gold" aria-hidden />
              <p className="mt-3 text-sm font-semibold">{achievement.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{achievement.year}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Gallery" description="Campus views published by the institution.">
        <CampusGallery />
      </Section>
    </PageShell>
  );
}

function CampusGallery() {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;

  const step = useCallback((delta: number) => {
    setActive((current) =>
      current === null ? current : (current + delta + GALLERY.length) % GALLERY.length,
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = active === null ? null : GALLERY[active];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GALLERY.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-secondary shadow-card transition hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-left text-xs font-semibold text-foreground">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(value) => !value && setActive(null)}>
        <DialogContent className="max-w-4xl">
          {current ? (
            <div className="space-y-4">
              <DialogTitle className="text-base">{current.title}</DialogTitle>
              <div className="overflow-hidden rounded-xl border border-border bg-secondary">
                <img src={current.src} alt={current.alt} className="max-h-[70vh] w-full object-contain" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Button variant="outline" size="sm" onClick={() => step(-1)}>
                  <ChevronLeft className="size-4" aria-hidden /> Previous
                </Button>
                <span className="text-xs text-muted-foreground">
                  {(active ?? 0) + 1} / {GALLERY.length}
                </span>
                <Button variant="outline" size="sm" onClick={() => step(1)}>
                  Next <ChevronRight className="size-4" aria-hidden />
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
