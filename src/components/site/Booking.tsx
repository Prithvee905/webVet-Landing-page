"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { isEmail, isIndianMobile, mailtoFallback, submitLead, type LeadResult } from "@/lib/lead";
import { site } from "@/config/site";

export type BookingKind = "clinic" | "hospital";

interface BookingCtx {
  openBooking: (kind?: BookingKind) => void;
}
const Ctx = createContext<BookingCtx>({ openBooking: () => {} });
export const useBooking = () => useContext(Ctx);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = useState<BookingKind | null>(null);
  const close = useCallback(() => setKind(null), []);
  return (
    <Ctx.Provider value={{ openBooking: (k = "clinic") => setKind(k) }}>
      {children}
      <Modal open={kind !== null} onClose={close} titleId="booking-title">
        {kind && <BookingForm initialKind={kind} onDone={close} />}
      </Modal>
    </Ctx.Provider>
  );
}

const field =
  "w-full rounded-lg border bg-page px-3 py-2.5 text-sm text-fg placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400";

const SLOTS = ["10:00 AM", "11:30 AM", "2:30 PM", "4:30 PM", "7:00 PM"];

function BookingForm({ initialKind, onDone }: { initialKind: BookingKind; onDone: () => void }) {
  // Mounted only while the dialog is open, so reading the clock here is safe.
  const [today] = useState(() => new Date().toISOString().slice(0, 10));
  const [v, setV] = useState({
    org: "", person: "", email: "", phone: "", kind: initialKind as BookingKind,
    date: "", time: SLOTS[1], notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!v.org.trim()) er.org = "Enter your clinic or hospital name.";
    if (!v.person.trim()) er.person = "Enter a contact person.";
    if (!isEmail(v.email)) er.email = "Enter a valid email address.";
    if (!isIndianMobile(v.phone)) er.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!v.date) er.date = "Choose a preferred date.";
    else if (v.date < today) er.date = "The date cannot be in the past.";
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`bk-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    setResult(await submitLead("demo", v));
    setBusy(false);
  };

  const summary = {
    Name: v.org, Contact: v.person, Email: v.email, Phone: v.phone,
    Type: v.kind === "hospital" ? "Hospital / Enterprise" : "Clinic",
    "Preferred slot": `${v.date} ${v.time} IST`, Requirements: v.notes,
  };

  if (result) {
    const sent = result.status === "sent";
    const pending = result.status === "pending";
    return (
      <div className="space-y-4 py-4 text-center" role="status">
        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${sent ? "bg-emerald-500/15 text-brand" : "bg-amber-500/15 text-warn"}`}>
          {sent ? <CheckCircle2 className="h-6 w-6" aria-hidden /> : pending ? <Info className="h-6 w-6" aria-hidden /> : <AlertCircle className="h-6 w-6" aria-hidden />}
        </div>
        <h2 id="booking-title" className="text-xl font-semibold text-fg">
          {sent ? "Request sent" : pending ? "Not sent yet" : "Request not sent"}
        </h2>
        <p className="mx-auto max-w-md text-sm text-soft">
          {sent && "Thanks. The VetOS team will contact you to confirm a slot. Your slot is not confirmed until they do."}
          {pending && "Online booking is not connected yet, so nothing has been submitted. Your details are valid; send them to us by email and we will reply to confirm."}
          {result.status === "error" && result.message}
        </p>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          {!sent && (
            <a
              href={mailtoFallback(`VetOS demo request: ${v.org}`, summary)}
              className="rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
            >
              Email {site.supportEmail}
            </a>
          )}
          {result.status === "error" && (
            <button type="button" onClick={() => setResult(null)} className="rounded-lg border border-line2 px-4 py-2.5 text-sm font-medium text-fg hover:bg-hover">
              Try again
            </button>
          )}
          <button type="button" onClick={onDone} className="rounded-lg border border-line2 px-4 py-2.5 text-sm font-medium text-fg hover:bg-hover">
            Close
          </button>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`bk-${k}-err`} className="mt-1 flex items-center gap-1 text-xs text-danger">
        <AlertCircle className="h-3 w-3" aria-hidden /> {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `bk-${k}-err` : undefined });
  const border = (k: string) => (errors[k] ? "border-rose-500" : "border-line2");

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="pr-8">
        <h2 id="booking-title" className="text-xl font-semibold text-fg">Book a demo</h2>
        <p className="mt-1 text-sm text-muted">A short walkthrough of VetOS. Tell us a little about your practice.</p>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-xs font-medium text-soft">I am booking for a</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["clinic", "hospital"] as const).map((k) => (
            <label key={k} className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm has-[:checked]:border-emerald-400 has-[:checked]:bg-emerald-400/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-emerald-400 ${"border-line2"}`}>
              <input type="radio" name="kind" value={k} checked={v.kind === k} onChange={() => setV((p) => ({ ...p, kind: k }))} className="sr-only" />
              {k === "clinic" ? "Clinic" : "Hospital"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-org" className="mb-1 block text-xs font-medium text-soft">Clinic / hospital name *</label>
          <input id="bk-org" className={`${field} ${border("org")}`} value={v.org} onChange={set("org")} autoComplete="organization" {...aria("org")} />
          {err("org")}
        </div>
        <div>
          <label htmlFor="bk-person" className="mb-1 block text-xs font-medium text-soft">Contact person *</label>
          <input id="bk-person" className={`${field} ${border("person")}`} value={v.person} onChange={set("person")} autoComplete="name" {...aria("person")} />
          {err("person")}
        </div>
        <div>
          <label htmlFor="bk-email" className="mb-1 block text-xs font-medium text-soft">Email *</label>
          <input id="bk-email" type="email" className={`${field} ${border("email")}`} value={v.email} onChange={set("email")} autoComplete="email" {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="bk-phone" className="mb-1 block text-xs font-medium text-soft">Mobile / WhatsApp *</label>
          <input id="bk-phone" type="tel" placeholder="+91 98765 43210" className={`${field} ${border("phone")}`} value={v.phone} onChange={set("phone")} autoComplete="tel" {...aria("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="bk-date" className="mb-1 block text-xs font-medium text-soft">Preferred date *</label>
          <input id="bk-date" type="date" min={today} className={`${field} ${border("date")}`} value={v.date} onChange={set("date")} {...aria("date")} />
          {err("date")}
        </div>
        <div>
          <label htmlFor="bk-time" className="mb-1 block text-xs font-medium text-soft">Preferred time (IST)</label>
          <select id="bk-time" className={`${field} border-line2`} value={v.time} onChange={set("time")}>
            {SLOTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bk-notes" className="mb-1 block text-xs font-medium text-soft">Customization requirements (optional)</label>
        <textarea id="bk-notes" rows={3} className={`${field} border-line2`} value={v.notes} onChange={set("notes")} placeholder="Branding, printing formats, WhatsApp, integrations…" />
      </div>

      {!site.leadEndpoint && (
        <p className="flex gap-2 rounded-lg border border-amber-400/25 bg-amber-400/5 p-3 text-xs text-warn">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          Online booking is not connected yet. After you submit, you will be given an email to send your request to.
        </p>
      )}

      <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-60">
        {busy ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Submitting…</> : "Request demo"}
      </button>
    </form>
  );
}
