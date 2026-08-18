import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { PageShell } from "@/components/site/page-shell";
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
import { loginAccount } from "@/lib/auth";
import { ROLE_LABEL, type RoleId } from "@/lib/campus-data";
import { REGISTER_ROLES } from "@/lib/role-forms";

const ROLE_IDS = [
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
] as const;

const searchSchema = z.object({
  role: z.enum(ROLE_IDS).catch("student"),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in | BVCITS Integrated Digital Campus" },
      {
        name: "description",
        content:
          "Sign in to the BVCITS Integrated Digital Campus with your role — student, parent, faculty, management, recruiter, trainer, authority or administrator.",
      },
      { property: "og:title", content: "Sign in to BVCITS Digital Campus" },
      { property: "og:description", content: "Role-based sign-in for the BVCITS digital campus portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { role } = Route.useSearch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<RoleId>(role);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <PageShell>
      <section className="surface-navy">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Badge className="border-gold/40 bg-gold/15 text-gold">Secure access</Badge>
            <h1 className="mt-5 text-3xl font-bold md:text-4xl">Sign in to your dashboard</h1>
            <p className="mt-4 max-w-lg text-sm opacity-80">
              Authentication is role-based. Signing in opens the selected role&apos;s dashboard with
              row-level data access limited to that role.
            </p>
            <ul className="mt-6 space-y-2 text-sm opacity-80">
              {["Protected role-based routes", "Own-records-only data access", "Audit-ready activity logging"].map(
                (item) => (
                  <li key={item} className="flex gap-2">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <Card className="shadow-elevated">
            <CardHeader>
              <KeyRound className="size-5 text-gold" aria-hidden />
              <CardTitle className="text-lg">Portal sign-in</CardTitle>
              <CardDescription>Sign in with your institutional credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setError(null);
                  const result = loginAccount({ role: selected, email, password });
                  if (!result.ok) {
                    setError(result.error ?? "Sign in failed.");
                    return;
                  }
                  navigate({ to: "/dashboard/$role", params: { role: selected } });
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="login-role">Sign in as</Label>
                  <Select value={selected} onValueChange={(value) => setSelected(value as RoleId)}>
                    <SelectTrigger id="login-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REGISTER_ROLES.map((item) => (
                        <SelectItem key={item} value={item}>
                          {ROLE_LABEL[item]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-id">User ID / Email</Label>
                  <Input
                    id="login-id"
                    type="email"
                    required
                    maxLength={255}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Your password"
                  />
                </div>
                {error ? (
                  <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}
                <Button type="submit" size="lg">
                  Continue to {ROLE_LABEL[selected]} dashboard
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  New user?{" "}
                  <Link to="/register" search={{ role: selected }} className="underline">
                    Register first
                  </Link>
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  Need help? <Link to="/contact" className="underline">Contact the office</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
