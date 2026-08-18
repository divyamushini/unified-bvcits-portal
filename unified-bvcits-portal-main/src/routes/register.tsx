import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
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
import { registerAccount } from "@/lib/auth";
import { AUTHORISED_ROLES, ROLE_LABEL, type RoleId } from "@/lib/campus-data";
import { REGISTER_ROLES, ROLE_BLURB, ROLE_FIELDS } from "@/lib/role-forms";

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

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Create an Account | BVCITS Integrated Digital Campus" },
      {
        name: "description",
        content:
          "Register for the BVCITS Integrated Digital Campus as a student, parent, faculty member, management user, recruiter, trainer, government authority or JNTUK authority.",
      },
      { property: "og:title", content: "Register — BVCITS Digital Campus" },
      {
        property: "og:description",
        content: "Create your role-based BVCITS digital campus account, then sign in to your dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be less than 72 characters.");

function RegisterPage() {
  const { role } = Route.useSearch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<RoleId>(role);
  const [values, setValues] = useState<Record<string, string>>({});
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const fields = useMemo(() => ROLE_FIELDS[selected], [selected]);
  const requiresAuthorisation = AUTHORISED_ROLES.includes(selected);

  const set = (name: string, value: string) => setValues((prev) => ({ ...prev, [name]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const email = (values["email"] ?? "").trim();
    const emailCheck = z.string().trim().email("Enter a valid email address.").max(255).safeParse(email);
    if (!emailCheck.success) {
      setError(emailCheck.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    const passwordCheck = passwordSchema.safeParse(password);
    if (!passwordCheck.success) {
      setError(passwordCheck.error.issues[0]?.message ?? "Invalid password.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    for (const field of fields) {
      if (!(values[field.name] ?? "").trim()) {
        setError(`${field.label} is required.`);
        return;
      }
    }

    const nameField = fields.find((field) => field.primary)?.name ?? "fullName";
    const result = registerAccount({
      role: selected,
      email,
      password,
      name: values[nameField] ?? "",
      fields: values,
    });

    if (!result.ok) {
      setError(result.error ?? "Registration could not be completed.");
      return;
    }
    setDone(true);
  };

  return (
    <PageShell>
      <section className="surface-navy">
        <div className="container-page grid items-start gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
          <div>
            <Badge className="border-gold/40 bg-gold/15 text-gold">Step 1 of 2 — Registration</Badge>
            <h1 className="mt-5 text-3xl font-bold md:text-4xl">Create your campus account</h1>
            <p className="mt-4 max-w-lg text-sm opacity-80">
              Registration comes first. Choose your role, complete the role-specific details, then sign in to open
              your dashboard.
            </p>
            <ol className="mt-6 space-y-3 text-sm opacity-85">
              {[
                "Register with your role-specific details",
                "Sign in with your email and password",
                "Land on the dashboard scoped to your role",
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-gold/50 text-xs text-gold">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 flex gap-2 text-xs opacity-75">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              Data access is limited to your role. Parents see only their linked student, and authority accounts see
              institutional information only.
            </p>
          </div>

          <Card className="shadow-elevated">
            {done ? (
              <>
                <CardHeader>
                  <CheckCircle2 className="size-6 text-gold" aria-hidden />
                  <CardTitle className="text-lg">Registration complete</CardTitle>
                  <CardDescription>
                    Your {ROLE_LABEL[selected]} account has been created. Please sign in to continue.
                    {requiresAuthorisation
                      ? " Institutional verification is carried out by the college office for this role."
                      : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button onClick={() => navigate({ to: "/login", search: { role: selected } })}>
                    Continue to login
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/portal">Back to portals</Link>
                  </Button>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <UserPlus className="size-5 text-gold" aria-hidden />
                  <CardTitle className="text-lg">Registration form</CardTitle>
                  <CardDescription>{ROLE_BLURB[selected]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4" onSubmit={submit}>
                    <div className="grid gap-2">
                      <Label htmlFor="register-role">Register as</Label>
                      <Select
                        value={selected}
                        onValueChange={(value) => {
                          setSelected(value as RoleId);
                          setValues({});
                          setError(null);
                        }}
                      >
                        <SelectTrigger id="register-role">
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      {fields.map((field) => (
                        <div key={field.name} className="grid gap-2">
                          <Label htmlFor={`field-${field.name}`}>{field.label}</Label>
                          {field.type === "select" ? (
                            <Select
                              value={values[field.name] ?? ""}
                              onValueChange={(value) => set(field.name, value)}
                            >
                              <SelectTrigger id={`field-${field.name}`}>
                                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {(field.options ?? []).map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={`field-${field.name}`}
                              type={field.type}
                              maxLength={120}
                              value={values[field.name] ?? ""}
                              placeholder={field.placeholder}
                              onChange={(event) => set(field.name, event.target.value)}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Minimum 8 characters"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="register-confirm">Confirm password</Label>
                        <Input
                          id="register-confirm"
                          type="password"
                          value={confirm}
                          onChange={(event) => setConfirm(event.target.value)}
                          placeholder="Re-enter password"
                        />
                      </div>
                    </div>

                    {requiresAuthorisation ? (
                      <p className="rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs">
                        Accounts for {ROLE_LABEL[selected]} are institutional accounts. Verification of official
                        identity is carried out by the college office.
                      </p>
                    ) : null}

                    {error ? (
                      <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                        {error}
                      </p>
                    ) : null}

                    <Button type="submit" size="lg">
                      Create {ROLE_LABEL[selected]} account
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Already registered?{" "}
                      <Link to="/login" search={{ role: selected }} className="underline">
                        Sign in
                      </Link>
                    </p>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
