import { createFileRoute } from "@tanstack/react-router";
import { Pin, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHero, PageShell } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NOTICES, NOTICE_CATEGORIES, type NoticeCategory } from "@/lib/campus-data";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notification Centre | BVCITS Digital Campus" },
      {
        name: "description",
        content:
          "Searchable BVCITS notification centre for academic, examination, placement, admissions, scholarship, event and general notices.",
      },
      { property: "og:title", content: "BVCITS Notification Centre" },
      {
        property: "og:description",
        content: "Search and filter academic, examination, placement, admissions, scholarship and event notices.",
      },
    ],
  }),
  component: NoticesPage,
});

function NoticesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NoticeCategory | "All">("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NOTICES.filter((notice) => {
      const matchesCategory = category === "All" || notice.category === category;
      const matchesQuery =
        !q ||
        notice.title.toLowerCase().includes(q) ||
        notice.summary.toLowerCase().includes(q) ||
        notice.audience.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));
  }, [query, category]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Notifications"
        title="Notification Centre"
        description="One searchable feed for every official communication — academic, examination, placement, admissions, scholarships, events and general circulars."
      />

      <section className="container-page py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notices by title, audience or keyword"
              className="pl-9"
              aria-label="Search notices"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", ...NOTICE_CATEGORIES] as const).map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item as NoticeCategory | "All")}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "notice" : "notices"} found
        </p>

        <div className="mt-4 space-y-4">
          {results.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="p-10 text-center">
                <p className="text-sm font-medium">No notices match your search</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different keyword or clear the category filter.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                >
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            results.map((notice) => (
              <Card key={notice.id} className="shadow-card transition-colors hover:border-gold">
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{notice.category}</Badge>
                      {notice.pinned ? (
                        <Badge className="border-gold/40 bg-gold/15 text-foreground">
                          <Pin className="size-3" aria-hidden /> Pinned
                        </Badge>
                      ) : null}
                      <span className="text-xs text-muted-foreground">{notice.date}</span>
                      <span className="text-xs text-muted-foreground">· {notice.id}</span>
                    </div>
                    <h2 className="mt-2 text-base font-semibold">{notice.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{notice.summary}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Audience: {notice.audience}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    View details
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </PageShell>
  );
}
