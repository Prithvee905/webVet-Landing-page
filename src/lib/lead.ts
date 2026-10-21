import { site } from "@/config/site";

export type LeadResult =
  | { status: "sent" }
  | { status: "pending" }
  | { status: "error"; message: string };

/**
 * Sends a lead to the configured endpoint. With no endpoint configured it
 * reports "pending" rather than faking a success.
 */
export async function submitLead(kind: string, payload: Record<string, unknown>): Promise<LeadResult> {
  if (!site.leadEndpoint) return { status: "pending" };
  try {
    const res = await fetch(site.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...payload }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { status: "error", message: data?.error ?? `The server responded with ${res.status}.` };
    }
    return { status: "sent" };
  } catch {
    return { status: "error", message: "Could not reach the server. Check your connection and try again." };
  }
}

export function mailtoFallback(subject: string, fields: Record<string, string>) {
  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${site.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const isIndianMobile = (v: string) => /^(91)?[6-9]\d{9}$/.test(v.replace(/[\s\-+]/g, ""));
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
