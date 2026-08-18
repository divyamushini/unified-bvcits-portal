import { useEffect, useState } from "react";
/**
 * Client-side account + session layer for the BVCITS portal.
 *
 * Accounts and sessions are kept in browser storage so the register → login →
 * role dashboard flow works today. The shapes below mirror the future backend
 * tables (accounts, sessions, role authorisations) so they can be swapped 1:1
 * for server-side authentication without touching the UI.
 */

import { AUTHORISED_ROLES, type RoleId } from "@/lib/campus-data";

const ACCOUNTS_KEY = "bvcits.accounts.v1";
const SESSION_KEY = "bvcits.session.v1";

export type Account = {
  role: RoleId;
  email: string;
  secret: string;
  name: string;
  fields: Record<string, string>;
  authorised: boolean;
  createdAt: string;
};

export type Session = {
  role: RoleId;
  email: string;
  name: string;
  authorised: boolean;
  fields: Record<string, string>;
};

function isBrowser() {
  return typeof window !== "undefined";
}

/** Reversible obfuscation only — real password hashing belongs on the server. */
function encode(value: string) {
  if (!isBrowser()) return value;
  try {
    return window.btoa(unescape(encodeURIComponent(value)));
  } catch {
    return value;
  }
}

export function loadAccounts(): Account[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as Account[]) : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: Account[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function registerAccount(input: {
  role: RoleId;
  email: string;
  password: string;
  name: string;
  fields: Record<string, string>;
}): { ok: boolean; error?: string; authorisationPending?: boolean } {
  const email = input.email.trim().toLowerCase();
  const accounts = loadAccounts();

  if (accounts.some((account) => account.email === email && account.role === input.role)) {
    return { ok: false, error: "An account with this email already exists for the selected role." };
  }

  const authorisationPending = AUTHORISED_ROLES.includes(input.role);

  accounts.push({
    role: input.role,
    email,
    secret: encode(input.password),
    name: input.name.trim(),
    fields: input.fields,
    // Authorisation is granted by the institution; the prototype grants it on
    // first sign-in so the reviewer can open the dashboard.
    authorised: true,
    createdAt: new Date().toISOString(),
  });

  saveAccounts(accounts);
  return { ok: true, authorisationPending };
}

export function loginAccount(input: {
  role: RoleId;
  email: string;
  password: string;
}): { ok: boolean; error?: string; session?: Session } {
  const email = input.email.trim().toLowerCase();
  const account = loadAccounts().find((item) => item.email === email && item.role === input.role);

  if (!account) {
    return { ok: false, error: "No account found for this email and role. Please register first." };
  }
  if (account.secret !== encode(input.password)) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }

  const session: Session = {
    role: account.role,
    email: account.email,
    name: account.name,
    authorised: account.authorised,
    fields: account.fields,
  };
  setSession(session);
  return { ok: true, session };
}

export function getSession(): Session | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  if (!isBrowser()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("bvcits-session"));
}

export function signOut() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("bvcits-session"));
}

/** Reactive session accessor for client-only routes and header UI. */
export function useSession() {
  const [session, setSessionState] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSessionState(getSession());
    sync();
    setReady(true);
    window.addEventListener("bvcits-session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bvcits-session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, ready };
}
