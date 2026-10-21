"use client";

import React, { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import Section from "./Section";
import { useBooking } from "./Booking";
import { features, statusLabel } from "@/config/site";

interface Mod { id: string; label: string; custom?: boolean; planned?: boolean }

const base: Mod[] = features.map((f) => ({ id: f.title, label: f.title, planned: f.status === "planned" }));
const initial = ["Pet & owner records", "Consultation management", "Prescription generation", "GST-ready invoices & printing"];

export default function FeaturePicker() {
  const { openBooking } = useBooking();
  const [mods, setMods] = useState<Mod[]>(base);
  const [on, setOn] = useState<string[]>(initial);
  const [draft, setDraft] = useState("");

  const toggle = (id: string) => setOn((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const label = draft.trim();
    if (!label || mods.some((m) => m.label.toLowerCase() === label.toLowerCase())) return;
    setMods([...mods, { id: label, label, custom: true }]);
    setOn([...on, label]);
    setDraft("");
  };
  const chosen = mods.filter((m) => on.includes(m.id));
  const hasCustom = chosen.some((m) => m.custom);

  return (
    <Section
      id="build"
      eyebrow="Build your VetOS"
      title="Switch on what your clinic uses. Leave the rest out."
      intro="Pick the tools your team works with, and add anything we don't list. Your workspace shows only what you choose."
      tone="alt"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <h3 className="mb-4 text-sm font-medium text-fg">Your requirements</h3>
          <ul className="flex flex-wrap gap-2">
            {mods.map((m) => {
              const active = on.includes(m.id);
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(m.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all duration-200 active:scale-95 ${active ? "border-emerald-400 bg-emerald-400/15 text-fg" : "border-line2 text-muted hover:border-emerald-400/60 hover:text-fg"}`}
                  >
                    {active ? <Check className="h-3.5 w-3.5 text-brand" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
                    {m.label}
                    {m.planned && <span className="text-[10px] uppercase text-faint">{statusLabel.planned}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
          <form onSubmit={add} className="mt-5 flex gap-2">
            <label htmlFor="fp-custom" className="sr-only">Add your own requirement</label>
            <input id="fp-custom" value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={40} placeholder="Something we missed? Add it…"
              className="min-w-0 flex-1 rounded-lg border border-line2 bg-page px-3 py-2.5 text-sm text-fg placeholder-slate-500 focus:border-emerald-400 focus:outline-none" />
            <button className="rounded-lg bg-emerald-400 px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300">Add</button>
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-emerald-900/5">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 text-xs text-faint">Your VetOS workspace · preview</span>
          </div>
          <div className="grid min-h-[320px] sm:grid-cols-[210px_1fr]">
            <nav aria-label="Your workspace menu" className="border-b border-line p-3 sm:border-b-0 sm:border-r">
              <ul className="space-y-1" aria-live="polite">
                {chosen.length === 0 && <li className="px-2 py-3 text-sm text-faint">Nothing selected yet.</li>}
                {chosen.map((m) => (
                  <li key={m.id} className="fade-in flex items-center justify-between rounded-lg bg-hover px-3 py-2 text-sm text-fg">
                    <span>{m.label}</span>
                    <button type="button" onClick={() => toggle(m.id)} aria-label={`Remove ${m.label}`} className="ml-2 shrink-0 text-faint hover:text-danger"><X className="h-3.5 w-3.5" aria-hidden /></button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col justify-between p-5">
              <div>
                <p className="text-3xl font-semibold tabular-nums text-fg">{chosen.length}<span className="text-lg font-normal text-muted"> of {mods.length} tools on</span></p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-hover" role="presentation">
                  <div className="h-full rounded-full bg-emerald-400 transition-all duration-500" style={{ width: `${(chosen.length / mods.length) * 100}%` }} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-soft">
                  {chosen.length === 0 ? "Pick a few tools to see your workspace take shape." : "A cleaner workspace: your team sees these screens and nothing else."}
                </p>
                {chosen.some((m) => m.planned) && <p className="mt-2 text-xs text-warn">Tools marked Planned are not available yet.</p>}
                {hasCustom && <p className="mt-2 text-xs text-info">Custom requirements are quoted separately under the Hospital / Enterprise offering.</p>}
              </div>
              <button type="button" onClick={() => openBooking(hasCustom ? "hospital" : "clinic")} className="mt-6 self-start rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-300">
                {hasCustom ? "Discuss your custom needs" : "Book a demo with this setup"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
